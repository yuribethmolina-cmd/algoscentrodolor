import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";

export type ProcedureFact = { label: string; value: string };
export type ProcedureStep = { title: string; description: string };
export type ProcedureFAQ = { question: string; answer: string };

interface Props {
  facts: ProcedureFact[];
  steps: ProcedureStep[];
  faq: ProcedureFAQ[];
  preparation?: string;
}

export default function ProcedureDetails({ facts, steps, faq, preparation }: Props) {
  return (
    <>
      {/* Datos clave */}
      <section className="bg-cream border-y border-deep-teal/10">
        <div className="mx-auto max-w-[1080px] px-6 md:px-12 py-10 md:py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6">
            {facts.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="font-sans font-bold uppercase text-algos-gold text-[10px] tracking-[0.22em] mb-2">
                  {f.label}
                </p>
                <p className="font-sans text-deep-teal text-[16px] md:text-[17px] leading-[1.45]">
                  {f.value}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Preparación */}
      {preparation && (
        <section className="bg-cream pt-24 md:pt-24">
          <div className="mx-auto max-w-[800px] px-6 md:px-12">
            <p className="font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.22em] mb-5">
              Preparación
            </p>
            <p className="font-sans text-deep-teal text-[16px] md:text-[17px] leading-[1.75]">{preparation}</p>
          </div>
        </section>
      )}

      {/* Cómo es el día */}
      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-[800px] px-6 md:px-12">
          <p className="font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.22em] mb-8">
            Cómo es el día del procedimiento
          </p>
          <ol className="space-y-12 md:space-y-10 md:pl-6">
            {steps.map((s, i) => (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="flex gap-6 md:gap-8 items-start"
              >
                <span
                  className="font-sans font-light text-algos-gold text-[34px] md:text-[40px] leading-none tracking-tight shrinkTo shrink-0 w-14 md:w-16 tabular-nums"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 border-l border-deep-teal/15 pl-6 md:pl-8 pt-1 md:pt-2">
                  <h3 className="font-sans font-semibold text-deep-teal text-[16px] md:text-[17px] mb-2">
                    {s.title}
                  </h3>
                  <p className="font-sans text-deep-teal/85 text-[16px] leading-[1.75]">
                    {s.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream pb-20 md:pb-28">
        <div className="mx-auto max-w-[800px] px-6 md:px-12">
          <p className="font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.22em] mb-8">
            Preguntas frecuentes
          </p>
          <Accordion type="single" collapsible className="w-full">
            {faq.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b border-deep-teal/15"
              >
                <AccordionTrigger className="font-sans text-deep-teal text-[16px] md:text-[17px] text-left py-5 hover:no-underline leading-[1.6] md:leading-[1.5]">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="font-sans text-deep-teal/85 text-[16px] leading-[1.75] pb-6 md:pb-5">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
