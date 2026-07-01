import { Link } from "react-router-dom";
import { useDrawPathsWithin, useInViewOnce } from "@/lib/animations";
import tx01Lumbar from "@/assets/tx-01-lumbar.jpg";
import tx02Cervical from "@/assets/tx-02-cervical.jpg";
import tx03Perif from "@/assets/tx-03-perif.jpg";
import tx04Eco from "@/assets/tx-04-eco.jpg";
import imgSalaProcedimientos from "@/assets/sala-procedimientos.jpg";
import imgAboutProcedure from "@/assets/about-procedure.jpg";
import imgExperienceTech from "@/assets/experience-tech.jpg";

const CARD_CONDITION_SLUGS = ["dolor-lumbar-ciatica", "dolor-cervical", "neuropatia", "dolor-articular"];

const DEEP_TEAL = "#1a4a55";
const DEEP_TEAL_HOVER = "#18434d";
const CREAM = "#f5f0e8";
const GOLD = "#c69636";

// AI-generated clinical procedure photography (no patient faces, cool clinical palette).
const CARD_IMAGES: { src: string; alt: string }[] = [
  {
    src: tx01Lumbar,
    alt: "Procedimiento de bloqueo facetario lumbar guiado por fluoroscopia",
  },
  {
    src: tx02Cervical,
    alt: "Procedimiento de bloqueo radicular cervical selectivo",
  },
  {
    src: tx03Perif,
    alt: "Procedimiento de bloqueo de nervio periférico guiado por ultrasonido",
  },
  {
    src: tx04Eco,
    alt: "Procedimiento de infiltración guiada por ecografía",
  },
];

type Card = {
  category: string;
  index: string;
  headline: React.ReactNode;
  indication: string;
  technique: string;
  svg: React.ReactNode;
  uduzRef?: string;
};

const strokeCream = CREAM;
const strokeFaint = "rgba(245, 240, 232, 0.35)";
const strokeDashed = "rgba(245, 240, 232, 0.45)";
const ringStroke = "rgba(198, 150, 54, 0.35)";

const labelStyle: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: 8,
  fill: "rgba(245, 240, 232, 0.6)",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
};

function TargetMark({ cx, cy, r = 9, dotR = 4 }: { cx: number; cy: number; r?: number; dotR?: number }) {
  return (
    <g className="target-mark">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={ringStroke} strokeWidth={1} />
      <circle cx={cx} cy={cy} r={dotR} fill={GOLD} />
    </g>
  );
}

const serviciosAdicionales = [
  {
    category: "Electrodiagnóstico",
    title: "Electromiografía (EMG)",
    bajada: "Estudio de los nervios y los músculos.",
    description:
      "Mide cómo viajan las señales por sus nervios y cómo responden sus músculos. Confirma el origen de dolores con hormigueo, adormecimiento o debilidad, y le señala al especialista dónde está el problema para tratarlo con precisión.",
    image: imgExperienceTech,
    imageAlt: "Equipo de electrodiagnóstico neurofisiológico",
  },
  {
    category: "Electrodiagnóstico",
    title: "Electroencefalograma (EEG)",
    bajada: "Estudio de la actividad eléctrica del cerebro.",
    description:
      "Registra la actividad eléctrica de su cerebro con electrodos sobre el cuero cabelludo. Estudio sencillo, no invasivo y sin dolor. Indicado ante convulsiones, episodios de desmayo, sospecha de epilepsia o seguimiento de condiciones neurológicas.",
    image: imgSalaProcedimientos,
    imageAlt: "Sala de procedimientos clínicos ALGOS",
  },
  {
    category: "Columna · Hernia discal",
    title: "Discólisis con ozono",
    bajada: "Tratamiento del dolor de disco sin cirugía.",
    description:
      "Aplicación de ozono médico en el disco de la columna, guiada por imagen, que ayuda a reducir el volumen de la hernia y la inflamación que irrita el nervio. Indicado para la ciática por hernia discal lumbar cuando el dolor no ha cedido con otros tratamientos, como opción antes de plantearse la cirugía.",
    image: imgAboutProcedure,
    imageAlt: "Procedimiento de discólisis con ozono guiado por imagen",
    isComingSoon: false,
  },
  {
    category: "Dolor facetario · Artrosis",
    title: "Radiofrecuencia",
    bajada: "Alivio duradero del dolor articular y facetario.",
    description:
      "Calor controlado aplicado sobre el nervio que transmite el dolor. Ambulatorio. Indicado para dolor facetario cervical o lumbar confirmado por bloqueo diagnóstico, y para artrosis de rodilla.",
    image: imgSalaProcedimientos,
    imageAlt: "Sala de procedimientos — radiofrecuencia",
    isComingSoon: true,
  },
];

