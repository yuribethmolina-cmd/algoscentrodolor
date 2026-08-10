import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Target, RefreshCw, Download } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface LeadRow {
  source_code: string | null;
  cta_label: string | null;
  section: string | null;
  section_label: string | null;
  device: string | null;
  status: string;
  created_at: string;
}

interface ApptRow {
  source_section: string | null;
  device: string | null;
  status: string;
  created_at: string;
}

interface Bucket {
  key: string;
  clics: number;
  agendados: number;
}

const TEAL = "#3d8b96";
const GOLD = "#c69636";
const DEEP = "#1a4a55";
const PIE_COLORS = [TEAL, GOLD, "#8bb8bf", "#e0c584"];

function toRows(map: Map<string, Bucket>): Bucket[] {
  return Array.from(map.values()).sort(
    (a, b) => b.agendados - a.agendados || b.clics - a.clics,
  );
}

function bump(map: Map<string, Bucket>, key: string, field: "clics" | "agendados", n = 1) {
  const k = key && key.trim() ? key : "sin dato";
  const cur = map.get(k) ?? { key: k, clics: 0, agendados: 0 };
  cur[field] += n;
  map.set(k, cur);
}

export default function AttributionSection({ days }: { days: number }) {
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [appts, setAppts] = useState<ApptRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    const since = new Date(Date.now() - days * 86400000).toISOString();

    const [{ data: leadData, error: leadErr }, { data: apptData, error: apptErr }] =
      await Promise.all([
        supabase
          .from("whatsapp_leads")
          .select("source_code, cta_label, section, section_label, device, status, created_at")
          .gte("created_at", since)
          .order("created_at", { ascending: false })
          .limit(5000),
        supabase
          .from("appointment_requests")
          .select("source_section, device, status, created_at")
          .gte("created_at", since)
          .order("created_at", { ascending: false })
          .limit(5000),
      ]);

    if (leadErr || apptErr) setError((leadErr ?? apptErr)!.message);
    setLeads((leadData as LeadRow[]) ?? []);
    setAppts((apptData as ApptRow[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  const { bySource, byCta, byDevice, deviceRate, totals } = useMemo(() => {
    const src = new Map<string, Bucket>();
    const cta = new Map<string, Bucket>();
    const dev = new Map<string, Bucket>();

    const isBooked = (s: string) => s === "agendado" || s === "atendido";

    leads.forEach((l) => {
      const device = l.device === "mobile" ? "Móvil" : l.device === "desktop" ? "Escritorio" : "Otro";
      bump(src, l.source_code ?? "sin código", "clics");
      bump(cta, l.cta_label ?? l.section_label ?? l.section ?? "sin CTA", "clics");
      bump(dev, device, "clics");
      if (isBooked(l.status)) {
        bump(src, l.source_code ?? "sin código", "agendados");
        bump(cta, l.cta_label ?? l.section_label ?? l.section ?? "sin CTA", "agendados");
        bump(dev, device, "agendados");
      }
    });

    appts.forEach((a) => {
      const device = a.device === "mobile" ? "Móvil" : a.device === "desktop" ? "Escritorio" : "Otro";
      const section = a.source_section ?? "formulario";
      bump(src, `FORM · ${section}`, "agendados");
      bump(cta, `Formulario · ${section}`, "agendados");
      bump(dev, device, "agendados");
    });

    const devRows = toRows(dev);
    return {
      bySource: toRows(src).slice(0, 10),
      byCta: toRows(cta).slice(0, 10),
      byDevice: devRows,
      deviceRate: devRows.map((d) => ({
        key: d.key,
        tasa: d.clics > 0 ? Math.round((d.agendados / d.clics) * 1000) / 10 : 0,
      })),
      totals: {
        clics: leads.length,
        agendados:
          leads.filter((l) => isBooked(l.status)).length + appts.length,
      },
    };
  }, [leads, appts]);

  function exportCsv() {
    const rows: string[] = [`ALGOS — Atribución de conversiones · últimos ${days} días`, ""];
    const block = (title: string, data: Bucket[]) => {
      rows.push(title);
      rows.push("Clave,Clics,Agendados,Tasa %");
      data.forEach((r) =>
        rows.push(
          `"${r.key}",${r.clics},${r.agendados},${r.clics ? ((r.agendados / r.clics) * 100).toFixed(1) : ""}`,
        ),
      );
      rows.push("");
    };
    block("POR CÓDIGO DE ORIGEN", bySource);
    block("POR CTA", byCta);
    block("POR DISPOSITIVO", byDevice);
    const blob = new Blob([rows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `algos-atribucion-${days}d.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const tooltipStyle = {
    borderRadius: 8,
    border: `1px solid ${DEEP}22`,
    fontSize: 12,
  } as const;

  return (
    <section className="rounded-lg border border-[#1a4a55]/10 bg-white p-5 md:p-6 mb-8">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="font-display font-bold text-[#1a4a55] text-lg flex items-center gap-2">
            <Target size={18} className="text-[#c69636]" /> Atribución: qué genera más agendamientos
          </h2>
          <p className="text-[#1a4a55]/60 text-xs mt-1">
            Clics de WhatsApp con código de origen + solicitudes del formulario. Últimos {days} día
            {days === 1 ? "" : "s"}.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={load}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#1a4a55]/20 text-[#1a4a55] text-xs font-medium hover:bg-[#1a4a55]/5"
          >
            <RefreshCw size={13} className={loading ? "animate-spin" : ""} /> Actualizar
          </button>
          <button
            onClick={exportCsv}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#c69636]/40 bg-[#c69636]/10 text-[#1a4a55] text-xs font-medium hover:bg-[#c69636]/20"
          >
            <Download size={13} /> CSV
          </button>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-600 mb-4">No se pudieron cargar los datos: {error}</p>
      )}

      <div className="grid sm:grid-cols-3 gap-3 mb-6">
        <Stat label="Clics con origen" value={totals.clics} />
        <Stat label="Agendamientos" value={totals.agendados} accent />
        <Stat
          label="Tasa de agendamiento"
          value={totals.clics ? `${((totals.agendados / totals.clics) * 100).toFixed(1)}%` : "—"}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <ChartCard title="Top códigos de origen">
          <ResponsiveContainer width="100%" height={Math.max(220, bySource.length * 34)}>
            <BarChart data={bySource} layout="vertical" margin={{ left: 8, right: 12 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={`${DEEP}15`} horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: DEEP }} allowDecimals={false} />
              <YAxis
                type="category"
                dataKey="key"
                width={140}
                tick={{ fontSize: 11, fill: DEEP }}
              />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="clics" name="Clics" fill={TEAL} radius={[0, 3, 3, 0]} />
              <Bar dataKey="agendados" name="Agendados" fill={GOLD} radius={[0, 3, 3, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Top CTA / secciones">
          <ResponsiveContainer width="100%" height={Math.max(220, byCta.length * 34)}>
            <BarChart data={byCta} layout="vertical" margin={{ left: 8, right: 12 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={`${DEEP}15`} horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: DEEP }} allowDecimals={false} />
              <YAxis
                type="category"
                dataKey="key"
                width={140}
                tick={{ fontSize: 11, fill: DEEP }}
              />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="clics" name="Clics" fill={TEAL} radius={[0, 3, 3, 0]} />
              <Bar dataKey="agendados" name="Agendados" fill={GOLD} radius={[0, 3, 3, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Agendamientos por dispositivo">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={byDevice.filter((d) => d.agendados > 0)}
                dataKey="agendados"
                nameKey="key"
                innerRadius={50}
                outerRadius={85}
                paddingAngle={2}
              >
                {byDevice.map((d, i) => (
                  <Cell key={d.key} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Tasa de agendamiento por dispositivo (%)">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={deviceRate} margin={{ left: 0, right: 12 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={`${DEEP}15`} vertical={false} />
              <XAxis dataKey="key" tick={{ fontSize: 11, fill: DEEP }} />
              <YAxis tick={{ fontSize: 11, fill: DEEP }} unit="%" />
              <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => `${v}%`} />
              <Bar dataKey="tasa" name="Tasa" fill={GOLD} radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {!loading && totals.clics === 0 && totals.agendados === 0 && (
        <p className="text-sm text-[#1a4a55]/60 mt-4">
          Aún no hay datos con código de origen en este rango.
        </p>
      )}
    </section>
  );
}

function Stat({ label, value, accent }: { label: string; value: number | string; accent?: boolean }) {
  return (
    <div
      className={`rounded-md border p-3 ${accent ? "border-[#c69636]/40 bg-[#c69636]/5" : "border-[#1a4a55]/15 bg-[#1a4a55]/[0.02]"}`}
    >
      <div className="text-[10px] uppercase tracking-wider text-[#1a4a55]/70">{label}</div>
      <div className="mt-1 font-display font-bold text-[#1a4a55] text-2xl tabular-nums">{value}</div>
    </div>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-md border border-[#1a4a55]/10 p-4">
      <h3 className="text-sm font-semibold text-[#1a4a55] mb-3">{title}</h3>
      {children}
    </div>
  );
}
