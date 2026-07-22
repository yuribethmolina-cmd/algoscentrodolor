import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import { Link } from "react-router-dom";
import PageHero from "@/components/PageHero";
import SEOHead from "@/components/SEOHead";
import ConditionGallery from "@/components/ConditionGallery";
import heroAsset from "@/assets/cefalea-mujer.jpg.asset.json";
import { ALGOS } from "@/config/algos.config";

const WA = ALGOS.contact.whatsappHref + "?text=Hola%2C%20quisiera%20orientaci%C3%B3n%20sobre%20las%20cefaleas.";

export default function Cefaleas() {
  return (
    <div className="min-h-screen bg-cream">
      <SEOHead
        title="Cefaleas cervicogénicas y neuralgia occipital en Maracaibo | ALGOS"
        description="Tratamiento de cefaleas con origen cervical y neuralgia occipital en Maracaibo. Bloqueos guiados por imagen para dolor de cabeza que no cede con analgésicos."
        canonical="https://algoscentrodolor.com/condiciones/cefaleas"
      />
      <Navbar />
      <main>
        <PageHero
          eyebrow="Condición"
          title="Cefaleas cervicogénicas y neuralgia occipital"
          patientTitle="Dolor de cabeza"
          patientSubtitle="Dolor de cabeza recurrente que no cede con analgésicos comunes, a menudo con origen en el cuello o en los nervios craneocervicales."
        />

        <div className="bg-cream pt-8 md:pt-10">
          <div className="mx-auto max-w-[1080px] px-6 md:px-12">
            <ConditionGallery heroSrc={heroAsset.url} conditionName="Cefaleas" />
          </div>
        </div>

        <article className="bg-cream py-16 md:py-24">
          <div className="mx-auto max-w-[800px] px-6 md:px-12">
            <h2 className="font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.22em] mb-5">Qué es</h2>
            <p className="font-sans text-deep-teal text-[17px] leading-[1.75] mb-12">
              Una cefalea no es una sola enfermedad. La migraña, la cefalea tensional y la cefalea en racimos son cuadros neurológicos con mecanismos propios que se manejan farmacológicamente. En ALGOS abordamos un grupo distinto: las cefaleas con un origen anatómico identificable en el cuello o en los nervios craneocervicales, donde un bloqueo dirigido puede aliviar el dolor.
            </p>
            <p className="font-sans text-deep-teal text-[17px] leading-[1.75] mb-12">
              La cefalea cervicogénica nace de las articulaciones facetarias cervicales altas (C1-C2-C3) o de los discos cervicales superiores. El dolor se percibe en la cabeza porque estas estructuras comparten inervación con el nervio trigémino. La neuralgia occipital se debe a irritación o atrapamiento de los nervios occipitales mayor y menor a su paso por la musculatura suboccipital, y produce un dolor eléctrico y punzante que recorre la nuca y sube hasta el cuero cabelludo.
            </p>

            <h2 className="font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.22em] mb-5">Cuándo consultar a un especialista</h2>
            <p className="font-sans text-deep-teal text-[17px] leading-[1.75] mb-12">
              Si tiene cefaleas de más de tres meses con un componente cervical claro; si le diagnosticaron migraña que no responde al tratamiento neurológico habitual; si el dolor empieza en la nuca o la base del cráneo y sube hacia la frente, la sien o detrás del ojo; si hay sensibilidad del cuero cabelludo al peinarse o apoyar la cabeza; o si necesita reducir el uso crónico de analgésicos o triptanes, es momento de una evaluación especializada.
            </p>

            <div className="mb-14">
              <h2 className="font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.22em] mb-5">Cómo lo abordamos en ALGOS</h2>
              <p className="font-sans text-deep-teal text-[17px] leading-[1.75]">
                Primero diferenciamos el tipo de cefalea y localizamos el generador del dolor mediante la historia clínica y la exploración física dirigida. Cuando el origen es cervical u occipital, aplicamos un bloqueo diagnóstico-terapéutico guiado por ecografía o fluoroscopia. Si el dolor cede tras el bloqueo, confirmamos la estructura responsable y podemos ofrecer <Link to="/procedimientos/infiltraciones-y-bloqueos" className="text-brand-teal hover:text-algos-gold underline underline-offset-2 transition-colors">infiltraciones y bloqueos</Link> o, como paso siguiente, radiofrecuencia para un alivio más prolongado.
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
    </div>
  );
}
