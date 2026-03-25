import { useEffect } from "react";
import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { LandingHero } from "@/components/landing/LandingHero";
import { TwoStatePilot } from "@/components/landing/TwoStatePilot";
import { ObjectivesImpact } from "@/components/landing/ObjectivesImpact";
import { TrainingJourney } from "@/components/landing/TrainingJourney";
import { PartnershipSection } from "@/components/landing/PartnershipSection";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { useLanguage } from "@/hooks/useLanguage";

export default function Index() {
  const { language } = useLanguage();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col antialiased bg-background ${language === 'ar' ? 'font-arabic' : 'font-sans'}`}>
      <LandingNavbar />
      
      <main className="flex-1">
        <LandingHero />
        <TwoStatePilot />
        <ObjectivesImpact />
        <TrainingJourney />
        <PartnershipSection />
      </main>

      <LandingFooter />
    </div>
  );
}
