import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageHeroVideo from "@/components/PageHeroVideo";

const WA = "https://wa.me/584146807886?text=Hola%2C%20quisiera%20información%20sobre%20el%20ozono%20para%20hernia%20discal.";

export default function Ozono() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      <main>
        <PageHeroVideo
          eyebrow="Procedimiento"
          title="Ozono para hernia discal"
          subtitle="Tratamiento del dolor de disco sin cirugía."
          video="tratamientos"
        />

        <section className="bg-cream py-16 md:py-24">
          <div className="mx-auto max-w-[800px] px-6 md:px-12">
            <p className="font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.22em] mb-5">
              Qué es
            </p>
            <p className="font-sans text-deep-teal text-[17px] leading-[1.7]">
              Una aplicación de ozono médico en el disco de la columna, guiada por imagen, que ayuda a reducir el volumen de la hernia y la inflamación que irrita el nervio. Es ambulatorio y se hace con anestesia local.
            </p>

            <p className="mt-8 font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.22em] mb-5">
              Para qué sirve
            </p>
            <p className="font-sans text-deep-teal text-[17px] leading-[1.7]">
              Está indicado específicamente para la ciática causada por una hernia de disco lumbar, cuando el dolor lleva tiempo y no ha cedido con medicamentos ni reposo, como una opción antes de plantear la cirugía. No es un tratamiento para cualquier dolor: se usa solo cuando la imagen confirma que la hernia es la causa.
            </p>

            <div className="mt-10 pt-10 border-t border-deep-teal/10">
              <p className="font-sans text-steel-teal text-[15px] leading-[1.7] italic">
                Este procedimiento se aplica exclusivamente para hernia discal. No se realiza como tratamiento sistémico ni para otras indicaciones.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-deep-teal py-20 md:py-28">
          <div className="mx-auto max-w-[720px] px-6 md:px-12 text-center">
            <p className="font-sans text-cream/80 text-[18px] leading-[1.65] mb-10 max-w-[48ch] mx-auto">
              Cuéntenos cómo es su dolor y un médico evaluará si su caso es candidato a este procedimiento.
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
