import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MessageCircle, CalendarCheck, Smartphone, Monitor, RefreshCw } from "lucide-react";

interface Summary {
  range_days: number;
  since: string;
  totals: Record<string, number> | null;
  by_section: Array<{ section: string; whatsapp_clicks: number; appointments: number; total: number }>;
  by_device: Array<{ device: string; whatsapp_clicks: number; appointments: number }>;
  daily: Array<{ day: string; whatsapp_clicks: number; appointments: number }>;
  top_conditions: Array<{ condition: string; count: number }>;
}

const RANGES = [
  { label: "24h", days: 1 },
  { label: "7 días", days: 7 },
  { label: "30 días", days: 30 },
  { label: "90 días", days: 90 },
];

export default function ConversionesDashboard() {
  const [days, setDays] = useState(7);
  const [data, setData] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    const { data: res, error: err } = await supabase.rpc("get_conversion_summary", { days_back: days });
    if (err) {
      setError(err.message);
      setData(null);
    } else {
      setData(res as unknown as Summary);
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  const totals = data?.totals ?? {};
  const waTotal = totals.whatsapp_click ?? 0;
  const apptTotal = totals.appointment_submit ?? 0;

  const deviceTotals = useMemo(() => {
    const map: Record<string, { wa: number; ap: number }> = {
      mobile: { wa: 0, ap: 0 },
      desktop: { wa: 0, ap: 0 },
    };
    (data?.by_device ?? []).forEach((d) => {
      const key = d.device === "mobile" || d.device === "desktop" ? d.device : "desktop";
      map[key].wa += d.whatsapp_clicks;
      map[key].ap += d.appointments;
    });
    return map;
  }, [data]);

  const maxDaily = Math.max(1, ...(data?.daily ?? []).map((d) => d.whatsapp_clicks + d.appointments));
  const maxSection = Math.max(1, ...(data?.by_section ?? []).map((s) => s.total));

  return (
    <div className="min-h-screen bg-[#f5f0e8] py-10 px-6 md:px-12">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-[#c69636] font-medium text-xs tracking-[0.25em] uppercase mb-2">
              PANEL INTERNO
            </p>
            <h1 className="font-display font-bold text-[#1a4a55] text-3xl md:text-4xl">
              Conversiones
            </h1>
            <p className="text-[#1a4a55]/70 text-sm mt-2">
              Clics de WhatsApp y envíos del formulario de agendar, por sección y dispositivo.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="inline-flex rounded-md border border-[#1a4a55]/20 bg-white overflow-hidden">
              {RANGES.map((r) => (
                <button
                  key={r.days}
                  onClick={() => setDays(r.days)}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    days === r.days
                      ? "bg-[#1a4a55] text-white"
                      : "text-[#1a4a55] hover:bg-[#1a4a55]/5"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
            <button
              onClick={load}
              className="p-2 rounded-md border border-[#1a4a55]/20 bg-white text-[#1a4a55] hover:bg-[#1a4a55]/5"
              aria-label="Refrescar"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
        </header>

        {error && (
          <div className="mb-6 rounded-md border border-red-300 bg-red-50 p-4 text-sm text-red-700">
            Error: {error}
          </div>
        )}

        {/* KPIs */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Kpi
            icon={<MessageCircle size={20} />}
            label="Clics WhatsApp"
            value={waTotal}
          />
          <Kpi
            icon={<CalendarCheck size={20} />}
            label="Envíos de cita"
            value={apptTotal}
            accent
          />
          <Kpi
            icon={<Smartphone size={20} />}
            label="Mobile (WA + citas)"
            value={deviceTotals.mobile.wa + deviceTotals.mobile.ap}
            sub={`${deviceTotals.mobile.wa} WA · ${deviceTotals.mobile.ap} citas`}
          />
          <Kpi
            icon={<Monitor size={20} />}
            label="Desktop (WA + citas)"
            value={deviceTotals.desktop.wa + deviceTotals.desktop.ap}
            sub={`${deviceTotals.desktop.wa} WA · ${deviceTotals.desktop.ap} citas`}
          />
        </section>

        {/* Daily chart */}
        <Card title="Resumen diario">
          {data?.daily?.length ? (
            <div className="flex items-end gap-1 h-40">
              {data.daily.map((d) => {
                const total = d.whatsapp_clicks + d.appointments;
                const h = Math.max(4, Math.round((total / maxDaily) * 100));
                const waH = Math.round((d.whatsapp_clicks / Math.max(1, total)) * h);
                return (
                  <div key={d.day} className="flex-1 flex flex-col items-center gap-1 min-w-0">
                    <div
                      className="w-full flex flex-col justify-end rounded-sm overflow-hidden bg-[#1a4a55]/5"
                      style={{ height: "100%" }}
                      title={`${d.day} · WA ${d.whatsapp_clicks} · Citas ${d.appointments}`}
                    >
                      <div className="w-full bg-[#c69636]" style={{ height: `${h - waH}%` }} />
                      <div className="w-full bg-[#3d8b96]" style={{ height: `${waH}%` }} />
                    </div>
                    <span className="text-[10px] text-[#1a4a55]/60 truncate w-full text-center">
                      {formatDay(d.day)}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <Empty />
          )}
          <Legend />
        </Card>

        {/* By section */}
        <Card title="Por sección" className="mt-6">
          {data?.by_section?.length ? (
            <div className="space-y-2">
              {data.by_section.slice(0, 20).map((s) => (
                <div key={s.section} className="grid grid-cols-[1fr_auto] items-center gap-4">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="font-medium text-[#1a4a55] truncate">{s.section}</span>
                      <span className="text-[#1a4a55]/60 tabular-nums">
                        {s.whatsapp_clicks} WA · {s.appointments} citas
                      </span>
                    </div>
                    <div className="h-2 bg-[#1a4a55]/5 rounded-sm overflow-hidden flex">
                      <div
                        className="bg-[#3d8b96]"
                        style={{ width: `${(s.whatsapp_clicks / maxSection) * 100}%` }}
                      />
                      <div
                        className="bg-[#c69636]"
                        style={{ width: `${(s.appointments / maxSection) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-[#1a4a55] tabular-nums w-10 text-right">
                    {s.total}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <Empty />
          )}
        </Card>

        {/* Top conditions */}
        <Card title="Condiciones más agendadas" className="mt-6">
          {data?.top_conditions?.length ? (
            <div className="space-y-2">
              {data.top_conditions.map((c) => (
                <div key={c.condition} className="flex items-center justify-between text-sm border-b border-[#1a4a55]/10 pb-2 last:border-0">
                  <span className="text-[#1a4a55]">{c.condition}</span>
                  <span className="font-semibold text-[#1a4a55] tabular-nums">{c.count}</span>
                </div>
              ))}
            </div>
          ) : (
            <Empty />
          )}
        </Card>

        <p className="text-xs text-[#1a4a55]/50 mt-8">
          Datos en tiempo real desde Lovable Cloud. Rango: últimos {days} día{days === 1 ? "" : "s"}.
        </p>
      </div>
    </div>
  );
}

function Kpi({
  icon,
  label,
  value,
  sub,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-md border p-5 bg-white ${
        accent ? "border-[#c69636]/40" : "border-[#1a4a55]/15"
      }`}
    >
      <div className="flex items-center gap-2 text-[#1a4a55]/70 text-xs uppercase tracking-wider">
        <span className={accent ? "text-[#c69636]" : "text-[#3d8b96]"}>{icon}</span>
        {label}
      </div>
      <div className="mt-3 font-display font-bold text-[#1a4a55] text-3xl tabular-nums">
        {value.toLocaleString()}
      </div>
      {sub && <div className="text-xs text-[#1a4a55]/60 mt-1">{sub}</div>}
    </div>
  );
}

function Card({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-md border border-[#1a4a55]/15 bg-white p-5 ${className}`}>
      <h2 className="font-display font-semibold text-[#1a4a55] text-lg mb-4">{title}</h2>
      {children}
    </section>
  );
}

function Legend() {
  return (
    <div className="flex items-center gap-4 mt-3 text-xs text-[#1a4a55]/70">
      <span className="inline-flex items-center gap-1.5">
        <span className="w-3 h-3 rounded-sm bg-[#3d8b96]" /> WhatsApp
      </span>
      <span className="inline-flex items-center gap-1.5">
        <span className="w-3 h-3 rounded-sm bg-[#c69636]" /> Citas
      </span>
    </div>
  );
}

function Empty() {
  return <p className="text-sm text-[#1a4a55]/50 italic">Sin datos en este rango.</p>;
}

function formatDay(day: string) {
  const d = new Date(day);
  return `${d.getDate()}/${d.getMonth() + 1}`;
}
