import { Lightbulb, Users2, Sprout, GraduationCap } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export function ObjectivesImpact() {
  const { t } = useLanguage();

  const objectives = [
    {
      icon: Lightbulb,
      titleKey: "obj.1.title",
      descKey: "obj.1.desc",
      bg: "bg-orange-500/10",
      color: "text-orange-500",
    },
    {
      icon: Users2,
      titleKey: "obj.2.title",
      descKey: "obj.2.desc",
      bg: "bg-blue-500/10",
      color: "text-blue-500",
    },
    {
      icon: Sprout,
      titleKey: "obj.3.title",
      descKey: "obj.3.desc",
      bg: "bg-green-500/10",
      color: "text-green-500",
    },
    {
      icon: GraduationCap,
      titleKey: "obj.4.title",
      descKey: "obj.4.desc",
      bg: "bg-purple-500/10",
      color: "text-purple-500",
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("obj.title")}</h2>
          <div className="h-1.5 w-20 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {objectives.map((obj, i) => {
            const Icon = obj.icon;
            return (
              <div 
                key={i}
                className="flex flex-col items-center text-center p-6 rounded-2xl border bg-card transition-all hover:shadow-md hover:border-primary/20"
              >
                <div className={`w-16 h-16 rounded-2xl ${obj.bg} flex items-center justify-center mb-6`}>
                  <Icon className={`w-8 h-8 ${obj.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-3">{t(obj.titleKey)}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t(obj.descKey)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
