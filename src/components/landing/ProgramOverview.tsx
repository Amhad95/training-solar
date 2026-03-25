import { useLanguage } from "@/hooks/useLanguage";

export function ProgramOverview() {
  const { t } = useLanguage();

  return (
    <section id="overview" className="py-24 bg-background border-t">
      <div className="container max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            {t("overview.title")}
          </h2>
          <div className="h-1.5 w-24 bg-primary mx-auto rounded-full mb-8" />
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            {t("overview.body")}
          </p>
        </div>
      </div>
    </section>
  );
}
