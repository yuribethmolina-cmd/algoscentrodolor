import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ALGOS } from "@/config/algos.config";
import { DOCTORS } from "@/data/doctors";

const DEEP_TEAL = "#1a4a55";
const GOLD = "#c69636";
const CREAM = "#f5f0e8";
const BRAND_TEAL = "#3d8b96";

// Feature the 4 doctors with photos who best represent the clinic
const FEATURED_SLUGS = [
  "dr-atilio-rodriguez",
  "dr-antulio-parra",
  "dra-leslie-ramirez",
  "dra-doris-meneses",
];

const featured = FEATURED_SLUGS.map((slug) =>
  DOCTORS.find((d) => d.slug === slug)
).filter(Boolean) as (typeof DOCTORS)[number][];

export default function HomeTeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="equipo-home"
      data-section="home-team"
      style={{ backgroundColor: CREAM, overflow: "hidden" }}
    >
      <div
        className="mx-auto max-w-7xl"
        style={{ padding: "clamp(64px, 8vw, 104px) clamp(24px, 4vw, 64px)" }}
      >
        {/* Header — two-column like ESINY */}
        <div
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
          style={{
            marginBottom: "clamp(40px, 5vw, 64px)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 600ms ease, transform 600ms cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: BRAND_TEAL,
                marginBottom: 14,
              }}
            >
              NUESTRO EQUIPO
            </p>
            <h2
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(28px, 3.4vw, 48px)",
                lineHeight: 1.1,
                letterSpacing: "-0.024em",
                color: DEEP_TEAL,
                margin: 0,
                maxWidth: "16ch",
              }}
            >
              Conoce a quienes{" "}
              <em style={{ color: GOLD, fontStyle: "normal" }}>te van a tratar.</em>
            </h2>
          </div>

          <div style={{ maxWidth: "38ch" }}>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "clamp(15px, 1.2vw, 17px)",
                lineHeight: 1.65,
                color: DEEP_TEAL,
                margin: "0 0 20px",
              }}
            >
              Especialistas en dolor intervencionista, ortopedia, reumatología,
              fisiatría y nutrición clínica. Un equipo, un criterio clínico.
            </p>
            <Link
              to="/equipo"
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: DEEP_TEAL,
                textDecoration: "none",
                borderBottom: `1px solid ${DEEP_TEAL}40`,
                paddingBottom: 2,
              }}
            >
              VER TODO EL EQUIPO →
            </Link>
          </div>
        </div>

        {/* 4-card grid — ESINY style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featured.map((doc, i) => (
            <article
              key={doc.slug}
              style={{
                position: "relative",
                background: "#ffffff",
                border: `1px solid ${DEEP_TEAL}10`,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(32px)",
                transition: `opacity 550ms ease ${100 + i * 100}ms, transform 600ms cubic-bezier(0.16,1,0.3,1) ${100 + i * 100}ms`,
              }}
            >
              {/* Index + name block */}
              <div style={{ padding: "20px 20px 16px" }}>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 700,
                    fontSize: 11,
                    letterSpacing: "0.28em",
                    color: BRAND_TEAL,
                    display: "block",
                    marginBottom: 8,
                  }}
                >
                  /{String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(16px, 1.3vw, 19px)",
                    lineHeight: 1.2,
                    color: DEEP_TEAL,
                    margin: "0 0 6px",
                    letterSpacing: "-0.015em",
                  }}
                >
                  {doc.name}
                </h3>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 13,
                    fontWeight: 500,
                    color: BRAND_TEAL,
                    margin: 0,
                    lineHeight: 1.4,
                  }}
                >
                  {doc.specialty.split(" · ")[0]}
                </p>
              </div>

              {/* Photo — fills remaining height */}
              <div
                style={{
                  position: "relative",
                  flex: 1,
                  minHeight: "clamp(260px, 28vw, 360px)",
                  background: `${DEEP_TEAL}08`,
                  overflow: "hidden",
                }}
              >
                {doc.photoSrc ? (
                  <img
                    src={doc.photoSrc}
                    alt={doc.name}
                    loading="lazy"
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center top",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: `linear-gradient(135deg, ${BRAND_TEAL}20 0%, ${DEEP_TEAL}10 100%)`,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 700,
                        fontSize: 48,
                        color: `${DEEP_TEAL}30`,
                        letterSpacing: "0.05em",
                      }}
                    >
                      {doc.name.replace(/^(Dr\.|Dra\.|Lic\.)\s+/, "").split(" ").slice(0, 2).map(w => w[0]).join("")}
                    </span>
                  </div>
                )}

                {/* Bottom gradient + CTA — overlaps photo */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: `linear-gradient(to top, ${DEEP_TEAL}e0 0%, transparent 100%)`,
                    padding: "32px 20px 20px",
                  }}
                >
                  <Link
                    to={`/equipo/${doc.slug}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 700,
                      fontSize: 11,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: CREAM,
                      textDecoration: "none",
                      background: BRAND_TEAL,
                      padding: "10px 18px",
                    }}
                  >
                    VER PERFIL
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
