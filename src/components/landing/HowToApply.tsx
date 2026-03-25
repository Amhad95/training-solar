import { useLanguage } from "@/hooks/useLanguage";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HowToApply() {
  const { t, language } = useLanguage();
  const ArrowIcon = language === "ar" ? ArrowLeft : ArrowRight;

  return (
    <section className="py-24 bg-muted/30 border-t">
      <div className="container max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("apply.title")}</h2>
          <div className="h-1.5 w-20 bg-primary mx-auto rounded-full mb-8" />
          <p className="text-lg text-muted-foreground">
            {t("apply.body")}
          </p>
        </div>

        <div className="bg-background border rounded-2xl shadow-sm p-8 md:p-12">
          <ul className="space-y-6 mb-10 text-lg text-foreground">
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">•</span>
              {t("apply.step1")}
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">•</span>
              {t("apply.step2")}
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">•</span>
              {t("apply.step3")}
            </li>
          </ul>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t pt-8">
            <div className="text-sm font-semibold text-destructive px-4 py-2 bg-destructive/10 rounded-full w-full sm:w-auto text-center">
              {t("apply.deadline")}
            </div>
            
            <a href="[Google Form URL]" target="_blank" rel="noreferrer" className="w-full sm:w-auto">
              <Button size="lg" className="w-full gap-2">
                {t("nav.apply")}
                <ArrowIcon className="w-4 h-4 rtl-flip" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
