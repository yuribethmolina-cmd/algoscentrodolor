import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEOHead from "@/components/SEOHead";
import { DIAGNOSTICS, DIAGNOSTIC_GROUPS } from "@/data/diagnostics";

const DEEP_TEAL = "#1a4a55";
const GOLD = "#c69636";
const CREAM = "#f5f0e8";
const TEAL = "#3d8b96";

const GROUP_ORDER: Array<keyof typeof DIAGNOSTIC_GROUPS> = [
  "imagen",
  "cardiologia",
  "neurofisiologia",
  "laboratorio",
];

export default function EstudiosDiagnosticos() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: CREAM }}>
      <SEOHead
        title="Estudios diagnósticos en Maracaibo — Tomografía, EMG, Holter | ALGOS"
        description="Estudios diagnósticos en Maracaibo: tomografía, rayos X, mamografía 3D, electrocardiograma, Holter, electroencefalograma (EEG), electromiografía (EMG) y laboratorio."
      />
      <Navbar />

      <main style={{ paddingTop: 80 }}>
        {/* Hero */}
        <section
          style={{
            backgroundColor: DEEP_TEAL,
            paddingTop: "clamp(80px, 10vw, 128px)",
            paddingBottom: "clamp(60px, 8vw, 96px)",
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
              ESTUDIOS DIAGNÓSTICOS
            </p>
            <h1
              style={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 600,
                fontSize: "clamp(34px, 5vw, 64px)",
                lineHeight: 1.1,
                color: CREAM,
                marginBottom: 20,
                maxWidth: 780,
              }}
            >
              Tomografía, EMG, Holter y más — en Maracaibo.
            </h1>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "clamp(15px, 1.3vw, 18px)",
                lineHeight: 1.7,
                color: "rgba(245,240,232,0.85)",
                maxWidth: 640,
              }}
            >
              Contamos con estudios de imagen, cardiología, neurofisiología y
              laboratorio, en sede y a domicilio. Con y sin consulta previa.
            </p>
          </div>
        </section>

        {/* Groups */}
        {GROUP_ORDER.map((groupKey) => {
          const group = DIAGNOSTIC_GROUPS[groupKey];
          const items = DIAGNOSTICS.filter((d) => d.grupo === groupKey);
          return (
            <section
              key={groupKey}
              style={{
                paddingTop: "clamp(56px, 6vw, 80px)",
                paddingBottom: "clamp(56px, 6vw, 80px)",
                borderBottom: "1px solid rgba(26,74,85,0.08)",
              }}
            >
              <div
                className="mx-auto"
                style={{
                  maxWidth: 1100,
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
                    color: GOLD,
                    marginBottom: 12,
                  }}
                >
                  {group.label}
                </p>
                <h2
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontWeight: 600,
                    fontSize: "clamp(26px, 3vw, 36px)",
                    lineHeight: 1.2,
                    color: DEEP_TEAL,
                    marginBottom: 8,
                  }}
                >
                  {group.description}
                </h2>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: 20,
                    marginTop: 32,
                  }}
                >
                  {items.map((d) => (
                    <article
                      key={d.slug}
                      style={{
                        backgroundColor: "#fff",
                        padding: "26px 24px",
                        border: "1px solid rgba(26,74,85,0.1)",
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: "'Sora', sans-serif",
                          fontSize: 20,
                          fontWeight: 600,
                          color: DEEP_TEAL,
                          marginBottom: 6,
                        }}
                      >
                        {d.name}
                      </h3>
                      <p
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: 13,
                          color: TEAL,
                          marginBottom: 18,
                        }}
                      >
                        {d.short}
                      </p>

                      {[
                        { k: "Qué es", v: d.quees },
                        { k: "Para qué sirve", v: d.paraque },
                        { k: "Cómo se hace", v: d.comose },
                      ].map((row) => (
                        <div key={row.k} style={{ marginBottom: 12 }}>
                          <p
                            style={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: 10,
                              fontWeight: 700,
                              letterSpacing: "0.2em",
                              textTransform: "uppercase",
                              color: GOLD,
                              marginBottom: 3,
                            }}
                          >
                            {row.k}
                          </p>
                          <p
                            style={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: 14,
                              lineHeight: 1.6,
                              color: "rgba(26,74,85,0.85)",
                            }}
                          >
                            {row.v}
                          </p>
                        </div>
                      ))}

                      <div
                        style={{
                          borderTop: "1px solid rgba(26,74,85,0.1)",
                          paddingTop: 12,
                          fontFamily: "Inter, sans-serif",
                          fontSize: 12,
                          color: TEAL,
                          fontWeight: 600,
                        }}
                      >
                        {d.disponibilidad}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </main>

      <HomeFooter />
      <WhatsAppButton />
    </div>
  );
}
