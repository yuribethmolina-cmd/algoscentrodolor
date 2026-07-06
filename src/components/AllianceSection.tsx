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
  { label: "Rayos X digital", detail: "$8" },
  { label: "Mamografía 3D", detail: "disponible" },
  { label: "Ecografía", detail: "$15" },
  { label: "Laboratorio clínico", detail: "pre-procedimiento" },
];

type BenefitBody = (React.ReactNode)[];
const benefits: { number: string; title: string; body: BenefitBody; uduzHighlight: React.ReactNode }[] = [
  {
    number: "01",
    title: "DIAGNÓSTICO INTEGRADO",
    body: [
      "Nuestro equipo revisa tus imágenes antes de recibirte, sin pasos intermedios.",
    ],
    uduzHighlight: (
      <>
        Tomografía <strong>$25 · 24/7</strong> · Ecografía <strong>$15</strong> · Rayos X <strong>$8</strong> en <strong>UDUZ Paraíso</strong> — a metros de la consulta.
      </>
    ),
  },
  {
    number: "02",
    title: "UN SOLO EXPEDIENTE",
    body: [
      "Tu historia clínica viaja sin que tengas que repetirla. Llegas con los estudios; el equipo ya los conoce.",
    ],
    uduzHighlight: (
      <>
        Expediente compartido entre <strong>ALGOS</strong> y <strong>UDUZ</strong>.
      </>
    ),
  },
  {
    number: "03",
    title: "SALA DE PROCEDIMIENTOS",
    body: [
      "Con fluoroscopio y sala equipada, mientras el Local 4 termina su adecuación.",
    ],
    uduzHighlight: (
      <>
        Los procedimientos se realizan en instalaciones de <strong>UDUZ</strong>.
      </>
    ),
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

        {/* Right — UDUZ (resaltado) */}
        <div
          style={{
            padding: "clamp(56px, 7vw, 96px) clamp(32px, 5vw, 72px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 48,
            borderLeft: `3px solid ${UDUZ_GREEN}`,
            backgroundColor: CREAM_STRONG,
            position: "relative",
          }}
        >
          {/* Etiqueta "DESTACADO" superior */}
          <span
            style={{
              position: "absolute",
              top: 18,
              right: 22,
              fontFamily: "Inter, sans-serif",
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: CREAM_STRONG,
              backgroundColor: UDUZ_GREEN,
              padding: "5px 10px",
              borderRadius: 3,
            }}
          >
            Aliado diagnóstico
          </span>
          <div>
            <img
              src="/logos/uduz-logo.svg"
              alt="UDUZ — Unidad de Diagnóstico Universitaria del Zulia"
              style={{ height: 56, width: "auto", marginBottom: 28, display: "block" }}
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
                    fontSize: 17,
                    fontWeight: 700,
                    color: DEEP_TEAL,
                    paddingBottom: 14,
                    marginBottom: 14,
                    borderBottom: `1px solid ${UDUZ_GREEN}33`,
                  }}
                >
                  <span>{s.label}</span>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 13,
                      fontWeight: 700,
                      color: UDUZ_GREEN,
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
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: GOLD,
            marginBottom: 24,
          }}
        >
          DIAGNÓSTICO INTEGRADO
        </p>

        <h2
          style={{
            fontFamily: "'Sora', serif",
            fontWeight: 700,
            fontSize: "clamp(28px, 3.6vw, 44px)",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            color: CREAM_STRONG,
            margin: "0 auto 24px",
            maxWidth: "32ch",
          }}
        >
          Tu evaluación, tu imagen y tu tratamiento en el mismo ecosistema.
        </h2>

        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(15px, 1.2vw, 17px)",
            fontWeight: 400,
            color: "rgba(250, 246, 239, 0.85)",
            lineHeight: 1.7,
            marginBottom: 32,
            maxWidth: "58ch",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          A través de nuestra alianza con UDUZ — Unidad de Diagnóstico del
          Zulia — ofrecemos estudios de imagen y laboratorio dentro del mismo
          proceso clínico. El médico que te evalúa es el mismo que interpreta
          tus resultados.
        </p>

        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(13px, 1.1vw, 15px)",
            fontWeight: 500,
            color: "rgba(250, 246, 239, 0.7)",
            letterSpacing: "0.06em",
            marginBottom: 36,
          }}
        >
          Tomografía · Rayos X · Mamografía 3D · Ecografía · Laboratorio
          clínico · Holter · Electrocardiograma
        </p>

        <a
          href="https://wa.me/584126404124"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: DEEP_TEAL,
            backgroundColor: GOLD,
            padding: "14px 28px",
            borderRadius: 4,
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          Agendar estudio diagnóstico <span aria-hidden>→</span>
        </a>
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
            className="grid grid-cols-1 md:grid-cols-2 mdx:grid-cols-3 gap-5 sm:gap-6 md:gap-6 mdx:gap-7"
            style={{
              alignItems: "stretch",
              paddingBottom: "clamp(40px, 5vw, 56px)",
              marginBottom: "clamp(28px, 4vw, 40px)",
              borderBottom: "1px solid rgba(26, 74, 85, 0.15)",
            }}
          >
            {benefits.map((b) => (
              <article
                key={b.number}
                style={{
                  height: "auto",
                  backgroundColor: CREAM_STRONG,
                  border: "1px solid rgba(26, 74, 85, 0.12)",
                  borderRadius: 10,
                  padding: "clamp(20px, 3.2vw, 28px)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "clamp(12px, 1.6vw, 16px)",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Sora', serif",
                    fontWeight: 600,
                    fontSize: "clamp(32px, 4.6vw, 44px)",
                    color: GOLD_DEEP,
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                    margin: 0,
                  }}
                >
                  {b.number}
                </p>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "clamp(10.5px, 1.1vw, 12px)",
                    fontWeight: 700,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: DEEP_TEAL,
                    margin: 0,
                  }}
                >
                  {b.title}
                </p>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "clamp(14.5px, 1.15vw, 16px)",
                    color: BODY,
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {b.body}
                </p>

                {/* Spacer empuja el card UDUZ al fondo para alinearlos entre tarjetas */}
                <div style={{ flex: 1, minHeight: 4 }} />

                {/* UDUZ highlight card — consistente, siempre resaltado */}
                <div
                  style={{
                    backgroundColor: "#fbfaf5",
                    border: `1px solid ${UDUZ_GREEN}66`,
                    borderLeft: `4px solid ${UDUZ_GREEN}`,
                    borderRadius: 6,
                    padding: "clamp(16px, 2vw, 20px) clamp(18px, 2.2vw, 22px)",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "clamp(14px, 1.2vw, 15px)",
                    lineHeight: 1.6,
                    color: DEEP_TEAL,
                    boxShadow: `inset 0 0 0 1px ${UDUZ_GREEN}18`,
                    wordWrap: "break-word",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "clamp(11px, 0.95vw, 12px)",
                      fontWeight: 800,
                      letterSpacing: "0.26em",
                      textTransform: "uppercase",
                      color: UDUZ_GREEN,
                      margin: "0 0 8px",
                    }}
                  >
                    Vía UDUZ
                  </p>
                  {b.uduzHighlight}
                </div>
              </article>
            ))}
          </div>


          {/* CTA buttons */}
          <div className="flex flex-col mdx:flex-row gap-4 mdx:gap-5">
            <a
              href="https://wa.me/584126404124"
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
