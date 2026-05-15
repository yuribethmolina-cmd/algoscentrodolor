import SectionLayout from "@/components/layouts/SectionLayout";
import { institutionLinks } from "@/lib/sectionLinks";
import { FileText, Scale, Handshake } from "lucide-react";

const items = [
  { icon: FileText, title: "Contratos de servicio", description: "Modelos de contrato estandarizados para convenios de atención, outsourcing y co-manejo." },
  { icon: Scale, title: "Cumplimiento regulatorio", description: "Operación bajo la normativa sanitaria venezolana vigente." },
  { icon: Handshake, title: "Acuerdos de confidencialidad", description: "Protección de datos clínicos y acuerdos NDA para proteger información institucional." },
];

export default function MarcoLegal() {
  return (
    <SectionLayout sectionLinks={institutionLinks}>
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="scroll-reveal text-center mb-16">
            <p className="text-secondary text-sm tracking-[0.3em] uppercase mb-4 font-medium">Legal</p>
            <h1 className="text-3xl md:text-5xl font-extralight text-foreground leading-tight mb-6">
              Marco <span className="font-light text-secondary">legal</span>
            </h1>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {items.map((item, idx) => (
              <div key={item.title} className={`scroll-reveal scroll-reveal-delay-${idx + 1} p-6 rounded-2xl border border-border/50 bg-card`}>
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground font-light text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SectionLayout>
  );
}
