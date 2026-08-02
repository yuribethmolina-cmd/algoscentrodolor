import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const RATE_LIMIT_MAX = 5;
const RATE_WINDOW_MS = 60_000;

function clean(v: unknown, max = 200): string | null {
  if (typeof v !== "string") return null;
  const s = v.trim().slice(0, max);
  return s.length > 0 ? s : null;
}

function cleanPhone(v: unknown): string | null {
  const s = clean(v, 30);
  if (!s) return null;
  const digits = s.replace(/[^\d+]/g, "");
  if (digits.replace(/\D/g, "").length < 7) return null;
  return digits;
}

function cleanEmail(v: unknown): string | null {
  const s = clean(v, 200);
  if (!s) return null;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) ? s.toLowerCase() : null;
}

function cleanDate(v: unknown): string | null {
  const s = clean(v, 20);
  if (!s) return null;
  return /^\d{4}-\d{2}-\d{2}$/.test(s) ? s : null;
}

function cleanShift(v: unknown): string | null {
  const s = clean(v, 20);
  if (!s) return null;
  return ["manana", "mañana", "tarde", "cualquiera"].includes(s.toLowerCase()) ? s.toLowerCase() : null;
}

async function hashIp(ip: string): Promise<string> {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(ip + Deno.env.get("SUPABASE_URL")),
  );
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 32);
}

function windowKey(): string {
  return new Date(Math.floor(Date.now() / RATE_WINDOW_MS) * RATE_WINDOW_MS)
    .toISOString()
    .replace(/[^0-9]/g, "")
    .slice(0, 12);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const forwarded = req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? "unknown";
    const ip = forwarded.split(",")[0].trim();
    const ipHash = await hashIp(ip);
    const wKey = windowKey();

    const { data: rl } = await supabase.rpc("upsert_rate_limit", {
      p_ip_hash: `apt:${ipHash}`,
      p_window_key: wKey,
    });
    if (typeof rl === "number" && rl > RATE_LIMIT_MAX) {
      return new Response(JSON.stringify({ error: "too many requests" }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json", "Retry-After": "60" },
      });
    }

    const body = await req.json().catch(() => ({}));

    const name = clean(body.name, 120);
    const phone = cleanPhone(body.phone);
    if (!name || name.length < 2) {
      return new Response(JSON.stringify({ error: "Nombre requerido" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!phone) {
      return new Response(JSON.stringify({ error: "Teléfono válido requerido" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const row = {
      name,
      phone,
      email: cleanEmail(body.email),
      condition: clean(body.condition, 80),
      has_studies: clean(body.has_studies, 20),
      preferred_date: cleanDate(body.preferred_date),
      preferred_shift: cleanShift(body.preferred_shift),
      notes: clean(body.notes, 500),
      source_section: clean(body.source_section, 80),
      device: clean(body.device, 20),
    };

    const { data: inserted, error } = await supabase
      .from("appointment_requests")
      .insert(row)
      .select("id")
      .single();

    if (error) {
      console.error("insert error", error);
      return new Response(JSON.stringify({ error: "no se pudo guardar" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Also register a conversion event for the existing dashboard.
    await supabase.from("conversion_events").insert({
      event_type: "appointment_submit",
      section: row.source_section ?? "form_agendar",
      device: row.device,
      condition: row.condition,
      has_studies: row.has_studies,
      source: "form_agendar",
    });

    // Configuración de notificaciones (panel /admin/configuracion)
    const { data: settings } = await supabase
      .from("notification_settings")
      .select("*")
      .eq("id", 1)
      .maybeSingle();

    const emailEnabled = settings?.email_enabled ?? true;
    const notifyRecipients: string[] = emailEnabled
      ? (settings?.email_recipients?.length
          ? settings.email_recipients
          : ["info@algoscentrodolor.com", "recepcionalgos@algoscentrodolor.com"])
      : [];

    const templateData = {
      name: row.name,
      phone: row.phone,
      email: row.email ?? undefined,
      condition: row.condition ?? undefined,
      hasStudies: row.has_studies ?? undefined,
      preferredDate: row.preferred_date ?? undefined,
      preferredShift: row.preferred_shift ?? undefined,
      notes: row.notes ?? undefined,
      sourceSection: row.source_section ?? undefined,
      device: row.device ?? undefined,
      createdAt: new Date().toISOString().slice(0, 16).replace("T", " ") + " UTC",
      appointmentId: inserted.id,
    };

    await Promise.allSettled(
      notifyRecipients.map((to) =>
        supabase.functions.invoke("send-transactional-email", {
          body: {
            templateName: "nueva-cita",
            recipientEmail: to,
            idempotencyKey: `nueva-cita-${inserted.id}-${to}`,
            templateData,
          },
        }),
      ),
    ).then((results) =>
      results.forEach((r) => {
        if (r.status === "rejected") console.error("notify email failed", r.reason);
        else if (r.value?.error) console.error("notify email error", r.value.error);
      }),
    );

    // Aviso por Telegram si está habilitado en el panel
    if (settings?.telegram_enabled && settings.telegram_bot_token && settings.telegram_chat_id) {
      const text = [
        "🩺 *Nueva solicitud de cita — ALGOS*",
        `👤 ${row.name}`,
        `📞 ${row.phone}`,
        row.email ? `✉️ ${row.email}` : null,
        row.condition ? `🧾 ${row.condition}` : null,
        row.preferred_date ? `📅 ${row.preferred_date} ${row.preferred_shift ?? ""}`.trim() : null,
        row.notes ? `📝 ${row.notes}` : null,
      ].filter(Boolean).join("\n");

      try {
        const tg = await fetch(`https://api.telegram.org/bot${settings.telegram_bot_token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: settings.telegram_chat_id, text, parse_mode: "Markdown" }),
        });
        if (!tg.ok) console.error("telegram notify failed", tg.status, await tg.text());
      } catch (tgErr) {
        console.error("telegram notify error", tgErr);
      }
    }


    // Confirmación al paciente (si dejó email)
    if (row.email) {
      const { error: confirmError } = await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "confirmacion-cita",
          recipientEmail: row.email,
          idempotencyKey: `confirmacion-cita-${inserted.id}`,
          templateData: {
            name: row.name,
            phone: row.phone,
            condition: row.condition ?? undefined,
            preferredDate: row.preferred_date ?? undefined,
            preferredShift: row.preferred_shift ?? undefined,
          },
        },
      });
      if (confirmError) console.error("confirmation email error", confirmError);
    }

    return new Response(JSON.stringify({ ok: true, id: inserted.id }), {

      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("submit-appointment error", e);
    return new Response(JSON.stringify({ error: "bad request" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
