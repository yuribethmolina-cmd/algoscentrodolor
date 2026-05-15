import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "¿Qué es la medicina intervencionista del dolor?",
    answer:
      "Es una subespecialidad que utiliza técnicas mínimamente invasivas guiadas por imagen (ecógrafo, fluoroscopio) para tratar el dolor directamente en su origen anatómico, sin cirugía abierta ni dependencia crónica de medicamentos. Es el estándar de tratamiento en Europa y Estados Unidos.",
  },
  {
    question: "¿Los procedimientos duelen?",
    answer:
      "Se realizan con anestesia local y, en muchos casos, sedación ligera. La mayoría de los pacientes reportan mínimas molestias. Nuestro objetivo es que el procedimiento sea lo más cómodo posible.",
  },
  {
    question: "¿Es una cirugía?",
    answer:
      "No. Los procedimientos intervencionistas son mínimamente invasivos. Se realizan con agujas finas guiadas por imagen, sin cortes, sin suturas y sin hospitalización prolongada.",
  },
  {
    question: "¿Cuánto tiempo dura el procedimiento?",
    answer:
      "La mayoría dura entre 20 y 45 minutos, incluyendo preparación y observación. Puedes irte a casa el mismo día.",
  },
  {
    question: "¿Cuándo veré resultados?",
    answer:
      "Algunos pacientes sienten alivio inmediato. En otros, el efecto completo se desarrolla en días. Tu médico te explicará qué esperar según tu caso.",
  },
  {
    question: "¿Es seguro?",
    answer:
      "Sí. Todo procedimiento es guiado por imagen en tiempo real para máxima precisión. Nuestros especialistas siguen protocolos europeos y están certificados internacionalmente.",
  },
  {
    question: "¿Por qué ALGOS y no otra clínica?",
    answer:
      "ALGOS es el primer centro organizado en Maracaibo dedicado exclusivamente al dolor intervencionista. 100% guiado por imagen, protocolo clínico documentado desde el primer paciente, y modelo integral: neurocirugía + nutrición + electrodiagnóstico.",
  },
  {
    question: "¿Atienden convenios empresariales?",
    answer:
      "Sí. Ofrecemos programas de salud ocupacional y convenios para empresas, especialmente en el sector petrolero e industrial donde el 82% de los trabajadores reporta dolor musculoesquelético. Contáctanos para una propuesta personalizada.",
  },
  {
    question: "¿Ofrecen segunda opinión internacional?",
    answer:
      "Sí. El Dr. Luis Alberto Rodríguez, neurocirujano activo en Alemania, ofrece evaluaciones remotas para casos complejos o cuando hay indicación quirúrgica dudosa. Es una opinión respaldada por el estándar europeo de referencia.",
  },
  {
    question: "¿ALGOS compite con mi médico?",
    answer:
      "No. ALGOS complementa. Cada paciente referido recibe un informe detallado para su médico tratante. Trabajamos en equipo con otros especialistas.",
  },
  {
    question: "¿Qué pasa si no soy candidato a procedimiento?",
    answer:
      "Evaluación honesta. Si un procedimiento no está indicado, te lo decimos. Explicamos qué se puede hacer y qué no, sin presiones.",
  },
  {
    question: "¿Cuánto cuesta?",
    answer:
      "El costo depende del tipo de procedimiento. En tu primera evaluación recibirás un diagnóstico claro y un presupuesto transparente, sin sorpresas. Nuestros precios están diseñados para la clase media venezolana.",
  },
  {
    question: "¿Necesito referencia de otro médico?",
    answer:
      "No es obligatorio. Puedes agendar directamente tu evaluación. Si tienes estudios previos (resonancias, radiografías), tráelos a tu primera consulta.",
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
            Resolvemos tus dudas
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
