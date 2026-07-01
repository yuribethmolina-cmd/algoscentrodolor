const CREAM = "#f5f0e8";
const DEEP_TEAL = "#1a4a55";
const STEEL_TEAL = "#2a6270";
const GOLD = "#c69636";

const grupos = [
  {
    index: "01",
    funcion: "Evalúan y diagnostican el origen del dolor",
    especialidades: ["Neurocirugía", "Traumatología", "Reumatología", "Fisiatría"],
    nota: null,
  },
  {
    index: "02",
    funcion: "Ejecutan el tratamiento guiado por imagen",
    especialidades: ["Algología · Anestesiología del dolor", "Neurocirugía", "Traumatología"],
    nota: "Tres especialidades sobre el mismo equipo — redundancia de criterio clínico en cada procedimiento.",
  },
  {
    index: "03",
    funcion: "Acompañan la recuperación",
    especialidades: ["Fisiatría", "Nutrición clínica"],
    nota: null,
  },
];

export default function TeamSection() {
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
        <div style={{ marginBottom: "clamp(56px, 7vw, 88px)" }}>
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
            EQUIPO
          </p>
          <h2
            style={{
              fontFamily: "'Sora', serif",
              fontWeight: 600,
              fontSize: "clamp(26px, 3vw, 40px)",
              lineHeight: 1.25,
              color: DEEP_TEAL,
              maxWidth: "42ch",
              marginBottom: 20,
            }}
          >
            En ALGOS la autoridad es el equipo.
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(16px, 1.4vw, 18px)",
              lineHeight: 1.7,
              color: STEEL_TEAL,
              maxWidth: "58ch",
            }}
          >
            Cada caso recorre una ruta donde distintas especialidades colaboran — para diagnosticar
            con precisión, intervenir con seguridad y acompañar en el tiempo.
          </p>
        </div>

        {/* Grupos */}
        <div
          className="flex flex-col"
          style={{ gap: 2 }}
        >
          {grupos.map((g) => (
            <div
              key={g.index}
              style={{
                borderTop: `1px solid rgba(26, 74, 85, 0.14)`,
                paddingTop: "clamp(28px, 3.5vw, 40px)",
                paddingBottom: "clamp(28px, 3.5vw, 40px)",
              }}
            >
              <div className="grid md:grid-cols-[80px_1fr_1fr] gap-8 md:gap-10 items-start">
                {/* Index */}
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 13,
                    color: "rgba(26, 74, 85, 0.3)",
                    letterSpacing: "0.06em",
                    paddingTop: 4,
                  }}
                >
                  {g.index}
                </span>

                {/* Función */}
                <h3
                  style={{
                    fontFamily: "'Sora', serif",
                    fontWeight: 600,
                    fontSize: "clamp(18px, 1.8vw, 23px)",
                    lineHeight: 1.3,
                    color: DEEP_TEAL,
                    margin: 0,
                  }}
                >
                  {g.funcion}
                </h3>

                {/* Right column: especialidades + placeholder */}
                <div>
                  {/* Specialty pills */}
                  <div className="flex flex-wrap" style={{ gap: 8, marginBottom: 20 }}>
                    {g.especialidades.map((esp) => (
                      <span
                        key={esp}
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: 12,
                          fontWeight: 500,
                          color: STEEL_TEAL,
                          backgroundColor: "rgba(26, 74, 85, 0.07)",
                          border: "1px solid rgba(26, 74, 85, 0.14)",
                          borderRadius: 3,
                          padding: "4px 10px",
                        }}
                      >
                        {esp}
                      </span>
                    ))}
                  </div>

                  {/* Nota clínica */}
                  {g.nota && (
                    <p
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 13,
                        lineHeight: 1.6,
                        color: "rgba(26, 74, 85, 0.55)",
                        marginBottom: 16,
                        fontStyle: "italic",
                      }}
                    >
                      {g.nota}
                    </p>
                  )}

                  {/* Placeholder nombres */}
                  <p
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 11,
                      letterSpacing: "0.06em",
                      color: "rgba(26, 74, 85, 0.28)",
                      margin: 0,
                    }}
                  >
                    Nombres y credenciales — próximamente
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Borde final */}
          <div style={{ borderTop: "1px solid rgba(26, 74, 85, 0.14)" }} />
        </div>

        {/* Nota al pie */}
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 14,
            lineHeight: 1.65,
            color: "rgba(26, 74, 85, 0.55)",
            maxWidth: "60ch",
            marginTop: "clamp(40px, 5vw, 64px)",
            paddingLeft: 20,
            borderLeft: `2px solid rgba(198, 150, 54, 0.4)`,
          }}
        >
          La neurocirugía en ALGOS no es la puerta al quirófano — es el criterio que sabe cuándo
          la cirugía todavía no hace falta.
        </p>
      </div>
    </section>
  );
}
