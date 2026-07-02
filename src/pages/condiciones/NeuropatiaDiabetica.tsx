import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Link } from "react-router-dom";
import PageHeroVideo from "@/components/PageHeroVideo";
import ConditionGallery from "@/components/ConditionGallery";
import heroAsset from "@/assets/cond-neuropatia.jpg.asset.json";

const WA = "https://wa.me/584146807886?text=Hola%2C%20quisiera%20orientaci%C3%B3n%20sobre%20la%20neuropat%C3%ADa%20diab%C3%A9tica.";

export default function NeuropatiaDiabetica() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main>
        <PageHeroVideo eyebrow="Condición" title="Neuropatía diabética: el daño nervioso por la diabetes" video="pacientes" />

        <div className="bg-cream pt-8 md:pt-10">
          <div className="mx-auto max-w-[1080px] px-6 md:px-12">
            <ConditionGallery heroSrc={heroAsset.url} conditionName="Neuropatía diabética" />
          </div>
        </div>


        <article className="bg-cream py-16 md:py-24">
          <div className="mx-auto max-w-[800px] px-6 md:px-12">
            <p className="font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.22em] mb-5">Qué es</p>
            <p className="font-sans text-deep-teal text-[17px] leading-[1.75] mb-12">
              Cuando la diabetes no está bien controlada, el azúcar elevado daña los nervios con el tiempo. La neuropatía diabética afecta con más frecuencia los pies y las piernas: se siente como ardor, hormigueo, adormecimiento o corrientazos. En algunos casos también produce pérdida de sensibilidad — lo cual, paradójicamente, puede ser peligroso porque el paciente no siente las heridas.
            </p>

            <p className="font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.22em] mb-5">Cuándo consultar a un especialista</p>
            <p className="font-sans text-deep-teal text-[17px] leading-[1.75] mb-12">
              Si tiene diabetes y siente ardor, hormigueo o adormecimiento en los pies o las piernas; si el dolor es peor de noche; si siente que los pies "no son suyos"; o si ya le han dicho que tiene neuropatía y los síntomas no están controlados — es momento de una evaluación especializada.
            </p>

            <div className="mb-14">
              <p className="font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.22em] mb-5">Cómo lo abordamos en ALGOS</p>
              <p className="font-sans text-deep-teal text-[17px] leading-[1.75]">
                  La <Link to="/procedimientos/emg" className="text-brand-teal hover:text-algos-gold underline underline-offset-2 transition-colors">electromiografía</Link> confirma el grado y la distribución del daño nervioso. Con ese mapa, el equipo define el tratamiento: manejo farmacológico del dolor neuropático, apoyo nutricional clínico orientado al control metabólico, y seguimiento conjunto. El objetivo es controlar el dolor y frenar el avance del daño.
                </p>
            </div></div>

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
              Cuéntenos sus síntomas y le orientamos sobre el paso siguiente.
            </p>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="inline-block bg-brand-teal hover:bg-[#4a9ca8] text-cream font-sans font-bold uppercase text-[13px] tracking-[0.2em] rounded-none px-10 py-5 transition-colors">
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
