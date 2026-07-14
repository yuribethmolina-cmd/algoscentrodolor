import { Search, Target, HeartHandshake } from "lucide-react";

const DEEP_TEAL = "#1a4a55";
const GOLD = "#c69636";
const CREAM = "#f5f0e8";

const pilares = [
  {
    icon: Search,
    titulo: "Buscamos el origen",
    texto:
      "No tratamos síntomas. Identificamos exactamente qué estructura genera su dolor antes de intervenir.",
  },
  {
    icon: Target,
    titulo: "Intervenimos con precisión",
    texto:
      "Procedimientos guiados por imagen, mínimamente invasivos. Actuamos en el punto exacto, sin cirugía abierta.",
  },
  {
    icon: HeartHandshake,
    titulo: "Lo acompañamos en el tiempo",
    texto:
      "El dolor crónico no desaparece en una sesión. Diseñamos un plan y lo seguimos con usted hasta el resultado.",
  },
];

export default function WhyDifferentSection() {
  return (
    <section
      data-section="why-different"
      style={{
        backgroundColor: CREAM,
        paddingTop: "clamp(80px, 10vw, 128px)",
        paddingBottom: "clamp(80px, 10vw, 128px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        className="mx-auto"
        style={{
          maxWidth: 1080,
          paddingLeft: "clamp(24px, 4vw, 48px)",
          paddingRight: "clamp(24px, 4vw, 48px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "clamp(48px, 6vw, 72px)" }}>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: DEEP_TEAL,
              marginBottom: 20,
            }}
          >
            POR QUÉ ALGOS
          </p>
          <h2
            style={{
              fontFamily: "'Sora', serif",
              fontWeight: 600,
              fontSize: "clamp(32px, 4.2vw, 56px)",
              lineHeight: 1.15,
              color: DEEP_TEAL,
              marginBottom: 20,
            }}
          >
            El dolor crónico se maneja. No se abandona.
          </h2>
        </div>

        {/* Cards, 3 columns on desktop, 1 on mobile */}
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ gap: "clamp(14px, 2vw, 22px)" }}
        >
          {pilares.map((p, i) => (
            <div
              key={p.titulo}
              className="group relative overflow-hidden"
              style={{
                padding: "clamp(28px, 3vw, 40px)",
                background:
                  "linear-gradient(155deg, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.55) 100%)",
                backdropFilter: "blur(14px) saturate(140%)",
                WebkitBackdropFilter: "blur(14px) saturate(140%)",
                border: "1px solid rgba(255,255,255,0.6)",
                borderRadius: 0,
                boxShadow:
                  "0 1px 0 rgba(255,255,255,0.7) inset, 0 20px 40px -24px rgba(26,74,85,0.28), 0 2px 6px rgba(26,74,85,0.06)",
                transition:
                  "transform 500ms cubic-bezier(0.22,1,0.36,1), box-shadow 500ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow =
                  "0 1px 0 rgba(255,255,255,0.9) inset, 0 30px 60px -28px rgba(26,74,85,0.4), 0 4px 10px rgba(26,74,85,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 1px 0 rgba(255,255,255,0.7) inset, 0 20px 40px -24px rgba(26,74,85,0.28), 0 2px 6px rgba(26,74,85,0.06)";
              }}
            >
              {/* Ambient corner glow */}
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: -60,
                  right: -60,
                  width: 180,
                  height: 180,
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${GOLD}22 0%, transparent 70%)`,
                  filter: "blur(20px)",
                  pointerEvents: "none",
                }}
              />
              {/* Numeral */}
              <p
                style={{
                  fontFamily: "'Sora', serif",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.28em",
                  color: DEEP_TEAL,
                  margin: "0 0 18px",
                  position: "relative",
                }}
              >
                0{i + 1}
              </p>
              <p.icon
                style={{ width: 36, height: 36, color: GOLD, marginBottom: 22 }}
                strokeWidth={1.25}
              />
              <h3
                style={{
                  fontFamily: "'Sora', serif",
                  fontWeight: 600,
                  fontSize: "clamp(17px, 1.5vw, 20px)",
                  lineHeight: 1.3,
                  color: DEEP_TEAL,
                  marginBottom: 12,
                  position: "relative",
                }}
              >
                {p.titulo}
              </h3>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "clamp(13px, 1.1vw, 15px)",
                  lineHeight: 1.7,
                  color: "rgba(26,74,85,0.78)",
                  margin: 0,
                  position: "relative",
                }}
              >
                {p.texto}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Ambient background glows */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "10%",
          left: "-8%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${GOLD}18 0%, transparent 70%)`,
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "5%",
          right: "-6%",
          width: 380,
          height: 380,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(61,139,150,0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
    </section>
  );
}
