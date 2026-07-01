import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import AudienceRouter from "@/components/AudienceRouter";

import TratamientosSection from "@/components/TratamientosSection";
import WhyDifferentSection from "@/components/WhyDifferentSection";
import GuiasImagenSection from "@/components/GuiasImagenSection";
import AllianceSection from "@/components/AllianceSection";
import StatsStrip from "@/components/StatsStrip";
import FinalCTA from "@/components/FinalCTA";

export default function Index() {

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <TrustBar />
      <AudienceRouter />
      <TratamientosSection />
      <WhyDifferentSection />
      <GuiasImagenSection />
      <AllianceSection />
      <StatsStrip />
      <FinalCTA />
      <HomeFooter />
      <WhatsAppButton />
    </div>
  );
}
