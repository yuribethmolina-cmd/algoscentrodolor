import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageHeroVideo from "@/components/PageHeroVideo";

const WA = "https://wa.me/584146807886?text=Hola%2C%20quisiera%20información%20sobre%20la%20Electromiografía%20(EMG).";

export default function EMG() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      <main>
        <PageHeroVideo
          eyebrow="Estudio"
          title="Electromiografía (EMG)"
          subtitle="Estudio de los nervios y los músculos."
          video="tratamientos"
        />

        <section className="bg-cream py-16 md:py-24">
          <div className="mx-auto max-w-[800px] px-6 md:px-12">
            <p className="font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.22em] mb-5">
              Qué es
            </p>
            <p className="font-sans text-deep-teal text-[17px] leading-[1.7]">
              Mide cómo viajan las señales por sus nervios y cómo responden sus músculos. Así se ve si un nervio está comprimido, irritado o dañado, y en qué punto exacto.
            </p>

            <p className="mt-8 font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.22em] mb-5">
              Para qué sirve
            </p>
            <p className="font-sans text-deep-teal text-[17px] leading-[1.7]">
              Es el estudio indicado cuando el dolor viene con hormigueo, adormecimiento, debilidad o corrientazos. Confirma, por ejemplo, el nervio comprometido de una ciática o el daño de la neuropatía diabética, y le señala al especialista dónde está el problema para tratar eso y no ir a ciegas.
            </p>
          </div>
        </section>

        <section className="bg-deep-teal py-20 md:py-28">
          <div className="mx-auto max-w-[720px] px-6 md:px-12 text-center">
            <p className="font-sans text-cream/80 text-[18px] leading-[1.65] mb-10 max-w-[48ch] mx-auto">
              Cuéntenos sus síntomas y le orientamos sobre si este estudio aplica a su caso.
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
