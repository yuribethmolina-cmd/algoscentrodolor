import { Globe, Cpu, Shield, Crosshair } from "lucide-react";

const DEEP_TEAL = "#1a4a55";
const TEAL = "#3d8b96";
const GOLD = "#c69636";
const CREAM = "#f5f0e8";

const differentiators = [
  {
    icon: Crosshair,
    title: "Diagnóstico, imagen y tratamiento en una sola ruta",
    description:
      "Usted no tiene que coordinar entre diferentes especialistas ni repetir estudios. El recorrido completo ocurre en ALGOS.",
  },
  {
    icon: Globe,
    title: "Alianza diagnóstica con UDUZ",
    description:
      "Los mismos estudios que identifican el origen del dolor orientan el procedimiento. No hay interpretaciones intermedias que se pierdan.",
  },
  {
    icon: Shield,
    title: "Siempre lo menos invasivo primero",
    description:
      "Agotamos las opciones intervencionistas antes de considerar la cirugía. Solo se opera cuando los criterios clínicos lo justifican.",
  },
  {
    icon: Cpu,
    title: "Tratamos exactamente lo que hace falta",
    description:
      "Sin procedimientos innecesarios. El especialista determina qué tratar, en qué orden y con qué técnica — basado en su caso específico.",
  },
];

const stats = [
  { value: "347K+", label: "Personas con dolor lumbar en Maracaibo", highlight: false },
  { value: "1er", label: "Centro de dolor intervencionista del Estado Zulia", highlight: true },
  { value: "82%", label: "Trabajadores petroleros con dolor musculoesquelético", highlight: false },
  { value: "13.9%", label: "Prevalencia de lumbalgia crónica en el Zulia", highlight: false },
];

export default function WhyDifferentSection() {
  return (
    <section
      style={{
        backgroundColor: DEEP_TEAL,
        paddingTop: "clamp(64px, 8vw, 96px)",
        paddingBottom: "clamp(64px, 8vw, 96px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative blobs */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 500,
          height: 500,
          borderRadius: "50%",
          backgroundColor: `rgba(61,139,150,0.07)`,
          filter: "blur(80px)",
          transform: "translate(33%, -50%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: 360,
          height: 360,
          borderRadius: "50%",
          backgroundColor: `rgba(198,150,54,0.05)`,
          filter: "blur(70px)",
          transform: "translate(-33%, 50%)",
          pointerEvents: "none",
        }}
      />

      <div
        className="mx-auto"
        style={{
          maxWidth: 1100,
          paddingLeft: "clamp(24px, 4vw, 48px)",
          paddingRight: "clamp(24px, 4vw, 48px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "clamp(40px, 5vw, 64px)" }}>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: TEAL,
              marginBottom: 16,
            }}
          >
            Diferencia
          </p>
          <h2
            style={{
              fontFamily: "'Sora', serif",
              fontWeight: 300,
              fontSize: "clamp(28px, 3.5vw, 46px)",
              lineHeight: 1.2,
              color: CREAM,
              marginBottom: 16,
            }}
          >
            ¿Por qué{" "}
            <span style={{ fontWeight: 400, color: TEAL }}>ALGOS</span>?
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(15px, 1.3vw, 18px)",
              fontWeight: 300,
              lineHeight: 1.65,
              color: "rgba(245,240,232,0.60)",
              maxWidth: "52ch",
              margin: "0 auto",
            }}
          >
            En dolor intervencionista, el proceso y el equipo son el diferencial.
          </p>
        </div>

        {/* Stats bar */}
        <div
          className="grid grid-cols-2 md:grid-cols-4"
          style={{ gap: 12, marginBottom: "clamp(40px, 5vw, 64px)" }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              style={{
                textAlign: "center",
                padding: "clamp(16px, 2vw, 24px) 12px",
                borderRadius: 16,
                border: `1px solid ${stat.highlight ? "rgba(198,150,54,0.35)" : "rgba(245,240,232,0.10)"}`,
                backgroundColor: stat.highlight
                  ? "rgba(198,150,54,0.10)"
                  : "rgba(245,240,232,0.04)",
              }}
            >
              <span
                style={{
                  display: "block",
                  fontFamily: "'Sora', serif",
                  fontSize: "clamp(26px, 3vw, 38px)",
                  fontWeight: 300,
                  color: stat.highlight ? GOLD : TEAL,
                  marginBottom: 8,
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  display: "block",
                  fontFamily: "Inter, sans-serif",
                  fontSize: 11,
                  fontWeight: 400,
                  lineHeight: 1.5,
                  color: "rgba(245,240,232,0.50)",
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Differentiator cards */}
        <div className="grid sm:grid-cols-2" style={{ gap: 16 }}>
          {differentiators.map((item) => (
            <div
              key={item.title}
              style={{
                padding: "clamp(20px, 2.5vw, 28px)",
                borderRadius: 16,
                border: "1px solid rgba(245,240,232,0.10)",
                backgroundColor: "rgba(245,240,232,0.03)",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  backgroundColor: "rgba(61,139,150,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 16,
                }}
              >
                <item.icon style={{ width: 20, height: 20, color: TEAL }} />
              </div>
              <h3
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 15,
                  fontWeight: 500,
                  color: CREAM,
                  marginBottom: 8,
                  lineHeight: 1.4,
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 14,
                  fontWeight: 300,
                  lineHeight: 1.7,
                  color: "rgba(245,240,232,0.55)",
                  margin: 0,
                }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Blockquote */}
        <blockquote
          style={{
            marginTop: "clamp(40px, 5vw, 56px)",
            maxWidth: "64ch",
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center",
            borderTop: "1px solid rgba(245,240,232,0.18)",
            paddingTop: "clamp(32px, 4vw, 48px)",
          }}
        >
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(15px, 1.3vw, 17px)",
              fontWeight: 300,
              lineHeight: 1.75,
              color: "rgba(245,240,232,0.72)",
              fontStyle: "italic",
              margin: 0,
            }}
          >
            "En ALGOS el tratamiento no termina cuando termina el procedimiento: seguimos su
            evolución y le acompañamos en el tiempo, porque el dolor crónico se maneja, no se
            abandona."
          </p>
        </blockquote>
      </div>
    </section>
  );
}
