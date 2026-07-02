import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
            {facts.map((f) => (
              <div key={f.label}>
                <p className="font-sans font-bold uppercase text-algos-gold text-[10px] tracking-[0.22em] mb-2">
                  {f.label}
                </p>
                <p className="font-sans text-deep-teal text-[16px] md:text-[17px] leading-[1.45]">
                  {f.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preparación */}
      {preparation && (
        <section className="bg-cream pt-16 md:pt-20">
          <div className="mx-auto max-w-[800px] px-6 md:px-12">
            <p className="font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.22em] mb-5">
              Preparación
            </p>
            <p className="font-sans text-deep-teal text-[17px] leading-[1.7]">{preparation}</p>
          </div>
        </section>
      )}

      {/* Cómo es el día */}
      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-[800px] px-6 md:px-12">
          <p className="font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.22em] mb-8">
            Cómo es el día del procedimiento
          </p>
          <ol className="space-y-8">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-6">
                <span className="font-sans text-algos-gold text-[13px] tracking-[0.2em] pt-1 shrink-0 w-8">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="border-l border-deep-teal/15 pl-6">
                  <h3 className="font-sans font-semibold text-deep-teal text-[17px] mb-2">
                    {s.title}
                  </h3>
                  <p className="font-sans text-deep-teal/85 text-[16px] leading-[1.7]">
                    {s.description}
                  </p>
                </div>
              </li>
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
                <AccordionTrigger className="font-sans text-deep-teal text-[16px] md:text-[17px] text-left py-5 hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="font-sans text-deep-teal/85 text-[16px] leading-[1.7] pb-5">
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
