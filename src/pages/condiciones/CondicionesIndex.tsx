import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Link } from "react-router-dom";
import PageHeroVideo from "@/components/PageHeroVideo";

const WA = "https://wa.me/584146807886?text=Hola%2C%20quisiera%20orientaci%C3%B3n%20sobre%20mi%20dolor.";

const WITH_PAGES = [
  { label: "Ciática", href: "/condiciones/ciatica", desc: "Dolor que nace en la espalda y baja por la pierna." },
  { label: "Hernia discal", href: "/condiciones/hernia-discal", desc: "El disco se desplaza y comprime un nervio." },
  { label: "Dolor lumbar", href: "/condiciones/dolor-lumbar", desc: "Dolor de cintura que no cede con reposo ni calmantes." },
  { label: "Dolor cervical", href: "/condiciones/dolor-cervical", desc: "Dolor de cuello que puede extenderse al hombro o al brazo." },
  { label: "Neuropatía diabética", href: "/condiciones/neuropatia-diabetica", desc: "Ardor, hormigueo o adormecimiento en pies y piernas por diabetes." },
  { label: "Dolor tras cirugía de columna", href: "/condiciones/dolor-tras-cirugia", desc: "Cuando la operación no fue suficiente y el dolor persiste." },
];

const WITHOUT_PAGES = [
  "Dolor facetario",
  "Dolor radicular",
  "Dolor sacroilíaco",
  "Estenosis de canal lumbar",
  "Dolor miofascial y puntos gatillo",
  "Neuralgia postherpética (culebrilla)",
  "Síndrome del túnel carpiano",
  "Dolor de rodilla, cadera y hombro",
  "Cefaleas",
  "Neuralgia occipital",
  "Síndrome piriforme",
  "Coccigodinia",
  "Síndrome doloroso regional complejo",
  "Dolor oncológico",
];

export default function CondicionesIndex() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      <main>
        <PageHeroVideo
          eyebrow="Condiciones que tratamos"
          title="El dolor tiene causa. Nosotros la tratamos."
          subtitle="Un médico evalúa su caso, identifica el origen del dolor y define el tratamiento que corresponde. Aquí puede ver las condiciones con las que trabajamos."
          video="pacientes"
        />

        <section className="bg-cream py-16 md:py-24">
          <div className="mx-auto max-w-[1080px] px-6 md:px-12">
            <p className="font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.22em] mb-10">
              Condiciones con página informativa
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-deep-teal/10">
              {WITH_PAGES.map((c) => (
                <Link
                  key={c.href}
                  to={c.href}
                  className="group bg-cream p-8 hover:bg-deep-teal/5 transition-colors"
                >
                  <p className="font-sans font-bold text-deep-teal text-[16px] group-hover:text-algos-gold transition-colors mb-2">
                    {c.label} →
                  </p>
                  <p className="font-sans text-steel-teal text-[14px] leading-[1.6]">
                    {c.desc}
                  </p>
                </Link>
              ))}
            </div>

            <div className="mt-20">
              <p className="font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.22em] mb-6">
                También tratamos
              </p>
              <p className="font-sans text-steel-teal text-[15px] leading-[1.7] mb-6 max-w-[60ch]">
                Las siguientes condiciones forman parte de nuestra práctica clínica. Un médico evalúa cada caso y define el abordaje que corresponde.
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
                {WITHOUT_PAGES.map((c) => (
                  <li key={c} className="font-sans text-deep-teal text-[15px] leading-[1.5] flex items-start gap-2">
                    <span className="text-algos-gold mt-[3px] shrink-0">—</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-deep-teal py-20 md:py-28">
          <div className="mx-auto max-w-[720px] px-6 md:px-12 text-center">
            <p className="font-sans text-cream/80 text-[18px] leading-[1.65] mb-10 max-w-[48ch] mx-auto">
              Si su dolor no aparece en esta lista, escríbanos de todas formas. Un médico le indica si podemos ayudarle.
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
