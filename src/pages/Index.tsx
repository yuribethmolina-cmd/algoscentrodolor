import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import WhatsAppButton from "@/components/WhatsAppButton";

const WA = "https://wa.me/584146807886?text=Hola%2C%20quisiera%20informaci%C3%B3n%20sobre%20sus%20servicios.";

const CONDITIONS = [
  {
    title: "Ciática",
    desc: "Un dolor que baja de la espalda por la pierna, a veces como un corrientazo.",
    href: "/condiciones/ciatica",
  },
  {
    title: "Hernia discal",
    desc: "Le diagnosticaron una hernia de disco y le dijeron que quizás haya que operar.",
    href: "/condiciones/hernia-discal",
  },
  {
    title: "Dolor lumbar",
    desc: "Dolor de cintura que no cede con reposo ni calmantes.",
    href: "/condiciones/dolor-lumbar",
  },
  {
    title: "Dolor cervical",
    desc: "Dolor de cuello que se extiende al hombro o al brazo.",
    href: "/condiciones/dolor-cervical",
  },
  {
    title: "Neuropatía diabética",
    desc: "Es diabético y siente hormigueo, ardor o adormecimiento en los pies.",
    href: "/condiciones/neuropatia-diabetica",
  },
  {
    title: "Dolor tras cirugía",
    desc: "Se operó de la columna y el dolor sigue ahí.",
    href: "/condiciones/dolor-tras-cirugia",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Consulta",
    desc: "Un especialista escucha su caso y lo examina. Si hacen falta estudios, se indican solo los necesarios.",
  },
  {
    n: "02",
    title: "Diagnóstico",
    desc: "Imagen, electromiografía y laboratorio, disponibles en la misma red, confirman de dónde viene el dolor.",
  },
  {
    n: "03",
    title: "Tratamiento",
    desc: "Según su caso: desde medicamentos hasta procedimientos mínimamente invasivos guiados por imagen. Solo lo que de verdad hace falta.",
  },
];

const WHY = [
  "Del diagnóstico al tratamiento en una sola ruta, sin peregrinar entre centros.",
  "La misma imagen que localiza el problema guía el procedimiento que lo trata: contamos con fluoroscopia, tomografía y ecografía, y usamos la que su caso necesita.",
  "Lo mínimamente invasivo antes que la cirugía: agotar las opciones intermedias es parte del método.",
  "Se trata solo lo que hace falta. Ni un estudio ni un procedimiento que su caso no necesite.",
];

const HOME_FAQS = [
  {
    q: "¿Duele el procedimiento?",
    a: "La mayoría de los procedimientos se realizan con anestesia local, por lo que se percibe presión o una molestia leve, no dolor intenso. Antes de comenzar le explicamos qué sensación tendrá en cada paso.",
  },
  {
    q: "¿Es ambulatorio?",
    a: "Sí. En su mayoría el paciente regresa a casa el mismo día, sin hospitalización.",
  },
  {
    q: "¿Necesito referencia médica?",
    a: "No es necesaria. Puede agendar su consulta de forma directa.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-cream/20">
      <button
        className="w-full flex items-start justify-between gap-4 py-5 text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="font-sans font-semibold text-cream text-[16px] leading-[1.4]">{q}</span>
        <ChevronDown
          size={18}
          className="text-algos-gold shrink-0 mt-[2px] transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "none" }}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{ maxHeight: open ? "300px" : "0px", opacity: open ? 1 : 0 }}
      >
        <p className="font-sans text-cream/70 text-[15px] leading-[1.7] pb-5 max-w-[60ch]">{a}</p>
      </div>
    </div>
  );
}

