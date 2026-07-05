import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import ConditionsSection from "@/components/ConditionsSection";
import ServicesSection from "@/components/ServicesSection";
import WhyDifferentSection from "@/components/WhyDifferentSection";
import TeamSection from "@/components/TeamSection";
import EspecialidadesSection from "@/components/EspecialidadesSection";
import GuiasImagenSection from "@/components/GuiasImagenSection";
import HomeFAQSection from "@/components/HomeFAQSection";
import AllianceSection from "@/components/AllianceSection";
import StatsStrip from "@/components/StatsStrip";
import FinalCTA from "@/components/FinalCTA";

export default function Index() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <TrustBar />
      <ConditionsSection />
      <ServicesSection />
      <WhyDifferentSection />
      <TeamSection />
      <EspecialidadesSection />
      <GuiasImagenSection />
      <HomeFAQSection />
      <AllianceSection />
      <StatsStrip />
      <FinalCTA />
      <HomeFooter />
      <WhatsAppButton />
    </div>
  );
}
