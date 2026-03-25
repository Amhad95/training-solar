import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

export function LandingHero() {
  const { t, language } = useLanguage();
  const ArrowIcon = language === "ar" ? ArrowLeft : ArrowRight;

  return (
    <section className="relative overflow-hidden bg-background pt-16 pb-32">
      <div className="absolute inset-0 z-0 bg-muted/20" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6 text-center lg:text-start animate-slide-up">
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
              {t("hero.headline")}
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              {t("hero.subheadline")}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <a href="[Google Form URL]" target="_blank" rel="noreferrer" className="w-full sm:w-auto">
                <Button size="lg" className="w-full gap-2 text-md h-12">
                  {t("nav.apply")}
                  <ArrowIcon className="w-4 h-4 rtl-flip" />
                </Button>
              </a>
              <Link to="/auth" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full h-12 border-primary/20 hover:bg-primary/5">
                  {t("nav.login")}
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative animate-fade-in mx-auto w-full max-w-lg lg:max-w-none">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border shadow-2xl relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent z-10" />
              <img 
                src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2672&auto=format&fit=crop" 
                alt="Solar Panels Installation" 
                className="object-cover w-full h-full"
              />
            </div>

            {/* Floating Info card */}
            <div className={`absolute -bottom-6 ${language === 'ar' ? '-right-6' : '-left-6'} p-4 bg-background rounded-xl border shadow-xl flex items-center gap-4 z-20`}>
              <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
                5m
              </div>
              <div className="text-start">
                <p className="font-bold text-foreground">
                  {language === 'en' ? 'Intensive Program' : 'برنامج مكثف'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {language === 'en' ? 'Full-time commitment' : 'تفرغ تام'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
