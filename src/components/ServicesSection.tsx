const DEEP_TEAL = "#1a4a55";
const TEAL = "#3d8b96";
const GOLD = "#c69636";
const CREAM = "#f5f0e8";
const STEEL = "#2a6270";
const WA_URL = "https://wa.me/584246467944";

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

export default function ServicesSection() {
  return (
    <section
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

        {/* Service list */}
        <div>
          {servicios.map((s, idx) => (
            <div
              key={s.index}
              style={{
                borderTop: "1px solid rgba(26,74,85,0.14)",
                paddingTop: "clamp(32px, 4vw, 48px)",
                paddingBottom: "clamp(32px, 4vw, 48px)",
                opacity: s.activo ? 1 : 0.72,
              }}
            >
              {/* Row: index + title block + details block */}
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
                    color: "rgba(26,74,85,0.28)",
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
                    style={{ gap: "clamp(20px, 3vw, 40px)", marginBottom: s.activo ? "clamp(24px, 3vw, 32px)" : 0 }}
                  >
                    <div>
                      <p
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: 10,
                          fontWeight: 700,
                          letterSpacing: "0.22em",
                          textTransform: "uppercase",
                          color: "rgba(26,74,85,0.40)",
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
                          color: "rgba(26,74,85,0.70)",
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
                          color: "rgba(26,74,85,0.40)",
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
                          color: "rgba(26,74,85,0.70)",
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
          ))}

          {/* Bottom border */}
          <div style={{ borderTop: "1px solid rgba(26,74,85,0.14)" }} />
        </div>

        {/* Closing block — Guías por imagen */}
        <div
          style={{
            marginTop: "clamp(56px, 7vw, 88px)",
            padding: "clamp(28px, 3.5vw, 44px)",
            backgroundColor: DEEP_TEAL,
            borderRadius: 4,
          }}
        >
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
              color: "rgba(245,240,232,0.68)",
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
    </section>
  );
}
