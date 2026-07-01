const DEEP_TEAL = "#1a4a55";
const TEAL = "#3d8b96";
const GOLD = "#c69636";
const CREAM = "#f5f0e8";

const guias = [
  {
    sigla: "RX",
    nombre: "Fluoroscopia",
    descripcion:
      "Imagen de rayos X en tiempo real. Permite ver la columna vertebral en movimiento y confirmar con precisión la posición de la aguja dentro del espacio intervertebral o el canal espinal antes de administrar cualquier medicamento.",
    usadaEn: ["Bloqueos radiculares", "Infiltraciones epidurales", "Discólisis"],
  },
  {
    sigla: "TC",
    nombre: "Tomografía computarizada",
    descripcion:
      "Cortes transversales del cuerpo en alta resolución. Permite identificar con exactitud el nivel y la zona del disco o la raíz nerviosa afectada, y guiar el acceso a estructuras profundas con milímetros de margen.",
    usadaEn: ["Discólisis con ozono", "Bloqueos de difícil acceso", "Planificación de procedimientos complejos"],
  },
  {
    sigla: "ECO",
    nombre: "Ecografía",
    descripcion:
      "Imagen en tiempo real por ultrasonido, sin exposición a radiación. Ideal para guiar infiltraciones articulares, bloqueos de nervios periféricos y punción de partes blandas con visualización directa de estructuras vasculares y nerviosas.",
    usadaEn: ["Infiltraciones articulares", "Bloqueos nerviosos periféricos", "Punción de tejidos blandos"],
  },
];

export default function GuiasImagenSection() {
  return (
    <section
      style={{
        backgroundColor: DEEP_TEAL,
        paddingTop: "clamp(72px, 9vw, 112px)",
        paddingBottom: "clamp(72px, 9vw, 112px)",
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
              marginBottom: 16,
            }}
          >
            GUÍAS POR IMAGEN
          </p>
          <h2
            style={{
              fontFamily: "'Sora', serif",
              fontWeight: 600,
              fontSize: "clamp(24px, 2.8vw, 36px)",
              lineHeight: 1.3,
              color: CREAM,
              maxWidth: "48ch",
              marginBottom: 16,
            }}
          >
            El procedimiento guiado por imagen no es una opción — es el estándar.
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(15px, 1.3vw, 17px)",
              lineHeight: 1.7,
              color: "rgba(245, 240, 232, 0.65)",
              maxWidth: "58ch",
            }}
          >
            En ALGOS ningún procedimiento intervencionista se realiza a ciegas. Cada intervención
            utiliza la tecnología de imagen más adecuada para llegar con precisión al origen del
            dolor.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3" style={{ gap: "1px", backgroundColor: "rgba(245,240,232,0.08)" }}>
          {guias.map((g) => (
            <div
              key={g.sigla}
              style={{
                backgroundColor: DEEP_TEAL,
                padding: "clamp(28px, 3.5vw, 40px)",
              }}
            >
              {/* Sigla */}
              <div style={{ marginBottom: 20 }}>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.22em",
                    color: GOLD,
                    backgroundColor: "rgba(198, 150, 54, 0.12)",
                    border: "1px solid rgba(198, 150, 54, 0.28)",
                    borderRadius: 2,
                    padding: "3px 8px",
                  }}
                >
                  {g.sigla}
                </span>
              </div>

              {/* Nombre */}
              <h3
                style={{
                  fontFamily: "'Sora', serif",
                  fontWeight: 600,
                  fontSize: "clamp(18px, 1.6vw, 21px)",
                  color: CREAM,
                  marginBottom: 14,
                  lineHeight: 1.2,
                }}
              >
                {g.nombre}
              </h3>

              {/* Descripción */}
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 14,
                  lineHeight: 1.7,
                  color: "rgba(245, 240, 232, 0.65)",
                  marginBottom: 24,
                }}
              >
                {g.descripcion}
              </p>

              {/* Usada en */}
              <div>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "rgba(245, 240, 232, 0.35)",
                    marginBottom: 10,
                  }}
                >
                  Usada en
                </p>
                <div className="flex flex-col" style={{ gap: 6 }}>
                  {g.usadaEn.map((uso) => (
                    <span
                      key={uso}
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 12,
                        color: "rgba(245, 240, 232, 0.5)",
                        paddingLeft: 12,
                        borderLeft: `1px solid ${TEAL}`,
                      }}
                    >
                      {uso}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
