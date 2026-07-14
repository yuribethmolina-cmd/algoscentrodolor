import { useState } from "react";
import { Target, Zap, Flame, Brain, Bone, Stethoscope, Syringe, Activity, ChevronDown } from "lucide-react";

const interventions = [
  {
    icon: Target,
    title: "Infiltración Facetaria",
    description: "Inyección precisa en las articulaciones facetarias de la columna, guiada por ecógrafo o fluoroscopio C-arm.",
    forWhom: "Dolor lumbar o cervical de origen facetario que no responde a medicamentos.",
    result: "Alivio rápido y localizado, frecuentemente desde la primera sesión.",
  },
  {
    icon: Syringe,
    title: "Bloqueo Epidural",
    description: "Bloqueo epidural caudal o transforaminal selectivo para interrumpir la señal de dolor radicular.",
    forWhom: "Ciática, hernias discales con dolor irradiado a piernas o brazos.",
    result: "Reducción significativa del dolor radicular sin cirugía.",
  },
  {
    icon: Zap,
    title: "Radiofrecuencia de Facetas",
    description: "Ondas de radiofrecuencia pulsada o convencional para desactivar nervios que transmiten dolor crónico.",
    forWhom: "Dolor facetario, articular o neuropático de larga duración.",
    result: "Resultado duradero de 6 a 12 meses o más.",
  },
  {
    icon: Flame,
    title: "Ozonoterapia Médica",
    description: "Inyección de ozono medicinal intradiscal y paravertebral para reducir inflamación y promover regeneración.",
    forWhom: "Hernias discales, dolor articular inflamatorio, protrusiones.",
    result: "Reducción de inflamación y dolor progresivo.",
  },
  {
    icon: Bone,
    title: "Infiltraciones Articulares",
    description: "Infiltración intraarticular ecoguiada de rodilla, hombro, cadera y articulación sacroilíaca.",
    forWhom: "Dolor articular crónico, osteoartritis, lesiones deportivas.",
    result: "Recuperación funcional y alivio sin cirugía abierta.",
  },
  {
    icon: Activity,
    title: "Bloqueos de Nervios Periféricos",
    description: "Bloqueos selectivos ecoguiados de nervios periféricos para dolor localizado y neuropatías.",
    forWhom: "Dolor en extremidades, neuralgias, síndromes de atrapamiento nervioso.",
    result: "Alivio dirigido con alta precisión y mínimo riesgo.",
  },
];

const vipTherapies = [
  {
    icon: Zap,
    title: "Terapias Endovenosas VIP",
    description: "Infusiones de NAD+, vitaminas de alto espectro, glutatión y cócteles antiinflamatorios en suite privada.",
    forWhom: "Pacientes con fatiga crónica, recuperación post-procedimiento, bienestar integral.",
    result: "Revitalización celular, reducción de inflamación sistémica y bienestar inmediato.",
  },
];

const diagnostics = [
  {
    icon: Brain,
    title: "Electrodiagnóstico (EMG/EEG)",
    description: "Electromiografía y electroencefalograma para diagnóstico neurofisiológico preciso.",
    forWhom: "Radiculopatías, neuropatías, miopatías y patología poco clara.",
    result: "Diagnóstico definitivo que guía el tratamiento correcto.",
  },
  {
    icon: Stethoscope,
    title: "Segunda Opinión Internacional",
    description: "Evaluación especializada para casos que requieren abordaje multidisciplinario.",
    forWhom: "Pacientes con indicación quirúrgica dudosa o patología poco frecuente.",
    result: "Opinión respaldada por el estándar europeo de referencia.",
  },
];

function TreatmentCard({ item, index }: { item: typeof interventions[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="scroll-reveal group relative p-6 rounded-2xl border border-border/50 bg-card hover:border-secondary/30 transition-all duration-500 cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      {/* Gold left border on hover */}
      <div className="absolute top-4 bottom-4 left-0 w-1 rounded-full bg-accent/0 group-hover:bg-accent/60 transition-all duration-500" />

      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0 group-hover:bg-secondary/20 group-hover:scale-105 transition-all duration-300">
          <item.icon className="w-6 h-6 text-secondary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-medium text-foreground">{item.title}</h3>
            <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 ml-2 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
          </div>
          <p className="text-sm text-muted-foreground font-light leading-relaxed mt-1">
            {item.description}
          </p>
        </div>
      </div>

      {/* Expandable detail */}
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${expanded ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
        <div className="space-y-2 pl-16 pt-3 border-t border-border/50">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="font-medium text-foreground/70">Para quién: </span>
            {item.forWhom}
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="font-medium text-secondary">Resultado: </span>
            {item.result}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function TreatmentsSection() {
  return (
    <section id="treatments" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] rounded-full border border-border/30 opacity-40" />
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-secondary/[0.03] rounded-full blur-2xl" />

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="scroll-reveal text-center mb-16">
          <p className="text-secondary text-sm tracking-[0.3em] uppercase mb-4 font-medium">
            Tratamientos
          </p>
          <h2 className="text-3xl md:text-5xl font-extralight text-foreground leading-tight mb-6">
            Procedimientos de Fase 1
          </h2>
          <p className="text-muted-foreground font-light text-lg max-w-2xl mx-auto">
            Cada procedimiento es mínimamente invasivo, guiado por imagen en tiempo real
            y sigue protocolos clínicos rigurosos con estándar europeo.
          </p>
        </div>

        {/* Procedimientos Intervencionistas */}
        <p className="scroll-reveal text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6 font-medium">
          Procedimientos Intervencionistas
        </p>
        <div className="grid md:grid-cols-2 gap-5 mb-14">
          {interventions.map((item, idx) => (
            <TreatmentCard key={item.title} item={item} index={idx} />
          ))}
        </div>

        {/* Terapias VIP */}
        <p className="scroll-reveal text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6 font-medium">
          Terapias Endovenosas VIP
        </p>
        <div className="grid md:grid-cols-2 gap-5 mb-14">
          {vipTherapies.map((item, idx) => (
            <TreatmentCard key={item.title} item={item} index={idx} />
          ))}
        </div>

        {/* Diagnóstico y Consulta */}
        <p className="scroll-reveal text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6 font-medium">
          Diagnóstico y Consulta
        </p>
        <div className="grid md:grid-cols-2 gap-5 mb-14">
          {diagnostics.map((item, idx) => (
            <TreatmentCard key={item.title} item={item} index={idx} />
          ))}
        </div>

        {/* Fase 2, Próximamente */}
        <div className="scroll-reveal p-6 rounded-2xl border border-dashed border-secondary/30 bg-secondary/[0.03] text-center">
          <p className="text-xs tracking-[0.2em] uppercase text-secondary/60 mb-2 font-medium">
            Próximamente, Fase 2
          </p>
          <p className="text-muted-foreground font-light text-sm leading-relaxed max-w-xl mx-auto">
            Fluoroscopio · Radiofrecuencia avanzada · Medicina Regenerativa (PRP, Ácido Hialurónico)
          </p>
        </div>
      </div>
    </section>
  );
}
