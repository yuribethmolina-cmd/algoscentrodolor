import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { sendTemplateEmail } from "../_shared/transactional-email-templates/send-email.ts";


const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const ALLOWED_TYPES = new Set(["whatsapp_click", "appointment_submit", "cta_click"]);
const RATE_LIMIT_MAX = 10;   // max events per IP per window
const RATE_WINDOW_MS = 60_000; // 1-minute windows

function clean(v: unknown, max = 120): string | null {
  if (typeof v !== "string") return null;
  const s = v.trim().slice(0, max);
  return s.length > 0 ? s : null;
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
  // 1-minute window: YYYYMMDDHH24MI
  return new Date(Math.floor(Date.now() / RATE_WINDOW_MS) * RATE_WINDOW_MS)
    .toISOString()
    .replace(/[^0-9]/g, "")
    .slice(0, 12);
}

async function sendAndLog(
  templateName: string,
  to: string,
  templateData: Record<string, unknown>,
  idempotencyKey: string,
): Promise<void> {
  let status: "sent" | "suppressed" | "failed";
  let errorMessage: string | null = null;
  try {
    const result = await sendTemplateEmail(templateName, to, { templateData, idempotencyKey });
    status = result.sent ? "sent" : "suppressed";
  } catch (e) {
    status = "failed";
    errorMessage = (e instanceof Error ? e.message : String(e)).slice(0, 1000);
    console.error("email send failed", { templateName, error: errorMessage });
  }

  const { error: logError } = await supabase.from("email_send_log").insert({
    template_name: templateName,
    recipient_email: to,
    status,
    error_message: errorMessage,
  });
  if (logError) console.error("email_send_log insert error", logError);
}



Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // ── Rate limiting ─────────────────────────────────────────────────────────
    const forwarded = req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? "unknown";
    const ip = forwarded.split(",")[0].trim();
    const [ipHash, wKey] = await Promise.all([hashIp(ip), Promise.resolve(windowKey())]);

    const { data: rl, error: rlErr } = await supabase.rpc("upsert_rate_limit", {
      p_ip_hash: ipHash,
      p_window_key: wKey,
    });

    if (!rlErr && typeof rl === "number" && rl > RATE_LIMIT_MAX) {
      return new Response(JSON.stringify({ error: "too many requests" }), {
        status: 429,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          "Retry-After": "60",
        },
      });
    }

    // ── Validate payload ──────────────────────────────────────────────────────
    const body = await req.json().catch(() => ({}));
    const event_type = clean(body.event_type, 40);
    if (!event_type || !ALLOWED_TYPES.has(event_type)) {
      return new Response(JSON.stringify({ error: "invalid event_type" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const attribution = {
      utm_source: clean(body.utm_source, 120),
      utm_medium: clean(body.utm_medium, 120),
      utm_campaign: clean(body.utm_campaign, 120),
      utm_content: clean(body.utm_content, 120),
      utm_term: clean(body.utm_term, 120),
      landing_path: clean(body.landing_path, 250),
    };

    const row = {
      event_type,
      section: clean(body.section, 80),
      device: clean(body.device, 20),
      condition: clean(body.condition, 80),
      has_studies: clean(body.has_studies, 20),
      source: clean(body.source, 80),
      label: clean(body.label, 120),
      path: clean(body.path, 250),
      referrer: clean(body.referrer, 250),
      ...attribution,
    };

    const { error } = await supabase.from("conversion_events").insert(row);

    // Cada clic a WhatsApp genera además un lead rastreable por su código de origen.
    if (event_type === "whatsapp_click") {
      const source_code = clean(body.source_code, 80);
      if (source_code) {
        const patient_name = clean(body.patient_name, 80);
        const patient_phone = clean(body.patient_phone, 40);
        const rawEmail = clean(body.patient_email, 120);
        const patient_email =
          rawEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rawEmail)
            ? rawEmail.toLowerCase()
            : null;
        const section_label = clean(body.section_label, 80);
        const reason = clean(body.reason, 120);
        const { data: leadRow, error: leadErr } = await supabase
          .from("whatsapp_leads")
          .insert({
            source_code,
            section: row.section,
            section_label,
            cta_label: row.label,
            reason,
            path: row.path,
            device: row.device,
            referrer: row.referrer,
            patient_name,
            patient_phone,
            patient_email,
            ...attribution,
          })
          .select("id")
          .single();
        if (leadErr) console.error("lead insert error", leadErr);

        // Correo de agradecimiento al paciente que dejó su email.
        if (!leadErr && patient_email) {
          await sendAndLog(
            "gracias-lead",
            patient_email,
            {
              name: patient_name ?? undefined,
              reason: reason ?? undefined,
            },
            `gracias-lead-${leadRow?.id ?? source_code}`,
          );
        }

        // Aviso por email solo cuando el paciente dejó datos de contacto.
        if (!leadErr && (patient_name || patient_phone || patient_email)) {
          try {
            const { data: settings } = await supabase
              .from("notification_settings")
              .select("email_enabled, email_recipients")
              .eq("id", 1)
              .maybeSingle();

            const recipients: string[] = (settings?.email_enabled ?? true)
              ? (settings?.email_recipients?.length
                  ? settings.email_recipients
                  : ["info@algoscentrodolor.com"])
              : [];

            const templateData = {
              name: patient_name ?? undefined,
              phone: patient_phone ?? undefined,
              reason: reason ?? undefined,
              sectionLabel: section_label ?? undefined,
              device: row.device ?? undefined,
              path: row.path ?? undefined,
              sourceCode: source_code,
              createdAt: new Date().toISOString().slice(0, 16).replace("T", " ") + " UTC",
            };

            await Promise.allSettled(
              recipients.map((to) =>
                sendAndLog(
                  "nuevo-lead",
                  to,
                  templateData,
                  `nuevo-lead-${leadRow?.id ?? source_code}-${to}`,
                ),
              ),
            );

          } catch (notifyErr) {
            console.error("lead notify error", notifyErr);
          }
        }
      }
    }


    if (error) {
      console.error("insert error", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("track-conversion error", e);
    return new Response(JSON.stringify({ error: "bad request" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
