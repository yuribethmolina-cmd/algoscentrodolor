import { Link } from "react-router-dom";
import { ALGOS } from "@/config/algos.config";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AnimatedHeadline } from "@/lib/animations";
import { useBusinessHours, withHoursContext } from "@/lib/businessHours";
import heroPoster from "@/assets/hero-poster.jpg.asset.json";
import heroVideo from "../../public/videos/hero-home.mp4.asset.json";

const HERO_VIDEO_SRC = heroVideo.url;

function pickVideoSrc(): string | null {
  if (typeof window === "undefined") return null;

  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
    return null;
  }

  const conn = (navigator as any).connection;
  if (conn) {
    if (conn.saveData) return null;
    const slow = ["slow-2g", "2g", "3g"];
    if (typeof conn.effectiveType === "string" && slow.includes(conn.effectiveType)) {
      return null;
    }
  }

  const isMobile = window.matchMedia?.("(max-width: 767px)").matches;
  return isMobile ? null : HERO_VIDEO_SRC;
}

const MAS_SOLICITADOS = [
  { label: "Electromiografía", to: "/procedimientos/emg" },
  { label: "Electroencefalograma", to: "/procedimientos/eeg" },
] as const;

function trackContact() {
  if (typeof (window as any).fbq === "function") (window as any).fbq("track", "Contact");
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const hours = useBusinessHours();
  const waHref = withHoursContext(
    ALGOS.contact.whatsappHref,
    "Hola, quisiera agendar una consulta en ALGOS."
  );


  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const load = () => setVideoSrc(pickVideoSrc());

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            load();
            io.disconnect();
          }
        },
        { rootMargin: "200px" }
      );
      io.observe(node);
      return () => io.disconnect();
    }

    load();
  }, []);

  function scrollToNextSection() {
    const next = sectionRef.current?.nextElementSibling;
    if (next) next.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <Helmet>
        <link
          rel="preload"
          as="image"
          href={heroPoster.url}
          // @ts-ignore
          fetchpriority="high"
        />
      </Helmet>

      {/* ── MOBILE HERO — cream split layout (hidden sm+) ──────────────── */}
      <section className="sm:hidden bg-[#f5f0e8] flex flex-col w-full">
        <div className="px-6 pt-24 pb-8">
          <p
            className="font-ui font-bold uppercase mb-5"
            style={{ fontSize: "11px", letterSpacing: "0.3em", color: "#3d8b96" }}
          >
            MARACAIBO · FRENTE A LA FACULTAD DE MEDICINA
          </p>

          <AnimatedHeadline
            as="h1"
            className="font-display font-bold"
            style={{
              fontSize: "clamp(32px, 9vw, 44px)",
              lineHeight: 1.06,
              letterSpacing: "-0.025em",
              maxWidth: "18ch",
              color: "#1a4a55",
            }}
            chunks={[
              { text: "El dolor tiene causa. " },
              { text: "Nosotros la tratamos.", color: "#c69636", staggerMs: 120 },
            ]}
          />

          <p
            className="font-ui mt-4"
            style={{ fontSize: "16px", lineHeight: 1.55, color: "rgba(26,74,85,0.72)", maxWidth: "36ch" }}
          >
            Sabemos lo que es vivir con dolor todos los días. Aquí lo escuchamos,
            buscamos la causa y le decimos con claridad qué se puede hacer. No
            necesita orden médica.
          </p>

          <div className="flex flex-col gap-3 mt-7">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackContact}
              className="inline-flex flex-col items-center justify-center bg-[#3d8b96] text-[#f5f0e8] font-ui font-semibold w-full active:scale-[0.97]"
              style={{ fontSize: "15px", letterSpacing: "0.02em", paddingTop: 15, paddingBottom: 15 }}
            >
              <span>{hours.ctaLabel} →</span>
              <span
                className="inline-flex items-center gap-1.5 normal-case font-medium mt-1"
                style={{ fontSize: "11.5px", letterSpacing: "0.02em", opacity: 0.92 }}
              >
                <span
                  className="inline-block rounded-full"
                  style={{
                    width: 7,
                    height: 7,
                    backgroundColor: hours.isOpen ? "#7ee2a8" : "#f0c14b",
                  }}
                  aria-hidden
                />
                {hours.statusLabel}
              </span>
            </a>
            <p
              className="font-ui text-center"
              style={{ fontSize: "12.5px", lineHeight: 1.45, color: "rgba(26,74,85,0.62)" }}
            >
              {hours.helperText}
            </p>

            <Link
              to="/especialidades"
              className="inline-flex items-center justify-center border font-ui font-semibold uppercase w-full active:scale-[0.97]"
              style={{
                fontSize: "12px",
                letterSpacing: "0.18em",
                borderColor: "rgba(26,74,85,0.28)",
                color: "rgba(26,74,85,0.7)",
                paddingTop: 14,
                paddingBottom: 14,
              }}
            >
              VER ESPECIALIDADES
            </Link>
          </div>

          <div className="flex flex-col gap-2.5 mt-7">
            <p
              className="font-ui font-bold uppercase"
              style={{ fontSize: "10px", letterSpacing: "0.28em", color: "#c69636" }}
            >
              Más solicitados
            </p>
            <div className="flex items-center gap-5 flex-wrap">
              {MAS_SOLICITADOS.map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  className="inline-flex items-center gap-1.5"
                  style={{
                    fontFamily: "Inter, system-ui, sans-serif",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "rgba(26,74,85,0.85)",
                    textDecoration: "none",
                    borderBottom: "1px solid rgba(26,74,85,0.25)",
                    paddingBottom: "2px",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      backgroundColor: "#c69636",
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  />
                  {label}
                  <span aria-hidden="true" style={{ opacity: 0.45, fontSize: "12px" }}>→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Poster image — full width below content */}
        <img
          src={heroPoster.url}
          alt="ALGOS Centro de Dolor Intervencionista Maracaibo"
          className="w-full object-cover"
          style={{ height: "260px", objectPosition: "center 65%" }}
          loading="eager"
        />
      </section>

      {/* ── DESKTOP HERO — full-bleed video (hidden below sm) ──────────── */}
      <section
        ref={sectionRef}
        id="hero"
        data-section="hero"
        className="hidden sm:relative sm:flex flex-col w-full overflow-hidden"
        style={{ height: "min(100dvh, 780px)", minHeight: "560px" }}
      >
        {/* Full-bleed video background */}
        <img
          src={heroPoster.url}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center md:object-[center_65%]"
          loading="eager"
        />
        <video
          key={videoSrc ?? "poster-only"}
          ref={(el) => {
            if (el) {
              el.muted = true;
              el.defaultMuted = true;
              const p = el.play();
              if (p && typeof p.catch === "function") p.catch(() => {});
            }
          }}
          className="absolute inset-0 w-full h-full object-cover object-center md:object-[center_65%]"
          poster={heroPoster.url}
          width={1920}
          height={1080}
          autoPlay
          muted
          loop
          playsInline
          // @ts-ignore
          webkit-playsinline="true"
          x5-playsinline="true"
          disableRemotePlayback
          preload="metadata"
          aria-hidden="true"
        >
          {videoSrc && <source src={videoSrc} type="video/mp4" />}
        </video>

        {/* Dark teal overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#1a4a55]/60 via-[#1a4a55]/45 to-[#1a4a55]/65 md:bg-gradient-to-r md:from-[#1a4a55]/78 md:via-[#1a4a55]/40 md:to-[#1a4a55]/08"
        />
        {/* Bottom vignette */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-28 pointer-events-none bg-gradient-to-t from-[#1a4a55]/55 to-transparent"
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col flex-1 min-h-0 mx-auto max-w-7xl w-full px-6 md:px-12 lg:px-16">
          <div className="flex-1 flex flex-col justify-center min-h-0">
            <div className="max-w-2xl pt-20 md:pt-20">
              <p
                className="font-ui font-bold uppercase"
                style={{ fontSize: "12px", letterSpacing: "0.3em", color: "rgba(245,240,232,0.7)" }}
              >
                MARACAIBO · FRENTE A LA FACULTAD DE MEDICINA
              </p>

              <AnimatedHeadline
                as="h1"
                className="font-display font-bold mt-4 md:mt-6"
                style={{
                  fontSize: "clamp(34px, 5.6vw, 72px)",
                  lineHeight: 1.04,
                  letterSpacing: "-0.028em",
                  maxWidth: "20ch",
                  color: "#f5f0e8",
                }}
                chunks={[
                  { text: "El dolor tiene causa. " },
                  { text: "Nosotros la tratamos.", color: "#c69636", staggerMs: 120 },
                ]}
              />

              <p
                className="font-ui mt-4 md:mt-7 max-w-lg"
                style={{ fontSize: "clamp(16px, 4.2vw, 19px)", lineHeight: 1.55, color: "rgba(245,240,232,0.9)" }}
              >
                Sabemos lo que es vivir con dolor todos los días. Aquí lo escuchamos,
                buscamos la causa y le decimos con claridad qué se puede hacer. No
                necesita orden médica.
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 mt-6 md:mt-9">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackContact}
                  className="group w-full sm:w-auto inline-flex flex-col items-center justify-center bg-[#3d8b96] md:hover:bg-[#4a9ca8] text-cream font-ui font-semibold rounded-none shadow-[0_10px_30px_-12px_rgba(0,0,0,0.55)] transition-[background-color,transform,box-shadow] duration-300 md:hover:-translate-y-0.5 md:hover:shadow-[0_12px_28px_-8px_rgba(0,0,0,0.35)] active:scale-[0.97] px-8 py-[15px] min-h-[56px]"
                  style={{ fontSize: "14.5px", letterSpacing: "0.02em" }}
                >
                  <span className="inline-flex items-center gap-2">
                    <span>{hours.ctaLabel}</span>
                    <span className="inline-block overflow-hidden transition-[width] duration-300 ease-out w-5 group-hover:w-9" aria-hidden>
                      <span className="block transition-transform duration-300 ease-out group-hover:translate-x-1">→</span>
                    </span>
                  </span>
                  <span
                    className="inline-flex items-center gap-1.5 normal-case font-medium mt-1"
                    style={{ fontSize: "11.5px", letterSpacing: "0.02em", opacity: 0.92 }}
                  >
                    <span
                      className="inline-block rounded-full"
                      style={{ width: 7, height: 7, backgroundColor: hours.isOpen ? "#7ee2a8" : "#f0c14b" }}
                      aria-hidden
                    />
                    {hours.statusLabel}
                  </span>
                </a>
                <Link
                  to="/especialidades"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border font-ui font-semibold uppercase rounded-none transition-[border-color,color,opacity] duration-300 active:scale-[0.97] px-7 py-[14px] min-h-[48px] md:hover:opacity-100"
                  style={{ fontSize: "12.5px", letterSpacing: "0.2em", borderColor: "rgba(245,240,232,0.45)", color: "rgba(245,240,232,0.8)" }}
                >
                  <span>VER ESPECIALIDADES</span>
                </Link>
              </div>
              <p
                className="font-ui mt-3"
                style={{ fontSize: "12.5px", lineHeight: 1.45, color: "rgba(245,240,232,0.72)", maxWidth: "42ch" }}
              >
                {hours.helperText}
              </p>


              {/* Most-searched procedures */}
              <div className="flex flex-col gap-2.5 mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5">
                <p
                  className="font-ui font-bold uppercase"
                  style={{ fontSize: "10px", letterSpacing: "0.28em", color: "#c69636" }}
                >
                  Más solicitados
                </p>

                <div className="flex items-center gap-5 flex-wrap">
                  {MAS_SOLICITADOS.map(({ label, to }) => (
                    <Link
                      key={to}
                      to={to}
                      className="inline-flex items-center gap-1.5 transition-[color,border-color] duration-200 md:hover:text-[#c69636] md:hover:[border-bottom-color:#c69636]"
                      style={{
                        fontFamily: "Inter, system-ui, sans-serif",
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "rgba(245,240,232,0.88)",
                        textDecoration: "none",
                        borderBottom: "1px solid rgba(245,240,232,0.32)",
                        paddingBottom: "2px",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          backgroundColor: "#c69636",
                          flexShrink: 0,
                        }}
                        aria-hidden="true"
                      />
                      {label}
                      <span aria-hidden="true" style={{ opacity: 0.55, fontSize: "12px" }}>→</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <button
            type="button"
            onClick={scrollToNextSection}
            aria-label="Ver cómo tratamos el dolor"
            className="flex flex-col items-center gap-2 pb-6 md:pb-8 pt-2 mx-auto transition-opacity duration-300 md:hover:opacity-100"
          >
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.32em",
                color: "rgba(245,240,232,0.72)",
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              CÓMO TRATAMOS SU DOLOR
            </p>
            <svg
              width="18"
              height="20"
              viewBox="0 0 18 20"
              fill="none"
              className="animate-bounce"
              style={{ opacity: 0.7 }}
              aria-hidden="true"
            >
              <path
                d="M9 2v16M3 12l6 6 6-6"
                stroke="#f5f0e8"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </section>
    </>
  );
}
