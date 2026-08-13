import { Crosshair, Scan, Target, Gem, Users, Heart } from "lucide-react";
import Picture from "@/components/Picture";
import aboutProcedure from "@/assets/about-procedure.jpg?w=480;800;1200&format=avif;webp;jpg&as=picture";

const features = [
  {
    icon: Target,
    label: "Tratamos el dolor directamente en su origen",
  },
  {
    icon: Scan,
    label: "Procedimientos guiados por imagen en tiempo real",
  },
  {
    icon: Crosshair,
    label: "Precisión milimétrica, no tratamientos generales",
  },
];

const pillars = [
  {
    icon: Gem,
    title: "Precisión Técnica",
    description: "Protocolo definido en cada procedimiento. Sin excepción. Cada decisión basada en evidencia.",
  },
  {
    icon: Users,
    title: "Accesibilidad Real",
    description: "Calidad sin exclusión. Pensado para el mercado real del Zulia.",
  },
  {
    icon: Heart,
    title: "Atención Integral",
    description: "El dolor crónico no se resuelve con una sola herramienta. Neurocirugía + nutrición + electrodiagnóstico bajo un mismo protocolo.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left, text */}
          <div className="scroll-reveal">
            <p className="text-secondary text-sm tracking-[0.3em] uppercase mb-4 font-medium">
              ¿Qué es la medicina intervencionista?
            </p>
            <h2 className="text-3xl md:text-5xl font-extralight text-foreground leading-tight mb-6">
              No es cirugía.
              <br />
              No es solo medicación.
              <br />
              <span className="font-light text-secondary">Es precisión.</span>
            </h2>
            <p className="text-muted-foreground font-light text-lg leading-relaxed mb-4">
              La medicina intervencionista del dolor utiliza tecnología de imagen en tiempo real
              para tratar el origen exacto del dolor, sin cirugías invasivas ni dependencia
              de medicamentos. Es el estándar en Europa y Estados Unidos.
            </p>

            {/* Etymology block */}
            <div className="p-4 rounded-xl bg-accent/5 border border-accent/15 mb-8">
              <p className="text-sm text-foreground/80 font-light leading-relaxed">
                <span className="font-medium text-accent">ALGOS</span>, del griego{" "}
                <span className="">ἄλγος</span> (dolor). Raíz de <span>analgesia</span>,{" "}
                <span>neuralgia</span>, <span>mialgia</span>. No es un nombre de fantasía:{" "}
                <span className="font-medium text-foreground">es una declaración de especialidad.</span>
              </p>
            </div>

            <div className="space-y-4">
              {features.map((f, idx) => (
                <div
                  key={idx}
                  className={`scroll-reveal scroll-reveal-delay-${idx + 1} flex items-center gap-4`}
                >
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                    <f.icon className="w-5 h-5 text-secondary" />
                  </div>
                  <p className="text-foreground font-light">{f.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right, image with overlay */}
          <div className="scroll-reveal scroll-reveal-delay-2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Picture
                picture={aboutProcedure}
                alt="Procedimiento de infiltración guiada por ecógrafo en ALGOS"
                sizes="(max-width: 768px) 100vw, 50vw"
                className="w-full h-auto object-cover"
                fadeIn={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-primary-foreground/70 text-xs font-light tracking-wider uppercase">
                  Infiltración guiada por ecógrafo, precisión en tiempo real
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Philosophy Pillars */}
        <div className="grid md:grid-cols-3 gap-6 mt-20">
          {pillars.map((pillar, idx) => (
            <div
              key={pillar.title}
              className={`scroll-reveal scroll-reveal-delay-${idx + 1} p-6 rounded-2xl border border-border/50 bg-card hover:border-secondary/30 transition-all duration-500`}
            >
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                <pillar.icon className="w-5 h-5 text-secondary" />
              </div>
              <h3 className="text-base font-medium text-foreground mb-2">{pillar.title}</h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>

        {/* Lo que ALGOS No Es */}
        <div className="scroll-reveal mt-16 p-8 rounded-2xl border border-border/50 bg-card">
          <h3 className="text-lg font-medium text-foreground mb-4">Lo que ALGOS <span className="text-secondary">no</span> es</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              "No es una clínica de dolor genérica",
              "No es un centro quirúrgico",
              "No es un servicio de urgencias",
              "No es una farmacia de suplementos",
              "No es competencia de tu médico, es complemento",
            ].map((item) => (
              <p key={item} className="text-sm text-muted-foreground font-light flex items-start gap-2">
                <span className="text-accent font-medium mt-0.5">✕</span>
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
