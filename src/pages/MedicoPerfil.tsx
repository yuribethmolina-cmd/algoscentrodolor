import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, BadgeCheck, Calendar, Languages, MessageCircle, UserRound } from "lucide-react";
import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import SmartImage from "@/components/SmartImage";
import { getDoctorBySlug } from "@/data/doctors";
import { SPECIALTIES } from "@/data/specialties";
import { buildWhatsAppUrl, type VisitType } from "@/lib/whatsapp";

const DEEP_TEAL = "#1a4a55";
const BRAND_TEAL = "#3d8b96";
const GOLD = "#c69636";
const CREAM = "#f5f0e8";

function specialtyLabel(slug: string) {
  return SPECIALTIES.find((s) => s.slug === slug)?.name ?? slug;
}

export default function MedicoPerfil() {
  const { slug = "" } = useParams<{ slug: string }>();
  const doctor = getDoctorBySlug(slug);
  const [visitType, setVisitType] = useState<VisitType>("primera-vez");

  if (!doctor) {
    return <Navigate to="/equipo" replace />;
  }

  const firstName = doctor.name.split(" ").slice(0, 2).join(" ");
  const waHref = buildWhatsAppUrl({ doctor, visitType });

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      <main>
        {/* Header */}
        <section
          style={{
            backgroundColor: DEEP_TEAL,
            paddingTop: "clamp(96px, 12vw, 140px)",
            paddingBottom: "clamp(56px, 7vw, 96px)",
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
            <Link
              to="/equipo"
              className="inline-flex items-center gap-2 mb-8 opacity-80 hover:opacity-100 transition-opacity"
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: CREAM,
              }}
            >
              <ArrowLeft size={14} strokeWidth={2} />
              Volver al equipo
            </Link>

            <div className="grid gap-10 lg:grid-cols-[280px_1fr] lg:items-end">
              <div
                className="mx-auto lg:mx-0"
                style={{
                  width: "min(280px, 70vw)",
                  aspectRatio: "4 / 5",
                  overflow: "hidden",
                  border: `1px solid ${GOLD}55`,
                  background: "rgba(245,240,232,0.06)",
                  position: "relative",
                }}
              >
                {doctor.photo ? (
                  <SmartImage
                    picture={doctor.photo}
                    alt={doctor.name}
                    eager
                    className="w-full h-full"
                    style={{
                      objectFit: "cover",
                      objectPosition: doctor.photoPosition ?? "center top",
                    }}
                    sizes="280px"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-center px-6">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center"
                      style={{
                        background: "rgba(245,240,232,0.08)",
                        border: `1px dashed ${GOLD}66`,
                      }}
                    >
                      <UserRound size={36} strokeWidth={1.25} color={CREAM} opacity={0.5} />
                    </div>
                    <p
                      className="font-ui uppercase"
                      style={{
                        fontSize: 10,
                        letterSpacing: "0.28em",
                        color: CREAM,
                        opacity: 0.55,
                      }}
                    >
                      Fotografía próximamente
                    </p>
                  </div>
                )}
              </div>

              <div>
                <p
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    color: GOLD,
                    marginBottom: 16,
                  }}
                >
                  {specialtyLabel(doctor.specialtySlug)}
                </p>

                <h1
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontWeight: 650,
                    fontSize: "clamp(34px, 4.6vw, 60px)",
                    lineHeight: 1.05,
                    color: CREAM,
                    letterSpacing: "-0.035em",
                    marginBottom: 18,
                  }}
                >
                  {doctor.name}
                </h1>

                <p
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: "clamp(16px, 1.5vw, 19px)",
                    lineHeight: 1.55,
                    color: "rgba(245,240,232,0.85)",
                    maxWidth: "56ch",
                    marginBottom: 8,
                  }}
                >
                  {doctor.specialty}
                </p>

                {doctor.isDirector && (
                  <div
                    className="inline-flex items-center gap-2 mt-2"
                    style={{
                      padding: "6px 10px",
                      backgroundColor: "rgba(198,150,54,0.16)",
                      border: `1px solid ${GOLD}88`,
                    }}
                  >
                    <BadgeCheck size={14} color={GOLD} strokeWidth={2} />
                    <span
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: 11,
                        fontWeight: 800,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: CREAM,
                      }}
                    >
                      Equipo directivo
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Body */}
        <section
          style={{
            paddingTop: "clamp(56px, 7vw, 96px)",
            paddingBottom: "clamp(80px, 10vw, 128px)",
          }}
        >
          <div
            className="mx-auto grid gap-10 lg:grid-cols-[1.4fr_1fr]"
            style={{
              maxWidth: 1080,
              paddingLeft: "clamp(24px, 4vw, 48px)",
              paddingRight: "clamp(24px, 4vw, 48px)",
            }}
          >
            {/* Left: bio + credentials */}
            <div>
              <h2
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontWeight: 600,
                  fontSize: "clamp(22px, 2.2vw, 28px)",
                  lineHeight: 1.2,
                  color: DEEP_TEAL,
                  marginBottom: 16,
                  letterSpacing: "-0.02em",
                }}
              >
                Biografía
              </h2>
              {doctor.bio ? (
                <p
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: "clamp(16px, 1.4vw, 18px)",
                    lineHeight: 1.7,
                    color: DEEP_TEAL,
                    opacity: 0.85,
                    maxWidth: "62ch",
                  }}
                >
                  {doctor.bio}
                </p>
              ) : (
                <p
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: 15,
                    fontStyle: "italic",
                    color: DEEP_TEAL,
                    opacity: 0.6,
                  }}
                >
                  Biografía completa próximamente.
                </p>
              )}

              <div
                style={{
                  marginTop: 48,
                  paddingTop: 32,
                  borderTop: "1px solid rgba(26,74,85,0.15)",
                }}
              >
                <h2
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontWeight: 600,
                    fontSize: "clamp(22px, 2.2vw, 28px)",
                    lineHeight: 1.2,
                    color: DEEP_TEAL,
                    marginBottom: 20,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Credenciales
                </h2>
                {doctor.credentials && doctor.credentials.length > 0 ? (
                  <ul className="flex flex-col gap-3 list-none p-0 m-0">
                    {doctor.credentials.map((c) => (
                      <li
                        key={c}
                        className="flex items-start gap-3"
                        style={{
                          fontFamily: "'Manrope', sans-serif",
                          fontSize: 15,
                          lineHeight: 1.55,
                          color: DEEP_TEAL,
                        }}
                      >
                        <BadgeCheck
                          size={18}
                          color={BRAND_TEAL}
                          strokeWidth={2}
                          style={{ flexShrink: 0, marginTop: 2 }}
                        />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: 15,
                      fontStyle: "italic",
                      color: DEEP_TEAL,
                      opacity: 0.6,
                    }}
                  >
                    Credenciales completas próximamente.
                  </p>
                )}
              </div>

              {doctor.languages && doctor.languages.length > 0 && (
                <div
                  style={{
                    marginTop: 32,
                    paddingTop: 24,
                    borderTop: "1px solid rgba(26,74,85,0.15)",
                  }}
                  className="flex items-center gap-3"
                >
                  <Languages size={18} color={GOLD} strokeWidth={2} />
                  <p
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: 14,
                      color: DEEP_TEAL,
                      opacity: 0.85,
                      margin: 0,
                    }}
                  >
                    <span style={{ fontWeight: 700 }}>Idiomas:</span>{" "}
                    {doctor.languages.join(" · ")}
                  </p>
                </div>
              )}
            </div>

            {/* Right: schedule + CTA card */}
            <aside
              style={{
                background: "linear-gradient(160deg, #ffffff 0%, #fbf8f2 100%)",
                border: "1px solid rgba(26,74,85,0.12)",
                padding: "clamp(24px, 3vw, 32px)",
                boxShadow:
                  "0 1px 0 rgba(255,255,255,0.9) inset, 0 18px 40px -24px rgba(26,74,85,0.22)",
                alignSelf: "start",
                position: "relative",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: doctor.isDirector
                    ? "linear-gradient(90deg, #c69636 0%, #e8b95c 100%)"
                    : "linear-gradient(90deg, #3d8b96 0%, #5eb0bd 100%)",
                }}
              />

              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color: GOLD,
                  marginBottom: 14,
                }}
              >
                Horario de consulta
              </p>

              <div
                className="flex items-start gap-3"
                style={{
                  padding: "14px 14px",
                  background: "rgba(26,74,85,0.05)",
                  border: "1px solid rgba(26,74,85,0.08)",
                  marginBottom: 18,
                }}
              >
                <Calendar size={16} color={GOLD} strokeWidth={2} style={{ flexShrink: 0, marginTop: 2 }} />
                <p
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: 14,
                    lineHeight: 1.5,
                    color: DEEP_TEAL,
                    margin: 0,
                  }}
                >
                  {doctor.schedule}
                </p>
              </div>

              {doctor.note && (
                <p
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: 12,
                    fontStyle: "italic",
                    color: DEEP_TEAL,
                    opacity: 0.65,
                    marginBottom: 22,
                  }}
                >
                  {doctor.note}
                </p>
              )}

              {/* Visit type toggle */}
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: DEEP_TEAL,
                  opacity: 0.65,
                  marginBottom: 8,
                }}
              >
                Tipo de consulta
              </p>
              <div
                role="group"
                aria-label="Tipo de consulta"
                className="grid grid-cols-2 gap-0 mb-4"
                style={{ border: "1px solid rgba(26,74,85,0.15)" }}
              >
                {([
                  { value: "primera-vez", label: "Primera vez" },
                  { value: "seguimiento", label: "Seguimiento" },
                ] as const).map((opt) => {
                  const active = visitType === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setVisitType(opt.value)}
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: 12,
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        padding: "10px 12px",
                        backgroundColor: active ? DEEP_TEAL : "transparent",
                        color: active ? CREAM : DEEP_TEAL,
                        cursor: "pointer",
                        transition: "background-color 180ms ease, color 180ms ease",
                        border: "none",
                      }}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>

              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 transition-colors"
                style={{
                  gap: 10,
                  backgroundColor: BRAND_TEAL,
                  color: CREAM,
                  padding: "16px 22px",
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#4a9ca8")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = BRAND_TEAL)
                }
              >
                <MessageCircle size={16} strokeWidth={2} />
                Agendar por WhatsApp
              </a>

              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: 12,
                  color: DEEP_TEAL,
                  opacity: 0.65,
                  marginTop: 14,
                  textAlign: "center",
                }}
              >
                Consulta directa con {firstName}.
              </p>
            </aside>
          </div>
        </section>
      </main>

      <HomeFooter />
      <WhatsAppButton />
    </div>
  );
}
