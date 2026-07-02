const CREAM = "#f5f0e8";
const DEEP_TEAL = "#1a4a55";
const STEEL_TEAL = "#2a6270";
const GOLD = "#c69636";

export type TeamMember = {
  nombre: string;
  credenciales: string;
  foto?: string;
};

type Grupo = {
  index: string;
  funcion: string;
  especialidades: { nombre: string; descripcion: string }[];
  nota: string | null;
  miembros?: TeamMember[];
};

const grupos: Grupo[] = [
  {
    index: "01",
    funcion: "Evalúan y diagnostican el origen del dolor",
    especialidades: [
      { nombre: "Neurocirugía", descripcion: "columna y nervios" },
      { nombre: "Traumatología", descripcion: "musculoesquelético" },
      { nombre: "Reumatología", descripcion: "articular e inflamatorio" },
      { nombre: "Fisiatría", descripcion: "funcional" },
    ],
    nota: null,
  },
  {
    index: "02",
    funcion: "Ejecutan el tratamiento guiado por imagen",
    especialidades: [
      { nombre: "Algología · Anestesiología del dolor", descripcion: "" },
      { nombre: "Neurocirugía", descripcion: "" },
      { nombre: "Traumatología", descripcion: "" },
    ],
    nota: "Tres especialidades sobre el mismo equipo — redundancia de criterio clínico en cada procedimiento.",
  },
  {
    index: "03",
    funcion: "Acompañan la recuperación",
    especialidades: [
      { nombre: "Fisiatría", descripcion: "rehabilitación" },
      { nombre: "Nutrición clínica", descripcion: "" },
    ],
    nota: null,
  },
];

type Props = {
  miembrosPorGrupo?: Partial<Record<"01" | "02" | "03", TeamMember[]>>;
};

export default function TeamSection({ miembrosPorGrupo }: Props = {}) {
  const gruposConMiembros: Grupo[] = grupos.map((g) => ({
    ...g,
    miembros: miembrosPorGrupo?.[g.index as "01" | "02" | "03"],
  }));

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
              fontSize: "clamp(32px, 4.2vw, 56px)",
              lineHeight: 1.15,
              color: DEEP_TEAL,
              marginBottom: 20,
            }}
          >
            Nuestro equipo
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(17px, 1.6vw, 20px)",
              lineHeight: 1.7,
              color: STEEL_TEAL,
              maxWidth: "58ch",
            }}
          >
            En ALGOS la autoridad es el equipo. Cada caso recorre una ruta donde distintas
            especialidades colaboran — para diagnosticar con precisión, intervenir con seguridad
            y acompañar en el tiempo.
          </p>
        </div>

        {/* Grupos */}
        <div className="flex flex-col" style={{ gap: 2 }}>
          {gruposConMiembros.map((g) => (
            <div
              key={g.index}
              style={{
                borderTop: "1px solid rgba(26, 74, 85, 0.14)",
                paddingTop: "clamp(28px, 3.5vw, 40px)",
                paddingBottom: "clamp(28px, 3.5vw, 40px)",
              }}
            >
              <div className="grid md:grid-cols-[80px_1fr_1fr] gap-8 md:gap-10 items-start">
                {/* Índice */}
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
                    fontSize: "clamp(21px, 2.4vw, 30px)",
                    lineHeight: 1.3,
                    color: DEEP_TEAL,
                    margin: 0,
                  }}
                >
                  {g.funcion}
                </h3>

                {/* Columna derecha */}
                <div>
                  {/* Especialidades */}
                  <div className="flex flex-wrap" style={{ gap: 8, marginBottom: 20 }}>
                    {g.especialidades.map((esp) => (
                      <span
                        key={esp.nombre}
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
                        {esp.nombre}
                        {esp.descripcion && (
                          <span
                            style={{
                              color: "#2A6270",
                              marginLeft: 5,
                              fontWeight: 400,
                            }}
                          >
                            ({esp.descripcion})
                          </span>
                        )}
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
                        color: "#2A6270",
                        marginBottom: 16,
                        
                      }}
                    >
                      {g.nota}
                    </p>
                  )}

                  {/* Miembros (cuando estén disponibles) */}
                  {g.miembros && g.miembros.length > 0 ? (
                    <div className="flex flex-col" style={{ gap: 10, marginBottom: 12 }}>
                      {g.miembros.map((m) => (
                        <div key={m.nombre} className="flex items-center" style={{ gap: 12 }}>
                          {m.foto && (
                            <img
                              src={m.foto}
                              alt={m.nombre}
                              style={{
                                width: 36,
                                height: 36,
                                borderRadius: "50%",
                                objectFit: "cover",
                              }}
                            />
                          )}
                          <div>
                            <p
                              style={{
                                fontFamily: "Inter, sans-serif",
                                fontSize: 13,
                                fontWeight: 600,
                                color: DEEP_TEAL,
                                margin: 0,
                              }}
                            >
                              {m.nombre}
                            </p>
                            <p
                              style={{
                                fontFamily: "Inter, sans-serif",
                                fontSize: 12,
                                color: "#2A6270",
                                margin: 0,
                              }}
                            >
                              {m.credenciales}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 11,
                        letterSpacing: "0.06em",
                        color: "#2A6270",
                        margin: 0,
                      }}
                    >
                      Nombres y credenciales del equipo — próximamente
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}

          <div style={{ borderTop: "1px solid rgba(26, 74, 85, 0.14)" }} />
        </div>

        {/* Nota al pie */}
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 14,
            lineHeight: 1.65,
            color: "#2A6270",
            maxWidth: "60ch",
            marginTop: "clamp(40px, 5vw, 64px)",
            paddingLeft: 20,
            borderLeft: "2px solid rgba(198, 150, 54, 0.4)",
          }}
        >
          La neurocirugía en ALGOS no es la puerta al quirófano — es el criterio que sabe cuándo
          la cirugía todavía no hace falta.
        </p>
      </div>
    </section>
  );
}
