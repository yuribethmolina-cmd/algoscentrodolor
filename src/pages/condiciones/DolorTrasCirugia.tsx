import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Link } from "react-router-dom";
import PageHeroVideo from "@/components/PageHeroVideo";
import imgMain from "@/assets/tx-cirugia-fallida.jpg";
import imgConsult from "@/assets/experience-consult.jpg";

const WA = "https://wa.me/584146807886?text=Hola%2C%20quisiera%20orientaci%C3%B3n%20sobre%20dolor%20que%20persiste%20tras%20una%20cirug%C3%ADa%20de%20columna.";

export default function DolorTrasCirugia() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main>
        <PageHeroVideo eyebrow="Condición" title="Dolor tras cirugía de columna: cuando la operación no fue suficiente" video="pacientes" />

        <div className="bg-cream">
          <div className="mx-auto max-w-[1080px] px-6 md:px-0">
            <div style={{ overflow: "hidden", aspectRatio: "16/7" }}>
              <img src={imgMain} alt="Dolor postoperatorio de columna" className="w-full h-full object-cover" loading="eager" />
            </div>
          </div>
        </div>

        <article className="bg-cream py-16 md:py-24">
          <div className="mx-auto max-w-[800px] px-6 md:px-12">
            <p className="font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.22em] mb-5">Qué es</p>
            <p className="font-sans text-deep-teal text-[17px] leading-[1.75] mb-12">
              Algunas personas se operan de la columna y el dolor persiste o regresa después. No siempre es un error quirúrgico: puede ser tejido cicatricial que comprime un nervio, una nueva hernia en otro nivel, cambios mecánicos por la cirugía, o sensibilización del sistema nervioso al dolor crónico. Sea cual sea la causa, el dolor posquirúrgico merece una evaluación nueva, sin asumir que "es lo que hay".
            </p>

            <p className="font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.22em] mb-5">Cuándo consultar a un especialista</p>
            <p className="font-sans text-deep-teal text-[17px] leading-[1.75] mb-12">
              Si se operó de la columna y el dolor no desapareció; si mejoró y luego volvió; si el dolor es diferente al de antes de la cirugía pero igual de limitante; o si le han dicho que no hay nada más que hacer y usted siente que eso no puede ser cierto — es momento de una segunda evaluación.
            </p>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-14">
              <div style={{ overflow: "hidden" }}>
                <img src={imgConsult} alt="Consulta médica en ALGOS" className="w-full object-cover" style={{ aspectRatio: "4/3" }} loading="lazy" />
              </div>
              <div>
                <p className="font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.22em] mb-5">Cómo lo abordamos en ALGOS</p>
                <p className="font-sans text-deep-teal text-[17px] leading-[1.75]">
                  La consulta revisa su historia, sus imágenes previas y actuales, y los síntomas. La <Link to="/procedimientos/emg" className="text-brand-teal hover:text-algos-gold underline underline-offset-2 transition-colors">electromiografía</Link> puede ayudar a identificar si hay compromiso nervioso nuevo o persistente. Según la causa identificada: manejo farmacológico del dolor, <Link to="/procedimientos/infiltraciones-y-bloqueos" className="text-brand-teal hover:text-algos-gold underline underline-offset-2 transition-colors">bloqueos guiados por imagen</Link> para desinflamar zonas específicas, o fisiatría para recuperar función. Un médico evalúa su caso y le dice qué opciones existen.
                </p>
              </div>
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
              Cuéntenos su historia y le orientamos sobre qué opciones existen para su caso.
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
