import { Link } from "react-router-dom";

const SPECIALTIES = [
  "Neurocirugía Intervencionista",
  "Traumatología y Columna",
  "Reumatología",
  "Anestesiología del Dolor",
  "Nutrición Antiinflamatoria",
  "Electrodiagnóstico",
];

export default function EspecialidadesSection() {
  return (
    <section
      style={{
        backgroundColor: "#1a4a55",
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
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#c69636",
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
            lineHeight: 1.1,
            color: "#f5f0e8",
            marginBottom: 16,
          }}
        >
          Tu dolor. Nuestro equipo.
        </h2>

        <p
          style={{
            fontFamily: "Manrope, system-ui, sans-serif",
            fontSize: 17,
            lineHeight: 1.6,
            color: "rgba(245,240,232,0.65)",
            marginBottom: "clamp(48px, 6vw, 72px)",
          }}
        >
          Cada paciente recibe el especialista que su condición necesita.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "clamp(10px, 1.5vw, 16px)",
            marginBottom: "clamp(40px, 5vw, 56px)",
          }}
        >
          {SPECIALTIES.map((name) => (
            <div
              key={name}
              style={{
                backgroundColor: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(245,240,232,0.12)",
                padding: "28px 24px",
                fontFamily: "Manrope, system-ui, sans-serif",
                fontSize: 15,
                fontWeight: 600,
                color: "#f5f0e8",
                lineHeight: 1.4,
              }}
            >
              {name}
            </div>
          ))}
        </div>

        <Link
          to="/equipo"
          style={{
            fontFamily: "Manrope, system-ui, sans-serif",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#c69636",
            textDecoration: "none",
            transition: "opacity 200ms",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Conocer el equipo completo →
        </Link>
      </div>
    </section>
  );
}
