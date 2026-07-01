import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "¿Duele el procedimiento?",
    answer:
      "La mayoría de los procedimientos se realizan con anestesia local, por lo que se percibe presión o una molestia leve, no dolor intenso. Antes de comenzar le explicamos qué sensación tendrá en cada paso, y durante todo el procedimiento el equipo está atento a su comodidad.",
  },
  {
    question: "¿Es seguro? ¿Tiene efectos secundarios?",
    answer:
      "Son procedimientos mínimamente invasivos y ambulatorios, con un perfil de seguridad favorable cuando se realizan guiados por imagen y a cargo de un equipo con experiencia. La guía por imagen es, precisamente, lo que permite actuar con precisión sobre el punto indicado. Como todo acto médico, puede haber efectos secundarios leves y transitorios; en la consulta se le informan los que corresponden a su caso.",
  },
  {
    question: "¿Cuánto dura el procedimiento y la recuperación? ¿Es ambulatorio?",
    answer:
      "En su mayoría son ambulatorios: el procedimiento suele durar entre 20 y 45 minutos y el paciente regresa a casa el mismo día. El tiempo de recuperación depende del procedimiento realizado; en muchos casos es posible reincorporarse a la actividad habitual en poco tiempo. Las indicaciones específicas se entregan en la consulta.",
  },
  {
    question: "¿Necesito referencia médica para ir?",
    answer:
      "No es necesaria. Puede agendar su consulta de forma directa. Si acude referido por su médico, con gusto le hacemos llegar el informe de su evaluación.",
  },
  {
    question: "¿Cuál es el costo?",
    answer:
      "Consulte directamente con nosotros. Le informaremos con transparencia en su primera evaluación.",
  },
  {
    question: "¿En cuánto tiempo notaré mejoría?",
    answer:
      "Depende del procedimiento: algunos ofrecen alivio en pocos días y otros, como la radiofrecuencia, alcanzan su efecto en algunas semanas.",
  },
  {
    question: "¿El efecto es permanente?",
    answer:
      "Varía según el tratamiento y el caso: algunos brindan alivio duradero y otros pueden repetirse de acuerdo con la evolución. En la consulta se le explica qué esperar en su situación.",
  },
];

export default function FAQSection() {
  return (
    <section id="faq" className="py-24 md:py-32 bg-card">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="scroll-reveal text-center mb-16">
          <p className="text-secondary text-sm tracking-[0.3em] uppercase mb-4 font-medium">
            Preguntas frecuentes
          </p>
          <h2 className="text-3xl md:text-5xl font-extralight text-foreground leading-tight mb-6">
            Preguntas frecuentes
          </h2>
        </div>

        <div className="scroll-reveal">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, idx) => (
              <AccordionItem
                key={idx}
                value={`faq-${idx}`}
                className="border border-border/50 rounded-xl px-6 bg-background data-[state=open]:border-secondary/30 transition-colors"
              >
                <AccordionTrigger className="text-left text-foreground font-medium hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-light leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
