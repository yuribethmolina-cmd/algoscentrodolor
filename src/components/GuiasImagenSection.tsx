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

/* ─── SVG Illustrations ─── */

function IllustRX() {
  return (
    <svg
      width="170"
      height="210"
      viewBox="0 0 170 210"
      fill="none"
      aria-hidden="true"
      style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", opacity: 0.09, pointerEvents: "none" }}
    >
      {/* Tube housing */}
      <rect x="42" y="6" width="86" height="34" rx="5" stroke={CREAM} strokeWidth="2" />
      {/* Tube details */}
      <line x1="85" y1="14" x2="85" y2="32" stroke={CREAM} strokeWidth="1.2" strokeOpacity="0.6" />
      <line x1="85" y1="14" x2="95" y2="23" stroke={CREAM} strokeWidth="1.2" strokeOpacity="0.6" />
      <line x1="85" y1="32" x2="95" y2="23" stroke={CREAM} strokeWidth="1.2" strokeOpacity="0.6" />
      {/* Collimator */}
      <rect x="60" y="40" width="50" height="14" rx="2" stroke={CREAM} strokeWidth="1.5" />
      {/* Beam fan — 7 lines from focal point */}
      {[-52, -34, -17, 0, 17, 34, 52].map((dx, i) => (
        <line
          key={i}
          x1="85"
          y1="54"
          x2={85 + dx}
          y2="185"
          stroke={CREAM}
          strokeWidth={dx === 0 ? 1.4 : 0.9}
          strokeOpacity={dx === 0 ? 0.85 : 0.45}
        />
      ))}
      {/* Field boundary */}
      <line x1="33" y1="185" x2="137" y2="185" stroke={CREAM} strokeWidth="1.8" />
      {/* Patient table */}
      <rect x="10" y="189" width="150" height="7" rx="3" stroke={CREAM} strokeWidth="1.2" />
    </svg>
  );
}

function IllustTC() {
  return (
    <svg
      width="190"
      height="190"
      viewBox="0 0 190 190"
      fill="none"
      aria-hidden="true"
      style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", opacity: 0.09, pointerEvents: "none" }}
    >
      {/* Outer gantry ring */}
      <circle cx="95" cy="95" r="88" stroke={CREAM} strokeWidth="2.5" />
      {/* Middle ring */}
      <circle cx="95" cy="95" r="66" stroke={CREAM} strokeWidth="1.2" strokeOpacity="0.65" />
      {/* Inner bore — dashed */}
      <circle cx="95" cy="95" r="40" stroke={CREAM} strokeWidth="1.2" strokeDasharray="7 4" strokeOpacity="0.8" />
      {/* Patient table through bore */}
      <line x1="0" y1="95" x2="55" y2="95" stroke={CREAM} strokeWidth="2" />
      <line x1="135" y1="95" x2="190" y2="95" stroke={CREAM} strokeWidth="2" />
      {/* Rotating X-ray source + detector pair */}
      <g style={{ transformOrigin: "95px 95px", animation: "tc-rotate 22s linear infinite" }}>
        {/* Source node */}
        <circle cx="95" cy="7" r="7" stroke={CREAM} strokeWidth="1.8" />
        <line x1="95" y1="14" x2="95" y2="29" stroke={CREAM} strokeWidth="1.2" strokeOpacity="0.5" />
        {/* Detector arc on opposite side */}
        <rect x="86" y="168" width="18" height="9" rx="2" stroke={CREAM} strokeWidth="1.5" />
      </g>
    </svg>
  );
}

function IllustECO() {
  return (
    <svg
      width="170"
      height="190"
      viewBox="0 0 170 190"
      fill="none"
      aria-hidden="true"
      style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", opacity: 0.09, pointerEvents: "none" }}
    >
      {/* Probe body */}
      <rect x="62" y="4" width="46" height="54" rx="8" stroke={CREAM} strokeWidth="2" />
      {/* Grip detail lines */}
      <line x1="72" y1="18" x2="98" y2="18" stroke={CREAM} strokeWidth="1" strokeOpacity="0.4" />
      <line x1="72" y1="28" x2="98" y2="28" stroke={CREAM} strokeWidth="1" strokeOpacity="0.4" />
      <line x1="72" y1="38" x2="98" y2="38" stroke={CREAM} strokeWidth="1" strokeOpacity="0.4" />
      {/* Active face */}
      <rect x="66" y="54" width="38" height="8" rx="3" stroke={CREAM} strokeWidth="1.5" />
      {/* Wave arcs — staggered animation */}
      <path d="M 50 76 Q 85 60 120 76" stroke={CREAM} strokeWidth="1.4"
        style={{ animation: "eco-wave 3s ease-in-out 0s infinite" }} />
      <path d="M 34 99 Q 85 76 136 99" stroke={CREAM} strokeWidth="1.2"
        style={{ animation: "eco-wave 3s ease-in-out 0.4s infinite" }} />
      <path d="M 16 126 Q 85 96 154 126" stroke={CREAM} strokeWidth="1"
        style={{ animation: "eco-wave 3s ease-in-out 0.8s infinite" }} />
      <path d="M 2 158 Q 85 120 168 158" stroke={CREAM} strokeWidth="0.8"
        style={{ animation: "eco-wave 3s ease-in-out 1.2s infinite" }} />
    </svg>
  );
}

const ILLUSTRATIONS = [IllustRX, IllustTC, IllustECO];

/* ─── Main component ─── */

export default function GuiasImagenSection() {
  return (
    <>
      <style>{`
        @keyframes tc-rotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes eco-wave {
          0%   { opacity: 0.1; }
          40%  { opacity: 0.95; }
          100% { opacity: 0.1; }
        }
        @keyframes rx-pulse {
          0%, 100% { opacity: 0.09; }
          50%      { opacity: 0.16; }
        }
      `}</style>

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

          {/* Grid — each cell has illustration + content */}
          <div className="grid md:grid-cols-3" style={{ gap: "1px", backgroundColor: "rgba(245,240,232,0.08)" }}>
            {guias.map((g, idx) => {
              const Illust = ILLUSTRATIONS[idx];
              return (
                <div
                  key={g.sigla}
                  style={{
                    backgroundColor: DEEP_TEAL,
                    padding: "clamp(28px, 3.5vw, 40px)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Background illustration */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: -20,
                      left: 0,
                      right: 0,
                      display: "flex",
                      justifyContent: "center",
                      animation: idx === 0 ? "rx-pulse 5s ease-in-out infinite" : undefined,
                    }}
                  >
                    <Illust />
                  </div>

                  {/* Content — sits above illustration */}
                  <div style={{ position: "relative", zIndex: 1 }}>
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
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
