import { useState, useRef, useEffect } from "react";
import { ALGOS } from "@/config/algos.config";
import dolorEspalda from "@/assets/dolor-espalda-1.png";
import procedimientoFluoroscopiaAsset from "@/assets/procedimiento-fluoroscopia.png.asset.json";
const aboutProcedure = procedimientoFluoroscopiaAsset.url;

const DEEP_TEAL = "#1a4a55";
const GOLD = "#c69636";
const CREAM = "#f5f0e8";
const BRAND_TEAL = "#3d8b96";

type Tab = "dolor" | "tratamos";

const PAIN_ZONES = [
  { label: "CABEZA Y CUELLO",   top: "12%", left: "58%" },
  { label: "HOMBROS",           top: "26%", left: "44%" },
  { label: "ESPALDA ALTA",      top: "40%", left: "74%" },
  { label: "LUMBAR Y CIÁTICA",  top: "58%", left: "52%" },
  { label: "CADERA Y SACRO",    top: "74%", left: "70%" },
  { label: "DOLOR CRÓNICO",     top: "87%", left: "48%" },
];

const BENEFITS = [
  { label: "Sin hospitalización",  top: "18%", left: "70%" },
  { label: "Guiado por imagen",    top: "35%", left: "22%" },
  { label: "Sin cirugía abierta",  top: "52%", left: "62%" },
  { label: "Recuperación en 24h",  top: "67%", left: "78%" },
  { label: "Diagnóstico preciso",  top: "80%", left: "30%" },
];

type Annotation = { label: string; top: string; left: string };

const EXTRA_CONDITIONS = [
  {
    label: "Lesiones deportivas",
    sub: "Tendones, articulaciones y ligamentos",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        {/* Lightning bolt — energía / impacto deportivo */}
        <path
          d="M13 2L5.5 12.5H10.5L9 20L17 9H12L13 2Z"
          fill="currentColor"
          opacity="0.18"
        />
        <path
          d="M13 2L5.5 12.5H10.5L9 20L17 9H12L13 2Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Cuidados paliativos",
    sub: "Dolor por enfermedad avanzada o terminal",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        {/* Corazón con línea de pulso — cuidado médico */}
        <path
          d="M11 19C11 19 3 13.5 3 8.5A4 4 0 0 1 11 7a4 4 0 0 1 8 1.5C19 13.5 11 19 11 19Z"
          fill="currentColor"
          opacity="0.15"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* EKG pulse */}
        <path
          d="M6.5 11.5h2l1.5-2.5 2 5 1.5-2.5H16"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Neuropatía diabética",
    sub: "Ardor y dolor en pies y extremidades",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        {/* Pie + señal nerviosa */}
        <path
          d="M8 3 Q7 2 8.5 2 Q10 2 10 3.5 L10 12 Q10 15 13 15.5 Q16.5 16 16.5 13.5 Q16.5 11.5 14 11 L10 11"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="currentColor"
          fillOpacity="0.1"
        />
        {/* Nerve zigzag signal below foot */}
        <path
          d="M4 18 l2-2.5 l2 3.5 l1.5-2.5 l1.5 2"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

function AnnotatedPanel({
  src,
  alt,
  annotations,
  visible,
}: {
  src: string;
  alt: string;
  annotations: Annotation[];
  visible: boolean;
}) {
  return (
    <>
      <img
        src={src}
        alt={alt}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center top",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(to right, ${CREAM}50 0%, transparent 18%)`,
          pointerEvents: "none",
        }}
      />
      {annotations.map((ann, i) => (
        <div
          key={ann.label}
          style={{
            position: "absolute",
            top: ann.top,
            left: ann.left,
            transform: visible
              ? "translate(-50%, -50%)"
              : "translate(-50%, calc(-50% + 8px))",
            opacity: visible ? 1 : 0,
            transition: `opacity 450ms ease ${i * 240}ms, transform 500ms cubic-bezier(0.16,1,0.3,1) ${i * 240}ms`,
            display: "flex",
            alignItems: "center",
            gap: 7,
            zIndex: 10,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: BRAND_TEAL,
              border: "2px solid white",
              boxShadow: `0 0 0 3px ${BRAND_TEAL}44`,
              flexShrink: 0,
            }}
          />
          <div
            style={{
              background: "rgba(255,255,255,0.94)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              borderRadius: 2,
              padding: "6px 12px",
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: DEEP_TEAL,
              whiteSpace: "nowrap",
              boxShadow: "0 2px 12px rgba(26,74,85,0.18)",
            }}
          >
            {ann.label}
          </div>
        </div>
      ))}
    </>
  );
}

