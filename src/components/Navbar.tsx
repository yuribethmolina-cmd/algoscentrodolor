import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import algosLogoFull from "@/assets/algos-logo-v2.png";

const WA = "https://wa.me/584146807886?text=Hola%2C%20quisiera%20informaci%C3%B3n%20sobre%20sus%20servicios.";
const CREAM = "#f5f0e8";
const DEEP_TEAL = "#1a4a55";
const GOLD = "#c69636";
const TEAL = "#3d8b96";
const TEAL_HOVER = "#4a9ca8";

type DropItem = { label: string; href: string; soon?: boolean; isIndex?: boolean };

const CONDITIONS: DropItem[] = [
  { label: "Dolor de espalda", href: "/condiciones/dolor-lumbar" },
  { label: "Dolor de cuello", href: "/condiciones/dolor-cervical" },
  { label: "Hormigueo o adormecimiento", href: "/condiciones/neuropatia-diabetica" },
  { label: "Dolor de cabeza", href: "/condiciones/dolor-cervical" },
  { label: "Dolor tras una operación", href: "/condiciones/dolor-tras-cirugia" },
  { label: "Otro tipo de dolor →", href: "/condiciones", isIndex: true },
];

const PROCEDURES: DropItem[] = [
  { label: "Infiltraciones y bloqueos", href: "/procedimientos/infiltraciones-y-bloqueos" },
  { label: "Ozono para hernia discal", href: "/procedimientos/ozono-hernia-discal" },
  { label: "Electromiografía (EMG)", href: "/procedimientos/emg" },
  { label: "Electroencefalograma (EEG)", href: "/procedimientos/eeg" },
  { label: "Radiofrecuencia", href: "/procedimientos/radiofrecuencia", soon: true },
];

const SIMPLE = [
  { label: "Especialidades", href: "/especialidades" },
  { label: "Estudios diagnósticos", href: "/estudios-diagnosticos", prefix: true },
  { label: "Equipo", href: "/equipo" },
  { label: "Contacto", href: "/contacto" },
];

