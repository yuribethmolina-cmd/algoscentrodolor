import SectionLayout from "@/components/layouts/SectionLayout";
import WhyDifferentSection from "@/components/WhyDifferentSection";
import { patientLinks } from "@/lib/sectionLinks";

export default function PorQueAlgos() {
  return (
    <SectionLayout sectionLinks={patientLinks}>
      <WhyDifferentSection />
    </SectionLayout>
  );
}
