import { useEffect, useRef, useState } from "react";
import { ALGOS } from "@/config/algos.config";
import aboutProcedure from "@/assets/about-procedure.jpg";

const DEEP_TEAL = "#1a4a55";
const GOLD = "#c69636";
const CREAM = "#f5f0e8";
const BRAND_TEAL = "#3d8b96";

type Annotation = {
  label: string;
  top: string;
  left: string;
};

const ANNOTATIONS: Annotation[] = [
  { label: "Procedimiento mínimamente invasivo", top: "18%", left: "62%" },
  { label: "Guiado por imagen",                  top: "38%", left: "22%" },
  { label: "Recuperación pronta",                top: "60%", left: "70%" },
  { label: "Diagnóstico preciso",                top: "80%", left: "30%" },
];

export default function WhyDifferentSection() {
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
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-section="why-different"
      style={{ backgroundColor: CREAM, overflow: "hidden" }}
    >
      <div
        className="mx-auto max-w-7xl flex flex-col md:flex-row"
        style={{ minHeight: "clamp(480px, 58vw, 680px)" }}
      >
        {/* LEFT: text column */}
        <div
          className="flex flex-col justify-center order-2 md:order-1"
          style={{
            flex: "0 0 38%",
            padding: "clamp(48px, 7vw, 88px) clamp(24px, 4vw, 56px)",
          }}
        >
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
            <em style={{ color: GOLD, fontStyle: "italic" }}>No se abandona.</em>
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
            En ALGOS identificamos el origen exacto de su dolor e intervenimos
            con procedimientos mínimamente invasivos guiados por imagen, con
            seguimiento hasta el resultado.
          </p>
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
              <span className="block transition-transform duration-300 ease-out group-hover:translate-x-1">→</span>
            </span>
          </a>
        </div>

        {/* RIGHT: annotated image */}
        <div
          className="relative flex-1 overflow-hidden order-1 md:order-2"
          style={{ minHeight: "clamp(300px, 45vw, 680px)" }}
        >
          <img
            src={aboutProcedure}
            alt="Procedimiento intervencionista guiado por imagen en ALGOS"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />

          {/* Left-edge blend into text column */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(to right, ${CREAM}40 0%, transparent 16%)`,
              pointerEvents: "none",
            }}
          />

          {/* Floating benefit labels */}
          {ANNOTATIONS.map((ann, i) => (
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
                transition: `opacity 450ms ease ${i * 280}ms, transform 500ms cubic-bezier(0.16,1,0.3,1) ${i * 280}ms`,
                display: "flex",
                alignItems: "center",
                gap: 7,
                zIndex: 10,
                pointerEvents: "none",
              }}
            >
              {/* anchor dot */}
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: BRAND_TEAL,
                  border: "2px solid white",
                  boxShadow: `0 0 0 3px ${BRAND_TEAL}40`,
                  flexShrink: 0,
                }}
              />
              {/* pill label */}
              <div
                style={{
                  background: "rgba(255,255,255,0.93)",
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
        </div>
      </div>
    </section>
  );
}
