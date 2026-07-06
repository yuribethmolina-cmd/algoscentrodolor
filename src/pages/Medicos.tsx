import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import { AnimatedHeadline, InViewToggle } from "@/lib/animations";

export default function Medicos() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden bg-cream pt-32 pb-16 md:pt-40 md:pb-24">
          {/* Atmospheric video background */}
          <video
            ref={(el) => {
              if (el) {
                el.muted = true;
                el.defaultMuted = true;
                const p = el.play();
                if (p && typeof p.catch === "function") p.catch(() => {});
              }
            }}
            className="hero-bg-video absolute inset-0 w-full h-full object-cover"
            style={{ zIndex: 0 }}
            autoPlay
            muted
            loop
            playsInline
            // @ts-ignore — iOS Safari hint
            webkit-playsinline="true"
            x5-playsinline="true"
            disableRemotePlayback
            aria-hidden="true"
          >
            <source src="/videos/medicos-hero.webm" type="video/webm" />
            <source src="/videos/medicos-hero.mp4" type="video/mp4" />
          </video>
          {/* Cream overlay encima del video */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              zIndex: 0,
              background:
                "linear-gradient(180deg, rgba(245,240,232,0.80) 0%, rgba(245,240,232,0.88) 60%, rgba(245,240,232,0.95) 100%)",
            }}
          />
          <div className="relative mx-auto max-w-[760px] px-6 md:px-12 text-center" style={{ zIndex: 1 }}>
            <p className="font-sans font-bold uppercase text-deep-teal text-[11px] tracking-[0.28em]">
              Para médicos referentes
            </p>

            <AnimatedHeadline
              as="h1"
              className="mt-6 mx-auto font-display font-bold text-deep-teal leading-[1.05] tracking-[-0.025em] text-[40px] md:text-[64px] max-w-[18ch]"
              chunks={[
                { text: "Su paciente vuelve a usted, " },
                { text: "con plan completo.", color: "#9a7320", staggerMs: 120 },
              ]}
            />

            <p className="mt-7 mx-auto font-sans text-steel-teal leading-[1.6] text-[16px] md:text-[17px] max-w-[56ch]">
              ALGOS opera como extensión de su consulta. Evaluamos al paciente,
              realizamos los procedimientos intervencionistas indicados y lo
              devolvemos con reporte detallado y seguimiento coordinado —
              manteniendo siempre la relación clínica primaria con usted.
            </p>

            <div className="mt-12 flex flex-col items-center gap-4">
              {/* Primary CTA */}
              <a
                href="#referir"
                className="group inline-flex items-center gap-3 bg-[#3d8b96] hover:bg-[#4a9ca8] text-cream font-sans font-bold uppercase text-[13px] tracking-[0.2em] rounded-none transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-8px_rgba(0,0,0,0.35)] px-9 py-[18px]"
              >
                <span>Refiere un caso</span>
                <span
                  aria-hidden
                  className="inline-block overflow-hidden transition-[width] duration-300 ease-out w-6 group-hover:w-10"
                >
                  <span className="block transition-transform duration-300 ease-out group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </a>

              {/* Secondary CTA */}
              <a
                href="/tratamientos?view=clinica"
                className="font-sans font-bold uppercase text-[12px] tracking-[0.22em] text-deep-teal hover:text-algos-gold border-b-[1.5px] border-deep-teal hover:border-algos-gold pb-1 transition-colors"
              >
                Ver protocolos clínicos →
              </a>
            </div>
          </div>
        </section>

        {/* INDICACIONES CLÍNICAS */}
        <section className="bg-deep-teal py-20 md:py-[120px]">
          <div className="mx-auto max-w-[1240px] px-6 md:px-12">
            <p className="font-sans font-bold uppercase text-cream text-[11px] tracking-[0.28em]">
              Indicaciones clínicas
            </p>
            <h2 className="mt-4 font-display font-bold text-cream leading-[1.05] tracking-[-0.025em] text-[36px] md:text-[56px] max-w-[24ch]">
              Casos candidatos a evaluación intervencionista.
            </h2>

            <div className="mt-10 md:mt-16 max-w-[640px]">
              <h3 className="font-display font-normal text-[22px] text-cream/90">
                Indicaciones primarias
              </h3>
              <ul className="mt-6 space-y-3 font-sans text-[16px] leading-[1.7] text-cream/80">
                {[
                  "Dolor lumbar facetario crónico (>3 meses, sin respuesta a conservador)",
                  "Dolor radicular cervical o lumbar (con/sin imagen confirmatoria)",
                  "Neuralgias periféricas",
                  "Dolor postquirúrgico persistente",
                  "Síndromes regionales complejos",
                  "Patología musculoesquelética localizada que requiera infiltración guiada por imagen",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-cream flex-shrink-0">·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CÓMO REFERIR */}
        <section className="bg-cream py-20 md:py-[120px]">
          <div className="mx-auto max-w-[1080px] px-6 md:px-12">
            <p className="font-sans font-bold uppercase text-deep-teal text-[11px] tracking-[0.28em]">
              Proceso de derivación
            </p>
            <h2 className="mt-4 font-display font-bold text-deep-teal leading-[1.05] tracking-[-0.025em] text-[36px] md:text-[56px] max-w-[22ch]">
              Cuatro pasos. Sin formularios{" "}
              <span className="font-normal" style={{ color: "#9a7320" }}>interminables.</span>
            </h2>

            <div className="mt-10 md:mt-16 flex flex-col gap-10 md:gap-14">
              {[
                {
                  idx: "01",
                  title: "Contacto inicial",
                  body: "Llama, escribe o envía historia clínica + imagen relevante por WhatsApp o correo. No requerimos formato específico — adaptamos a lo que tengas.",
                },
                {
                  idx: "02",
                  title: "Evaluación preliminar",
                  body: "El caso es revisado en 24-48h y se confirma si es candidato. Si no es candidato, le orientamos hacia el abordaje más adecuado.",
                },
                {
                  idx: "03",
                  title: "Consulta y procedimiento",
                  placeholder: true,
                },
                {
                  idx: "04",
                  title: "Reporte y retorno",
                  body: "Recibirá reporte completo. El paciente vuelve a su consulta con plan de seguimiento clínico claro.",
                },
              ].map((step, i) => (
                <InViewToggle
                  key={step.idx}
                  className="reveal-up grid grid-cols-1 md:grid-cols-[80px_1fr] gap-4 md:gap-6"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="font-display font-normal text-[56px] leading-none tracking-[-0.03em]" style={{ color: "#9a7320" }}>
                    {step.idx}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-[26px] text-deep-teal tracking-[-0.015em]">
                      {step.title}
                    </h3>
                    {step.placeholder ? (
                      <div className="mt-3 p-8 border border-algos-gold/40 rounded-[4px]">
                        <p className="font-sans font-bold uppercase text-deep-teal text-[10px] tracking-[0.24em]">
                          En validación con dirección médica
                        </p>
                        <p className="mt-4 font-sans text-[14px] leading-[1.55] text-steel-teal">
                          Timeline de evaluación, indicación, procedimiento y recuperación inmediata. Detalle en validación con dirección médica.
                        </p>
                      </div>
                    ) : (
                      <p className="mt-3 font-sans text-[15px] leading-[1.6] text-steel-teal max-w-[56ch]">
                        {step.body}
                      </p>
                    )}
                  </div>
                </InViewToggle>
              ))}
            </div>
          </div>
        </section>

        {/* QUÉ RECIBES */}
        <section className="bg-cream py-16 md:py-[100px]">
          <div className="mx-auto max-w-[1240px] px-6 md:px-12">
            <p className="font-sans font-bold uppercase text-deep-teal text-[11px] tracking-[0.28em]">
              Documentación clínica
            </p>
            <h2 className="mt-4 font-display font-bold text-deep-teal leading-[1.05] tracking-[-0.025em] text-[36px] md:text-[56px] max-w-[22ch]">
              El paciente vuelve a usted{" "}
              <span className="font-normal" style={{ color: "#9a7320" }}>con todo documentado.</span>
            </h2>

            <InViewToggle className="reveal-up mt-14 max-w-[640px] p-10 border border-deep-teal/15 rounded-[4px] bg-cream">
              <p className="font-sans text-[16px] leading-[1.75] text-steel-teal">
                Cada caso referido recibe un reporte de evaluación inicial y un informe de
                seguimiento post-procedimiento. El paciente vuelve a usted con el plan completo
                documentado.
              </p>
            </InViewToggle>
          </div>
        </section>

        {/* CONTACTO MÉDICO DIRECTO */}
        <section className="bg-deep-teal py-24 md:py-[140px]">
          <div className="mx-auto max-w-[1080px] px-6 md:px-12 text-center">
            <p className="font-sans font-bold uppercase text-cream text-[11px] tracking-[0.28em]">
              Contacto médico directo
            </p>
            <h2 className="mt-7 mx-auto font-display font-bold text-cream leading-[0.98] tracking-[-0.028em] text-[44px] md:text-[72px] max-w-[18ch]">
              Consultas clínicas{" "}
              <span className="font-normal text-algos-gold">sin intermediarios.</span>
            </h2>
            <p className="mt-7 mx-auto font-sans text-cream/80 leading-[1.6] text-[16px] md:text-[17px] max-w-[52ch]">
              Para consultas clínicas sobre candidatos o seguimiento de casos.
            </p>

            <div className="mt-16 pt-9 border-t border-cream/[0.18] flex flex-col md:flex-row md:justify-center items-center gap-5 md:gap-0">
              {[
                { href: "https://wa.me/584146807886", label: "WhatsApp médico", value: "0414-680 7886" },
                { href: "mailto:info@algoscentrodolor.com", label: "Correo clínico", value: "info@algoscentrodolor.com" },
              ].map((opt, i) => (
                <a
                  key={opt.href}
                  href={opt.href}
                  className={`group flex flex-col gap-1.5 px-9 ${i > 0 ? "md:border-l md:border-cream/[0.12]" : ""}`}
                >
                  <span className="font-sans font-bold uppercase text-[10px] tracking-[0.24em] text-cream/55">
                    {opt.label}
                  </span>
                  <span className="font-sans font-medium text-[16px] text-cream group-hover:text-algos-gold transition-colors">
                    {opt.value}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CIERRE + CTAs */}
        <section id="referir" className="bg-cream py-20 md:py-[120px] scroll-mt-20">
          <div className="mx-auto max-w-[720px] px-6 md:px-12">
            <div className="border border-deep-teal/15 rounded-lg p-10 md:p-16 text-center">
              <p className="font-sans font-bold uppercase text-deep-teal text-[11px] tracking-[0.28em]">
                Comenzar
              </p>
              <h3 className="mt-6 font-display font-bold text-deep-teal leading-[1.1] text-[28px] md:text-[36px]">
                ¿Tiene un caso ahora mismo?
              </h3>
              <p className="mt-4 font-sans text-[16px] leading-[1.6] text-steel-teal">
                Envíe historia clínica e imagen relevante. Confirmamos candidatura en 24-48h sin compromiso.
              </p>

              <div className="mt-8 flex justify-center">
                <a
                  href="mailto:info@algoscentrodolor.com?subject=Caso%20para%20derivaci%C3%B3n"
                  className="inline-flex items-center gap-2 bg-[#3d8b96] hover:bg-[#4a9ca8] text-cream font-sans font-bold uppercase text-[13px] tracking-[0.2em] rounded-none transition-all duration-300 hover:-translate-y-0.5 px-9 py-[18px]"
                >
                  Refiere un caso →
                </a>
              </div>

              <div className="mt-8 flex flex-col items-center gap-4">
                <a
                  href="mailto:info@algoscentrodolor.com?subject=Reuni%C3%B3n%20informativa"
                  className="font-sans font-bold uppercase text-[12px] tracking-[0.22em] text-deep-teal hover:text-algos-gold border-b-[1.5px] border-deep-teal hover:border-algos-gold pb-1 transition-colors"
                >
                  Solicitar reunión informativa →
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <HomeFooter />
    </div>
  );
}
