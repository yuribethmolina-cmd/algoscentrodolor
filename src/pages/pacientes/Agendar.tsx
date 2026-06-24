import SectionLayout from "@/components/layouts/SectionLayout";
import { Button } from "@/components/ui/button";
import { CalendarCheck, MessageCircle, ShieldCheck, Clock, MapPin, Phone } from "lucide-react";
import { patientLinks } from "@/lib/sectionLinks";

const WHATSAPP_NUMBER = "584246467944";

export default function Agendar() {
  return (
    <SectionLayout sectionLinks={patientLinks}>
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="scroll-reveal text-center mb-12">
            <p className="text-secondary text-sm tracking-[0.3em] uppercase mb-4 font-medium">Agendar</p>
            <h1 className="text-3xl md:text-5xl font-extralight text-foreground leading-tight mb-6">
              Agenda tu <span className="font-light text-secondary">evaluación</span>
            </h1>
            <p className="text-muted-foreground font-light text-lg max-w-xl mx-auto">
              Tu primera consulta incluye evaluación clínica completa, diagnóstico y propuesta de tratamiento personalizada.
            </p>
          </div>

          <div className="scroll-reveal mb-8 p-6 rounded-2xl border border-border bg-card">
            <h3 className="text-base font-medium text-foreground mb-2">¿Tienes estudios de imagen recientes?</h3>
            <p className="text-muted-foreground font-light text-sm mb-4 leading-relaxed">
              Si tienes tomografía, ecografía o Rayos X de los últimos 6 meses, tráelos a la consulta — aceleran el diagnóstico. Si no los tienes, puedes hacerlos en UDUZ Paraíso antes de venir.
            </p>
            <a
              href="https://uduz.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-secondary border-b border-secondary/30 hover:border-secondary pb-0.5 transition-colors"
            >
              Tomografía 24/7 desde $25 · Ecografía $15 · Rayos X $8 — Agendar en UDUZ →
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact options */}
            <div className="space-y-6">
              <div className="scroll-reveal p-6 rounded-2xl border border-border bg-card">
                <h3 className="text-lg font-medium text-foreground mb-4">Contacto directo</h3>
                <div className="space-y-4">
                  <Button asChild size="lg" className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full gap-2">
                    <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola,%20me%20gustaría%20agendar%20una%20evaluación`} target="_blank" rel="noopener noreferrer">
                      <MessageCircle size={20} />
                      Escribir por WhatsApp
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="w-full rounded-full gap-2">
                    <a href="tel:+584246467944">
                      <Phone size={20} />
                      Llamar al +58 424 646 7944
                    </a>
                  </Button>
                </div>
              </div>

              <div className="scroll-reveal scroll-reveal-delay-1 p-6 rounded-2xl border border-border bg-card">
                <h3 className="text-lg font-medium text-foreground mb-4">Información</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-muted-foreground font-light text-sm">
                    <MapPin className="w-4 h-4 text-secondary shrink-0" />
                    Torre RAB · Sector Paraíso, Maracaibo
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground font-light text-sm">
                    <Clock className="w-4 h-4 text-secondary shrink-0" />
                    Lunes a Viernes · 8:00 AM - 5:00 PM
                  </div>
                </div>
              </div>
            </div>

            {/* Trust */}
            <div className="scroll-reveal scroll-reveal-delay-2 p-8 rounded-2xl border border-secondary/20 bg-secondary/5">
              <CalendarCheck className="w-12 h-12 text-secondary mb-6" />
              <h3 className="text-xl font-light text-foreground mb-4">
                ¿Qué esperar en tu primera visita?
              </h3>
              <ul className="space-y-3">
                {[
                  "Evaluación clínica completa",
                  "Revisión de estudios previos",
                  "Diagnóstico claro y honesto",
                  "Propuesta de tratamiento personalizada",
                  "Presupuesto transparente, sin sorpresas",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-muted-foreground font-light text-sm">
                    <ShieldCheck className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </SectionLayout>
  );
}
