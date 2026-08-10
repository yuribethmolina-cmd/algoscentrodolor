import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { RefreshCw, LogOut, ChevronLeft, Search, Download, MessageCircle, UserCheck, Clock } from "lucide-react";
import LeadTimeline from "@/components/admin/LeadTimeline";


type Status = "nuevo" | "contactado" | "agendado" | "perdido" | "spam";

interface LeadRow {
  id: string;
  created_at: string;
  source_code: string;
  section: string | null;
  section_label: string | null;
  cta_label: string | null;
  reason: string | null;
  path: string | null;
  device: string | null;
  status: Status;
  patient_name: string | null;
  patient_phone: string | null;
  internal_notes: string | null;
  assigned_to: string | null;
  assigned_email: string | null;
  assigned_at: string | null;
}

interface Assignee {
  user_id: string;
  email: string;
}

const STATUS_LABEL: Record<Status, string> = {
  nuevo: "Nuevo",
  contactado: "Contactado",
  agendado: "Agendado",
  perdido: "Perdido",
  spam: "Descartado",
};

const STATUS_COLOR: Record<Status, string> = {
  nuevo: "bg-amber-100 text-amber-800 border-amber-300",
  contactado: "bg-blue-100 text-blue-800 border-blue-300",
  agendado: "bg-emerald-100 text-emerald-800 border-emerald-300",
  perdido: "bg-red-100 text-red-800 border-red-300",
  spam: "bg-neutral-100 text-neutral-600 border-neutral-300",
};

const STATUSES: Status[] = ["nuevo", "contactado", "agendado", "perdido", "spam"];

