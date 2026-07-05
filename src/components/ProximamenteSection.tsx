const DEEP_TEAL = "#1a4a55";
const GOLD = "#c69636";
const CREAM = "#f5f0e8";
const TEAL = "#3d8b96";

const FEATURES = [
  "Nuevos consultorios de especialidades",
  "Área integrada de diagnóstico y tratamiento",
  "Sala de procedimientos ampliada",
];

export default function ProximamenteSection() {
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
          maxWidth: 1000,
          paddingLeft: "clamp(24px, 4vw, 48px)",
          paddingRight: "clamp(24px, 4vw, 48px)",
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "6px 14px",
            backgroundColor: GOLD,
            color: DEEP_TEAL,
            fontFamily: "Inter, sans-serif",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          PRÓXIMAMENTE
        </div>

        <h2
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 600,
            fontSize: "clamp(30px, 4vw, 52px)",
            lineHeight: 1.15,
            color: CREAM,
            marginBottom: 20,
            maxWidth: 720,
          }}
        >
          Ampliación de 100 m² para el ecosistema completo del dolor.
        </h2>

        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(15px, 1.3vw, 17px)",
            lineHeight: 1.75,
            color: "rgba(245,240,232,0.85)",
            maxWidth: 640,
            marginBottom: 40,
          }}
        >
          Estamos ampliando nuestras instalaciones para integrar consulta,
          diagnóstico y procedimientos en un mismo espacio. El proyecto
          contempla nuevos consultorios y áreas clínicas diseñadas
          específicamente para el manejo del dolor.
        </p>

        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
          }}
        >
          {FEATURES.map((f) => (
            <li
              key={f}
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 15,
                color: CREAM,
                padding: "16px 18px",
                border: `1px solid ${TEAL}`,
                borderLeftWidth: 3,
              }}
            >
              {f}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
