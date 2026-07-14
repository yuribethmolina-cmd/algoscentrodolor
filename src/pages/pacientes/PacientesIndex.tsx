import SectionLayout from "@/components/layouts/SectionLayout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CalendarCheck, MessageCircle, ArrowRight, ShieldCheck } from "lucide-react";
import ProblemSection from "@/components/ProblemSection";
import AboutSection from "@/components/AboutSection";
import { patientLinks } from "@/lib/sectionLinks";
import { ALGOS } from "@/config/algos.config";

const WHATSAPP_NUMBER = ALGOS.contact.whatsappNumber;

export default function PacientesIndex() {
  return (
    <SectionLayout sectionLinks={patientLinks}>
      {/* Hero banner */}
      <section className="py-20 md:py-28 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
          <p className="text-cream-strong text-xs tracking-[0.5em] uppercase mb-6 font-light">
            Para pacientes
          </p>
          <h1 className="text-4xl md:text-6xl font-extralight text-primary-foreground leading-tight mb-6">
            El dolor crónico
            <br />
            <span className="font-light">sí tiene solución</span>
          </h1>
          <p className="text-primary-foreground/70 font-light text-lg max-w-xl mx-auto mb-10">
            Primer centro de dolor intervencionista organizado del Zulia.
            Procedimientos guiados por imagen, con rigor clínico desde el primer día.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="w-full sm:w-auto bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full px-8 py-6 text-base font-medium gap-2">
              <Link to="/pacientes/agendar">
                <CalendarCheck size={20} />
                Agendar valoración
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto border-primary-foreground/40 text-primary-foreground bg-primary-foreground/10 hover:bg-primary-foreground/15 rounded-full px-8 py-6 text-base font-light gap-2">
              <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola,%20me%20gustaría%20agendar%20una%20evaluación`} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={20} />
                Escribir por WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>

      <ProblemSection />
      <AboutSection />

      {/* Quick links to subsections */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="scroll-reveal text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extralight text-foreground leading-tight">
              Explora todo lo que <span className="font-light text-secondary">ALGOS</span> ofrece
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: "Tratamientos disponibles", href: "/pacientes/tratamientos" },
              { label: "Cómo funciona tu proceso", href: "/pacientes/como-funciona" },
              { label: "Conoce al equipo médico", href: "/pacientes/equipo" },
              { label: "Preguntas frecuentes", href: "/pacientes/preguntas-frecuentes" },
            ].map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="scroll-reveal group flex items-center justify-between p-5 rounded-xl border border-border bg-card hover:border-secondary/30 hover:shadow-md transition-all"
              >
                <span className="text-foreground font-light">{link.label}</span>
                <ArrowRight className="w-4 h-4 text-secondary group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-brand relative overflow-hidden">
        <div className="relative z-10 container mx-auto px-6 max-w-3xl text-center">
          <h2 className="text-3xl md:text-5xl font-extralight text-primary-foreground leading-tight mb-6">
            Si el dolor no se ha ido,
            <br />
            <span className="font-light">es momento de tratarlo bien</span>
          </h2>
          <p className="text-primary-foreground/70 font-light text-lg max-w-xl mx-auto mb-10">
            Agende su valoración hoy. Sin compromiso, sin listas de espera.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button asChild size="lg" className="w-full sm:w-auto bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-full px-8 py-6 text-base font-medium gap-2">
              <Link to="/pacientes/agendar">
                <CalendarCheck size={20} />
                Agendar valoración
              </Link>
            </Button>
          </div>
          <div className="flex items-center justify-center gap-6 text-primary-foreground/70">
            <span className="flex items-center gap-2 text-sm font-light">
              <ShieldCheck size={16} />
              Sin compromiso
            </span>
            <span className="w-1 h-1 rounded-full bg-primary-foreground/20" />
            <span className="flex items-center gap-2 text-sm font-light">
              <ShieldCheck size={16} />
              Evaluación clara desde la primera consulta
            </span>
          </div>
        </div>
      </section>
    </SectionLayout>
  );
}
