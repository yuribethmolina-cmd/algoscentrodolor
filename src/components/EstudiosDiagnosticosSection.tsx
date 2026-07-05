import { Link } from "react-router-dom";
import { DIAGNOSTICS, DIAGNOSTIC_GROUPS } from "@/data/diagnostics";

const DEEP_TEAL = "#1a4a55";
const TEAL = "#3d8b96";
const GOLD = "#c69636";
const CREAM = "#f5f0e8";

const GROUP_ORDER: Array<keyof typeof DIAGNOSTIC_GROUPS> = [
  "imagen",
  "cardiologia",
  "neurofisiologia",
  "laboratorio",
];

export default function EstudiosDiagnosticosSection() {
  return (
    <section
      style={{
        backgroundColor: CREAM,
        paddingTop: "clamp(80px, 10vw, 128px)",
        paddingBottom: "clamp(80px, 10vw, 128px)",
      }}
    >
      <div
        className="mx-auto"
        style={{
          maxWidth: 1100,
          paddingLeft: "clamp(24px, 4vw, 48px)",
          paddingRight: "clamp(24px, 4vw, 48px)",
        }}
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
          ESTUDIOS DIAGNÓSTICOS
        </p>

        <h2
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 600,
            fontSize: "clamp(28px, 3.6vw, 48px)",
            lineHeight: 1.15,
            color: DEEP_TEAL,
            marginBottom: 16,
            maxWidth: 720,
          }}
        >
          Diagnóstico y tratamiento bajo un mismo techo.
        </h2>

        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(15px, 1.3vw, 17px)",
            lineHeight: 1.7,
            color: "rgba(26,74,85,0.75)",
            maxWidth: 640,
            marginBottom: 48,
          }}
        >
          Imagen, cardiología, neurofisiología y laboratorio. Todo lo que
          necesita para llegar al diagnóstico y comenzar el tratamiento.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 20,
            marginBottom: 40,
          }}
        >
          {GROUP_ORDER.map((groupKey) => {
            const group = DIAGNOSTIC_GROUPS[groupKey];
            const items = DIAGNOSTICS.filter((d) => d.grupo === groupKey);
            return (
              <div
                key={groupKey}
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid rgba(26,74,85,0.1)",
                  padding: "28px 24px",
                }}
              >
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.24em",
                    textTransform: "uppercase",
                    color: TEAL,
                    marginBottom: 14,
                  }}
                >
                  {group.label}
                </p>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  {items.map((it) => (
                    <li
                      key={it.slug}
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 15,
                        fontWeight: 500,
                        color: DEEP_TEAL,
                        lineHeight: 1.4,
                      }}
                    >
                      {it.name}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <Link
            to="/estudios-diagnosticos"
            style={{
              backgroundColor: DEEP_TEAL,
              color: CREAM,
              fontFamily: "Inter, sans-serif",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              textDecoration: "none",
              padding: "14px 24px",
            }}
          >
            Ver todos los estudios →
          </Link>
        </div>
      </div>
    </section>
  );
}
