import { Stethoscope, Activity, Apple, Target, Calendar, Globe } from "lucide-react";
import { useInViewOnce } from "@/lib/animations";
import { ALGOS } from "@/config/algos.config";

const DEEP_TEAL = ALGOS.palette.deepTeal;
const BRAND_TEAL = ALGOS.palette.brandTeal;
const GOLD = ALGOS.palette.gold;
const CREAM = ALGOS.palette.cream;

const steps = [
  {
    index: "01",
    title: "Consulta Inicial",
    description: "Escuchamos su historia, revisamos estudios previos y definimos si es candidato a un tratamiento intervencionista.",
    icon: Stethoscope,
  },
  {
    index: "02",
    title: "Electrodiagnóstico",
    description: "EMG y EEG para identificar si el problema es del nervio, músculo o actividad cerebral, con precisión.",
    icon: Activity,
  },
  {
    index: "03",
    title: "Evaluación Nutricional",
    description: "Analizamos factores metabólicos e inflamatorios que pueden estar sosteniendo el dolor crónico.",
    icon: Apple,
  },
  {
    index: "04",
    title: "Procedimiento guiado por imagen",
    description: "Infiltraciones, bloqueos, radiofrecuencia u ozono dirigidos al punto exacto del problema.",
    icon: Target,
  },
  {
    index: "05",
    title: "Seguimiento",
    description: "Revisamos su respuesta, ajustamos el plan y acompañamos la recuperación hasta el resultado.",
    icon: Calendar,
  },
  {
    index: "06",
    title: "Interconsulta Internacional",
    description: "Cuando el caso lo requiere, conectamos con especialistas de la alianza WZaS München.",
    icon: Globe,
  },
];

export default function PatientJourneySection() {
  const { ref: headerRef, inView: headerIn } = useInViewOnce<HTMLDivElement>(0.15);
  const { ref: gridRef, inView: gridIn } = useInViewOnce<HTMLDivElement>(0.08);

  return (
    <section
      data-section="patient-journey"
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
          maxWidth: 1120,
          paddingLeft: "clamp(24px, 4vw, 48px)",
          paddingRight: "clamp(24px, 4vw, 48px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div
          ref={headerRef}
          style={{
            marginBottom: "clamp(48px, 6vw, 72px)",
            opacity: headerIn ? 1 : 0,
            transform: headerIn ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(0.23,1,0.32,1)",
          }}
        >
          <p
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: BRAND_TEAL,
              marginBottom: 20,
            }}
          >
            CÓMO TRABAJAMOS
          </p>
          <h2
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 600,
              fontSize: "clamp(32px, 4.2vw, 56px)",
              lineHeight: 1.15,
              color: DEEP_TEAL,
              letterSpacing: "-0.03em",
              maxWidth: "18ch",
            }}
          >
            Su ruta hacia el alivio empieza aquí.
          </h2>
          <p
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: "clamp(15px, 1.5vw, 18px)",
              lineHeight: 1.6,
              color: DEEP_TEAL,
              opacity: 0.75,
              marginTop: 20,
              maxWidth: 640,
            }}
          >
            Un proceso claro, en 6 pasos, donde cada etapa responde a una pregunta:
            ¿de dónde viene el dolor y qué podemos hacer hoy?
          </p>
        </div>

        {/* Steps grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{ gap: "clamp(16px, 2vw, 24px)" }}
        >
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.index}
                className="group relative"
                style={{
                  background: "#ffffff",
                  borderRadius: 20,
                  padding: "clamp(28px, 3vw, 36px)",
                  boxShadow: "0 4px 24px -8px rgba(26,74,85,0.12)",
                  opacity: gridIn ? 1 : 0,
                  transform: gridIn ? "translateY(0)" : "translateY(20px)",
                  transition: `
                    opacity 0.5s ease ${i * 80}ms,
                    transform 0.5s cubic-bezier(0.23,1,0.32,1) ${i * 80}ms,
                    box-shadow 300ms ease
                  `,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 12px 40px -12px rgba(26,74,85,0.22)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 4px 24px -8px rgba(26,74,85,0.12)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div className="flex items-start justify-between" style={{ marginBottom: 24 }}>
                  <span
                    style={{
                      fontFamily: "'Sora', sans-serif",
                      fontSize: 14,
                      fontWeight: 700,
                      color: GOLD,
                      letterSpacing: "0.04em",
                    }}
                  >
                    /{step.index}
                  </span>
                  <Icon
                    size={28}
                    strokeWidth={1.5}
                    style={{ color: BRAND_TEAL, opacity: 0.85 }}
                  />
                </div>
                <h3
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontSize: "clamp(18px, 1.5vw, 21px)",
                    fontWeight: 600,
                    color: DEEP_TEAL,
                    lineHeight: 1.25,
                    marginBottom: 12,
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: "clamp(14px, 1.1vw, 15px)",
                    lineHeight: 1.65,
                    color: DEEP_TEAL,
                    opacity: 0.72,
                    margin: 0,
                  }}
                >
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Ambient glow */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "10%",
          right: "-8%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${GOLD}14 0%, transparent 70%)`,
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />
    </section>
  );
}
