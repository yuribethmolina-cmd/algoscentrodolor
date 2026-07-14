import { useState } from "react";
import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageHero from "@/components/PageHero";
import ProcedureDetails from "@/components/procedimiento/ProcedureDetails";
import ProcedureHeroImage from "@/components/procedimiento/ProcedureHeroImage";
import ProcedureSplitBlock from "@/components/procedimiento/ProcedureSplitBlock";
import ProcedureIntro from "@/components/procedimiento/ProcedureIntro";
import HighContrastToggle from "@/components/procedimiento/HighContrastToggle";
const imgMain = "/placeholder.svg";
const imgSala = "/placeholder.svg";
import { ALGOS } from "@/config/algos.config";

const WA = ALGOS.contact.whatsappHref + "?text=Hola%2C%20quisiera%20información%20sobre%20el%20ozono%20para%20hernia%20discal.";

export default function Ozono() {
  const [hc, setHc] = useState(false);
  return (
    <div className={`min-h-screen ${hc ? "procedure-hc" : "bg-cream"}`}>
      <Navbar />
      <main>
        <PageHero eyebrow="Procedimiento" title="Ozono para hernia discal" subtitle="Tratamiento del dolor de disco sin cirugía." />

        <ProcedureHeroImage
          src={imgMain}
          alt="Procedimiento de ozono intradiscal"
          caption="Ozono intradiscal, guiado por imagen."
        />

        <ProcedureIntro eyebrow="Qué es">
          Una aplicación de ozono médico en el disco de la columna, guiada por imagen, que ayuda a reducir el volumen de la hernia y la inflamación que irrita el nervio. Es ambulatorio y se hace con anestesia local.
        </ProcedureIntro>

        <ProcedureSplitBlock
          image={imgSala}
          imageAlt="Sala de procedimientos ALGOS"
          eyebrow="Para qué sirve"
          imageCaption="Sala de procedimientos ALGOS"
        >
          <p>
            Está indicado específicamente para la ciática causada por una hernia de disco lumbar, cuando el dolor lleva tiempo y no ha cedido con medicamentos ni reposo, como una opción antes de plantear la cirugía.
          </p>
          <p>
            No es un tratamiento para cualquier dolor: se usa solo cuando la imagen confirma que la hernia es la causa.
          </p>
        </ProcedureSplitBlock>

        <section className="bg-cream pb-8">
          <div className="mx-auto max-w-[860px] px-6 md:px-12">
            <div className="pt-2 border-t border-deep-teal/10 pt-10">
              <p className="font-sans text-steel-teal text-[15px] leading-[1.75]">
                Este procedimiento se aplica exclusivamente para hernia discal. No se realiza como tratamiento sistémico ni para otras indicaciones.
              </p>
            </div>
          </div>
        </section>



        <ProcedureDetails
          facts={[
            { label: "Duración", value: "30 a 45 min" },
            { label: "Anestesia", value: "Local" },
            { label: "Modalidad", value: "Ambulatorio" },
            { label: "Después", value: "Reposo relativo 3 a 5 días" },
          ]}
          preparation="Traiga sus estudios de imagen recientes (resonancia o TAC de columna). Coma liviano ese día. Vaya con ropa cómoda y acompañado. Avise si toma anticoagulantes o aspirina."
          steps={[
            { title: "Valoración con imágenes previas", description: "Un especialista revisa su resonancia o TAC y confirma que la hernia justifica el procedimiento. Sin ese requisito, no se realiza." },
            { title: "Ingreso a sala", description: "Le ubicamos boca abajo en la camilla. Se limpia la piel y se prepara el campo estéril." },
            { title: "Punción guiada por imagen", description: "Con guía de imagen se dirige la aguja al disco. Se aplica anestesia local en la piel y el trayecto." },
            { title: "Aplicación de ozono", description: "Se administra el ozono en la dosis calculada. Puede sentir presión, pero no dolor intenso." },
            { title: "Observación y alta", description: "Descansa entre 30 y 60 minutos en la sala. Se va a casa el mismo día con las indicaciones de reposo y control." },
          ]}
          faq={[
            { question: "¿Duele el procedimiento?", answer: "Se aplica anestesia local en el trayecto. Puede sentir presión en el momento de la aplicación, pero no dolor intenso." },
            { question: "¿Cuándo notaré alivio?", answer: "La mejoría suele aparecer entre las 2 y las 6 semanas, a medida que baja la inflamación y el disco reduce su volumen. Cada caso evoluciona a su ritmo." },
            { question: "¿Sirve para cualquier hernia de disco?", answer: "No. Está indicado para hernias que producen ciática y que están bien caracterizadas por imagen. El médico define si su caso es candidato." },
            { question: "¿Cuándo puedo volver al trabajo?", answer: "Se recomienda reposo relativo los primeros días. Si su trabajo es de escritorio, puede reincorporarse pronto; si implica esfuerzo físico, el especialista indica el tiempo." },
          ]}
        />

        <ProcedureVideoSection
          src="/videos/hernia-discal.mp4"
          eyebrow="Video del procedimiento"
          title="Así se aplica el ozono en la hernia discal"
          description="Un vistazo al procedimiento guiado por imagen, tal como se realiza en sala. Con anestesia local y de forma ambulatoria."
        />

        <section className="bg-deep-teal py-20 md:py-28">

          <div className="mx-auto max-w-[720px] px-6 md:px-12 text-center">
            <p className="font-sans text-cream/80 text-[18px] leading-[1.65] mb-10 max-w-[48ch] mx-auto">
              Cuéntenos cómo es su dolor y un médico evaluará si su caso es candidato a este procedimiento.
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
