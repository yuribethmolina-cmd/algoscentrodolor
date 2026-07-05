import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import ConditionsSection from "@/components/ConditionsSection";
import EspecialidadesSection from "@/components/EspecialidadesSection";
import EstudiosDiagnosticosSection from "@/components/EstudiosDiagnosticosSection";
import ServiciosDomicilioSection from "@/components/ServiciosDomicilioSection";
import SedesSection from "@/components/SedesSection";
import WhyDifferentSection from "@/components/WhyDifferentSection";
import TeamSection from "@/components/TeamSection";
import HomeFAQSection from "@/components/HomeFAQSection";
import ProximamenteSection from "@/components/ProximamenteSection";
import AllianceSection from "@/components/AllianceSection";
import StatsStrip from "@/components/StatsStrip";
import FinalCTA from "@/components/FinalCTA";

export default function Index() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <TrustBar />
      <EspecialidadesSection />
      <EstudiosDiagnosticosSection />
      <ServiciosDomicilioSection />
      <SedesSection />
      <ConditionsSection />
      <WhyDifferentSection />
      <TeamSection />
      <HomeFAQSection />
      <ProximamenteSection />
      <AllianceSection />
      <StatsStrip />
      <FinalCTA />
      <HomeFooter />
      <WhatsAppButton />
    </div>
  );
}
