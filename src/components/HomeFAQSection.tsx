import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const DEEP_TEAL = "#1a4a55";
const GOLD = "#c69636";
const CREAM = "#f5f0e8";

const faqs = [
  {
    pregunta: "¿Cómo sé si ALGOS puede ayudarme?",
    respuesta:
      "Si tiene dolor que no cede con reposo, medicamentos o fisioterapia, es candidato a una evaluación. No importa dónde le duele — lo evaluamos y le decimos con honestidad qué opciones existen.",
  },
  {
    pregunta: "¿Duele el procedimiento?",
    respuesta:
      "Los procedimientos se realizan con anestesia local. La mayoría de los pacientes describe una molestia leve durante el procedimiento que cede rápidamente. El dolor que usted tiene hoy suele ser mayor que el del procedimiento.",
  },
  {
    pregunta: "¿Cuánto tiempo dura la recuperación?",
    respuesta:
      "La mayoría de los pacientes retoma actividades ligeras al día siguiente. No hay hospitalización — el procedimiento es ambulatorio y sale el mismo día con indicaciones escritas.",
  },
  {
    pregunta: "¿Necesito una orden médica para venir?",
    respuesta:
      "No. Puede venir directamente a consulta. Si trae estudios previos — resonancia, tomografía, EMG — tráigalos, pero no son requisito para la primera evaluación.",
  },
  {
    pregunta: "¿Cuánto cuesta la consulta?",
    respuesta:
      "Escríbanos por WhatsApp y le informamos los costos actualizados según el tipo de evaluación que necesita.",
  },
];

export default function HomeFAQSection() {
  return (
    <section
      style={{
        backgroundColor: CREAM,
        paddingTop: "clamp(80px, 10vw, 128px)",
        paddingBottom: "clamp(80px, 10vw, 128px)",
      }}
    >
      <div
        className="mx-auto"
        style={{
          maxWidth: 800,
          paddingLeft: "clamp(24px, 4vw, 48px)",
          paddingRight: "clamp(24px, 4vw, 48px)",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "clamp(40px, 5vw, 60px)" }}>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: DEEP_TEAL,
              marginBottom: 20,
            }}
          >
            PREGUNTAS FRECUENTES
          </p>
          <h2
            style={{
              fontFamily: "'Sora', serif",
              fontWeight: 600,
              fontSize: "clamp(28px, 3.6vw, 48px)",
              lineHeight: 1.15,
              color: DEEP_TEAL,
            }}
          >
            Lo que los pacientes siempre preguntan
          </h2>
        </div>

        {/* Accordion */}
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, idx) => (
            <AccordionItem
              key={idx}
              value={`faq-${idx}`}
              style={{ borderColor: "rgba(26,74,85,0.14)" }}
            >
              <AccordionTrigger
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "clamp(15px, 1.3vw, 17px)",
                  fontWeight: 500,
                  color: DEEP_TEAL,
                  textAlign: "left",
                  paddingTop: "clamp(18px, 2vw, 22px)",
                  paddingBottom: "clamp(18px, 2vw, 22px)",
                  textDecoration: "none",
                }}
              >
                {faq.pregunta}
              </AccordionTrigger>
              <AccordionContent
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "clamp(14px, 1.2vw, 16px)",
                  lineHeight: 1.75,
                  color: "rgba(26,74,85,0.65)",
                  paddingBottom: "clamp(18px, 2vw, 24px)",
                }}
              >
                {faq.respuesta}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
