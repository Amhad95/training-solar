import { useLanguage } from "@/hooks/useLanguage";
import { Wrench, BookOpen, Rocket } from "lucide-react";

export function TrainingJourney() {
  const { t, language } = useLanguage();

  const phases = [
    {
      icon: Wrench,
      titleKey: "journey.phase1.title",
      descKey: "journey.phase1.desc",
      duration: "5 Months",
    },
    {
      icon: BookOpen,
      titleKey: "journey.phase2.title",
      descKey: "journey.phase2.desc",
      duration: "15 Days",
    },
    {
      icon: Rocket,
      titleKey: "journey.phase3.title",
      descKey: "journey.phase3.desc",
      duration: "6 Months",
    },
  ];

  return (
    <section id="program" className="py-24 bg-muted/30">
      <div className="container max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("journey.title")}</h2>
          <div className="h-1.5 w-20 bg-primary mx-auto rounded-full" />
        </div>

        <div className="relative">
          {/* Connector Line */}
          <div className={`hidden md:block absolute top-[45px] ${language === 'ar' ? 'right-0' : 'left-0'} w-full h-[2px] bg-border`} />

          <div className="grid md:grid-cols-3 gap-8 md:gap-4 relative z-10">
            {phases.map((phase, i) => {
              const Icon = phase.icon;
              return (
                <div key={i} className="flex flex-col items-center text-center relative group">
                  <div className="w-24 h-24 rounded-full bg-background border-4 border-background shadow-md flex items-center justify-center mb-6 relative z-10 transition-transform group-hover:scale-110">
                    <div className="w-full h-full rounded-full gradient-primary flex items-center justify-center text-primary-foreground">
                      <Icon className="w-8 h-8" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3">{t(phase.titleKey)}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-xs px-4">
                    {t(phase.descKey)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
