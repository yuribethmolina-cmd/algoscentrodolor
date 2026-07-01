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

/* ── Ilustraciones SVG decorativas ── */

function IllustRX() {
  return (
    <svg width="160" height="200" viewBox="0 0 160 200" fill="none" aria-hidden="true">
      {/* Tubo */}
      <rect x="35" y="4" width="90" height="32" rx="5" stroke={CREAM} strokeWidth="1.8" />
      {/* Filamento cátodo */}
      <line x1="75" y1="12" x2="75" y2="28" stroke={CREAM} strokeWidth="1.1" strokeOpacity="0.55" />
      <line x1="75" y1="12" x2="85" y2="20" stroke={CREAM} strokeWidth="1.1" strokeOpacity="0.55" />
      <line x1="75" y1="28" x2="85" y2="20" stroke={CREAM} strokeWidth="1.1" strokeOpacity="0.55" />
      {/* Colimador */}
      <rect x="55" y="36" width="50" height="12" rx="2" stroke={CREAM} strokeWidth="1.4" />
      {/* Haz divergente — 7 líneas desde punto focal */}
      {([-50, -33, -17, 0, 17, 33, 50] as number[]).map((dx, i) => (
        <line
          key={i}
          x1="80" y1="48"
          x2={80 + dx} y2="178"
          stroke={CREAM}
          strokeWidth={dx === 0 ? 1.4 : 0.85}
          strokeOpacity={dx === 0 ? 0.85 : 0.4}
        />
      ))}
      {/* Plano paciente */}
      <line x1="30" y1="178" x2="130" y2="178" stroke={CREAM} strokeWidth="1.8" />
      {/* Mesa */}
      <rect x="8" y="182" width="144" height="6" rx="3" stroke={CREAM} strokeWidth="1.2" />
    </svg>
  );
}

function IllustTC() {
  return (
    <svg width="180" height="180" viewBox="0 0 180 180" fill="none" aria-hidden="true">
      {/* Anillo exterior del gantry */}
      <circle cx="90" cy="90" r="84" stroke={CREAM} strokeWidth="2.2" />
      {/* Anillo medio */}
      <circle cx="90" cy="90" r="63" stroke={CREAM} strokeWidth="1.1" strokeOpacity="0.6" />
      {/* Apertura interior — línea discontinua */}
      <circle cx="90" cy="90" r="38" stroke={CREAM} strokeWidth="1.2" strokeDasharray="7 4" strokeOpacity="0.75" />
      {/* Mesa del paciente */}
      <line x1="0" y1="90" x2="52" y2="90" stroke={CREAM} strokeWidth="1.8" />
      <line x1="128" y1="90" x2="180" y2="90" stroke={CREAM} strokeWidth="1.8" />
      {/* Fuente + detector — rotan con animación SVG */}
      <g style={{ transformBox: "fill-box", transformOrigin: "90px 90px", animation: "tc-rotate 22s linear infinite" }}>
        <circle cx="90" cy="6" r="7" stroke={CREAM} strokeWidth="1.6" />
        <line x1="90" y1="13" x2="90" y2="27" stroke={CREAM} strokeWidth="1" strokeOpacity="0.45" />
        <rect x="81" y="163" width="18" height="9" rx="2" stroke={CREAM} strokeWidth="1.4" />
      </g>
    </svg>
  );
}

function IllustECO() {
  return (
    <svg width="160" height="185" viewBox="0 0 160 185" fill="none" aria-hidden="true">
      {/* Cuerpo del transductor */}
      <rect x="57" y="4" width="46" height="52" rx="8" stroke={CREAM} strokeWidth="1.8" />
      {/* Detalles de agarre */}
      <line x1="67" y1="17" x2="93" y2="17" stroke={CREAM} strokeWidth="0.9" strokeOpacity="0.4" />
      <line x1="67" y1="27" x2="93" y2="27" stroke={CREAM} strokeWidth="0.9" strokeOpacity="0.4" />
      <line x1="67" y1="37" x2="93" y2="37" stroke={CREAM} strokeWidth="0.9" strokeOpacity="0.4" />
      {/* Cara activa */}
      <rect x="61" y="52" width="38" height="7" rx="3" stroke={CREAM} strokeWidth="1.3" />
      {/* Arcos de onda — animación escalonada */}
      <path d="M 46 74 Q 80 58 114 74" stroke={CREAM} strokeWidth="1.4"
        style={{ animation: "eco-wave 3s ease-in-out 0s infinite" }} />
      <path d="M 30 98 Q 80 76 130 98" stroke={CREAM} strokeWidth="1.2"
        style={{ animation: "eco-wave 3s ease-in-out 0.45s infinite" }} />
      <path d="M 13 126 Q 80 98 147 126" stroke={CREAM} strokeWidth="1"
        style={{ animation: "eco-wave 3s ease-in-out 0.9s infinite" }} />
      <path d="M 0 158 Q 80 122 160 158" stroke={CREAM} strokeWidth="0.8"
        style={{ animation: "eco-wave 3s ease-in-out 1.35s infinite" }} />
    </svg>
  );
}

