import { Link } from "react-router-dom";
import { useInViewOnce } from "@/lib/animations";
import { CONDITIONS, PROCEDURES } from "@/data/treatments";
import imgExperienceTech from "@/assets/experience-tech.jpg";
import imgSalaProcedimientos from "@/assets/sala-procedimientos.jpg";
import imgAboutProcedure from "@/assets/about-procedure.jpg";
import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import AudienceToggle, { useAudienceView } from "@/components/AudienceToggle";
import ConditionCard from "@/components/ConditionCard";
import SEOHead from "@/components/SEOHead";
import { BreadcrumbSchema } from "@/components/StructuredData";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScanLine, Clock, Users, GraduationCap, type LucideIcon } from "lucide-react";
import { ALGOS } from "@/config/algos.config";

const HOW_ITEMS: { Icon: LucideIcon; title: string; description: string }[] = [
  { Icon: ScanLine, title: "Guiados por imagen", description: "Ecografía + fluoroscopia para precisión milimétrica" },
  { Icon: Clock, title: "Ambulatorios", description: "Misma tarde a casa en la mayoría de casos" },
  { Icon: Users, title: "Equipo médico", description: "Neurocirujano especializado en dolor intervencionista · Dr. Atilio J. Rodríguez" },
  { Icon: GraduationCap, title: "Basado en evidencia", description: "Protocolos actualizados de manejo intervencionista del dolor crónico" },
];

