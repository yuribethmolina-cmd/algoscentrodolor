import SectionLayout from "@/components/layouts/SectionLayout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Handshake, Shield, BarChart3 } from "lucide-react";
import { institutionLinks } from "@/lib/sectionLinks";

const features = [
  { icon: Handshake, title: "Modelos flexibles", description: "Convenios de servicio, outsourcing de dolor intervencionista o co-manejo de pacientes." },
  { icon: Shield, title: "Certificaciones", description: "Protocolos con estándar europeo, documentación completa y trazabilidad clínica." },
  { icon: BarChart3, title: "Capacidad operativa", description: "Equipamiento de última generación y equipo multidisciplinario listo para volumen institucional." },
  { icon: Building2, title: "Marco legal definido", description: "Contratos claros, acuerdos de servicio y marco regulatorio establecido." },
];

export default function InstitucionesIndex() {
  return (
    <SectionLayout sectionLinks={institutionLinks}>
      <section className="py-20 md:py-28 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
          <p className="text-cream-strong text-xs tracking-[0.5em] uppercase mb-6 font-light">Para instituciones</p>
          <h1 className="text-4xl md:text-6xl font-extralight text-primary-foreground leading-tight mb-6">
            Alianzas <span className="font-light">estratégicas</span>
          </h1>
          <p className="text-primary-foreground/70 font-light text-lg max-w-xl mx-auto mb-10">
            ALGOS ofrece capacidades especializadas en manejo intervencionista del dolor para instituciones de salud, aseguradoras y empresas del sector.
          </p>
          <Button asChild size="lg" className="w-full sm:w-auto bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full px-8 py-6 text-base font-medium gap-2">
            <Link to="/instituciones/reunion">
              <Handshake size={20} />
              Solicitar reunión
            </Link>
          </Button>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((f, idx) => (
              <div key={f.title} className={`scroll-reveal scroll-reveal-delay-${(idx % 2) + 1} p-6 rounded-2xl border border-border/50 bg-card hover:border-secondary/30 transition-all duration-500`}>
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                  <f.icon className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">{f.title}</h3>
                <p className="text-muted-foreground font-light text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: "Modelo de alianza", href: "/instituciones/modelo-de-alianza" },
              { label: "Capacidades y equipamiento", href: "/instituciones/capacidades" },
              { label: "Certificaciones", href: "/instituciones/certificaciones" },
              { label: "Equipo directivo", href: "/instituciones/equipo-directivo" },
            ].map((link) => (
              <Link key={link.href} to={link.href} className="scroll-reveal group flex items-center justify-between p-5 rounded-xl border border-border bg-background hover:border-secondary/30 hover:shadow-md transition-all">
                <span className="text-foreground font-light">{link.label}</span>
                <ArrowRight className="w-4 h-4 text-secondary group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SectionLayout>
  );
}
