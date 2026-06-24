import algosLogoCream from "@/assets/algos-logo-cream.png";

const CREAM = "#f5f0e8";
const DEEP_TEAL = "#1a4a55";
const STEEL_TEAL = "#2a6270";
const GOLD = "#c69636";
const BODY = "#4a4a4a";
const UDUZ_GREEN = "#8DC63F";

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

export default function AllianceSection() {
  return (
    <section id="alianza" style={{ backgroundColor: CREAM }}>

      {/* ── SPLIT PANEL ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 mdx:grid-cols-2" style={{ minHeight: 480 }}>

        {/* Left — ALGOS (deep teal) */}
        <div
          style={{
            backgroundColor: DEEP_TEAL,
            padding: "clamp(56px, 7vw, 96px) clamp(32px, 5vw, 72px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 40,
          }}
        >
          <div>
            <img
              src={algosLogoCream}
              alt="ALGOS — Centro de Dolor Intervencionista"
              style={{ height: 44, width: "auto", marginBottom: 28 }}
            />
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: GOLD,
                marginBottom: 20,
              }}
            >
              Centro de Dolor Intervencionista
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {algosServices.map((s) => (
                <li
                  key={s}
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 14,
                    color: "rgba(245, 240, 232, 0.8)",
                    lineHeight: 1.5,
                    paddingBottom: 10,
                    marginBottom: 10,
                    borderBottom: "1px solid rgba(245, 240, 232, 0.1)",
                  }}
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <p
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(26px, 2.8vw, 36px)",
              color: CREAM,
              lineHeight: 1.2,
              margin: 0,
              maxWidth: "22ch",
            }}
          >
            Lo que hacemos — <em style={{ color: GOLD }}>cómo lo hacemos.</em>
          </p>
        </div>

        {/* Right — UDUZ (cream) */}
        <div
          style={{
            backgroundColor: CREAM,
            borderLeft: "1px solid rgba(26, 74, 85, 0.12)",
            padding: "clamp(56px, 7vw, 96px) clamp(32px, 5vw, 72px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 40,
          }}
        >
          <div>
            <img
              src="/logos/uduz-logo.svg"
              alt="UDUZ — Unidad de Diagnóstico Universitaria del Zulia"
              style={{ height: 40, width: "auto", marginBottom: 28 }}
            />
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: UDUZ_GREEN,
                marginBottom: 20,
              }}
            >
              Unidad de Diagnóstico · Paraíso
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {uduzServices.map((s) => (
                <li
                  key={s.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    fontFamily: "Inter, sans-serif",
                    fontSize: 14,
                    color: DEEP_TEAL,
                    paddingBottom: 10,
                    marginBottom: 10,
                    borderBottom: "1px solid rgba(26, 74, 85, 0.1)",
                  }}
                >
                  <span>{s.label}</span>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 11,
                      color: STEEL_TEAL,
                      opacity: 0.8,
                      letterSpacing: "0.04em",
                    }}
                  >
                    {s.detail}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <p
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(26px, 2.8vw, 36px)",
              color: DEEP_TEAL,
              lineHeight: 1.2,
              margin: 0,
              maxWidth: "22ch",
            }}
          >
            Lo que necesitas — <em style={{ color: UDUZ_GREEN }}>antes de llegar.</em>
          </p>
        </div>
      </div>

      {/* ── ALLIANCE BRIDGE ─────────────────────────────────────── */}
      <div
        style={{
          borderTop: "1px solid rgba(26, 74, 85, 0.12)",
          borderBottom: "1px solid rgba(26, 74, 85, 0.12)",
          backgroundColor: DEEP_TEAL,
          padding: "clamp(48px, 6vw, 80px) clamp(32px, 5vw, 72px)",
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
            padding: "6px 18px",
            marginBottom: 28,
          }}
        >
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.28em",
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
            fontSize: "clamp(36px, 5vw, 64px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: CREAM,
            margin: "0 auto",
            maxWidth: "22ch",
          }}
        >
          Un ecosistema clínico completo.{" "}
          <em style={{ fontStyle: "italic", fontWeight: 400, color: GOLD }}>
            Sin traslados.
          </em>
        </h2>

        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(14px, 1.2vw, 17px)",
            color: "rgba(245, 240, 232, 0.7)",
            lineHeight: 1.6,
            marginTop: 20,
            maxWidth: "52ch",
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
          paddingTop: "clamp(56px, 7vw, 80px)",
          paddingBottom: "clamp(56px, 7vw, 80px)",
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
            className="grid grid-cols-1 mdx:grid-cols-3 gap-10 mdx:gap-8"
            style={{
              borderBottom: "1px solid rgba(26, 74, 85, 0.12)",
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
                    fontWeight: 400,
                    fontSize: 36,
                    color: GOLD,
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                    marginBottom: 20,
                  }}
                >
                  {b.number}
                </p>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: DEEP_TEAL,
                    marginBottom: 12,
                  }}
                >
                  {b.title}
                </p>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 14,
                    color: BODY,
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {b.body}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col mdx:flex-row gap-4 mdx:gap-8 mdx:items-center">
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
                borderBottom: `1.5px solid ${DEEP_TEAL}`,
                paddingBottom: 4,
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Agendar estudio diagnóstico →
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
                color: STEEL_TEAL,
                borderBottom: `1.5px solid rgba(42,98,112,0.4)`,
                paddingBottom: 4,
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Ver servicios y precios →
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}