const cards: Card[] = [
  {
    category: "Columna · Lumbar y ciática",
    index: "01 / 04",
    headline: (
      <>
        Bloqueo radicular lumbar <span className="font-normal">y ciática</span>
      </>
    ),
    indication:
      "Para dolor lumbar con irradiación a la pierna (ciática) causado por hernia discal o compresión de raíz nerviosa.",
    technique:
      "bloqueo radicular guiado por fluoroscopia o tomografía · ambulatorio · anestesia local.",
    uduzRef: "Rayos X lumbar desde $8 · Tomografía desde $25 en UDUZ Paraíso",

    svg: (
      <svg viewBox="0 0 180 140" className="w-full h-[160px]" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
        <path d="M 60 18 L 110 18 L 116 32 L 56 32 Z" fill="none" stroke={strokeCream} strokeWidth={1.5} />
        <path d="M 58 38 L 114 38 L 120 54 L 54 54 Z" fill="none" stroke={strokeCream} strokeWidth={1.5} />
        <path d="M 56 60 L 118 60 L 124 78 L 52 78 Z" fill="none" stroke={strokeCream} strokeWidth={1.5} />
        <path d="M 54 84 L 122 84 L 128 102 L 50 102 Z" fill="none" stroke={strokeCream} strokeWidth={1.5} />
        <path d="M 52 108 L 126 108 L 132 124 L 48 124 Z" fill="none" stroke={strokeCream} strokeWidth={1.5} />
        <path d="M 85 14 Q 88 60 91 124" fill="none" stroke={strokeFaint} strokeWidth={1} />
        <line x1={160} y1={68} x2={128} y2={92} stroke={strokeDashed} strokeWidth={1} strokeDasharray="3 3" />
        <TargetMark cx={128} cy={92} />
        <text x={148} y={60} style={labelStyle}>L4–L5</text>
      </svg>
    ),
  },
  {
    category: "Columna · Cervical",
    index: "02 / 04",
    headline: (
      <>
        Bloqueo radicular cervical <span className="font-normal">selectivo</span>
      </>
    ),
    indication:
      "Para dolor radicular cervical con compromiso de raíz nerviosa específica, irradiación a hombro o brazo.",
    technique:
      "infiltración perirradicular guiada por fluoroscopia o tomografía · ambulatorio.",
    uduzRef: "Tomografía cervical disponible 24/7 desde $25 en UDUZ Paraíso",
    svg: (
      <svg viewBox="0 0 180 140" className="w-full h-[160px]" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
        <path d="M 78 14 L 102 14 L 106 22 L 74 22 Z" fill="none" stroke={strokeCream} strokeWidth={1.5} />
        <path d="M 76 26 L 104 26 L 108 34 L 72 34 Z" fill="none" stroke={strokeCream} strokeWidth={1.5} />
        <path d="M 74 38 L 106 38 L 110 48 L 70 48 Z" fill="none" stroke={strokeCream} strokeWidth={1.5} />
        <path d="M 72 52 L 108 52 L 112 62 L 68 62 Z" fill="none" stroke={strokeCream} strokeWidth={1.5} />
        <path d="M 70 66 L 110 66 L 114 76 L 66 76 Z" fill="none" stroke={strokeCream} strokeWidth={1.5} />
        <path d="M 68 80 L 112 80 L 116 90 L 64 90 Z" fill="none" stroke={strokeCream} strokeWidth={1.5} />
        <path d="M 66 94 L 114 94 L 120 108 L 60 108 Z" fill="none" stroke={strokeCream} strokeWidth={1.5} />
        <path d="M 116 71 Q 138 70 152 82 Q 160 90 164 102" fill="none" stroke={strokeCream} strokeWidth={1.5} />
        <path d="M 114 56 Q 132 56 144 64" fill="none" stroke={strokeFaint} strokeWidth={1} />
        <path d="M 116 86 Q 134 90 146 100" fill="none" stroke={strokeFaint} strokeWidth={1} />
        <TargetMark cx={148} cy={74} />
        <text x={142} y={50} style={labelStyle}>C6</text>
      </svg>
    ),
  },
  {
    category: "Sistema nervioso · Neuropatía",
    index: "03 / 04",
    headline: (
      <>
        Neuropatía <span className="font-normal">diabética y periférica</span>
      </>
    ),
    indication:
      "Para dolor, hormigueo o adormecimiento en pies y manos causado por daño en nervios periféricos, frecuentemente asociado a diabetes.",
    technique:
      "EMG diagnóstico · bloqueo de nervio periférico guiado por ecografía · ambulatorio.",
    uduzRef: "EMG disponible en ALGOS · Ecografía desde $15 en UDUZ Paraíso",
    svg: (
      <svg viewBox="0 0 180 140" className="w-full h-[160px]" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
        <path d="M 18 32 Q 50 56, 70 70 Q 92 86, 110 84 Q 130 82, 150 92" fill="none" stroke={strokeCream} strokeWidth={1.5} />
        <path d="M 70 70 Q 76 80, 78 92" fill="none" stroke={strokeFaint} strokeWidth={1} />
        <path d="M 70 70 Q 64 82, 60 94" fill="none" stroke={strokeFaint} strokeWidth={1} />
        <path d="M 110 84 Q 116 96, 118 108" fill="none" stroke={strokeFaint} strokeWidth={1} />
        <path d="M 150 92 Q 158 102, 162 114" fill="none" stroke={strokeFaint} strokeWidth={1} />
        <path d="M 92 76 Q 100 78 110 84" fill="none" stroke={strokeDashed} strokeWidth={1} strokeDasharray="3 3" />
        <TargetMark cx={100} cy={79} r={10} />
        <text x={100} y={50} style={labelStyle}>N. periférico</text>
      </svg>
    ),
  },
  {
    category: "Diagnóstico · Tratamiento",
    index: "04 / 04",
    headline: (
      <>
        Infiltración guiada por <span className="font-normal">ecografía</span>
      </>
    ),
    indication:
      "Para tendinopatías, bursitis, infiltraciones articulares periféricas. Diagnóstico dinámico en la misma sesión.",
    technique:
      "ecógrafo portátil · visualización en tiempo real · ambulatorio.",
    uduzRef: "Ecografía diagnóstica previa disponible en UDUZ Paraíso desde $15",
    svg: (
      <svg viewBox="0 0 180 140" className="w-full h-[160px]" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
        <rect x={56} y={14} width={68} height={14} rx={3} fill="none" stroke={strokeCream} strokeWidth={1.5} />
        <line x1={62} y1={28} x2={58} y2={34} stroke={strokeCream} strokeWidth={1.5} />
        <line x1={118} y1={28} x2={122} y2={34} stroke={strokeCream} strokeWidth={1.5} />
        <path d="M 58 34 L 36 110 L 144 110 L 122 34 Z" fill="none" stroke={strokeFaint} strokeWidth={1} />
        <line x1={60} y1={50} x2={120} y2={50} stroke={strokeFaint} strokeWidth={1} />
        <line x1={52} y1={72} x2={128} y2={72} stroke={strokeFaint} strokeWidth={1} />
        <line x1={44} y1={94} x2={136} y2={94} stroke={strokeFaint} strokeWidth={1} />
        <line x1={172} y1={44} x2={98} y2={86} stroke={strokeDashed} strokeWidth={1} strokeDasharray="3 3" />
        <TargetMark cx={92} cy={86} r={12} dotR={4.5} />
        <text x={142} y={40} style={labelStyle}>Aguja</text>
        <text x={22} y={124} style={labelStyle}>Plano</text>
      </svg>
    ),
  },
];

