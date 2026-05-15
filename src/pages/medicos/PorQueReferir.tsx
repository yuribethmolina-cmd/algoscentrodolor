import SectionLayout from "@/components/layouts/SectionLayout";
import { doctorLinks } from "@/lib/sectionLinks";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const reasons = [
  "Centro exclusivo de dolor intervencionista — no una clínica generalista",
  "100% de procedimientos guiados por imagen (ecógrafo y fluoroscopio C-arm)",
  "Informes clínicos detallados enviados al médico referente",
  "Seguimiento protocolizado a 2 semanas, 1 mes y 3 meses",
  "Casos complejos con segunda opinión desde Alemania",
  "Su paciente regresa a usted con un informe completo y un plan claro",
];

export default function PorQueReferir() {
  return (
    <SectionLayout sectionLinks={doctorLinks}>
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="scroll-reveal text-center mb-16">
            <p className="text-secondary text-sm tracking-[0.3em] uppercase mb-4 font-medium">Referencia clínica</p>
            <h1 className="text-3xl md:text-5xl font-extralight text-foreground leading-tight mb-6">
              ¿Por qué referir a <span className="font-light text-secondary">ALGOS</span>?
            </h1>
            <p className="text-muted-foreground font-light text-lg max-w-2xl mx-auto">
              ALGOS no compite con usted. Complementamos su práctica con procedimientos especializados que usted no realiza, y le devolvemos al paciente con un informe completo.
            </p>
          </div>
          <div className="space-y-4 max-w-2xl mx-auto mb-12">
            {reasons.map((reason, idx) => (
              <div key={idx} className={`scroll-reveal scroll-reveal-delay-${(idx % 3) + 1} flex items-start gap-3`}>
                <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <p className="text-foreground/80 font-light">{reason}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full px-8 gap-2">
              <Link to="/medicos/referir">Referir un paciente <ArrowRight className="w-4 h-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </SectionLayout>
  );
}
