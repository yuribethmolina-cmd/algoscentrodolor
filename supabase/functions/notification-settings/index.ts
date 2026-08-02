import { createClient } from "npm:@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const ANON = Deno.env.get("SUPABASE_ANON_KEY")!;

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

async function requireAdmin(req: Request) {
  const token = (req.headers.get("Authorization") ?? "").replace(/^Bearer\s+/i, "");
  if (!token) return { error: "missing_token" as const };

  const userClient = createClient(SUPABASE_URL, ANON, {
    global: { headers: { Authorization: `Bearer ${token}` } },
  });
  const { data: userData, error: userErr } = await userClient.auth.getUser();
  if (userErr || !userData.user) return { error: "invalid_token" as const };

  const admin = createClient(SUPABASE_URL, SERVICE_ROLE);
  const { data: roles } = await admin
    .from("user_roles")
    .select("role")
    .eq("user_id", userData.user.id);
  if (!(roles ?? []).some((r) => r.role === "admin")) return { error: "not_admin" as const };
  return { user: userData.user, admin };
}

const str = (v: unknown, max = 300): string | null => {
  if (typeof v !== "string") return null;
  const s = v.trim().slice(0, max);
  return s.length ? s : null;
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const gate = await requireAdmin(req);
    if ("error" in gate) return json({ error: gate.error }, 401);
    const { admin, user } = gate;

    const action = new URL(req.url).searchParams.get("action") ?? "get";

    const { data: current } = await admin
      .from("notification_settings")
      .select("*")
      .eq("id", 1)
      .maybeSingle();

    const settings = current ?? { id: 1 };

    const masked = {
      email_enabled: settings.email_enabled ?? true,
      email_recipients: settings.email_recipients ?? [],
      telegram_enabled: settings.telegram_enabled ?? false,
      telegram_chat_id: settings.telegram_chat_id ?? "",
      telegram_bot_token_set: Boolean(settings.telegram_bot_token),
      twilio_enabled: settings.twilio_enabled ?? false,
      twilio_from: settings.twilio_from ?? "",
      twilio_to: settings.twilio_to ?? "",
      twilio_account_sid_set: Boolean(settings.twilio_account_sid),
      twilio_auth_token_set: Boolean(settings.twilio_auth_token),
      updated_at: settings.updated_at ?? null,
    };

    if (req.method === "GET" || action === "get") return json({ settings: masked });

    if (action === "save") {
      const body = await req.json().catch(() => ({}));

      const recipients = Array.isArray(body.email_recipients)
        ? body.email_recipients
            .map((e: unknown) => str(e, 200)?.toLowerCase())
            .filter((e: string | null | undefined): e is string =>
              Boolean(e && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)),
            )
            .slice(0, 10)
        : settings.email_recipients ?? [];

      const patch: Record<string, unknown> = {
        id: 1,
        email_enabled: Boolean(body.email_enabled),
        email_recipients: recipients,
        telegram_enabled: Boolean(body.telegram_enabled),
        telegram_chat_id: str(body.telegram_chat_id, 60),
        twilio_enabled: Boolean(body.twilio_enabled),
        twilio_from: str(body.twilio_from, 40),
        twilio_to: str(body.twilio_to, 40),
        updated_at: new Date().toISOString(),
        updated_by: user.id,
      };

      // Los secretos solo se sobrescriben si llegan con valor nuevo.
      const secretFields: Array<[string, string]> = [
        ["telegram_bot_token", "telegram_bot_token"],
        ["twilio_account_sid", "twilio_account_sid"],
        ["twilio_auth_token", "twilio_auth_token"],
      ];
      for (const [key] of secretFields) {
        if (body[`${key}_clear`] === true) patch[key] = null;
        else {
          const v = str(body[key], 300);
          if (v) patch[key] = v;
        }
      }

      if (patch.email_enabled && recipients.length === 0) {
        return json({ error: "Agrega al menos un correo destinatario." }, 400);
      }
      if (patch.telegram_enabled) {
        const token = (patch.telegram_bot_token as string) ?? settings.telegram_bot_token;
        if (!token || !patch.telegram_chat_id) {
          return json({ error: "Telegram requiere token del bot y chat ID." }, 400);
        }
      }
      if (patch.twilio_enabled) {
        const sid = (patch.twilio_account_sid as string) ?? settings.twilio_account_sid;
        const auth = (patch.twilio_auth_token as string) ?? settings.twilio_auth_token;
        if (!sid || !auth || !patch.twilio_from || !patch.twilio_to) {
          return json({ error: "Twilio requiere SID, token y ambos números." }, 400);
        }
      }

      const { error } = await admin.from("notification_settings").upsert(patch, { onConflict: "id" });
      if (error) {
        console.error("save settings error", error);
        return json({ error: "No se pudo guardar la configuración." }, 500);
      }

      await admin.from("admin_audit_log").insert({
        user_id: user.id,
        user_email: user.email,
        action: "notification_settings_update",
        metadata: {
          email_enabled: patch.email_enabled,
          telegram_enabled: patch.telegram_enabled,
          twilio_enabled: patch.twilio_enabled,
        },
      });

      return json({ ok: true });
    }

    if (action === "test-telegram") {
      const token = settings.telegram_bot_token;
      const chatId = settings.telegram_chat_id;
      if (!token || !chatId) return json({ error: "Guarda primero el token y el chat ID." }, 400);

      const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: "✅ Prueba de notificaciones ALGOS: la conexión con Telegram funciona.",
        }),
      });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok || payload?.ok === false) {
        console.error("telegram test failed", res.status, payload);
        return json({ error: payload?.description ?? `Telegram respondió ${res.status}` }, 400);
      }
      return json({ ok: true });
    }

    return json({ error: "unknown_action" }, 400);
  } catch (e) {
    console.error("notification-settings error", e);
    return json({ error: "unexpected_error" }, 500);
  }
});
