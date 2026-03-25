import { useEffect } from "react";
import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { LandingHero } from "@/components/landing/LandingHero";
import { PartnershipSection } from "@/components/landing/PartnershipSection";
import { ProgramOverview } from "@/components/landing/ProgramOverview";
import { TrainingModel } from "@/components/landing/TrainingModel";
import { WhatYouWillLearn } from "@/components/landing/WhatYouWillLearn";
import { ImplementationLocations } from "@/components/landing/ImplementationLocations";
import { WhoShouldApply } from "@/components/landing/WhoShouldApply";
import { HowToApply } from "@/components/landing/HowToApply";
import { ProgramOutcomes } from "@/components/landing/ProgramOutcomes";
import { LandingFAQ } from "@/components/landing/LandingFAQ";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { useLanguage } from "@/hooks/useLanguage";

export default function Index() {
  const { language } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col antialiased bg-background ${language === 'ar' ? 'font-arabic' : 'font-sans'}`}>
      <LandingNavbar />
      
      <main className="flex-1">
        <LandingHero />
        <PartnershipSection />
        <ProgramOverview />
        <TrainingModel />
        <WhatYouWillLearn />
        <ImplementationLocations />
        <WhoShouldApply />
        <HowToApply />
        <ProgramOutcomes />
        <LandingFAQ />
      </main>

      <LandingFooter />
    </div>
  );
}
