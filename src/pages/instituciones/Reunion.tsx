import SectionLayout from "@/components/layouts/SectionLayout";
import { institutionLinks } from "@/lib/sectionLinks";
import { Handshake, MessageCircle, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_NUMBER = "15550000000";

export default function Reunion() {
  return (
    <SectionLayout sectionLinks={institutionLinks}>
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="scroll-reveal text-center mb-12">
            <p className="text-secondary text-sm tracking-[0.3em] uppercase mb-4 font-medium">Reunión</p>
            <h1 className="text-3xl md:text-5xl font-extralight text-foreground leading-tight mb-6">
              Solicitar una <span className="font-light text-secondary">reunión</span>
            </h1>
            <p className="text-muted-foreground font-light text-lg max-w-xl mx-auto">
              Conversemos sobre cómo ALGOS puede complementar la oferta de su institución.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="scroll-reveal p-8 rounded-2xl border border-secondary/20 bg-secondary/5">
              <Handshake className="w-12 h-12 text-secondary mb-6" />
              <h3 className="text-xl font-light text-foreground mb-4">¿Qué preparamos?</h3>
              <ul className="space-y-3 text-muted-foreground font-light text-sm">
                <li>• Presentación ejecutiva de ALGOS</li>
                <li>• Modelo de alianza adaptado a su institución</li>
                <li>• Propuesta de tarifas y servicios</li>
                <li>• Marco contractual preliminar</li>
              </ul>
            </div>

            <div className="scroll-reveal scroll-reveal-delay-1 p-6 rounded-2xl border border-border bg-card space-y-4">
              <h3 className="text-lg font-medium text-foreground mb-4">Contactar ahora</h3>
              <Button asChild size="lg" className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full gap-2">
                <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola,%20represento%20una%20institución%20y%20me%20gustaría%20solicitar%20una%20reunión`} target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={20} />
                  WhatsApp institucional
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full rounded-full gap-2">
                <a href="mailto:instituciones@algos.com">
                  <Mail size={20} />
                  instituciones@algos.com
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full rounded-full gap-2">
                <a href="tel:+15550000000">
                  <Phone size={20} />
                  +1 (555) 000-0000
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </SectionLayout>
  );
}
