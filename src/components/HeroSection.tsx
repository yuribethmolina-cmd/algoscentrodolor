import { Link } from "react-router-dom";
import { ALGOS } from "@/config/algos.config";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AnimatedHeadline } from "@/lib/animations";
import heroPoster from "@/assets/hero-poster.jpg.asset.json";

const HERO_VIDEO_SRC = "/videos/hero-home.mp4";

// Decide whether to load the video based on connection/motion preferences.
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
    // Defer the decision to after first paint so the poster shows instantly.
    const node = sectionRef.current;
    if (!node) return;

    const load = () => setVideoSrc(pickVideoSrc());

    // Only fetch the video when the hero is actually visible.
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
      className="relative w-full overflow-hidden bg-cream"
      style={{ height: "min(88dvh, 820px)", minHeight: "560px" }}
    >
      {/* Preload the LCP image (hero video poster) with high priority. */}
      <Helmet>
        <link
          rel="preload"
          as="image"
          href={heroPoster.url}
          // @ts-ignore, valid HTML attribute, React types lag
          fetchpriority="high"
        />
      </Helmet>
      {/* Full-bleed video background, poster shows instantly, sources lazy-load */}
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
        className="hero-bg-video absolute inset-0 w-full h-full object-cover object-center scale-100 md:origin-center md:object-[center_65%]"
        poster={heroPoster.url}
        width={1920}
        height={1080}
        autoPlay
        muted
        loop
        playsInline
        // @ts-ignore, iOS Safari hint
        webkit-playsinline="true"
        x5-playsinline="true"
        disableRemotePlayback
        preload="metadata"
        aria-hidden="true"
      >
        {videoSrc && (
          <>
            <source src={videoSrc.replace(".mp4", ".webm")} type="video/webm" />
            <source src={videoSrc} type="video/mp4" />
          </>
        )}
      </video>

      {/* Cream overlay, left to right */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#f5f0e8]/95 via-[#f5f0e8]/90 to-[#f5f0e8]/82 md:bg-gradient-to-r md:from-[#f5f0e8]/95 md:via-[#f5f0e8]/70 md:to-[#f5f0e8]/20"
      />
      {/* Bottom fade */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none bg-gradient-to-t from-[#f5f0e8]/40 to-transparent"
      />


      {/* Content */}
      <div className="relative z-10 h-full mx-auto max-w-7xl px-6 md:px-12 lg:px-16 flex items-center">
        <div className="max-w-2xl pt-20 md:pt-0">
          <p
            className="font-ui font-bold uppercase text-steel-teal"
            style={{ fontSize: "13px", letterSpacing: "0.3em" }}
          >
            MARACAIBO · FRENTE A LA FACULTAD DE MEDICINA
          </p>

          <AnimatedHeadline
            as="h1"
            className="font-display font-bold text-deep-teal mt-6"
            style={{
              fontSize: "clamp(38px, 5.4vw, 72px)",
              lineHeight: 1.04,
              letterSpacing: "-0.028em",
              maxWidth: "18ch",
            }}
            chunks={[
              { text: "El dolor tiene causa. " },
              { text: "Nosotros la tratamos.", color: "#9a7320", staggerMs: 120 },
            ]}
          />

          <p
            className="font-ui mt-8 max-w-xl"
            style={{ fontSize: "clamp(16px, 4.2vw, 19px)", lineHeight: 1.62, color: "hsl(var(--text-body))" }}
          >
            En ALGOS buscamos el origen de su dolor, lo tratamos y lo acompañamos
            en su recuperación. Sin importar dónde le duele.
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
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-deep-teal/50 text-deep-teal/75 md:hover:border-deep-teal md:hover:text-deep-teal font-ui font-semibold uppercase rounded-none transition-[border-color,color] duration-300 active:scale-[0.97] px-7 py-[14px]"
              style={{ fontSize: "13px", letterSpacing: "0.22em" }}
            >
              <span>ESPECIALIDADES</span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
