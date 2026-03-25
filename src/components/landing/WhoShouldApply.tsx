import { useLanguage } from "@/hooks/useLanguage";
import { User, MapPin, GraduationCap, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function WhoShouldApply() {
  const { t } = useLanguage();

  const criteria = [
    {
      icon: User,
      titleKey: "eligibility.age.title",
      descKey: "eligibility.age.desc",
    },
    {
      icon: MapPin,
      titleKey: "eligibility.location.title",
      descKey: "eligibility.location.desc",
    },
    {
      icon: GraduationCap,
      titleKey: "eligibility.education.title",
      descKey: "eligibility.education.desc",
    },
    {
      icon: Clock,
      titleKey: "eligibility.commitment.title",
      descKey: "eligibility.commitment.desc",
    },
  ];

  return (
    <section id="eligibility" className="py-24 bg-background">
      <div className="container max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("eligibility.title")}</h2>
          <div className="h-1.5 w-20 bg-primary mx-auto rounded-full mb-8" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("eligibility.body")}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {criteria.map((item, i) => {
            const Icon = item.icon;
            return (
              <Card key={i} className="border shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-3 text-center">
                  <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                    <Icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-lg">{t(item.titleKey)}</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground text-sm">
                  {t(item.descKey)}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
