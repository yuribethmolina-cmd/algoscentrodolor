import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ArrowDownLeft, ArrowUpRight, Info, Send } from "lucide-react";

type Direction = "entrante" | "saliente" | "sistema";

interface LeadMessage {
  id: string;
  occurred_at: string;
  direction: Direction;
  body: string;
  ref_code: string | null;
}

const DIRECTION_META: Record<Direction, { label: string; box: string; icon: typeof Info }> = {
  entrante: { label: "Paciente", box: "bg-emerald-50 border-emerald-200", icon: ArrowDownLeft },
  saliente: { label: "ALGOS", box: "bg-blue-50 border-blue-200", icon: ArrowUpRight },
  sistema: { label: "Sistema", box: "bg-[#1a4a55]/5 border-[#1a4a55]/15", icon: Info },
};

export default function LeadTimeline({ leadId, refCode }: { leadId: string; refCode: string }) {
  const [items, setItems] = useState<LeadMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [body, setBody] = useState("");
  const [direction, setDirection] = useState<Direction>("entrante");
  const [sending, setSending] = useState(false);

  const load = async () => {
    const { data } = await supabase
      .from("lead_messages")
      .select("id, occurred_at, direction, body, ref_code")
      .eq("lead_id", leadId)
      .order("occurred_at", { ascending: true });
    setItems((data as LeadMessage[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leadId]);

  const add = async () => {
    const text = body.trim();
    if (!text) return;
    setSending(true);
    const { data: auth } = await supabase.auth.getUser();
    const { error } = await supabase.from("lead_messages").insert({
      lead_id: leadId,
      direction,
      body: text,
      ref_code: refCode,
      created_by: auth.user?.id ?? null,
    });
    setSending(false);
    if (!error) {
      setBody("");
      load();
    }
  };

  return (
    <div className="md:col-span-2 border-t border-[#1a4a55]/10 pt-3">
      <h4 className="text-xs font-semibold uppercase tracking-wide text-[#1a4a55] mb-2">
        Historial de la conversación
      </h4>

      {loading ? (
        <p className="text-xs text-[#1a4a55]/50 italic">Cargando historial...</p>
      ) : items.length === 0 ? (
        <p className="text-xs text-[#1a4a55]/50 italic">Sin registros todavía.</p>
      ) : (
        <ol className="space-y-2 mb-3 max-h-72 overflow-y-auto pr-1">
          {items.map((m) => {
            const meta = DIRECTION_META[m.direction] ?? DIRECTION_META.sistema;
            const Icon = meta.icon;
            return (
              <li key={m.id} className={`rounded-lg border px-3 py-2 ${meta.box}`}>
                <div className="flex flex-wrap items-center gap-2 mb-0.5">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1a4a55]">
                    <Icon size={12} /> {meta.label}
                  </span>
                  <span className="text-[11px] text-[#1a4a55]/50 tabular-nums">
                    {new Date(m.occurred_at).toLocaleString("es-VE", { dateStyle: "short", timeStyle: "short" })}
                  </span>
                  {m.ref_code && (
                    <span className="font-mono text-[10px] bg-white/70 border border-[#1a4a55]/15 rounded px-1 py-0.5 text-[#1a4a55]/70">
                      [Ref: {m.ref_code}]
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#1a4a55]/85 whitespace-pre-wrap break-words">{m.body}</p>
              </li>
            );
          })}
        </ol>
      )}

      <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
        <select
          value={direction}
          onChange={(e) => setDirection(e.target.value as Direction)}
          className="rounded-md border border-[#1a4a55]/20 bg-white px-2 py-1.5 text-sm text-[#1a4a55] sm:w-40"
        >
          <option value="entrante">Mensaje del paciente</option>
          <option value="saliente">Respuesta de ALGOS</option>
          <option value="sistema">Nota de seguimiento</option>
        </select>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Pega o resume el mensaje de WhatsApp..."
          className="flex-1 rounded-md border border-[#1a4a55]/20 bg-white p-2 text-sm min-h-[60px]"
        />
        <button
          onClick={add}
          disabled={sending || !body.trim()}
          className="inline-flex items-center justify-center gap-1.5 rounded-md bg-[#1a4a55] px-3 py-2 text-sm font-semibold text-white disabled:opacity-50"
        >
          <Send size={14} /> {sending ? "Guardando..." : "Agregar"}
        </button>
      </div>
    </div>
  );
}
