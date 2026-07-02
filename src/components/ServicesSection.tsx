import { useInViewOnce } from "@/lib/animations";

const DEEP_TEAL = "#1a4a55";
const TEAL = "#3d8b96";
const GOLD = "#c69636";
const CREAM = "#f5f0e8";
const STEEL = "#2a6270";
const WA_URL = "https://wa.me/584146807886";

const STYLES = `
.svc-illust { display: none; }
@media (min-width: 600px) { .svc-illust { display: block; } }

@keyframes emg-draw {
  from { stroke-dashoffset: 600; }
  to   { stroke-dashoffset: 0; }
}
@keyframes eeg-drift {
  0%, 100% { transform: translateX(0); }
  50%       { transform: translateX(-12px); }
}
@keyframes o3-breathe {
  0%, 100% { transform: scale(1); }
  50%       { transform: scale(1.05); }
}
@keyframes rf-pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.42; }
}
@keyframes needle-creep {
  0%, 100% { transform: translate(0, 0); }
  50%       { transform: translate(-5px, 3px); }
}
`;

type Service = {
  index: string;
  nombre: string;
  bajada: string;
  queEs: string;
  paraQueSirve: string;
  activo: boolean;
};

const servicios: Service[] = [
  {
    index: "01",
    nombre: "Electromiografía (EMG)",
    bajada: "Estudio de los nervios y los músculos.",
    queEs:
      "Mide cómo viajan las señales por sus nervios y cómo responden sus músculos. Así se ve si un nervio está comprimido, irritado o dañado, y en qué punto exacto.",
    paraQueSirve:
      "Es el estudio indicado cuando el dolor viene con hormigueo, adormecimiento, debilidad o corrientazos. Confirma el nervio comprometido de una ciática o el daño de la neuropatía diabética, y le señala al especialista dónde está el problema.",
    activo: true,
  },
  {
    index: "02",
    nombre: "Electroencefalograma (EEG)",
    bajada: "Estudio de la actividad eléctrica del cerebro.",
    queEs:
      "Registra la actividad eléctrica de su cerebro con unos electrodos que se colocan sobre el cuero cabelludo. Es un estudio sencillo, no invasivo y que no duele.",
    paraQueSirve:
      "Es el estudio indicado ante convulsiones o crisis, episodios de desmayo o pérdida de consciencia sin explicación, sospecha de epilepsia y el seguimiento de ciertas condiciones neurológicas.",
    activo: true,
  },
  {
    index: "03",
    nombre: "Infiltraciones y bloqueos",
    bajada: "Inyecciones dirigidas para el dolor, guiadas por imagen.",
    queEs:
      "Inyecciones de medicamento aplicadas con precisión sobre el punto que genera el dolor —una articulación, un nervio o una raíz—, siempre guiadas por imagen para llegar justo donde hace falta. Con anestesia local, ambulatorio, se va caminando el mismo día.",
    paraQueSirve:
      "Sirven para dos cosas. Para tratar: bajar la inflamación y aliviar dolores como la ciática, la hernia discal o el dolor de las articulaciones de la columna. Y para confirmar de dónde viene el dolor: un bloqueo bien dirigido ayuda a identificar el nervio responsable y a orientar el tratamiento siguiente.",
    activo: true,
  },
  {
    index: "04",
    nombre: "Ozono para hernia discal",
    bajada: "Tratamiento del dolor de disco sin cirugía.",
    queEs:
      "Una aplicación de ozono médico en el disco de la columna, guiada por imagen, que ayuda a reducir el volumen de la hernia y la inflamación que irrita el nervio. Es ambulatorio y se hace con anestesia local.",
    paraQueSirve:
      "Está indicado específicamente para la ciática causada por una hernia de disco lumbar, cuando el dolor lleva tiempo y no ha cedido con medicamentos ni reposo, como una opción antes de plantear la cirugía. No es un tratamiento para cualquier dolor: se usa solo cuando la imagen confirma que la hernia es la causa.",
    activo: true,
  },
  {
    index: "05",
    nombre: "Radiofrecuencia",
    bajada: "Tratamiento del dolor sin cirugía.",
    queEs:
      "Guiada por imagen y con anestesia local, aplica calor controlado sobre el nervio que transmite el dolor para reducir esa señal. Es ambulatoria: el mismo día se va a casa.",
    paraQueSirve:
      "Indicada cuando el dolor persiste y otros tratamientos no han bastado. Se usa en el dolor de las articulaciones de la columna (dolor facetario), cervical y lumbar, y en la artrosis de rodilla.",
    activo: false,
  },
];

