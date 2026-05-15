import SectionLayout from "@/components/layouts/SectionLayout";
import { doctorLinks } from "@/lib/sectionLinks";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Protocolos() {
  return (
    <SectionLayout sectionLinks={doctorLinks}>
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="scroll-reveal text-center mb-16">
            <p className="text-secondary text-sm tracking-[0.3em] uppercase mb-4 font-medium">Protocolos</p>
            <h1 className="text-3xl md:text-5xl font-extralight text-foreground leading-tight mb-6">
              Protocolos y guías <span className="font-light text-secondary">clínicas</span>
            </h1>
            <p className="text-muted-foreground font-light text-lg max-w-2xl mx-auto">
              Documentación clínica para médicos referentes. Protocolos de referencia, formularios y guías de manejo.
            </p>
          </div>

          <div className="scroll-reveal p-12 rounded-2xl border border-dashed border-secondary/30 bg-card text-center">
            <FileText className="w-12 h-12 text-secondary/30 mx-auto mb-4" />
            <p className="text-muted-foreground font-light text-lg mb-2">Próximamente</p>
            <p className="text-muted-foreground/60 font-light text-sm max-w-md mx-auto">
              Los protocolos de referencia y guías clínicas estarán disponibles para descarga una vez que ALGOS inicie operaciones.
            </p>
          </div>
        </div>
      </section>
    </SectionLayout>
  );
}
