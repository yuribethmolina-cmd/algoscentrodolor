import { useEffect, useRef, useState } from "react";
import { MessageSquare, X, Send, Calendar } from "lucide-react";
import { ALGOS } from "@/config/algos.config";
import { trackAppointment, trackWA, trackCTA } from "@/lib/analytics";

type Msg = { role: "user" | "assistant"; content: string };

const STORAGE_KEY = "algos.asistente.v1";
const DEEP_TEAL = ALGOS.palette.deepTeal;
const TEAL = ALGOS.palette.brandTeal;
const CREAM = ALGOS.palette.cream;
const GOLD = ALGOS.palette.gold;

const WELCOME: Msg = {
  role: "assistant",
  content:
    "¡Hola! Soy el Asistente ALGOS 👋 Puedo ayudarte con información sobre nuestros servicios, especialistas, horarios y sedes en Maracaibo.\n\n_Este asistente no diagnostica ni reemplaza una consulta médica. Para evaluar síntomas o agendar, te conectamos con un especialista por WhatsApp._\n\n¿En qué puedo ayudarte?",
};

const SUGGESTIONS = [
  "¿Qué tratan en ALGOS?",
  "¿Dónde están ubicados?",
  "Horarios de especialistas",
  "¿Cómo agendo una cita?",
];

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
  const [showForm, setShowForm] = useState(false);
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
  const [formConsent, setFormConsent] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(Boolean(savedContact));
  const [hasSavedContact, setHasSavedContact] = useState(Boolean(savedContact));
  const [fallbackUrl, setFallbackUrl] = useState<string | null>(null);


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
    } catch (e: any) {
      setError(e?.message ?? "No pudimos responder. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setMessages([WELCOME]);
    setError(null);
  }

  function submitForm() {
    const name = formName.trim();
    const phone = formPhone.trim();
    if (name.length < 2) {
      setFormError("Por favor ingresa tu nombre completo.");
      trackCTA("chat_asistente", `chat_fail:validation:name_${name.length === 0 ? "empty" : "too_short"}`);
      return;
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
      return;
    }
    if (!formConsent) {
      setFormError("Debes autorizar el uso de tus datos para continuar.");
      trackCTA("chat_asistente", "chat_fail:validation:consent_missing");
      return;
    }
    setFormError(null);

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

    const reason = formReason.trim();
    trackAppointment({
      condition: reason || "chat_asistente",
      source: "chat_asistente",
    });
    trackWA("chat_asistente", "chat_miniform");

    const text = encodeURIComponent(formMessage.trim() || "Hola, quisiera agendar una cita.");
    const waUrl = `${ALGOS.contact.whatsappHref}?text=${text}`;
    let win: Window | null = null;
    try {
      win = window.open(waUrl, "_blank", "noopener,noreferrer");
    } catch (openErr: any) {
      trackCTA("chat_asistente", `chat_fail:whatsapp:exception_${(openErr?.name || "unknown").slice(0, 40)}`);
      setFallbackUrl(waUrl);
      setFormError("No se pudo abrir WhatsApp automáticamente. Usa el enlace manual de abajo.");
      return;
    }
    if (!win) {
      trackCTA("chat_asistente", "chat_fail:whatsapp:popup_blocked");
      setFallbackUrl(waUrl);
      setFormError("Tu navegador bloqueó la apertura automática. Usa el enlace manual de abajo.");
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
    setShowForm(false);
    setFormReason("");
    setFormConsent(false);
    setFormMessage("");
    if (!rememberMe) {
      setFormName("");
      setFormPhone("");
    }
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
        <button
          onClick={() => setOpen(true)}
          aria-label="Abrir asistente ALGOS"
          className="fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-full px-4 py-3 text-white shadow-lg transition-all duration-200 active:scale-95 md:hover:shadow-xl md:hover:scale-105"
          style={{ backgroundColor: DEEP_TEAL }}
        >
          <MessageSquare size={22} />
          <span className="hidden sm:inline text-sm font-semibold tracking-wide">
            Asistente ALGOS
          </span>
        </button>
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
              <div className="flex justify-start">
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
              </div>
            )}

            {error && (
              <div className="text-xs px-3 py-2 rounded" style={{ backgroundColor: "#fdecea", color: "#8a2a20" }}>
                {error}
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

          {/* Mini appointment form */}
          {showForm && (
            <div
              className="px-4 py-3 space-y-2"
              style={{ borderTop: `1px solid ${DEEP_TEAL}15`, backgroundColor: CREAM }}
            >
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold" style={{ color: DEEP_TEAL }}>
                  Agenda rápida por WhatsApp
                </div>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setFormError(null);
                    setFormConsent(false);
                    setFormMessage("");
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
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: DEEP_TEAL }}>
                  Mensaje para WhatsApp
                </label>
                <textarea
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  placeholder="Aquí aparecerá el mensaje que se enviará por WhatsApp..."
                  rows={3}
                  className="w-full px-3 py-2 text-sm rounded-lg outline-none resize-none"
                  style={{ backgroundColor: "white", color: DEEP_TEAL, border: `1px solid ${DEEP_TEAL}25` }}
                />
                <p className="text-[10px] mt-1 opacity-70" style={{ color: DEEP_TEAL }}>
                  Puedes editar el mensaje antes de enviarlo.
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
                <div className="text-[11px]" style={{ color: "#8a2a20" }}>
                  {formError}
                </div>
              )}
              {fallbackUrl && (
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
              )}

              <button
                onClick={submitForm}
                className="w-full py-2.5 rounded-lg text-sm font-semibold text-white"
                style={{ backgroundColor: DEEP_TEAL }}
              >
                Enviar por WhatsApp
              </button>
              <p className="text-[10px] text-center opacity-70" style={{ color: DEEP_TEAL }}>
                Se abrirá WhatsApp con tus datos precargados.
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
                onClick={() => setShowForm(true)}
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
