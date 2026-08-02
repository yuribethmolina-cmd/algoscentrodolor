import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ChevronLeft, LogOut, RefreshCw, Save, Send, Mail, MessageCircle, Phone } from "lucide-react";

interface Settings {
  email_enabled: boolean;
  email_recipients: string[];
  telegram_enabled: boolean;
  telegram_chat_id: string;
  telegram_bot_token_set: boolean;
  twilio_enabled: boolean;
  twilio_from: string;
  twilio_to: string;
  twilio_account_sid_set: boolean;
  twilio_auth_token_set: boolean;
  updated_at: string | null;
}

const EMPTY: Settings = {
  email_enabled: true,
  email_recipients: [],
  telegram_enabled: false,
  telegram_chat_id: "",
  telegram_bot_token_set: false,
  twilio_enabled: false,
  twilio_from: "",
  twilio_to: "",
  twilio_account_sid_set: false,
  twilio_auth_token_set: false,
  updated_at: null,
};

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${checked ? "bg-[#3D8B96]" : "bg-muted-foreground/30"}`}
    >
      <span
        className={`absolute top-1 h-5 w-5 rounded-full bg-background shadow transition-all ${checked ? "left-6" : "left-1"}`}
      />
    </button>
  );
}

export default function ConfiguracionDashboard() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<Settings>(EMPTY);
  const [recipientsText, setRecipientsText] = useState("");
  const [telegramToken, setTelegramToken] = useState("");
  const [twilioSid, setTwilioSid] = useState("");
  const [twilioToken, setTwilioToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "ok" | "err"; msg: string } | null>(null);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase.functions.invoke("notification-settings?action=get", {
      body: {},
    });
    if (error || (data as any)?.error) {
      setFeedback({ type: "err", msg: "No se pudo cargar la configuración." });
    } else {
      const s = { ...EMPTY, ...(data as any).settings } as Settings;
      setSettings(s);
      setRecipientsText((s.email_recipients ?? []).join("\n"));
    }
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);
    const payload = {
      email_enabled: settings.email_enabled,
      email_recipients: recipientsText.split(/[\n,;]+/).map((s) => s.trim()).filter(Boolean),
      telegram_enabled: settings.telegram_enabled,
      telegram_chat_id: settings.telegram_chat_id,
      telegram_bot_token: telegramToken || undefined,
      twilio_enabled: settings.twilio_enabled,
      twilio_from: settings.twilio_from,
      twilio_to: settings.twilio_to,
      twilio_account_sid: twilioSid || undefined,
      twilio_auth_token: twilioToken || undefined,
    };
    const { data, error } = await supabase.functions.invoke("notification-settings?action=save", { body: payload });
    if (error || (data as any)?.error) {
      setFeedback({ type: "err", msg: (data as any)?.error ?? "No se pudo guardar." });
    } else {
      setFeedback({ type: "ok", msg: "Configuración guardada." });
      setTelegramToken(""); setTwilioSid(""); setTwilioToken("");
      await load();
    }
    setSaving(false);
  }

  async function testTelegram() {
    setTesting(true);
    setFeedback(null);
    const { data, error } = await supabase.functions.invoke("notification-settings?action=test-telegram", { body: {} });
    if (error || (data as any)?.error) {
      setFeedback({ type: "err", msg: `Prueba fallida: ${(data as any)?.error ?? error?.message}` });
    } else {
      setFeedback({ type: "ok", msg: "Mensaje de prueba enviado a Telegram." });
    }
    setTesting(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/admin/login", { replace: true });
  }

  const card = "rounded-2xl border border-border bg-card p-5 sm:p-6";
  const input =
    "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#3D8B96]";

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link to="/admin/citas" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-4 w-4" /> Volver al panel
          </Link>
          <div className="flex items-center gap-2">
            <button onClick={load} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border px-3 text-sm">
              <RefreshCw className="h-4 w-4" /> Recargar
            </button>
            <button onClick={handleLogout} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border px-3 text-sm">
              <LogOut className="h-4 w-4" /> Salir
            </button>
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-[#1A4A55]">Configuración de notificaciones</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Activa o desactiva por dónde llegan los avisos de nuevas solicitudes de cita y guarda las credenciales sin tocar código.
        </p>

        {feedback && (
          <div
            className={`mt-4 rounded-lg px-4 py-3 text-sm ${
              feedback.type === "ok" ? "bg-[#3D8B96]/10 text-[#1A4A55]" : "bg-destructive/10 text-destructive"
            }`}
          >
            {feedback.msg}
          </div>
        )}

        {loading ? (
          <p className="mt-8 text-sm text-muted-foreground">Cargando…</p>
        ) : (
          <form onSubmit={save} className="mt-6 space-y-5">
            {/* Email */}
            <section className={card}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 text-[#3D8B96]" />
                  <div>
                    <h2 className="font-semibold text-foreground">Email a recepción</h2>
                    <p className="text-sm text-muted-foreground">Un correo por cada solicitud nueva.</p>
                  </div>
                </div>
                <Toggle
                  label="Activar notificaciones por email"
                  checked={settings.email_enabled}
                  onChange={(v) => setSettings({ ...settings, email_enabled: v })}
                />
              </div>
              <label className="mt-4 block text-sm font-medium text-foreground">
                Destinatarios (uno por línea)
                <textarea
                  rows={3}
                  value={recipientsText}
                  onChange={(e) => setRecipientsText(e.target.value)}
                  className={`${input} mt-1 font-mono`}
                  placeholder="info@algoscentrodolor.com"
                />
              </label>
            </section>

            {/* Telegram */}
            <section className={card}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <MessageCircle className="mt-0.5 h-5 w-5 text-[#3D8B96]" />
                  <div>
                    <h2 className="font-semibold text-foreground">Telegram</h2>
                    <p className="text-sm text-muted-foreground">
                      Gratis e inmediato. Crea un bot con @BotFather y agrégalo al grupo de recepción.
                    </p>
                  </div>
                </div>
                <Toggle
                  label="Activar notificaciones por Telegram"
                  checked={settings.telegram_enabled}
                  onChange={(v) => setSettings({ ...settings, telegram_enabled: v })}
                />
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-foreground">
                  Token del bot
                  <input
                    type="password"
                    autoComplete="off"
                    value={telegramToken}
                    onChange={(e) => setTelegramToken(e.target.value)}
                    className={`${input} mt-1`}
                    placeholder={settings.telegram_bot_token_set ? "•••••••• (guardado)" : "123456:ABC-DEF..."}
                  />
                </label>
                <label className="block text-sm font-medium text-foreground">
                  Chat ID
                  <input
                    value={settings.telegram_chat_id}
                    onChange={(e) => setSettings({ ...settings, telegram_chat_id: e.target.value })}
                    className={`${input} mt-1`}
                    placeholder="-1001234567890"
                  />
                </label>
              </div>
              <button
                type="button"
                onClick={testTelegram}
                disabled={testing || !settings.telegram_bot_token_set}
                className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-lg border border-border px-4 text-sm disabled:opacity-50"
              >
                <Send className="h-4 w-4" /> {testing ? "Enviando…" : "Enviar mensaje de prueba"}
              </button>
              {!settings.telegram_bot_token_set && (
                <p className="mt-2 text-xs text-muted-foreground">Guarda primero el token para poder probar.</p>
              )}
            </section>

            {/* Twilio */}
            <section className={card}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 text-[#3D8B96]" />
                  <div>
                    <h2 className="font-semibold text-foreground">WhatsApp vía Twilio</h2>
                    <p className="text-sm text-muted-foreground">
                      Disponible cuando tengas el número de WhatsApp Business aprobado. Puedes guardar las credenciales desde ya.
                    </p>
                  </div>
                </div>
                <Toggle
                  label="Activar notificaciones por WhatsApp"
                  checked={settings.twilio_enabled}
                  onChange={(v) => setSettings({ ...settings, twilio_enabled: v })}
                />
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-foreground">
                  Account SID
                  <input
                    type="password"
                    autoComplete="off"
                    value={twilioSid}
                    onChange={(e) => setTwilioSid(e.target.value)}
                    className={`${input} mt-1`}
                    placeholder={settings.twilio_account_sid_set ? "•••••••• (guardado)" : "AC..."}
                  />
                </label>
                <label className="block text-sm font-medium text-foreground">
                  Auth Token
                  <input
                    type="password"
                    autoComplete="off"
                    value={twilioToken}
                    onChange={(e) => setTwilioToken(e.target.value)}
                    className={`${input} mt-1`}
                    placeholder={settings.twilio_auth_token_set ? "•••••••• (guardado)" : "••••"}
                  />
                </label>
                <label className="block text-sm font-medium text-foreground">
                  Número emisor (From)
                  <input
                    value={settings.twilio_from}
                    onChange={(e) => setSettings({ ...settings, twilio_from: e.target.value })}
                    className={`${input} mt-1`}
                    placeholder="whatsapp:+1415..."
                  />
                </label>
                <label className="block text-sm font-medium text-foreground">
                  Número de recepción (To)
                  <input
                    value={settings.twilio_to}
                    onChange={(e) => setSettings({ ...settings, twilio_to: e.target.value })}
                    className={`${input} mt-1`}
                    placeholder="whatsapp:+584146807886"
                  />
                </label>
              </div>
            </section>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#1A4A55] px-5 text-sm font-medium text-white disabled:opacity-60"
              >
                <Save className="h-4 w-4" /> {saving ? "Guardando…" : "Guardar cambios"}
              </button>
              {settings.updated_at && (
                <span className="text-xs text-muted-foreground">
                  Última actualización: {new Date(settings.updated_at).toLocaleString("es-VE")}
                </span>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