const GUIDES = ["Fluoroscopia", "Tomografía", "Ecografía"];

/* ── Scroll-reveal wrapper ─────────────────────────────────────────────── */
function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>(0.08);
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(22px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s cubic-bezier(0.23,1,0.32,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ── SVG Illustrations ─────────────────────────────────────────────────── */
function IllustEMG() {
  return (
    <svg viewBox="0 0 180 80" fill="none" style={{ width: "100%", height: "100%" }} aria-hidden="true">
      <polyline
        points="0,40 28,40 36,5 42,74 50,40 88,40 96,7 102,72 110,40 180,40"
        stroke={TEAL}
        strokeWidth="1.8"
        strokeLinejoin="round"
        style={{
          strokeDasharray: 600,
          strokeDashoffset: 0,
          animation: "emg-draw 2.2s cubic-bezier(0.23,1,0.32,1) 0.2s both",
        }}
      />
      <circle cx="36" cy="5" r="3" fill={GOLD} />
      <circle cx="96" cy="7" r="3" fill={GOLD} />
    </svg>
  );
}

function IllustEEG() {
  return (
    <svg viewBox="0 0 200 90" fill="none" style={{ width: "100%", height: "100%" }} aria-hidden="true">
      <g style={{ animation: "eeg-drift 7s ease-in-out infinite" }}>
        <path
          d="M-10,20 C10,6 30,34 50,20 70,6 90,36 110,20 130,4 150,34 170,20 183,11 195,27 210,20"
          stroke={TEAL}
          strokeWidth="1.5"
        />
        <path
          d="M-10,45 C15,28 35,62 55,45 75,28 95,66 115,45 135,24 155,62 175,45 187,36 195,53 210,45"
          stroke={TEAL}
          strokeWidth="1.2"
          strokeOpacity="0.60"
        />
        <path
          d="M-10,70 C15,60 30,80 55,70 80,60 90,80 115,70 140,60 150,80 170,70 183,64 192,75 210,70"
          stroke={TEAL}
          strokeWidth="0.9"
          strokeOpacity="0.35"
        />
      </g>
      <circle cx="90" cy="4" r="2.5" fill={GOLD} />
      <circle cx="115" cy="24" r="2" fill={GOLD} />
    </svg>
  );
}

function IllustBloqueo() {
  return (
    <svg viewBox="0 0 190 90" fill="none" style={{ width: "100%", height: "100%" }} aria-hidden="true">
      <rect x="18" y="8" width="108" height="16" rx="3" stroke={TEAL} strokeWidth="1.4" fill="rgba(61,139,150,0.06)" />
      <ellipse cx="72" cy="44" rx="52" ry="9" stroke={TEAL} strokeWidth="1.2" fill="rgba(61,139,150,0.09)" />
      <rect x="18" y="62" width="108" height="16" rx="3" stroke={TEAL} strokeWidth="1.4" fill="rgba(61,139,150,0.06)" />
      <g style={{ animation: "needle-creep 4.5s ease-in-out infinite" }}>
        <line x1="188" y1="18" x2="107" y2="44" stroke={GOLD} strokeWidth="1.6" />
        <polygon points="107,44 117,37 117,51" fill={GOLD} />
        <circle cx="92" cy="44" r="12" stroke={GOLD} strokeWidth="0.9" fill="none" />
        <line x1="82" y1="44" x2="102" y2="44" stroke={GOLD} strokeWidth="0.75" />
        <line x1="92" y1="34" x2="92" y2="54" stroke={GOLD} strokeWidth="0.75" />
      </g>
    </svg>
  );
}

function IllustOzono() {
  return (
    <svg viewBox="0 0 190 90" fill="none" style={{ width: "100%", height: "100%" }} aria-hidden="true">
      <g style={{ animation: "o3-breathe 5.5s ease-in-out infinite", transformOrigin: "95px 52px" }}>
        <circle cx="95" cy="52" r="20" stroke={TEAL} strokeWidth="1.5" />
        <text x="95" y="58" textAnchor="middle" fontFamily="monospace" fontSize="14" fill={TEAL}>
          O
        </text>
      </g>
      <circle cx="40" cy="26" r="15" stroke={GOLD} strokeWidth="1.2" />
      <text x="40" y="31" textAnchor="middle" fontFamily="monospace" fontSize="11" fill={GOLD}>
        O
      </text>
      <circle cx="150" cy="26" r="15" stroke={GOLD} strokeWidth="1.2" />
      <text x="150" y="31" textAnchor="middle" fontFamily="monospace" fontSize="11" fill={GOLD}>
        O
      </text>
      <line x1="54" y1="33" x2="78" y2="44" stroke={TEAL} strokeWidth="1.2" />
      <line x1="136" y1="33" x2="112" y2="44" stroke={TEAL} strokeWidth="1.2" />
    </svg>
  );
}

function IllustRF() {
  return (
    <svg viewBox="0 0 190 90" fill="none" style={{ width: "100%", height: "100%" }} aria-hidden="true">
      <circle cx="36" cy="45" r="5.5" fill={GOLD} />
      <circle cx="36" cy="45" r="11" stroke={GOLD} strokeWidth="0.8" strokeOpacity="0.5" />
      <path
        d="M 56 14 Q 86 45 56 76"
        stroke={TEAL}
        strokeWidth="1.6"
        strokeDasharray="4 2.5"
        style={{ animation: "rf-pulse 3.5s ease-in-out 0s infinite" }}
      />
      <path
        d="M 78 7 Q 120 45 78 83"
        stroke={TEAL}
        strokeWidth="1.3"
        strokeDasharray="4 3"
        style={{ animation: "rf-pulse 3.5s ease-in-out 0.6s infinite" }}
      />
      <path
        d="M 100 3 Q 155 45 100 87"
        stroke={TEAL}
        strokeWidth="1"
        strokeDasharray="3 3.5"
        style={{ animation: "rf-pulse 3.5s ease-in-out 1.2s infinite" }}
      />
      <path
        d="M 122 1 Q 180 45 122 89"
        stroke={TEAL}
        strokeWidth="0.7"
        strokeDasharray="3 4"
        style={{ animation: "rf-pulse 3.5s ease-in-out 1.8s infinite" }}
      />
      <line x1="158" y1="28" x2="169" y2="21" stroke={GOLD} strokeWidth="1" />
      <line x1="163" y1="45" x2="176" y2="45" stroke={GOLD} strokeWidth="1" />
      <line x1="158" y1="62" x2="169" y2="69" stroke={GOLD} strokeWidth="1" />
    </svg>
  );
}

const ILLUSTRATIONS: Record<string, React.ReactNode> = {
  "01": <IllustEMG />,
  "02": <IllustEEG />,
  "03": <IllustBloqueo />,
  "04": <IllustOzono />,
  "05": <IllustRF />,
};

export default function ServicesSection() {
  return (
    <section
      style={{
        backgroundColor: CREAM,
        paddingTop: "clamp(80px, 10vw, 128px)",
        paddingBottom: "clamp(80px, 10vw, 128px)",
      }}
    >
      <style>{STYLES}</style>
      <div
        className="mx-auto"
        style={{
          maxWidth: 1080,
          paddingLeft: "clamp(24px, 4vw, 48px)",
          paddingRight: "clamp(24px, 4vw, 48px)",
        }}
      >
        {/* Header */}
        <FadeIn>
          <div style={{ marginBottom: "clamp(48px, 6vw, 72px)" }}>
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
              SERVICIOS
            </p>
            <h2
              style={{
                fontFamily: "'Sora', serif",
                fontWeight: 600,
                fontSize: "clamp(32px, 4.2vw, 56px)",
                lineHeight: 1.15,
                color: DEEP_TEAL,
                maxWidth: "28ch",
              }}
            >
              Nuestros tratamientos
            </h2>
          </div>
        </FadeIn>

        {/* Service list */}
        <div>
          {servicios.map((s, idx) => (
            <FadeIn key={s.index} delay={idx * 55}>
              <div
                style={{
                  borderTop: "1px solid rgba(26,74,85,0.14)",
                  paddingTop: "clamp(32px, 4vw, 48px)",
                  paddingBottom: "clamp(32px, 4vw, 48px)",
                  opacity: s.activo ? 1 : 0.72,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Decorative illustration */}
                <div
                  aria-hidden="true"
                  className="svc-illust"
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "clamp(140px, 18vw, 200px)",
                    height: "clamp(78px, 10vw, 112px)",
                    opacity: 0.08,
                    pointerEvents: "none",
                    userSelect: "none",
                  }}
                >
                  {ILLUSTRATIONS[s.index]}
                </div>

                {/* Grid: index | content */}
                <div
                  className="grid"
                  style={{
                    gridTemplateColumns: "clamp(40px,5vw,72px) 1fr",
                    gap: "clamp(16px, 3vw, 40px)",
                  }}
                >
                  {/* Index */}
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 12,
                      color: "rgba(26,74,85,0.38)",
                      letterSpacing: "0.06em",
                      paddingTop: 6,
                    }}
                  >
                    {s.index}
                  </span>

                  {/* Main content */}
                  <div>
                    {/* Name + bajada + badge */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 12,
                        flexWrap: "wrap",
                        marginBottom: "clamp(20px, 2.5vw, 28px)",
                      }}
                    >
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h3
                          style={{
                            fontFamily: "'Sora', serif",
                            fontWeight: 600,
                            fontSize: "clamp(20px, 2.2vw, 27px)",
                            lineHeight: 1.25,
                            color: DEEP_TEAL,
                            marginBottom: 8,
                          }}
                        >
                          {s.nombre}
                        </h3>
                        <p
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "clamp(15px, 1.3vw, 17px)",
                            fontWeight: 500,
                            color: STEEL,
                            margin: 0,
                          }}
                        >
                          {s.bajada}
                        </p>
                      </div>

                      {!s.activo && (
                        <span
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: 10,
                            fontWeight: 700,
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                            color: TEAL,
                            backgroundColor: "rgba(61,139,150,0.10)",
                            border: "1px solid rgba(61,139,150,0.28)",
                            borderRadius: 3,
                            padding: "4px 10px",
                            whiteSpace: "nowrap",
                            alignSelf: "flex-start",
                            marginTop: 4,
                          }}
                        >
                          Próximamente
                        </span>
                      )}
                    </div>

                    {/* Detail columns */}
                    <div
                      className="grid sm:grid-cols-2"
                      style={{
                        gap: "clamp(20px, 3vw, 40px)",
                        marginBottom: s.activo ? "clamp(24px, 3vw, 32px)" : 0,
                      }}
                    >
                      <div>
                        <p
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: 10,
                            fontWeight: 700,
                            letterSpacing: "0.22em",
                            textTransform: "uppercase",
                            color: "rgba(26,74,85,0.72)",
                            marginBottom: 10,
                          }}
                        >
                          Qué es
                        </p>
                        <p
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "clamp(14px, 1.2vw, 15px)",
                            lineHeight: 1.7,
                            color: "rgba(26,74,85,0.87)",
                            margin: 0,
                          }}
                        >
                          {s.queEs}
                        </p>
                      </div>

                      <div>
                        <p
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: 10,
                            fontWeight: 700,
                            letterSpacing: "0.22em",
                            textTransform: "uppercase",
                            color: "rgba(26,74,85,0.72)",
                            marginBottom: 10,
                          }}
                        >
                          Para qué sirve
                        </p>
                        <p
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "clamp(14px, 1.2vw, 15px)",
                            lineHeight: 1.7,
                            color: "rgba(26,74,85,0.87)",
                            margin: 0,
                          }}
                        >
                          {s.paraQueSirve}
                        </p>
                      </div>
                    </div>

                    {/* CTA — only for active services */}
                    {s.activo && (
                      <a
                        href={WA_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 8,
                          fontFamily: "Inter, sans-serif",
                          fontSize: 12,
                          fontWeight: 700,
                          letterSpacing: "0.20em",
                          textTransform: "uppercase",
                          color: TEAL,
                          textDecoration: "none",
                          borderBottom: `1px solid rgba(61,139,150,0.35)`,
                          paddingBottom: 2,
                        }}
                      >
                        Agende su consulta →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}

          {/* Bottom border */}
          <div style={{ borderTop: "1px solid rgba(26,74,85,0.14)" }} />
        </div>

        {/* Closing block — Guías por imagen */}
        <FadeIn delay={200}>
          <div
            style={{
              marginTop: "clamp(56px, 7vw, 88px)",
              padding: "clamp(28px, 3.5vw, 44px)",
              backgroundColor: DEEP_TEAL,
              borderRadius: 4,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Decorative imaging target */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                right: -24,
                top: "50%",
                transform: "translateY(-50%)",
                width: 220,
                height: 220,
                opacity: 0.12,
                pointerEvents: "none",
              }}
            >
              <svg viewBox="0 0 220 220" fill="none" style={{ width: "100%", height: "100%" }}>
                <circle cx="110" cy="110" r="90" stroke={CREAM} strokeWidth="0.8"/>
                <circle cx="110" cy="110" r="65" stroke={CREAM} strokeWidth="1"/>
                <circle cx="110" cy="110" r="40" stroke={CREAM} strokeWidth="1.2"/>
                <circle cx="110" cy="110" r="16" stroke={CREAM} strokeWidth="1.4"/>
                <circle cx="110" cy="110" r="5" fill={GOLD}/>
                <line x1="110" y1="0" x2="110" y2="220" stroke={CREAM} strokeWidth="0.7"/>
                <line x1="0" y1="110" x2="220" y2="110" stroke={CREAM} strokeWidth="0.7"/>
                <line x1="110" y1="18" x2="110" y2="30" stroke={GOLD} strokeWidth="2"/>
                <line x1="110" y1="190" x2="110" y2="202" stroke={GOLD} strokeWidth="2"/>
                <line x1="18" y1="110" x2="30" y2="110" stroke={GOLD} strokeWidth="2"/>
                <line x1="190" y1="110" x2="202" y2="110" stroke={GOLD} strokeWidth="2"/>
              </svg>
            </div>
            <div style={{ position: "relative" }}>
            <h3
              style={{
                fontFamily: "'Sora', serif",
                fontWeight: 600,
                fontSize: "clamp(18px, 1.8vw, 22px)",
                color: CREAM,
                marginBottom: 14,
                lineHeight: 1.3,
              }}
            >
              Procedimientos guiados por imagen
            </h3>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "clamp(14px, 1.2vw, 16px)",
                lineHeight: 1.7,
                color: "rgba(245,240,232,0.88)",
                marginBottom: 24,
                maxWidth: "62ch",
              }}
            >
              Cada procedimiento lo hacemos guiados por imagen, para llegar con precisión al punto
              exacto de su dolor. Contamos con las tres formas de guía — fluoroscopia, tomografía y
              ecografía — y usamos la que su caso necesita.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {GUIDES.map((g) => (
                <span
                  key={g}
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: GOLD,
                    backgroundColor: "rgba(198,150,54,0.12)",
                    border: "1px solid rgba(198,150,54,0.28)",
                    borderRadius: 3,
                    padding: "5px 12px",
                  }}
                >
                  {g}
                </span>
              ))}
            </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
