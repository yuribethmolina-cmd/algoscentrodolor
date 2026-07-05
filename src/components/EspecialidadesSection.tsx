import { Link } from "react-router-dom";
import { SPECIALTIES } from "@/data/specialties";

const DEEP_TEAL = "#1a4a55";
const TEAL = "#3d8b96";
const GOLD = "#c69636";
const CREAM = "#f5f0e8";

export default function EspecialidadesSection() {
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
          NUESTRAS ESPECIALIDADES
        </p>

        <h2
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 600,
            fontSize: "clamp(28px, 3.6vw, 48px)",
            lineHeight: 1.15,
            color: CREAM,
            marginBottom: 16,
            maxWidth: 720,
          }}
        >
          Un equipo multidisciplinario para cada tipo de dolor.
        </h2>

        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(15px, 1.3vw, 17px)",
            lineHeight: 1.7,
            color: "rgba(245,240,232,0.75)",
            maxWidth: 640,
            marginBottom: 48,
          }}
        >
          Cada caso se evalúa por la especialidad correcta, se interviene con
          seguridad y se acompaña en el tiempo.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 14,
            marginBottom: 40,
          }}
        >
          {SPECIALTIES.map((sp) => (
            <div
              key={sp.slug}
              style={{
                backgroundColor: TEAL,
                border: "1.5px solid rgba(198,150,54,0.4)",
                padding: "20px 18px",
              }}
            >
              <h3
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: 17,
                  fontWeight: 600,
                  color: CREAM,
                  marginBottom: 6,
                  lineHeight: 1.25,
                }}
              >
                {sp.name}
              </h3>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 13,
                  color: "rgba(245,240,232,0.75)",
                  lineHeight: 1.5,
                }}
              >
                {sp.tagline}
              </p>
            </div>
          ))}
        </div>

        <Link
          to="/especialidades"
          style={{
            display: "inline-block",
            backgroundColor: GOLD,
            color: DEEP_TEAL,
            fontFamily: "Inter, sans-serif",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            textDecoration: "none",
            padding: "14px 24px",
          }}
        >
          Ver todas las especialidades →
        </Link>
      </div>
    </section>
  );
}
