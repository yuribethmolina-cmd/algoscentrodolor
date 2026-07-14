import { useInViewOnce } from "@/lib/animations";
import { Calendar } from "lucide-react";
import { ALGOS } from "@/config/algos.config";
import { DOCTORS } from "@/data/doctors";

const CREAM = ALGOS.palette.cream;
const DEEP_TEAL = ALGOS.palette.deepTeal;
const BRAND_TEAL = "#3d8b96";
const GOLD = "#c69636";

const doctores = DOCTORS.map((d) => ({
  nombre: d.name,
  especialidad: d.specialty,
  consulta: d.schedule,
  nota: d.note,
  esDireccion: d.isDirector,
}));


export default function TeamSection() {
  const { ref: headerRef, inView: headerIn } = useInViewOnce<HTMLDivElement>(0.12);
  const { ref: gridRef, inView: gridIn } = useInViewOnce<HTMLDivElement>(0.08);
  const { ref: quoteRef, inView: quoteIn } = useInViewOnce<HTMLDivElement>(0.15);

  return (
    <section
      id="equipo"
      data-section="team"
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
              color: DEEP_TEAL,
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-stretch"
          style={{ marginBottom: "clamp(56px, 7vw, 88px)", gap: "clamp(14px, 1.5vw, 18px)" }}
        >
          {doctores.map((doc, i) => (
            <article
              key={doc.nombre}
              className={`scroll-reveal group ${gridIn ? "revealed" : ""}`}
              style={{
                transitionDelay: `${i * 60}ms`,
                position: "relative",
                background: "linear-gradient(160deg, #ffffff 0%, #fbf8f2 100%)",
                border: "1px solid rgba(26,74,85,0.10)",
                borderRadius: 0,
                padding: "26px 22px 22px",
                display: "flex",
                flexDirection: "column",
                gap: 10,
                boxShadow:
                  "0 1px 0 rgba(255,255,255,0.9) inset, 0 14px 32px -22px rgba(26,74,85,0.22), 0 2px 4px rgba(26,74,85,0.04)",
                transition:
                  "transform 350ms cubic-bezier(0.23,1,0.32,1), box-shadow 300ms ease, border-color 250ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow =
                  "0 1px 0 rgba(255,255,255,0.95) inset, 0 24px 46px -24px rgba(26,74,85,0.36), 0 4px 8px rgba(26,74,85,0.06)";
                e.currentTarget.style.borderColor = "rgba(61,139,150,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 1px 0 rgba(255,255,255,0.9) inset, 0 14px 32px -22px rgba(26,74,85,0.22), 0 2px 4px rgba(26,74,85,0.04)";
                e.currentTarget.style.borderColor = "rgba(26,74,85,0.10)";
              }}
            >
              {/* Top accent bar */}
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: doc.esDireccion
                    ? "linear-gradient(90deg, #c69636 0%, #e8b95c 100%)"
                    : "linear-gradient(90deg, #3d8b96 0%, #5eb0bd 100%)",
                }}
              />

              {/* Index + meta chips */}
              <div className="flex items-center justify-between" style={{ marginBottom: 2 }}>
                <span
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.28em",
                    color: GOLD,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: 16,
                  fontWeight: 600,
                  color: DEEP_TEAL,
                  lineHeight: 1.3,
                  margin: 0,
                  letterSpacing: "-0.01em",
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

              {/* Schedule bar */}
              <div
                className="flex items-center gap-2 mt-auto"
                style={{
                  padding: "10px 12px",
                  background: "rgba(26,74,85,0.05)",
                  border: "1px solid rgba(26,74,85,0.08)",
                  marginTop: "auto",
                }}
              >
                <Calendar
                  size={13}
                  color={GOLD}
                  strokeWidth={2}
                  style={{ flexShrink: 0 }}
                />
                <p
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: 12,
                    color: DEEP_TEAL,
                    opacity: 0.8,
                    lineHeight: 1.35,
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
                    opacity: 0.55,
                    fontStyle: "italic",
                    lineHeight: 1.4,
                    margin: 0,
                  }}
                >
                  {doc.nota}
                </p>
              )}
            </article>
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
            href={ALGOS.contact.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center"
            style={{
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
