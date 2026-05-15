import SectionLayout from "@/components/layouts/SectionLayout";
import { doctorLinks } from "@/lib/sectionLinks";
import { Clock, FileText, Phone } from "lucide-react";

const steps = [
  { icon: FileText, title: "Informe post-procedimiento", description: "Dentro de las 48 horas posteriores al procedimiento, el médico referente recibe un informe detallado con hallazgos, técnica utilizada y plan de seguimiento." },
  { icon: Clock, title: "Seguimiento protocolizado", description: "Control a las 2 semanas, 1 mes y 3 meses post-procedimiento. Cada control genera un informe actualizado para el médico referente." },
  { icon: Phone, title: "Línea directa clínica", description: "Canal de comunicación directo entre ALGOS y el médico referente para consultas sobre el caso, ajustes de tratamiento o interconsulta." },
];

export default function Seguimiento() {
  return (
    <SectionLayout sectionLinks={doctorLinks}>
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="scroll-reveal text-center mb-16">
            <p className="text-secondary text-sm tracking-[0.3em] uppercase mb-4 font-medium">Seguimiento</p>
            <h1 className="text-3xl md:text-5xl font-extralight text-foreground leading-tight mb-6">
              Seguimiento <span className="font-light text-secondary">compartido</span>
            </h1>
            <p className="text-muted-foreground font-light text-lg max-w-2xl mx-auto">
              Mantenemos al médico referente informado en cada etapa del proceso.
            </p>
          </div>

          <div className="space-y-6">
            {steps.map((step, idx) => (
              <div key={step.title} className={`scroll-reveal scroll-reveal-delay-${idx + 1} flex items-start gap-5 p-6 rounded-2xl border border-border/50 bg-card`}>
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                  <step.icon className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground font-light text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SectionLayout>
  );
}
