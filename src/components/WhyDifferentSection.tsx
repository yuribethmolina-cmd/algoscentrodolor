import { Globe, Cpu, Shield, Crosshair } from "lucide-react";

const differentiators = [
  {
    icon: Crosshair,
    title: "El arsenal completo en una sola ruta",
    description: "Del diagnóstico al tratamiento, sin peregrinar.",
  },
  {
    icon: Globe,
    title: "La integración con UDUZ",
    description: "La misma imagen que encuentra el problema guía el tratamiento.",
  },
  {
    icon: Shield,
    title: "Mínimamente invasivo antes de operar",
    description: "Agotamos lo mínimamente invasivo primero. El posicionamiento puente.",
  },
  {
    icon: Cpu,
    title: "El criterio de tratar solo lo que hace falta",
    description: "El anti-sobrediagnóstico como promesa.",
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
            Lo que define cómo trabajamos.
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

        {/* Differentiator cards — 2 columns */}
        <div className="grid sm:grid-cols-2 gap-5">
          {differentiators.map((item, idx) => (
            <div
              key={item.title}
              className={`scroll-reveal scroll-reveal-delay-${(idx % 2) + 1} group p-6 rounded-2xl border border-primary-foreground/10 bg-primary-foreground/[0.03] hover:bg-primary-foreground/[0.07] hover:border-secondary/30 transition-all duration-500`}
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

        {/* Diferencial propio extra */}
        <blockquote className="scroll-reveal mt-14 mx-auto max-w-2xl text-center border-t border-primary-foreground/20 pt-12">
          <p className="text-primary-foreground/75 font-light text-lg leading-relaxed">
            "En ALGOS el tratamiento no termina cuando termina el procedimiento: seguimos su evolución y le acompañamos en el tiempo, porque el dolor crónico se maneja, no se abandona."
          </p>
        </blockquote>
      </div>
    </section>
  );
}
