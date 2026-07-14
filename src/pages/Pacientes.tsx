import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import { AnimatedHeadline, InViewToggle } from "@/lib/animations";
import { ALGOS } from "@/config/algos.config";

const WHATSAPP_PACIENTES = ALGOS.contact.whatsappHref;

const CARDS = [
  {
    eyebrow: "01 · MÍNIMAMENTE INVASIVO",
    title: "Sin cirugía mayor.",
    body:
      "Los procedimientos usan agujas finas guiadas por imagen para tratar el origen del dolor. Sin anestesia general, sin hospitalización, sin las recuperaciones largas de una operación tradicional.",
  },
  {
    eyebrow: "02 · GUIADO POR IMAGEN",
    title: "Precisión milimétrica.",
    body:
      "Cada procedimiento se realiza con fluoroscopia, tomografía o ultrasonido en tiempo real. Sabemos exactamente dónde llega cada aguja, máxima seguridad, mínima invasividad.",
  },
  {
    eyebrow: "03 · AMBULATORIO",
    title: "Vuelve a casa el mismo día.",
    body:
      "Llega, lo atendemos, regresa a casa. La mayoría de pacientes retoma actividades ligeras en 24-48 horas. Sin internación, sin recuperación prolongada.",
  },
];

const STEPS = [
  {
    idx: "01",
    title: "Primera consulta",
    body:
      "Conversamos sobre su historia, sus dolores, lo que ha probado y lo que espera. Revisamos sus imágenes si las trae. Sin presión, sin diagnóstico apresurado.",
  },
  {
    idx: "02",
    title: "Plan personalizado",
    body:
      "Si su caso es candidato a intervención, le explicamos las opciones, los beneficios esperables y las limitaciones honestamente. Si no es candidato, le orientamos hacia el tratamiento más adecuado, aunque no sea con nosotros.",
  },
  {
    idx: "03",
    title: "Procedimiento",
    body:
      "Ambulatorio, guiado por imagen, con anestesia local. Sentirá una pequeña molestia inicial al colocar la anestesia. Después, el procedimiento es casi imperceptible, la mayoría lo describe como menos incómodo que un examen dental.",
  },
  {
    idx: "04",
    title: "Seguimiento",
    body:
      "A las 2 semanas y a las 6 semanas revisamos su evolución. Si necesita ajustes, los hacemos. Si el procedimiento no respondió como esperábamos, conversamos las opciones, sin que tenga que empezar de cero.",
  },
];

const FAQS = [
  {
    q: "¿Duele el procedimiento?",
    a: "Sentirás una pequeña molestia inicial cuando se coloca la anestesia local en la piel. Después de eso, el procedimiento es casi imperceptible. La mayoría de pacientes describen la experiencia como menos incómoda que un examen dental.",
  },
  {
    q: "¿Cuánto cuesta?",
    a: "Cada tratamiento se evalúa según su condición específica y el procedimiento indicado. En la valoración inicial discutimos abiertamente los costos involucrados, opciones de financiamiento y convenios disponibles. La valoración inicial no compromete a nada.",
  },
  {
    q: "¿Cuánto dura el alivio?",
    a: "Depende de su condición y de su respuesta individual al tratamiento. Algunos pacientes experimentan alivio prolongado por meses o años; otros requieren tratamientos complementarios o repeticiones. En la consulta inicial discutimos expectativas realistas para su caso específico, sin promesas que no podamos cumplir.",
  },
  {
    q: "¿Cuándo puedo volver a mi vida normal?",
    a: "La mayoría de procedimientos son ambulatorios, vuelve a casa el mismo día y puede retomar actividades ligeras en 24-48 horas. El equipo le dará pautas específicas según el procedimiento realizado y su condición particular.",
  },
];