export default function Index() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      {/* Block 1 — Apertura */}
      <section className="bg-deep-teal min-h-[100dvh] flex items-center pt-20">
        <div className="mx-auto max-w-[1080px] px-6 md:px-12 py-20 md:py-32">
          <p className="font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.22em] mb-6">
            Centro de Dolor Intervencionista · Maracaibo
          </p>
          <h1 className="font-display font-bold text-cream leading-[1.03] tracking-[-0.03em] text-[38px] md:text-[72px] lg:text-[84px] max-w-[18ch]">
            En ALGOS identificamos la causa de su dolor y lo tratamos con procedimientos mínimamente invasivos, antes de llegar a una operación.
          </h1>
          <p className="mt-7 font-sans text-cream/70 text-[18px] md:text-[20px] leading-[1.5] max-w-[44ch]">
            El dolor tiene causa. Nosotros la tratamos.
          </p>
          <div className="mt-10">
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-brand-teal hover:bg-[#4a9ca8] text-cream font-sans font-bold uppercase text-[13px] tracking-[0.2em] px-10 py-5 transition-colors"
            >
              Escríbanos por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Block 2 — Reconocimiento por síntomas */}
      <section className="bg-cream py-20 md:py-32">
        <div className="mx-auto max-w-[1080px] px-6 md:px-12">
          <h2 className="font-display font-bold text-deep-teal text-[28px] md:text-[42px] leading-[1.1] tracking-[-0.02em] max-w-[26ch] mb-12">
            ¿Se reconoce en alguno de estos dolores?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-deep-teal/10">
            {CONDITIONS.map((c) => (
              <Link
                key={c.href}
                to={c.href}
                className="group bg-cream p-7 hover:bg-deep-teal/[0.03] transition-colors"
              >
                <p className="font-sans font-bold text-deep-teal text-[16px] group-hover:text-algos-gold transition-colors mb-2">
                  {c.title}
                </p>
                <p className="font-sans text-steel-teal text-[14px] leading-[1.6]">{c.desc}</p>
              </Link>
            ))}
          </div>
          <p className="mt-8 font-sans text-steel-teal text-[15px] leading-[1.6]">
            Tratamos también otras condiciones de dolor.{" "}
            <Link to="/condiciones" className="text-brand-teal hover:text-algos-gold underline underline-offset-2 transition-colors">
              Vea la lista completa.
            </Link>
          </p>
        </div>
      </section>

      {/* Block 3 — Cómo trabajamos */}
      <section className="bg-deep-teal py-20 md:py-32">
        <div className="mx-auto max-w-[1080px] px-6 md:px-12">
          <h2 className="font-display font-bold text-cream text-[28px] md:text-[42px] leading-[1.1] tracking-[-0.02em] max-w-[26ch] mb-14">
            Primero la causa, después el tratamiento.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-cream/10">
            {STEPS.map((s) => (
              <div key={s.n} className="bg-deep-teal p-8">
                <p className="font-display font-bold text-algos-gold text-[36px] leading-[1] mb-5 opacity-60">
                  {s.n}
                </p>
                <p className="font-sans font-bold text-cream text-[16px] mb-3">{s.title}</p>
                <p className="font-sans text-cream/70 text-[14px] leading-[1.65]">{s.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 font-sans text-cream/70 text-[16px] leading-[1.75] max-w-[60ch]">
            Y el tratamiento no termina cuando termina el procedimiento: seguimos su evolución y le acompañamos en el tiempo, porque el dolor crónico se maneja, no se abandona.
          </p>
        </div>
      </section>

      {/* Block 4 — Por qué ALGOS */}
      <section className="bg-cream py-20 md:py-32">
        <div className="mx-auto max-w-[1080px] px-6 md:px-12">
          <h2 className="font-display font-bold text-deep-teal text-[28px] md:text-[42px] leading-[1.1] tracking-[-0.02em] mb-14">
            Por qué ALGOS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {WHY.map((text, i) => (
              <div key={i} className="flex items-start gap-5">
                <span className="text-algos-gold font-display font-bold text-[22px] leading-[1] shrink-0 mt-1">
                  {(i + 1).toString().padStart(2, "0")}
                </span>
                <p className="font-sans text-deep-teal text-[16px] leading-[1.7]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Block 5 — Equipo */}
      <section className="bg-[#f0ebe2] py-20 md:py-28">
        <div className="mx-auto max-w-[1080px] px-6 md:px-12">
          <p className="font-sans text-deep-teal text-[17px] leading-[1.75] max-w-[60ch]">
            ALGOS reúne un equipo de varias especialidades — neurocirugía, traumatología, algología, reumatología, fisiatría y apoyo nutricional — que evalúa cada caso desde el ángulo que le corresponde.
          </p>
          <div className="mt-7">
            <Link
              to="/equipo"
              className="font-sans font-bold uppercase text-brand-teal hover:text-algos-gold text-[12px] tracking-[0.18em] transition-colors"
            >
              Conozca al equipo →
            </Link>
          </div>
        </div>
      </section>

      {/* Block 6 — UDUZ teaser */}
      <section className="bg-cream py-20 md:py-28 border-t border-deep-teal/10">
        <div className="mx-auto max-w-[1080px] px-6 md:px-12">
          <div className="max-w-[56ch]">
            <p className="font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.22em] mb-5">
              Red UDUZ
            </p>
            <p className="font-sans text-deep-teal text-[17px] leading-[1.75] mb-8">
              ¿Necesita una tomografía, una ecografía, una radiografía o exámenes de laboratorio? Los estudios de la red UDUZ también se agendan aquí.
            </p>
            <Link
              to="/estudios-laboratorio"
              className="inline-block border border-deep-teal text-deep-teal hover:bg-deep-teal hover:text-cream font-sans font-bold uppercase text-[12px] tracking-[0.18em] px-8 py-4 transition-colors"
            >
              Ver estudios disponibles →
            </Link>
          </div>
        </div>
      </section>

      {/* Block 7 — FAQ extracto */}
      <section className="bg-deep-teal py-20 md:py-28">
        <div className="mx-auto max-w-[800px] px-6 md:px-12">
          <p className="font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.22em] mb-10">
            Preguntas frecuentes
          </p>
          <div>
            {HOME_FAQS.map((f) => (
              <FAQItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
          <div className="mt-8">
            <Link
              to="/preguntas-frecuentes"
              className="font-sans font-bold uppercase text-algos-gold hover:text-cream text-[12px] tracking-[0.18em] transition-colors"
            >
              Ver todas las preguntas →
            </Link>
          </div>
        </div>
      </section>

      {/* Block 8 — Cierre */}
      <section className="bg-cream py-20 md:py-32">
        <div className="mx-auto max-w-[720px] px-6 md:px-12 text-center">
          <h2 className="font-display font-bold text-deep-teal text-[28px] md:text-[44px] leading-[1.1] tracking-[-0.02em] mb-6 max-w-[24ch] mx-auto">
            Cuéntenos qué le duele.
          </h2>
          <p className="font-sans text-steel-teal text-[17px] leading-[1.65] mb-10 max-w-[46ch] mx-auto">
            Un miembro de nuestro equipo le orientará sobre el paso siguiente. Sin compromiso.
          </p>
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-deep-teal hover:bg-[#2a6270] text-cream font-sans font-bold uppercase text-[13px] tracking-[0.2em] px-10 py-5 transition-colors"
          >
            Escríbanos por WhatsApp
          </a>
        </div>
      </section>

      <HomeFooter />
      <WhatsAppButton />
    </div>
  );
}
