import { useParams, Navigate, Link } from "react-router-dom";
import { CONDITIONS } from "@/data/treatments";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import SEOHead from "@/components/SEOHead";
import { MedicalProcedureSchema, BreadcrumbSchema } from "@/components/StructuredData";
import imgLumbar from "@/assets/tx-01-lumbar.jpg";
import imgCervical from "@/assets/tx-02-cervical.jpg";
import imgFacetario from "@/assets/about-procedure.jpg";
import imgNeuropatia from "@/assets/tx-03-perif.jpg";
import imgArticular from "@/assets/tx-04-eco.jpg";

const HERO_IMAGES: Record<string, string> = {
  "dolor-lumbar-ciatica": imgLumbar,
  "dolor-cervical": imgCervical,
  "dolor-facetario": imgFacetario,
  "neuropatia": imgNeuropatia,
  "dolor-articular": imgArticular,
};

export default function TratamientoDetalle() {
  const { slug } = useParams();
  const condition = CONDITIONS.find((c) => c.slug === slug);
  if (!condition) return <Navigate to="/tratamientos" replace />;

  const heroImg = HERO_IMAGES[condition.slug];

  return (
    <div className="min-h-screen bg-cream">
      <SEOHead
        title={`Tratamiento de ${condition.name.toLowerCase()} en Maracaibo | ALGOS`}
        description={`${condition.patientDescription} Procedimientos ALGOS: ${condition.procedures.map((p) => p.label).join(", ")}. Maracaibo, Venezuela.`}
        canonical={`https://algos.lovable.app/tratamientos/${condition.slug}`}
      />
      <MedicalProcedureSchema condition={condition} />
      <BreadcrumbSchema
        items={[
          { name: "Inicio", url: "https://algos.lovable.app" },
          { name: "Tratamientos", url: "https://algos.lovable.app/tratamientos" },
          { name: condition.name, url: `https://algos.lovable.app/tratamientos/${condition.slug}` },
        ]}
      />
      <Navbar />
      <main>
        {/* SECCIÓN 1 · HERO */}
        <section className="relative overflow-hidden min-h-[60vh] md:min-h-[65vh] flex items-center pt-32 md:pt-40 pb-16 md:pb-20">
          {heroImg && (
            <img
              src={heroImg}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          )}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#f5f0e8]/97 via-[#f5f0e8]/85 to-[#f5f0e8]/20 md:from-[#f5f0e8]/95 md:via-[#f5f0e8]/75 md:to-[#f5f0e8]/10"
          />
          <div className="relative z-10 container mx-auto max-w-7xl px-6 md:px-12">
            <div className="max-w-2xl">
              <Link
                to="/tratamientos"
                className="inline-flex items-center gap-2 text-[#1a4a55]/70 hover:text-[#c69636] text-sm font-medium mb-8 transition-colors"
              >
                <span aria-hidden>←</span>
                <span>Todos los tratamientos</span>
              </Link>
              <p className="text-[#c69636] font-medium text-sm tracking-[0.25em] uppercase mb-6">
                {condition.clinicalName}
              </p>
              <h1 className="font-display font-bold text-[#1a4a55] text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-6">
                {condition.name}
              </h1>
              <p className="font-sans text-[#1a4a55]/80 text-lg md:text-xl leading-relaxed">
                {condition.patientDescription}
              </p>
            </div>
          </div>
        </section>

        {/* SECCIÓN 2 · ¿Qué es y por qué duele? */}
        <section className="bg-white py-20 md:py-28">
          <div className="container mx-auto max-w-3xl px-6 md:px-12">
            <h2 className="font-display font-bold text-[#1a4a55] text-3xl md:text-4xl mb-8">
              ¿Qué es y por qué duele?
            </h2>
            <div className="prose prose-lg max-w-none mb-12">
              <p className="font-sans text-[#1a4a55]/80 text-base md:text-lg leading-relaxed whitespace-pre-line">
                {condition.whatIs}
              </p>
            </div>
            <h3 className="font-display font-semibold text-[#1a4a55] text-xl md:text-2xl mb-6">
              Síntomas comunes
            </h3>
            <ul className="space-y-3">
              {condition.symptoms.map((s) => (
                <li key={s} className="flex items-start gap-3 text-[#1a4a55]/85 text-base leading-relaxed">
                  <span className="text-[#c69636] mt-1.5 text-xs" aria-hidden>●</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* SECCIÓN 3 · ¿Cuándo considerar? */}
        <section className="bg-cream py-20 md:py-28">
          <div className="container mx-auto max-w-3xl px-6 md:px-12">
            <h2 className="font-display font-bold text-[#1a4a55] text-3xl md:text-4xl mb-10">
              ¿Cuándo considerar tratamiento intervencionista?
            </h2>
            <ul className="space-y-5">
              {condition.whenToConsider.map((item, i) => (
                <li key={item} className="flex items-start gap-5">
                  <span className="shrink-0 w-9 h-9 rounded-full bg-[#3d8b96] text-[#f5f0e8] flex items-center justify-center font-semibold text-sm">
                    {i + 1}
                  </span>
                  <p className="font-sans text-[#1a4a55]/85 text-base md:text-lg leading-relaxed pt-1">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* SECCIÓN 4 · Procedimientos */}
        <section className="bg-white py-20 md:py-28">
          <div className="container mx-auto max-w-5xl px-6 md:px-12">
            <h2 className="font-display font-bold text-[#1a4a55] text-3xl md:text-4xl mb-3">
              Procedimientos para {condition.name.toLowerCase()}
            </h2>
            <p className="font-sans text-[#1a4a55]/70 text-lg mb-12">
              Técnicas que aplicamos en ALGOS para esta condición.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {condition.procedures.map((p) => (
                <article
                  key={p.slug}
                  className="bg-cream rounded-2xl border border-[#1a4a55]/10 p-8"
                >
                  <span className="inline-block bg-white border border-[#3d8b96]/30 rounded-full px-3 py-1 text-xs font-medium text-[#1a4a55] mb-4">
                    {p.label}
                  </span>
                  <h3 className="font-display font-semibold text-[#1a4a55] text-xl mb-3">
                    {p.technicalName}
                  </h3>
                  <p className="font-sans text-[#1a4a55]/80 text-sm leading-relaxed">
                    {p.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SECCIÓN 5 · Qué esperar */}
        <section className="bg-[#1a4a55] py-20 md:py-28">
          <div className="container mx-auto max-w-3xl px-6 md:px-12">
            <h2 className="font-display font-bold text-[#f5f0e8] text-3xl md:text-4xl mb-12">
              Qué esperar el día del procedimiento
            </h2>
            <ol className="space-y-6">
              {condition.whatToExpect.map((step, i) => (
                <li key={step} className="flex items-start gap-5">
                  <span className="font-display font-bold text-[#c69636] text-3xl md:text-4xl leading-none shrink-0 w-14">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="font-sans text-[#f5f0e8]/90 text-base md:text-lg leading-relaxed pt-2">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* SECCIÓN 6 · FAQ */}
        <section className="bg-cream py-20 md:py-28">
          <div className="container mx-auto max-w-3xl px-6 md:px-12">
            <h2 className="font-display font-bold text-[#1a4a55] text-3xl md:text-4xl mb-12 text-center">
              Preguntas frecuentes
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {condition.faq.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left font-display font-semibold text-[#1a4a55] text-lg hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-[#1a4a55]/80 leading-relaxed whitespace-pre-line">
                      {item.a}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* SECCIÓN 7 · CTA dual */}
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
