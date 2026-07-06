import { MapPin, Phone, Mail, Instagram } from "lucide-react";
import algosLogo from "@/assets/algos-logo-dark.png";

export default function Footer() {
  return (
    <footer className="bg-primary py-16">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <img src={algosLogo} alt="ALGOS — Centro de Dolor Intervencionista" width={180} height={48} className="h-12 w-auto" />
            <p className="text-primary-foreground/50 font-light text-sm mt-4 leading-relaxed">
              Centro de Dolor Intervencionista.
              <br />
              Medicina de precisión en Maracaibo.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-primary-foreground font-medium text-sm tracking-wide mb-4">
              Contacto
            </h4>
            <div className="space-y-3">
              <a href="#" className="flex items-center gap-3 text-primary-foreground/60 hover:text-primary-foreground transition-colors text-sm font-light">
                <MapPin size={16} />
                Av. 20 con Calle 65, N° 65-02 · C.C. América, Local 4 · Sector Paraíso, Maracaibo 4005
              </a>
              <a href="tel:+584146807886" className="flex items-center gap-3 text-primary-foreground/60 hover:text-primary-foreground transition-colors text-sm font-light">
                <Phone size={16} />
                0414-680 7886
              </a>
              <a href="tel:+584120617410" className="flex items-center gap-3 text-primary-foreground/60 hover:text-primary-foreground transition-colors text-sm font-light">
                <Phone size={16} />
                0412-061 7410
              </a>
              <a href="mailto:info@algoscentrodolor.com" className="flex items-center gap-3 text-primary-foreground/60 hover:text-primary-foreground transition-colors text-sm font-light">
                <Mail size={16} />
                info@algoscentrodolor.com
              </a>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-primary-foreground font-medium text-sm tracking-wide mb-4">
              Síguenos
            </h4>
            <div className="space-y-3">
              <a href="https://instagram.com/algoscentrodolor" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-primary-foreground/60 hover:text-primary-foreground transition-colors text-sm font-light">
                <Instagram size={16} />
                @algoscentrodolor
              </a>
              <a href="https://instagram.com/neuroatilio" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-primary-foreground/60 hover:text-primary-foreground transition-colors text-sm font-light">
                <Instagram size={16} />
                @neuroatilio
              </a>
              <a href="https://instagram.com/electromiografia.zulia" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-primary-foreground/60 hover:text-primary-foreground transition-colors text-sm font-light">
                <Instagram size={16} />
                @electromiografia.zulia
              </a>
              <a href="https://instagram.com/kilocalorias" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-primary-foreground/60 hover:text-primary-foreground transition-colors text-sm font-light">
                <Instagram size={16} />
                @kilocalorias
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 space-y-2">
          <p className="text-primary-foreground/40 text-xs font-light text-center">
            Un proyecto venezolano construido para el Zulia
          </p>
          <p className="text-primary-foreground/30 text-xs font-light text-center">
            © {new Date().getFullYear()} ALGOS — Centro de Dolor Intervencionista. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
