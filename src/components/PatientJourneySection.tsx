import { useEffect, useRef, useState } from "react";
import { ALGOS } from "@/config/algos.config";

const DEEP_TEAL = "#1a4a55";
const GOLD = "#c69636";
const CREAM = "#f5f0e8";
const BRAND_TEAL = "#3d8b96";

const STEPS = [
  {
    number: "01",
    title: "Escríbenos",
    body: "Contáctanos por WhatsApp. Sin formularios, sin esperas. Solo dinos dónde te duele y cuándo puedes venir.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path
          d="M14 3C8 3 3 7.5 3 13c0 1.9.5 3.7 1.5 5.2L3 25l7-1.5A11 11 0 0 0 14 25c6 0 11-4.5 11-11S20 3 14 3Z"
          stroke={BRAND_TEAL}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.5 13.5a5.5 5.5 0 0 0 5 3.5 5.5 5.5 0 0 0 3.5-1.2"
          stroke={BRAND_TEAL}
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <circle cx="10" cy="12" r="1" fill={BRAND_TEAL} />
        <circle cx="14" cy="12" r="1" fill={BRAND_TEAL} />
        <circle cx="18" cy="12" r="1" fill={BRAND_TEAL} />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Cuéntanos tu historia",
    body: "En la consulta escuchamos tus síntomas, tu historia y tus metas. Primero entendemos; luego actuamos.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="10" r="4.5" stroke={BRAND_TEAL} strokeWidth="1.6" />
        <path
          d="M5 24c0-5 4-8 9-8s9 3 9 8"
          stroke={BRAND_TEAL}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        {/* Small heart near person */}
        <path
          d="M20 8c0 0 2-1.5 2 .5s-2 2.5-2 2.5S18 9 18 7.5 20 8 20 8Z"
          fill={BRAND_TEAL}
          opacity="0.7"
        />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Diagnóstico preciso",
    body: "Identificamos el origen exacto del dolor con evaluación clínica e imagen guiada. Sin suposiciones.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        {/* Crosshair/target */}
        <circle cx="14" cy="14" r="9" stroke={BRAND_TEAL} strokeWidth="1.6" />
        <circle cx="14" cy="14" r="4" stroke={BRAND_TEAL} strokeWidth="1.4" />
        <circle cx="14" cy="14" r="1.2" fill={BRAND_TEAL} />
        <path d="M14 3v4M14 21v4M3 14h4M21 14h4" stroke={BRAND_TEAL} strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Regresa a tu vida",
    body: "Intervenimos con precisión y te acompañamos hasta que puedas volver a lo que más te gusta.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        {/* Person with arms raised in celebration */}
        <circle cx="14" cy="6" r="2.5" stroke={BRAND_TEAL} strokeWidth="1.5" />
        {/* Body */}
        <path d="M14 9v8" stroke={BRAND_TEAL} strokeWidth="1.6" strokeLinecap="round" />
        {/* Arms raised */}
        <path d="M14 12 L8 8M14 12 L20 8" stroke={BRAND_TEAL} strokeWidth="1.5" strokeLinecap="round" />
        {/* Legs walking/striding forward */}
        <path d="M14 17 L10 24M14 17 L18 24" stroke={BRAND_TEAL} strokeWidth="1.5" strokeLinecap="round" />
        {/* Small star of vitality */}
        <path d="M21 5 L22 3 L23 5 L21 5Z" fill={GOLD} opacity="0.8" />
      </svg>
    ),
  },
];

export default function PatientJourneySection() {
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
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-section="patient-journey"
      style={{ backgroundColor: CREAM, overflow: "hidden" }}
    >
      <div
        className="mx-auto max-w-7xl"
        style={{ padding: "clamp(56px, 7vw, 96px) clamp(24px, 4vw, 64px)" }}
      >
        {/* Header row */}
        <div
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 600ms ease 0ms, transform 600ms cubic-bezier(0.16,1,0.3,1) 0ms",
          }}
        >
          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(28px, 3.6vw, 52px)",
              lineHeight: 1.1,
              letterSpacing: "-0.024em",
              color: DEEP_TEAL,
              maxWidth: "28ch",
              margin: 0,
            }}
          >
            Volver a ser quien eras antes del dolor{" "}
            <em style={{ color: GOLD, fontStyle: "italic" }}>empieza aquí.</em>
          </h2>

          <a
            href={ALGOS.contact.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 self-start sm:self-auto shrink-0"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: DEEP_TEAL,
              textDecoration: "none",
              paddingBottom: 2,
              borderBottom: `1px solid ${DEEP_TEAL}40`,
              transition: "border-color 200ms ease, color 200ms ease",
              whiteSpace: "nowrap",
            }}
          >
            AGENDE SU CONSULTA
            <span
              style={{ display: "inline-block", transition: "transform 200ms ease" }}
              className="group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </div>

        {/* Step cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map(({ number, title, body, icon }, i) => (
            <div
              key={number}
              style={{
                position: "relative",
                background: "rgba(255,255,255,0.7)",
                border: `1px solid ${DEEP_TEAL}12`,
                padding: "28px 24px 24px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: 240,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(32px)",
                transition: `opacity 550ms ease ${80 + i * 110}ms, transform 600ms cubic-bezier(0.16,1,0.3,1) ${80 + i * 110}ms`,
              }}
            >
              {/* Gold accent bar — right edge */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: "20%",
                  right: 0,
                  width: 3,
                  height: "48%",
                  background: GOLD,
                  borderRadius: "2px 0 0 2px",
                  opacity: 0.7,
                  transform: visible ? "scaleY(1)" : "scaleY(0)",
                  transformOrigin: "top center",
                  transition: `transform 500ms cubic-bezier(0.16,1,0.3,1) ${280 + i * 110}ms`,
                }}
              />

              {/* Top: title + body */}
              <div>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(17px, 1.3vw, 19px)",
                    lineHeight: 1.3,
                    color: DEEP_TEAL,
                    marginBottom: 10,
                  }}
                >
                  {title}
                </p>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 400,
                    fontSize: "clamp(16px, 1.15vw, 17px)",
                    lineHeight: 1.65,
                    color: DEEP_TEAL,
                    margin: 0,
                  }}
                >
                  {body}
                </p>
              </div>

              {/* Bottom: icon + step number */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  marginTop: 28,
                }}
              >
                <span style={{ opacity: 0.85 }}>{icon}</span>
                <span
                  style={{
                    fontFamily: "'Inter Tight', Inter, sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(56px, 5.5vw, 80px)",
                    lineHeight: 1,
                    color: DEEP_TEAL,
                    opacity: 0.08,
                    letterSpacing: "-0.04em",
                    userSelect: "none",
                  }}
                >
                  {number}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
