import { useEffect, useRef, useState } from "react";

const VIDEOS = {
  pacientes: {
    mp4: "/videos/pacientes-hero.mp4",
    webm: "/videos/pacientes-hero.webm",
  },
  tratamientos: {
    mp4: "/videos/tratamientos-hero.mp4",
    webm: "/videos/tratamientos-hero.webm",
  },
  medicos: {
    mp4: "/videos/medicos-hero.mp4",
    webm: "/videos/medicos-hero.webm",
  },
} as const;

function canPlayVideo(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return false;
  const conn = (navigator as any).connection;
  if (conn?.saveData) return false;
  if (["slow-2g", "2g", "3g"].includes(conn?.effectiveType ?? "")) return false;
  return true;
}

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  video?: keyof typeof VIDEOS;
};

const DEEP_TEAL = "#1a4a55";
const GOLD = "#c69636";
const CREAM = "#f5f0e8";

export default function PageHeroVideo({ eyebrow, title, subtitle, video = "pacientes" }: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [videoSrc, setVideoSrc] = useState<{ mp4: string; webm: string } | null>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const load = () => {
      if (canPlayVideo()) setVideoSrc(VIDEOS[video]);
    };
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => { if (entries.some((e) => e.isIntersecting)) { load(); io.disconnect(); } },
        { rootMargin: "200px" }
      );
      io.observe(node);
      return () => io.disconnect();
    }
    load();
  }, [video]);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        backgroundColor: DEEP_TEAL,
        paddingTop: "clamp(100px, 13vw, 160px)",
        paddingBottom: "clamp(56px, 7vw, 96px)",
        overflow: "hidden",
      }}
    >
      {/* Video background */}
      {videoSrc && (
        <video
          key={videoSrc.mp4}
          ref={(el) => {
            if (el) {
              el.muted = true;
              el.defaultMuted = true;
              const p = el.play();
              if (p?.catch) p.catch(() => {});
            }
          }}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 40%",
            opacity: 0.28,
          }}
          autoPlay
          muted
          loop
          playsInline
          disableRemotePlayback
          preload="metadata"
          aria-hidden="true"
        >
          {videoSrc.webm && <source src={videoSrc.webm} type="video/webm" />}
          <source src={videoSrc.mp4} type="video/mp4" />
        </video>
      )}

      {/* Dark gradient overlay so text is always legible */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(26,74,85,0.75) 0%, rgba(26,74,85,0.55) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        className="relative mx-auto"
        style={{
          maxWidth: 1080,
          paddingLeft: "clamp(24px, 4vw, 48px)",
          paddingRight: "clamp(24px, 4vw, 48px)",
        }}
      >
        {eyebrow && (
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: GOLD,
              marginBottom: 20,
            }}
          >
            {eyebrow}
          </p>
        )}
        <h1
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(32px, 4.8vw, 68px)",
            lineHeight: 1.06,
            letterSpacing: "-0.025em",
            color: CREAM,
            maxWidth: "20ch",
            marginTop: eyebrow ? 0 : 0,
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(16px, 1.8vw, 19px)",
              lineHeight: 1.65,
              color: "rgba(245,240,232,0.8)",
              maxWidth: "52ch",
              marginTop: 20,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