export default function TratamientosSection() {
  return (
    <section
      id="tratamientos"
      className="relative w-full"
      style={{
        backgroundColor: DEEP_TEAL,
        color: CREAM,
        paddingTop: "clamp(88px, 10vw, 140px)",
        paddingBottom: "clamp(48px, 5vw, 72px)",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: 1280, paddingLeft: "clamp(24px, 4vw, 48px)", paddingRight: "clamp(24px, 4vw, 48px)" }}>
        {/* HEADER */}
        <div
          className="grid grid-cols-1 mdx:grid-cols-[1fr_1.3fr] gap-10 mdx:gap-16"
          style={{
            borderBottom: "1px solid rgba(245, 240, 232, 0.18)",
            paddingBottom: 48,
            marginBottom: 112,
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                color: GOLD,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                marginBottom: 24,
              }}
            >
              TRATAMIENTOS · ENFOQUE CLÍNICO
            </p>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 13,
                color: "rgba(245, 240, 232, 0.65)",
                maxWidth: "34ch",
                lineHeight: 1.6,
              }}
            >
              Procedimientos guiados por imagen — fluoroscopia, tomografía o ecografía según el caso.
            </p>
          </div>
          <div>
            <h2
              style={{
                fontFamily: "'Sora', serif",
                fontWeight: 700,
                fontSize: "clamp(44px, 6vw, 72px)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: CREAM,
                margin: 0,
              }}
            >
              Procedimientos{" "}
              <span
                style={{
                  fontWeight: 400,
                  color: GOLD,
                }}
              >
                de precisión.
              </span>
            </h2>
          </div>
        </div>

        {/* GRID 2x2 */}
        <div
          className="grid grid-cols-1 mdx:grid-cols-2"
          style={{
            backgroundColor: "rgba(245, 240, 232, 0.15)",
            border: "1px solid rgba(245, 240, 232, 0.15)",
            gap: 1,
          }}
        >
          {cards.map((card, i) => (
            <Link
              key={i}
              to={`/tratamientos/${CARD_CONDITION_SLUGS[i]}`}
              className="block focus:outline-none focus:ring-2 focus:ring-[#c69636]"
            >
              <TratamientoCard card={card} image={CARD_IMAGES[i]} />
            </Link>
          ))}
        </div>

        {/* SERVICIOS ADICIONALES */}
        <div style={{ marginTop: "clamp(56px, 7vw, 88px)" }}>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: GOLD,
              marginBottom: 28,
            }}
          >
            ESTUDIOS Y OTROS TRATAMIENTOS
          </p>
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
            style={{
              backgroundColor: "rgba(245, 240, 232, 0.10)",
              border: "1px solid rgba(245, 240, 232, 0.12)",
              gap: 1,
            }}
          >
            {serviciosAdicionales.map((s, i) => (
              <div
                key={i}
                style={{
                  position: "relative",
                  overflow: "hidden",
                  backgroundColor: s.isComingSoon ? "rgba(26,74,85,0.55)" : DEEP_TEAL,
                  padding: "clamp(24px, 2.5vw, 36px)",
                  opacity: s.isComingSoon ? 0.82 : 1,
                }}
              >
                {/* Background image */}
                <img
                  src={s.image}
                  alt=""
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    opacity: 0.08,
                    mixBlendMode: "luminosity",
                  }}
                />
                {/* Content */}
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div className="flex items-center justify-between" style={{ marginBottom: 10 }}>
                    <p
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: GOLD,
                        margin: 0,
                      }}
                    >
                      {s.category}
                    </p>
                    {s.isComingSoon && (
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: 9,
                          fontWeight: 700,
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          color: "rgba(245,240,232,0.5)",
                          border: "1px solid rgba(245,240,232,0.2)",
                          borderRadius: 2,
                          padding: "2px 6px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        PRÓXIMAMENTE
                      </span>
                    )}
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Sora', serif",
                      fontWeight: 600,
                      fontSize: "clamp(17px, 1.5vw, 21px)",
                      color: s.isComingSoon ? "rgba(245,240,232,0.65)" : CREAM,
                      margin: 0,
                      marginBottom: 6,
                      lineHeight: 1.2,
                    }}
                  >
                    {s.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 12,
                      color: "rgba(245, 240, 232, 0.45)",
                      margin: 0,
                      marginBottom: 12,
                    }}
                  >
                    {s.bajada}
                  </p>
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 14,
                      color: s.isComingSoon ? "rgba(245,240,232,0.45)" : "rgba(245, 240, 232, 0.70)",
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {s.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <div
          className="flex flex-col mdx:flex-row mdx:items-end mdx:justify-between gap-8"
          style={{
            marginTop: "clamp(48px, 6vw, 80px)",
            borderTop: "1px solid rgba(245, 240, 232, 0.18)",
            paddingTop: 32,
          }}
        >
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 13,
              color: "rgba(245, 240, 232, 0.55)",
              maxWidth: "56ch",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Cada caso se evalúa de forma individual. La indicación final depende de la historia clínica, los estudios de imagen y la valoración del especialista — no toda condición es candidata a un procedimiento.
          </p>
          <a
            href="/tratamientos"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: GOLD,
              borderBottom: `1.5px solid ${GOLD}`,
              paddingBottom: 4,
              alignSelf: "flex-start",
              whiteSpace: "nowrap",
            }}
          >
            Ver todos los tratamientos →
          </a>
        </div>
      </div>
    </section>
  );
}

