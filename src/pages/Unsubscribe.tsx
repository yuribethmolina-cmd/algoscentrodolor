import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

type State = "loading" | "valid" | "invalid" | "already" | "done" | "error";

const Unsubscribe = () => {
  const [params] = useSearchParams();
  const token = params.get("token") ?? "";
  const [state, setState] = useState<State>("loading");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!token) {
      setState("invalid");
      return;
    }
    const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`;
    fetch(url, { headers: { apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY } })
      .then(async (r) => {
        const data = await r.json().catch(() => ({}));
        if (!r.ok) return setState("invalid");
        if (data.valid) return setState("valid");
        if (data.reason === "already_unsubscribed") return setState("already");
        setState("invalid");
      })
      .catch(() => setState("error"));
  }, [token]);

  const confirm = async () => {
    setBusy(true);
    const { data, error } = await supabase.functions.invoke("handle-email-unsubscribe", {
      body: { token },
    });
    setBusy(false);
    if (error) return setState("error");
    if (data?.success) return setState("done");
    if (data?.reason === "already_unsubscribed") return setState("already");
    setState("error");
  };

  const messages: Record<State, string> = {
    loading: "Verificando tu solicitud…",
    valid: "¿Deseas dejar de recibir correos de ALGOS?",
    invalid: "Este enlace no es válido o ya expiró.",
    already: "Ya habías cancelado la suscripción. No recibirás más correos.",
    done: "Listo. No volverás a recibir correos de ALGOS.",
    error: "Ocurrió un error. Intenta de nuevo más tarde.",
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        <p className="text-sm font-semibold tracking-wide text-primary">ALGOS</p>
        <h1 className="mt-2 text-xl font-semibold text-foreground">
          Cancelar suscripción
        </h1>
        <p className="mt-4 text-muted-foreground">{messages[state]}</p>

        {state === "valid" && (
          <button
            onClick={confirm}
            disabled={busy}
            className="mt-6 w-full rounded-lg bg-primary px-4 py-3 font-medium text-primary-foreground disabled:opacity-60"
          >
            {busy ? "Procesando…" : "Confirmar"}
          </button>
        )}

        <Link to="/" className="mt-6 inline-block text-sm text-primary underline">
          Volver al inicio
        </Link>
      </div>
    </main>
  );
};

export default Unsubscribe;
