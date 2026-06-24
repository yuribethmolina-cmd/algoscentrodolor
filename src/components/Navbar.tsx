import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import algosLogo from "@/assets/algos-logo-new.png";

type NavLink = { label: string; href: string; matchPrefix?: boolean };

const NAV_LINKS: NavLink[] = [
  { label: "Inicio", href: "/" },
  { label: "Tratamientos", href: "/tratamientos", matchPrefix: true },
  { label: "Equipo", href: "/equipo" },
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
      <div className="container mx-auto flex items-center justify-between px-6" style={{ height: 120 }}>
        <Link
          to="/"
          aria-label="ALGOS · Inicio"
          className="flex items-center cursor-pointer transition-opacity duration-200 hover:opacity-80"
        >
          <img
            src={algosLogo}
            alt="ALGOS — Centro de Dolor Intervencionista"
            className="w-auto object-fill"
            style={{ height: 100, display: "block" }}
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
            className="transition-all duration-200"
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

        {/* Mobile toggle */}
        <button
          className="mdx:hidden"
          style={{ color: DEEP_TEAL }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="mdx:hidden animate-fade-in"
          style={{
            backgroundColor: CREAM,
            borderTop: "1px solid rgba(26,74,85,0.12)",
          }}
        >
          <div className="container mx-auto px-6 py-6 flex flex-col" style={{ gap: 12 }}>
            {NAV_LINKS.map((link) => {
              const active = isActive(link);
              return (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="text-left py-2"
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
      )}
    </nav>
  );
}
