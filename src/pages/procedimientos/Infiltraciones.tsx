import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import WhatsAppButton from "@/components/WhatsAppButton";

const WA = "https://wa.me/584146807886?text=Hola%2C%20quisiera%20información%20sobre%20Infiltraciones%20y%20bloqueos.";

export default function Infiltraciones() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      <main>
        {/* Header */}
        <section className="bg-deep-teal pt-28 pb-16 md:pt-36 md:pb-24">
          <div className="mx-auto max-w-[1080px] px-6 md:px-12">
            <p className="font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.22em]">
              Procedimiento
            </p>
            <h1 className="mt-5 font-display font-bold text-cream leading-[1.05] tracking-[-0.025em] text-[40px] md:text-[72px] max-w-[20ch]">
              Infiltraciones y bloqueos
            </h1>
            <p className="mt-5 font-sans text-cream/80 text-[17px] md:text-[19px] leading-[1.6] max-w-[52ch]">
              Inyecciones dirigidas para el dolor, guiadas por imagen.
            </p>
          </div>
        </section>

        {/* Qué es */}
        <section className="bg-cream py-16 md:py-24">
          <div className="mx-auto max-w-[800px] px-6 md:px-12">
            <p className="font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.22em] mb-5">
              Qué es
            </p>
            <p className="font-sans text-deep-teal text-[17px] leading-[1.7]">
              Inyecciones de medicamento aplicadas con precisión sobre el punto que genera el dolor — una articulación, un nervio o una raíz —, siempre guiadas por imagen para llegar justo donde hace falta. Con anestesia local, ambulatorio: se va caminando el mismo día.
            </p>

            <p className="mt-8 font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.22em] mb-5">
              Para qué sirve
            </p>
            <p className="font-sans text-deep-teal text-[17px] leading-[1.7]">
              Sirven para dos cosas. Para tratar: bajar la inflamación y aliviar dolores como la ciática, la hernia discal o el dolor de las articulaciones de la columna. Y para confirmar de dónde viene el dolor: un bloqueo bien dirigido ayuda a identificar el nervio responsable y a orientar el tratamiento siguiente.
            </p>

            <div className="mt-10 pt-10 border-t border-deep-teal/10">
              <p className="font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.22em] mb-5">
                Guía por imagen
              </p>
              <p className="font-sans text-deep-teal text-[17px] leading-[1.7]">
                Contamos con las tres formas de guía por imagen — fluoroscopia, tomografía y ecografía — y usamos la que su caso necesita para tratarle mejor y con la mayor seguridad.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-deep-teal py-20 md:py-28">
          <div className="mx-auto max-w-[720px] px-6 md:px-12 text-center">
            <p className="font-sans text-cream/80 text-[18px] leading-[1.65] mb-10 max-w-[48ch] mx-auto">
              Cuéntenos cómo es su dolor y un miembro de nuestro equipo le orientará sobre el paso siguiente. Sin compromiso.
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
