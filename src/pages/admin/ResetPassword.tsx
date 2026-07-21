import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function AdminResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [resendStatus, setResendStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");

  useEffect(() => {
    // Supabase auto-processes the recovery token in the URL hash and fires
    // a PASSWORD_RECOVERY event. We wait for a session before enabling the form.
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || session) setReady(true);
      if (session?.user?.email) setEmail(session.user.email);
    });

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
      if (data.session?.user?.email) setEmail(data.session.user.email);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    if (password !== confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setStatus("loading");
    const { error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      setError("No se pudo actualizar la contraseña. El enlace puede haber expirado.");
      setStatus("idle");
      return;
    }

    setStatus("done");
    setTimeout(() => navigate("/admin/conversiones", { replace: true }), 1500);
  }

  async function handleResend() {
    if (!email) return;
    setResendStatus("loading");
    const { error: resendError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/reset-password`,
    });
    if (resendError) {
      setResendStatus("error");
      return;
    }
    setResendStatus("sent");
  }

  return (
    <div className="min-h-screen bg-[#1a4a55] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <p className="text-[#c69636] text-xs font-bold tracking-[0.28em] uppercase mb-2 text-center">
          ALGOS · Panel interno
        </p>
        <h1 className="text-[#f5f0e8] font-display font-semibold text-2xl text-center mb-8">
          Nueva contraseña
        </h1>

        {status === "done" ? (
          <p className="text-[#f5f0e8]/90 text-sm text-center">
            Contraseña actualizada. Redirigiendo…
          </p>
        ) : !ready ? (
          <p className="text-[#f5f0e8]/70 text-sm text-center">
            Verificando enlace de restablecimiento…
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[#f5f0e8]/70 text-xs tracking-wider uppercase mb-1.5">
                Nueva contraseña
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/10 border border-white/20 text-[#f5f0e8] placeholder-white/30 px-4 py-3 text-sm focus:outline-none focus:border-[#c69636] transition-colors"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-[#f5f0e8]/70 text-xs tracking-wider uppercase mb-1.5">
                Confirmar contraseña
              </label>
              <input
                type="password"
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full bg-white/10 border border-white/20 text-[#f5f0e8] placeholder-white/30 px-4 py-3 text-sm focus:outline-none focus:border-[#c69636] transition-colors"
                placeholder="••••••••"
              />
            </div>

            {error && <p className="text-red-300 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-[#c69636] hover:bg-[#b8892e] disabled:opacity-50 text-[#1a4a55] font-bold text-sm tracking-[0.15em] uppercase py-3.5 transition-colors"
            >
              {status === "loading" ? "Guardando…" : "Guardar contraseña"}
            </button>

            {email ? (
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendStatus === "loading"}
                  className="text-[#f5f0e8]/60 text-xs tracking-wider uppercase hover:text-[#f5f0e8] disabled:opacity-50 transition-colors"
                >
                  {resendStatus === "loading"
                    ? "Reenviando…"
                    : resendStatus === "sent"
                      ? "Email reenviado"
                      : resendStatus === "error"
                        ? "Error al reenviar"
                        : "¿No recibiste el email? Reenviar"}
                </button>
              </div>
            ) : (
              <div className="text-center pt-2">
                <Link
                  to="/admin/forgot-password"
                  className="text-[#f5f0e8]/60 text-xs tracking-wider uppercase hover:text-[#f5f0e8] transition-colors"
                >
                  ¿No recibiste el email? Solicitar nuevo enlace
                </Link>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
