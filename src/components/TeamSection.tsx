import { useInViewOnce } from "@/lib/animations";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ALGOS } from "@/config/algos.config";
import { DOCTORS } from "@/data/doctors";

const CREAM = ALGOS.palette.cream;
const DEEP_TEAL = ALGOS.palette.deepTeal;
const BRAND_TEAL = ALGOS.palette.brandTeal;
const GOLD = ALGOS.palette.gold;

function getInitials(name: string) {
  return name
    .split(" ")
    .filter((n) => n.length > 0 && n[0] === n[0].toUpperCase())
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
}

export default function TeamSection() {
  const { ref: headerRef, inView: headerIn } = useInViewOnce<HTMLDivElement>(0.12);
  const { ref: gridRef, inView: gridIn } = useInViewOnce<HTMLDivElement>(0.08);

  return (
    <section
      id="equipo"
      data-section="team"
      style={{
        backgroundColor: CREAM,
        paddingTop: "clamp(80px, 10vw, 128px)",
        paddingBottom: "clamp(80px, 10vw, 128px)",
      }}
    >
      <div
        className="mx-auto"
        style={{
          maxWidth: 1120,
          paddingLeft: "clamp(24px, 4vw, 48px)",
          paddingRight: "clamp(24px, 4vw, 48px)",
        }}
      >
        {/* Header */}
        <div
          ref={headerRef}
          className={`scroll-reveal ${headerIn ? "revealed" : ""}`}
          style={{ marginBottom: "clamp(48px, 6vw, 72px)" }}
        >
          <p
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: BRAND_TEAL,
              marginBottom: 20,
            }}
          >
            NUESTRO EQUIPO
          </p>
          <h2
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 600,
              fontSize: "clamp(32px, 4.2vw, 56px)",
              lineHeight: 1.15,
              color: DEEP_TEAL,
              marginBottom: 20,
            }}
          >
            Médicos que lo escuchan y lo tratan.
          </h2>
          <p
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: "clamp(17px, 1.6vw, 20px)",
              lineHeight: 1.7,
              color: DEEP_TEAL,
              opacity: 0.75,
              maxWidth: "62ch",
            }}
          >
            En ALGOS su caso no lo ve un solo médico. Cada paciente recorre una
            ruta donde distintas especialidades colaboran, el mismo equipo,
            informado de su caso desde el inicio.
          </p>
        </div>

        {/* Team grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          style={{ gap: "clamp(16px, 2vw, 24px)" }}
        >
          {DOCTORS.map((doc, i) => {
            const hasPhoto = doc.photo && doc.photo.img.src;
            const isDirector = doc.isDirector;
            return (
              <article
                key={doc.slug}
                className={`scroll-reveal group ${gridIn ? "revealed" : ""}`}
                style={{
                  transitionDelay: `${i * 60}ms`,
                  position: "relative",
                  background: "#ffffff",
                  borderRadius: 20,
                  overflow: "hidden",
                  boxShadow: "0 4px 24px -8px rgba(26,74,85,0.12)",
                  transition: "transform 500ms cubic-bezier(0.23,1,0.32,1), box-shadow 300ms ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = "0 16px 44px -14px rgba(26,74,85,0.22)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 24px -8px rgba(26,74,85,0.12)";
                }}
              >
                {/* Top accent bar */}
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: isDirector
                      ? `linear-gradient(90deg, ${GOLD} 0%, #e8b95c 100%)`
                      : `linear-gradient(90deg, ${BRAND_TEAL} 0%, #5eb0bd 100%)`,
                    zIndex: 2,
                  }}
                />

                {/* Photo area */}
                <div
                  style={{
                    height: 220,
                    background: hasPhoto
                      ? "#ffffff"
                      : isDirector
                        ? `linear-gradient(135deg, ${DEEP_TEAL} 0%, ${BRAND_TEAL} 100%)`
                        : `linear-gradient(135deg, ${BRAND_TEAL} 0%, #5eb0bd 100%)`,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {hasPhoto ? (
                    <img
                      src={doc.photo!.img.src}
                      alt={`Foto de ${doc.name}`}
                      width={doc.photo!.img.w}
                      height={doc.photo!.img.h}
                      loading={isDirector ? "eager" : "lazy"}
                      decoding="async"
                      className="w-full h-full object-cover"
                      style={{
                        objectPosition: doc.photoPosition || "center top",
                        transition: "transform 700ms ease",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLImageElement).style.transform = "scale(1.05)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span
                        style={{
                          fontFamily: "'Sora', sans-serif",
                          fontSize: 48,
                          fontWeight: 700,
                          color: CREAM,
                          opacity: 0.35,
                        }}
                      >
                        {getInitials(doc.name)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div style={{ padding: "24px 22px 22px" }}>
                  <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
                    {isDirector ? (
                      <span
                        style={{
                          fontFamily: "'Manrope', sans-serif",
                          fontSize: 10,
                          fontWeight: 700,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: GOLD,
                          padding: "4px 10px",
                          border: `1px solid ${GOLD}`,
                        }}
                      >
                        Director
                      </span>
                    ) : (
                      <span aria-hidden />
                    )}
                  </div>

                  <h3
                    style={{
                      fontFamily: "'Sora', sans-serif",
                      fontSize: 17,
                      fontWeight: 600,
                      color: DEEP_TEAL,
                      lineHeight: 1.25,
                      margin: 0,
                      marginBottom: 6,
                    }}
                  >
                    {doc.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: 13,
                      fontWeight: 500,
                      color: BRAND_TEAL,
                      lineHeight: 1.4,
                      margin: 0,
                      marginBottom: 16,
                    }}
                  >
                    {doc.specialty}
                  </p>

                  {/* Schedule */}
                  <div
                    className="flex items-center gap-2"
                    style={{
                      padding: "10px 12px",
                      background: "rgba(26,74,85,0.05)",
                      borderRadius: 8,
                      marginBottom: 16,
                    }}
                  >
                    <Calendar size={13} color={GOLD} strokeWidth={2} style={{ flexShrink: 0 }} />
                    <p
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: 11,
                        color: DEEP_TEAL,
                        opacity: 0.8,
                        lineHeight: 1.35,
                        margin: 0,
                      }}
                    >
                      {doc.schedule}
                    </p>
                  </div>

                  {/* CTA */}
                  <Link
                    to={`/equipo/${doc.slug}`}
                    className="inline-flex items-center gap-2 font-ui font-semibold"
                    style={{
                      fontSize: 12,
                      color: BRAND_TEAL,
                      textDecoration: "none",
                      transition: "color 200ms ease, gap 200ms ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = GOLD;
                      e.currentTarget.style.gap = "10px";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = BRAND_TEAL;
                      e.currentTarget.style.gap = "8px";
                    }}
                  >
                    <span>Ver perfil</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div
          className="scroll-reveal"
          style={{
            marginTop: "clamp(48px, 6vw, 64px)",
            textAlign: "center",
          }}
        >
          <a
            href={ALGOS.contact.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-ui font-semibold"
            style={{
              fontSize: 15,
              color: BRAND_TEAL,
              textDecoration: "none",
              transition: "color 200ms ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
            onMouseLeave={(e) => (e.currentTarget.style.color = BRAND_TEAL)}
          >
            Agendar consulta con un especialista →
          </a>
        </div>
      </div>
    </section>
  );
}
