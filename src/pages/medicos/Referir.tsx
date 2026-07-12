import SectionLayout from "@/components/layouts/SectionLayout";
import { doctorLinks } from "@/lib/sectionLinks";
import { FileText, MessageCircle, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ALGOS } from "@/config/algos.config";

const WHATSAPP_NUMBER = ALGOS.contact.whatsappNumber;

export default function Referir() {
  return (
    <SectionLayout sectionLinks={doctorLinks}>
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="scroll-reveal text-center mb-12">
            <p className="text-secondary text-sm tracking-[0.3em] uppercase mb-4 font-medium">Referencia</p>
            <h1 className="text-3xl md:text-5xl font-extralight text-foreground leading-tight mb-6">
              Referir un <span className="font-light text-secondary">paciente</span>
            </h1>
            <p className="text-muted-foreground font-light text-lg max-w-xl mx-auto">
              Formulario de referencia digital. Su paciente será contactado dentro de las 24 horas hábiles.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="scroll-reveal p-8 rounded-2xl border border-secondary/20 bg-secondary/5">
              <Send className="w-10 h-10 text-secondary mb-6" />
              <h3 className="text-xl font-light text-foreground mb-4">Formulario de referencia</h3>
              <p className="text-muted-foreground font-light text-sm mb-6 leading-relaxed">
                El formulario digital de referencia estará disponible próximamente. Por ahora, puede referir pacientes directamente por los canales a continuación.
              </p>
              <div className="p-4 rounded-xl border border-dashed border-secondary/30 bg-card text-center">
                <FileText className="w-8 h-8 text-secondary/30 mx-auto mb-2" />
                <p className="text-muted-foreground/60 font-light text-sm">Próximamente</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="scroll-reveal p-6 rounded-2xl border border-secondary/20 bg-secondary/5">
                <h3 className="text-base font-medium text-foreground mb-3">Estudios previos al procedimiento</h3>
                <p className="text-muted-foreground font-light text-sm leading-relaxed mb-3">
                  Al referir, puede indicar los estudios de imagen directamente en <strong className="font-bold text-foreground">UDUZ Paraíso</strong> — en la misma zona que <strong className="font-bold text-foreground">ALGOS</strong>. Tomografía desde $25 (24/7), ecografía desde $15. El Dr. Atilio recibe los resultados antes de la valoración.
                </p>
                <a
                  href="https://www.instagram.com/uduz_maracaibo/reels/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-secondary border-b border-secondary/30 hover:border-secondary pb-0.5 transition-colors"
                >
                  Ver servicios UDUZ →
                </a>
              </div>
              <div className="scroll-reveal scroll-reveal-delay-1 p-6 rounded-2xl border border-border bg-card">
                <h3 className="text-lg font-medium text-foreground mb-4">Referir ahora</h3>
                <div className="space-y-3">
                  <Button asChild size="lg" className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full gap-2">
                    <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola,%20soy%20médico%20y%20quiero%20referir%20un%20paciente`} target="_blank" rel="noopener noreferrer">
                      <MessageCircle size={20} />
                      WhatsApp clínico
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="w-full rounded-full gap-2">
                    <a href="tel:+584146807886">
                      <Phone size={20} />
                      0414-680 7886
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SectionLayout>
  );
}
