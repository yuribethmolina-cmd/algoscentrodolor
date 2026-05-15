import SectionLayout from "@/components/layouts/SectionLayout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Stethoscope, Shield, Users, BarChart3 } from "lucide-react";
import { doctorLinks } from "@/lib/sectionLinks";

const features = [
  { icon: Stethoscope, title: "Especialización exclusiva", description: "Centro dedicado al dolor intervencionista con protocolos documentados y resultados medibles." },
  { icon: Shield, title: "Estándar europeo", description: "Protocolos diseñados con experiencia activa en el sistema alemán de salud." },
  { icon: BarChart3, title: "Informes detallados", description: "Cada paciente referido recibe informe completo para el médico tratante." },
  { icon: Users, title: "Trabajo colaborativo", description: "ALGOS complementa, no compite. Mantenemos al médico referente como líder del caso." },
];

export default function MedicosIndex() {
  return (
    <SectionLayout sectionLinks={doctorLinks}>
      <section className="py-20 md:py-28 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
          <p className="text-accent/70 text-xs tracking-[0.5em] uppercase mb-6 font-light">Para médicos</p>
          <h1 className="text-4xl md:text-6xl font-extralight text-primary-foreground leading-tight mb-6">
            Referencia clínica <span className="font-light">sin fricción</span>
          </h1>
          <p className="text-primary-foreground/70 font-light text-lg max-w-xl mx-auto mb-10">
            Un canal directo para referir pacientes con indicación de procedimiento intervencionista. Informes detallados, seguimiento compartido.
          </p>
          <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full px-8 py-6 text-base font-medium gap-2">
            <Link to="/medicos/referir">
              <FileText size={20} />
              Referir un paciente
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
              { label: "Criterios de referencia", href: "/medicos/criterios-de-referencia" },
              { label: "Procedimientos disponibles", href: "/medicos/procedimientos" },
              { label: "Protocolos clínicos", href: "/medicos/protocolos" },
              { label: "Seguimiento del paciente", href: "/medicos/seguimiento" },
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
