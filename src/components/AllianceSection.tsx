import algosLogoFull from "@/assets/algos-logo-full.png.asset.json";

const CREAM = "#f5f0e8";
const CREAM_STRONG = "#faf6ef";
const DEEP_TEAL = "#1a4a55";
const STEEL_TEAL = "#2a6270";
const GOLD = "#c69636";
const GOLD_DEEP = "#9a7320";
const BODY = "#2a4a52";
const UDUZ_GREEN = "#6ea82e"; // darker green, AA-safe on cream

const algosServices = [
  "Bloqueos facetarios y radiculares",
  "Infiltraciones guiadas por imagen",
  "Procedimientos ambulatorios",
  "Seguimiento clínico documentado",
];

const uduzServices = [
  { label: "Tomografía", detail: "$25 · disponible 24/7" },
  { label: "Ecografía", detail: "$15" },
  { label: "Rayos X digital", detail: "$8" },
  { label: "Laboratorio clínico", detail: "pre-procedimiento" },
];

const benefits = [
  {
    number: "01",
    title: "DIAGNÓSTICO INTEGRADO",
    body: "Tomografía de columna ($25 · 24/7), ecografía ($15) y Rayos X ($8) en UDUZ Paraíso — a metros de la consulta. El Dr. Atilio revisa tus imágenes antes de recibirte.",
  },
  {
    number: "02",
    title: "UN SOLO EXPEDIENTE",
    body: "Tu historia clínica viaja entre ALGOS y UDUZ sin que tengas que repetirla. Llegas con los estudios; el equipo ya los conoce.",
  },
  {
    number: "03",
    title: "SALA DE PROCEDIMIENTOS",
    body: "Los procedimientos se realizan en instalaciones de UDUZ — con fluoroscopio y sala equipada — mientras el Local 4 termina su adecuación.",
  },
];

// Reusable section header replacing the thin Playfair italic
function PanelEyebrow({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <p
      style={{
        fontFamily: "Inter, sans-serif",
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: "0.28em",
        textTransform: "uppercase",
        color,
        margin: 0,
      }}
    >
      {children}
    </p>
  );
}

