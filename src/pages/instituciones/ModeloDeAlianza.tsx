import SectionLayout from "@/components/layouts/SectionLayout";
import { institutionLinks } from "@/lib/sectionLinks";
import { Handshake, Building2, Users } from "lucide-react";

const models = [
  { icon: Handshake, title: "Convenio de servicio", description: "ALGOS atiende pacientes referidos por la institución bajo un acuerdo de tarifas preferenciales y protocolos compartidos." },
  { icon: Building2, title: "Outsourcing de dolor", description: "ALGOS opera como el departamento de dolor intervencionista de su institución, con personal, equipamiento y protocolos propios." },
  { icon: Users, title: "Co-manejo de pacientes", description: "Modelo colaborativo donde ALGOS y la institución comparten responsabilidad clínica sobre pacientes complejos." },
];

export default function ModeloDeAlianza() {
  return (
    <SectionLayout sectionLinks={institutionLinks}>
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="scroll-reveal text-center mb-16">
            <p className="text-secondary text-sm tracking-[0.3em] uppercase mb-4 font-medium">Alianza</p>
            <h1 className="text-3xl md:text-5xl font-extralight text-foreground leading-tight mb-6">
              Modelo de <span className="font-light text-secondary">alianza</span>
            </h1>
            <p className="text-muted-foreground font-light text-lg max-w-2xl mx-auto">
              Tres estructuras de colaboración diseñadas para adaptarse a las necesidades de su institución.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {models.map((model, idx) => (
              <div key={model.title} className={`scroll-reveal scroll-reveal-delay-${idx + 1} p-6 rounded-2xl border border-border/50 bg-card hover:border-secondary/30 transition-all duration-500`}>
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                  <model.icon className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">{model.title}</h3>
                <p className="text-muted-foreground font-light text-sm leading-relaxed">{model.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SectionLayout>
  );
}