export default function Pacientes() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden bg-cream pt-32 pb-16 md:pt-[120px] md:pb-24">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            aria-hidden="true"
          >
            <source src="/videos/pacientes-hero.webm" type="video/webm" />
            <source src="/videos/pacientes-hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-cream/75 md:bg-cream/70" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-[1280px] px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-10 md:gap-16 items-center">
              {/* Avatar - mobile after content, desktop right */}
              <div className="order-2 flex flex-col items-center md:items-start gap-4">
                <div className="w-[140px] h-[140px] md:w-[200px] md:h-[200px] rounded-full overflow-hidden bg-[#ECE4D4]">
                  <img
                    src="/team/dr-atilio.jpg"
                    alt="Dr. Atilio J. Rodríguez"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center md:text-left">
                  <p className="font-sans font-bold uppercase text-steel-teal text-[10px] tracking-[0.24em]">
                    Dirección médica
                  </p>
                  <p className="mt-1 font-display text-[18px] text-deep-teal">
                    Dr. Atilio J. Rodríguez
                  </p>
                  <p className="mt-0.5 font-sans text-[13px] text-steel-teal/80">
                    Neurocirujano
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="order-1 md:order-1">
                <p className="font-sans font-bold uppercase text-deep-teal text-[11px] tracking-[0.22em]">
                  Para pacientes
                </p>
                <AnimatedHeadline
                  as="h1"
                  className="mt-6 font-display font-bold text-deep-teal leading-[1.02] tracking-[-0.028em] text-[44px] md:text-[88px] max-w-[18ch]"
                  chunks={[
                    { text: "El " },
                    { text: "primer paso", color: "#9a7320", staggerMs: 120 },
                    { text: " es conversar." },
                  ]}
                />
                <p className="mt-8 font-sans text-steel-teal leading-[1.65] text-[16px] md:text-[18px] max-w-[56ch]">
                  Una valoración inicial para entender su condición y los tratamientos que pueden ayudarle. Sin presión, sin diagnóstico apresurado.
                </p>

                <div className="mt-12 flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
                  <a
                    href={WHATSAPP_PACIENTES}
                    className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#3d8b96] hover:bg-[#4a9ca8] text-cream font-sans font-bold uppercase text-[13px] tracking-[0.2em] rounded-none transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-8px_rgba(0,0,0,0.35)] px-9 py-[18px]"
                  >
                    <span>Agendar valoración</span>
                    <span aria-hidden className="inline-block overflow-hidden transition-[width] duration-300 ease-out w-6 group-hover:w-10">
                      <span className="block transition-transform duration-300 ease-out group-hover:translate-x-1">→</span>
                    </span>
                  </a>
                  <a
                    href="/tratamientos"
                    className="font-sans font-bold uppercase text-[12px] tracking-[0.22em] text-deep-teal hover:text-algos-gold border-b-[1.5px] border-deep-teal hover:border-algos-gold pb-1 transition-colors"
                  >
                    Conoce los tratamientos →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* QUÉ ES EL DOLOR INTERVENCIONISTA */}
        <section className="bg-cream py-16 md:py-[100px]">
          <div className="mx-auto max-w-[1280px] px-6 md:px-12">
            <p className="font-sans font-bold uppercase text-deep-teal text-[11px] tracking-[0.24em]">
              ¿Qué es el dolor intervencionista?
            </p>
            <h2 className="mt-4 font-display font-bold text-deep-teal leading-[1.05] tracking-[-0.025em] text-[36px] md:text-[56px] max-w-[24ch]">
              Procedimientos pensados para{" "}
              <span className="font-normal" style={{ color: "#9a7320" }}>su vida diaria.</span>
            </h2>

            <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
              {CARDS.map((c, i) => (
                <InViewToggle
                  key={c.eyebrow}
                  className="reveal-up p-10 border border-deep-teal/15 rounded-[4px] bg-cream flex flex-col gap-4"
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  <p className="font-sans font-bold uppercase text-deep-teal text-[11px] tracking-[0.24em]">
                    {c.eyebrow}
                  </p>
                  <h3 className="mt-2 font-display font-bold text-[26px] text-deep-teal">
                    {c.title}
                  </h3>
                  <p className="mt-1 font-sans text-[15px] leading-[1.6] text-steel-teal">
                    {c.body}
                  </p>
                </InViewToggle>
              ))}
            </div>
          </div>
        </section>

        {/* CÓMO ES TU PROCESO */}
        <section className="bg-deep-teal py-20 md:py-[120px]">
          <div className="mx-auto max-w-[1080px] px-6 md:px-12">
            <p className="font-sans font-bold uppercase text-cream text-[11px] tracking-[0.24em]">
              Su proceso paso a paso
            </p>
            <h2 className="mt-4 font-display font-bold text-cream leading-[1.05] tracking-[-0.025em] text-[36px] md:text-[56px] max-w-[22ch]">
              Cuatro pasos,{" "}
              <span className="font-normal text-algos-gold">sin sorpresas.</span>
            </h2>

            <div className="mt-12 md:mt-16 flex flex-col gap-10 md:gap-14">
              {STEPS.map((s, i) => (
                <InViewToggle
                  key={s.idx}
                  className="reveal-up grid grid-cols-1 md:grid-cols-[80px_1fr] gap-3 md:gap-6"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="font-display font-normal text-[56px] text-algos-gold leading-none tracking-[-0.03em]">
                    {s.idx}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-[26px] text-cream tracking-[-0.015em]">
                      {s.title}
                    </h3>
                    <p className="mt-3 font-sans text-[15px] leading-[1.6] text-cream/80 max-w-[56ch]">
                      {s.body}
                    </p>
                  </div>
                </InViewToggle>
              ))}
            </div>
          </div>
        </section>

        {/* RESPUESTAS HONESTAS */}
        <section className="bg-cream py-16 md:py-[100px]">
          <div className="mx-auto max-w-[880px] px-6 md:px-12">
            <p className="font-sans font-bold uppercase text-deep-teal text-[11px] tracking-[0.24em]">
              Respuestas honestas
            </p>
            <h2 className="mt-4 font-display font-bold text-deep-teal leading-[1.05] tracking-[-0.025em] text-[36px] md:text-[56px] max-w-[22ch]">
              Lo que{" "}
              <span className="font-normal" style={{ color: "#9a7320" }}>casi nadie le dice.</span>
            </h2>

            <div className="mt-12 md:mt-16 flex flex-col gap-10">
              {FAQS.map((f, i) => (
                <InViewToggle
                  key={f.q}
                  className="reveal-up"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <h3 className="font-display font-bold text-[22px] text-deep-teal">
                    <span className="text-deep-teal mr-2">·</span>
                    {f.q}
                  </h3>
                  <p className="mt-3 md:ml-4 font-sans text-[16px] leading-[1.65] text-steel-teal max-w-[70ch]">
                    {f.a}
                  </p>
                </InViewToggle>
              ))}
            </div>
          </div>
        </section>

        {/* CIERRE */}
        <section className="bg-deep-teal py-24 md:py-[140px]">
          <div className="mx-auto max-w-[760px] px-6 md:px-12 text-center">
            <p className="font-sans font-bold uppercase text-cream text-[11px] tracking-[0.24em]">
              Su siguiente paso
            </p>
            <h2 className="mt-6 mx-auto font-display font-bold text-cream leading-[0.98] tracking-[-0.028em] text-[44px] md:text-[72px] max-w-[18ch]">
              Solo hace falta{" "}
              <span className="font-normal text-algos-gold">conversar.</span>
            </h2>
            <p className="mt-7 mx-auto font-sans text-cream/80 leading-[1.65] text-[17px] max-w-[56ch]">
              Una valoración inicial es gratuita y sin compromiso. Nos cuenta qué le pasa, nosotros le decimos honestamente si podemos ayudarle.
            </p>

              <div className="mt-12 flex flex-col items-center gap-4">
                <a
                  href={WHATSAPP_PACIENTES}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#3d8b96] hover:bg-[#4a9ca8] text-cream font-sans font-bold uppercase text-[14px] tracking-[0.2em] rounded-none transition-all duration-300 hover:-translate-y-0.5 px-[42px] py-[22px]"
                >
                  Agendar valoración →
                </a>
                <a
                  href="/"
                  className="mt-2 font-sans uppercase text-[12px] tracking-[0.22em] text-cream/80 hover:text-algos-gold border-b border-cream/30 hover:border-algos-gold pb-1 transition-colors"
                >
                  ← Volver al inicio
                </a>
              </div>
          </div>
        </section>
      </main>

      <HomeFooter />
    </div>
  );
}
