import { useEffect, useRef, useState } from "react";
import { MessageSquare, X, Send, Calendar, RefreshCw, Check } from "lucide-react";
import { ALGOS } from "@/config/algos.config";
import { supabase } from "@/integrations/supabase/client";
import { trackAppointment, trackWA, trackCTA } from "@/lib/analytics";
import { isWithinBusinessHours, nextOpeningLabel, BUSINESS_HOURS } from "@/lib/businessHours";
import assistantAvatar from "@/assets/ai-assistant-avatar.png.asset.json";




type Msg = { role: "user" | "assistant"; content: string };

const STORAGE_KEY = "algos.asistente.v1";
const DEEP_TEAL = ALGOS.palette.deepTeal;
const TEAL = ALGOS.palette.brandTeal;
const CREAM = ALGOS.palette.cream;
const GOLD = ALGOS.palette.gold;

const WELCOME: Msg = {
  role: "assistant",
  content:
    "¡Hola! Qué gusto saludarle. Soy el Asistente ALGOS — estoy aquí para resolver sus dudas sobre especialidades, estudios, procedimientos y sedes en Maracaibo.\n\n_Este asistente no diagnostica ni reemplaza una consulta médica. Para evaluar síntomas o agendar, le conectamos con un especialista por WhatsApp._\n\n¿Hay alguna especialidad, estudio o síntoma en particular por el que consulte?",
};

const SUGGESTIONS = [
  "¿Qué especialidades tienen?",
  "¿Cuánto cuesta el EEG o EMG?",
  "¿Cómo agendo una cita?",
  "¿Dónde están ubicados?",
];

const SHIFT_LABELS: Record<string, string> = {
  manana: "Mañana (7:00 AM – 12:00 M)",
  tarde: "Tarde (12:00 M – 4:00 PM)",
  cualquiera: "Cualquier horario",
};

export type LeadConfirmation = {
  name: string;
  phone: string;
  reason: string;
  shift: string;
  context: "off_hours" | "whatsapp_fallback";
  /** Código corto para que el paciente lo mencione al equipo. */
  reference: string;
  /** Cuándo se recibió la solicitud. */
  receivedAt: string;
  /** Ventana estimada de respuesta. */
  replyWindow: string;
  /** Estado estimado del trámite. */
  status: string;
};

function buildReference(date = new Date()): string {
  const d = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Caracas",
    month: "2-digit",
    day: "2-digit",
  })
    .format(date)
    .replace(/\D/g, "");
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `ALG-${d}-${rand}`;
}

