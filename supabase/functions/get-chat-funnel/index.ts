import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const serviceClient = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

async function getAdminUser(authHeader: string | null) {
  if (!authHeader?.startsWith("Bearer ")) return null;
  const token = authHeader.slice(7);
  const userClient = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: `Bearer ${token}` } } },
  );
  const { data: { user }, error } = await userClient.auth.getUser();
  if (error || !user) return null;
  const { data: role } = await serviceClient
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .eq("role", "admin")
    .maybeSingle();
  if (!role) return null;
  return user;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const user = await getAdminUser(req.headers.get("Authorization"));
    if (!user) {
      return new Response(JSON.stringify({ error: "unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let raw: string | number | null = new URL(req.url).searchParams.get("days_back");
    if (raw == null && (req.method === "POST" || req.method === "PUT")) {
      const body = await req.json().catch(() => ({}));
      raw = body?.days_back ?? null;
    }
    const parsed = typeof raw === "number" ? raw : parseInt(String(raw ?? "7"), 10);
    const days_back = Number.isFinite(parsed) ? Math.min(365, Math.max(1, parsed)) : 7;

    const { data, error } = await serviceClient.rpc("get_chat_funnel", { days_back });
    if (error) {
      console.error("chat funnel rpc error", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    await serviceClient.from("admin_audit_log").insert({
      user_id: user.id,
      user_email: user.email,
      action: "view_chat_funnel",
      metadata: { days_back },
    });

    return new Response(JSON.stringify(data ?? {}), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("get-chat-funnel error", e);
    return new Response(JSON.stringify({ error: "bad request" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