export default function Tratamientos() {
  const [view] = useAudienceView();
  const { ref: cardsRef, inView: cardsIn } = useInViewOnce<HTMLDivElement>(0.05);

  return (
    <div className="min-h-screen bg-cream">
      <SEOHead
        title="Tratamientos del dolor crónico en Maracaibo | ALGOS"
        description="Centro de dolor intervencionista en Maracaibo. Procedimientos mínimamente invasivos guiados por imagen para dolor lumbar, cervical, facetario, articular y neuropatía. Neurocirujanos especializados en dolor."
        canonical="https://algoscentrodolor.com/tratamientos"
      />
      <BreadcrumbSchema
        items={[
          { name: "Inicio", url: "https://algoscentrodolor.com" },
          { name: "Tratamientos", url: "https://algoscentrodolor.com/tratamientos" },
        ]}
      />
      <Navbar />
      <main>
        <section className="relative overflow-hidden bg-cream min-h-[60vh] md:min-h-[55vh] flex items-center pt-28 md:pt-32">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          >
            <source src="/videos/tratamientos-hero.webm" type="video/webm" />
            <source src="/videos/tratamientos-hero.mp4" type="video/mp4" />
          </video>
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
                Cinco condiciones de dolor que tratamos en ALGOS con procedimientos mínimamente invasivos guiados por imagen, a cargo de neurocirujanos especializados en dolor intervencionista.
              </p>
            </div>
          </div>
        </section>

        <AudienceToggle />

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

        <section className="bg-cream py-20 md:py-28">
          <div className="container mx-auto max-w-7xl px-6 md:px-12">
            <div
              ref={cardsRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 grid-flow-dense gap-5 md:gap-6 auto-rows-fr"
            >
              {CONDITIONS.map((c, idx) => {
                // Bento pattern for 14 items on lg (12-col grid).
                const pattern: { span: string; variant: "standard" | "feature" }[] = [
                  { span: "lg:col-span-8", variant: "feature" },
                  { span: "lg:col-span-4", variant: "standard" },
                  { span: "lg:col-span-4", variant: "standard" },
                  { span: "lg:col-span-8", variant: "feature" },
                  { span: "lg:col-span-6", variant: "standard" },
                  { span: "lg:col-span-6", variant: "standard" },
                  { span: "lg:col-span-8", variant: "feature" },
                  { span: "lg:col-span-4", variant: "standard" },
                  { span: "lg:col-span-4", variant: "standard" },
                  { span: "lg:col-span-8", variant: "feature" },
                  { span: "lg:col-span-6", variant: "standard" },
                  { span: "lg:col-span-6", variant: "standard" },
                  { span: "lg:col-span-6", variant: "standard" },
                  { span: "lg:col-span-6", variant: "standard" },
                ];
                const cell = pattern[idx % pattern.length];
                return (
                  <div
                    key={c.slug}
                    className={cell.span}
                    style={{
                      opacity: cardsIn ? 1 : 0,
                      transform: cardsIn ? "none" : "translateY(20px)",
                      transition: `opacity 0.55s ease ${idx * 60}ms, transform 0.55s cubic-bezier(0.23,1,0.32,1) ${idx * 60}ms`,
                    }}
                  >
                    <ConditionCard condition={c} view={view} variant={cell.variant} />
                  </div>
                );
              })}
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
              <p className="font-sans text-[#1a4a55]/85 text-lg">
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
                      <span className="text-xs uppercase tracking-wider text-[#1a4a55]/75 mr-1">
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

        {/* ESTUDIOS Y OTROS TRATAMIENTOS */}
        <section className="bg-[#1a4a55] py-20 md:py-28">
          <div className="container mx-auto max-w-7xl px-6 md:px-12">
            <div className="max-w-3xl mb-12 md:mb-16">
              <p className="text-[#c69636] font-medium text-sm tracking-[0.25em] uppercase mb-4">
                ESTUDIOS Y OTROS TRATAMIENTOS
              </p>
              <h2 className="font-display font-bold text-[#f5f0e8] text-3xl md:text-4xl lg:text-5xl leading-tight">
                Complementamos con estudios diagnósticos y técnicas adicionales.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
              {[
                {
                  category: "Electrodiagnóstico",
                  title: "Electromiografía (EMG)",
                  bajada: "Estudio de los nervios y los músculos.",
                  description: "Mide cómo viajan las señales por sus nervios y cómo responden sus músculos. Confirma el origen de dolores con hormigueo, adormecimiento o debilidad, y le señala al especialista dónde está el problema para tratarlo con precisión.",
                  image: imgExperienceTech,
                },
                {
                  category: "Electrodiagnóstico",
                  title: "Electroencefalograma (EEG)",
                  bajada: "Estudio de la actividad eléctrica del cerebro.",
                  description: "Registra la actividad eléctrica de su cerebro con electrodos sobre el cuero cabelludo. Estudio sencillo, no invasivo y sin dolor. Indicado ante convulsiones, episodios de desmayo, sospecha de epilepsia o seguimiento de condiciones neurológicas.",
                  image: imgSalaProcedimientos,
                },
                {
                  category: "Columna · Hernia discal",
                  title: "Discólisis con ozono",
                  bajada: "Tratamiento del dolor de disco sin cirugía.",
                  description: "Aplicación de ozono médico en el disco de la columna, guiada por imagen, que ayuda a reducir el volumen de la hernia y la inflamación que irrita el nervio. Indicado para la ciática por hernia discal lumbar cuando el dolor no ha cedido con otros tratamientos.",
                  image: imgAboutProcedure,
                },
              ].map((s) => (
                <div key={s.title} className="group relative overflow-hidden rounded-none bg-[#123c46] border border-[#f5f0e8]/10 p-8 md:p-10 transition-colors hover:border-[#c69636]/40">
                  <img src={s.image} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover opacity-[0.10] mix-blend-luminosity transition-opacity group-hover:opacity-[0.16]" />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-transparent via-[#123c46]/40 to-[#123c46]" />
                  <div className="relative z-10">
                    <p className="font-ui font-bold text-[10px] tracking-[0.22em] uppercase text-[#c69636] mb-3">{s.category}</p>
                    <h3 className="font-display font-semibold text-[#f5f0e8] text-xl md:text-2xl mb-2 leading-snug">{s.title}</h3>
                    <p className="font-sans text-sm text-[#f5f0e8]/82 mb-5">{s.bajada}</p>
                    <div className="h-px w-10 bg-[#c69636]/50 mb-5" />
                    <p className="font-sans text-[15px] text-[#f5f0e8]/80 leading-relaxed">{s.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA DUAL */}
        <section className="bg-cream pt-24 md:pt-28 pb-20 md:pb-28">
          <div className="container mx-auto max-w-6xl px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <article className="bg-[#3d8b96] text-[#f5f0e8] rounded-none p-10 md:p-12">
                <p className="text-[#f5f0e8]/90 text-xs uppercase tracking-widest font-medium mb-4">
                  PACIENTES
                </p>
                <h3 className="font-display font-semibold text-2xl md:text-3xl mb-3">
                  ¿Listo para evaluar su caso?
                </h3>
                <p className="text-[#f5f0e8]/90 mb-8 leading-relaxed">
                  Primera valoración con un especialista del equipo. Sin compromiso.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={ALGOS.contact.whatsappHref + "?text=Hola%2C%20me%20gustar%C3%ADa%20agendar%20una%20valoraci%C3%B3n"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25d366] hover:bg-[#1fb859] text-white hover:gap-3 transition-all rounded font-ui font-bold uppercase px-6 py-4 text-sm tracking-[0.18em]"
                  >
                    <span>Escribir por WhatsApp</span>
                    <span aria-hidden>→</span>
                  </a>
                  <Link
                    to="/pacientes/agendar"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#f5f0e8] text-[#1a4a55] hover:gap-3 transition-all rounded font-ui font-bold uppercase px-6 py-4 text-sm tracking-[0.18em]"
                  >
                    <span>Formulario</span>
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </article>
              <article className="bg-[#1a4a55] text-[#f5f0e8] rounded-none p-10 md:p-12">
                <p className="text-[#f5f0e8]/90 text-xs uppercase tracking-widest font-medium mb-4">
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
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#c69636] text-[#1a4a55] hover:gap-3 transition-all rounded font-ui font-bold uppercase px-6 py-4 text-sm tracking-[0.18em]"
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
