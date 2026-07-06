import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import ConditionsSection from "@/components/ConditionsSection";
import EspecialidadesSection from "@/components/EspecialidadesSection";
import WhyDifferentSection from "@/components/WhyDifferentSection";
import AllianceSection from "@/components/AllianceSection";
import AlgosLocationSection from "@/components/AlgosLocationSection";
import TeamSection from "@/components/TeamSection";
import HomeFAQSection from "@/components/HomeFAQSection";
import FinalCTA from "@/components/FinalCTA";

export default function Index() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <TrustBar />
      <ConditionsSection />
      <EspecialidadesSection />
      <WhyDifferentSection />
      <AllianceSection />
      <TeamSection />
      <HomeFAQSection />
      <AlgosLocationSection />
      <FinalCTA />
      <HomeFooter />
      <WhatsAppButton />
    </div>
  );
}
