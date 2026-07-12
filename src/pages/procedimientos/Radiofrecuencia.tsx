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
import imgMain from "@/assets/sala-procedimientos.jpg";
import imgProc from "@/assets/about-procedure.jpg";
import { ALGOS } from "@/config/algos.config";

const WA = ALGOS.contact.whatsappHref + "?text=Hola%2C%20quisiera%20información%20sobre%20los%20procedimientos%20disponibles.";

export default function Radiofrecuencia() {
  const [hc, setHc] = useState(false);
  return (
    <div className={`min-h-screen ${hc ? "procedure-hc" : "bg-cream"}`}>
      <Navbar />
      <main>
        <PageHero eyebrow="Próximamente" title="Radiofrecuencia" subtitle="Tratamiento del dolor sin cirugía — próximamente en ALGOS." />

        <ProcedureHeroImage
          src={imgMain}
          alt="Sala de procedimientos ALGOS"
          caption="Sala de procedimientos ALGOS."
        />

        <ProcedureIntro eyebrow="Qué es">
          Guiada por imagen y con anestesia local, aplica calor controlado sobre el nervio que transmite el dolor para reducir esa señal. Es ambulatoria: el mismo día se va a casa.
        </ProcedureIntro>

        <ProcedureSplitBlock
          image={imgProc}
          imageAlt="Procedimiento guiado por imagen"
          eyebrow="Para qué sirve"
          imageCaption="Guiada por imagen"
        >
          <p>
            Indicada cuando el dolor persiste y otros tratamientos no han bastado. Se usa en el dolor de las articulaciones de la columna (dolor facetario), cervical y lumbar, y en la artrosis de rodilla.
          </p>
        </ProcedureSplitBlock>

        <section className="bg-cream pb-16">
          <div className="mx-auto max-w-[860px] px-6 md:px-12">
            <div className="bg-algos-gold/10 border border-algos-gold/20 p-8">
              <p className="font-sans font-bold uppercase text-deep-teal text-[11px] tracking-[0.24em] mb-4">Disponibilidad</p>
              <p className="font-sans text-deep-teal text-[16px] leading-[1.65]">
                Mientras tanto, un especialista puede evaluar su caso y orientarle sobre las opciones disponibles hoy.
              </p>
            </div>
          </div>
        </section>



        <ProcedureDetails
          facts={[
            { label: "Duración", value: "30 a 60 min" },
            { label: "Anestesia", value: "Local" },
            { label: "Modalidad", value: "Ambulatorio" },
            { label: "Después", value: "Reposo relativo 24 a 72 h" },
          ]}
          preparation="Traiga sus estudios de imagen previos. Coma liviano ese día y vaya acompañado. Avise si toma anticoagulantes o aspirina para ajustar la pauta con antelación."
          steps={[
            { title: "Bloqueo diagnóstico previo", description: "Antes de la radiofrecuencia se hace un bloqueo de prueba para confirmar que el nervio identificado es realmente el que origina su dolor." },
            { title: "Ingreso a sala", description: "Se le ubica en la camilla, se prepara la piel y se cubre con campos estériles." },
            { title: "Colocación del electrodo guiado por imagen", description: "Con guía de fluoroscopia o tomografía se coloca el electrodo junto al nervio. Se aplica anestesia local en el trayecto." },
            { title: "Aplicación de calor controlado", description: "Se aplica calor durante unos minutos sobre el nervio. Puede sentir presión, pero no dolor intenso." },
            { title: "Observación y alta", description: "Descansa unos minutos en la sala y se va a casa el mismo día con las indicaciones de reposo y control." },
          ]}
          faq={[
            { question: "¿Duele el procedimiento?", answer: "Se aplica anestesia local en el trayecto. Puede sentir presión y calor leve, pero no dolor intenso." },
            { question: "¿Cuánto dura el efecto?", answer: "Habitualmente entre 6 y 12 meses, y puede repetirse si el dolor regresa. Cada caso evoluciona a su ritmo." },
            { question: "¿Es una cirugía?", answer: "No. Es un procedimiento mínimamente invasivo, guiado por imagen, sin incisión y ambulatorio." },
            { question: "¿Cuándo estará disponible en ALGOS?", answer: "Estamos incorporando el servicio. Mientras tanto, un especialista puede evaluar su caso y orientarle sobre las opciones que ya ofrecemos." },
          ]}
        />

        <section className="bg-deep-teal py-20 md:py-28">

          <div className="mx-auto max-w-[720px] px-6 md:px-12 text-center">
            <p className="font-sans text-cream/80 text-[18px] leading-[1.65] mb-10 max-w-[48ch] mx-auto">
              Mientras tanto, un especialista puede evaluar su caso y orientarle sobre las opciones disponibles hoy.
            </p>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="inline-block bg-algos-gold hover:bg-[#d4a648] text-[#0A2A32] font-sans font-bold uppercase text-[13px] tracking-[0.2em] rounded-none px-10 py-5 transition-colors">
              Consultar opciones disponibles
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
