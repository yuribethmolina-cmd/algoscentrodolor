import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageHeroVideo from "@/components/PageHeroVideo";
import imgMain from "@/assets/experience-tech.jpg";
import imgConsult from "@/assets/experience-consult.jpg";

const WA = "https://wa.me/584146807886?text=Hola%2C%20quisiera%20información%20sobre%20la%20Electromiografía%20(EMG).";

export default function EMG() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main>
        <PageHeroVideo eyebrow="Estudio" title="Electromiografía (EMG)" subtitle="Estudio de los nervios y los músculos." video="tratamientos" />

        <div className="bg-cream">
          <div className="mx-auto max-w-[1080px] px-6 md:px-0">
            <div style={{ overflow: "hidden", aspectRatio: "16/7" }}>
              <img src={imgMain} alt="Electromiografía en ALGOS" className="w-full h-full object-cover" loading="eager" />
            </div>
          </div>
        </div>

        <section className="bg-cream py-16 md:py-24">
          <div className="mx-auto max-w-[800px] px-6 md:px-12">
            <p className="font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.22em] mb-5">Qué es</p>
            <p className="font-sans text-deep-teal text-[17px] leading-[1.7] mb-10">
              Mide cómo viajan las señales por sus nervios y cómo responden sus músculos. Así se ve si un nervio está comprimido, irritado o dañado, y en qué punto exacto.
            </p>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-12">
              <div style={{ overflow: "hidden" }}>
                <img src={imgConsult} alt="Consulta médica en ALGOS" className="w-full object-cover" style={{ aspectRatio: "4/3" }} loading="lazy" />
              </div>
              <div>
                <p className="font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.22em] mb-5">Para qué sirve</p>
                <p className="font-sans text-deep-teal text-[17px] leading-[1.7]">
                  Es el estudio indicado cuando el dolor viene con hormigueo, adormecimiento, debilidad o corrientazos. Confirma, por ejemplo, el nervio comprometido de una ciática o el daño de la neuropatía diabética, y le señala al especialista dónde está el problema para tratar eso y no ir a ciegas.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-deep-teal py-20 md:py-28">
          <div className="mx-auto max-w-[720px] px-6 md:px-12 text-center">
            <p className="font-sans text-cream/80 text-[18px] leading-[1.65] mb-10 max-w-[48ch] mx-auto">
              Cuéntenos sus síntomas y le orientamos sobre si este estudio aplica a su caso.
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
