import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import HeroSection from "@/components/HeroSection";
import AudienceRouter from "@/components/AudienceRouter";

import TratamientosSection from "@/components/TratamientosSection";
import EquipoSection from "@/components/EquipoSection";
import StatsStrip from "@/components/StatsStrip";
import FinalCTA from "@/components/FinalCTA";

export default function Index() {

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AudienceRouter />
      <TratamientosSection />
      <EquipoSection />
      <StatsStrip />
      <FinalCTA />
      <HomeFooter />
      <WhatsAppButton />
    </div>
  );
}