export default function AllianceSection() {
  return (
    <section id="alianza" style={{ backgroundColor: CREAM }}>

      {/* ── SPLIT PANEL (both cream, separated by a hairline) ─── */}
      <div
        className="grid grid-cols-1 mdx:grid-cols-2"
        style={{
          minHeight: 520,
          backgroundColor: CREAM,
          borderTop: "1px solid rgba(26, 74, 85, 0.15)",
          borderBottom: "1px solid rgba(26, 74, 85, 0.15)",
        }}
      >

        {/* Left — ALGOS (cream) */}
        <div
          className="alliance-panel-left"
          style={{
            padding: "clamp(56px, 7vw, 96px) clamp(32px, 5vw, 72px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 48,
          }}
        >
          <div>
            <img
              src={algosLogoFull.url}
              alt="ALGOS — Centro de Dolor Intervencionista"
              style={{
                height: 112,
                width: "auto",
                marginBottom: 32,
                display: "block",
              }}
            />
            <PanelEyebrow color={GOLD_DEEP}>Centro de Dolor · Maracaibo</PanelEyebrow>
            <ul style={{ listStyle: "none", padding: 0, margin: "24px 0 0" }}>
              {algosServices.map((s) => (
                <li
                  key={s}
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 16,
                    fontWeight: 500,
                    color: DEEP_TEAL,
                    lineHeight: 1.55,
                    paddingBottom: 14,
                    marginBottom: 14,
                    borderBottom: "1px solid rgba(26, 74, 85, 0.15)",
                  }}
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <h3
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: "clamp(20px, 1.9vw, 24px)",
              color: DEEP_TEAL,
              lineHeight: 1.35,
              letterSpacing: "-0.01em",
              margin: 0,
              maxWidth: "26ch",
            }}
          >
            Lo que hacemos —{" "}
            <span style={{ color: GOLD_DEEP, fontWeight: 700 }}>cómo lo hacemos.</span>
          </h3>
        </div>

        {/* Right — UDUZ (cream) */}
        <div
          style={{
            padding: "clamp(56px, 7vw, 96px) clamp(32px, 5vw, 72px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 48,
            borderLeft: "1px solid rgba(26, 74, 85, 0.18)",
          }}
        >
          <div>
            <img
              src="/logos/uduz-logo.svg"
              alt="UDUZ — Unidad de Diagnóstico Universitaria del Zulia"
              style={{ height: 44, width: "auto", marginBottom: 28, display: "block" }}
            />
            <PanelEyebrow color={UDUZ_GREEN}>Unidad de Diagnóstico · Paraíso</PanelEyebrow>
            <ul style={{ listStyle: "none", padding: 0, margin: "24px 0 0" }}>
              {uduzServices.map((s) => (
                <li
                  key={s.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    gap: 16,
                    fontFamily: "Inter, sans-serif",
                    fontSize: 16,
                    fontWeight: 500,
                    color: DEEP_TEAL,
                    paddingBottom: 14,
                    marginBottom: 14,
                    borderBottom: "1px solid rgba(26, 74, 85, 0.15)",
                  }}
                >
                  <span>{s.label}</span>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 12,
                      color: STEEL_TEAL,
                      letterSpacing: "0.04em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {s.detail}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <h3
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: "clamp(20px, 1.9vw, 24px)",
              color: DEEP_TEAL,
              lineHeight: 1.35,
              letterSpacing: "-0.01em",
              margin: 0,
              maxWidth: "26ch",
            }}
          >
            Lo que necesitas —{" "}
            <span style={{ color: UDUZ_GREEN, fontWeight: 700 }}>antes de llegar.</span>
          </h3>
        </div>
      </div>


      {/* ── ALLIANCE BRIDGE ─────────────────────────────────────── */}
      <div
        style={{
          borderTop: "1px solid rgba(26, 74, 85, 0.12)",
          borderBottom: "1px solid rgba(26, 74, 85, 0.12)",
          backgroundColor: DEEP_TEAL,
          padding: "clamp(56px, 7vw, 88px) clamp(32px, 5vw, 72px)",
          textAlign: "center",
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            border: `1px solid ${GOLD}`,
            borderRadius: 9999,
            padding: "8px 20px",
            marginBottom: 32,
          }}
        >
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: GOLD,
            }}
          >
            ALIANZA OFICIAL · MARACAIBO 2026
          </span>
        </div>

        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "clamp(36px, 5vw, 60px)",
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            color: CREAM_STRONG,
            margin: "0 auto",
            maxWidth: "22ch",
          }}
        >
          Un ecosistema clínico completo.{" "}
          <em style={{ fontStyle: "italic", fontWeight: 700, color: GOLD }}>
            Sin traslados.
          </em>
        </h2>

        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(16px, 1.2vw, 18px)",
            fontWeight: 400,
            color: "rgba(250, 246, 239, 0.92)",
            lineHeight: 1.7,
            marginTop: 24,
            maxWidth: "58ch",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          ALGOS opera en alianza institucional con UDUZ. Tu evaluación, tu imagen diagnóstica y tu procedimiento ocurren en el mismo ecosistema, con el mismo equipo informado de tu caso.
        </p>
      </div>

      {/* ── BENEFIT BLOCKS ──────────────────────────────────────── */}
      <div
        style={{
          backgroundColor: CREAM,
          paddingTop: "clamp(64px, 7vw, 88px)",
          paddingBottom: "clamp(64px, 7vw, 88px)",
        }}
      >
        <div
          className="mx-auto"
          style={{
            maxWidth: 1280,
            paddingLeft: "clamp(24px, 4vw, 48px)",
            paddingRight: "clamp(24px, 4vw, 48px)",
          }}
        >
          <div
            className="grid grid-cols-1 mdx:grid-cols-3 gap-12 mdx:gap-10"
            style={{
              borderBottom: "1px solid rgba(26, 74, 85, 0.15)",
              paddingBottom: 56,
              marginBottom: 40,
            }}
          >
            {benefits.map((b) => (
              <div key={b.number}>
                <p
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: "italic",
                    fontWeight: 600,
                    fontSize: 44,
                    color: GOLD_DEEP,
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                    marginBottom: 22,
                  }}
                >
                  {b.number}
                </p>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.24em",
                    textTransform: "uppercase",
                    color: DEEP_TEAL,
                    marginBottom: 14,
                  }}
                >
                  {b.title}
                </p>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 16,
                    color: BODY,
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {b.body}
                </p>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col mdx:flex-row gap-4 mdx:gap-5">
            <a
              href="https://uduz.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: CREAM_STRONG,
                backgroundColor: DEEP_TEAL,
                padding: "16px 28px",
                borderRadius: 4,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                transition: "background-color 200ms ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = STEEL_TEAL)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = DEEP_TEAL)}
            >
              Agendar estudio diagnóstico <span aria-hidden>→</span>
            </a>
            <a
              href="https://uduz.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: DEEP_TEAL,
                backgroundColor: "transparent",
                padding: "16px 28px",
                borderRadius: 4,
                border: `1.5px solid ${DEEP_TEAL}`,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                transition: "background-color 200ms ease, color 200ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = DEEP_TEAL;
                e.currentTarget.style.color = CREAM_STRONG;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = DEEP_TEAL;
              }}
            >
              Ver servicios y precios <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}
