import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    let raw: string | number | null = url.searchParams.get("days_back");
    if (raw == null && (req.method === "POST" || req.method === "PUT")) {
      const body = await req.json().catch(() => ({}));
      raw = body?.days_back ?? null;
    }
    const parsed = typeof raw === "number" ? raw : parseInt(String(raw ?? "7"), 10);
    const days_back = Number.isFinite(parsed) ? Math.min(365, Math.max(1, parsed)) : 7;

    const { data, error } = await supabase.rpc("get_conversion_summary", { days_back });
    if (error) {
      console.error("summary rpc error", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(data ?? {}), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("get-conversions-summary error", e);
    return new Response(JSON.stringify({ error: "bad request" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
