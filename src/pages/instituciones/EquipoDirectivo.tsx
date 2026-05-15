import SectionLayout from "@/components/layouts/SectionLayout";
import { institutionLinks } from "@/lib/sectionLinks";
import TeamSection from "@/components/TeamSection";

export default function EquipoDirectivo() {
  return (
    <SectionLayout sectionLinks={institutionLinks}>
      <TeamSection />
    </SectionLayout>
  );
}
