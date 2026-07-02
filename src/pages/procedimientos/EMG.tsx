import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProcedureDetails from "@/components/procedimiento/ProcedureDetails";
import ProcedureSplitBlock from "@/components/procedimiento/ProcedureSplitBlock";
import imgHeroAsset from "@/assets/emg-aguja-pie.jpeg.asset.json";
import imgPiernaAsset from "@/assets/emg-pierna.webp.asset.json";
import imgBrazoAsset from "@/assets/emg-conduccion-brazo.jpg.asset.json";
const imgHero = imgHeroAsset.url;
const imgPierna = imgPiernaAsset.url;
const imgBrazo = imgBrazoAsset.url;

const WA = "https://wa.me/584146807886?text=Hola%2C%20quisiera%20informaci%C3%B3n%20sobre%20la%20Electromiograf%C3%ADa%20(EMG).";

/* ---------- Cinematic Hero (inline, EMG-only) ---------- */
function CinematicHero({ hc }: { hc: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1.1, 1.22]);
  const yTitle = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const opacityTitle = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative w-full h-[88vh] md:h-[100vh] min-h-[560px] overflow-hidden bg-deep-teal">
      {/* Background image with Ken Burns + parallax */}
      <motion.div style={{ y: yBg, scale: scaleBg }} className="absolute inset-0 will-change-transform">
        <img
          src={imgHero}
          alt="Electromiografía con aguja realizada por el especialista"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </motion.div>

      {/* Layered atmosphere: precise scrim for small-screen legibility */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: hc
            ? "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 30%, rgba(0,0,0,0.75) 65%, rgba(0,0,0,0.95) 85%, rgba(0,0,0,1) 100%)"
            : "linear-gradient(180deg, rgba(26,74,85,0.30) 0%, rgba(26,74,85,0.12) 35%, rgba(26,74,85,0.55) 65%, rgba(26,74,85,0.88) 82%, rgba(26,74,85,0.96) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: hc
            ? "radial-gradient(ellipse at 60% 40%, rgba(0,0,0,0) 20%, rgba(0,0,0,0.65) 100%)"
            : "radial-gradient(ellipse at 60% 40%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.42) 100%)",
        }}
      />
      {/* Grain texture via subtle noise gradient stripes */}
      {!hc && (
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 3px)",
          }}
        />
      )}

      {/* Content */}
      <motion.div
        style={{ y: yTitle, opacity: opacityTitle }}
        className="relative z-10 h-full flex flex-col justify-end pb-16 md:pb-24"
      >
        <div className="mx-auto w-full max-w-[1240px] px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <span className="h-px w-10 md:w-14 bg-algos-gold" />
              <p className="font-sans font-bold uppercase text-cream text-[11px] md:text-[12px] tracking-[0.28em]">
                Estudio · Neurofisiología
              </p>
            </div>
            <h1
              className="font-sans font-light text-cream leading-[1.05] md:leading-[0.95] tracking-[-0.02em]"
              style={{
                fontSize: "clamp(2.75rem, 8.5vw, 7.5rem)",
                textShadow: hc ? "none" : "0 2px 24px rgba(0,0,0,0.35)",
              }}
            >
              Electromiografía
            </h1>
            <p
              className="font-sans font-light text-cream/85 mt-5 md:mt-6 max-w-[640px] leading-[1.65] md:leading-[1.5]"
              style={{
                fontSize: "clamp(1rem, 1.6vw, 1.375rem)",
                textShadow: hc ? "none" : "0 1px 12px rgba(0,0,0,0.35)",
              }}
            >
              Escuchamos lo que dicen sus nervios y sus músculos, y traducimos esa señal en un diagnóstico preciso.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-3"
      >
        <span className="font-sans uppercase text-cream/70 text-[10px] tracking-[0.32em]">Desliza</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="block h-8 w-px bg-algos-gold"
        />
      </motion.div>
    </section>
  );
}

