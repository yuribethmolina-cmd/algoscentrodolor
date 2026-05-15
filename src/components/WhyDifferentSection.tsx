import { Globe, Cpu, Heart, Star, Shield, Crosshair } from "lucide-react";

const differentiators = [
  {
    icon: Crosshair,
    title: "Especialización exclusiva",
    description: "Primer centro en Venezuela dedicado exclusivamente a la medicina intervencionista del dolor.",
  },
  {
    icon: Cpu,
    title: "100% guiado por imagen",
    description: "Todos los procedimientos bajo ecógrafo o fluoroscopio C-arm. Cero improvisación, precisión milimétrica.",
  },
  {
    icon: Globe,
    title: "Estándar clínico europeo",
    description: "Protocolos diseñados con experiencia activa en un sistema de salud exigente. Rigor clínico transferido a Maracaibo.",
  },
  {
    icon: Heart,
    title: "Atención integral",
    description: "Neurocirugía + nutrición + electrodiagnóstico + bienestar en un solo centro.",
  },
  {
    icon: Shield,
    title: "Accesibilidad real",
    description: "Precios diseñados para la clase media venezolana, sin sacrificar estándares europeos.",
  },
  {
    icon: Star,
    title: "Rigor desde el primer día",
    description: "Cada procedimiento documentado, cada resultado medido. Datos propios desde el primer paciente.",
  },
];

const stats = [
  { value: "347K+", label: "Personas con dolor lumbar en Maracaibo", highlight: false },
  { value: "0", label: "Centros de dolor intervencionista en la región", highlight: true },
  { value: "82%", label: "Trabajadores petroleros con dolor musculoesquelético", highlight: false },
  { value: "13.9%", label: "Prevalencia de lumbalgia en el Zulia", highlight: false },
];

export default function WhyDifferentSection() {
  return (
    <section className="py-24 md:py-32 bg-primary relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-secondary/[0.06] blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent/[0.04] blur-3xl translate-y-1/2 -translate-x-1/3" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Header */}
        <div className="scroll-reveal text-center mb-16">
          <p className="text-secondary text-sm tracking-[0.3em] uppercase mb-4 font-medium">
            Diferencia
          </p>
          <h2 className="text-3xl md:text-5xl font-extralight text-primary-foreground leading-tight mb-6">
            ¿Por qué{" "}
            <span className="font-light text-secondary">ALGOS</span>?
          </h2>
          <p className="text-primary-foreground/60 font-light text-lg max-w-2xl mx-auto">
            No somos una clínica más. Somos el primer centro en Venezuela dedicado exclusivamente
            a la medicina intervencionista del dolor con estándares europeos.
          </p>
        </div>

        {/* Stats bar */}
        <div className="scroll-reveal grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`scroll-reveal scroll-reveal-delay-${idx + 1} text-center p-5 rounded-2xl border transition-all duration-300 ${
                stat.highlight
                  ? "bg-accent/10 border-accent/30"
                  : "bg-primary-foreground/[0.04] border-primary-foreground/10"
              }`}
            >
              <span className={`block text-3xl md:text-4xl font-extralight mb-2 ${
                stat.highlight ? "text-accent" : "text-secondary"
              }`}>
                {stat.value}
              </span>
              <span className="text-xs text-primary-foreground/50 font-light leading-snug block">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Differentiator cards — 3 columns */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {differentiators.map((item, idx) => (
            <div
              key={item.title}
              className={`scroll-reveal scroll-reveal-delay-${(idx % 3) + 1} group p-6 rounded-2xl border border-primary-foreground/10 bg-primary-foreground/[0.03] hover:bg-primary-foreground/[0.07] hover:border-secondary/30 transition-all duration-500`}
            >
              <div className="w-11 h-11 rounded-xl bg-secondary/15 flex items-center justify-center mb-4 group-hover:bg-secondary/25 group-hover:scale-105 transition-all duration-300">
                <item.icon className="w-5 h-5 text-secondary" />
              </div>
              <h3 className="text-base font-medium text-primary-foreground mb-2">{item.title}</h3>
              <p className="text-primary-foreground/50 font-light text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
