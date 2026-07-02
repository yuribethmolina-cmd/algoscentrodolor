import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Link } from "react-router-dom";
import PageHeroVideo from "@/components/PageHeroVideo";

const WA = "https://wa.me/584146807886?text=Hola%2C%20quisiera%20orientaci%C3%B3n%20sobre%20el%20dolor%20lumbar.";

export default function DolorLumbar() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      <main>
        <PageHeroVideo
          eyebrow="Condición"
          title="Dolor lumbar: el dolor de cintura que no cede"
          video="pacientes"
        />

        <article className="bg-cream py-16 md:py-24">
          <div className="mx-auto max-w-[800px] px-6 md:px-12">

            <p className="font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.22em] mb-5">
              Qué es
            </p>
            <p className="font-sans text-deep-teal text-[17px] leading-[1.75] mb-12">
              El dolor lumbar es el dolor en la parte baja de la espalda — la zona de la cintura. Sus causas son variadas: puede venir de los discos, de las articulaciones de la columna (facetas), de los músculos, de los ligamentos, o de los nervios. Por eso el tratamiento correcto depende de identificar el origen, no de tratar el síntoma.
            </p>

            <p className="font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.22em] mb-5">
              Cuándo consultar a un especialista
            </p>
            <p className="font-sans text-deep-teal text-[17px] leading-[1.75] mb-12">
              Si el dolor lleva más de cuatro semanas sin mejorar; si no cede con reposo ni analgésicos; si empeora al estar sentado o de pie por tiempo prolongado; si se acompaña de dolor que baja hacia la pierna; o si interfiere con el trabajo y la vida diaria — es momento de una evaluación especializada.
            </p>

            <p className="font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.22em] mb-5">
              Cómo lo abordamos en ALGOS
            </p>
            <p className="font-sans text-deep-teal text-[17px] leading-[1.75] mb-4">
              La consulta y, cuando hace falta, la imagen confirman el origen del dolor. Según lo que se encuentre: manejo con medicamentos, fisiatría, o procedimientos guiados por imagen como <Link to="/procedimientos/infiltraciones-y-bloqueos" className="text-brand-teal hover:text-algos-gold underline underline-offset-2 transition-colors">infiltraciones y bloqueos</Link>. Solo se indica lo que el caso necesita.
            </p>

            <div className="mt-14 border-t border-deep-teal/10 pt-10">
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
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-brand-teal hover:bg-[#4a9ca8] text-cream font-sans font-bold uppercase text-[13px] tracking-[0.2em] rounded-none px-10 py-5 transition-colors"
            >
              Escríbanos por WhatsApp
            </a>
          </div>
        </section>
      </main>

      <HomeFooter />
      <WhatsAppButton />
    </div>
  );
}
