import SEOHead from "@/components/SEOHead";
import algosLogoDark from "@/assets/algos-logo-v2.png";
import algosLogoCream from "@/assets/algos-logo-cream.png";
import { Phone, Zap, Radio, Droplets, Activity, ExternalLink } from "lucide-react";

const WA_ALGOS = `https://wa.me/584146807886?text=${encodeURIComponent(
  "Hola, me contacto desde algoscentrodolor.com. Quisiera agendar una consulta por dolor crónico."
)}`;

const PROCEDURES = [
  {
    icon: Zap,
    name: "Infiltraciones y bloqueos",
    short: "Medicamento guiado por imagen directamente en el origen del dolor. Efecto en horas.",
  },
  {
    icon: Radio,
    name: "Radiofrecuencia",
    short: "Interrumpe la señal nerviosa que transmite el dolor. Efecto duradero sin cirugía.",
  },
  {
    icon: Droplets,
    name: "Ozono para hernia discal",
    short: "Reduce la hernia discal con gas medicinal. Alternativa minimamente invasiva a la cirugía.",
  },
  {
    icon: Activity,
    name: "Electromiografía diagnóstica",
    short: "Identifica exactamente qué nervio está comprimido y en qué punto. Diagnóstico de precisión.",
  },
];

const CONDITIONS = [
  "Dolor lumbar crónico",
  "Hernia discal",
  "Ciática",
  "Dolor cervical",
  "Neuropatía diabética",
  "Dolor tras cirugía de columna",
  "Cefaleas de origen cervical",
];

export default function LpDolor() {
  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <SEOHead
        title="Especialista en dolor crónico en Maracaibo | Sin cirugía | ALGOS"
        description="ALGOS Centro de Dolor Intervencionista en Maracaibo. Tratamos dolor lumbar, hernia discal, ciática y neuropatía con procedimientos guiados por imagen. Consulta disponible."
        canonical="https://algoscentrodolor.com/lp/dolor"
      >
        <meta name="robots" content="noindex, nofollow" />
      </SEOHead>

      {/* Header mínimo */}
      <header className="bg-[#1a4a55] px-6 py-4 flex items-center justify-between">
        <img src={algosLogoCream} alt="ALGOS Centro de Dolor" className="h-8" />
        <a
          href="tel:+584146807886"
          className="flex items-center gap-2 text-[#f5f0e8]/70 hover:text-[#f5f0e8] text-sm font-sans transition-colors"
        >
          <Phone className="w-4 h-4" />
          <span className="hidden sm:inline">0414-680 7886</span>
        </a>
      </header>

      <main>
        {/* Hero */}
        <section className="bg-[#f5f0e8] px-6 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[#3d8b96] font-medium text-xs tracking-[0.28em] uppercase mb-5">
              DOLOR INTERVENCIONISTA · MARACAIBO
            </p>
            <h1 className="font-display font-bold text-[#1a4a55] text-4xl md:text-5xl leading-[1.08] tracking-tight mb-6">
              No tiene que aguantarse.<br />
              <span className="italic">Tampoco operarse.</span>
            </h1>
            <p className="font-sans text-[#1a4a55]/70 text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-10">
              ALGOS es el primer centro de dolor intervencionista del estado Zulia.
              Tratamos el origen del dolor con procedimientos guiados por imagen —
              sin cirugía, sin hospitalización.
            </p>
            <a
              href={WA_ALGOS}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-[#1a4a55] hover:bg-[#3d8b96] text-white font-sans font-bold uppercase text-[13px] tracking-[0.16em] px-10 py-4 transition-colors"
            >
              Agendar consulta por WhatsApp
            </a>
          </div>
        </section>

        {/* Contexto — quiénes somos */}
        <section className="bg-white border-t border-b border-[#1a4a55]/8 px-6 py-10">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start gap-4">
            <img src={algosLogoDark} alt="ALGOS Centro de Dolor" className="h-7 w-auto object-contain object-left shrink-0" />
            <div className="flex flex-col gap-2">
              <p className="font-sans text-[#1a4a55]/65 text-sm leading-relaxed">
                Primer centro de dolor intervencionista del estado Zulia. Atendido por el Dr. Atilio Rodríguez, neurocirujano especializado en dolor, con sede en Maracaibo.
              </p>
              <a
                href="https://algoscentrodolor.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#3d8b96] hover:text-[#1a4a55] text-xs font-sans font-semibold transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Ver sitio web completo — algoscentrodolor.com
              </a>
            </div>
          </div>
        </section>

        {/* Condiciones */}
        <section className="bg-white px-6 py-14 md:py-18">
          <div className="max-w-4xl mx-auto">
            <p className="font-sans font-semibold text-[#1a4a55] text-xs uppercase tracking-widest mb-6 text-center">
              Tratamos estas condiciones
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {CONDITIONS.map((c) => (
                <span
                  key={c}
                  className="font-sans text-[#1a4a55] text-sm border border-[#1a4a55]/20 px-4 py-2"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Procedimientos */}
        <section className="bg-[#f5f0e8] px-6 py-16 md:py-20">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-1 h-6 bg-[#c69636] block rounded-full" />
              <p className="font-sans font-semibold text-[#1a4a55] text-xs uppercase tracking-widest">
                Nuestros procedimientos
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {PROCEDURES.map((p) => {
                const Icon = p.icon;
                return (
                  <div key={p.name} className="border border-[#1a4a55]/10 bg-white p-6">
                    <Icon className="w-5 h-5 text-[#c69636] mb-3" strokeWidth={1.5} />
                    <p className="font-sans font-semibold text-[#1a4a55] text-sm mb-2">{p.name}</p>
                    <p className="font-sans text-[#1a4a55]/55 text-xs leading-relaxed">{p.short}</p>
                  </div>
                );
              })}
            </div>
            <div className="text-center">
              <a
                href={WA_ALGOS}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[#1a4a55] hover:bg-[#3d8b96] text-white font-sans font-bold uppercase text-[13px] tracking-[0.16em] px-10 py-4 transition-colors"
              >
                Agendar consulta por WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* Trust strip — Dr. Atilio + equipo */}
        <section className="bg-[#1a4a55] px-6 py-10">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="font-sans font-bold text-[#f5f0e8] text-sm mb-1">Dr. Atilio Rodríguez</p>
              <p className="font-sans text-[#f5f0e8]/55 text-xs">Neurocirujano · Director Médico ALGOS · Maracaibo</p>
            </div>
            <div>
              <p className="font-sans font-bold text-[#f5f0e8] text-sm mb-1">Guiado por imagen</p>
              <p className="font-sans text-[#f5f0e8]/55 text-xs">Todos los procedimientos con control por ultrasonido o fluoroscopía</p>
            </div>
            <div>
              <p className="font-sans font-bold text-[#f5f0e8] text-sm mb-1">Primer centro en Zulia</p>
              <p className="font-sans text-[#f5f0e8]/55 text-xs">Especialización en dolor intervencionista en el estado</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer mínimo */}
      <footer className="bg-[#f5f0e8] border-t border-[#1a4a55]/10 px-6 py-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <img src={algosLogoDark} alt="ALGOS Centro de Dolor" className="h-6 opacity-50" />
          <p className="font-sans text-[#1a4a55]/45 text-xs text-center">
            ALGOS Centro de Dolor Intervencionista · Maracaibo, Venezuela
          </p>
          <a
            href="https://algoscentrodolor.com"
            className="font-sans text-[#1a4a55]/45 hover:text-[#1a4a55] text-xs transition-colors"
          >
            algoscentrodolor.com
          </a>
        </div>
      </footer>
    </div>
  );
}
