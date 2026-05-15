import SectionLayout from "@/components/layouts/SectionLayout";
import ProcessSection from "@/components/ProcessSection";
import { patientLinks } from "@/lib/sectionLinks";

export default function ComoFunciona() {
  return (
    <SectionLayout sectionLinks={patientLinks}>
      <ProcessSection />
    </SectionLayout>
  );
}
