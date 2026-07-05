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
    pregunta: "¿Duele el procedimiento?",
    respuesta:
      "La mayoría de los procedimientos se realizan con anestesia local, por lo que se percibe presión o una molestia leve, no dolor intenso. Antes de comenzar le explicamos qué sensación tendrá en cada paso, y durante todo el procedimiento el equipo está atento a su comodidad.",
  },
  {
    pregunta: "¿Es seguro? ¿Qué efectos secundarios puede tener?",
    respuesta:
      "Son procedimientos mínimamente invasivos y ambulatorios, con un perfil de seguridad favorable cuando se realizan guiados por imagen y a cargo de un equipo con experiencia. Como todo acto médico, puede haber efectos secundarios leves y transitorios; en la consulta se le informan los que corresponden a su caso.",
  },
  {
    pregunta: "¿Cuánto dura el procedimiento y la recuperación?",
    respuesta:
      "En su mayoría son ambulatorios: el procedimiento suele durar entre 20 y 45 minutos y el paciente regresa a casa el mismo día. El tiempo de recuperación depende del procedimiento realizado; en muchos casos es posible reincorporarse a la actividad habitual en poco tiempo. Las indicaciones específicas se entregan en la consulta.",
  },
  {
    pregunta: "¿En cuánto tiempo notaré mejoría?",
    respuesta:
      "Depende del procedimiento: algunos ofrecen alivio en pocos días y otros, como la radiofrecuencia, alcanzan su efecto en algunas semanas.",
  },
  {
    pregunta: "¿Los efectos son permanentes?",
    respuesta:
      "Varía según el tratamiento y el caso: algunos brindan alivio duradero y otros pueden repetirse de acuerdo con la evolución. En la consulta se le explica qué esperar en su situación.",
  },
  {
    pregunta: "¿Cuánto cuesta?",
    respuesta:
      "El costo se define después de la evaluación clínica, según el procedimiento indicado para su caso. Contáctenos para agendar consulta y recibir la información correspondiente.",
  },
  {
    pregunta: "¿Cómo agendo una cita?",
    respuesta:
      "Puede agendar por WhatsApp, teléfono o desde el formulario de contacto. Le confirmamos día y hora según la disponibilidad del especialista que su caso requiere.",
  },
  {
    pregunta: "¿Necesito referencia médica?",
    respuesta:
      "No es necesaria. Puede agendar su consulta de forma directa. Si acude referido por su médico, con gusto le hacemos llegar el informe de su evaluación.",
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
              color: GOLD,
              marginBottom: 20,
            }}
          >
            PREGUNTAS
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
            Preguntas frecuentes
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
