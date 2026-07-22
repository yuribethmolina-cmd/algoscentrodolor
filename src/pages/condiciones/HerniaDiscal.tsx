import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import { Link } from "react-router-dom";
import PageHero from "@/components/PageHero";
import ConditionGallery from "@/components/ConditionGallery";
import heroAsset from "@/assets/cond-hernia-discal.jpg.asset.json";
import { ALGOS } from "@/config/algos.config";
import SEOHead from "@/components/SEOHead";

const WA = ALGOS.contact.whatsappHref + "?text=Hola%2C%20quisiera%20orientaci%C3%B3n%20sobre%20la%20hernia%20discal.";

export default function HerniaDiscal() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <SEOHead
        title="Hernia discal sin cirugía — Tratamiento en Maracaibo | ALGOS"
        description="Tratamiento mínimamente invasivo para hernia discal en Maracaibo. Infiltraciones y ozono guiados por imagen. Sin hospitalización, alta el mismo día. Neurocirujano especialista en el Estado Zulia."
        canonical="https://algoscentrodolor.com/condiciones/hernia-discal"
      />
      <main>
        <PageHero
          eyebrow="Condición"
          title="Hernia discal: cuando el disco comprime un nervio"
          patientTitle="Me dijeron que tengo hernia"
          patientSubtitle="Una hernia discal no siempre requiere cirugía. En la mayoría de los casos hay opciones mínimamente invasivas que alivian el dolor sin pasar por el quirófano."
        />

        <div className="bg-cream pt-8 md:pt-10">
          <div className="mx-auto max-w-[1080px] px-6 md:px-12">
            <ConditionGallery heroSrc={heroAsset.url} conditionName="Hernia discal" />
          </div>
        </div>


        <article className="bg-cream py-16 md:py-24">
          <div className="mx-auto max-w-[800px] px-6 md:px-12">
            <p className="font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.22em] mb-5">Qué es</p>
            <p className="font-sans text-deep-teal text-[17px] leading-[1.75] mb-12">
              Un disco intervertebral actúa como amortiguador entre las vértebras. Cuando parte de ese disco se desplaza y presiona una raíz nerviosa, produce dolor, en la espalda, en la pierna, o en ambas, según el nivel y el nervio afectado. El diagnóstico se confirma con imagen: no toda hernia duele, y no todo dolor lumbar es una hernia.
            </p>

            <p className="font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.22em] mb-5">Cuándo consultar a un especialista</p>
            <p className="font-sans text-deep-teal text-[17px] leading-[1.75] mb-12">
              Si le han dicho que tiene una hernia y el dolor lleva semanas sin mejorar; si el dolor baja por la pierna; si hay hormigueo, adormecimiento o pérdida de fuerza; o si le han hablado de cirugía y quiere explorar opciones intermedias, es momento de una evaluación especializada.
            </p>

            <div className="mb-14">
              <p className="font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.22em] mb-5">Cómo lo abordamos en ALGOS</p>
              <p className="font-sans text-deep-teal text-[17px] leading-[1.75]">
                  La consulta y la imagen confirman el nivel comprometido y el grado de compromiso nervioso. Según el caso: manejo con medicamentos, <Link to="/procedimientos/infiltraciones-y-bloqueos" className="text-brand-teal hover:text-algos-gold underline underline-offset-2 transition-colors">infiltraciones y bloqueos guiados por imagen</Link> para controlar la inflamación y el dolor, o <Link to="/procedimientos/ozono-hernia-discal" className="text-brand-teal hover:text-algos-gold underline underline-offset-2 transition-colors">ozono intradiscal</Link> cuando la hernia es la causa confirmada del dolor. La cirugía se considera cuando las opciones intermedias se han agotado, no antes.
                </p>
            </div>

            <div className="border-t border-deep-teal/10 pt-10">
              <p className="font-sans text-steel-teal text-[13px] leading-[1.65]">
                La información de esta página es orientativa y no sustituye la evaluación de un médico. Si presenta un dolor intenso o síntomas de alarma, busque atención médica.
              </p>
            </div>
          </div>
        </article>

        <section className="bg-deep-teal py-20 md:py-28">
          <div className="mx-auto max-w-[720px] px-6 md:px-12 text-center">
            <p className="font-sans text-cream/80 text-[18px] leading-[1.65] mb-10 max-w-[46ch] mx-auto">
              Cuéntenos cómo es su dolor y un médico le orientará sobre el paso siguiente.
            </p>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="inline-block bg-brand-teal hover:bg-[#4a9ca8] text-cream font-sans font-bold uppercase text-[13px] tracking-[0.2em] rounded-none px-10 py-5 transition-colors">
              Escribir por WhatsApp
            </a>
          </div>
        </section>
      </main>
      <HomeFooter />
    </div>
  );
}
