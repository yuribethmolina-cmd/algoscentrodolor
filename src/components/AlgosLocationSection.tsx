import { useState, useEffect, useRef } from "react";
import algosFacade from "@/assets/algos-facade.webp.asset.json";
import { MapPin, Navigation, Clock, Phone, MessageCircle } from "lucide-react";
import { ALGOS } from "@/config/algos.config";
import { buildWhatsAppUrl, type VisitType } from "@/lib/whatsapp";

const CREAM = ALGOS.palette.cream;
const DEEP_TEAL = ALGOS.palette.deepTeal;
const GOLD = ALGOS.palette.gold;
const BRAND_TEAL = ALGOS.palette.brandTeal;

const MAPS_QUERY = ALGOS.location.mapsQuery;
const MAPS_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(MAPS_QUERY)}&z=16&output=embed`;
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAPS_QUERY)}`;

export default function AlgosLocationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mapVisible, setMapVisible] = useState(false);
  const [visitType, setVisitType] = useState<VisitType>("primera-vez");
  const waHref = buildWhatsAppUrl({ visitType });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMapVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="ubicacion"
      data-section="location"
      data-surface="dark"
      className="relative w-full"
      style={{ backgroundColor: DEEP_TEAL, color: CREAM }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
        {/* Section header */}
        <div className="mb-14 md:mb-20 max-w-3xl">
          <p
            className="mb-5"
            style={{
              fontFamily: "'Manrope', system-ui, sans-serif",
              fontSize: 11,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: CREAM,
              fontWeight: 600,
            }}
          >
            Encuéntranos
          </p>
          <h2
            className="font-display leading-[1.05]"
            style={{
              fontWeight: 300,
              fontSize: "clamp(32px, 4vw, 52px)",
              letterSpacing: "-0.02em",
              color: CREAM,
              margin: 0,
            }}
          >
            Nuestra sede en <span style={{ fontStyle: "italic", color: GOLD }}>Maracaibo</span>
          </h2>
          <p
            className="mt-5 max-w-xl"
            style={{
              fontFamily: "'Manrope', system-ui, sans-serif",
              fontSize: 15,
              lineHeight: 1.65,
              color: "rgba(245,240,232,0.72)",
            }}
          >
            Centro de Dolor Intervencionista en el CC América. Fácil acceso, estacionamiento
            propio y consultorios equipados para procedimientos guiados por imagen.
          </p>
        </div>

        {/* Split card: facade + map */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden"
          style={{
            border: "1px solid rgba(245,240,232,0.14)",
            borderRadius: 0,
            boxShadow: "0 30px 60px -30px rgba(0,0,0,0.55)",
            background: "linear-gradient(155deg, rgba(255,255,255,0.06) 0%, rgba(61,139,150,0.14) 100%)",
          }}
        >
          {/* Facade image, shimmer applied automatically by imageWatcher + index.css */}
          <div className="relative min-h-[320px] md:min-h-[420px] lg:min-h-[520px] overflow-hidden">
            <img
              src={algosFacade.url}
              alt="Fachada de ALGOS, Centro de Dolor Intervencionista, Maracaibo"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: "left center" }}
              loading="lazy"
              decoding="async"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, transparent 55%, rgba(19,79,92,0.75) 100%)",
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <p
                style={{
                  fontFamily: "'Manrope', system-ui, sans-serif",
                  fontSize: 10,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: GOLD,
                  fontWeight: 700,
                  marginBottom: 6,
                }}
              >
                Sede ALGOS
              </p>
              <p
                className="font-display"
                style={{
                  fontSize: "clamp(18px, 2vw, 22px)",
                  fontWeight: 400,
                  color: CREAM,
                  letterSpacing: "-0.01em",
                  margin: 0,
                }}
              >
                Maracaibo - frente a la facultad de medicina
              </p>
            </div>
          </div>

          {/* Map + details */}
          <div className="flex flex-col">
            <div className="relative w-full" style={{ aspectRatio: "16 / 11", minHeight: 260 }}>
              {mapVisible ? (
                <iframe
                  title="Ubicación de ALGOS en Google Maps"
                  src={MAPS_EMBED}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 0, filter: "grayscale(0.15) contrast(1.05)" }}
                />
              ) : (
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center gap-3 animate-pulse"
                  style={{ backgroundColor: "#1a4a55" }}
                >
                  <MapPin
                    className="w-7 h-7"
                    strokeWidth={1.25}
                    style={{ color: `${GOLD}66` }}
                  />
                  <p
                    style={{
                      fontFamily: "'Manrope', system-ui, sans-serif",
                      fontSize: 10,
                      letterSpacing: "0.28em",
                      textTransform: "uppercase",
                      color: "rgba(245,240,232,0.3)",
                    }}
                  >
                    Cargando mapa
                  </p>
                </div>
              )}
            </div>

            <div
              className="flex-1 grid grid-cols-1 sm:grid-cols-2"
              style={{
                fontFamily: "'Manrope', system-ui, sans-serif",
                color: CREAM,
              }}
            >
              {[
                {
                  icon: MapPin,
                  label: "Dirección",
                  value: (
                    <>
                      Av. 20 con Calle 65, N° 65-02<br />
                      <span style={{ color: "rgba(245,240,232,0.65)" }}>
                        C.C. América, Local 4 · Sector Paraíso, Maracaibo 4001
                      </span>
                    </>
                  ),
                },
                {
                  icon: Clock,
                  label: "Horario",
                  value: (
                    <>
                      Lunes a viernes · 7:00 AM - 4:00 PM
                    </>
                  ),
                },
                {
                  icon: Phone,
                  label: "Teléfono",
                  value: (
                    <a href={`tel:+${ALGOS.contact.whatsappNumber}`} style={{ color: CREAM, textDecoration: "none" }}>
                      {ALGOS.contact.whatsappDisplayIntl}
                    </a>
                  ),
                },
                {
                  icon: Navigation,
                  label: "Cómo llegar",
                  value: (
                    <a
                      href={MAPS_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: CREAM,
                        textDecoration: "none",
                        borderBottom: `1px solid ${GOLD}`,
                        paddingBottom: 1,
                      }}
                    >
                      Abrir en Google Maps →
                    </a>
                  ),
                },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="p-6 md:p-7"
                  style={{
                    borderTop: "1px solid rgba(245,240,232,0.10)",
                    borderRight: "1px solid rgba(245,240,232,0.10)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="w-3.5 h-3.5" strokeWidth={1.75} style={{ color: GOLD }} />
                    <span
                      style={{
                        fontSize: 10,
                        letterSpacing: "0.24em",
                        textTransform: "uppercase",
                        fontWeight: 700,
                        color: GOLD,
                      }}
                    >
                      {label}
                    </span>
                  </div>
                  <div style={{ fontSize: 14, lineHeight: 1.55 }}>{value}</div>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <div
              className="p-6 md:p-7"
              style={{
                borderTop: "1px solid rgba(245,240,232,0.10)",
                fontFamily: "'Manrope', system-ui, sans-serif",
              }}
            >
              <p
                className="mb-4"
                style={{
                  fontSize: 10,
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  color: GOLD,
                }}
              >
                Agende por WhatsApp
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <div
                  className="inline-flex"
                  role="group"
                  aria-label="Tipo de consulta"
                  style={{ border: `1px solid rgba(245,240,232,0.2)` }}
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
                        className="transition-colors"
                        style={{
                          fontFamily: "'Manrope', system-ui, sans-serif",
                          fontSize: 12,
                          fontWeight: 700,
                          letterSpacing: "0.12em",
                          padding: "10px 14px",
                          backgroundColor: active ? CREAM : "transparent",
                          color: active ? DEEP_TEAL : CREAM,
                          cursor: "pointer",
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
                  className="inline-flex items-center justify-center gap-2 transition-colors"
                  style={{
                    backgroundColor: BRAND_TEAL,
                    color: CREAM,
                    padding: "12px 20px",
                    fontSize: 12,
                    fontWeight: 800,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = ALGOS.palette.brandTealHover)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = BRAND_TEAL)
                  }
                >
                  <MessageCircle size={16} strokeWidth={2} />
                  Escribir por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
