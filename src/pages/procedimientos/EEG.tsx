import { useState } from "react";
import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageHero from "@/components/PageHero";
import ProcedureDetails from "@/components/procedimiento/ProcedureDetails";
import ProcedureHeroImage from "@/components/procedimiento/ProcedureHeroImage";
import ProcedureIntro from "@/components/procedimiento/ProcedureIntro";
import HighContrastToggle from "@/components/procedimiento/HighContrastToggle";
import { motion } from "framer-motion";
import imgMainAsset from "@/assets/eeg-procedimiento.jpg.asset.json";
import { ALGOS } from "@/config/algos.config";
const imgMain = imgMainAsset.url;

const WA = ALGOS.contact.whatsappHref + "?text=Hola%2C%20quisiera%20información%20sobre%20el%20Electroencefalograma%20(EEG).";

export default function EEG() {
  const [hc, setHc] = useState(false);
  return (
    <div className={`min-h-screen ${hc ? "procedure-hc" : "bg-cream"}`}>
      <Navbar />
      <main>
        <PageHero eyebrow="Estudio" title="Electroencefalograma (EEG)" subtitle="Estudio de la actividad eléctrica del cerebro." />

        <ProcedureHeroImage
          src={imgMain}
          alt="Electroencefalograma en ALGOS"
          caption="Estudio no invasivo de la actividad cerebral."
        />

        <ProcedureIntro eyebrow="Qué es">
          Registra la actividad eléctrica de su cerebro con unos electrodos que se colocan sobre el cuero cabelludo. Es un estudio sencillo, no invasivo y que no duele.
        </ProcedureIntro>

        <section className="bg-cream pt-8 pb-8">
          <div className="mx-auto max-w-[860px] px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="border-l-2 border-algos-gold/70 pl-6 md:pl-8"
            >
              <p className="font-sans font-bold uppercase text-deep-teal text-[11px] tracking-[0.24em] mb-5">Para qué sirve</p>
              <p className="font-sans text-deep-teal text-[17px] leading-[1.75]">
                Es el estudio indicado ante convulsiones o crisis, episodios de desmayo o pérdida de consciencia sin explicación, sospecha de epilepsia y el seguimiento de ciertas condiciones neurológicas.
              </p>
            </motion.div>
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
            <a href={WA} target="_blank" rel="noopener noreferrer" className="inline-block bg-algos-gold hover:bg-[#d4a648] text-[#0A2A32] font-sans font-bold uppercase text-[13px] tracking-[0.2em] rounded-none px-10 py-5 transition-colors">
              Escribir por WhatsApp
            </a>
          </div>
        </section>
      </main>
      <HomeFooter />
      <WhatsAppButton />
      <HighContrastToggle enabled={hc} onToggle={() => setHc((v) => !v)} />
    </div>
  );
}
