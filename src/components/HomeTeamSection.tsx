import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { DOCTORS } from "@/data/doctors";

const DEEP_TEAL = "#1a4a55";
const GOLD = "#c69636";
const CREAM = "#f5f0e8";
const BRAND_TEAL = "#3d8b96";

const CARD_W = 272; // px — visible on desktop ~4.x cards, mobile ~1.2
const GAP = 16;

function NavButton({
  dir,
  onClick,
  disabled,
}: {
  dir: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "prev" ? "Anterior" : "Siguiente"}
      style={{
        width: 44,
        height: 44,
        border: `1px solid ${DEEP_TEAL}30`,
        background: disabled ? `${DEEP_TEAL}08` : DEEP_TEAL,
        color: disabled ? `${DEEP_TEAL}40` : CREAM,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: disabled ? "default" : "pointer",
        transition: "background 200ms ease, color 200ms ease",
        flexShrink: 0,
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        {dir === "prev" ? (
          <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  );
}

export default function HomeTeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); io.disconnect(); }
      },
      { threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const updateNav = () => {
    const s = sliderRef.current;
    if (!s) return;
    setCanPrev(s.scrollLeft > 8);
    setCanNext(s.scrollLeft < s.scrollWidth - s.clientWidth - 8);
  };

  useEffect(() => {
    const s = sliderRef.current;
    if (!s) return;
    s.addEventListener("scroll", updateNav, { passive: true });
    updateNav();
    return () => s.removeEventListener("scroll", updateNav);
  }, []);

  const scroll = (dir: "prev" | "next") => {
    const s = sliderRef.current;
    if (!s) return;
    s.scrollBy({ left: dir === "next" ? CARD_W + GAP : -(CARD_W + GAP), behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="equipo-home"
      data-section="home-team"
      style={{ backgroundColor: CREAM, overflow: "hidden" }}
    >
      {/* Hide scrollbar cross-browser */}
      <style>{`#team-slider::-webkit-scrollbar { display: none; }`}</style>

      <div
        style={{
          paddingTop: "clamp(64px, 8vw, 104px)",
          paddingBottom: "clamp(64px, 8vw, 104px)",
        }}
      >
        {/* Header */}
        <div
          className="mx-auto max-w-7xl flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
          style={{
            paddingLeft: "clamp(24px, 4vw, 64px)",
            paddingRight: "clamp(24px, 4vw, 64px)",
            marginBottom: "clamp(32px, 4vw, 48px)",
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
              <span style={{ color: GOLD }}>te van a tratar.</span>
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 20 }}>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "clamp(15px, 1.2vw, 17px)",
                lineHeight: 1.65,
                color: DEEP_TEAL,
                margin: 0,
                maxWidth: "38ch",
              }}
            >
              Especialistas en dolor intervencionista, ortopedia, reumatología,
              fisiatría y nutrición clínica.
            </p>
            {/* Nav + link row */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <NavButton dir="prev" onClick={() => scroll("prev")} disabled={!canPrev} />
              <NavButton dir="next" onClick={() => scroll("next")} disabled={!canNext} />
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
                  marginLeft: 4,
                }}
              >
                VER TODOS →
              </Link>
            </div>
          </div>
        </div>

        {/* Slider track — bleeds edge-to-edge on the left-padding side */}
        <div
          id="team-slider"
          ref={sliderRef}
          style={{
            display: "flex",
            gap: GAP,
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            scrollBehavior: "smooth",
            WebkitOverflowScrolling: "touch" as React.CSSProperties["WebkitOverflowScrolling"],
            msOverflowStyle: "none",
            scrollbarWidth: "none",
            paddingLeft: "clamp(24px, 4vw, 64px)",
            paddingRight: "clamp(24px, 4vw, 64px)",
            opacity: visible ? 1 : 0,
            transition: "opacity 700ms ease 100ms",
          }}
        >
          {DOCTORS.map((doc, i) => (
            <article
              key={doc.slug}
              style={{
                flexShrink: 0,
                width: CARD_W,
                scrollSnapAlign: "start",
                background: "#ffffff",
                border: `1px solid ${DEEP_TEAL}10`,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: `transform 600ms cubic-bezier(0.16,1,0.3,1) ${80 + i * 60}ms`,
              }}
            >
              {/* Index + text */}
              <div style={{ padding: "18px 18px 14px" }}>
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
                    fontSize: 16,
                    lineHeight: 1.25,
                    color: DEEP_TEAL,
                    margin: "0 0 5px",
                    letterSpacing: "-0.01em",
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

              {/* Photo area */}
              <div
                style={{
                  position: "relative",
                  height: 300,
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
                      background: `linear-gradient(135deg, ${BRAND_TEAL}18 0%, ${DEEP_TEAL}08 100%)`,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 700,
                        fontSize: 56,
                        color: `${DEEP_TEAL}25`,
                        letterSpacing: "0.05em",
                      }}
                    >
                      {doc.name.replace(/^(Dr\.|Dra\.|Lic\.)\s+/, "").split(" ").slice(0, 2).map(w => w[0]).join("")}
                    </span>
                  </div>
                )}

                {/* Gradient + CTA overlay */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: `linear-gradient(to top, ${DEEP_TEAL}dd 0%, transparent 100%)`,
                    padding: "40px 18px 18px",
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
                      padding: "9px 16px",
                    }}
                  >
                    VER PERFIL <span aria-hidden="true">→</span>
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
