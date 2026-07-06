import { useInViewOnce } from "@/lib/animations";
import { Calendar, Stethoscope } from "lucide-react";

const CREAM = "#f5f0e8";
const DEEP_TEAL = "#1a4a55";
const BRAND_TEAL = "#3d8b96";
const GOLD = "#c69636";

interface DoctorCard {
  nombre: string;
  especialidad: string;
  consulta: string;
  nota?: string;
  esDireccion?: boolean;
}

const doctores: DoctorCard[] = [
  {
    nombre: "Dr. Antulio Parra",
    especialidad: "Traumatología y Columna",
    consulta: "Martes y jueves · 8:00 AM – 11:00 AM",
  },
  {
    nombre: "Dr. Atilio Rodríguez",
    especialidad: "Neurocirugía Intervencionista · Director Médico",
    consulta: "Lunes, martes, jueves y viernes · 1:00 PM – 4:00 PM",
  },
  {
    nombre: "Dr. Daniel Rodríguez",
    especialidad: "Nutrición Clínica Antiinflamatoria",
    consulta: "Lunes, martes, jueves y viernes · 1:00 PM – 4:00 PM",
  },
  {
    nombre: "Dr. Miguel Guevara",
    especialidad: "Radiología Intervencionista",
    consulta: "Lunes · 8:00 AM – 10:00 AM",
  },
  {
    nombre: "Dr. Tomás Iragorry",
    especialidad: "Anestesiología del Dolor",
    consulta: "Lunes, martes y miércoles · 8:00 AM – 12:00 PM",
  },
  {
    nombre: "Dra. Carolina Rodríguez",
    especialidad: "Electrodiagnóstico (EEG · EMG)",
    consulta: "Miércoles tarde",
    nota: "Los estudios EEG se realizan en UDUZ",
  },
  {
    nombre: "Dra. Doris Meneses",
    especialidad: "Neurocirugía · Columna vertebral",
    consulta: "Viernes · 8:00 AM – 12:00 PM",
  },
  {
    nombre: "Dra. Gilda Gómez",
    especialidad: "Reumatología",
    consulta: "Miércoles · 9:00 AM – 12:00 PM",
  },
  {
    nombre: "Dra. Leslie Ramírez",
    especialidad: "Fisiatría",
    consulta: "Jueves · 2:00 PM",
  },
];

export default function TeamSection() {
  const { ref: headerRef, inView: headerIn } = useInViewOnce<HTMLDivElement>(0.12);
  const { ref: gridRef, inView: gridIn } = useInViewOnce<HTMLDivElement>(0.08);
  const { ref: quoteRef, inView: quoteIn } = useInViewOnce<HTMLDivElement>(0.15);

  return (
    <section
      id="equipo"
      style={{
        backgroundColor: CREAM,
        paddingTop: "clamp(80px, 10vw, 128px)",
        paddingBottom: "clamp(80px, 10vw, 128px)",
      }}
    >
      <div
        className="mx-auto"
        style={{
          maxWidth: 1080,
          paddingLeft: "clamp(24px, 4vw, 48px)",
          paddingRight: "clamp(24px, 4vw, 48px)",
        }}
      >
        {/* Header */}
        <div
          ref={headerRef}
          className={`scroll-reveal ${headerIn ? "revealed" : ""}`}
          style={{ marginBottom: "clamp(40px, 5vw, 64px)" }}
        >
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
            ESPECIALIDADES
          </p>
          <h2
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 600,
              fontSize: "clamp(32px, 4.2vw, 56px)",
              lineHeight: 1.15,
              color: DEEP_TEAL,
              marginBottom: 20,
            }}
          >
            Un equipo multidisciplinario para cada tipo de dolor.
          </h2>
          <p
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: "clamp(17px, 1.6vw, 20px)",
              lineHeight: 1.7,
              color: DEEP_TEAL,
              opacity: 0.75,
              maxWidth: "62ch",
            }}
          >
            En ALGOS su caso no lo ve un solo médico. Cada paciente recorre una
            ruta donde distintas especialidades colaboran — el mismo equipo,
            informado de su caso desde el inicio.
          </p>
        </div>

        {/* Descripción general del equipo */}
        <div
          className={`scroll-reveal scroll-reveal-delay-1 ${headerIn ? "revealed" : ""}`}
          style={{
            marginBottom: "clamp(48px, 6vw, 72px)",
            maxWidth: "72ch",
          }}
        >
          <p
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: "clamp(16px, 1.4vw, 18px)",
              lineHeight: 1.7,
              color: DEEP_TEAL,
              opacity: 0.85,
            }}
          >
            Nuestro equipo evalúa y diagnostica el origen del dolor, ejecuta el
            tratamiento guiado por imagen y acompaña la recuperación — todo con
            el mismo criterio clínico informado de su caso.
          </p>
        </div>

        {/* Grid de doctores */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          style={{ marginBottom: "clamp(56px, 7vw, 88px)" }}
        >
          {doctores.map((doc, i) => (
            <div
              key={doc.nombre}
              className={`scroll-reveal ${gridIn ? "revealed" : ""}`}
              style={{
                transitionDelay: `${i * 60}ms`,
                backgroundColor: "#ffffff",
                border: "1px solid rgba(26, 74, 85, 0.1)",
                borderRadius: 0,
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <h3
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: 16,
                  fontWeight: 600,
                  color: DEEP_TEAL,
                  lineHeight: 1.3,
                  margin: 0,
                }}
              >
                {doc.nombre}
              </h3>
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: 13,
                  fontWeight: 500,
                  color: BRAND_TEAL,
                  lineHeight: 1.4,
                  margin: 0,
                }}
              >
                {doc.especialidad}
              </p>
              <div className="flex items-center gap-2" style={{ marginTop: 4 }}>
                <Clock
                  size={12}
                  color={DEEP_TEAL}
                  style={{ opacity: 0.5, flexShrink: 0 }}
                />
                <p
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: 12,
                    color: DEEP_TEAL,
                    opacity: 0.6,
                    lineHeight: 1.4,
                    margin: 0,
                  }}
                >
                  {doc.consulta}
                </p>
              </div>
              {doc.nota && (
                <p
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: 11,
                    color: DEEP_TEAL,
                    opacity: 0.5,
                    lineHeight: 1.4,
                    margin: 0,
                    marginTop: 2,
                  }}
                >
                  {doc.nota}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Quote + CTA */}
        <div
          ref={quoteRef}
          className={`scroll-reveal ${quoteIn ? "revealed" : ""}`}
        >
          <p
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 14,
              lineHeight: 1.65,
              color: DEEP_TEAL,
              opacity: 0.85,
              maxWidth: "60ch",
              paddingLeft: 20,
              borderLeft: "2px solid rgba(198, 150, 54, 0.4)",
              marginBottom: 28,
            }}
          >
            La neurocirugía en ALGOS no es la puerta al quirófano — es el
            criterio que sabe cuándo la cirugía todavía no hace falta.
          </p>

          <a
            href="https://wa.me/584146807886"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "'Manrope', sans-serif",
              fontSize: 14,
              fontWeight: 500,
              color: BRAND_TEAL,
              textDecoration: "none",
              transition: "opacity 200ms ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.opacity = "0.7";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
            }}
          >
            Agendar consulta con el especialista →
          </a>
        </div>
      </div>
    </section>
  );
}
