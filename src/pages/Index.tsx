import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import PainTabSection from "@/components/PainTabSection";
import PatientJourneySection from "@/components/PatientJourneySection";
import AllianceSection from "@/components/AllianceSection";
import AlgosLocationSection from "@/components/AlgosLocationSection";
import SedesSection from "@/components/SedesSection";
import HomeTeamSection from "@/components/HomeTeamSection";
import HomeFAQSection from "@/components/HomeFAQSection";
import InstagramSection from "@/components/InstagramSection";
import FinalCTA from "@/components/FinalCTA";
import SEOHead from "@/components/SEOHead";
import atilioPhoto from "@/assets/Atilio_foto_cortada.png.asset.json";

const DEEP_TEAL = "#1a4a55";
const GOLD = "#c69636";

const HOME_FAQS = [
  { q: "¿Cómo sé si ALGOS puede ayudarme?", a: "Si tiene dolor que no cede con reposo, medicamentos o fisioterapia, es candidato a una evaluación. No importa dónde le duele, lo evaluamos y le decimos con honestidad qué opciones existen." },
  { q: "¿Duele el procedimiento?", a: "Los procedimientos se realizan con anestesia local. La mayoría de los pacientes describe una molestia leve durante el procedimiento que cede rápidamente." },
  { q: "¿Cuánto tiempo dura la recuperación?", a: "La mayoría de los pacientes retoma actividades ligeras al día siguiente. No hay hospitalización, el procedimiento es ambulatorio." },
  { q: "¿Necesito una orden médica para venir?", a: "No. Puede venir directamente a consulta. Si trae estudios previos, tráigalos, pero no son requisito para la primera evaluación." },
  { q: "¿Cuánto cuesta la consulta?", a: "Escríbanos por WhatsApp y le informamos los costos actualizados según el tipo de evaluación que necesita." },
];

const HOME_FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: HOME_FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Index() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <SEOHead
        title="ALGOS · Centro de Dolor Intervencionista en Maracaibo"
        description="Primer centro especializado en dolor intervencionista del Zulia. Infiltraciones, bloqueos, radiofrecuencia, ozono, EMG y EEG guiados por imagen."
        canonical="https://algoscentrodolor.com/"
      >
        <script type="application/ld+json">{JSON.stringify(HOME_FAQ_LD)}</script>
      </SEOHead>
      <Navbar />
      <HeroSection />

      {/* Señal humana: equipo real detrás del centro */}
      <section className="sm:hidden bg-[#f5f0e8]" style={{ padding: "24px 0 32px" }}>
        <div className="px-6 flex items-center gap-4">
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              overflow: "hidden",
              border: `2px solid ${GOLD}`,
              flexShrink: 0,
            }}
          >
            <img
              src={atilioPhoto.url}
              alt="Dr. Atilio Rodríguez"
              loading="eager"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
            />
          </div>
          <div>
            <p
              className="font-ui"
              style={{ fontSize: "14.5px", lineHeight: 1.45, color: DEEP_TEAL, margin: 0, maxWidth: "32ch" }}
            >
              “Detrás de cada consulta hay un equipo que conoce su caso por nombre.”
            </p>
            <p
              className="font-ui mt-1"
              style={{ fontSize: "12px", color: "rgba(26,74,85,0.62)", margin: 0 }}
            >
              Dr. Atilio Rodríguez · Neurocirujano de ALGOS
            </p>
          </div>
        </div>
      </section>

      <TrustBar />
      <PainTabSection />
      <PatientJourneySection />
      <HomeFAQSection />
      <AllianceSection />
      <HomeTeamSection />
      <SedesSection />
      <AlgosLocationSection />
      <InstagramSection />
      <FinalCTA />
      <HomeFooter />
    </div>
  );
}

