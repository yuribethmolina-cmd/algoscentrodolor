import { Link } from "react-router-dom";
import { CONDITIONS, PROCEDURES } from "@/data/treatments";
import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import AudienceToggle, { useAudienceView } from "@/components/AudienceToggle";
import ConditionCard from "@/components/ConditionCard";
import SEOHead from "@/components/SEOHead";
import { BreadcrumbSchema } from "@/components/StructuredData";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScanLine, Clock, Users, GraduationCap, type LucideIcon } from "lucide-react";

const HOW_ITEMS: { Icon: LucideIcon; title: string; description: string }[] = [
  { Icon: ScanLine, title: "Guiados por imagen", description: "Ecografía + fluoroscopia para precisión milimétrica" },
  { Icon: Clock, title: "Ambulatorios", description: "Misma tarde a casa en la mayoría de casos" },
  { Icon: Users, title: "Equipo familiar", description: "Tres hermanos · especialidades complementarias · Maracaibo + Alemania" },
  { Icon: GraduationCap, title: "Formación internacional", description: "Protocolos basados en práctica clínica en Niedersachsen" },
];

export default function Tratamientos() {
  const [view] = useAudienceView();

  return (
    <div className="min-h-screen bg-cream">
      <SEOHead
        title="Tratamientos del dolor crónico en Maracaibo | ALGOS"
        description="Centro de dolor intervencionista en Maracaibo. Procedimientos mínimamente invasivos guiados por imagen para dolor lumbar, cervical, facetario, articular y deportivo. Equipo con formación clínica internacional."
        canonical="https://algos.lovable.app/tratamientos"
      />
      <BreadcrumbSchema
        items={[
          { name: "Inicio", url: "https://algos.lovable.app" },
          { name: "Tratamientos", url: "https://algos.lovable.app/tratamientos" },
        ]}
      />
      <Navbar />
      <main>
        <section className="relative overflow-hidden bg-cream min-h-[60vh] md:min-h-[55vh] flex items-center pt-32 md:pt-40">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src="/media/tratamientos-hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#f5f0e8]/95 via-[#f5f0e8]/80 to-[#f5f0e8]/40 md:from-[#f5f0e8]/90 md:via-[#f5f0e8]/70 md:to-[#f5f0e8]/30" />
          <div className="relative z-10 container mx-auto max-w-7xl px-6 md:px-12 py-12 md:py-16">
            <div className="max-w-3xl">
              <p className="text-[#c69636] font-medium text-sm tracking-[0.25em] uppercase mb-6">
                PROCEDIMIENTOS GUIADOS POR IMAGEN
              </p>
              <h1 className="font-display font-bold text-[#1a4a55] text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-6">
                Tratamientos para el dolor{" "}
                <span className="text-[#c69636] font-bold">crónico</span>
              </h1>
              <p className="font-sans text-[#1a4a55]/80 text-lg md:text-xl leading-relaxed max-w-2xl">
                Cinco condiciones de dolor que tratamos en ALGOS con procedimientos mínimamente invasivos guiados por imagen, basados en protocolos de formación clínica internacional.
              </p>
            </div>
          </div>
        </section>

        <AudienceToggle />

        <section className="bg-cream py-20 md:py-28">
          <div className="container mx-auto max-w-7xl px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {CONDITIONS.map((c) => (
                <ConditionCard key={c.slug} condition={c} view={view} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#1a4a55] py-20 md:py-28">
          <div className="container mx-auto max-w-7xl px-6 md:px-12">
            <div className="text-center mb-12 md:mb-16">
              <p className="text-[#c69636] font-medium text-sm tracking-[0.25em] uppercase mb-4">
                CÓMO TRABAJAMOS
              </p>
              <h2 className="font-display font-bold text-[#f5f0e8] text-3xl md:text-4xl lg:text-5xl">
                Lo que aplica a <span className="text-[#c69636]">todos</span> nuestros procedimientos
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
              {HOW_ITEMS.map(({ Icon, title, description }) => (
                <div key={title} className="text-center md:text-left">
                  <Icon className="w-8 h-8 text-[#c69636] mx-auto md:mx-0 mb-4" />
                  <h4 className="font-display font-semibold text-[#f5f0e8] text-xl mb-2">{title}</h4>
                  <p className="font-sans text-[#f5f0e8]/80 text-sm leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCEDURE INDEX */}
        <section className="bg-cream py-20 md:py-28">
          <div className="container mx-auto max-w-3xl px-6 md:px-12">
            <div className="text-center mb-12">
              <h2 className="font-display font-bold text-[#1a4a55] text-3xl md:text-4xl mb-4">
                Procedimientos que realizamos
              </h2>
              <p className="font-sans text-[#1a4a55]/70 text-lg">
                Ver lista completa de técnicas y para qué condiciones se usan.
              </p>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {PROCEDURES.map((proc) => (
                <AccordionItem key={proc.slug} value={proc.slug}>
                  <AccordionTrigger className="text-left font-display font-semibold text-[#1a4a55] text-lg hover:no-underline">
                    {proc.name}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-[#1a4a55]/80 mb-4 leading-relaxed">{proc.description}</p>
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="text-xs uppercase tracking-wider text-[#1a4a55]/60 mr-1">
                        Se usa para:
                      </span>
                      {proc.usedFor.map((condSlug) => {
                        const cond = CONDITIONS.find((c) => c.slug === condSlug);
                        return cond ? (
                          <Link
                            key={condSlug}
                            to={`/tratamientos/${condSlug}`}
                            className="bg-white border border-[#3d8b96]/30 hover:bg-[#3d8b96]/10 rounded-full px-3 py-1 text-xs font-medium text-[#1a4a55] transition-colors"
                          >
                            {cond.name}
                          </Link>
                        ) : null;
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA DUAL */}
        <section className="bg-cream pb-20 md:pb-28">
          <div className="container mx-auto max-w-6xl px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <article className="bg-[#3d8b96] text-[#f5f0e8] rounded-2xl p-10 md:p-12">
                <p className="text-[#f5f0e8]/70 text-xs uppercase tracking-widest font-medium mb-4">
                  PACIENTES
                </p>
                <h3 className="font-display font-semibold text-2xl md:text-3xl mb-3">
                  ¿Listo para evaluar su caso?
                </h3>
                <p className="text-[#f5f0e8]/90 mb-8 leading-relaxed">
                  Primera valoración con un especialista del equipo. Sin compromiso.
                </p>
                <Link
                  to="/pacientes/agendar"
                  className="inline-flex items-center gap-2 bg-[#f5f0e8] text-[#1a4a55] hover:gap-3 transition-all rounded-full px-6 py-3 font-semibold text-sm"
                >
                  <span>Agendar valoración</span>
                  <span aria-hidden>→</span>
                </Link>
              </article>
              <article className="bg-[#1a4a55] text-[#f5f0e8] rounded-2xl p-10 md:p-12">
                <p className="text-[#f5f0e8]/70 text-xs uppercase tracking-widest font-medium mb-4">
                  MÉDICOS
                </p>
                <h3 className="font-display font-semibold text-2xl md:text-3xl mb-3">
                  ¿Tiene un paciente para referir?
                </h3>
                <p className="text-[#f5f0e8]/90 mb-8 leading-relaxed">
                  Formulario clínico con reporte de seguimiento al referente.
                </p>
                <Link
                  to="/medicos/referir"
                  className="inline-flex items-center gap-2 bg-[#c69636] text-[#1a4a55] hover:gap-3 transition-all rounded-full px-6 py-3 font-semibold text-sm"
                >
                  <span>Iniciar referencia</span>
                  <span aria-hidden>→</span>
                </Link>
              </article>
            </div>
          </div>
        </section>
      </main>
      <HomeFooter />
    </div>
  );
}
