import SectionLayout from "@/components/layouts/SectionLayout";
import { Brain, Bone, Activity, Flame, Heart, Zap } from "lucide-react";
import { patientLinks } from "@/lib/sectionLinks";

const conditions = [
  { icon: Bone, title: "Dolor lumbar crónico", description: "Dolor persistente en la zona baja de la espalda que no responde a tratamiento convencional." },
  { icon: Zap, title: "Ciática", description: "Dolor irradiado desde la espalda baja hacia las piernas, generalmente por compresión nerviosa." },
  { icon: Flame, title: "Hernias discales", description: "Protrusión del disco intervertebral que comprime nervios y genera dolor intenso." },
  { icon: Brain, title: "Neuropatías", description: "Dolor causado por daño o disfunción de los nervios periféricos." },
  { icon: Heart, title: "Dolor articular crónico", description: "Dolor persistente en rodillas, hombros, caderas u otras articulaciones." },
  { icon: Activity, title: "Dolor cervical", description: "Dolor en el cuello y zona cervical, frecuentemente con irradiación a brazos." },
];

export default function Condiciones() {
  return (
    <SectionLayout sectionLinks={patientLinks}>
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="scroll-reveal text-center mb-16">
            <p className="text-secondary text-sm tracking-[0.3em] uppercase mb-4 font-medium">Condiciones</p>
            <h1 className="text-3xl md:text-5xl font-extralight text-foreground leading-tight mb-6">
              Condiciones que <span className="font-light text-secondary">tratamos</span>
            </h1>
            <p className="text-muted-foreground font-light text-lg max-w-2xl mx-auto">
              ALGOS trata dolor crónico de origen musculoesquelético, neuropático y articular mediante técnicas intervencionistas guiadas por imagen.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {conditions.map((condition, idx) => (
              <div key={condition.title} className={`scroll-reveal scroll-reveal-delay-${(idx % 3) + 1} p-6 rounded-2xl border border-border/50 bg-card hover:border-secondary/30 transition-all duration-500`}>
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                  <condition.icon className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">{condition.title}</h3>
                <p className="text-muted-foreground font-light text-sm leading-relaxed">{condition.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SectionLayout>
  );
}
