import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";

const navLinks = [
  {
    label: "Pacientes",
    href: "/pacientes",
    children: [
      { label: "¿Por qué ALGOS?", href: "/pacientes/por-que-algos" },
      { label: "Condiciones", href: "/pacientes/condiciones" },
      { label: "Tratamientos", href: "/pacientes/tratamientos" },
      { label: "Cómo funciona", href: "/pacientes/como-funciona" },
      { label: "Equipo médico", href: "/pacientes/equipo" },
      { label: "Testimonios", href: "/pacientes/testimonios" },
      { label: "Preguntas frecuentes", href: "/pacientes/preguntas-frecuentes" },
    ],
  },
  {
    label: "Médicos",
    href: "/medicos",
    children: [
      { label: "¿Por qué referir?", href: "/medicos/por-que-referir" },
      { label: "Criterios de referencia", href: "/medicos/criterios-de-referencia" },
      { label: "Procedimientos", href: "/medicos/procedimientos" },
      { label: "Protocolos", href: "/medicos/protocolos" },
      { label: "Seguimiento", href: "/medicos/seguimiento" },
      { label: "Contacto clínico", href: "/medicos/contacto-clinico" },
    ],
  },
  {
    label: "Instituciones",
    href: "/instituciones",
    children: [
      { label: "Modelo de alianza", href: "/instituciones/modelo-de-alianza" },
      { label: "Capacidades", href: "/instituciones/capacidades" },
      { label: "Certificaciones", href: "/instituciones/certificaciones" },
      { label: "Casos", href: "/instituciones/casos" },
      { label: "Equipo directivo", href: "/instituciones/equipo-directivo" },
    ],
  },
  { label: "Equipo", href: "/equipo" },
  { label: "Blog", href: "/blog" },
  { label: "Contacto", href: "/contacto" },
];

export default function GlobalNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[hsl(var(--navbar))] backdrop-blur-md shadow-lg"
          : "bg-[hsl(var(--navbar))]"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-24 px-6">
        <Link to="/" className="flex items-center">
          <img src="/algos-logo-dark.png" alt="ALGOS, Centro de Dolor Intervencionista" width={160} height={40} loading="eager" decoding="sync" fetchPriority="high" data-no-placeholder className="h-12 w-auto" />
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <div
              key={link.href}
              className="relative group"
              onMouseEnter={() => link.children && setOpenDropdown(link.href)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                to={link.href}
                className={`text-sm font-light tracking-wide transition-colors flex items-center gap-1 ${
                  location.pathname.startsWith(link.href)
                    ? "text-primary-foreground"
                    : "text-primary-foreground/70 hover:text-primary-foreground"
                }`}
              >
                {link.label}
                {link.children && <ChevronDown className="w-3 h-3" />}
              </Link>

              {/* Dropdown */}
              {link.children && openDropdown === link.href && (
                <div className="absolute top-full left-0 pt-2 w-56 z-50">
                  <div className="bg-[hsl(var(--navbar))] backdrop-blur-md rounded-xl border border-primary-foreground/10 shadow-xl py-2">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        className="block px-4 py-2.5 text-sm font-light text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/5 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          <Button asChild className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full px-6 text-sm font-medium">
            <Link to="/pacientes/agendar">Agendar valoración</Link>
          </Button>
        </div>

        {/* Mobile menu toggle */}
        <button className="lg:hidden text-primary-foreground" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[hsl(var(--navbar))] backdrop-blur-md border-t border-primary-foreground/10 animate-fade-in max-h-[80vh] overflow-y-auto">
          <div className="container mx-auto px-6 py-6 flex flex-col gap-2">
            {navLinks.map((link) => (
              <div key={link.href}>
                <div className="flex items-center justify-between">
                  <Link
                    to={link.href}
                    className="text-left text-primary-foreground/80 hover:text-primary-foreground py-2 text-lg font-light tracking-wide"
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <button
                      onClick={() => setOpenDropdown(openDropdown === link.href ? null : link.href)}
                      className="p-2 text-primary-foreground/60"
                    >
                      <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === link.href ? "rotate-180" : ""}`} />
                    </button>
                  )}
                </div>
                {link.children && openDropdown === link.href && (
                  <div className="pl-4 pb-2 space-y-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        className="block py-1.5 text-sm text-primary-foreground/60 hover:text-primary-foreground font-light"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Button asChild className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full mt-2">
              <Link to="/pacientes/agendar">Agendar valoración</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
