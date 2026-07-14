import SectionLayout from "@/components/layouts/SectionLayout";
import TeamSection from "@/components/TeamSection";
import EquipoSpecialtySections from "@/components/EquipoSpecialtySections";
import SEOHead from "@/components/SEOHead";
import { patientLinks } from "@/lib/sectionLinks";
import { DOCTORS } from "@/data/doctors";
import { SPECIALTIES } from "@/data/specialties";

export default function PacientesEquipo() {
  const availableSpecialties = SPECIALTIES.filter((s) =>
    DOCTORS.some((d) => d.specialtySlug === s.slug),
  );

  return (
    <SectionLayout sectionLinks={patientLinks}>
      <SEOHead
        title="Especialistas para pacientes con dolor | ALGOS Maracaibo"
        description="Guía para pacientes: qué especialista de ALGOS puede evaluar su dolor. Neurocirugía, traumatología, fisiatría, reumatología, algología, psicología y nutrición en Maracaibo."
        canonical="https://algoscentrodolor.com/pacientes/equipo"
      >
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalOrganization",
            name: "ALGOS Centro de Dolor",
            url: "https://algoscentrodolor.com/pacientes/equipo",
            medicalSpecialty: availableSpecialties.map((s) => s.name),
            employee: DOCTORS.map((d) => ({
              "@type": "Physician",
              name: d.name,
              medicalSpecialty: d.specialty,
              url: `https://algoscentrodolor.com/equipo/${d.slug}`,
            })),
          })}
        </script>
      </SEOHead>
      <TeamSection />
      <EquipoSpecialtySections />
    </SectionLayout>
  );
}
