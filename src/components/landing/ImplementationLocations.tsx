import { useLanguage } from "@/hooks/useLanguage";

export function ImplementationLocations() {
  const { t } = useLanguage();

  const locations = [
    {
      id: "kassala",
      titleKey: "locations.kassala.title",
      descKey: "locations.kassala.desc",
    },
    {
      id: "kosti",
      titleKey: "locations.kosti.title",
      descKey: "locations.kosti.desc",
    },
  ];

  return (
    <section id="locations" className="py-24 bg-muted/30 border-y">
      <div className="container max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("locations.title")}</h2>
          <div className="h-1.5 w-20 bg-primary mx-auto rounded-full mb-8" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("locations.body")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {locations.map((loc) => (
            <div key={loc.id} className="p-8 rounded-2xl bg-background border shadow-sm transition-all hover:shadow-md hover:border-primary/40 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8" />
               <h3 className="text-2xl font-bold mb-4 relative z-10">{t(loc.titleKey)}</h3>
               <p className="text-muted-foreground leading-relaxed relative z-10">
                 {t(loc.descKey)}
               </p>
               
               <div className="mt-8 pt-6 border-t font-semibold text-sm text-foreground/80 flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                 Active Training Center
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
