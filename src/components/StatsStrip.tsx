import { useEffect, useState } from "react";
import { useCountUp, useInViewOnce } from "@/lib/animations";

const CREAM = "#f5f0e8";
const DEEP_TEAL = "#1a4a55";
const STEEL_TEAL = "#2a6270";
const GOLD = "#c69636";

type Stat = {
  target: number;
  pad?: number; // pad to N digits with leading zeros
  duration: number;
  delay: number;
  suffix?: string;
  label: string;
  note: string;
};

const stats: Stat[] = [
  {
    target: 6,
    pad: 2,
    duration: 600,
    delay: 0,
    label: "SEDES CLÍNICAS",
    note: "Espacios activos en Maracaibo — cerca de donde estás.",
  },
  {
    target: 100,
    duration: 1000,
    delay: 200,
    suffix: "%",
    label: "PROCEDIMIENTOS",
    note: "Guiados por imagen en tiempo real — fluoroscopia o ultrasonido.",
  },
];

function DecimalSeparator() {
  return (
    <div
      className="flex items-center justify-center"
      style={{ marginTop: 22, marginBottom: 18 }}
    >
      <span style={{ width: 36, height: 1, backgroundColor: "rgba(26, 74, 85, 0.25)" }} />
      <span
        style={{
          width: 10,
          height: 10,
          borderRadius: "9999px",
          backgroundColor: GOLD,
          marginLeft: 12,
          marginRight: 12,
          display: "inline-block",
        }}
      />
      <span style={{ width: 36, height: 1, backgroundColor: "rgba(26, 74, 85, 0.25)" }} />
    </div>
  );
}

function StatBlock({ s, start }: { s: Stat; start: boolean }) {
  const value = useCountUp(s.target, s.duration, start);
  const totalDelay = s.delay + s.duration;
  const padded = s.pad ? String(value).padStart(s.pad, "0") : String(value);
  const reachedTarget = value >= s.target;
  return (
    <div className="text-center" style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 32, paddingBottom: 32, overflow: "visible" }}>
      <div
        style={{
          fontFamily: "'Sora', serif",
          fontWeight: 400,
          fontSize: "clamp(68px, 14vw, 156px)",
          color: DEEP_TEAL,
          lineHeight: 1.05,
          letterSpacing: "-0.03em",
          whiteSpace: "nowrap",
          paddingTop: 8,
          paddingBottom: 4,
        }}
      >
        <span style={{ fontVariantNumeric: "tabular-nums" }}>{padded}</span>
        {s.suffix && (
          <span
            style={{
              color: GOLD,
              fontSize: "clamp(28px, 5vw, 56px)",
              verticalAlign: "top",
              marginLeft: 4,
              display: "inline-block",
              opacity: reachedTarget ? 1 : 0,
              transition: "opacity 200ms cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            {s.suffix}
          </span>
        )}
      </div>

      <DecimalSeparator />

      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: DEEP_TEAL,
          margin: 0,
          marginBottom: 8,
        }}
      >
        {s.label}
      </p>
      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 12,
          color: STEEL_TEAL,
          opacity: 0.78,
          lineHeight: 1.5,
          maxWidth: "24ch",
          margin: "0 auto",
        }}
      >
        {s.note}
      </p>
    </div>
  );
}

function StatBlockDelayed({ s, sectionInView }: { s: Stat; sectionInView: boolean }) {
  // Trigger count-up after stagger delay
  const [start, setStart] = useState(false);
  useEffect(() => {
    if (!sectionInView) return;
    const t = setTimeout(() => setStart(true), s.delay);
    return () => clearTimeout(t);
  }, [sectionInView, s.delay]);
  return <StatBlock s={s} start={start} />;
}

export default function StatsStrip() {
  const { ref, inView } = useInViewOnce<HTMLElement>(0.3);
  return (
    <section
      ref={ref as any}
      style={{
        backgroundColor: CREAM,
        position: "relative",
        borderTop: "1px solid rgba(26, 74, 85, 0.18)",
        borderBottom: "1px solid rgba(26, 74, 85, 0.18)",
        paddingTop: "clamp(56px, 7vw, 80px)",
        paddingBottom: "clamp(56px, 7vw, 80px)",
      }}
    >
      {/* Floating overline */}
      <div
        style={{
          position: "absolute",
          top: -8,
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: CREAM,
          paddingLeft: 18,
          paddingRight: 18,
        }}
      >
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            color: GOLD,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          PRÁCTICA EN NÚMEROS
        </p>
      </div>

      <div
        className="mx-auto"
        style={{
          maxWidth: 1280,
          paddingLeft: "clamp(24px, 4vw, 48px)",
          paddingRight: "clamp(24px, 4vw, 48px)",
        }}
      >
        {/* Desktop grid */}
        <div
          className="hidden mdx:grid items-center"
          style={{ gridTemplateColumns: "1fr 1px 1fr" }}
        >
          <StatBlockDelayed s={stats[0]} sectionInView={inView} />
          <span style={{ width: 1, height: 140, backgroundColor: "rgba(26, 74, 85, 0.15)", justifySelf: "center" }} />
          <StatBlockDelayed s={stats[1]} sectionInView={inView} />
        </div>

        {/* Mobile stack */}
        <div className="mdx:hidden flex flex-col" style={{ gap: 48 }}>
          {stats.map((s, i) => (
            <StatBlockDelayed key={i} s={s} sectionInView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
