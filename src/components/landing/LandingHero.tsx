import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

export function LandingHero() {
  const { t, language } = useLanguage();
  const ArrowIcon = language === "ar" ? ArrowLeft : ArrowRight;

  return (
    <section className="relative overflow-hidden bg-background pt-16 pb-32">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] mix-blend-multiply opacity-50 dark:opacity-20 translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-accent/30 rounded-full blur-[120px] mix-blend-multiply opacity-50 dark:opacity-20 -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6 text-center lg:text-start animate-slide-up">
            <div className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-1.5 text-sm font-medium w-fit mx-auto lg:mx-0 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              {language === "en" ? "Pilot Phase 01 Started" : "بدء المرحلة التجريبية 01"}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
              {t("hero.headline")}
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              {t("hero.subheadline")}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Link to="/auth" className="w-full sm:w-auto">
                <Button size="lg" className="w-full gap-2 text-md h-12">
                  {t("hero.cta1")}
                  <ArrowIcon className="w-4 h-4 rtl-flip" />
                </Button>
              </Link>
              <a href="#pilot" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full h-12">
                  {t("hero.cta2")}
                </Button>
              </a>
            </div>
          </div>

          <div className="relative animate-fade-in mx-auto w-full max-w-lg lg:max-w-none">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden glass border shadow-2xl relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent z-10" />
              <img 
                src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2672&auto=format&fit=crop" 
                alt="Solar Panels in Desert" 
                className="object-cover w-full h-full"
              />
            </div>
            {/* Floating stat card */}
            <div className={`absolute -bottom-6 ${language === 'ar' ? '-right-6' : '-left-6'} p-4 bg-background rounded-xl border shadow-xl flex items-center gap-4 z-20`}>
              <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
                100
              </div>
              <div>
                <p className="font-bold text-foreground">
                  {language === 'en' ? 'Trainees Enrolled' : 'متدرب مسجل'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {language === 'en' ? 'Across 2 States' : 'في ولايتين'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
