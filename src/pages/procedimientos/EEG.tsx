import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageHeroVideo from "@/components/PageHeroVideo";

const WA = "https://wa.me/584146807886?text=Hola%2C%20quisiera%20información%20sobre%20el%20Electroencefalograma%20(EEG).";

export default function EEG() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      <main>
        <PageHeroVideo
          eyebrow="Estudio"
          title="Electroencefalograma (EEG)"
          subtitle="Estudio de la actividad eléctrica del cerebro."
          video="tratamientos"
        />

        <section className="bg-cream py-16 md:py-24">
          <div className="mx-auto max-w-[800px] px-6 md:px-12">
            <p className="font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.22em] mb-5">
              Qué es
            </p>
            <p className="font-sans text-deep-teal text-[17px] leading-[1.7]">
              Registra la actividad eléctrica de su cerebro con unos electrodos que se colocan sobre el cuero cabelludo. Es un estudio sencillo, no invasivo y que no duele.
            </p>

            <p className="mt-8 font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.22em] mb-5">
              Para qué sirve
            </p>
            <p className="font-sans text-deep-teal text-[17px] leading-[1.7]">
              Es el estudio indicado ante convulsiones o crisis, episodios de desmayo o pérdida de consciencia sin explicación, sospecha de epilepsia y el seguimiento de ciertas condiciones neurológicas.
            </p>
          </div>
        </section>

        <section className="bg-deep-teal py-20 md:py-28">
          <div className="mx-auto max-w-[720px] px-6 md:px-12 text-center">
            <p className="font-sans text-cream/80 text-[18px] leading-[1.65] mb-10 max-w-[48ch] mx-auto">
              Si tiene dudas sobre si este estudio corresponde a su situación, escríbanos y le orientamos.
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
