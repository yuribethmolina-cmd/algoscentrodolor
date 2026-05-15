import SectionLayout from "@/components/layouts/SectionLayout";
import { institutionLinks } from "@/lib/sectionLinks";
import { Cpu, Scan, Users, Activity } from "lucide-react";

const capabilities = [
  { icon: Scan, title: "Ecógrafo de alta resolución", description: "Guía de imagen en tiempo real para infiltraciones y bloqueos nerviosos." },
  { icon: Cpu, title: "Fluoroscopio C-arm", description: "Imagen fluoroscópica para procedimientos espinales de alta precisión." },
  { icon: Activity, title: "Electrodiagnóstico", description: "Electromiografía y conducción nerviosa para diagnóstico neurofisiológico." },
  { icon: Users, title: "Equipo multidisciplinario", description: "7 especialistas: neurocirugía, anestesiología, traumatología, medicina del deporte, dolor, nutrición." },
];

export default function Capacidades() {
  return (
    <SectionLayout sectionLinks={institutionLinks}>
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="scroll-reveal text-center mb-16">
            <p className="text-secondary text-sm tracking-[0.3em] uppercase mb-4 font-medium">Capacidades</p>
            <h1 className="text-3xl md:text-5xl font-extralight text-foreground leading-tight mb-6">
              Equipamiento y <span className="font-light text-secondary">capacidad</span>
            </h1>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {capabilities.map((cap, idx) => (
              <div key={cap.title} className={`scroll-reveal scroll-reveal-delay-${(idx % 2) + 1} p-6 rounded-2xl border border-border/50 bg-card`}>
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                  <cap.icon className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">{cap.title}</h3>
                <p className="text-muted-foreground font-light text-sm leading-relaxed">{cap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SectionLayout>
  );
}
