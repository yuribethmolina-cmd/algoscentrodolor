import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

type Status = "loading" | "authorized" | "unauthenticated" | "forbidden";

export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    let cancelled = false;

    async function check() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        if (!cancelled) setStatus("unauthenticated");
        return;
      }

      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (!cancelled) setStatus(data ? "authorized" : "forbidden");
    }

    check();
    return () => { cancelled = true; };
  }, []);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center">
        <span className="text-[#1a4a55]/60 text-sm">Verificando acceso…</span>
      </div>
    );
  }

  if (status === "unauthenticated") return <Navigate to="/admin/login" replace />;
  if (status === "forbidden") {
    return (
      <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center">
        <p className="text-[#1a4a55]/70 text-sm">Acceso denegado.</p>
      </div>
    );
  }

  return <>{children}</>;
}