/* ---------- Chapter marker (I / II / III) ---------- */
function Chapter({ numeral, label }: { numeral: string; label: string }) {
  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12 pt-24 md:pt-32 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-baseline gap-6 md:gap-8"
        >
          <span
            className="font-sans font-thin text-algos-gold leading-none tabular-nums"
            style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}
          >
            {numeral}
          </span>
          <span className="flex-1 h-px bg-deep-teal/15" />
          <span className="font-sans font-bold uppercase text-deep-teal/60 text-[11px] tracking-[0.28em]">
            {label}
          </span>
        </motion.div>
      </div>
    </div>
  );
}

/* ---------- Oversized editorial statement ---------- */
function EditorialStatement({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-cream pt-12 md:pt-12 pb-20 md:pb-24">
      <div className="mx-auto max-w-[1080px] px-6 md:px-12">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-sans font-light text-deep-teal leading-[1.4] md:leading-[1.25] tracking-[-0.01em]"
          style={{ fontSize: "clamp(1.5rem, 3.4vw, 2.75rem)" }}
        >
          {children}
        </motion.p>
      </div>
    </section>
  );
}

/* ---------- Full-bleed pull quote panel (dark) ---------- */
function ManifestoPanel({ hc }: { hc: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <section ref={ref} className="relative bg-deep-teal overflow-hidden py-28 md:py-40">
      <motion.div
        style={{ y }}
        className="pointer-events-none absolute inset-0 will-change-transform"
      >
        <div
          className="absolute inset-0"
          style={{
            background: hc
              ? "radial-gradient(ellipse at 30% 30%, rgba(198,150,54,0.30) 0%, rgba(0,0,0,0) 55%)"
              : "radial-gradient(ellipse at 30% 30%, rgba(198,150,54,0.14) 0%, rgba(26,74,85,0) 55%)",
          }}
        />
      </motion.div>
      <div className="relative mx-auto max-w-[1080px] px-6 md:px-12">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-sans font-light text-cream leading-[1.2] md:leading-[1.1] tracking-[-0.02em]"
          style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
        >
          No trate <span className="text-algos-gold">a ciegas</span>.
          <br />
          Vea el nervio primero.
        </motion.p>
        <div className="mt-8 md:mt-10 flex items-center gap-4">
          <span className="h-px w-10 bg-algos-gold" />
          <p className="font-sans uppercase text-cream/60 text-[11px] tracking-[0.28em]">
            Filosofía ALGOS
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- Cinematic CTA ---------- */
function CinematicCTA({ hc }: { hc: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yGlow = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  return (
    <section ref={ref} className="relative bg-deep-teal overflow-hidden py-28 md:py-40">
      <motion.div
        style={{ y: yGlow }}
        className="pointer-events-none absolute inset-0 will-change-transform"
      >
        <div
          className="absolute inset-0"
          style={{
            background: hc
              ? "radial-gradient(ellipse at 50% 60%, rgba(198,150,54,0.40) 0%, rgba(0,0,0,0) 60%)"
              : "radial-gradient(ellipse at 50% 60%, rgba(198,150,54,0.22) 0%, rgba(26,74,85,0) 60%)",
          }}
        />
      </motion.div>
      <div className="relative mx-auto max-w-[820px] px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-sans font-bold uppercase text-cream text-[11px] tracking-[0.28em] mb-6">
            Su próximo paso
          </p>
          <h2
            className="font-sans font-light text-cream leading-[1.15] md:leading-[1.05] tracking-[-0.02em] mb-8"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)" }}
          >
            Cuéntenos sus síntomas.
            <br />
            Le decimos si este estudio es para usted.
          </h2>
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-algos-gold hover:bg-[#d4a648] text-[#0A2A32] font-sans font-bold uppercase text-[13px] tracking-[0.24em] px-12 py-5 transition-colors"
          >
            Escríbanos por WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ================ Page ================ */
export default function EMG() {
  const [hc, setHc] = useState(false);

  return (
    <div className={`min-h-screen ${hc ? "emg-hc" : "bg-cream"}`}>
      <Navbar />
      <main>
        <CinematicHero hc={hc} />

        <Chapter numeral="I" label="Qué es" />
        <EditorialStatement>
          Un estudio que <span className="text-algos-gold">mide</span> cómo viajan las señales por sus nervios y cómo responden sus músculos — para ver si un nervio está comprimido, irritado o dañado, y en qué punto exacto.
        </EditorialStatement>

        <Chapter numeral="II" label="Para qué sirve" />
        <ProcedureSplitBlock
          image={imgBrazo}
          imageAlt="Estudio de conducción nerviosa en el brazo"
          eyebrow="Indicaciones"
          imageCaption="Conducción nerviosa: estímulos suaves sobre la piel."
          mobileContain
          highContrast={hc}
        >
          <p>
            Es el estudio indicado cuando el dolor viene con hormigueo, adormecimiento, debilidad o corrientazos.
          </p>
          <p>
            Confirma, por ejemplo, el nervio comprometido de una ciática o el daño de la neuropatía diabética, y le señala al especialista dónde está el problema.
          </p>
        </ProcedureSplitBlock>

        <ManifestoPanel hc={hc} />

        <Chapter numeral="III" label="Cómo se hace" />
        <ProcedureSplitBlock
          image={imgPierna}
          imageAlt="Electromiografía en la pierna con registro en pantalla"
          eyebrow="Procedimiento"
          imageCaption="Registro en tiempo real durante el estudio."
          reverse
          mobileContain
          highContrast={hc}
        >
          <p>
            El estudio ocurre en dos actos: primero la conducción nerviosa, luego el registro con una aguja muy fina en algunos músculos.
          </p>
          <p>
            Todo en la misma sesión, de forma ambulatoria, y el especialista interpreta los registros en el momento.
          </p>
        </ProcedureSplitBlock>

        <Chapter numeral="IV" label="Detalles" />
        <ProcedureDetails
          facts={[
            { label: "Duración", value: "30 a 60 min" },
            { label: "Anestesia", value: "No requiere" },
            { label: "Modalidad", value: "Ambulatorio" },
            { label: "Después", value: "Puede irse enseguida" },
          ]}
          preparation="Acuda con la piel limpia, sin cremas ni aceites en brazos y piernas. Puede comer normal. Traiga estudios previos e informes si los tiene."
          steps={[
            { title: "Entrevista clínica", description: "Le preguntamos por sus síntomas, cuándo empezaron y qué medicamentos toma. Examinamos la zona." },
            { title: "Estudio de conducción nerviosa", description: "Se aplican estímulos eléctricos suaves sobre la piel para medir cómo viajan las señales por sus nervios. La sensación es como un corrientazo breve." },
            { title: "Electromiografía con aguja", description: "Se introduce una aguja muy fina en algunos músculos para registrar su actividad. Puede molestar un poco, pero es tolerable y dura pocos minutos por músculo." },
            { title: "Interpretación", description: "El especialista revisa los registros y le explica el hallazgo. Recibe un informe que orienta al médico tratante." },
          ]}
          faq={[
            { question: "¿Duele el estudio?", answer: "Los estímulos eléctricos son breves e incómodos, pero no dolorosos. La aguja fina puede causar una molestia leve por músculo evaluado. La mayoría lo tolera bien." },
            { question: "¿Puedo manejar después del estudio?", answer: "Sí. No queda con sedación ni anestesia. Puede retomar sus actividades normales de inmediato." },
            { question: "¿Necesito ayuno?", answer: "No. Coma normal antes del estudio." },
            { question: "¿Cuándo tengo el resultado?", answer: "El informe se entrega en pocos días, con la interpretación del especialista." },
          ]}
        />

        <CinematicCTA hc={hc} />
      </main>
      <HomeFooter />
      <WhatsAppButton />

      {/* High-contrast toggle */}
      <button
        onClick={() => setHc((v) => !v)}
        aria-pressed={hc}
        aria-label={hc ? "Desactivar modo de alto contraste" : "Activar modo de alto contraste"}
        className={`fixed bottom-6 left-6 z-50 font-sans font-bold uppercase text-[11px] tracking-[0.2em] px-5 py-3 border-2 transition-colors min-h-[44px] min-w-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
          hc
            ? "bg-black text-white border-white focus-visible:ring-white focus-visible:ring-offset-black"
            : "bg-deep-teal text-cream border-cream focus-visible:ring-algos-gold focus-visible:ring-offset-cream"
        }`}
      >
        {hc ? "Contraste normal" : "Alto contraste"}
      </button>
    </div>
  );
}
