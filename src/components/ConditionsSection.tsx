import { useState } from "react";
import { useInViewOnce } from "@/lib/animations";
import lumbarAsset from "@/assets/cond-lumbar.jpg.asset.json";
import cervicalAsset from "@/assets/cond-cervical.jpg.asset.json";
import rodillaAsset from "@/assets/cond-rodilla.jpg.asset.json";
import cabezaAsset from "@/assets/cond-cabeza.jpg.asset.json";
import neuropatiaAsset from "@/assets/cond-neuropatia.jpg.asset.json";
import cirugiaAsset from "@/assets/cond-cirugia-fallida.jpg.asset.json";
import diabetesAsset from "@/assets/neuropatia-diabetica-pies.jpg.asset.json";
import otroAsset from "@/assets/cond-otro.jpg.asset.json";

const DEEP_TEAL = "#1a4a55";
const TEAL = "#3d8b96";
const GOLD = "#c69636";
const CREAM = "#f5f0e8";

interface PainCard {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
}

const painCards: PainCard[] = [
  {
    id: 1,
    title: "DOLOR DE ESPALDA",
    description:
      "Puede venir de los discos, los nervios o las articulaciones de la columna. Es tratable en la mayoría de los casos sin cirugía.",
    tags: ["Hernia discal", "Ciática", "Desgaste de columna", "Dolor muscular"],
    image: lumbarAsset.url,
  },
  {
    id: 2,
    title: "DOLOR DE CUELLO",
    description:
      "La tensión, el desgaste o una hernia en la columna cervical pueden irradiar dolor hacia el hombro o el brazo.",
    tags: ["Cervicalgia", "Hernia cervical", "Dolor de hombro"],
    image: cervicalAsset.url,
  },
  {
    id: 3,
    title: "DOLOR DE RODILLA",
    description:
      "El desgaste del cartílago o la inflamación articular generan dolor que limita caminar y subir escaleras.",
    tags: ["Artrosis", "Desgaste articular", "Inflamación"],
    image: rodillaAsset.url,
  },
  {
    id: 4,
    title: "DOLOR DE CABEZA",
    description:
      "Algunos dolores de cabeza vienen del cuello, no del cerebro. Tienen tratamiento específico y efectivo.",
    tags: ["Cefalea cervicogénica", "Neuralgia occipital"],
    image: cabezaAsset.url,
  },
  {
    id: 5,
    title: "HORMIGUEO O ADORMECIMIENTO",
    description:
      "Cuando un nervio está comprimido o dañado, manda señales de dolor, quemazón o pérdida de sensibilidad.",
    tags: ["Neuropatía", "Túnel carpiano", "Compresión nerviosa"],
    image: neuropatiaAsset.url,
  },
  {
    id: 6,
    title: "DOLOR TRAS UNA OPERACIÓN",
    description:
      "Si operaron y el dolor sigue ahí, hay opciones. No es normal vivir con dolor después de una cirugía.",
    tags: ["Cirugía fallida de columna", "Dolor residual"],
    image: cirugiaAsset.url,
  },
  {
    id: 7,
    title: "DOLOR POR DIABETES",
    description:
      "La diabetes daña los nervios con el tiempo. Ese dolor tiene nombre y tiene tratamiento.",
    tags: ["Neuropatía diabética", "Dolor en pies", "Hormigueo"],
    image: diabetesAsset.url,
  },
  {
    id: 8,
    title: "OTRO TIPO DE DOLOR",
    description:
      "Si tiene dolor que no cede y no sabe de dónde viene, eso es exactamente para lo que estamos. Escríbanos.",
    tags: [],
    image: otroAsset.url,
  },
];

const WHATSAPP_URL = "https://wa.me/584146807886";

