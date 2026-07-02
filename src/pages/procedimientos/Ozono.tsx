import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageHeroVideo from "@/components/PageHeroVideo";
import ProcedureDetails from "@/components/procedimiento/ProcedureDetails";
import ProcedureVideoSection from "@/components/procedimiento/ProcedureVideoSection";
import ozonoAsset from "@/assets/proc-ozono.jpg.asset.json";
const imgMain = ozonoAsset.url;
import imgSala from "@/assets/sala-procedimientos.jpg";

const WA = "https://wa.me/584146807886?text=Hola%2C%20quisiera%20información%20sobre%20el%20ozono%20para%20hernia%20discal.";

export default function Ozono() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main>
        <PageHeroVideo eyebrow="Procedimiento" title="Ozono para hernia discal" subtitle="Tratamiento del dolor de disco sin cirugía." video="tratamientos" />

        <div className="bg-cream">
          <div className="mx-auto max-w-[1080px] px-6 md:px-0">
            <div style={{ overflow: "hidden", aspectRatio: "16/7" }}>
              <img src={imgMain} alt="Procedimiento de ozono intradiscal" className="w-full h-full object-cover" loading="eager" />
            </div>
          </div>
        </div>

        <section className="bg-cream py-16 md:py-24">
          <div className="mx-auto max-w-[800px] px-6 md:px-12">
            <p className="font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.22em] mb-5">Qué es</p>
            <p className="font-sans text-deep-teal text-[17px] leading-[1.7] mb-10">
              Una aplicación de ozono médico en el disco de la columna, guiada por imagen, que ayuda a reducir el volumen de la hernia y la inflamación que irrita el nervio. Es ambulatorio y se hace con anestesia local.
            </p>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-12">
              <div style={{ overflow: "hidden" }}>
                <img src={imgSala} alt="Sala de procedimientos ALGOS" className="w-full object-cover" style={{ aspectRatio: "4/3" }} loading="lazy" />
              </div>
              <div>
                <p className="font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.22em] mb-5">Para qué sirve</p>
                <p className="font-sans text-deep-teal text-[17px] leading-[1.7]">
                  Está indicado específicamente para la ciática causada por una hernia de disco lumbar, cuando el dolor lleva tiempo y no ha cedido con medicamentos ni reposo, como una opción antes de plantear la cirugía. No es un tratamiento para cualquier dolor: se usa solo cuando la imagen confirma que la hernia es la causa.
                </p>
              </div>
            </div>

            <div className="pt-10 border-t border-deep-teal/10">
              <p className="font-sans text-steel-teal text-[15px] leading-[1.7] italic">
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

        <section className="bg-deep-teal py-20 md:py-28">

          <div className="mx-auto max-w-[720px] px-6 md:px-12 text-center">
            <p className="font-sans text-cream/80 text-[18px] leading-[1.65] mb-10 max-w-[48ch] mx-auto">
              Cuéntenos cómo es su dolor y un médico evaluará si su caso es candidato a este procedimiento.
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