function Dropdown({ items }: { items: DropItem[] }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "calc(100% + 6px)",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: CREAM,
        border: "1px solid rgba(26,74,85,0.12)",
        boxShadow: "0 8px 24px -4px rgba(26,74,85,0.12)",
        minWidth: 230,
        padding: "6px 0",
        zIndex: 200,
      }}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          style={{
            display: "block",
            padding: "9px 18px",
            fontFamily: "Manrope, system-ui, sans-serif",
            fontSize: 13,
            fontWeight: item.isIndex ? 700 : item.soon ? 400 : 500,
            color: item.soon ? "rgba(26,74,85,0.4)" : item.isIndex ? TEAL : DEEP_TEAL,
            textDecoration: "none",
            pointerEvents: item.soon ? "none" : "auto",
            borderTop: item.isIndex ? "1px solid rgba(26,74,85,0.1)" : "none",
            marginTop: item.isIndex ? 4 : 0,
          }}
          onMouseEnter={(e) => { if (!item.soon) e.currentTarget.style.color = GOLD; }}
          onMouseLeave={(e) => { if (!item.soon) e.currentTarget.style.color = item.isIndex ? TEAL : DEEP_TEAL; }}
        >
          {item.label}
          {item.soon && (
            <span style={{ marginLeft: 6, fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", color: TEAL }}>
              PRÓX.
            </span>
          )}
        </Link>
      ))}
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState<"conditions" | "procedures" | null>(null);
  const [desktopOpen, setDesktopOpen] = useState<"conditions" | "procedures" | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setMobileOpen(null);
  }, [location.pathname]);

  function openDropdown(which: "conditions" | "procedures") {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDesktopOpen(which);
  }

  function scheduleClose() {
    closeTimer.current = setTimeout(() => setDesktopOpen(null), 120);
  }

  const condActive = location.pathname.startsWith("/condiciones");
  const procActive = location.pathname.startsWith("/procedimientos");

  const linkCss = (active: boolean): React.CSSProperties => ({
    fontFamily: "Manrope, system-ui, sans-serif",
    fontSize: 12,
    fontWeight: 600,
    color: active ? GOLD : DEEP_TEAL,
    letterSpacing: "0.02em",
    textDecoration: "none",
    borderBottom: `1.5px solid ${active ? GOLD : "transparent"}`,
    paddingBottom: 2,
    transition: "color 200ms",
    whiteSpace: "nowrap",
  });

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: CREAM,
        boxShadow: scrolled ? "0 1px 0 rgba(26,74,85,0.08)" : "none",
      }}
    >
      <div className="container mx-auto flex items-center justify-between px-4 mdx:px-6 h-20 mdx:h-20">
        <Link to="/" aria-label="ALGOS · Inicio" className="flex items-center transition-opacity hover:opacity-80 shrink-0">
          <img
            src={algosLogoFull}
            alt="ALGOS — Centro de Dolor Intervencionista"
            className="h-14 mdx:h-12 w-auto object-contain [filter:contrast(1.45)_brightness(0.72)_saturate(1.1)] mdx:[filter:none]"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden mdx:flex items-center" style={{ gap: 32 }}>
          <Link
            to="/"
            style={linkCss(location.pathname === "/")}
            onMouseEnter={(e) => { if (location.pathname !== "/") e.currentTarget.style.color = GOLD; }}
            onMouseLeave={(e) => { if (location.pathname !== "/") e.currentTarget.style.color = DEEP_TEAL; }}
          >
            Inicio
          </Link>

          {/* Condiciones */}
          <div className="relative" onMouseEnter={() => openDropdown("conditions")} onMouseLeave={scheduleClose}>
            <button
              style={{
                ...linkCss(condActive),
                background: "none",
                border: "none",
                borderBottom: `1.5px solid ${condActive ? GOLD : "transparent"}`,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 4,
                paddingBottom: 2,
              }}
            >
              Qué tratamos
              <ChevronDown size={12} style={{ transition: "transform 200ms", transform: desktopOpen === "conditions" ? "rotate(180deg)" : "none" }} />
            </button>
            {desktopOpen === "conditions" && (
              <div onMouseEnter={() => openDropdown("conditions")} onMouseLeave={scheduleClose}>
                <Dropdown items={CONDITIONS} />
              </div>
            )}
          </div>

          {/* Procedimientos */}
          <div className="relative" onMouseEnter={() => openDropdown("procedures")} onMouseLeave={scheduleClose}>
            <button
              style={{
                ...linkCss(procActive),
                background: "none",
                border: "none",
                borderBottom: `1.5px solid ${procActive ? GOLD : "transparent"}`,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 4,
                paddingBottom: 2,
              }}
            >
              Tratamientos
              <ChevronDown size={12} style={{ transition: "transform 200ms", transform: desktopOpen === "procedures" ? "rotate(180deg)" : "none" }} />
            </button>
            {desktopOpen === "procedures" && (
              <div onMouseEnter={() => openDropdown("procedures")} onMouseLeave={scheduleClose}>
                <Dropdown items={PROCEDURES} />
              </div>
            )}
          </div>

          {SIMPLE.map((l) => {
            const active = l.prefix ? location.pathname.startsWith(l.href) : location.pathname === l.href;
            return (
              <Link
                key={l.href}
                to={l.href}
                style={linkCss(active)}
                onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = GOLD; }}
                onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = DEEP_TEAL; }}
              >
                {l.label}
              </Link>
            );
          })}

          <a
            href={WA}
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
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "background-color 200ms",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = TEAL_HOVER)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = TEAL)}
          >
            WhatsApp
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="mdx:hidden flex items-center justify-center w-11 h-11 -mr-2"
          style={{ color: DEEP_TEAL }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className="mdx:hidden overflow-hidden"
        style={{
          backgroundColor: CREAM,
          maxHeight: menuOpen ? "680px" : "0",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "max-height 300ms cubic-bezier(0.23,1,0.32,1), opacity 200ms ease-out",
          borderTop: menuOpen ? "1px solid rgba(26,74,85,0.12)" : "1px solid transparent",
        }}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col" style={{ gap: 4 }}>
          <Link to="/" style={{ fontFamily: "Manrope, system-ui, sans-serif", fontSize: 16, fontWeight: 500, color: location.pathname === "/" ? GOLD : DEEP_TEAL, textDecoration: "none", padding: "8px 0" }}>
            Inicio
          </Link>

          <button
            onClick={() => setMobileOpen(mobileOpen === "conditions" ? null : "conditions")}
            className="flex items-center justify-between w-full text-left"
            style={{ fontFamily: "Manrope, system-ui, sans-serif", fontSize: 16, fontWeight: 500, color: condActive ? GOLD : DEEP_TEAL, background: "none", border: "none", cursor: "pointer", padding: "8px 0" }}
          >
            Qué tratamos
            <ChevronDown size={16} style={{ transition: "transform 200ms", transform: mobileOpen === "conditions" ? "rotate(180deg)" : "none" }} />
          </button>
          {mobileOpen === "conditions" && (
            <div style={{ paddingLeft: 16, paddingBottom: 8, display: "flex", flexDirection: "column", gap: 10 }}>
              {CONDITIONS.map((item) => (
                <Link key={item.href} to={item.href} style={{ fontFamily: "Manrope, system-ui, sans-serif", fontSize: 14, color: item.isIndex ? TEAL : DEEP_TEAL, textDecoration: "none", fontWeight: item.isIndex ? 600 : 400 }}>
                  {item.label}
                </Link>
              ))}
            </div>
          )}

          <button
            onClick={() => setMobileOpen(mobileOpen === "procedures" ? null : "procedures")}
            className="flex items-center justify-between w-full text-left"
            style={{ fontFamily: "Manrope, system-ui, sans-serif", fontSize: 16, fontWeight: 500, color: procActive ? GOLD : DEEP_TEAL, background: "none", border: "none", cursor: "pointer", padding: "8px 0" }}
          >
            Tratamientos
            <ChevronDown size={16} style={{ transition: "transform 200ms", transform: mobileOpen === "procedures" ? "rotate(180deg)" : "none" }} />
          </button>
          {mobileOpen === "procedures" && (
            <div style={{ paddingLeft: 16, paddingBottom: 8, display: "flex", flexDirection: "column", gap: 10 }}>
              {PROCEDURES.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  style={{ fontFamily: "Manrope, system-ui, sans-serif", fontSize: 14, color: item.soon ? "rgba(26,74,85,0.4)" : DEEP_TEAL, textDecoration: "none", pointerEvents: item.soon ? "none" : "auto" }}
                >
                  {item.label}{item.soon ? " (próximamente)" : ""}
                </Link>
              ))}
            </div>
          )}

          {SIMPLE.map((l) => {
            const active = l.prefix ? location.pathname.startsWith(l.href) : location.pathname === l.href;
            return (
              <Link key={l.href} to={l.href} style={{ fontFamily: "Manrope, system-ui, sans-serif", fontSize: 16, fontWeight: 500, color: active ? GOLD : DEEP_TEAL, textDecoration: "none", padding: "8px 0" }}>
                {l.label}
              </Link>
            );
          })}

          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: TEAL,
              color: CREAM,
              padding: "14px 22px",
              fontFamily: "Manrope, system-ui, sans-serif",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              textDecoration: "none",
              marginTop: 8,
              display: "block",
              textAlign: "center",
            }}
          >
            Escríbanos por WhatsApp
          </a>
        </div>
      </div>
    </nav>
  );
}