export default function ConditionsSection() {
  const [openId, setOpenId] = useState<number | null>(null);
  const { ref: headerRef, inView: headerIn } = useInViewOnce<HTMLDivElement>(0.12);
  const { ref: gridRef, inView: gridIn } = useInViewOnce<HTMLDivElement>(0.08);
  const { ref: ctaRef, inView: ctaIn } = useInViewOnce<HTMLDivElement>(0.12);

  const toggleCard = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      data-surface="dark"
      style={{
        backgroundColor: DEEP_TEAL,
        paddingTop: "clamp(80px, 10vw, 128px)",
        paddingBottom: "clamp(80px, 10vw, 128px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient glows */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "12%",
          right: "-10%",
          width: 480,
          height: 480,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${GOLD}18 0%, transparent 70%)`,
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "6%",
          left: "-8%",
          width: 420,
          height: 420,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${TEAL}30 0%, transparent 70%)`,
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      <div
        className="mx-auto"
        style={{
          maxWidth: 1080,
          paddingLeft: "clamp(24px, 4vw, 48px)",
          paddingRight: "clamp(24px, 4vw, 48px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div
          ref={headerRef}
          style={{
            marginBottom: "clamp(48px, 6vw, 72px)",
            opacity: headerIn ? 1 : 0,
            transform: headerIn ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(0.23,1,0.32,1)",
          }}
        >
          <p
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: CREAM,
              marginBottom: 20,
            }}
          >
            LO QUE TRATAMOS
          </p>
          <h2
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 600,
              fontSize: "clamp(32px, 4.2vw, 56px)",
              lineHeight: 1.15,
              color: CREAM,
              letterSpacing: "-0.03em",
            }}
          >
            ¿Dónde le duele?
          </h2>
          <p
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: "clamp(15px, 1.5vw, 18px)",
              lineHeight: 1.6,
              color: "rgba(245,240,232,0.75)",
              marginTop: 20,
              maxWidth: 640,
            }}
          >
            No importa qué tipo de dolor sea ni cuánto tiempo lleve con él. Haga
            clic en la zona que le molesta.
          </p>
        </div>

        {/* Cards Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-start"
          style={{ gap: "clamp(12px, 1.5vw, 16px)" }}
        >
          {painCards.map((card, idx) => {
            const isOpen = openId === card.id;
            return (
              <button
                key={card.id}
                onClick={() => toggleCard(card.id)}
                className="group"
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  minHeight: isOpen ? 200 : 180,
                  textAlign: "left",
                  background: DEEP_TEAL,
                  overflow: "hidden",
                  border: isOpen
                    ? `1px solid ${GOLD}`
                    : "1px solid rgba(245,240,232,0.14)",
                  borderRadius: 0,
                  padding: "clamp(20px, 2vw, 24px)",
                  cursor: "pointer",
                  boxShadow: isOpen
                    ? `0 1px 0 rgba(245,240,232,0.10) inset, 0 24px 50px -28px rgba(198,150,54,0.6)`
                    : `0 1px 0 rgba(245,240,232,0.08) inset, 0 18px 34px -24px rgba(0,0,0,0.4)`,
                  opacity: gridIn ? 1 : 0,
                  transform: gridIn ? "translateY(0)" : "translateY(16px)",
                  transition: `
                    opacity 0.5s ease ${idx * 60}ms,
                    transform 0.5s cubic-bezier(0.23,1,0.32,1) ${idx * 60}ms,
                    border-color 250ms ease,
                    box-shadow 250ms ease
                  `,
                }}
                onMouseEnter={(e) => {
                  if (!isOpen) {
                    e.currentTarget.style.borderColor = "rgba(245,240,232,0.28)";
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isOpen) {
                    e.currentTarget.style.borderColor = "rgba(245,240,232,0.14)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }
                }}
              >
                {/* Background image */}
                <img
                  src={card.image}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: isOpen ? 0.28 : 0.35,
                    transition: "opacity 300ms ease, transform 600ms ease",
                    transform: "scale(1.02)",
                    pointerEvents: "none",
                  }}
                />
                {/* Legibility overlay */}
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: isOpen
                      ? `linear-gradient(155deg, rgba(26,74,85,0.72) 0%, rgba(26,74,85,0.85) 100%), linear-gradient(180deg, rgba(198,150,54,0.15) 0%, rgba(198,150,54,0.05) 100%)`
                      : `linear-gradient(180deg, rgba(26,74,85,0.55) 0%, rgba(26,74,85,0.82) 100%)`,
                    pointerEvents: "none",
                    transition: "background 250ms ease",
                  }}
                />

                {/* Numbered index */}
                <div
                  style={{
                    position: "relative",
                    zIndex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 14,
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: 26,
                      height: 26,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: `1.5px solid ${isOpen ? GOLD : "rgba(245,240,232,0.50)"}`,
                      color: isOpen ? GOLD : "rgba(245,240,232,0.6)",
                      fontSize: 14,
                      fontWeight: 300,
                      lineHeight: 1,
                      flexShrink: 0,
                      transition: "border-color 200ms ease, color 200ms ease, transform 250ms cubic-bezier(0.22,1,0.36,1)",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    +
                  </span>
                </div>

                {/* Card Title */}
                <h3
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontSize: "clamp(16px, 1.4vw, 19px)",
                    fontWeight: 600,
                    lineHeight: 1.25,
                    color: CREAM,
                    letterSpacing: "-0.01em",
                    textWrap: "balance",
                    margin: 0,
                  }}
                >
                  {card.title}
                </h3>

                {/* Expanded Content */}
                <div
                  style={{
                    maxHeight: isOpen ? 600 : 0,
                    opacity: isOpen ? 1 : 0,
                    overflow: "hidden",
                    transition: "max-height 400ms ease, opacity 300ms ease",
                  }}
                >
                  <div style={{ paddingTop: 16 }}>
                    <p
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: 14,
                        lineHeight: 1.6,
                        color: "rgba(245,240,232,0.75)",
                        marginBottom: 16,
                        textWrap: "pretty",
                      }}
                    >
                      {card.description}
                    </p>

                    {/* Tags */}
                    {card.tags.length > 0 && (
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 8,
                          marginBottom: 20,
                        }}
                      >
                        {card.tags.map((tag) => (
                          <span
                            key={tag}
                            style={{
                              fontFamily: "'Manrope', sans-serif",
                              fontSize: 12,
                              fontWeight: 500,
                              color: CREAM,
                              backgroundColor: "rgba(61,139,150,0.2)",
                              border: `1px solid ${TEAL}`,
                              borderRadius: 0,
                              padding: "4px 10px",
                              lineHeight: 1.4,
                              whiteSpace: "nowrap",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* WhatsApp CTA */}
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: 13,
                        fontWeight: 600,
                        color: CREAM,
                        backgroundColor: TEAL,
                        borderRadius: 0,
                        padding: "10px 18px",
                        textDecoration: "none",
                        transition: "background-color 200ms ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#327a84")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = TEAL)
                      }
                    >
                      Agendar consulta
                      <span style={{ fontSize: 14 }}>→</span>
                    </a>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div
          ref={ctaRef}
          style={{
            marginTop: "clamp(40px, 5vw, 56px)",
            paddingTop: "clamp(28px, 3vw, 36px)",
            borderTop: "1px solid rgba(245,240,232,0.10)",
            opacity: ctaIn ? 1 : 0,
            transform: ctaIn ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease, transform 0.6s cubic-bezier(0.23,1,0.32,1)",
          }}
        >
          <p
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: "clamp(15px, 1.5vw, 18px)",
              lineHeight: 1.6,
              color: "rgba(245,240,232,0.75)",
              marginBottom: 12,
            }}
          >
            ¿No ve su dolor aquí? Igual podemos ayudarle.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 13,
              fontWeight: 600,
              color: CREAM,
              textDecoration: "none",
              letterSpacing: "0.04em",
              transition: "color 200ms ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "#d4a84a")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = GOLD)
            }
          >
            Escribir por WhatsApp →
          </a>
        </div>
      </div>
    </section>
  );
}
