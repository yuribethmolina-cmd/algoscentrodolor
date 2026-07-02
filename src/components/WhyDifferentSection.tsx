import { Route, Link2, Shield, Target } from "lucide-react";

const DEEP_TEAL = "#1a4a55";
const TEAL = "#3d8b96";
const GOLD = "#c69636";
const CREAM = "#f5f0e8";

const diferenciadores = [
  {
    icon: Route,
    titulo: "El arsenal completo en una sola ruta",
    descripcion:
      "Del diagnóstico al tratamiento, sin peregrinar. Usted no tiene que coordinar entre diferentes especialistas ni repetir estudios.",
  },
  {
    icon: Link2,
    titulo: "La integración con UDUZ",
    descripcion:
      "La misma imagen que encuentra el problema guía el tratamiento. No hay interpretaciones intermedias que se pierdan.",
  },
  {
    icon: Shield,
    titulo: "Mínimamente invasivo antes de operar",
    descripcion:
      "Agotamos las opciones intervencionistas antes de considerar la cirugía. Solo se opera cuando los criterios clínicos lo justifican.",
  },
  {
    icon: Target,
    titulo: "El criterio de tratar solo lo que hace falta",
    descripcion:
      "Sin procedimientos innecesarios. El especialista determina qué tratar, en qué orden y con qué técnica, basado en su caso.",
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
            DIFERENCIADORES
          </p>
          <h2
            style={{
              fontFamily: "'Sora', serif",
              fontWeight: 600,
              fontSize: "clamp(32px, 4.2vw, 56px)",
              lineHeight: 1.15,
              color: DEEP_TEAL,
            }}
          >
            Por qué ALGOS
          </h2>
        </div>

        {/* Cards — 2 columns */}
        <div className="grid sm:grid-cols-2" style={{ gap: "clamp(12px, 2vw, 20px)" }}>
          {diferenciadores.map((d) => (
            <div
              key={d.titulo}
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
                <d.icon style={{ width: 20, height: 20, color: TEAL }} />
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
                {d.titulo}
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
                {d.descripcion}
              </p>
            </div>
          ))}
        </div>

        {/* Closing paragraph */}
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(15px, 1.3vw, 17px)",
            lineHeight: 1.75,
            color: "rgba(26,74,85,0.82)",
            fontStyle: "italic",
            maxWidth: "64ch",
            marginTop: "clamp(40px, 5vw, 56px)",
            paddingLeft: 20,
            borderLeft: "2px solid rgba(198,150,54,0.45)",
          }}
        >
          En ALGOS el tratamiento no termina cuando termina el procedimiento: seguimos su
          evolución y le acompañamos en el tiempo, porque el dolor crónico se maneja, no se
          abandona.
        </p>
      </div>
    </section>
  );
}
