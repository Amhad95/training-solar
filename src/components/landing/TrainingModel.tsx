import { useLanguage } from "@/hooks/useLanguage";
import { BookOpen, Wrench, Trophy } from "lucide-react";

export function TrainingModel() {
  const { t, language } = useLanguage();

  const pillars = [
    {
      icon: BookOpen,
      titleKey: "model.p1.title",
      descKey: "model.p1.desc",
    },
    {
      icon: Wrench,
      titleKey: "model.p2.title",
      descKey: "model.p2.desc",
    },
    {
      icon: Trophy,
      titleKey: "model.p3.title",
      descKey: "model.p3.desc",
    },
  ];

  return (
    <section id="model" className="py-24 bg-muted/30">
      <div className="container max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("model.title")}</h2>
          <div className="h-1.5 w-20 bg-primary mx-auto rounded-full mb-8" />
          <p className="text-lg text-muted-foreground w-full max-w-2xl mx-auto mb-10">
            {t("model.body")}
          </p>
          
          {/* 70/30 Progress Bar Illustration */}
          <div className="w-full max-w-3xl mx-auto bg-background border p-4 rounded-xl shadow-sm mb-16">
             <div className="flex justify-between mb-2 text-sm font-bold text-foreground">
               <span>{language === 'en' ? '70% Practical Training' : '70% تدريب عملي'}</span>
               <span>{language === 'en' ? '30% Theoretical' : '30% نظري'}</span>
             </div>
             <div className="h-4 w-full flex rounded-full overflow-hidden">
               <div className="h-full bg-primary" style={{ width: '70%' }} />
               <div className="h-full bg-primary/20" style={{ width: '30%' }} />
             </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div key={i} className="flex flex-col items-center text-center p-8 bg-background border rounded-2xl shadow-sm transition-all hover:shadow-md hover:border-primary/30">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-4">{t(pillar.titleKey)}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t(pillar.descKey)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