const ILLUSTRATIONS = [IllustRX, IllustTC, IllustECO];

/* ── Componente principal ── */

export default function GuiasImagenSection() {
  return (
    <>
      <style>{`
        @keyframes tc-rotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes eco-wave {
          0%   { opacity: 0.08; }
          45%  { opacity: 0.90; }
          100% { opacity: 0.08; }
        }
        @keyframes rx-pulse {
          0%, 100% { opacity: 0.10; }
          50%       { opacity: 0.18; }
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
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: GOLD, marginBottom: 16 }}>
              GUÍAS POR IMAGEN
            </p>
            <h2 style={{ fontFamily: "'Sora', serif", fontWeight: 600, fontSize: "clamp(24px, 2.8vw, 36px)", lineHeight: 1.3, color: CREAM, maxWidth: "48ch", marginBottom: 16 }}>
              El procedimiento guiado por imagen no es una opción — es el estándar.
            </h2>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(15px, 1.3vw, 17px)", lineHeight: 1.7, color: "rgba(245,240,232,0.65)", maxWidth: "58ch" }}>
              En ALGOS ningún procedimiento intervencionista se realiza a ciegas. Cada intervención
              utiliza la tecnología de imagen más adecuada para llegar con precisión al origen del dolor.
            </p>
          </div>

          {/* Grid de modalidades */}
          <div className="grid md:grid-cols-3" style={{ gap: "1px", backgroundColor: "rgba(245,240,232,0.08)" }}>
            {guias.map((g, idx) => {
              const Illust = ILLUSTRATIONS[idx];
              return (
                <div
                  key={g.sigla}
                  style={{ backgroundColor: DEEP_TEAL, padding: "clamp(28px, 3.5vw, 40px)", position: "relative", overflow: "hidden", minHeight: 360 }}
                >
                  {/* Ilustración decorativa — absolute en esquina inferior derecha */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: -12,
                      right: -12,
                      pointerEvents: "none",
                      opacity: 0.10,
                      animation: idx === 0 ? "rx-pulse 5s ease-in-out infinite" : undefined,
                    }}
                  >
                    <Illust />
                  </div>

                  {/* Contenido */}
                  <div style={{ position: "relative", zIndex: 1 }}>
                    {/* Sigla */}
                    <div style={{ marginBottom: 20 }}>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, letterSpacing: "0.22em", color: GOLD, backgroundColor: "rgba(198,150,54,0.12)", border: "1px solid rgba(198,150,54,0.28)", borderRadius: 2, padding: "3px 8px" }}>
                        {g.sigla}
                      </span>
                    </div>

                    {/* Nombre */}
                    <h3 style={{ fontFamily: "'Sora', serif", fontWeight: 600, fontSize: "clamp(18px, 1.6vw, 21px)", color: CREAM, marginBottom: 14, lineHeight: 1.2 }}>
                      {g.nombre}
                    </h3>

                    {/* Descripción */}
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, lineHeight: 1.7, color: "rgba(245,240,232,0.65)", marginBottom: 24 }}>
                      {g.descripcion}
                    </p>

                    {/* Usada en */}
                    <div>
                      <p style={{ fontFamily: "Inter, sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(245,240,232,0.35)", marginBottom: 10 }}>
                        Usada en
                      </p>
                      <div className="flex flex-col" style={{ gap: 6 }}>
                        {g.usadaEn.map((uso) => (
                          <span key={uso} style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "rgba(245,240,232,0.5)", paddingLeft: 12, borderLeft: `1px solid ${TEAL}` }}>
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
