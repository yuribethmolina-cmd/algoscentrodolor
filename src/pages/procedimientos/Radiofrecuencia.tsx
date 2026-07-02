import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageHeroVideo from "@/components/PageHeroVideo";
import ProcedureDetails from "@/components/procedimiento/ProcedureDetails";
import imgMain from "@/assets/sala-procedimientos.jpg";
import imgProc from "@/assets/about-procedure.jpg";

const WA = "https://wa.me/584146807886?text=Hola%2C%20quisiera%20información%20sobre%20los%20procedimientos%20disponibles.";

export default function Radiofrecuencia() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main>
        <PageHeroVideo eyebrow="Próximamente" title="Radiofrecuencia" subtitle="Tratamiento del dolor sin cirugía — próximamente en ALGOS." video="tratamientos" />

        <div className="bg-cream">
          <div className="mx-auto max-w-[1080px] px-6 md:px-0">
            <div style={{ overflow: "hidden", aspectRatio: "16/7" }}>
              <img src={imgMain} alt="Sala de procedimientos ALGOS" className="w-full h-full object-cover" loading="eager" />
            </div>
          </div>
        </div>

        <section className="bg-cream py-16 md:py-24">
          <div className="mx-auto max-w-[800px] px-6 md:px-12">
            <p className="font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.22em] mb-5">Qué es</p>
            <p className="font-sans text-deep-teal text-[17px] leading-[1.7] mb-10">
              Guiada por imagen y con anestesia local, aplica calor controlado sobre el nervio que transmite el dolor para reducir esa señal. Es ambulatoria: el mismo día se va a casa.
            </p>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-12">
              <div style={{ overflow: "hidden" }}>
                <img src={imgProc} alt="Procedimiento guiado por imagen" className="w-full object-cover" style={{ aspectRatio: "4/3" }} loading="lazy" />
              </div>
              <div>
                <p className="font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.22em] mb-5">Para qué sirve</p>
                <p className="font-sans text-deep-teal text-[17px] leading-[1.7]">
                  Indicada cuando el dolor persiste y otros tratamientos no han bastado. Se usa en el dolor de las articulaciones de la columna (dolor facetario), cervical y lumbar, y en la artrosis de rodilla.
                </p>
              </div>
            </div>

            <div className="bg-algos-gold/10 border border-algos-gold/20 p-8">
              <p className="font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.22em] mb-4">Disponibilidad</p>
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
            <a href={WA} target="_blank" rel="noopener noreferrer" className="inline-block bg-brand-teal hover:bg-[#4a9ca8] text-cream font-sans font-bold uppercase text-[13px] tracking-[0.2em] rounded-none px-10 py-5 transition-colors">
              Consultar opciones disponibles
            </a>
          </div>
        </section>
      </main>
      <HomeFooter />
      <WhatsAppButton />
    </div>
  );
}
