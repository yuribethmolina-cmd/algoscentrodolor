import { Button } from "@/components/ui/button";
import { CalendarCheck, MessageCircle, ShieldCheck } from "lucide-react";

const WHATSAPP_NUMBER = "584246467944"; // Placeholder

export default function CTASection() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-gradient-brand relative overflow-hidden">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-primary-foreground blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full bg-secondary blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-6 max-w-3xl text-center">
        <div className="scroll-reveal">
          <h2 className="text-3xl md:text-5xl font-extralight text-primary-foreground leading-tight mb-6">
            Si el dolor no se ha ido,
            <br />
            <span className="font-light">es momento de tratarlo bien</span>
          </h2>
          <p className="text-primary-foreground/70 font-light text-lg max-w-xl mx-auto mb-10">
            Agenda tu evaluación hoy. Sin compromiso, sin listas de espera.
            Evaluación clara desde la primera consulta.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-full px-8 py-6 text-base font-medium gap-2 shadow-lg hover:shadow-xl transition-all"
            >
              <CalendarCheck size={20} />
              Agendar evaluación
            </Button>

            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-primary-foreground/40 text-primary-foreground bg-primary-foreground/10 backdrop-blur-sm hover:bg-primary-foreground/15 hover:border-primary-foreground/50 rounded-full px-8 py-6 text-base font-light gap-2"
            >
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola,%20me%20gustaría%20agendar%20una%20evaluación`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={20} />
                Escribir por WhatsApp
              </a>
            </Button>
          </div>

          {/* Trust reinforcements */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-primary-foreground/40">
            <span className="flex items-center gap-2 text-sm font-light">
              <ShieldCheck size={16} />
              Sin compromiso
            </span>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-primary-foreground/20" />
            <span className="flex items-center gap-2 text-sm font-light">
              <ShieldCheck size={16} />
              Evaluación clara desde la primera consulta
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
