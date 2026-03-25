import { MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";

export function TwoStatePilot() {
  const { t } = useLanguage();

  const states = [
    {
      id: "kassala",
      titleKey: "pilot.kassala.title",
      descKey: "pilot.kassala.desc",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=60",
      color: "border-primary/50",
      bg: "bg-primary/5",
    },
    {
      id: "kosti",
      titleKey: "pilot.kosti.title",
      descKey: "pilot.kosti.desc",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&auto=format&fit=crop&q=60",
      color: "border-info/50",
      bg: "bg-info/5",
    },
  ];

  return (
    <section id="pilot" className="py-24 bg-muted/30">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("pilot.title")}</h2>
          <div className="h-1.5 w-20 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {states.map((state) => (
            <Card key={state.id} className={`overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 ${state.color} ${state.bg}`}>
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={state.image} 
                  alt={t(state.titleKey)} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 text-white">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-bold">{t(state.titleKey)}</h3>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-muted-foreground leading-relaxed">
                  {t(state.descKey)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
