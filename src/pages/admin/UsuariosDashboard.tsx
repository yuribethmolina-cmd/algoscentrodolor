import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ChevronLeft, LogOut, RefreshCw, UserPlus, Trash2, Mail } from "lucide-react";

interface AdminUser {
  id: string;
  email: string | null;
  created_at: string;
  last_sign_in_at: string | null;
}

export default function UsuariosDashboard() {
  const navigate = useNavigate();
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [inviting, setInviting] = useState(false);
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState<{ type: "ok" | "err"; msg: string } | null>(null);
  const [me, setMe] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase.functions.invoke("admin-users", {
      method: "GET",
      body: undefined as any,
    });
    if (error) {
      setFeedback({ type: "err", msg: "No se pudo cargar la lista de admins." });
    } else {
      setAdmins((data as any)?.admins ?? []);
    }
    const { data: userData } = await supabase.auth.getUser();
    setMe(userData.user?.id ?? null);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function invite(e: React.FormEvent) {
    e.preventDefault();
    setInviting(true);
    setFeedback(null);
    const { data, error } = await supabase.functions.invoke("admin-users?action=invite", {
      body: { email: email.trim() },
    });
    if (error || (data as any)?.error) {
      const detail = (data as any)?.error ?? error?.message ?? "unknown";
      setFeedback({ type: "err", msg: `No se pudo invitar: ${detail}` });
    } else {
      const already = (data as any)?.already_existed;
      setFeedback({
        type: "ok",
        msg: already
          ? `${email} ya tenía cuenta — se le envió un magic link y se le asignó rol admin.`
          : `Invitación enviada a ${email}. Recibirá un correo para crear su contraseña.`,
      });
      setEmail("");
      await load();
    }
    setInviting(false);
  }

  async function revoke(id: string, adminEmail: string | null) {
    if (!confirm(`¿Quitar acceso admin a ${adminEmail ?? id}?`)) return;
    const { data, error } = await supabase.functions.invoke("admin-users?action=revoke", {
      body: { user_id: id },
    });
    if (error || (data as any)?.error) {
      setFeedback({ type: "err", msg: `No se pudo revocar: ${(data as any)?.error ?? error?.message}` });
    } else {
      setFeedback({ type: "ok", msg: `Acceso revocado a ${adminEmail ?? id}.` });
      await load();
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/admin/login", { replace: true });
  }

  return (
    <div className="min-h-screen bg-[#f5f0e8] py-10 px-4 md:px-12">
      <div className="mx-auto max-w-4xl">
        <header className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <Link to="/admin/conversiones" className="inline-flex items-center gap-1 text-[#1a4a55]/60 hover:text-[#1a4a55] text-xs mb-2">
              <ChevronLeft size={14} /> Volver a conversiones
            </Link>
            <p className="text-[#c69636] font-medium text-xs tracking-[0.25em] uppercase mb-2">PANEL INTERNO</p>
            <h1 className="font-display font-bold text-[#1a4a55] text-3xl md:text-4xl">Administradores</h1>
            <p className="text-[#1a4a55]/70 text-sm mt-2">
              Invita a nuevos admins por correo. Recibirán un enlace para crear su contraseña.
            </p>
          </div>
          <div className="flex gap-2">
            <button onClick={load} className="p-2 rounded-md border border-[#1a4a55]/20 bg-white text-[#1a4a55] hover:bg-[#1a4a55]/5">
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            </button>
            <button onClick={handleLogout} className="p-2 rounded-md border border-[#1a4a55]/20 bg-white text-[#1a4a55]/60 hover:bg-red-50 hover:text-red-600" title="Cerrar sesión">
              <LogOut size={16} />
            </button>
          </div>
        </header>

        <form onSubmit={invite} className="rounded-md border border-[#1a4a55]/15 bg-white p-5 mb-6">
          <label className="block text-xs font-semibold text-[#1a4a55] uppercase tracking-wider mb-2">
            Invitar nuevo admin
          </label>
          <div className="flex flex-wrap gap-2">
            <div className="flex-1 min-w-[240px] relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1a4a55]/40" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="correo@ejemplo.com"
                className="w-full pl-9 pr-3 py-2.5 rounded-md border border-[#1a4a55]/20 text-sm text-[#1a4a55] focus:outline-none focus:border-[#1a4a55]"
              />
            </div>
            <button
              type="submit"
              disabled={inviting || !email}
              className="inline-flex items-center gap-2 rounded-md bg-[#1a4a55] text-white text-sm px-4 py-2.5 hover:bg-[#123640] disabled:opacity-50"
            >
              <UserPlus size={14} />
              {inviting ? "Enviando..." : "Enviar invitación"}
            </button>
          </div>
          {feedback && (
            <p className={`mt-3 text-sm ${feedback.type === "ok" ? "text-emerald-700" : "text-red-700"}`}>
              {feedback.msg}
            </p>
          )}
        </form>

        <div className="rounded-md border border-[#1a4a55]/15 bg-white overflow-hidden">
          <div className="px-5 py-3 border-b border-[#1a4a55]/10 text-xs uppercase tracking-wider text-[#1a4a55]/60">
            Admins activos ({admins.length})
          </div>
          {admins.length === 0 ? (
            <p className="p-8 text-center text-sm text-[#1a4a55]/50 italic">
              {loading ? "Cargando..." : "Sin admins registrados."}
            </p>
          ) : (
            <ul className="divide-y divide-[#1a4a55]/10">
              {admins.map((a) => (
                <li key={a.id} className="p-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-medium text-[#1a4a55] truncate">
                      {a.email ?? "(sin email)"}
                      {a.id === me && <span className="ml-2 text-xs text-[#c69636]">· tú</span>}
                    </div>
                    <div className="text-xs text-[#1a4a55]/50 tabular-nums">
                      Alta: {new Date(a.created_at).toLocaleDateString("es-VE")} ·{" "}
                      Último acceso: {a.last_sign_in_at ? new Date(a.last_sign_in_at).toLocaleString("es-VE", { dateStyle: "short", timeStyle: "short" }) : "nunca"}
                    </div>
                  </div>
                  <button
                    onClick={() => revoke(a.id, a.email)}
                    disabled={a.id === me}
                    className="inline-flex items-center gap-1 text-sm text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-md disabled:opacity-30 disabled:cursor-not-allowed"
                    title={a.id === me ? "No puedes revocarte a ti mismo" : "Revocar acceso"}
                  >
                    <Trash2 size={14} /> Revocar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
