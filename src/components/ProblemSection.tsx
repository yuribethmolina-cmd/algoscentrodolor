import { Pill, Users, HelpCircle, ShieldAlert } from "lucide-react";

const painPoints = [
  {
    num: "01",
    icon: Pill,
    text: "Has probado medicamentos sin resultado duradero",
  },
  {
    num: "02",
    icon: Users,
    text: "Has ido a varios médicos sin una solución clara",
  },
  {
    num: "03",
    icon: HelpCircle,
    text: "No sabes exactamente qué tienes ni por qué duele",
  },
  {
    num: "04",
    icon: ShieldAlert,
    text: "Te preocupa someterte a un procedimiento",
  },
];

export default function ProblemSection() {
  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-secondary/[0.04] blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-accent/[0.04] blur-3xl" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Split layout */}
        <div className="grid md:grid-cols-2 gap-16 items-start mb-16">
          {/* Left — headline + stat */}
          <div className="scroll-reveal md:sticky md:top-32">
            <p className="text-secondary/80 text-sm tracking-[0.3em] uppercase mb-4 font-medium">
              Te entendemos
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extralight text-primary leading-tight mb-8">
              Si llevas meses
              <br />
              con dolor,{" "}
              <span className="font-light text-secondary">
                esto te suena familiar
              </span>
            </h2>

          </div>

          {/* Right — numbered cards */}
          <div className="grid grid-rows-4 gap-4 h-full">
            {painPoints.map((item, idx) => (
              <div
                key={idx}
                className={`scroll-reveal scroll-reveal-delay-${idx + 1} group flex items-center justify-start gap-5 p-6 rounded-2xl border border-border bg-card hover:border-accent/40 hover:shadow-lg transition-all duration-300 relative overflow-hidden`}
              >
                {/* Gold left accent on hover */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent/0 group-hover:bg-accent transition-colors duration-300 rounded-l-2xl" />

                {/* Number */}
                <span className="text-xs font-medium tracking-[0.2em] text-secondary/30 mt-1 shrink-0">
                  {item.num}
                </span>

                {/* Icon */}
                <div className="w-12 h-12 rounded-md bg-secondary/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-secondary" />
                </div>

                {/* Text */}
                <p className="text-foreground/80 font-light text-lg leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bridge banner */}
        <div className="scroll-reveal">
          <div className="w-full py-6 px-8 rounded-2xl bg-primary text-center">
            <p className="text-primary-foreground font-light text-base md:text-lg leading-relaxed">
              Los pacientes con indicación de procedimiento intervencionista no tienen a dónde ir — o van a Caracas, o esperan, o se operan cuando quizás no lo necesitan.{" "}
              <span className="font-medium text-secondary">ALGOS cambia eso.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
