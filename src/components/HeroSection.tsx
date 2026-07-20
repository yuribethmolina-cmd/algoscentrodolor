import { Link } from "react-router-dom";
import { ALGOS } from "@/config/algos.config";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { ChevronDown } from "lucide-react";

import heroImage from "@/assets/hero-dark-v2.jpg.asset.json";

const DEEP_TEAL = ALGOS.palette.deepTeal;
const BRAND_TEAL = ALGOS.palette.brandTeal;
const GOLD = ALGOS.palette.gold;
const CREAM = ALGOS.palette.cream;

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = heroImage.url;
    img.onload = () => setLoaded(true);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      data-section="hero"
      className="relative w-full overflow-hidden"
      style={{ height: "min(92dvh, 860px)", minHeight: "580px" }}
    >
      <Helmet>
        <link
          rel="preload"
          as="image"
          href={heroImage.url}
          // @ts-ignore
          fetchpriority="high"
        />
      </Helmet>

      {/* Background image */}
      <img
        src={heroImage.url}
        alt=""
        aria-hidden="true"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 700ms ease",
          transform: "scale(1.02)",
        }}
        fetchPriority="high"
        decoding="async"
      />

      {/* Dark teal overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${DEEP_TEAL}ee 0%, ${DEEP_TEAL}cc 45%, ${DEEP_TEAL}99 100%)`,
        }}
      />

      {/* Subtle gold accent glow */}
      <span
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          bottom: "-10%",
          right: "-10%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${GOLD}22 0%, transparent 70%)`,
          filter: "blur(100px)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full mx-auto max-w-5xl px-6 md:px-12 lg:px-16 flex flex-col items-center justify-center text-center">
        <p
          className="font-ui font-bold uppercase tracking-[0.3em]"
          style={{ fontSize: 12, color: CREAM, opacity: 0.85, marginBottom: 24 }}
        >
          MARACAIBO · CENTRO DE DOLOR INTERVENCIONISTA
        </p>

        <h1
          className="font-display font-bold"
          style={{
            fontSize: "clamp(40px, 6vw, 84px)",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: CREAM,
            maxWidth: "14ch",
          }}
        >
          El dolor tiene causa.{" "}
          <span style={{ color: GOLD }}>Nosotros la tratamos.</span>
        </h1>

        <p
          className="font-ui mt-8 max-w-2xl"
          style={{
            fontSize: "clamp(17px, 2vw, 21px)",
            lineHeight: 1.6,
            color: CREAM,
            opacity: 0.88,
          }}
        >
          En ALGOS buscamos el origen de su dolor, lo tratamos con procedimientos
          guiados por imagen y lo acompañamos hasta que pueda retomar su vida.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mt-10">
          <a
            href={ALGOS.contact.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 font-ui font-bold uppercase transition-[background-color,transform,box-shadow] duration-300 md:hover:-translate-y-0.5 active:scale-[0.97]"
            style={{
              backgroundColor: GOLD,
              color: DEEP_TEAL,
              padding: "16px 28px",
              fontSize: 13,
              letterSpacing: "0.18em",
              textDecoration: "none",
              boxShadow: "0 12px 28px -8px rgba(0,0,0,0.35)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#d4a84a";
              e.currentTarget.style.boxShadow = "0 18px 36px -10px rgba(0,0,0,0.45)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = GOLD;
              e.currentTarget.style.boxShadow = "0 12px 28px -8px rgba(0,0,0,0.35)";
            }}
          >
            <span>AGENDE SU CONSULTA</span>
            <span className="inline-block overflow-hidden transition-[width] duration-300 ease-out w-5 group-hover:w-9" aria-hidden>
              <span className="block transition-transform duration-300 ease-out group-hover:translate-x-1">→</span>
            </span>
          </a>
          <Link
            to="/especialidades"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-ui font-semibold uppercase transition-[border-color,color,background-color] duration-300 active:scale-[0.97]"
            style={{
              border: `1.5px solid ${CREAM}`,
              color: CREAM,
              backgroundColor: "transparent",
              padding: "14px 26px",
              fontSize: 13,
              letterSpacing: "0.18em",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(245,240,232,0.12)";
              e.currentTarget.style.borderColor = CREAM;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.borderColor = CREAM;
            }}
          >
            <span>ESPECIALIDADES</span>
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        style={{ color: CREAM, opacity: 0.7 }}
      >
        <span
          className="font-ui uppercase tracking-[0.2em]"
          style={{ fontSize: 10, fontWeight: 600 }}
        >
          Desplazar
        </span>
        <ChevronDown
          size={20}
          className="animate-bounce"
          style={{ color: GOLD }}
        />
      </div>
    </section>
  );
}
