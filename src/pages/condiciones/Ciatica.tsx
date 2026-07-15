import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Link } from "react-router-dom";
import PageHero from "@/components/PageHero";
import SEOHead from "@/components/SEOHead";
import ConditionGallery from "@/components/ConditionGallery";
import heroAsset from "@/assets/cond-articular-cadera.jpg.asset.json";
import ciaticaAnatomia from "@/assets/ciatica-anatomia.jpeg.asset.json";
import { ALGOS } from "@/config/algos.config";

const WA = ALGOS.contact.whatsappHref + "?text=Hola%2C%20quisiera%20orientaci%C3%B3n%20sobre%20la%20ci%C3%A1tica.";

export default function Ciatica() {
  return (
    <div className="min-h-screen bg-cream">
      <SEOHead
        title="Ciática en Maracaibo: causas y tratamiento | ALGOS"
        description="Diagnóstico y tratamiento de la ciática en Maracaibo: infiltraciones, bloqueos guiados por imagen y ozono intradiscal cuando la causa es una hernia discal."
        canonical="https://algoscentrodolor.com/condiciones/ciatica"
      />
      <Navbar />
      <SEOHead
        title="Ciática — Tratamiento del dolor de nervio en Maracaibo | ALGOS"
        description="Dolor que baja por la pierna desde la espalda. Tratamiento intervencionista para ciática en Maracaibo, Estado Zulia. EMG para confirmar el nervio afectado. Neurocirujano especialista."
        canonical="https://algoscentrodolor.com/condiciones/ciatica"
      />
      <main>
        <PageHero
          eyebrow="Condición"
          title="Ciática: cuando el dolor baja por la pierna"
          patientTitle="Se me duerme la pierna"
          patientSubtitle="Dolor que nace en la espalda baja y baja por el glúteo hacia la pierna, a veces con hormigueo, corrientazo o sensación de adormecimiento."
        />

        <div className="bg-cream pt-8 md:pt-10">
          <div className="mx-auto max-w-[1080px] px-6 md:px-12">
            <ConditionGallery heroSrc={heroAsset.url} conditionName="Ciática" />
          </div>
        </div>


        <article className="bg-cream py-16 md:py-24">
          <div className="mx-auto max-w-[800px] px-6 md:px-12">
            <h2 className="font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.22em] mb-5">Qué es</h2>
            <p className="font-sans text-deep-teal text-[17px] leading-[1.75] mb-12">
              La ciática es un dolor que nace en la parte baja de la espalda y baja por la pierna, a veces como un corrientazo, a veces con hormigueo o adormecimiento. Ocurre cuando algo irrita o comprime el nervio ciático, con frecuencia, una hernia de disco. No es "un dolor de espalda más": es un nervio pidiendo atención.
            </p>

            <figure className="mb-12">
              <img src={ciaticaAnatomia.url} alt="Anatomía del nervio ciático" width={1200} height={800} loading="lazy" decoding="async" className="w-full rounded-sm" />
              <figcaption className="font-sans text-steel-teal text-[13px] leading-[1.5] mt-3 text-center">
                El nervio ciático recorre desde la zona lumbar hasta la pierna.
              </figcaption>
            </figure>

            <h2 className="font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.22em] mb-5">Cuándo consultar a un especialista</h2>
            <p className="font-sans text-deep-teal text-[17px] leading-[1.75] mb-12">
              Si el dolor lleva semanas y no cede con reposo ni calmantes; si baja de la rodilla; si se acompaña de hormigueo, adormecimiento o pérdida de fuerza en la pierna; o si ya le hablaron de cirugía y quiere saber si existe un paso intermedio, es momento de una evaluación especializada.
            </p>

            <div className="mb-14">
              <h2 className="font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.22em] mb-5">Cómo lo abordamos en ALGOS</h2>
              <p className="font-sans text-deep-teal text-[17px] leading-[1.75]">
                  Primero, la causa: la consulta y, cuando hacen falta, la imagen y la electromiografía confirman qué está comprimiendo el nervio y dónde. Después, el tratamiento que su caso necesita: puede ir desde el manejo con medicamentos hasta <Link to="/procedimientos/infiltraciones-y-bloqueos" className="text-brand-teal hover:text-algos-gold underline underline-offset-2 transition-colors">infiltraciones y bloqueos guiados por imagen</Link>, y, si la causa es una hernia de disco confirmada, el <Link to="/procedimientos/ozono-hernia-discal" className="text-brand-teal hover:text-algos-gold underline underline-offset-2 transition-colors">ozono intradiscal</Link> como opción antes de plantear una cirugía. Solo lo que hace falta, en el orden que hace falta.
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
              Cuéntenos cómo es su dolor y le orientamos sobre el paso siguiente.
            </p>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="inline-block bg-brand-teal hover:bg-[#4a9ca8] text-cream font-sans font-bold uppercase text-[13px] tracking-[0.2em] rounded-none px-10 py-5 transition-colors">
              Escribir por WhatsApp
            </a>
          </div>
        </section>
      </main>
      <HomeFooter />
      <WhatsAppButton />
    </div>
  );
}
