import { useLanguage } from "@/hooks/useLanguage";
import { Award } from "lucide-react";

export function ProgramOutcomes() {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-background">
      <div className="container max-w-4xl">
        <div className="flex flex-col items-center text-center p-8 md:p-16 rounded-3xl gradient-primary text-primary-foreground shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[50px] mix-blend-overlay" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-[50px] mix-blend-overlay" />
          
          <Award className="w-16 h-16 mb-6 relative z-10" />
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6 relative z-10">
            {t("outcomes.title")}
          </h2>
          
          <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed max-w-3xl relative z-10">
            {t("outcomes.body")}
          </p>
        </div>
      </div>
    </section>
  );
}
