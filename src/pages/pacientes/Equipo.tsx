import SectionLayout from "@/components/layouts/SectionLayout";
import TeamSection from "@/components/TeamSection";
import { patientLinks } from "@/lib/sectionLinks";

export default function PacientesEquipo() {
  return (
    <SectionLayout sectionLinks={patientLinks}>
      <TeamSection />
    </SectionLayout>
  );
}