export default function LeadsDashboard() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<LeadRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Status | "all">("all");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [saving, setSaving] = useState<string | null>(null);
  const [assignees, setAssignees] = useState<Assignee[]>([]);
  const [me, setMe] = useState<string | null>(null);
  const [onlyMine, setOnlyMine] = useState(false);

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from("whatsapp_leads")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    setRows((data as LeadRow[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
    supabase.auth.getUser().then(({ data }) => setMe(data.user?.id ?? null));
    supabase.rpc("list_lead_assignees").then(({ data }) => setAssignees((data as Assignee[]) ?? []));
  }, []);

  async function assign(id: string, userId: string) {
    const email = assignees.find((a) => a.user_id === userId)?.email ?? null;
    await patch(id, {
      assigned_to: userId || null,
      assigned_email: userId ? email : null,
      assigned_at: userId ? new Date().toISOString() : null,
    });
  }

  async function patch(id: string, values: Partial<LeadRow>) {
    setSaving(id);
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...values } : r)));
    await supabase.from("whatsapp_leads").update(values).eq("id", id);
    setSaving(null);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/admin/login", { replace: true });
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rows.filter((r) => {
      if (filter !== "all" && r.status !== filter) return false;
      if (onlyMine && r.assigned_to !== me) return false;
      if (!q) return true;
      return [r.source_code, r.section_label, r.cta_label, r.reason, r.patient_name, r.patient_phone]
        .some((v) => (v ?? "").toLowerCase().includes(q));
    });
  }, [rows, filter, search, onlyMine, me]);

  const counts = useMemo(() => {
    const c: Record<Status, number> = { nuevo: 0, contactado: 0, agendado: 0, perdido: 0, spam: 0 };
    rows.forEach((r) => { if (c[r.status] !== undefined) c[r.status]++; });
    return c;
  }, [rows]);

  const bySection = useMemo(() => {
    const map = new Map<string, { total: number; agendados: number }>();
    rows.forEach((r) => {
      const key = r.section_label || r.section || "Sin sección";
      const entry = map.get(key) ?? { total: 0, agendados: 0 };
      entry.total++;
      if (r.status === "agendado") entry.agendados++;
      map.set(key, entry);
    });
    return [...map.entries()].sort((a, b) => b[1].total - a[1].total).slice(0, 8);
  }, [rows]);

  const pending = useMemo(
    () =>
      filtered
        .filter((r) => r.status === "nuevo")
        .sort((a, b) => +new Date(a.created_at) - +new Date(b.created_at)),
    [filtered],
  );

  const workload = useMemo(() => {
    const map = new Map<string, number>();
    rows.forEach((r) => {
      if (r.status !== "nuevo") return;
      const key = r.assigned_email || "Sin responsable";
      map.set(key, (map.get(key) ?? 0) + 1);
    });
    return [...map.entries()].sort((a, b) => b[1] - a[1]);
  }, [rows]);

  function hoursSince(iso: string) {
    return Math.floor((Date.now() - +new Date(iso)) / 3_600_000);
  }

  function exportCSV() {
    const headers = ["Fecha", "Codigo origen", "Seccion", "CTA", "Motivo", "Pagina", "Dispositivo", "Estado", "Responsable", "Paciente", "Telefono", "Notas"];
    const escape = (v: unknown) => {
      const s = v == null ? "" : String(v);
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const lines = [headers.join(",")];
    filtered.forEach((r) => {
      lines.push([
        new Date(r.created_at).toISOString(), r.source_code, r.section_label ?? r.section ?? "",
        r.cta_label ?? "", r.reason ?? "", r.path ?? "", r.device ?? "",
        STATUS_LABEL[r.status], r.assigned_email ?? "", r.patient_name ?? "", r.patient_phone ?? "", r.internal_notes ?? "",
      ].map(escape).join(","));
    });
    const blob = new Blob(["\ufeff" + lines.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-whatsapp-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-[#f5f0e8] py-10 px-4 md:px-12">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <Link to="/admin/conversiones" className="inline-flex items-center gap-1 text-[#1a4a55]/60 hover:text-[#1a4a55] text-xs mb-2">
              <ChevronLeft size={14} /> Volver a conversiones
            </Link>
            <p className="text-[#c69636] font-medium text-xs tracking-[0.25em] uppercase mb-2">PANEL INTERNO</p>
            <h1 className="font-display font-bold text-[#1a4a55] text-3xl md:text-4xl">Leads de WhatsApp</h1>
            <p className="text-[#1a4a55]/70 text-sm mt-2 max-w-2xl">
              Cada clic a WhatsApp queda registrado con su código de origen. Cuando el paciente escriba,
              busca el código que aparece al final de su mensaje (ej. <span className="font-mono">ALG-HERO-M</span>),
              anota su nombre y teléfono, y marca en qué terminó la conversación.
            </p>
          </div>
          <div className="flex gap-2">
            <button onClick={exportCSV} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md border border-[#1a4a55]/20 bg-white text-[#1a4a55] hover:bg-[#1a4a55]/5 text-sm">
              <Download size={14} /> CSV
            </button>
            <button onClick={load} className="p-2 rounded-md border border-[#1a4a55]/20 bg-white text-[#1a4a55] hover:bg-[#1a4a55]/5">
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            </button>
            <button onClick={handleLogout} className="p-2 rounded-md border border-[#1a4a55]/20 bg-white text-[#1a4a55]/60 hover:bg-red-50 hover:text-red-600" title="Cerrar sesión">
              <LogOut size={16} />
            </button>
          </div>
        </header>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="relative flex-1 min-w-[240px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1a4a55]/40" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por código de origen, sección, paciente o teléfono..."
            className="w-full pl-9 pr-3 py-2.5 rounded-md border border-[#1a4a55]/20 bg-white text-sm text-[#1a4a55] focus:outline-none focus:border-[#1a4a55]"
          />
          </div>
          <button
            onClick={() => setOnlyMine((v) => !v)}
            className={`inline-flex items-center gap-1.5 px-3 py-2.5 rounded-md border text-sm font-medium transition-colors ${onlyMine ? "border-[#1a4a55] bg-[#1a4a55] text-white" : "border-[#1a4a55]/20 bg-white text-[#1a4a55] hover:bg-[#1a4a55]/5"}`}
          >
            <UserCheck size={15} /> Solo míos
          </button>
        </div>

        <section className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-6">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(filter === s ? "all" : s)}
              className={`text-left rounded-md border p-3 bg-white transition-all ${filter === s ? "border-[#1a4a55] ring-2 ring-[#1a4a55]/20" : "border-[#1a4a55]/15 hover:border-[#1a4a55]/30"}`}
            >
              <div className="text-xs text-[#1a4a55]/60 uppercase tracking-wider">{STATUS_LABEL[s]}</div>
              <div className="font-display font-bold text-[#1a4a55] text-2xl tabular-nums">{counts[s]}</div>
            </button>
          ))}
        </section>

        {/* Cola de pendientes de contacto */}
        <section className="rounded-md border border-[#c69636]/40 bg-[#c69636]/5 p-4 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <h2 className="font-display font-bold text-[#1a4a55] text-lg inline-flex items-center gap-2">
              <Clock size={18} /> Pendientes de contacto
              <span className="text-sm font-normal text-[#1a4a55]/60 tabular-nums">({pending.length})</span>
            </h2>
            <p className="text-xs text-[#1a4a55]/60">Del más antiguo al más reciente · asignación automática equitativa</p>
          </div>
          {pending.length === 0 ? (
            <p className="text-sm text-[#1a4a55]/60 italic">Todo contactado. No hay leads en espera.</p>
          ) : (
            <ul className="space-y-2">
              {pending.slice(0, 8).map((r) => {
                const h = hoursSince(r.created_at);
                return (
                  <li key={r.id} className="flex flex-wrap items-center gap-2 rounded-md bg-white border border-[#1a4a55]/10 px-3 py-2">
                    <span className="font-mono text-xs bg-[#1a4a55]/5 border border-[#1a4a55]/15 rounded px-1.5 py-0.5 text-[#1a4a55]">
                      {r.source_code}
                    </span>
                    <span className="text-sm text-[#1a4a55]/80 flex-1 min-w-[120px]">
                      {r.section_label || r.section || "Sin sección"}
                      {r.device ? ` · ${r.device}` : ""}
                    </span>
                    <span className={`text-xs tabular-nums px-2 py-0.5 rounded-full border ${h >= 24 ? "bg-red-100 text-red-800 border-red-300" : h >= 4 ? "bg-amber-100 text-amber-800 border-amber-300" : "bg-emerald-100 text-emerald-800 border-emerald-300"}`}>
                      {h < 1 ? "hace minutos" : `${h} h en espera`}
                    </span>
                    <span className="text-xs text-[#1a4a55]/60 truncate max-w-[180px]">
                      {r.assigned_email ?? "Sin responsable"}
                    </span>
                    <button
                      onClick={() => patch(r.id, { status: "contactado" })}
                      className="text-xs rounded-md bg-[#3d8b96] hover:bg-[#4a9ca8] text-white px-2.5 py-1.5"
                    >
                      Marcar contactado
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
          {workload.length > 0 && (
            <div className="mt-3 pt-3 border-t border-[#1a4a55]/10 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#1a4a55]/70">
              {workload.map(([who, n]) => (
                <span key={who}>{who}: <strong className="tabular-nums">{n}</strong> pendientes</span>
              ))}
            </div>
          )}
        </section>

        {bySection.length > 0 && (
          <section className="rounded-md border border-[#1a4a55]/15 bg-white p-4 mb-6">
            <h2 className="font-display font-bold text-[#1a4a55] text-lg mb-3">Origen de los leads</h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {bySection.map(([name, v]) => (
                <li key={name} className="flex items-center justify-between text-sm text-[#1a4a55]/80 border-b border-[#1a4a55]/10 pb-1">
                  <span>{name}</span>
                  <span className="tabular-nums">{v.total} · {v.agendados} agendados</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="rounded-md border border-[#1a4a55]/15 bg-white overflow-hidden">
          {filtered.length === 0 ? (
            <p className="p-8 text-center text-sm text-[#1a4a55]/50 italic">
              {loading ? "Cargando..." : "Sin leads en este filtro."}
            </p>
          ) : (
            <ul className="divide-y divide-[#1a4a55]/10">
              {filtered.map((r) => {
                const isOpen = expanded === r.id;
                return (
                  <li key={r.id} className="p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="font-mono text-xs bg-[#1a4a55]/5 border border-[#1a4a55]/15 rounded px-1.5 py-0.5 text-[#1a4a55]">
                            {r.source_code}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full border ${STATUS_COLOR[r.status]}`}>{STATUS_LABEL[r.status]}</span>
                          <span className="text-xs text-[#1a4a55]/50 tabular-nums">
                            {new Date(r.created_at).toLocaleString("es-VE", { dateStyle: "short", timeStyle: "short" })}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-[#1a4a55]/80">
                          <span className="inline-flex items-center gap-1"><MessageCircle size={13} /> {r.section_label || r.section || "Sin sección"}</span>
                          {r.reason && <span>· {r.reason}</span>}
                          {r.device && <span>· {r.device}</span>}
                          {r.patient_name && <span className="font-semibold text-[#1a4a55]">· {r.patient_name}</span>}
                          <span className="inline-flex items-center gap-1 text-[#1a4a55]/60">
                            <UserCheck size={13} /> {r.assigned_email ?? "Sin responsable"}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <select
                          value={r.status}
                          onChange={(e) => patch(r.id, { status: e.target.value as Status })}
                          className="text-sm rounded-md border border-[#1a4a55]/20 bg-white px-2 py-1.5 text-[#1a4a55]"
                        >
                          {STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
                        </select>
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
                        <div className="space-y-2">
                          <div><strong>Página:</strong> {r.path ?? "—"}</div>
                          <div><strong>Botón:</strong> {r.cta_label ?? "—"}</div>
                          <div>
                            <label className="block text-xs font-semibold text-[#1a4a55] mb-1">Responsable</label>
                            <select
                              value={r.assigned_to ?? ""}
                              onChange={(e) => assign(r.id, e.target.value)}
                              className="w-full rounded-md border border-[#1a4a55]/20 bg-white px-2 py-1.5 text-sm text-[#1a4a55]"
                            >
                              <option value="">Sin responsable</option>
                              {assignees.map((a) => (
                                <option key={a.user_id} value={a.user_id}>{a.email}</option>
                              ))}
                            </select>
                          </div>
                          <input
                            defaultValue={r.patient_name ?? ""}
                            onBlur={(e) => patch(r.id, { patient_name: e.target.value })}
                            placeholder="Nombre del paciente"
                            className="w-full rounded-md border border-[#1a4a55]/20 bg-white px-2 py-1.5 text-sm"
                          />
                          <input
                            defaultValue={r.patient_phone ?? ""}
                            onBlur={(e) => patch(r.id, { patient_phone: e.target.value })}
                            placeholder="Teléfono desde el que escribió"
                            className="w-full rounded-md border border-[#1a4a55]/20 bg-white px-2 py-1.5 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#1a4a55] mb-1">Notas internas</label>
                          <textarea
                            defaultValue={r.internal_notes ?? ""}
                            onBlur={(e) => patch(r.id, { internal_notes: e.target.value })}
                            className="w-full rounded-md border border-[#1a4a55]/20 bg-white p-2 text-sm min-h-[90px]"
                            placeholder="Qué consultó, en qué quedó la conversación..."
                          />
                          {saving === r.id && <span className="text-xs text-[#1a4a55]/50">Guardando...</span>}
                        </div>
                        <LeadTimeline
                          leadId={r.id}
                          refCode={r.source_code}
                          status={r.status}
                          patientName={r.patient_name}
                          patientPhone={r.patient_phone}
                          sectionLabel={r.section_label ?? r.section}
                          reason={r.reason}
                        />


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
