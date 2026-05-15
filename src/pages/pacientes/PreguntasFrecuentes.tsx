import SectionLayout from "@/components/layouts/SectionLayout";
import FAQSection from "@/components/FAQSection";
import { patientLinks } from "@/lib/sectionLinks";

export default function PreguntasFrecuentes() {
  return (
    <SectionLayout sectionLinks={patientLinks}>
      <FAQSection />
    </SectionLayout>
  );
}
