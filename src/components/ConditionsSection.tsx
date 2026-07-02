import { Link } from "react-router-dom";
import { useInViewOnce } from "@/lib/animations";

const DEEP_TEAL = "#1a4a55";
const TEAL = "#3d8b96";
const GOLD = "#c69636";
const CREAM = "#f5f0e8";

const protagonistas = [
  { label: "Ciática / «se me duerme la pierna»", href: "/condiciones/ciatica" },
  { label: "Hernia discal", href: "/condiciones/hernia-discal" },
  { label: "Dolor lumbar / dolor de cintura", href: "/condiciones/dolor-lumbar" },
  { label: "Dolor cervical", href: "/condiciones/dolor-cervical" },
  { label: "Neuropatía diabética", href: "/condiciones/neuropatia-diabetica" },
  { label: "Dolor persistente tras cirugía de espalda", href: "/condiciones/dolor-tras-cirugia" },
];

const condiciones = [
  "Dolor facetario",
  "Dolor radicular",
  "Dolor sacroilíaco",
  "Estenosis de canal lumbar",
  "Dolor miofascial / puntos gatillo",
  "Neuralgia postherpética (culebrilla)",
  "Túnel carpiano",
  "Dolor articular — rodilla, cadera, hombro",
  "Cefaleas tensionales y migraña",
  "Neuralgia occipital",
  "Síndrome piriforme",
  "Coccigodinia / dolor de rabadilla",
  "Síndrome doloroso regional complejo",
  "Dolor oncológico",
];

export default function ConditionsSection() {
  const { ref: listRef, inView: listIn } = useInViewOnce<HTMLDivElement>(0.08);
  const { ref: condRef, inView: condIn } = useInViewOnce<HTMLDivElement>(0.08);

  return (
    <section
      style={{
        backgroundColor: DEEP_TEAL,
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
            CONDICIONES
          </p>
          <h2
            style={{
              fontFamily: "'Sora', serif",
              fontWeight: 600,
              fontSize: "clamp(32px, 4.2vw, 56px)",
              lineHeight: 1.15,
              color: CREAM,
            }}
          >
            ¿Se reconoce en alguno de estos dolores?
          </h2>
        </div>

        {/* Protagonistas — with links */}
        <div style={{ marginBottom: "clamp(48px, 6vw, 64px)" }}>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "rgba(245,240,232,0.65)",
              marginBottom: 20,
            }}
          >
            Más frecuentes
          </p>
          <div ref={listRef} className="flex flex-col" style={{ gap: 2 }}>
            {protagonistas.map((c, idx) => (
              <Link
                key={c.href}
                to={c.href}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "clamp(12px, 2vw, 24px)",
                  borderBottom: "1px solid rgba(245,240,232,0.08)",
                  padding: "clamp(14px, 1.8vw, 20px) 0",
                  opacity: listIn ? 1 : 0,
                  transform: listIn ? "none" : "translateX(-16px)",
                  transition: `opacity 0.55s ease ${idx * 90}ms, transform 0.55s cubic-bezier(0.23,1,0.32,1) ${idx * 90}ms`,
                  textDecoration: "none",
                }}
                className="group"
              >
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    color: GOLD,
                    letterSpacing: "0.06em",
                    flexShrink: 0,
                    paddingTop: 4,
                  }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span
                  style={{
                    fontFamily: "'Sora', serif",
                    fontWeight: 500,
                    fontSize: "clamp(18px, 2.2vw, 26px)",
                    lineHeight: 1.25,
                    color: CREAM,
                    transition: "color 200ms ease",
                  }}
                  className="group-hover:text-[#c69636]"
                >
                  {c.label}
                </span>
                <span
                  style={{
                    marginLeft: "auto",
                    color: TEAL,
                    fontSize: 18,
                    opacity: 0,
                    transition: "opacity 200ms ease",
                    flexShrink: 0,
                  }}
                  className="group-hover:opacity-100"
                >
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Condiciones adicionales */}
        <div style={{ marginBottom: "clamp(36px, 4vw, 52px)" }}>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "rgba(245,240,232,0.65)",
              marginBottom: 20,
            }}
          >
            También tratamos
          </p>
          <div
            ref={condRef}
            className="grid sm:grid-cols-2"
            style={{ gap: "clamp(8px, 1vw, 12px)" }}
          >
            {condiciones.map((c, idx) => (
              <div
                key={c}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "clamp(12px, 1.4vw, 16px) clamp(14px, 1.5vw, 18px)",
                  backgroundColor: "rgba(245,240,232,0.04)",
                  border: "1px solid rgba(245,240,232,0.09)",
                  opacity: condIn ? 1 : 0,
                  transform: condIn ? "none" : "translateY(12px)",
                  transition: `opacity 0.45s ease ${idx * 45}ms, transform 0.45s cubic-bezier(0.23,1,0.32,1) ${idx * 45}ms`,
                }}
              >
                <span
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    backgroundColor: TEAL,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "clamp(13px, 1.1vw, 15px)",
                    color: "rgba(245,240,232,0.92)",
                    lineHeight: 1.4,
                  }}
                >
                  {c}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Link to full list */}
        <div style={{ borderTop: "1px solid rgba(245,240,232,0.10)", paddingTop: "clamp(24px, 3vw, 36px)" }}>
          <Link
            to="/condiciones"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 13,
              fontWeight: 600,
              color: TEAL,
              textDecoration: "none",
              letterSpacing: "0.04em",
              transition: "color 200ms",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
            onMouseLeave={(e) => (e.currentTarget.style.color = TEAL)}
          >
            Ver listado completo de condiciones →
          </Link>
        </div>
      </div>
    </section>
  );
}
