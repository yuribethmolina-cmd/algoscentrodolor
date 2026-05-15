import SectionLayout from "@/components/layouts/SectionLayout";
import { institutionLinks } from "@/lib/sectionLinks";
import { Shield, Globe, Award } from "lucide-react";

const certs = [
  { icon: Globe, title: "Estándar clínico europeo", description: "Protocolos diseñados con experiencia activa en el sistema de salud alemán." },
  { icon: Shield, title: "Documentación completa", description: "Cada procedimiento documentado desde el primer paciente. Trazabilidad clínica total." },
  { icon: Award, title: "Certificaciones del equipo", description: "DWG, EUROSPINE, DGNC, EANS — certificaciones internacionales del equipo médico." },
];

export default function Certificaciones() {
  return (
    <SectionLayout sectionLinks={institutionLinks}>
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="scroll-reveal text-center mb-16">
            <p className="text-secondary text-sm tracking-[0.3em] uppercase mb-4 font-medium">Calidad</p>
            <h1 className="text-3xl md:text-5xl font-extralight text-foreground leading-tight mb-6">
              Certificaciones y <span className="font-light text-secondary">estándares</span>
            </h1>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {certs.map((cert, idx) => (
              <div key={cert.title} className={`scroll-reveal scroll-reveal-delay-${idx + 1} p-6 rounded-2xl border border-border/50 bg-card`}>
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                  <cert.icon className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">{cert.title}</h3>
                <p className="text-muted-foreground font-light text-sm leading-relaxed">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SectionLayout>
  );
}
