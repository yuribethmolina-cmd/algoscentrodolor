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
  const auth = req.headers.get("Authorization") ?? "";
  const token = auth.replace(/^Bearer\s+/i, "");
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
  const isAdmin = (roles ?? []).some((r) => r.role === "admin");
  if (!isAdmin) return { error: "not_admin" as const };
  return { user: userData.user, admin };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const gate = await requireAdmin(req);
    if ("error" in gate) return json({ error: gate.error }, 401);
    const { admin, user: caller } = gate;

    const url = new URL(req.url);
    const action = url.searchParams.get("action") ?? "list";

    if (req.method === "GET" && action === "list") {
      const { data: roles } = await admin
        .from("user_roles")
        .select("user_id, role, created_at")
        .eq("role", "admin");

      const ids = (roles ?? []).map((r) => r.user_id);
      const results: Array<{ id: string; email: string | null; created_at: string; last_sign_in_at: string | null }> = [];
      for (const id of ids) {
        const { data } = await admin.auth.admin.getUserById(id);
        if (data?.user) {
          results.push({
            id: data.user.id,
            email: data.user.email ?? null,
            created_at: (roles ?? []).find((r) => r.user_id === id)?.created_at ?? data.user.created_at,
            last_sign_in_at: data.user.last_sign_in_at ?? null,
          });
        }
      }
      return json({ admins: results.sort((a, b) => (a.email ?? "").localeCompare(b.email ?? "")) });
    }

    if (req.method === "POST" && action === "invite") {
      const body = await req.json().catch(() => ({}));
      const email = String(body.email ?? "").trim().toLowerCase();
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return json({ error: "invalid_email" }, 400);
      }

      const origin = req.headers.get("origin") ?? "https://algoscentrodolor.com";
      const redirectTo = `${origin}/admin/reset-password`;

      const { data: invited, error: inviteErr } = await admin.auth.admin.inviteUserByEmail(email, { redirectTo });
      let userId = invited?.user?.id ?? null;

      if (inviteErr) {
        // Likely user already exists — look them up
        const { data: list } = await admin.auth.admin.listUsers({ page: 1, perPage: 200 });
        const existing = list?.users.find((u) => (u.email ?? "").toLowerCase() === email);
        if (!existing) return json({ error: "invite_failed", detail: inviteErr.message }, 400);
        userId = existing.id;
        // Send a magic link so they can enter and set password
        await admin.auth.admin.generateLink({ type: "magiclink", email, options: { redirectTo } });
      }

      if (!userId) return json({ error: "no_user_id" }, 500);

      const { error: roleErr } = await admin
        .from("user_roles")
        .upsert({ user_id: userId, role: "admin" }, { onConflict: "user_id,role" });
      if (roleErr) return json({ error: "role_assign_failed", detail: roleErr.message }, 500);

      await admin.from("admin_audit_log").insert({
        action: "admin_invited",
        user_email: email,
        user_id: caller.id,
        metadata: { target_user_id: userId },
      });

      return json({ ok: true, email, user_id: userId, already_existed: !!inviteErr });
    }

    if (req.method === "POST" && action === "revoke") {
      const body = await req.json().catch(() => ({}));
      const targetId = String(body.user_id ?? "");
      if (!targetId) return json({ error: "missing_user_id" }, 400);
      if (targetId === caller.id) return json({ error: "cannot_revoke_self" }, 400);

      const { error: delErr } = await admin
        .from("user_roles")
        .delete()
        .eq("user_id", targetId)
        .eq("role", "admin");
      if (delErr) return json({ error: "revoke_failed", detail: delErr.message }, 500);

      await admin.from("admin_audit_log").insert({
        action: "admin_revoked",
        user_id: caller.id,
        metadata: { target_user_id: targetId },
      });

      return json({ ok: true });
    }

    return json({ error: "unknown_action" }, 400);
  } catch (e) {
    return json({ error: "server_error", detail: String(e) }, 500);
  }
});
