import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Instagram } from "lucide-react";
import algosLogo from "@/assets/algos-logo-dark.png";

export default function GlobalFooter() {
  return (
    <footer className="bg-primary py-16">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link to="/">
              <img src={algosLogo} alt="ALGOS — Centro de Dolor Intervencionista" width={180} height={48} className="h-12 w-auto" />
            </Link>
            <p className="text-primary-foreground/50 font-light text-sm mt-4 leading-relaxed">
              Centro de Dolor Intervencionista.
              <br />
              Medicina de precisión en Maracaibo.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-primary-foreground font-medium text-sm tracking-wide mb-4">Secciones</h4>
            <div className="space-y-2">
              {[
                { label: "Pacientes", href: "/pacientes" },
                { label: "Médicos", href: "/medicos" },
                { label: "Instituciones", href: "/instituciones" },
                { label: "Equipo", href: "/equipo" },
                { label: "Blog", href: "/blog" },
                { label: "Contacto", href: "/contacto" },
              ].map((link) => (
                <Link key={link.href} to={link.href} className="block text-primary-foreground/60 hover:text-primary-foreground transition-colors text-sm font-light">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-primary-foreground font-medium text-sm tracking-wide mb-4">Contacto</h4>
            <div className="space-y-3">
              <a href="#" className="flex items-center gap-3 text-primary-foreground/60 hover:text-primary-foreground transition-colors text-sm font-light">
                <MapPin size={16} />
                CC América, Local 4 · Av. 20 con Calle 65 · Paraíso, Maracaibo
              </a>
              <a href="tel:+584146807886" className="flex items-center gap-3 text-primary-foreground/60 hover:text-primary-foreground transition-colors text-sm font-light">
                <Phone size={16} />
                0414-680 7886
              </a>
              <a href="mailto:algoscentrodedolor@gmail.com" className="flex items-center gap-3 text-primary-foreground/60 hover:text-primary-foreground transition-colors text-sm font-light">
                <Mail size={16} />
                algoscentrodedolor@gmail.com
              </a>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-primary-foreground font-medium text-sm tracking-wide mb-4">Síguenos</h4>
            <div className="space-y-3">
              {["algos.dolor", "neuroatilio", "electromiografia.zulia", "kilocalorias"].map((handle) => (
                <a key={handle} href={`https://instagram.com/${handle}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-primary-foreground/60 hover:text-primary-foreground transition-colors text-sm font-light">
                  <Instagram size={16} />
                  @{handle}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-primary-foreground/30 text-xs font-light">
            © {new Date().getFullYear()} ALGOS — Centro de Dolor Intervencionista. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <Link to="/privacidad" className="text-primary-foreground/30 hover:text-primary-foreground/60 text-xs font-light transition-colors">
              Privacidad
            </Link>
            <Link to="/aviso-legal" className="text-primary-foreground/30 hover:text-primary-foreground/60 text-xs font-light transition-colors">
              Aviso legal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
