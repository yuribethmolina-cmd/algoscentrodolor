import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { RefreshCw, LogOut, MessageCircle, Phone, Mail, ChevronLeft, Search, Download, Users } from "lucide-react";

type Status = "pendiente" | "contactado" | "agendado" | "asistio" | "no_asistio" | "realizado";

interface AppointmentRow {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  email: string | null;
  condition: string | null;
  has_studies: string | null;
  preferred_date: string | null;
  preferred_shift: string | null;
  notes: string | null;
  source_section: string | null;
  device: string | null;
  status: Status;
  status_updated_at: string | null;
  internal_notes: string | null;
}

const STATUS_LABEL: Record<Status, string> = {
  pendiente: "Pendiente",
  contactado: "Contactado",
  agendado: "Agendado",
  asistio: "Asistió",
  no_asistio: "No asistió",
  realizado: "Realizado",
};

const STATUS_COLOR: Record<Status, string> = {
  pendiente: "bg-amber-100 text-amber-800 border-amber-300",
  contactado: "bg-blue-100 text-blue-800 border-blue-300",
  agendado: "bg-indigo-100 text-indigo-800 border-indigo-300",
  asistio: "bg-teal-100 text-teal-800 border-teal-300",
  no_asistio: "bg-red-100 text-red-800 border-red-300",
  realizado: "bg-emerald-100 text-emerald-800 border-emerald-300",
};

const STATUSES: Status[] = ["pendiente", "contactado", "agendado", "asistio", "no_asistio", "realizado"];

export default function CitasDashboard() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<AppointmentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Status | "all">("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [savingNote, setSavingNote] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from("appointment_requests")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(300);
    setRows((data as AppointmentRow[]) ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function updateStatus(id: string, status: Status) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status, status_updated_at: new Date().toISOString() } : r)));
    await supabase.from("appointment_requests").update({ status, status_updated_at: new Date().toISOString() }).eq("id", id);
  }

  async function updateNote(id: string, internal_notes: string) {
    setSavingNote(id);
    await supabase.from("appointment_requests").update({ internal_notes }).eq("id", id);
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, internal_notes } : r)));
    setSavingNote(null);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/admin/login", { replace: true });
  }

  const filtered = useMemo(
    () => (filter === "all" ? rows : rows.filter((r) => r.status === filter)),
    [rows, filter],
  );

  const funnel = useMemo(() => {
    const counts: Record<Status, number> = { pendiente: 0, contactado: 0, agendado: 0, asistio: 0, no_asistio: 0, realizado: 0 };
    rows.forEach((r) => { counts[r.status]++; });
    return counts;
  }, [rows]);

  return (
    <div className="min-h-screen bg-[#f5f0e8] py-10 px-4 md:px-12">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <Link to="/admin/conversiones" className="inline-flex items-center gap-1 text-[#1a4a55]/60 hover:text-[#1a4a55] text-xs mb-2">
              <ChevronLeft size={14} /> Volver a conversiones
            </Link>
            <p className="text-[#c69636] font-medium text-xs tracking-[0.25em] uppercase mb-2">PANEL INTERNO</p>
            <h1 className="font-display font-bold text-[#1a4a55] text-3xl md:text-4xl">Solicitudes de cita</h1>
            <p className="text-[#1a4a55]/70 text-sm mt-2">
              Contacta a los pacientes, marca el estado y agrega notas internas de seguimiento.
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

        {/* Funnel */}
        <section className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-6">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(filter === s ? "all" : s)}
              className={`text-left rounded-md border p-3 bg-white transition-all ${filter === s ? "border-[#1a4a55] ring-2 ring-[#1a4a55]/20" : "border-[#1a4a55]/15 hover:border-[#1a4a55]/30"}`}
            >
              <div className="text-xs text-[#1a4a55]/60 uppercase tracking-wider">{STATUS_LABEL[s]}</div>
              <div className="font-display font-bold text-[#1a4a55] text-2xl tabular-nums">{funnel[s]}</div>
            </button>
          ))}
        </section>

        {/* List */}
        <div className="rounded-md border border-[#1a4a55]/15 bg-white overflow-hidden">
          {filtered.length === 0 ? (
            <p className="p-8 text-center text-sm text-[#1a4a55]/50 italic">
              {loading ? "Cargando..." : "Sin solicitudes en este filtro."}
            </p>
          ) : (
            <ul className="divide-y divide-[#1a4a55]/10">
              {filtered.map((r) => {
                const isOpen = expanded === r.id;
                const waMsg = `Hola ${r.name.split(" ")[0]}, te contactamos desde ALGOS Centro de Dolor por tu solicitud de cita${r.condition ? ` (${r.condition})` : ""}.`;
                const waUrl = `https://wa.me/${r.phone.replace(/\D/g, "")}?text=${encodeURIComponent(waMsg)}`;
                return (
                  <li key={r.id} className="p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="font-semibold text-[#1a4a55]">{r.name}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full border ${STATUS_COLOR[r.status]}`}>{STATUS_LABEL[r.status]}</span>
                          <span className="text-xs text-[#1a4a55]/50 tabular-nums">
                            {new Date(r.created_at).toLocaleString("es-VE", { dateStyle: "short", timeStyle: "short" })}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-[#1a4a55]/80">
                          <span className="inline-flex items-center gap-1"><Phone size={13} /> {r.phone}</span>
                          {r.email && <span className="inline-flex items-center gap-1"><Mail size={13} /> {r.email}</span>}
                          {r.condition && <span>· {r.condition}</span>}
                          {r.preferred_date && <span>· {r.preferred_date} {r.preferred_shift ?? ""}</span>}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <select
                          value={r.status}
                          onChange={(e) => updateStatus(r.id, e.target.value as Status)}
                          className="text-sm rounded-md border border-[#1a4a55]/20 bg-white px-2 py-1.5 text-[#1a4a55]"
                        >
                          {STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
                        </select>
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-md bg-[#3d8b96] hover:bg-[#4a9ca8] text-white text-sm px-3 py-1.5"
                        >
                          <MessageCircle size={14} /> WhatsApp
                        </a>
                        <button
                          onClick={() => setExpanded(isOpen ? null : r.id)}
                          className="text-sm text-[#1a4a55]/60 hover:text-[#1a4a55] px-2 py-1"
                        >
                          {isOpen ? "Cerrar" : "Detalle"}
                        </button>
                      </div>
                    </div>

                    {isOpen && (
                      <div className="mt-3 pt-3 border-t border-[#1a4a55]/10 grid gap-3 md:grid-cols-2 text-sm text-[#1a4a55]/80">
                        <div>
                          <div><strong>Estudios previos:</strong> {r.has_studies ?? "—"}</div>
                          <div><strong>Origen:</strong> {r.source_section ?? "—"} · {r.device ?? "—"}</div>
                          <div><strong>Notas del paciente:</strong> {r.notes || "—"}</div>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#1a4a55] mb-1">Notas internas</label>
                          <textarea
                            defaultValue={r.internal_notes ?? ""}
                            onBlur={(e) => updateNote(r.id, e.target.value)}
                            className="w-full rounded-md border border-[#1a4a55]/20 bg-white p-2 text-sm min-h-[70px]"
                            placeholder="Agrega notas de seguimiento..."
                          />
                          {savingNote === r.id && <span className="text-xs text-[#1a4a55]/50">Guardando...</span>}
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