function TratamientoCard({ card, image }: { card: Card; image?: { src: string; alt: string } }) {
  const drawRef = useDrawPathsWithin<HTMLElement>(1500, 120, 0.3);
  const { ref: viewRef, inView } = useInViewOnce<HTMLElement>(0.3);
  const setRefs = (el: HTMLElement | null) => {
    drawRef.current = el;
    viewRef.current = el;
  };
  return (
    <article
      ref={setRefs}
      className={`anatomy-card group flex flex-col transition-colors duration-300 ${inView ? "in-view" : ""}`}
      style={{
        backgroundColor: DEEP_TEAL,
        padding: "clamp(28px, 3.5vw, 48px)",
        gap: 28,
        position: "relative",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = DEEP_TEAL_HOVER)}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = DEEP_TEAL)}
    >
      {/* TOP STRIP — eyebrow + index */}
      <div className="flex items-baseline justify-between" style={{ gap: 16 }}>
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            color: GOLD,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          {card.category}
        </span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            color: "rgba(245, 240, 232, 0.5)",
            fontSize: 11,
            letterSpacing: "0.08em",
            whiteSpace: "nowrap",
          }}
        >
          {card.index}
        </span>
      </div>

      {/* PHOTO BANNER — hero visual of the card */}
      {image && (
        <img
          src={image.src}
          alt={image.alt}
          aria-label={image.alt}
          loading="lazy"
          decoding="async"
          className="tx-photo"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      )}

      {/* SVG anatomical · technical annotation, smaller */}
      <div className="flex justify-center items-center" style={{ height: 100 }}>
        <div className="w-full h-full [&>svg]:!h-full">{card.svg}</div>
      </div>

      <h3
        style={{
          fontFamily: "'Sora', serif",
          fontWeight: 600,
          fontSize: "clamp(26px, 2.4vw, 32px)",
          lineHeight: 1.15,
          letterSpacing: "-0.015em",
          color: CREAM,
          margin: 0,
        }}
      >
        {card.headline}
      </h3>

      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 15,
          color: "rgba(245, 240, 232, 0.78)",
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        {card.indication}
      </p>

      <p
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: "rgba(245, 240, 232, 0.55)",
          lineHeight: 1.6,
          paddingTop: 14,
          borderTop: "1px solid rgba(245, 240, 232, 0.12)",
          margin: 0,
          marginTop: "auto",
        }}
      >
        <strong style={{ color: GOLD, fontWeight: 700 }}>Técnica:</strong> {card.technique}
      </p>
      {card.uduzRef && (
        <a
          href="https://uduz.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 12,
            fontWeight: 700,
            color: GOLD,
            letterSpacing: "0.03em",
            lineHeight: 1.55,
            marginTop: 10,
            padding: "10px 12px",
            borderLeft: `3px solid ${GOLD}`,
            backgroundColor: "rgba(198, 150, 54, 0.08)",
            display: "block",
            textDecoration: "none",
            borderRadius: 4,
          }}
        >
          {card.uduzRef} →
        </a>
      )}

    </article>
  );
}
