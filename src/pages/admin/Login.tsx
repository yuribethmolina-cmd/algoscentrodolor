import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const REMEMBER_KEY = "algos_admin_remember_email";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(REMEMBER_KEY);
      if (saved) {
        setEmail(saved);
        setRemember(true);
      }
    } catch {}
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError("Credenciales incorrectas.");
      setLoading(false);
      return;
    }

    try {
      if (remember) localStorage.setItem(REMEMBER_KEY, email);
      else localStorage.removeItem(REMEMBER_KEY);
    } catch {}

    navigate("/admin/conversiones", { replace: true });
  }

  return (
    <div className="min-h-screen bg-[#1a4a55] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <p className="text-[#c69636] text-xs font-bold tracking-[0.28em] uppercase mb-2 text-center">
          ALGOS · Panel interno
        </p>
        <h1 className="text-[#f5f0e8] font-display font-semibold text-2xl text-center mb-8">
          Acceso administrador
        </h1>

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

          <div>
            <label className="block text-[#f5f0e8]/70 text-xs tracking-wider uppercase mb-1.5">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/10 border border-white/20 text-[#f5f0e8] placeholder-white/30 px-4 py-3 pr-11 text-sm focus:outline-none focus:border-[#c69636] transition-colors"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#f5f0e8]/60 hover:text-[#f5f0e8] transition-colors"
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-red-300 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#c69636] hover:bg-[#b8892e] disabled:opacity-50 text-[#1a4a55] font-bold text-sm tracking-[0.15em] uppercase py-3.5 transition-colors"
          >
            {loading ? "Verificando…" : "Entrar"}
          </button>

          <div className="text-center pt-2">
            <Link
              to="/admin/forgot-password"
              className="text-[#f5f0e8]/70 text-xs tracking-wider uppercase hover:text-[#c69636] transition-colors"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
