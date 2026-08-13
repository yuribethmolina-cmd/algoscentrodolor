import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { STUDY_FAQ_GROUPS } from "@/data/studyFaqs";

type Props = {
  title?: string;
  subtitle?: string;
  className?: string;
};

export default function StudyFaqSection({
  title = "Preguntas frecuentes sobre los estudios",
  subtitle = "Resuelve tus dudas antes de agendar. Si algo no está aquí, escríbenos por WhatsApp.",
  className = "",
}: Props) {
  const [active, setActive] = useState<string>(STUDY_FAQ_GROUPS[0].id);
  const group = STUDY_FAQ_GROUPS.find((g) => g.id === active) ?? STUDY_FAQ_GROUPS[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: STUDY_FAQ_GROUPS.flatMap((g) =>
      g.faqs.map((f) => ({
        "@type": "Question",
        name: `${g.label}: ${f.question}`,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    ),
  };

  return (
    <section className={`${className}`} aria-labelledby="faq-estudios-title">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h2 id="faq-estudios-title" className="font-display font-semibold text-[#1a4a55] text-2xl md:text-3xl mb-2">
        {title}
      </h2>
      <p className="text-[#1a4a55]/80 mb-6">{subtitle}</p>

      <div className="flex flex-wrap gap-2 mb-6" role="tablist" aria-label="Estudios">
        {STUDY_FAQ_GROUPS.map((g) => (
          <button
            key={g.id}
            type="button"
            role="tab"
            aria-selected={active === g.id}
            onClick={() => setActive(g.id)}
            className={`flex-1 min-w-[140px] rounded-md border px-4 py-2.5 text-sm font-medium transition-colors ${
              active === g.id
                ? "border-[#1a4a55] bg-[#1a4a55] text-white"
                : "border-[#1a4a55]/20 bg-white text-[#1a4a55] hover:bg-[#1a4a55]/5"
            }`}
          >
            {g.label}
          </button>
        ))}
      </div>

      <Accordion type="single" collapsible className="rounded-lg bg-white border border-[#1a4a55]/15 px-4 md:px-6">
        {group.faqs.map((f, i) => (
          <AccordionItem key={`${group.id}-${i}`} value={`${group.id}-${i}`} className="border-b border-[#1a4a55]/10 last:border-0">
            <AccordionTrigger className="text-left text-[#1a4a55] text-[15px] md:text-base leading-snug py-4 hover:no-underline">
              {f.question}
            </AccordionTrigger>
            <AccordionContent className="text-[#1a4a55]/85 text-[15px] leading-relaxed pb-5">
              {f.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
