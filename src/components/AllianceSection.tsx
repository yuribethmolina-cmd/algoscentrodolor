const CREAM = "#f5f0e8";
const DEEP_TEAL = "#134F5C";
const GOLD = "#c69636";
const BRAND_TEAL = "#3d8b96";
const UDUZ_GREEN = "#8DC63F";
const UDUZ_TEAL = "#1B6B78";

function UduzMark({ size = 44 }: { size?: number }) {
  const dot = size * 0.26;
  const gap = size * 0.14;
  return (
    <div
      aria-hidden="true"
      style={{
        display: "inline-flex",
        flexDirection: "column",
        gap,
        lineHeight: 0,
      }}
    >
      <div style={{ display: "flex", gap }}>
        <span style={{ width: dot, height: dot, borderRadius: "50%", backgroundColor: UDUZ_GREEN }} />
        <span style={{ width: dot, height: dot, borderRadius: "50%", backgroundColor: UDUZ_GREEN }} />
      </div>
      <div style={{ display: "flex", gap }}>
        <span style={{ width: dot, height: dot, borderRadius: "50%", backgroundColor: UDUZ_TEAL }} />
        <span style={{ width: dot, height: dot, borderRadius: "50%", backgroundColor: UDUZ_TEAL }} />
      </div>
    </div>
  );
}

const steps = [
  {
    number: "01",
    eyebrow: "DIAGNÓSTICO INTEGRADO",
    title: "Consulta en ALGOS",
    text: "El especialista evalúa tu caso y determina qué imagen necesitas — si es que la necesitas.",
  },
  {
    number: "02",
    eyebrow: null,
    title: "Imagen el mismo día",
    text: "Tomografía, Rayos X, Mamografía 3D, Ecografía o Laboratorio — en nuestra unidad de diagnóstico integrada.",
  },
  {
    number: "03",
    eyebrow: null,
    title: "El mismo equipo interpreta",
    text: "Los resultados los lee el médico que te evaluó. Con tu historia clínica completa. Sin intermediarios.",
  },
  {
    number: "04",
    eyebrow: null,
    title: "Tratamiento en ALGOS",
    text: "Se define el plan y se ejecuta. Todo en el mismo ecosistema clínico.",
  },
];

const studyChips = [
  "Tomografía",
  "Rayos X",
  "Rayos X a domicilio",
  "Mamografía 3D",
  "Ecografía",
  "Ecocardiograma",
  "Holter",
  "Laboratorio",
  "Laboratorio a domicilio",
];

