import { Link } from "react-router-dom";
import { AnimatedHeadline } from "@/lib/animations";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-[640px] overflow-hidden bg-cream"
    >
      {/* Full-bleed video background */}
      <video
        ref={(el) => {
          if (el) {
            el.muted = true;
            el.defaultMuted = true;
            const p = el.play();
            if (p && typeof p.catch === "function") p.catch(() => {});
          }
        }}
        className="hero-bg-video absolute inset-0 w-full h-full object-cover object-[40%_78%] scale-[1.7] origin-[40%_78%] md:scale-100 md:origin-center md:object-[center_65%]"
        src="/videos/hero-home-bg-new.mp4"
        autoPlay
        muted
        loop
        playsInline
        // @ts-ignore — iOS Safari hint
        webkit-playsinline="true"
        x5-playsinline="true"
        disableRemotePlayback
        preload="auto"
        aria-hidden="true"
      />

      {/* Cream overlay — left to right */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#f5f0e8]/85 via-[#f5f0e8]/55 to-[#f5f0e8]/75 md:bg-gradient-to-r md:from-[#f5f0e8]/95 md:via-[#f5f0e8]/70 md:to-[#f5f0e8]/20"
      />
      {/* Bottom fade */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none bg-gradient-to-t from-[#f5f0e8]/40 to-transparent"
      />

      {/* Content */}
      <div className="relative z-10 h-full mx-auto max-w-7xl px-6 md:px-12 lg:px-16 flex items-center">
        <div className="max-w-2xl pt-24 md:pt-0">
          <p
            className="font-ui font-bold uppercase"
            style={{ color: "#9a7320", fontSize: "13px", letterSpacing: "0.3em" }}
          >
            MARACAIBO · ALEMANIA
          </p>

          <AnimatedHeadline
            as="h1"
            className="font-display font-bold text-deep-teal mt-6"
            style={{
              fontSize: "clamp(40px, 5.6vw, 76px)",
              lineHeight: 1.04,
              letterSpacing: "-0.028em",
              maxWidth: "18ch",
            }}
            chunks={[
              { text: "Tratamiento del dolor basado en evidencia clínica " },
              { text: "internacional.", italic: true, color: "#9a7320", staggerMs: 120 },
            ]}
          />

          <p
            className="font-ui mt-8 max-w-xl"
            style={{ fontSize: "19px", lineHeight: 1.65, color: "hsl(var(--text-body))" }}
          >
            Cuatro especialistas — dos en Venezuela, dos en Alemania — que
            ven tu caso como uno solo. Procedimientos sin hospitalización,
            en el Sector Paraíso, en alianza diagnóstica con UDUZ.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mt-10">
            <Link
              to="/pacientes/agendar"
              className="group inline-flex items-center justify-center gap-2 bg-[#3d8b96] hover:bg-[#4a9ca8] text-cream font-ui font-bold uppercase rounded transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-8px_rgba(0,0,0,0.35)] px-8 py-[16px]"
              style={{ fontSize: "13px", letterSpacing: "0.22em" }}
            >
              <span>Agendar cita</span>
              <span className="inline-block overflow-hidden transition-[width] duration-300 ease-out w-5 group-hover:w-9" aria-hidden>
                <span className="block transition-transform duration-300 ease-out group-hover:translate-x-1">→</span>
              </span>
            </Link>
            <Link
              to="/pacientes/equipo"
              className="inline-flex items-center justify-center gap-2 border-[1.5px] border-deep-teal text-deep-teal hover:bg-deep-teal hover:text-cream font-ui font-bold uppercase rounded transition-all duration-300 px-8 py-[16px]"
              style={{ fontSize: "13px", letterSpacing: "0.22em" }}
            >
              <span>Conoce al equipo</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
