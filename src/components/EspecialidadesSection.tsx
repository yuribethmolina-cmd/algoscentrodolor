import { Link } from "react-router-dom";

const SPECIALTIES = [
  { name: ["Neurocirugía", "Intervencionista"], angle: 0 },
  { name: ["Traumatología", "y Columna"], angle: 60 },
  { name: ["Reumatología"], angle: 120 },
  { name: ["Anestesiología", "del Dolor"], angle: 180 },
  { name: ["Nutrición", "Antiinflamatoria"], angle: 240 },
  { name: ["Electrodiagnóstico"], angle: 300 },
];

const R = 36;    // orbit radius (% of container)
const SPEC = 17; // specialty circle diameter (%)
const CTR = 22;  // center circle diameter (%)

function orbitPos(angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: 50 + R * Math.sin(rad),
    y: 50 - R * Math.cos(rad),
  };
}

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
        {/* Eyebrow */}
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#c69636",
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          ESPECIALIDADES
        </p>

        {/* Title — mobile only (desktop lives inside center circle) */}
        <h2
          className="md:hidden"
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 600,
            fontSize: "clamp(32px, 6vw, 44px)",
            lineHeight: 1.1,
            color: "#f5f0e8",
            textAlign: "center",
            marginBottom: "clamp(32px, 4vw, 48px)",
          }}
        >
          Tu dolor.<br />Nuestro equipo.
        </h2>

        {/* Mobile: pill grid */}
        <div
          className="md:hidden"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(10px, 3vw, 14px)",
            marginBottom: 40,
          }}
        >
          {SPECIALTIES.map((s) => (
            <div
              key={s.angle}
              style={{
                border: "1.5px solid rgba(198,150,54,0.55)",
                backgroundColor: "#3d8b96",
                padding: "14px 12px",
                textAlign: "center",
                fontFamily: "Manrope, system-ui, sans-serif",
                fontSize: 13,
                fontWeight: 600,
                color: "#f5f0e8",
                lineHeight: 1.4,
                borderRadius: 8,
              }}
            >
              {s.name.join(" ")}
            </div>
          ))}
        </div>

        {/* Desktop: hub-and-spoke diagram */}
        <div
          className="hidden md:block relative mx-auto"
          style={{ maxWidth: 520, aspectRatio: "1" }}
        >
          {/* Connector lines */}
          <svg
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
            }}
            viewBox="0 0 100 100"
          >
            {SPECIALTIES.map((s) => {
              const p = orbitPos(s.angle);
              return (
                <line
                  key={s.angle}
                  x1="50"
                  y1="50"
                  x2={p.x}
                  y2={p.y}
                  stroke="rgba(198,150,54,0.3)"
                  strokeWidth="0.4"
                />
              );
            })}
          </svg>

          {/* Center gold circle */}
          <div
            style={{
              position: "absolute",
              width: `${CTR}%`,
              height: `${CTR}%`,
              left: `${50 - CTR / 2}%`,
              top: `${50 - CTR / 2}%`,
              borderRadius: "50%",
              backgroundColor: "#c69636",
              boxShadow: "0 0 0 3px rgba(198,150,54,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              fontFamily: "'Sora', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(11px, 1.9vw, 15px)",
              color: "#f5f0e8",
              lineHeight: 1.25,
              padding: "8%",
            }}
          >
            Tu dolor.<br />Nuestro<br />equipo.
          </div>

          {/* Specialty circles */}
          {SPECIALTIES.map((s) => {
            const p = orbitPos(s.angle);
            return (
              <div
                key={s.angle}
                style={{
                  position: "absolute",
                  width: `${SPEC}%`,
                  height: `${SPEC}%`,
                  left: `${p.x - SPEC / 2}%`,
                  top: `${p.y - SPEC / 2}%`,
                  borderRadius: "50%",
                  backgroundColor: "#3d8b96",
                  border: "1.5px solid rgba(198,150,54,0.6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  fontFamily: "Manrope, system-ui, sans-serif",
                  fontWeight: 600,
                  fontSize: "clamp(8px, 1.3vw, 11px)",
                  color: "#f5f0e8",
                  lineHeight: 1.3,
                  padding: "8%",
                }}
              >
                <span>
                  {s.name.map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < s.name.length - 1 && <br />}
                    </span>
                  ))}
                </span>
              </div>
            );
          })}
        </div>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "Manrope, system-ui, sans-serif",
            fontSize: 14,
            color: "rgba(245,240,232,0.5)",
            textAlign: "center",
            marginTop: 36,
          }}
        >
          Cada paciente recibe el especialista que su condición necesita.
        </p>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: 28 }}>
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
      </div>
    </section>
  );
}
