import SectionLayout from "@/components/layouts/SectionLayout";
import { MessageCircle } from "lucide-react";
import { patientLinks } from "@/lib/sectionLinks";

export default function Testimonios() {
  return (
    <SectionLayout sectionLinks={patientLinks}>
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="scroll-reveal">
            <p className="text-secondary text-sm tracking-[0.3em] uppercase mb-4 font-medium">Testimonios</p>
            <h1 className="text-3xl md:text-5xl font-extralight text-foreground leading-tight mb-6">
              Historias de <span className="font-light text-secondary">recuperación</span>
            </h1>
            <div className="p-12 rounded-2xl border border-dashed border-secondary/30 bg-card">
              <MessageCircle className="w-12 h-12 text-secondary/30 mx-auto mb-4" />
              <p className="text-muted-foreground font-light text-lg mb-2">
                Próximamente
              </p>
              <p className="text-muted-foreground/60 font-light text-sm">
                Los testimonios de nuestros pacientes estarán disponibles una vez que ALGOS comience operaciones.
              </p>
            </div>
          </div>
        </div>
      </section>
    </SectionLayout>
  );
}
