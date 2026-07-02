import { useState } from "react";
import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProcedureDetails from "@/components/procedimiento/ProcedureDetails";
import ProcedureSplitBlock from "@/components/procedimiento/ProcedureSplitBlock";
import ProcedureIntro from "@/components/procedimiento/ProcedureIntro";
import HighContrastToggle from "@/components/procedimiento/HighContrastToggle";
import imgSala from "@/assets/sala-procedimientos.jpg";
import infiltracionesVideo from "@/assets/infiltraciones-video.mp4.asset.json";

const WA = "https://wa.me/584146807886?text=Hola%2C%20quisiera%20información%20sobre%20Infiltraciones%20y%20bloqueos.";

const DEEP_TEAL = "#1a4a55";
const GOLD = "#c69636";
const CREAM = "#f5f0e8";

export default function Infiltraciones() {
  const [hc, setHc] = useState(false);
  return (
    <div className={`min-h-screen ${hc ? "procedure-hc" : "bg-cream"}`}>
      <Navbar />
      <main>
        {/* Hero with video background */}
        <section
          style={{
            position: "relative",
            backgroundColor: DEEP_TEAL,
            paddingTop: "clamp(100px, 13vw, 160px)",
            paddingBottom: "clamp(56px, 7vw, 96px)",
            overflow: "hidden",
            minHeight: "60vh",
          }}
        >
          {/* Video background */}
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.55,
            }}
          >
            <source src={infiltracionesVideo.url} type="video/mp4" />
          </video>

          {/* Gradient overlay for text legibility */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(to bottom, ${DEEP_TEAL}99 0%, ${DEEP_TEAL}77 50%, ${DEEP_TEAL}55 100%)`,
              pointerEvents: "none",
            }}
          />

          {/* Content */}
          <div
            className="relative mx-auto"
            style={{
              maxWidth: 1080,
              paddingLeft: "clamp(24px, 4vw, 48px)",
              paddingRight: "clamp(24px, 4vw, 48px)",
            }}
          >
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: CREAM,
                marginBottom: 20,
              }}
            >
              Procedimiento
            </p>
            <h1
              style={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(32px, 4.8vw, 68px)",
                lineHeight: 1.06,
                letterSpacing: "-0.025em",
                color: CREAM,
                maxWidth: "20ch",
              }}
            >
              Infiltraciones y bloqueos
            </h1>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "clamp(16px, 1.8vw, 19px)",
                lineHeight: 1.65,
                color: "rgba(245,240,232,0.8)",
                maxWidth: "52ch",
                marginTop: 20,
              }}
            >
              Inyecciones dirigidas para el dolor, guiadas por imagen.
            </p>
          </div>
        </section>

        <ProcedureIntro eyebrow="Qué es">
          Inyecciones de medicamento aplicadas con precisión sobre el punto que genera el dolor — una articulación, un nervio o una raíz —, siempre guiadas por imagen para llegar justo donde hace falta. Con anestesia local, ambulatorio: se va caminando el mismo día.
        </ProcedureIntro>

        <ProcedureSplitBlock
          image={imgSala}
          imageAlt="Sala de procedimientos ALGOS"
          eyebrow="Para qué sirve"
          imageCaption="Sala de procedimientos ALGOS"
        >
          <p>
            Sirven para dos cosas. Para tratar: bajar la inflamación y aliviar dolores como la ciática, la hernia discal o el dolor de las articulaciones de la columna.
          </p>
          <p>
            Y para confirmar de dónde viene el dolor: un bloqueo bien dirigido ayuda a identificar el nervio responsable y a orientar el tratamiento siguiente.
          </p>
        </ProcedureSplitBlock>

        <section className="bg-cream pb-8">
          <div className="mx-auto max-w-[860px] px-6 md:px-12">
            <div className="pt-2 border-t border-deep-teal/10 pt-10">
              <p className="font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.24em] mb-5">Guía por imagen</p>
              <p className="font-sans text-deep-teal text-[17px] leading-[1.75]">
                Contamos con las tres formas de guía por imagen — fluoroscopia, tomografía y ecografía — y usamos la que su caso necesita para tratarle mejor y con la mayor seguridad.
              </p>
            </div>
          </div>
        </section>

        <ProcedureDetails
          facts={[
            { label: "Duración", value: "20 a 40 min" },
            { label: "Anestesia", value: "Local" },
            { label: "Modalidad", value: "Ambulatorio" },
            { label: "Después", value: "Reposo relativo 24 a 48 h" },
          ]}
          preparation="Coma liviano ese día. Vaya con ropa cómoda y acompañado. Si toma anticoagulantes o aspirina, avise al equipo con antelación: puede que haya que ajustar la pauta antes del procedimiento."
          steps={[
            { title: "Valoración previa", description: "Revisamos su historia, sus estudios de imagen y confirmamos que la infiltración es la opción indicada para su caso." },
            { title: "Posicionamiento en sala", description: "Le ubicamos en la camilla en la posición adecuada. Se limpia la piel y se prepara el campo estéril." },
            { title: "Aplicación guiada por imagen", description: "Con fluoroscopia, tomografía o ecografía se dirige la aguja al punto exacto. Se aplica anestesia local y luego el medicamento." },
            { title: "Observación", description: "Descansa unos 20 a 30 minutos en la sala mientras verificamos que todo esté bien." },
            { title: "Alta y recomendaciones", description: "Se va a casa el mismo día con indicaciones claras de reposo, medicación y cuándo volver a control." },
          ]}
          faq={[
            { question: "¿Duele la infiltración?", answer: "Se aplica anestesia local antes, por lo que la molestia es mínima. Puede sentir presión mientras se aplica el medicamento." },
            { question: "¿Cuándo comienza el alivio?", answer: "Depende del tipo de infiltración. Algunas dan alivio a las horas, otras se notan a los días. El médico le explicará qué esperar en su caso." },
            { question: "¿Debo suspender aspirina o anticoagulantes?", answer: "Nunca por su cuenta. Avise al equipo qué medicamentos toma y le indicamos qué hacer y con cuánta antelación." },
            { question: "¿Cuántas veces se puede repetir?", answer: "Depende de la respuesta y de la zona. El especialista define el intervalo y el número de sesiones según su evolución." },
          ]}
        />

        <section className="bg-deep-teal py-20 md:py-28">

          <div className="mx-auto max-w-[720px] px-6 md:px-12 text-center">
            <p className="font-sans text-cream/80 text-[18px] leading-[1.65] mb-10 max-w-[48ch] mx-auto">
              Cuéntenos cómo es su dolor y un miembro de nuestro equipo le orientará sobre el paso siguiente. Sin compromiso.
            </p>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="inline-block bg-brand-teal hover:bg-[#4a9ca8] text-cream font-sans font-bold uppercase text-[13px] tracking-[0.2em] rounded-none px-10 py-5 transition-colors">
              Escríbanos por WhatsApp
            </a>
          </div>
        </section>
      </main>
      <HomeFooter />
      <WhatsAppButton />
      <HighContrastToggle enabled={hc} onToggle={() => setHc((v) => !v)} />
    </div>
  );
}
