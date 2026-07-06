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
              color: GOLD,
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
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(15px, 1.3vw, 17px)",
              lineHeight: 1.7,
              color: "rgba(26,74,85,0.82)",
              maxWidth: "58ch",
            }}
          >
            La mayoría de las clínicas hacen el procedimiento y le dicen
            adiós. En ALGOS su caso no termina cuando sale por la puerta — lo
            seguimos hasta que el dolor deje de controlar su vida.
          </p>
        </div>

        {/* Cards — 3 columns on desktop, 1 on mobile */}
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ gap: "clamp(12px, 2vw, 20px)" }}
        >
          {pilares.map((p) => (
            <div
              key={p.titulo}
              style={{
                padding: "clamp(24px, 3vw, 36px)",
                backgroundColor: "#fff",
                border: "1px solid rgba(26,74,85,0.10)",
                borderRadius: 4,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 8,
                  backgroundColor: "rgba(26,74,85,0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20,
                }}
              >
                <p.icon
                  style={{ width: 20, height: 20, color: DEEP_TEAL }}
                />
              </div>
              <h3
                style={{
                  fontFamily: "'Sora', serif",
                  fontWeight: 600,
                  fontSize: "clamp(16px, 1.5vw, 19px)",
                  lineHeight: 1.3,
                  color: DEEP_TEAL,
                  marginBottom: 10,
                }}
              >
                {p.titulo}
              </h3>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "clamp(13px, 1.1vw, 15px)",
                  lineHeight: 1.7,
                  color: "rgba(26,74,85,0.82)",
                  margin: 0,
                }}
              >
                {p.texto}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
