import SectionLayout from "@/components/layouts/SectionLayout";
import { doctorLinks } from "@/lib/sectionLinks";
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_NUMBER = "584146807886";

export default function ContactoClinico() {
  return (
    <SectionLayout sectionLinks={doctorLinks}>
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="scroll-reveal text-center mb-16">
            <p className="text-secondary text-sm tracking-[0.3em] uppercase mb-4 font-medium">Contacto</p>
            <h1 className="text-3xl md:text-5xl font-extralight text-foreground leading-tight mb-6">
              Línea directa <span className="font-light text-secondary">clínica</span>
            </h1>
            <p className="text-muted-foreground font-light text-lg max-w-2xl mx-auto">
              Canal exclusivo para médicos referentes. Consulte sobre casos, solicite información o coordine una referencia.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="scroll-reveal p-6 rounded-2xl border border-border bg-card space-y-4">
              <Phone className="w-8 h-8 text-secondary" />
              <h3 className="text-lg font-medium text-foreground">Teléfono</h3>
              <a href="tel:+584146807886" className="text-secondary font-light hover:underline">0414-680 7886</a>
            </div>
            <div className="scroll-reveal scroll-reveal-delay-1 p-6 rounded-2xl border border-border bg-card space-y-4">
              <Mail className="w-8 h-8 text-secondary" />
              <h3 className="text-lg font-medium text-foreground">Email clínico</h3>
              <a href="mailto:algoscentrodedolor@gmail.com" className="text-secondary font-light hover:underline">algoscentrodedolor@gmail.com</a>
            </div>
            <div className="scroll-reveal scroll-reveal-delay-2 p-6 rounded-2xl border border-border bg-card space-y-4">
              <MessageCircle className="w-8 h-8 text-secondary" />
              <h3 className="text-lg font-medium text-foreground">WhatsApp</h3>
              <Button asChild variant="outline" className="rounded-full">
                <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola,%20soy%20médico%20y%20quiero%20referir%20un%20paciente`} target="_blank" rel="noopener noreferrer">
                  Escribir por WhatsApp
                </a>
              </Button>
            </div>
            <div className="scroll-reveal scroll-reveal-delay-3 p-6 rounded-2xl border border-border bg-card space-y-4">
              <MapPin className="w-8 h-8 text-secondary" />
              <h3 className="text-lg font-medium text-foreground">Ubicación</h3>
              <p className="text-muted-foreground font-light text-sm">CC América, Local N° 4 · Sector Paraíso, Maracaibo</p>
            </div>
          </div>
        </div>
      </section>
    </SectionLayout>
  );
}
