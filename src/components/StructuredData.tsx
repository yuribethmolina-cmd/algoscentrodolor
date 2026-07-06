import { Helmet } from "react-helmet-async";
import type { Condition } from "@/data/treatments";

export function MedicalProcedureSchema({ condition }: { condition: Condition }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: `Tratamiento de ${condition.name.toLowerCase()}`,
    description: condition.patientDescription,
    procedureType: "https://schema.org/TherapeuticProcedure",
    bodyLocation: condition.name,
    provider: {
      "@type": "MedicalClinic",
      name: "ALGOS · Centro de Dolor Intervencionista",
      url: "https://algos.lovable.app",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Av. 20 con Calle 65, N° 65-02, C.C. América, Local 4",
        addressLocality: "Maracaibo",
        addressRegion: "Zulia",
        postalCode: "4005",
        addressCountry: "VE",
      },
      telephone: "+584146807886",
      email: "info@algoscentrodolor.com",
    },
  };
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
