import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import algosLogo from "@/assets/algos-logo-new.png";

type NavLink = { label: string; href: string; matchPrefix?: boolean };

const NAV_LINKS: NavLink[] = [
  { label: "Inicio", href: "/" },
  { label: "Tratamientos", href: "/tratamientos", matchPrefix: true },
  { label: "Para pacientes", href: "/pacientes", matchPrefix: true },
  { label: "Para médicos", href: "/medicos", matchPrefix: true },
  { label: "Contacto", href: "/contacto" },
];

const CREAM = "#f5f0e8";
const DEEP_TEAL = "#1a4a55";
const GOLD = "#c69636";
const BRAND_TEAL = "#3d8b96";
const BRAND_TEAL_HOVER = "#4a9ca8";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (link: NavLink) => {
    if (link.href === "/") return location.pathname === "/";
    if (link.matchPrefix) return location.pathname.startsWith(link.href);
    return location.pathname === link.href;
  };

  const handleNav = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith("#")) {
      if (location.pathname !== "/") {
        navigate("/" + href);
        return;
      }
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(href);
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: CREAM,
        boxShadow: scrolled ? "0 1px 0 rgba(26,74,85,0.08)" : "none",
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="container mx-auto flex items-center justify-between px-4 mdx:px-6 h-16 mdx:h-24">
        <Link
          to="/"
          aria-label="ALGOS · Inicio"
          className="flex items-center cursor-pointer transition-opacity duration-200 hover:opacity-80"
        >
          <img
            src={algosLogo}
            alt="ALGOS — Centro de Dolor Intervencionista"
            className="h-9 mdx:h-[68px] w-auto object-contain"
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden mdx:flex items-center" style={{ gap: 32 }}>
          {NAV_LINKS.map((link) => {
            const active = isActive(link);
            return (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="transition-colors relative pb-1"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  color: active ? GOLD : DEEP_TEAL,
                  letterSpacing: "0.02em",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  borderBottom: `1.5px solid ${active ? GOLD : "transparent"}`,
                }}
                onMouseEnter={(e) => {
                  if (!active) e.currentTarget.style.color = GOLD;
                }}
                onMouseLeave={(e) => {
                  if (!active) e.currentTarget.style.color = DEEP_TEAL;
                }}
              >
                {link.label}
              </button>
            );
          })}
          <button
            onClick={() => handleNav("#solicitar")}
            className="transition-colors duration-200 active:opacity-80"
            style={{
              backgroundColor: BRAND_TEAL,
              color: CREAM,
              padding: "12px 22px",
              borderRadius: 4,
              fontFamily: "Inter, sans-serif",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BRAND_TEAL_HOVER)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = BRAND_TEAL)}
          >
            Solicitar valoración
          </button>
        </div>

        {/* Mobile toggle — 44×44px tap target */}
        <button
          className="mdx:hidden flex items-center justify-center w-11 h-11 -mr-2 rounded-lg transition-transform duration-150 active:scale-90"
          style={{ color: DEEP_TEAL }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu — always in DOM, animated via max-height + opacity */}
      <div
        className="mdx:hidden overflow-hidden"
        style={{
          backgroundColor: CREAM,
          maxHeight: menuOpen ? "400px" : "0",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "max-height 280ms cubic-bezier(0.23, 1, 0.32, 1), opacity 200ms ease-out",
          borderTop: menuOpen ? "1px solid rgba(26,74,85,0.12)" : "1px solid transparent",
        }}
      >
          <div className="container mx-auto px-4 py-5 flex flex-col" style={{ gap: 12 }}>
            {NAV_LINKS.map((link) => {
              const active = isActive(link);
              return (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="text-left py-2 transition-opacity duration-150 active:opacity-60"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 16,
                    fontWeight: 500,
                    color: active ? GOLD : DEEP_TEAL,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    borderBottom: active ? `1.5px solid ${GOLD}` : "none",
                    alignSelf: "flex-start",
                  }}
                >
                  {link.label}
                </button>
              );
            })}
            <button
              onClick={() => handleNav("#solicitar")}
              className="transition-colors duration-200 active:opacity-80"
              style={{
                backgroundColor: BRAND_TEAL,
                color: CREAM,
                padding: "14px 22px",
                borderRadius: 4,
                fontFamily: "Inter, sans-serif",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                border: "none",
                cursor: "pointer",
                marginTop: 8,
              }}
            >
              Solicitar valoración
            </button>
          </div>
        </div>
    </nav>
  );
}