function formatCaracasTime(date = new Date()): string {
  return new Intl.DateTimeFormat("es-VE", {
    timeZone: "America/Caracas",
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

function loadMessages(): Msg[] {
  if (typeof window === "undefined") return [WELCOME];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [WELCOME];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
  } catch {
    /* noop */
  }
  return [WELCOME];
}

export default function AsistenteAlgos() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>(() => loadMessages());
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastQuery, setLastQuery] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showTooltip, setShowTooltip] = useState(() => {
    if (typeof window === "undefined") return true;
    try {
      return window.localStorage.getItem("algos.asistente.tooltip_closed") !== "1";
    } catch {
      return true;
    }
  });
  const CONTACT_KEY = "algos.chat.contact.v1";
  const savedContact = (() => {
    try {
      const raw = window.localStorage.getItem(CONTACT_KEY);
      return raw ? (JSON.parse(raw) as { name?: string; phone?: string }) : null;
    } catch {
      return null;
    }
  })();
  const [formName, setFormName] = useState(savedContact?.name ?? "");
  const [formPhone, setFormPhone] = useState(savedContact?.phone ?? "");
  const [formReason, setFormReason] = useState("");
  const [formShift, setFormShift] = useState("");
  const [formConsent, setFormConsent] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(Boolean(savedContact));
  const [hasSavedContact, setHasSavedContact] = useState(Boolean(savedContact));
  const [fallbackUrl, setFallbackUrl] = useState<string | null>(null);
  const [isOffHours, setIsOffHours] = useState(false);
  const [leadSaving, setLeadSaving] = useState(false);
  const [confirmation, setConfirmation] = useState<LeadConfirmation | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);


  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      /* noop */
    }
  }, [messages]);

  useEffect(() => {
    if (open) {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open, messages, loading]);

  // Auto-ocultar el tooltip de invitación después de unos segundos.
  useEffect(() => {
    if (!showTooltip) return;
    const timer = setTimeout(() => {
      setShowTooltip(false);
      try {
        window.localStorage.setItem("algos.asistente.tooltip_closed", "1");
      } catch {
        /* noop */
      }
    }, 8000);
    return () => clearTimeout(timer);
  }, [showTooltip]);

  // Actualiza la vista previa del mensaje de WhatsApp cuando cambian los datos.
  useEffect(() => {
    if (!showForm) return;
    const name = formName.trim();
    const phone = formPhone.trim();
    const reason = formReason.trim();
    const lines = [
      name ? `Hola, soy ${name}.` : "Hola, quisiera agendar una cita.",
      phone ? `Mi teléfono: ${phone}.` : null,
      reason ? `Motivo: ${reason}` : null,
    ].filter(Boolean) as string[];
    setFormMessage(lines.join("\n"));
  }, [showForm, formName, formPhone, formReason]);



  async function send(text: string) {
    const q = text.trim();
    if (!q || loading) return;
    setError(null);
    setLastQuery(q);
    const next: Msg[] = [...messages, { role: "user", content: q }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/asistente`;
      let resp: Response;
      try {
        resp = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          },
          body: JSON.stringify({ messages: next }),
        });
      } catch (netErr: any) {
        trackCTA("chat_asistente", `chat_fail:network:${(netErr?.name || "fetch_error").slice(0, 40)}`);
        throw new Error("Sin conexión. Verifica tu internet e intenta de nuevo.");
      }
      const data = await resp.json().catch(() => ({}));
      if (!resp.ok) {
        const reason =
          resp.status === 429
            ? "rate_limit"
            : resp.status === 402
              ? "credits_exhausted"
              : resp.status >= 500
                ? `server_${resp.status}`
                : `http_${resp.status}`;
        trackCTA("chat_asistente", `chat_fail:api:${reason}`);
        throw new Error(data?.error ?? "Error");
      }
      setMessages((m) => [...m, { role: "assistant", content: data.text ?? "" }]);
      setLastQuery(null);
    } catch (e: any) {
      setError(e?.message ?? "No pudimos responder. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setMessages([WELCOME]);
    setError(null);
    setLastQuery(null);
  }

  function validateForm(): { name: string; phone: string } | null {
    const name = formName.trim();
    const phone = formPhone.trim();
    if (name.length < 2) {
      setFormError("Por favor ingresa tu nombre completo.");
      trackCTA("chat_asistente", `chat_fail:validation:name_${name.length === 0 ? "empty" : "too_short"}`);
      return null;
    }
    const digits = phone.replace(/\D/g, "");
    if (!/^(0[24]\d{8,9})$/.test(digits)) {
      setFormError("Ingresa un teléfono venezolano válido (ej. 0414-680 7886 o 0261-8000476).");
      const phoneReason = digits.length === 0
        ? "empty"
        : digits.length < 10
          ? "too_short"
          : digits.length > 11
            ? "too_long"
            : !/^0[24]/.test(digits)
              ? "bad_prefix"
              : "invalid_format";
      trackCTA("chat_asistente", `chat_fail:validation:phone_${phoneReason}`);
      return null;
    }
    if (!formConsent) {
      setFormError("Debes autorizar el uso de tus datos para continuar.");
      trackCTA("chat_asistente", "chat_fail:validation:consent_missing");
      return null;
    }
    setFormError(null);
    return { name, phone };
  }

  function persistContact(name: string, phone: string) {
    try {
      if (rememberMe) {
        window.localStorage.setItem(CONTACT_KEY, JSON.stringify({ name, phone }));
        setHasSavedContact(true);
      } else {
        window.localStorage.removeItem(CONTACT_KEY);
        setHasSavedContact(false);
      }
    } catch (storageErr: any) {
      trackCTA("chat_asistente", `chat_fail:storage:${(storageErr?.name || "unknown").slice(0, 40)}`);
    }
  }

  function resetForm() {
    setShowForm(false);
    setFormReason("");
    setFormShift("");
    setFormConsent(false);
    setFormMessage("");
    setFallbackUrl(null);
    if (!rememberMe) {
      setFormName("");
      setFormPhone("");
    }
  }

  /** Guarda el lead en el backend (fuera de horario o cuando WhatsApp falla). */
  async function saveLead(context: "off_hours" | "whatsapp_fallback"): Promise<boolean> {
    const valid = validateForm();
    if (!valid) return false;
    const { name, phone } = valid;
    persistContact(name, phone);
    const reason = formReason.trim();
    const noteParts = [
      formMessage.trim(),
      formShift ? `Disponibilidad: ${SHIFT_LABELS[formShift] ?? formShift}` : "",
      context === "whatsapp_fallback"
        ? "El paciente no logró contactar por WhatsApp."
        : "Solicitud desde el Asistente ALGOS (fuera de horario WhatsApp).",
    ].filter(Boolean);

    try {
      const payload = {
        name,
        phone,
        condition: reason || "chat_asistente",
        preferred_shift: formShift || null,
        notes: noteParts.join("\n"),
        source_section: "chat_asistente",
        device: window.innerWidth < 768 ? "mobile" : "desktop",
      };
      const { data, error: submitErr } = await supabase.functions.invoke("submit-appointment", { body: payload });
      if (submitErr || !data?.ok) throw new Error(submitErr?.message || data?.error || "No se pudo guardar");
      trackAppointment({ condition: reason || "chat_asistente", source: `chat_asistente_${context}` });
      const now = new Date();
      const open = isWithinBusinessHours(now);
      setConfirmation({
        name,
        phone,
        reason,
        shift: formShift ? SHIFT_LABELS[formShift] ?? formShift : "Sin preferencia",
        context,
        reference: buildReference(now),
        receivedAt: formatCaracasTime(now),
        replyWindow: open
          ? "Hoy, dentro del horario de atención"
          : `${nextOpeningLabel(now)} (${BUSINESS_HOURS.label})`,
        status: "Recibida — pendiente de confirmación",
      });
      trackCTA("chat_asistente", `chat_lead_confirmation_shown:${context}`);
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            context === "off_hours"
              ? `¡Gracias, ${name}! Recibimos tus datos. En este momento estamos fuera del horario de atención por WhatsApp (lunes a viernes, 7:00 AM a 4:00 PM). Nuestro equipo te contactará al iniciar el siguiente día hábil para confirmar tu cita.`
              : `¡Gracias, ${name}! Guardamos tu solicitud de cita. Nuestro equipo te contactará al ${phone} para confirmar fecha y hora.`,
        },
      ]);
      resetForm();
      return true;
    } catch (submitErr: any) {
      trackCTA("chat_asistente", `chat_fail:${context}_submit:${(submitErr?.name || "error").slice(0, 40)}`);
      setFormError("No se pudo guardar tu solicitud. Intenta de nuevo en unos segundos.");
      return false;
    }
  }

  async function submitLead() {
    setLeadSaving(true);
    trackCTA("chat_asistente", "chat_lead_form_submit");
    await saveLead("whatsapp_fallback");
    setLeadSaving(false);
  }

  async function submitForm(isRetry = false) {
    const valid = validateForm();
    if (!valid) return;
    const { name, phone } = valid;
    setFormSubmitting(true);
    setFallbackUrl(null);
    persistContact(name, phone);

    const reason = formReason.trim();
    if (isRetry) {
      trackCTA("chat_asistente", "chat_miniform_retry");
    }

    if (!isWithinBusinessHours()) {
      trackCTA("chat_asistente", "chat_miniform_off_hours");
      await saveLead("off_hours");
      setFormSubmitting(false);
      return;
    }


    // Dentro de horario: abrir WhatsApp como antes.
    if (!isRetry) {
      trackAppointment({
        condition: reason || "chat_asistente",
        source: "chat_asistente",
      });
      trackWA("chat_asistente", "chat_miniform");
    }

    const text = encodeURIComponent(formMessage.trim() || "Hola, quisiera agendar una cita.");
    const waUrl = `${ALGOS.contact.whatsappHref}?text=${text}`;
    let win: Window | null = null;
    try {
      win = window.open(waUrl, "_blank", "noopener,noreferrer");
    } catch (openErr: any) {
      trackCTA("chat_asistente", `chat_fail:whatsapp:exception_${(openErr?.name || "unknown").slice(0, 40)}`);
      setFallbackUrl(waUrl);
      setFormError("No se pudo abrir WhatsApp automáticamente. Reintenta o usa el enlace manual de abajo.");
      setFormSubmitting(false);
      return;
    }
    if (!win) {
      trackCTA("chat_asistente", "chat_fail:whatsapp:popup_blocked");
      setFallbackUrl(waUrl);
      setFormError("Tu navegador bloqueó la apertura automática. Reintenta o usa el enlace manual de abajo.");
      setFormSubmitting(false);
      return;
    }
    setFallbackUrl(null);

    setMessages((m) => [
      ...m,
      {
        role: "assistant",
        content: `¡Listo, ${name}! Abrimos WhatsApp con tus datos para que un especialista te atienda enseguida. Si no se abrió, escríbenos manualmente.`,
      },
    ]);
    resetForm();
    setFormSubmitting(false);
  }


  function clearSavedContact() {
    try {
      window.localStorage.removeItem(CONTACT_KEY);
    } catch {
      /* noop */
    }
    setFormName("");
    setFormPhone("");
    setRememberMe(false);
    setHasSavedContact(false);
  }



  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }

  return (
    <>
      {/* Floating trigger */}
      {!open && (
        <div className="fixed bottom-24 md:bottom-6 left-6 z-50 flex flex-col items-start gap-2">
          {showTooltip && (
            <div
              className="relative max-w-[260px] sm:max-w-[280px] mb-2 rounded-2xl px-4 py-3 shadow-xl text-sm leading-snug animate-in fade-in zoom-in duration-300"
              style={{ backgroundColor: "white", color: DEEP_TEAL, border: `1px solid ${DEEP_TEAL}20` }}
              role="status"
              aria-live="polite"
            >
              <div className="flex items-start gap-2">
                <img
                  src={assistantAvatar.url}
                  alt=""
                  width={28}
                  height={28}
                  className="rounded-full shrink-0 object-cover"
                  loading="eager"
                />
                <span>¡Hola! Estoy aquí para responder las preguntas que tengas sobre nuestros servicios.</span>
              </div>
              <button
                onClick={() => {
                  setShowTooltip(false);
                  try {
                    window.localStorage.setItem("algos.asistente.tooltip_closed", "1");
                  } catch {
                    /* noop */
                  }
                }}
                aria-label="Cerrar invitación"
                className="absolute top-1 right-1 p-1 rounded-full opacity-60 hover:opacity-100"
                style={{ color: DEEP_TEAL }}
              >
                <X size={12} />
              </button>
              <span
                className="absolute -bottom-1.5 left-6 w-3 h-3 rotate-45"
                style={{ backgroundColor: "white", borderRight: `1px solid ${DEEP_TEAL}20`, borderBottom: `1px solid ${DEEP_TEAL}20` }}
                aria-hidden
              />
            </div>
          )}
          <button
            onClick={() => {
              setShowTooltip(false);
              try {
                window.localStorage.setItem("algos.asistente.tooltip_closed", "1");
              } catch {
                /* noop */
              }
              setOpen(true);
            }}
            aria-label="Abrir asistente ALGOS"
            className="group relative flex items-center gap-2 rounded-full px-2 pr-4 py-2 text-white shadow-lg transition-all duration-200 active:scale-95 md:hover:shadow-xl md:hover:scale-105"
            style={{ backgroundColor: DEEP_TEAL }}
          >
            <span className="absolute inset-0 rounded-full animate-ping opacity-25" style={{ backgroundColor: GOLD }} />
            <img
              src={assistantAvatar.url}
              alt="Asistente ALGOS"
              width={40}
              height={40}
              className="relative rounded-full object-cover border-2"
              style={{ borderColor: GOLD }}
              loading="eager"
            />
            <span className="hidden sm:inline text-sm font-semibold tracking-wide">
              Asistente ALGOS
            </span>
          </button>
        </div>
      )}


      {/* Panel */}
      {open && (
        <div
          className="fixed z-[60] flex flex-col shadow-2xl overflow-hidden bottom-0 left-0 right-0 h-[85svh] sm:bottom-6 sm:left-6 sm:right-auto sm:h-[600px] sm:w-[380px] sm:rounded-2xl"
          style={{ backgroundColor: CREAM, border: `1px solid ${DEEP_TEAL}20` }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ backgroundColor: DEEP_TEAL, color: CREAM }}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                style={{ backgroundColor: GOLD, color: DEEP_TEAL }}
              >
                A
              </div>
              <div>
                <div className="text-sm font-semibold leading-tight">Asistente ALGOS</div>
                <div className="text-[10px] opacity-80">Información general · No diagnostica</div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={reset}
                className="text-[10px] uppercase tracking-wider px-2 py-1 rounded opacity-80 hover:opacity-100"
                title="Nueva conversación"
              >
                Limpiar
              </button>
              <button
                onClick={() => setOpen(false)}
                aria-label="Cerrar asistente"
                className="p-1.5 rounded hover:bg-white/10"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                    m.role === "user" ? "rounded-2xl rounded-br-md" : "rounded-2xl rounded-bl-md"
                  }`}
                  style={
                    m.role === "user"
                      ? { backgroundColor: TEAL, color: CREAM }
                      : { backgroundColor: "white", color: DEEP_TEAL, border: `1px solid ${DEEP_TEAL}15` }
                  }
                >
                  {renderContent(m.content)}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex flex-col justify-start gap-1">
                <div
                  className="px-3.5 py-2.5 rounded-2xl rounded-bl-md text-sm"
                  style={{ backgroundColor: "white", color: DEEP_TEAL, border: `1px solid ${DEEP_TEAL}15` }}
                >
                  <span className="inline-flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: TEAL, animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: TEAL, animationDelay: "120ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: TEAL, animationDelay: "240ms" }} />
                  </span>
                </div>
                <div className="text-[10px] opacity-70" style={{ color: DEEP_TEAL }}>
                  Enviando…
                </div>
              </div>
            )}

            {error && (
              <div className="flex items-start gap-2">
                <div className="flex-1 text-xs px-3 py-2 rounded" style={{ backgroundColor: "#fdecea", color: "#8a2a20" }}>
                  {error}
                </div>
                {lastQuery && (
                  <button
                    onClick={() => {
                      trackCTA("chat_asistente", "chat_retry_last_message");
                      send(lastQuery);
                    }}
                    className="shrink-0 flex items-center gap-1 px-2 py-2 rounded text-xs font-semibold text-white"
                    style={{ backgroundColor: DEEP_TEAL }}
                    title="Reintentar"
                  >
                    <RefreshCw size={12} />
                    Reintentar
                  </button>
                )}
              </div>
            )}

            {messages.length <= 1 && !loading && (
              <div className="pt-2 flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-xs px-3 py-1.5 rounded-full transition-colors"
                    style={{
                      backgroundColor: "white",
                      color: DEEP_TEAL,
                      border: `1px solid ${DEEP_TEAL}30`,
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Confirmación de solicitud guardada */}
          {confirmation && (
            <div
              className="px-4 py-3 space-y-3"
              style={{ borderTop: `1px solid ${DEEP_TEAL}15`, backgroundColor: "white" }}
              role="status"
              aria-live="polite"
            >
              <div className="flex items-start gap-2">
                <span
                  className="flex items-center justify-center rounded-full shrink-0"
                  style={{ width: 26, height: 26, backgroundColor: `${TEAL}1A`, color: TEAL }}
                  aria-hidden
                >
                  <Check size={15} />
                </span>
                <div>
                  <p className="text-sm font-semibold" style={{ color: DEEP_TEAL }}>
                    Solicitud recibida, {confirmation.name.split(" ")[0]}
                  </p>
                  <p className="text-[11px] leading-snug opacity-75" style={{ color: DEEP_TEAL }}>
                    {confirmation.context === "off_hours"
                      ? "La registramos fuera del horario de atención y quedó de primera en la cola."
                      : "La registramos porque no se pudo abrir WhatsApp."}
                  </p>
                </div>
              </div>

              <div
                className="rounded-lg p-3 space-y-2"
                style={{ backgroundColor: CREAM, border: `1px solid ${DEEP_TEAL}15` }}
              >
                {[
                  { label: "Estado estimado", value: confirmation.status },
                  { label: "Tiempo de respuesta", value: confirmation.replyWindow },
                  { label: "Recibida", value: confirmation.receivedAt },
                  { label: "Disponibilidad", value: confirmation.shift },
                  { label: "Le contactamos al", value: confirmation.phone },
                  { label: "Referencia", value: confirmation.reference },
                ].map((row) => (
                  <div key={row.label} className="flex items-start justify-between gap-3">
                    <span
                      className="text-[10px] uppercase tracking-wider shrink-0 opacity-70"
                      style={{ color: DEEP_TEAL }}
                    >
                      {row.label}
                    </span>
                    <span
                      className="text-[11.5px] font-semibold text-right"
                      style={{ color: DEEP_TEAL }}
                    >
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-[10.5px] leading-snug opacity-70" style={{ color: DEEP_TEAL }}>
                Guarde su referencia: puede mencionarla al equipo para ubicar su solicitud más rápido.
              </p>

              <button
                type="button"
                onClick={() => setConfirmation(null)}
                className="w-full py-2.5 rounded-lg text-sm font-semibold"
                style={{ backgroundColor: DEEP_TEAL, color: CREAM }}
              >
                Entendido
              </button>
            </div>
          )}

          {/* Mini appointment form */}

          {showForm && (
            <div
              className="px-4 py-3 space-y-2"
              style={{ borderTop: `1px solid ${DEEP_TEAL}15`, backgroundColor: CREAM }}
            >
              <div className="flex items-center justify-between">
              <div className="text-xs font-semibold" style={{ color: DEEP_TEAL }}>
                  {isOffHours ? "Déjanos tus datos para agendar" : "Agenda rápida por WhatsApp"}
                </div>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setFormError(null);
                    setFormConsent(false);
                    setFormMessage("");
                    setIsOffHours(false);
                  }}
                  className="text-[10px] uppercase tracking-wider opacity-70 hover:opacity-100"
                  style={{ color: DEEP_TEAL }}
                >
                  Cancelar
                </button>


              </div>
              <input
                type="text"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="Nombre y apellido"
                className="w-full px-3 py-2 text-sm rounded-lg outline-none"
                style={{ backgroundColor: "white", color: DEEP_TEAL, border: `1px solid ${DEEP_TEAL}25` }}
                autoFocus
              />
              <input
                type="tel"
                inputMode="tel"
                value={formPhone}
                onChange={(e) => setFormPhone(e.target.value)}
                placeholder="Teléfono (ej. 0414-680 7886)"
                className="w-full px-3 py-2 text-sm rounded-lg outline-none"
                style={{ backgroundColor: "white", color: DEEP_TEAL, border: `1px solid ${DEEP_TEAL}25` }}
              />
              <input
                type="text"
                value={formReason}
                onChange={(e) => setFormReason(e.target.value)}
                placeholder="Motivo (opcional)"
                className="w-full px-3 py-2 text-sm rounded-lg outline-none"
                style={{ backgroundColor: "white", color: DEEP_TEAL, border: `1px solid ${DEEP_TEAL}25` }}
              />
              <select
                value={formShift}
                onChange={(e) => setFormShift(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg outline-none"
                style={{ backgroundColor: "white", color: DEEP_TEAL, border: `1px solid ${DEEP_TEAL}25` }}
                aria-label="Disponibilidad"
              >
                <option value="">Disponibilidad (opcional)</option>
                <option value="manana">Mañana (7:00 AM – 12:00 M)</option>
                <option value="tarde">Tarde (12:00 M – 4:00 PM)</option>
                <option value="cualquiera">Cualquier horario</option>
              </select>
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: DEEP_TEAL }}>
                  {isOffHours ? "Mensaje o comentario adicional" : "Mensaje para WhatsApp"}
                </label>
                <textarea
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  placeholder={
                    isOffHours
                      ? "Ej. días y horarios en los que prefieres ser contactado…"
                      : "Aquí aparecerá el mensaje que se enviará por WhatsApp…"
                  }
                  rows={3}
                  className="w-full px-3 py-2 text-sm rounded-lg outline-none resize-none"
                  style={{ backgroundColor: "white", color: DEEP_TEAL, border: `1px solid ${DEEP_TEAL}25` }}
                />
                <p className="text-[10px] mt-1 opacity-70" style={{ color: DEEP_TEAL }}>
                  {isOffHours
                    ? "Opcional. Nuestro equipo te contactará por WhatsApp."
                    : "Puedes editar el mensaje antes de enviarlo."}
                </p>
              </div>
              <label className="flex items-start gap-2 text-[11px] leading-snug" style={{ color: DEEP_TEAL }}>

                <input
                  type="checkbox"
                  checked={formConsent}
                  onChange={(e) => setFormConsent(e.target.checked)}
                  className="mt-0.5 accent-[#1A4A55]"
                />
                <span>
                  Autorizo que ALGOS use mi nombre y teléfono para contactarme por WhatsApp y agendar mi cita.
                </span>
              </label>
              <label className="flex items-start gap-2 text-[11px] leading-snug" style={{ color: DEEP_TEAL }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mt-0.5 accent-[#1A4A55]"
                />
                <span>Recordar mi nombre y teléfono en este dispositivo para la próxima vez.</span>
              </label>
              {hasSavedContact && (
                <button
                  type="button"
                  onClick={clearSavedContact}
                  className="self-start text-[10px] underline opacity-80 hover:opacity-100"
                  style={{ color: DEEP_TEAL }}
                >
                  Borrar datos guardados
                </button>
              )}
              <p className="text-[10px] leading-snug opacity-80" style={{ color: DEEP_TEAL }}>
                Tus datos solo se usarán para atender tu solicitud. No los compartimos con terceros ajenos al proceso de atención.
              </p>
              {formError && (
                <div className="flex items-start gap-2">
                  <div className="flex-1 text-[11px]" style={{ color: "#8a2a20" }}>
                    {formError}
                  </div>
                  {!formSubmitting && (
                    <button
                      onClick={() => submitForm(true)}
                      className="shrink-0 flex items-center gap-1 px-2 py-1 rounded text-[10px] font-semibold text-white"
                      style={{ backgroundColor: DEEP_TEAL }}
                    >
                      <RefreshCw size={12} />
                      Reintentar
                    </button>
                  )}
                </div>
              )}
              {fallbackUrl && (
                <div className="space-y-2">
                  <a
                    href={fallbackUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackCTA("chat_asistente", "chat_miniform_fallback_link")}
                    className="block w-full text-center py-2.5 rounded-lg text-sm font-semibold underline"
                    style={{ backgroundColor: GOLD, color: DEEP_TEAL }}
                  >
                    Abrir WhatsApp manualmente →
                  </a>
                  <button
                    type="button"
                    onClick={submitLead}
                    disabled={leadSaving}
                    className="w-full py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
                    style={{ backgroundColor: "white", color: DEEP_TEAL, border: `1px solid ${DEEP_TEAL}40` }}
                  >
                    {leadSaving ? (
                      <>
                        <span
                          className="w-4 h-4 border-2 rounded-full animate-spin"
                          style={{ borderColor: `${DEEP_TEAL}30`, borderTopColor: DEEP_TEAL }}
                        />
                        Guardando solicitud…
                      </>
                    ) : (
                      "No pude contactar por WhatsApp — dejar mis datos"
                    )}
                  </button>
                  <p className="text-[10px] text-center opacity-70" style={{ color: DEEP_TEAL }}>
                    Guardamos tu solicitud y te llamamos o escribimos nosotros.
                  </p>
                </div>
              )}


              <button
                onClick={() => submitForm()}
                disabled={formSubmitting}
                className="w-full py-2.5 rounded-lg text-sm font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-60"
                style={{ backgroundColor: DEEP_TEAL }}
              >
                {formSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {isOffHours ? "Guardando solicitud…" : "Abriendo WhatsApp…"}
                  </>
                ) : (
                  isOffHours ? "Dejar mis datos" : "Enviar por WhatsApp"
                )}
              </button>
              <p className="text-[10px] text-center opacity-70" style={{ color: DEEP_TEAL }}>
                {isOffHours
                  ? "Guardaremos tu solicitud y te contactaremos en el siguiente día hábil."
                  : "Se abrirá WhatsApp con tus datos precargados."}
              </p>
            </div>
          )}

          {/* Composer */}
          <div className="px-3 py-3" style={{ borderTop: `1px solid ${DEEP_TEAL}15`, backgroundColor: "white" }}>
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Escribe tu pregunta…"
                rows={1}
                className="flex-1 resize-none px-3 py-2 text-sm rounded-lg outline-none max-h-24"
                style={{
                  backgroundColor: CREAM,
                  color: DEEP_TEAL,
                  border: `1px solid ${DEEP_TEAL}25`,
                }}
                disabled={loading}
              />
              <button
                onClick={() => send(input)}
                disabled={loading || !input.trim()}
                aria-label="Enviar"
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white transition-opacity disabled:opacity-40"
                style={{ backgroundColor: TEAL }}
              >
                <Send size={16} />
              </button>
            </div>
            {!showForm && (
              <button
                onClick={() => {
                  const offHours = !isWithinBusinessHours();
                  setIsOffHours(offHours);
                  if (offHours) {
                    trackCTA("chat_asistente", "chat_off_hours_prompt_opened");
                    setMessages((m) => [
                      ...m,
                      {
                        role: "assistant",
                        content: "En este momento estamos fuera del horario de atención por WhatsApp (lunes a viernes, 7:00 AM a 4:00 PM). Déjanos tus datos y te contactamos al siguiente día hábil para agendar tu cita.",
                      },
                    ]);
                  }
                  setShowForm(true);
                }}
                className="mt-2 w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-colors"
                style={{
                  backgroundColor: GOLD,
                  color: DEEP_TEAL,
                }}
              >
                <Calendar size={14} />
                Agendar rápido por WhatsApp
              </button>
            )}
          </div>

        </div>
      )}
    </>
  );
}

// Minimal markdown-ish renderer: **bold** and links.
function renderContent(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|https?:\/\/[^\s)]+)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    const token = match[0];
    if (token.startsWith("**")) {
      parts.push(<strong key={key++}>{token.slice(2, -2)}</strong>);
    } else {
      parts.push(
        <a key={key++} href={token} target="_blank" rel="noopener noreferrer" className="underline">
          {token}
        </a>,
      );
    }
    lastIndex = match.index + token.length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}
