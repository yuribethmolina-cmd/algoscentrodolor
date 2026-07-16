import { useState, useEffect } from "react";
import algosLogoFull from "@/assets/algos-logo-v2.png";
import { ALGOS } from "@/config/algos.config";

const CREAM = ALGOS.palette.cream;
const DEEP_TEAL = ALGOS.palette.deepTeal;
const TEAL = ALGOS.palette.brandTeal;
const TEAL_HOVER = ALGOS.palette.brandTealHover;

interface LpHeaderProps {
  waHref: string;
  waLabel?: string;
}

export default function LpHeader({ waHref, waLabel = "WhatsApp" }: LpHeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: CREAM,
        boxShadow: scrolled ? "0 1px 0 rgba(26,74,85,0.08)" : "none",
      }}
    >
      <div
        className="container mx-auto flex items-center justify-between px-4 md:px-6"
        style={{ height: "6rem" }}
      >
        {/* Logo — mismo tamaño que Navbar */}
        <img
          src={algosLogoFull}
          alt="ALGOS, Centro de Dolor Intervencionista"
          loading="eager"
          decoding="sync"
          className="h-20 md:h-24 w-auto object-contain"
        />

        {/* CTA derecha */}
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            backgroundColor: TEAL,
            color: CREAM,
            padding: "9px 16px",
            fontFamily: "Manrope, system-ui, sans-serif",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase" as const,
            textDecoration: "none",
            transition: "background-color 200ms",
            whiteSpace: "nowrap" as const,
            flexShrink: 0,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = TEAL_HOVER)}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = TEAL)}
        >
          {waLabel}
        </a>
      </div>
    </nav>
  );
}
