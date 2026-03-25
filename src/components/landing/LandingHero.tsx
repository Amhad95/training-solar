import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

export function LandingHero() {
  const { t, language } = useLanguage();
  const ArrowIcon = language === "ar" ? ArrowLeft : ArrowRight;

  return (
    <section className="relative flex min-h-[72vh] items-start overflow-hidden bg-background pt-10 pb-8 md:min-h-[85vh] md:pt-32 md:pb-48">
      
      {/* Background Layer: The Artwork with Cloud-like Diffusion Fade */}
      <div className="absolute inset-0 z-0 flex items-end justify-center pointer-events-none select-none overflow-hidden">
        
        {/* Core Artwork — Mobile: raised up to sit behind content */}
        <div 
          className="absolute bottom-[5%] left-1/2 h-[130%] w-[160%] -translate-x-1/2 opacity-95 md:hidden"
          style={{
            backgroundImage: `url('/hero-artwork.png')`,
            backgroundPosition: 'bottom center',
            backgroundSize: 'contain', 
            backgroundRepeat: 'no-repeat',
          }}
        />
        {/* Mobile-only top diffusion: large soft fade to erase the image's top edge */}
        <div className="absolute inset-x-0 top-[5%] h-[50%] bg-gradient-to-b from-background via-background/80 via-40% to-transparent md:hidden z-[1]" />

        {/* Core Artwork — Desktop: cover */}
        <div 
          className="absolute -bottom-8 w-full h-[120%] opacity-95 hidden md:block"
          style={{
            backgroundImage: `url('/hero-artwork.png')`,
            backgroundPosition: 'bottom center',
            backgroundSize: 'cover', 
            backgroundRepeat: 'no-repeat',
            WebkitMaskImage: 'radial-gradient(ellipse 100% 70% at center bottom, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)',
            maskImage: 'radial-gradient(ellipse 100% 70% at center bottom, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)',
          }}
        />

        {/* Soft Linear Atmospheric Mist Layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/40 to-transparent h-[25%] md:h-[30%]" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/10 to-transparent h-1/4" />
        <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-background via-transparent to-transparent w-[10%] md:w-1/6" />
        <div className="absolute inset-y-0 right-0 bg-gradient-to-l from-background via-transparent to-transparent w-[10%] md:w-1/6" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-3xl flex flex-col gap-2 md:gap-6 text-center mx-auto animate-slide-up items-center">
          
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-tight drop-shadow-sm">
            {t("hero.headline")}
          </h1>
          
          <p className="text-base md:text-xl text-muted-foreground w-full font-medium">
            {t("hero.subheadline")}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-3 md:pt-6">
            <a href="[Google Form URL]" target="_blank" rel="noreferrer" className="w-full sm:w-auto">
              <Button size="lg" className="w-full gap-2 text-md h-14 px-8 shadow-lg shadow-primary/20">
                {t("nav.apply")}
                <ArrowIcon className="w-4 h-4 rtl-flip" />
              </Button>
            </a>
            <Link to="/auth" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full h-14 px-8 bg-background/80 backdrop-blur-md border border-primary/20 hover:bg-primary/5 hover:border-primary/40 shadow-sm transition-all">
                {t("nav.login")}
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
