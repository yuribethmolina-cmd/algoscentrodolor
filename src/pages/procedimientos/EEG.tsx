import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageHeroVideo from "@/components/PageHeroVideo";
import ProcedureDetails from "@/components/procedimiento/ProcedureDetails";
import imgMain from "@/assets/experience-tech.jpg";

const WA = "https://wa.me/584146807886?text=Hola%2C%20quisiera%20información%20sobre%20el%20Electroencefalograma%20(EEG).";

export default function EEG() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main>
        <PageHeroVideo eyebrow="Estudio" title="Electroencefalograma (EEG)" subtitle="Estudio de la actividad eléctrica del cerebro." video="tratamientos" />

        <div className="bg-cream">
          <div className="mx-auto max-w-[1080px] px-6 md:px-0">
            <div style={{ overflow: "hidden", aspectRatio: "16/7" }}>
              <img src={imgMain} alt="Electroencefalograma en ALGOS" className="w-full h-full object-cover" loading="eager" />
            </div>
          </div>
        </div>

        <section className="bg-cream py-16 md:py-24">
          <div className="mx-auto max-w-[800px] px-6 md:px-12">
            <p className="font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.22em] mb-5">Qué es</p>
            <p className="font-sans text-deep-teal text-[17px] leading-[1.7] mb-10">
              Registra la actividad eléctrica de su cerebro con unos electrodos que se colocan sobre el cuero cabelludo. Es un estudio sencillo, no invasivo y que no duele.
            </p>

            <p className="font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.22em] mb-5">Para qué sirve</p>
            <p className="font-sans text-deep-teal text-[17px] leading-[1.7]">
              Es el estudio indicado ante convulsiones o crisis, episodios de desmayo o pérdida de consciencia sin explicación, sospecha de epilepsia y el seguimiento de ciertas condiciones neurológicas.
            </p>
          </div>
        </section>

        <ProcedureDetails
          facts={[
            { label: "Duración", value: "30 a 45 min" },
            { label: "Anestesia", value: "No requiere" },
            { label: "Modalidad", value: "Ambulatorio" },
            { label: "Después", value: "Puede irse enseguida" },
          ]}
          preparation="Acuda con el cabello limpio, sin gel, spray ni acondicionador el día del estudio. Puede desayunar normal. Si el especialista le indicó dormir menos horas la noche previa, cúmplalo: ayuda a que el registro sea más completo."
          steps={[
            { title: "Recibimiento y entrevista breve", description: "Le preguntamos por sus síntomas, medicamentos y episodios previos. Firma el consentimiento." },
            { title: "Colocación de electrodos", description: "Se colocan pequeños electrodos sobre el cuero cabelludo con una pasta que se retira después. Toma unos 10 a 15 minutos y no duele." },
            { title: "Registro de la actividad", description: "Debe estar acostado, tranquilo, con los ojos cerrados o abiertos según le indiquemos. Puede que le pidamos respirar profundo o mirar una luz que parpadea." },
            { title: "Retiro y entrega", description: "Retiramos los electrodos, puede lavarse el cabello en casa. El informe lo entrega el neurólogo con la interpretación del estudio." },
          ]}
          faq={[
            { question: "¿Duele el estudio?", answer: "No. Los electrodos solo registran señales, no envían corriente. La sensación es únicamente el contacto de la pasta sobre el cuero cabelludo." },
            { question: "¿Necesito estar en ayunas?", answer: "No. Puede desayunar normal. Solo evite bebidas con cafeína las horas previas si el médico se lo indicó." },
            { question: "¿Puedo tomar mis medicamentos?", answer: "Sí, salvo indicación distinta del especialista que ordenó el estudio. Nunca suspenda un anticonvulsivante sin consultar." },
            { question: "¿Cuándo entregan el resultado?", answer: "El informe con la interpretación del neurólogo se entrega en pocos días. Le avisamos apenas esté listo." },
          ]}
        />


        <section className="bg-deep-teal py-20 md:py-28">
          <div className="mx-auto max-w-[720px] px-6 md:px-12 text-center">
            <p className="font-sans text-cream/80 text-[18px] leading-[1.65] mb-10 max-w-[48ch] mx-auto">
              Si tiene dudas sobre si este estudio corresponde a su situación, escríbanos y le orientamos.
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
