import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export default function AdminForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function sendResetEmail() {
    setStatus("loading");
    setErrorMsg(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/reset-password`,
    });

    if (error) {
      setErrorMsg("No se pudo enviar el correo. Intenta de nuevo.");
      setStatus("error");
      return;
    }

    setStatus("sent");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await sendResetEmail();
  }

  return (
    <div className="min-h-screen bg-[#1a4a55] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <p className="text-[#c69636] text-xs font-bold tracking-[0.28em] uppercase mb-2 text-center">
          ALGOS · Panel interno
        </p>
        <h1 className="text-[#f5f0e8] font-display font-semibold text-2xl text-center mb-8">
          Restablecer contraseña
        </h1>

        {status === "sent" ? (
          <div className="space-y-4 text-center">
            <p className="text-[#f5f0e8]/90 text-sm leading-relaxed">
              Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.
              Revisa tu bandeja de entrada y la carpeta de spam.
            </p>
            <button
              type="button"
              onClick={sendResetEmail}
              disabled={status === "loading"}
              className="w-full border border-[#c69636]/60 text-[#c69636] hover:bg-[#c69636]/10 disabled:opacity-50 font-bold text-xs tracking-[0.15em] uppercase py-3 transition-colors"
            >
              {status === "loading" ? "Reenviando…" : "Reenviar email"}
            </button>
            <Link
              to="/admin/login"
              className="inline-block text-[#c69636] text-sm tracking-wider uppercase hover:underline"
            >
              Volver al inicio de sesión
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[#f5f0e8]/70 text-xs tracking-wider uppercase mb-1.5">
                Correo
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/10 border border-white/20 text-[#f5f0e8] placeholder-white/30 px-4 py-3 text-sm focus:outline-none focus:border-[#c69636] transition-colors"
                placeholder="admin@algoscentrodolor.com"
              />
            </div>

            {errorMsg && <p className="text-red-300 text-sm">{errorMsg}</p>}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-[#c69636] hover:bg-[#b8892e] disabled:opacity-50 text-[#1a4a55] font-bold text-sm tracking-[0.15em] uppercase py-3.5 transition-colors"
            >
              {status === "loading" ? "Enviando…" : "Enviar enlace"}
            </button>

            <div className="text-center pt-2">
              <Link
                to="/admin/login"
                className="text-[#f5f0e8]/60 text-xs tracking-wider uppercase hover:text-[#f5f0e8] transition-colors"
              >
                ← Volver
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
