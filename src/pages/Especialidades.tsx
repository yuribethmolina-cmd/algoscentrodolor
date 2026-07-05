import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEOHead from "@/components/SEOHead";
import { SPECIALTIES } from "@/data/specialties";

const DEEP_TEAL = "#1a4a55";
const GOLD = "#c69636";
const CREAM = "#f5f0e8";
const TEAL = "#3d8b96";

export default function Especialidades() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: CREAM }}>
      <SEOHead
        title="Especialidades médicas | ALGOS · Clínica del Dolor"
        description="Especialidades del centro de dolor ALGOS en Maracaibo: neurocirugía, traumatología, reumatología, fisiatría, radiología intervencionista y más."
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
              NUESTRAS ESPECIALIDADES
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
              Un equipo multidisciplinario para el manejo del dolor.
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
              Cada caso se evalúa por la especialidad correcta, se diagnostica
              con precisión, se interviene con seguridad y se acompaña en el
              tiempo.
            </p>
          </div>
        </section>

        {/* Grid */}
        <section
          style={{
            paddingTop: "clamp(64px, 8vw, 96px)",
            paddingBottom: "clamp(80px, 10vw, 128px)",
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
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: 20,
              }}
            >
              {SPECIALTIES.map((sp) => (
                <article
                  key={sp.slug}
                  style={{
                    backgroundColor: "#fff",
                    padding: "28px 26px",
                    border: "1px solid rgba(26,74,85,0.1)",
                    borderTop: `3px solid ${GOLD}`,
                  }}
                >
                  <h2
                    style={{
                      fontFamily: "'Sora', sans-serif",
                      fontSize: 22,
                      fontWeight: 600,
                      color: DEEP_TEAL,
                      marginBottom: 6,
                    }}
                  >
                    {sp.name}
                  </h2>
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: TEAL,
                      marginBottom: 14,
                    }}
                  >
                    {sp.tagline}
                  </p>
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 15,
                      lineHeight: 1.65,
                      color: "rgba(26,74,85,0.8)",
                      marginBottom: 18,
                    }}
                  >
                    {sp.description}
                  </p>

                  <dl style={{ margin: 0 }}>
                    {[
                      { k: "Evalúa", v: sp.evalua },
                      { k: "Trata", v: sp.trata },
                      { k: "Acompaña", v: sp.acompana },
                    ].map((row) => (
                      <div key={row.k} style={{ marginBottom: 10 }}>
                        <dt
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
                        </dt>
                        <dd
                          style={{
                            margin: 0,
                            fontFamily: "Inter, sans-serif",
                            fontSize: 14,
                            lineHeight: 1.55,
                            color: DEEP_TEAL,
                          }}
                        >
                          {row.v}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <HomeFooter />
      <WhatsAppButton />
    </div>
  );
}
