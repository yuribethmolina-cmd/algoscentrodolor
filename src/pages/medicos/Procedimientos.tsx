import SectionLayout from "@/components/layouts/SectionLayout";
import { doctorLinks } from "@/lib/sectionLinks";
import { Target, Syringe, Zap, Flame, Bone, Activity, Brain, Stethoscope } from "lucide-react";

const procedures = [
  { icon: Target, title: "Infiltración Facetaria", indications: "Dolor facetario lumbar o cervical", technique: "Inyección intraarticular ecoguiada o bajo fluoroscopio C-arm", contraindications: "Infección local, coagulopatía" },
  { icon: Syringe, title: "Bloqueo Epidural", indications: "Radiculopatía, hernia discal con dolor irradiado", technique: "Caudal o transforaminal selectivo bajo guía fluoroscópica", contraindications: "Infección, anticoagulación activa" },
  { icon: Zap, title: "Radiofrecuencia de Facetas", indications: "Dolor facetario crónico confirmado por bloqueo diagnóstico", technique: "RF pulsada o convencional bajo fluoroscopio", contraindications: "Marcapasos (relativa), infección local" },
  { icon: Flame, title: "Ozonoterapia Médica", indications: "Hernia discal, dolor articular inflamatorio", technique: "Inyección intradiscal y paravertebral de ozono medicinal", contraindications: "Favismo, hipertiroidismo no controlado" },
  { icon: Bone, title: "Infiltraciones Articulares", indications: "Osteoartritis, lesiones deportivas, dolor sacroilíaco", technique: "Infiltración intraarticular ecoguiada", contraindications: "Artritis séptica, prótesis articular infectada" },
  { icon: Activity, title: "Bloqueos de Nervios Periféricos", indications: "Neuralgias, síndromes de atrapamiento", technique: "Bloqueo selectivo ecoguiado", contraindications: "Infección en sitio de punción" },
  { icon: Brain, title: "Electrodiagnóstico (EMG/EEG)", indications: "Radiculopatías, neuropatías, miopatías", technique: "Electromiografía y conducción nerviosa", contraindications: "Anticoagulación severa (relativa)" },
  { icon: Stethoscope, title: "Evaluación Multidisciplinaria", indications: "Indicación quirúrgica dudosa, patología compleja", technique: "Evaluación por equipo especializado", contraindications: "Ninguna" },
];

export default function Procedimientos() {
  return (
    <SectionLayout sectionLinks={doctorLinks}>
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="scroll-reveal text-center mb-16">
            <p className="text-secondary text-sm tracking-[0.3em] uppercase mb-4 font-medium">Procedimientos</p>
            <h1 className="text-3xl md:text-5xl font-extralight text-foreground leading-tight mb-6">
              Catálogo de <span className="font-light text-secondary">procedimientos</span>
            </h1>
            <p className="text-muted-foreground font-light text-lg max-w-2xl mx-auto">
              Detalle clínico de cada procedimiento disponible, con indicaciones, técnica y contraindicaciones.
            </p>
          </div>

          <div className="space-y-6">
            {procedures.map((proc, idx) => (
              <div key={proc.title} className={`scroll-reveal scroll-reveal-delay-${(idx % 3) + 1} p-6 rounded-2xl border border-border/50 bg-card hover:border-secondary/30 transition-all duration-500`}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                    <proc.icon className="w-6 h-6 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-foreground mb-3">{proc.title}</h3>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-wider text-secondary font-medium mb-1">Indicaciones</p>
                        <p className="text-sm text-muted-foreground font-light">{proc.indications}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-secondary font-medium mb-1">Técnica</p>
                        <p className="text-sm text-muted-foreground font-light">{proc.technique}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-secondary font-medium mb-1">Contraindicaciones</p>
                        <p className="text-sm text-muted-foreground font-light">{proc.contraindications}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SectionLayout>
  );
}
