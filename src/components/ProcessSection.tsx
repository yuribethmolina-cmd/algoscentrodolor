import { ClipboardCheck, Search, Syringe, HeartPulse, CalendarCheck, Activity, Apple, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: ClipboardCheck,
    num: "01",
    title: "Primera consulta",
    description:
      "Evaluación clínica, diagnóstico y propuesta de tratamiento personalizada.",
  },
  {
    icon: Activity,
    num: "02",
    title: "Electrodiagnóstico",
    description:
      "EMG/EEG si hay indicación. Diagnóstico neurofisiológico preciso para guiar el tratamiento.",
  },
  {
    icon: Apple,
    num: "03",
    title: "Evaluación nutricional",
    description:
      "Protocolo antiinflamatorio diseñado por el Lcdo. Daniel Rodríguez como complemento al tratamiento.",
  },
  {
    icon: Syringe,
    num: "04",
    title: "Procedimiento",
    description:
      "Guiado por imagen, documentado. Mínimamente invasivo, con rigor clínico.",
  },
  {
    icon: HeartPulse,
    num: "05",
    title: "Seguimiento",
    description:
      "Control a las 2 semanas, 1 mes y 3 meses. Acompañamiento continuo.",
  },
  {
    icon: Users,
    num: "06",
    title: "Interconsulta",
    description:
      "Casos complejos: segunda opinión internacional desde Alemania.",
  },
];

export default function ProcessSection() {
  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative vertical line — desktop */}
      <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-border to-transparent" />

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        {/* Header */}
        <div className="scroll-reveal text-center mb-20">
          <p className="text-secondary/80 text-sm tracking-[0.3em] uppercase mb-4 font-medium">
            Tu camino
          </p>
          <h2 className="text-3xl md:text-5xl font-extralight text-primary leading-tight">
            ¿Cómo funciona?
          </h2>
        </div>

        {/* Zigzag steps */}
        <div className="space-y-12 md:space-y-0">
          {steps.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={item.num}
                className={`scroll-reveal scroll-reveal-delay-${(idx % 4) + 1} md:grid md:grid-cols-2 md:gap-16 items-center ${idx > 0 ? "md:mt-16" : ""}`}
              >
                {/* Large number side */}
                <div
                  className={`hidden md:flex items-center justify-center ${isEven ? "order-1" : "order-2"}`}
                >
                  <span className="text-8xl lg:text-9xl font-extralight text-secondary/10 select-none">
                    {item.num}
                  </span>
                </div>

                {/* Content side */}
                <div
                  className={`${isEven ? "order-2" : "order-1"} flex gap-5 items-start`}
                >
                  {/* Mobile number */}
                  <span className="md:hidden text-5xl font-extralight text-secondary/15 select-none leading-none shrink-0">
                    {item.num}
                  </span>

                  <div className="flex-1">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center justify-center mb-4">
                      <item.icon className="w-7 h-7 text-secondary" />
                    </div>

                    <h3 className="text-2xl font-light text-primary mb-3">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Connector dot — desktop */}
                <div className="hidden md:block absolute left-1/2 -translate-x-1/2" style={{ marginTop: "-0.375rem" }}>
                  <div className="w-3 h-3 rounded-full bg-secondary border-4 border-background" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Final CTA */}
        <div className="scroll-reveal mt-20 text-center">
          <div className="inline-block p-8 rounded-2xl border border-border bg-card">
            <p className="text-xl font-light text-primary mb-4">
              ¿Listo para el primer paso?
            </p>
            <Button size="lg" className="rounded-full px-8 bg-secondary hover:bg-secondary/90 text-secondary-foreground">
              <CalendarCheck className="w-5 h-5 mr-2" />
              Agendar evaluación
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
