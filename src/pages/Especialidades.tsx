import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEOHead from "@/components/SEOHead";
import { SPECIALTIES } from "@/data/specialties";
import { UserRound } from "lucide-react";
import drAtilioAsset from "@/assets/Atilio_foto_cortada.png.asset.json";
import teamDanielAsset from "@/assets/daniel-rodriguez.png.asset.json";
const drAtilio = drAtilioAsset.url;
const teamDaniel = teamDanielAsset.url;

const DEEP_TEAL = "#1a4a55";
const GOLD = "#c69636";
const CREAM = "#f5f0e8";
const TEAL = "#3d8b96";

type Specialist = { name: string; photo?: string; photoPosition?: string };

const SPECIALTY_TO_DOCTORS: Record<string, Specialist[]> = {
  "neurocirugia": [
    { name: "Dr. Atilio Rodríguez", photo: drAtilio, photoPosition: "center top" },
  ],
  "traumatologia": [
    { name: "Dr. Antulio Parra" },
    { name: "Dr. Tomás Iragorry" },
    { name: "Dr. Miguel Guevara" },
  ],
  "reumatologia": [{ name: "Dra. Doris Meneses" }],
  "fisiatria": [
    { name: "Dra. Leslie Ramírez" },
    { name: "Dra. Carolina Rodríguez" },
  ],
  "cuidados-paliativos": [{ name: "Dra. Gilda Gómez Neipp" }],
  "psicologia": [],
  "nutricion": [
    { name: "Lic. Daniel Rodríguez", photo: teamDaniel, photoPosition: "center 20%" },
  ],
};


export default function Especialidades() {
  const location = useLocation();
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  useEffect(() => {
    const slug = location.hash.replace(/^#/, "");
    if (!slug) return;
    setActiveSlug(slug);
    // Wait for layout, then scroll
    const t = window.setTimeout(() => {
      const el = document.getElementById(slug);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
    // Fade the highlight after a moment
    const clear = window.setTimeout(() => setActiveSlug(null), 2400);
    return () => {
      window.clearTimeout(t);
      window.clearTimeout(clear);
    };
  }, [location.hash, location.key]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: CREAM }}>
      <SEOHead
        title="Especialidades médicas | ALGOS · Clínica del Dolor"
        description="Especialidades del centro de dolor ALGOS en Maracaibo: neurocirugía, traumatología, reumatología, fisiatría, radiología intervencionista y más."
        canonical="https://algoscentrodolor.com/especialidades"
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
                color: CREAM,
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
              {SPECIALTIES.map((sp) => {
                const isActive = activeSlug === sp.slug;
                return (
                <article
                  key={sp.slug}
                  id={sp.slug}
                  style={{
                    backgroundColor: "#fff",
                    padding: "28px 26px",
                    border: isActive
                      ? `1px solid ${GOLD}`
                      : "1px solid rgba(26,74,85,0.1)",
                    borderTop: `3px solid ${GOLD}`,
                    scrollMarginTop: 120,
                    boxShadow: isActive
                      ? `0 0 0 3px rgba(198,150,54,0.25)`
                      : "none",
                    transition: "box-shadow 400ms ease, border-color 400ms ease",
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
                            color: DEEP_TEAL,
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

                  {/* Especialistas asignados */}
                  <div
                    style={{
                      marginTop: 20,
                      paddingTop: 18,
                      borderTop: "1px solid rgba(26,74,85,0.08)",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: DEEP_TEAL,
                        marginBottom: 10,
                      }}
                    >
                      Especialistas
                    </p>
                    {(SPECIALTY_TO_DOCTORS[sp.slug] ?? []).length > 0 ? (
                      <ul
                        style={{
                          listStyle: "none",
                          padding: 0,
                          margin: 0,
                          display: "flex",
                          flexDirection: "column",
                          gap: 8,
                        }}
                      >
                        {SPECIALTY_TO_DOCTORS[sp.slug].map((doc) => (
                          <li key={doc.name}>
                            <Link
                              to="/equipo"
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                textDecoration: "none",
                                padding: "6px 8px",
                                margin: "-6px -8px",
                                borderRadius: 2,
                                transition: "background-color 200ms ease",
                              }}
                              onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                  "rgba(61,139,150,0.06)")
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                  "transparent")
                              }
                            >
                              <span
                                style={{
                                  width: 32,
                                  height: 32,
                                  borderRadius: "50%",
                                  overflow: "hidden",
                                  flexShrink: 0,
                                  backgroundColor: "rgba(26,74,85,0.06)",
                                  border: doc.photo
                                    ? "1px solid rgba(26,74,85,0.1)"
                                    : "1px dashed rgba(26,74,85,0.25)",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                {doc.photo ? (
                                  <img
                                    src={doc.photo}
                                    alt={doc.name}
                                    loading="lazy"
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                      objectPosition:
                                        doc.photoPosition ?? "center top",
                                    }}
                                  />
                                ) : (
                                  <UserRound
                                    size={16}
                                    strokeWidth={1.5}
                                    color="rgba(26,74,85,0.5)"
                                  />
                                )}
                              </span>
                              <span
                                style={{
                                  fontFamily: "Inter, sans-serif",
                                  fontSize: 13.5,
                                  fontWeight: 500,
                                  color: DEEP_TEAL,
                                  lineHeight: 1.3,
                                }}
                              >
                                {doc.name}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: 13,
                          fontStyle: "italic",
                          color: "rgba(26,74,85,0.55)",
                          margin: 0,
                        }}
                      >
                        Especialista próximamente
                      </p>
                    )}
                  </div>
                </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <HomeFooter />
      <WhatsAppButton />
    </div>
  );
}