function ConnectorArrow() {
  return (
    <div
      className="hidden md:flex"
      style={{
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        width: 40,
      }}
      aria-hidden="true"
    >
      <svg width="32" height="12" viewBox="0 0 32 12" fill="none">
        <path
          d="M0 6h28m0 0l-5-4m5 4l-5 4"
          stroke={GOLD}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function ConnectorLineMobile() {
  return (
    <div
      className="flex md:hidden"
      style={{
        alignItems: "center",
        justifyContent: "center",
        height: 32,
      }}
      aria-hidden="true"
    >
      <svg width="12" height="24" viewBox="0 0 12 24" fill="none">
        <path
          d="M6 0v20m0 0l-4-5m4 5l4-5"
          stroke={GOLD}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default function AllianceSection() {
  return (
    <section id="alianza" style={{ backgroundColor: DEEP_TEAL }}>
      <div
        style={{
          padding: "clamp(64px, 8vw, 96px) clamp(24px, 5vw, 72px)",
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
        {/* ── Header ───────────────────────────────────────────── */}
        <div style={{ textAlign: "center", marginBottom: "clamp(48px, 6vw, 72px)" }}>
          <p
            style={{
              fontFamily: "'Manrope', system-ui, sans-serif",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: GOLD,
              margin: "0 0 20px",
            }}
          >
            DIAGNÓSTICO INTEGRADO
          </p>
          <h2
            style={{
              fontFamily: "'Sora', system-ui, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(28px, 3.6vw, 44px)",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: CREAM,
              margin: "0 auto 20px",
              maxWidth: "28ch",
            }}
          >
            Un ecosistema clínico completo. Sin traslados.
          </h2>
          <p
            style={{
              fontFamily: "'Manrope', system-ui, sans-serif",
              fontSize: "clamp(15px, 1.2vw, 17px)",
              fontWeight: 400,
              color: "rgba(245, 240, 232, 0.85)",
              lineHeight: 1.7,
              margin: "0 auto",
              maxWidth: "58ch",
            }}
          >
            Tu evaluación, tu imagen diagnóstica y tu tratamiento ocurren en el mismo lugar, con el mismo equipo informado de tu caso. No tienes que explicar tu historia dos veces.
          </p>
        </div>

        {/* ── 4-Step Flow ─────────────────────────────────────── */}
        <div
          className="flex flex-col md:flex-row"
          style={{
            alignItems: "stretch",
            justifyContent: "center",
            gap: 0,
            marginBottom: "clamp(48px, 6vw, 64px)",
          }}
        >
          {steps.map((step, i) => (
            <div key={step.number} className="flex flex-col md:flex-row" style={{ alignItems: "stretch" }}>
              {/* Step card */}
              <div
                style={{
                  flex: "1 1 0",
                  minWidth: 0,
                  backgroundColor: "rgba(245, 240, 232, 0.06)",
                  border: "1px solid rgba(245, 240, 232, 0.12)",
                  borderRadius: 10,
                  padding: "clamp(24px, 2.8vw, 32px)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <p
                  style={{
                    fontFamily: "'Sora', system-ui, sans-serif",
                    fontWeight: 600,
                    fontSize: "clamp(24px, 3vw, 32px)",
                    color: GOLD,
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                    margin: 0,
                  }}
                >
                  {step.number}
                </p>
                {step.eyebrow && (
                  <p
                    style={{
                      fontFamily: "'Manrope', system-ui, sans-serif",
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.26em",
                      textTransform: "uppercase",
                      color: GOLD,
                      margin: 0,
                    }}
                  >
                    {step.eyebrow}
                  </p>
                )}
                <h3
                  style={{
                    fontFamily: "'Sora', system-ui, sans-serif",
                    fontWeight: 600,
                    fontSize: "clamp(16px, 1.4vw, 20px)",
                    color: CREAM,
                    lineHeight: 1.3,
                    letterSpacing: "-0.01em",
                    margin: 0,
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Manrope', system-ui, sans-serif",
                    fontSize: "clamp(14px, 1.1vw, 15px)",
                    color: "rgba(245, 240, 232, 0.75)",
                    lineHeight: 1.65,
                    margin: 0,
                    maxWidth: "36ch",
                  }}
                >
                  {step.text}
                </p>
              </div>

              {/* Connector (except after last step) */}
              {i < steps.length - 1 && (
                <>
                  <ConnectorArrow />
                  <ConnectorLineMobile />
                </>
              )}
            </div>
          ))}
        </div>

        {/* ── Study Chips ───────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "10px",
            marginBottom: "clamp(40px, 5vw, 56px)",
          }}
        >
          {studyChips.map((chip) => (
            <span
              key={chip}
              style={{
                fontFamily: "'Manrope', system-ui, sans-serif",
                fontSize: 12,
                fontWeight: 500,
                color: CREAM,
                backgroundColor: "rgba(245, 240, 232, 0.08)",
                border: "1px solid rgba(245, 240, 232, 0.2)",
                borderRadius: 100,
                padding: "7px 16px",
                whiteSpace: "nowrap",
              }}
            >
              {chip}
            </span>
          ))}
        </div>

        {/* ── CTA ─────────────────────────────────────────────── */}
        <div style={{ textAlign: "center", marginBottom: "clamp(56px, 7vw, 80px)" }}>
          <a
            href="https://wa.me/584126404124"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Manrope', system-ui, sans-serif",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: CREAM,
              backgroundColor: BRAND_TEAL,
              padding: "16px 32px",
              borderRadius: 4,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              transition: "background-color 200ms ease, transform 200ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#357a84";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = BRAND_TEAL;
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Agendar estudio diagnóstico <span aria-hidden="true">→</span>
          </a>
        </div>

        {/* ── UDUZ Contact Card ────────────────────────────────── */}
        <div
          style={{
            maxWidth: 560,
            margin: "0 auto",
            backgroundColor: "rgba(245, 240, 232, 0.04)",
            border: "1px solid rgba(245, 240, 232, 0.12)",
            borderLeft: `3px solid ${GOLD}`,
            borderRadius: 10,
            padding: "clamp(28px, 3.5vw, 36px)",
          }}
        >
          <p
            style={{
              fontFamily: "'Manrope', system-ui, sans-serif",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: GOLD,
              margin: "0 0 10px",
            }}
          >
            UDUZ · Unidad de Diagnóstico
          </p>
          <h3
            style={{
              fontFamily: "'Sora', system-ui, sans-serif",
              fontWeight: 600,
              fontSize: "clamp(18px, 1.6vw, 22px)",
              color: CREAM,
              margin: "0 0 20px",
              letterSpacing: "-0.01em",
            }}
          >
            Unidad de Diagnóstico Universitaria del Zulia
          </h3>

          <dl
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              columnGap: 16,
              rowGap: 10,
              fontFamily: "'Manrope', system-ui, sans-serif",
              fontSize: 14,
              color: "rgba(245, 240, 232, 0.85)",
              lineHeight: 1.55,
              margin: 0,
            }}
          >
            <dt style={{ color: "rgba(245, 240, 232, 0.45)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", alignSelf: "center" }}>Dirección</dt>
            <dd style={{ margin: 0 }}>Av. 4001, Maracaibo · Sector Paraíso</dd>

            <dt style={{ color: "rgba(245, 240, 232, 0.45)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", alignSelf: "center" }}>Teléfono</dt>
            <dd style={{ margin: 0 }}>
              <a href="tel:+584126044124" style={{ color: CREAM, textDecoration: "none" }}>
                +58 412-604-4124
              </a>
            </dd>

            <dt style={{ color: "rgba(245, 240, 232, 0.45)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", alignSelf: "center" }}>Instagram</dt>
            <dd style={{ margin: 0 }}>
              <a
                href="https://instagram.com/uduz_maracaibo"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: CREAM, textDecoration: "none", borderBottom: `1px solid ${GOLD}`, paddingBottom: 1 }}
              >
                @uduz_maracaibo
              </a>
            </dd>

            <dt style={{ color: "rgba(245, 240, 232, 0.45)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", alignSelf: "center" }}>Horario</dt>
            <dd style={{ margin: 0 }}>Lun–Sáb · 6:30 AM – 7:00 PM</dd>

            <dt style={{ color: "rgba(245, 240, 232, 0.45)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", alignSelf: "center" }}>Reseñas</dt>
            <dd style={{ margin: 0, color: CREAM }}>
              <span style={{ color: GOLD }}>★</span> 4.8 <span style={{ color: "rgba(245, 240, 232, 0.5)" }}>· 246 en Google</span>
            </dd>
          </dl>

          <p
            style={{
              fontFamily: "'Manrope', system-ui, sans-serif",
              fontSize: 12,
              color: "rgba(245, 240, 232, 0.5)",
              margin: "24px 0 0",
              paddingTop: 20,
              borderTop: "1px solid rgba(245, 240, 232, 0.1)",
              lineHeight: 1.6,
            }}
          >
            Para Tomografía, Rayos X, Mamografía 3D, Ecografía y Laboratorio.
          </p>
        </div>
      </div>
    </section>
  );
}
