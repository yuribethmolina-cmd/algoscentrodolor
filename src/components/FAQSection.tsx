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
      "Aplicamos anestesia local antes de comenzar, por lo que la sensación es de presión o leve molestia, no de dolor intenso. Le explicamos paso a paso qué va a sentir, y durante todo el procedimiento el equipo está atento a su comodidad. La mayoría de pacientes se sorprenden de lo tolerable que es.",
  },
  {
    question: "¿Me van a sedar? ¿Necesito anestesia general?",
    answer:
      "No. Nuestros procedimientos se realizan con anestesia local en el sitio exacto de intervención. No requieren sedación general ni hospitalización. Usted permanece consciente y puede comunicarse con el equipo en todo momento — eso es parte de la seguridad del procedimiento.",
  },
  {
    question: "¿Qué pasa si me muevo durante el procedimiento?",
    answer:
      "Es normal preocuparse por esto. El procedimiento se realiza con guía de imagen en tiempo real (ecografía o fluoroscopia), por lo que el médico puede ver exactamente la posición de cada estructura en todo momento. Además, la anestesia local elimina la respuesta de movimiento involuntario. Solo le pedimos que avise si siente algo inesperado.",
  },
  {
    question: "¿Es seguro? ¿Tiene efectos secundarios?",
    answer:
      "Son procedimientos mínimamente invasivos con un perfil de seguridad favorable cuando se realizan guiados por imagen. La guía visual es precisamente lo que permite actuar con precisión milimétrica sobre el punto indicado, reduciendo al mínimo el riesgo de afectar estructuras vecinas. Como todo acto médico, puede haber efectos transitorios menores; en consulta le informamos los específicos para su caso.",
  },
  {
    question: "¿Puedo ir solo o necesito acompañante?",
    answer:
      "Le recomendamos venir acompañado para mayor comodidad, especialmente para el regreso a casa. Aunque los procedimientos son ambulatorios y la mayoría de pacientes se sienten bien inmediatamente, es preferible no conducir el mismo día. Para la primera consulta de evaluación puede venir solo sin inconveniente.",
  },
  {
    question: "¿Cuánto dura el procedimiento y cuándo puedo retomar mis actividades?",
    answer:
      "La intervención suele durar entre 20 y 45 minutos. La mayoría de pacientes retoman actividades ligeras en 24–48 horas. El tiempo exacto depende del procedimiento y de su evolución individual; las indicaciones post-procedimiento se entregan por escrito el mismo día.",
  },
  {
    question: "¿Qué pasa si el procedimiento no funciona?",
    answer:
      "Parte de nuestra responsabilidad es ser honestos desde la primera consulta sobre qué esperar en su caso particular. Si un procedimiento no produce el resultado esperado, lo evaluamos juntos y exploramos la siguiente opción más adecuada. No existe un único camino y trabajamos con usted hasta encontrar la respuesta correcta.",
  },
  {
    question: "¿Necesito referencia médica para ir?",
    answer:
      "No es necesaria. Puede agendar su consulta directamente. Si viene referido por su médico, con gusto le hacemos llegar el informe de evaluación para que conozca la evolución de su paciente.",
  },
  {
    question: "¿Cuál es el costo?",
    answer:
      "Contáctenos directamente para información sobre tarifas — estamos disponibles por WhatsApp o al correo info@algoscentrodolor.com.",
  },
  {
    question: "¿Cuánto tiempo tardaré en notar mejoría?",
    answer:
      "Depende del procedimiento: algunos producen alivio en los primeros días y otros, como la radiofrecuencia, alcanzan su efecto máximo en dos a cuatro semanas. En la consulta le explicamos con precisión qué esperar y en qué plazos en su caso específico.",
  },
  {
    question: "¿El efecto es permanente?",
    answer:
      "Varía según el tratamiento y la condición: algunos producen alivio duradero de meses o años, y otros pueden repetirse según la evolución. En la consulta le explicamos las expectativas realistas para su situación — sin promesas exageradas ni minimizar los beneficios reales.",
  },
];

export default function FAQSection() {
  return (
    <section id="faq" className="py-20 md:py-28 bg-[#f5f0e8]">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-14">
          <p className="text-[#c69636] font-medium text-sm tracking-[0.25em] uppercase mb-5">
            PREGUNTAS FRECUENTES
          </p>
          <h2 className="font-display font-bold text-[#1a4a55] text-3xl md:text-4xl lg:text-5xl leading-tight">
            Lo que más nos preguntan
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, idx) => (
            <AccordionItem
              key={idx}
              value={`faq-${idx}`}
              className="border border-[#1a4a55]/15 rounded-xl px-6 bg-white data-[state=open]:border-[#3d8b96]/40 transition-colors"
            >
              <AccordionTrigger className="text-left font-display font-semibold text-[#1a4a55] text-base hover:no-underline py-5 hover:text-[#3d8b96] transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="font-sans text-[#1a4a55]/75 leading-relaxed pb-5 text-[15px]">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
