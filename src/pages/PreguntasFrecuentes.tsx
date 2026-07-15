import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageHeroVideo from "@/components/PageHeroVideo";
import SEOHead from "@/components/SEOHead";
import { ALGOS } from "@/config/algos.config";

const WA = ALGOS.contact.whatsappHref + "?text=Hola%2C%20quisiera%20información%20sobre%20sus%20procedimientos.";

const FAQS = [
  {
    q: "¿Cómo sé si ALGOS puede ayudarme?",
    a: "Si tiene dolor que no cede con reposo, medicamentos o fisioterapia, es candidato a una evaluación. No importa dónde le duele, lo evaluamos y le decimos con honestidad qué opciones existen para su caso.",
  },
  {
    q: "¿Necesito una orden médica para venir?",
    a: "No. Puede venir directamente a consulta. Si trae estudios previos, resonancia, tomografía, EMG, tráigalos, pero no son requisito para la primera evaluación.",
  },
  {
    q: "¿Duele el procedimiento?",
    a: "La mayoría de los procedimientos se realizan con anestesia local, por lo que se percibe presión o una molestia leve, no dolor intenso. Antes de comenzar le explicamos qué sensación tendrá en cada paso, y durante todo el procedimiento el equipo está atento a su comodidad.",
  },
  {
    q: "¿Es seguro? ¿Tiene efectos secundarios?",
    a: "Son procedimientos mínimamente invasivos y ambulatorios, con un perfil de seguridad favorable cuando se realizan guiados por imagen y a cargo de un equipo con experiencia. Como en cualquier procedimiento médico, existen riesgos mínimos que el especialista le explica antes de proceder. No se realiza nada sin su consentimiento informado.",
  },
  {
    q: "¿Cuánto dura el procedimiento y la recuperación? ¿Es ambulatorio?",
    a: "En su mayoría son ambulatorios: el procedimiento suele durar entre 20 y 45 minutos y el paciente regresa a casa el mismo día. El tiempo de recuperación varía según el procedimiento y el caso; en la consulta se le indica qué esperar.",
  },
  {
    q: "¿Necesito referencia médica?",
    a: "No es necesaria. Puede agendar su consulta de forma directa. Si acude referido por su médico, con gusto le hacemos llegar el informe de su evaluación.",
  },
  {
    q: "¿Cuál es el costo?",
    a: "El costo depende de la evaluación y de lo que su caso necesite. Escríbanos por WhatsApp y le informamos con claridad antes de su cita, sin sorpresas.",
  },
  {
    q: "¿En cuánto tiempo notaré mejoría?",
    a: "Depende del procedimiento: algunos ofrecen alivio en pocos días y otros alcanzan su efecto en algunas semanas. En la consulta se le explica qué esperar en su caso.",
  },
  {
    q: "¿El efecto es permanente?",
    a: "Varía según el tratamiento y el caso: algunos brindan alivio duradero y otros pueden repetirse de acuerdo con la evolución. En la consulta se le explica qué esperar en su situación.",
  },
  {
    q: "¿Y si prefiero la guía por ecografía, que no usa radiación?",
    a: "La guía se elige por lo que cada caso necesita ver. En la columna, por ejemplo, el hueso limita la visión de la ecografía; por eso ahí se usan la fluoroscopia o la tomografía, que sí ven el blanco con claridad. El especialista usa la guía que da la mejor visión y seguridad para su procedimiento.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-deep-teal/10">
      <button
        className="w-full flex items-start justify-between gap-4 py-5 text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="font-sans font-semibold text-deep-teal text-[16px] leading-[1.4]">{q}</span>
        <ChevronDown
          size={18}
          className="text-algos-gold shrink-0 mt-[2px] transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "none" }}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{ maxHeight: open ? "400px" : "0px", opacity: open ? 1 : 0 }}
      >
        <p className="font-sans text-steel-teal text-[15px] leading-[1.7] pb-5 max-w-[70ch]">
          {a}
        </p>
      </div>
    </div>
  );
}

export default function PreguntasFrecuentes() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <div className="min-h-screen bg-cream">
      <SEOHead
        title="Preguntas frecuentes · ALGOS Maracaibo"
        description="Dudas frecuentes sobre consultas y procedimientos de dolor intervencionista en ALGOS Maracaibo: costos, seguridad, recuperación y referencias médicas."
        canonical="https://algoscentrodolor.com/preguntas-frecuentes"
      >
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      </SEOHead>
      <Navbar />
      <SEOHead
        title="Preguntas frecuentes | ALGOS Centro de Dolor — Maracaibo"
        description="Resuelve tus dudas sobre procedimientos, EMG, EEG, costos y consultas en ALGOS. Centro de dolor intervencionista en Maracaibo, Estado Zulia."
        canonical="https://algoscentrodolor.com/preguntas-frecuentes"
      />


      <main>
        <PageHeroVideo
          eyebrow="Las dudas más habituales antes de una primera consulta o procedimiento."
          title="Preguntas frecuentes"
          subtitle="Las dudas más habituales antes de una primera consulta o procedimiento."
          video="pacientes"
        />

        <section className="bg-cream py-16 md:py-24">
          <div className="mx-auto max-w-[800px] px-6 md:px-12">
            <div>
              {FAQS.map((f) => (
                <FAQItem key={f.q} q={f.q} a={f.a} />
              ))}
            </div>

            <div className="mt-14 pt-10 border-t border-deep-teal/10">
              <p className="font-sans text-steel-teal text-[15px] leading-[1.7] mb-6">
                ¿Tiene una pregunta que no está aquí? Escríbanos y un miembro del equipo le responde.
              </p>
              <a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-brand-teal hover:bg-[#4a9ca8] text-cream font-sans font-bold uppercase text-[12px] tracking-[0.18em] rounded-none px-8 py-4 transition-colors"
              >
                Escribir por WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      <HomeFooter />
      <WhatsAppButton />
    </div>
  );
}
