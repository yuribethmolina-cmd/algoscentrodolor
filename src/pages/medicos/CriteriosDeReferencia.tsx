import SectionLayout from "@/components/layouts/SectionLayout";
import { doctorLinks } from "@/lib/sectionLinks";
import { CheckCircle2, XCircle } from "lucide-react";

const inclusion = [
  "Dolor lumbar crónico (>3 meses) sin respuesta a tratamiento conservador",
  "Ciática o radiculopatía con correlación imagenológica",
  "Hernia discal con indicación de manejo no quirúrgico",
  "Dolor facetario confirmado por bloqueo diagnóstico",
  "Dolor articular crónico (rodilla, hombro, cadera, sacroilíaca)",
  "Neuropatía periférica con indicación de bloqueo",
  "Pacientes con indicación quirúrgica dudosa que buscan segunda opinión",
];

const exclusion = [
  "Emergencias neuroquirúrgicas (síndrome de cauda equina, déficit motor agudo)",
  "Infecciones activas en la zona de intervención",
  "Coagulopatías no controladas",
  "Pacientes sin estudios imagenológicos recientes",
];

export default function CriteriosDeReferencia() {
  return (
    <SectionLayout sectionLinks={doctorLinks}>
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="scroll-reveal text-center mb-16">
            <p className="text-secondary text-sm tracking-[0.3em] uppercase mb-4 font-medium">Criterios</p>
            <h1 className="text-3xl md:text-5xl font-extralight text-foreground leading-tight mb-6">
              Criterios de <span className="font-light text-secondary">referencia</span>
            </h1>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="scroll-reveal p-6 rounded-2xl border border-secondary/20 bg-secondary/5">
              <h3 className="text-lg font-medium text-foreground mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-secondary" /> Criterios de inclusión
              </h3>
              <ul className="space-y-3">
                {inclusion.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-muted-foreground font-light text-sm">
                    <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="scroll-reveal scroll-reveal-delay-1 p-6 rounded-2xl border border-destructive/20 bg-destructive/5">
              <h3 className="text-lg font-medium text-foreground mb-4 flex items-center gap-2">
                <XCircle className="w-5 h-5 text-destructive" /> Criterios de exclusión
              </h3>
              <ul className="space-y-3">
                {exclusion.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-muted-foreground font-light text-sm">
                    <XCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </SectionLayout>
  );
}
