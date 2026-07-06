import uduzFacade from "@/assets/uduz-facade.webp.asset.json";

const CREAM = "#f5f0e8";
const DEEP_TEAL = "#134F5C";
const GOLD = "#c69636";
const BRAND_TEAL = "#3d8b96";
const UDUZ_GREEN = "#8DC63F";
const UDUZ_TEAL = "#1B6B78";

function UduzMark({ size = 44, onDark = false }: { size?: number; onDark?: boolean }) {
  const dot = size * 0.26;
  const gap = size * 0.14;
  const bottom = onDark ? "#f5f0e8" : UDUZ_TEAL;
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
        <span style={{ width: dot, height: dot, borderRadius: "50%", backgroundColor: bottom }} />
        <span style={{ width: dot, height: dot, borderRadius: "50%", backgroundColor: bottom }} />
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
    <section
      id="alianza"
      data-surface="dark"
      style={{
        backgroundColor: DEEP_TEAL,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient background glows */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "8%",
          left: "-8%",
          width: 520,
          height: 520,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${UDUZ_GREEN}22 0%, transparent 70%)`,
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "5%",
          right: "-6%",
          width: 460,
          height: 460,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${GOLD}20 0%, transparent 70%)`,
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          padding: "clamp(64px, 8vw, 96px) clamp(24px, 5vw, 72px)",
          maxWidth: 1280,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
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
              color: CREAM,
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
                  background:
                    "linear-gradient(155deg, rgba(245,240,232,0.10) 0%, rgba(245,240,232,0.04) 100%)",
                  backdropFilter: "blur(12px) saturate(140%)",
                  WebkitBackdropFilter: "blur(12px) saturate(140%)",
                  border: "1px solid rgba(245, 240, 232, 0.14)",
                  borderRadius: 0,
                  padding: "clamp(24px, 2.8vw, 32px)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  boxShadow:
                    "0 1px 0 rgba(245,240,232,0.08) inset, 0 20px 40px -24px rgba(0,0,0,0.4)",
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
                background:
                  "linear-gradient(135deg, rgba(141,198,63,0.14) 0%, rgba(245,240,232,0.06) 100%)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                border: `1px solid ${UDUZ_GREEN}55`,
                borderRadius: 0,
                padding: "7px 16px",
                whiteSpace: "nowrap",
                transition: "border-color 200ms ease, transform 200ms ease",
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
              backgroundColor: UDUZ_TEAL,
              padding: "16px 32px",
              borderRadius: 0,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              transition: "background-color 200ms ease, transform 200ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = UDUZ_GREEN;
              e.currentTarget.style.color = UDUZ_TEAL;
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = UDUZ_TEAL;
              e.currentTarget.style.color = CREAM;
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Agendar estudio diagnóstico <span aria-hidden="true">→</span>
          </a>
        </div>

        {/* ── UDUZ Contact Card (UDUZ branding) ─────────────────── */}
        <div
          style={{
            width: "100%",
            margin: "0",
            position: "relative",
            background:
              "linear-gradient(155deg, rgba(255,255,255,0.10) 0%, rgba(27,107,120,0.18) 100%)",
            backdropFilter: "blur(18px) saturate(150%)",
            WebkitBackdropFilter: "blur(18px) saturate(150%)",
            border: "1px solid rgba(245,240,232,0.14)",
            borderRadius: 0,
            padding: "clamp(28px, 5vw, 56px)",
            boxShadow:
              "0 1px 0 rgba(245,240,232,0.10) inset, 0 30px 60px -30px rgba(0,0,0,0.5)",
            overflow: "hidden",
          }}
        >
          {/* UDUZ facade image — lazy-loaded, decoded async, low priority.
              Uses <img> instead of CSS background so the browser can defer
              the request until the card is close to the viewport. The single
              WebP (~33KB from CDN) is reused in two positions via srcset
              sizes; the browser only fetches it once. */}
          <img
            src={uduzFacade.url}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            // @ts-expect-error — fetchpriority is a valid HTML attribute
            fetchpriority="low"
            className="block md:hidden pointer-events-none select-none"
            sizes="(max-width: 767px) 100vw, 0px"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "45%",
              objectFit: "cover",
              objectPosition: "center 40%",
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.25) 65%, transparent 100%)",
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.25) 65%, transparent 100%)",
              opacity: 0.28,
            }}
          />
          <img
            src={uduzFacade.url}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            // @ts-expect-error — fetchpriority is a valid HTML attribute
            fetchpriority="low"
            className="hidden md:block pointer-events-none select-none"
            sizes="(min-width: 768px) 38vw, 0px"
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              height: "100%",
              width: "38%",
              objectFit: "cover",
              objectPosition: "center",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.9) 100%)",
              maskImage:
                "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.9) 100%)",
              opacity: 0.5,
            }}
          />
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(90deg, rgba(19,79,92,0.65) 0%, rgba(19,79,92,0.25) 55%, ${UDUZ_TEAL}66 100%)`,
              pointerEvents: "none",
            }}
          />
          {/* UDUZ ambient glow */}
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              top: -80,
              right: -80,
              width: 240,
              height: 240,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${UDUZ_GREEN}30 0%, transparent 70%)`,
              filter: "blur(30px)",
              pointerEvents: "none",
            }}
          />

          {/* UDUZ brand header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 22,
              position: "relative",
            }}
          >
            <UduzMark size={38} onDark />
            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <span
                style={{
                  fontFamily: "'Sora', system-ui, sans-serif",
                  fontSize: 22,
                  fontWeight: 700,
                  color: CREAM,
                  letterSpacing: "0.04em",
                  lineHeight: 1,
                }}
              >
                UDUZ
              </span>
              <span
                style={{
                  fontFamily: "'Manrope', system-ui, sans-serif",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: UDUZ_GREEN,
                }}
              >
                Unidad de Diagnóstico
              </span>
            </div>
          </div>

          <h3
            style={{
              fontFamily: "'Sora', system-ui, sans-serif",
              fontWeight: 600,
              fontSize: "clamp(18px, 1.6vw, 22px)",
              color: CREAM,
              margin: "0 0 22px",
              letterSpacing: "-0.01em",
              position: "relative",
            }}
          >
            Unidad de Diagnóstico Universitaria del Zulia
          </h3>

          <dl
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            style={{
              gap: "20px 32px",
              fontFamily: "'Manrope', system-ui, sans-serif",
              fontSize: 14,
              color: "rgba(245, 240, 232, 0.88)",
              lineHeight: 1.55,
              margin: 0,
              position: "relative",
            }}
          >
            {[
              { k: "Dirección", v: "Av. 4001, Maracaibo · Sector Paraíso" },
              {
                k: "Teléfono",
                v: (
                  <a href="tel:+584126044124" style={{ color: CREAM, textDecoration: "none" }}>
                    +58 412-604-4124
                  </a>
                ),
              },
              {
                k: "Instagram",
                v: (
                  <a
                    href="https://instagram.com/uduz_maracaibo"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: CREAM, textDecoration: "none", borderBottom: `1px solid ${UDUZ_GREEN}`, paddingBottom: 1 }}
                  >
                    @uduz_maracaibo
                  </a>
                ),
              },
              { k: "Horario", v: "Lun–Sáb · 6:30 AM – 7:00 PM" },
              {
                k: "Reseñas",
                v: (
                  <>
                    <span style={{ color: UDUZ_GREEN }}>★</span> 4.8{" "}
                    <span style={{ color: "rgba(245, 240, 232, 0.5)" }}>· 246 en Google</span>
                  </>
                ),
              },
            ].map((row) => (
              <div key={row.k} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <dt
                  style={{
                    color: UDUZ_GREEN,
                    fontSize: 10,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                  }}
                >
                  {row.k}
                </dt>
                <dd style={{ margin: 0, color: CREAM }}>{row.v}</dd>
              </div>
            ))}
          </dl>

          <p
            style={{
              fontFamily: "'Manrope', system-ui, sans-serif",
              fontSize: 12,
              color: "rgba(245, 240, 232, 0.55)",
              margin: "26px 0 0",
              paddingTop: 20,
              borderTop: `1px solid ${UDUZ_GREEN}33`,
              lineHeight: 1.6,
              position: "relative",
            }}
          >
            Para Tomografía, Rayos X, Mamografía 3D, Ecografía y Laboratorio.
          </p>
        </div>
      </div>
    </section>
  );
}
