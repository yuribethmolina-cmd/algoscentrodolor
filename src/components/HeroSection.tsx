import { Link } from "react-router-dom";
import { ALGOS } from "@/config/algos.config";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AnimatedHeadline } from "@/lib/animations";
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

  return HERO_VIDEO_SRC;
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

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

  return (
    <section
      ref={sectionRef}
      id="hero"
      data-section="hero"
      className="relative flex flex-col w-full overflow-hidden"
      style={{ height: "100dvh", minHeight: "100dvh" }}
    >
      <Helmet>
        <link
          rel="preload"
          as="image"
          href={heroPoster.url}
          // @ts-ignore
          fetchpriority="high"
        />
      </Helmet>

      {/* Full-bleed video background */}
      {/* Fallback poster image: visible if the video source is slow or unavailable */}
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

      {/* Dark teal overlay — reveals the video, keeps text legible */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#1a4a55]/60 via-[#1a4a55]/45 to-[#1a4a55]/65 md:bg-gradient-to-r md:from-[#1a4a55]/78 md:via-[#1a4a55]/40 md:to-[#1a4a55]/08"
      />
      {/* Bottom vignette for scroll indicator */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-28 pointer-events-none bg-gradient-to-t from-[#1a4a55]/55 to-transparent"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1 min-h-0 mx-auto max-w-7xl w-full px-6 md:px-12 lg:px-16">
        <div className="flex-1 flex flex-col justify-center min-h-0">
          <div className="max-w-2xl pt-20 md:pt-0">
            <p
              className="font-ui font-bold uppercase"
              style={{ fontSize: "13px", letterSpacing: "0.3em", color: "rgba(245,240,232,0.58)" }}
            >
              MARACAIBO · FRENTE A LA FACULTAD DE MEDICINA
            </p>

            <AnimatedHeadline
              as="h1"
              className="font-display font-bold mt-6"
              style={{
                fontSize: "clamp(32px, 5.4vw, 72px)",
                lineHeight: 1.04,
                letterSpacing: "-0.028em",
                maxWidth: "22ch",
                color: "#f5f0e8",
              }}
              chunks={[
                { text: "El dolor tiene causa. " },
                { text: "Nosotros la tratamos.", color: "#c69636", staggerMs: 120 },
              ]}
            />

            <p
              className="font-ui mt-8 max-w-xl"
              style={{ fontSize: "clamp(16px, 4.2vw, 19px)", lineHeight: 1.62, color: "rgba(245,240,232,0.8)" }}
            >
              En ALGOS buscamos el origen de su dolor, lo tratamos y lo acompañamos
              hasta que pueda retomar lo que le gusta. Sin importar dónde le duele.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mt-9">
              <a
                href={ALGOS.contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#3d8b96] md:hover:bg-[#4a9ca8] text-cream font-ui font-bold uppercase rounded-none transition-[background-color,transform,box-shadow] duration-300 md:hover:-translate-y-0.5 md:hover:shadow-[0_12px_28px_-8px_rgba(0,0,0,0.35)] active:scale-[0.97] px-8 py-[16px]"
                style={{ fontSize: "13px", letterSpacing: "0.22em" }}
              >
                <span>AGENDE SU CONSULTA</span>
                <span className="inline-block overflow-hidden transition-[width] duration-300 ease-out w-5 group-hover:w-9" aria-hidden>
                  <span className="block transition-transform duration-300 ease-out group-hover:translate-x-1">→</span>
                </span>
              </a>
              <Link
                to="/especialidades"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border font-ui font-semibold uppercase rounded-none transition-[border-color,color,opacity] duration-300 active:scale-[0.97] px-7 py-[14px] md:hover:opacity-100"
                style={{ fontSize: "13px", letterSpacing: "0.22em", borderColor: "rgba(245,240,232,0.4)", color: "rgba(245,240,232,0.72)" }}
              >
                <span>ESPECIALIDADES</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="flex flex-col items-center gap-2 pb-6 md:pb-8 pt-2"
          aria-hidden="true"
        >
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.32em",
              color: "rgba(245,240,232,0.4)",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            DESLICE
          </p>
          <svg
            width="18"
            height="20"
            viewBox="0 0 18 20"
            fill="none"
            className="animate-bounce"
            style={{ opacity: 0.4 }}
          >
            <path
              d="M9 2v16M3 12l6 6 6-6"
              stroke="#f5f0e8"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