export default function PainTabSection() {
  const [activeTab, setActiveTab] = useState<Tab>("dolor");
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
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const handleTabChange = (tab: Tab) => {
    if (tab === activeTab) return;
    setVisible(false);
    setActiveTab(tab);
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: "dolor",    label: "DÓNDE LE DUELE" },
    { id: "tratamos", label: "CÓMO LO TRATAMOS" },
  ];

  return (
    <section ref={sectionRef} data-section="pain-tab" style={{ backgroundColor: CREAM }}>

      {/* Tab bar */}
      <div style={{ borderBottom: `1px solid ${DEEP_TEAL}18` }}>
        <div
          className="mx-auto max-w-7xl flex"
          style={{ paddingLeft: "clamp(24px, 4vw, 64px)" }}
        >
          {tabs.map(({ id, label }) => {
            const active = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => handleTabChange(id)}
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: 11,
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color: active ? DEEP_TEAL : `${DEEP_TEAL}50`,
                  background: "transparent",
                  border: "none",
                  borderBottom: active
                    ? `2px solid ${BRAND_TEAL}`
                    : "2px solid transparent",
                  padding: "20px 32px 18px",
                  marginBottom: "-1px",
                  cursor: "pointer",
                  transition: "color 200ms ease, border-color 200ms ease",
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div
        className="mx-auto max-w-7xl flex flex-col md:flex-row"
        style={{ minHeight: "clamp(480px, 58vw, 660px)" }}
      >
        {/* LEFT: text */}
        <div
          className="flex flex-col justify-center order-2 md:order-1"
          style={{
            flex: "0 0 38%",
            padding: "clamp(48px, 7vw, 88px) clamp(24px, 4vw, 56px)",
          }}
        >
          {activeTab === "dolor" ? (
            <>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: BRAND_TEAL,
                  marginBottom: 20,
                }}
              >
                LO QUE PUEDE DOLER
              </p>
              <h2
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(28px, 3.2vw, 48px)",
                  lineHeight: 1.14,
                  color: DEEP_TEAL,
                  letterSpacing: "-0.022em",
                  marginBottom: 20,
                }}
              >
                Todo lo que te puede{" "}
                <em style={{ color: GOLD, fontStyle: "italic" }}>doler.</em>
              </h2>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "clamp(14px, 1.15vw, 16px)",
                  lineHeight: 1.74,
                  color: `${DEEP_TEAL}bb`,
                  marginBottom: 36,
                }}
              >
                El dolor no siempre se ve, pero siempre merece cuidado.
                Tratamos dolores musculoesqueléticos, neuropatías, cefaleas y
                dolor causado por enfermedades crónicas o degenerativas.
              </p>
            </>
          ) : (
            <>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: BRAND_TEAL,
                  marginBottom: 20,
                }}
              >
                POR QUÉ ALGOS
              </p>
              <h2
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(28px, 3.2vw, 48px)",
                  lineHeight: 1.14,
                  color: DEEP_TEAL,
                  letterSpacing: "-0.022em",
                  marginBottom: 20,
                }}
              >
                El dolor crónico se maneja.{" "}
                <em style={{ color: GOLD, fontStyle: "italic" }}>
                  No se abandona.
                </em>
              </h2>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "clamp(14px, 1.15vw, 16px)",
                  lineHeight: 1.74,
                  color: `${DEEP_TEAL}bb`,
                  marginBottom: 36,
                }}
              >
                En ALGOS identificamos el origen exacto de su dolor e
                intervenimos con precisión guiada por imagen, sin cirugía
                abierta, sin hospitalización, con seguimiento hasta el
                resultado.
              </p>
            </>
          )}

          <a
            href={ALGOS.contact.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 self-start font-ui font-bold uppercase rounded-none transition-[background-color,transform,box-shadow] duration-300 md:hover:-translate-y-0.5 md:hover:shadow-[0_10px_24px_-8px_rgba(61,139,150,0.45)]"
            style={{
              fontSize: 12,
              letterSpacing: "0.22em",
              background: BRAND_TEAL,
              color: CREAM,
              padding: "13px 26px",
              textDecoration: "none",
            }}
          >
            AGENDE SU CONSULTA
            <span
              className="inline-block overflow-hidden transition-[width] duration-300 ease-out w-4 group-hover:w-8"
              aria-hidden="true"
            >
              <span className="block transition-transform duration-300 ease-out group-hover:translate-x-1">
                →
              </span>
            </span>
          </a>
        </div>

        {/* RIGHT: annotated image */}
        <div
          className="relative flex-1 overflow-hidden order-1 md:order-2"
          style={{ minHeight: "clamp(300px, 45vw, 660px)" }}
        >
          {activeTab === "dolor" ? (
            <AnnotatedPanel
              src={dolorEspalda}
              alt="Zonas de dolor que ALGOS trata: cabeza, cuello, espalda, lumbar, cadera"
              annotations={PAIN_ZONES}
              visible={visible}
            />
          ) : (
            <AnnotatedPanel
              src={aboutProcedure}
              alt="Procedimiento intervencionista guiado por imagen en ALGOS"
              annotations={BENEFITS}
              visible={visible}
            />
          )}
        </div>
      </div>

      {/* Extra conditions chip strip — Tab 1 only */}
      {activeTab === "dolor" && (
        <div
          className="mx-auto max-w-7xl w-full"
          style={{
            borderTop: `1px solid ${DEEP_TEAL}14`,
            padding: "28px clamp(24px, 4vw, 56px) 32px",
          }}
        >
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: `${DEEP_TEAL}50`,
              marginBottom: 16,
            }}
          >
            TAMBIÉN TRATAMOS
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {EXTRA_CONDITIONS.map(({ label, sub, icon }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 20px",
                  border: `1px solid ${DEEP_TEAL}18`,
                  background: "rgba(255,255,255,0.72)",
                  backdropFilter: "blur(4px)",
                  WebkitBackdropFilter: "blur(4px)",
                }}
              >
                <span
                  style={{
                    color: BRAND_TEAL,
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {icon}
                </span>
                <div>
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 700,
                      fontSize: 12,
                      letterSpacing: "0.06em",
                      color: DEEP_TEAL,
                      margin: 0,
                      lineHeight: 1.2,
                    }}
                  >
                    {label}
                  </p>
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 400,
                      fontSize: 11,
                      color: `${DEEP_TEAL}80`,
                      margin: "3px 0 0",
                      lineHeight: 1.3,
                    }}
                  >
                    {sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
