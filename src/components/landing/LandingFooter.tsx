import { useLanguage } from "@/hooks/useLanguage";
import { Mail, Phone, MapPin, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function LandingFooter() {
  const { t, language } = useLanguage();

  return (
    <footer id="contact" className="bg-primary pt-16 pb-8 text-primary-foreground">
      <div className="container">
        {/* Final CTA Block inside Footer Top */}
        <div className="bg-background rounded-3xl p-8 md:p-12 border shadow-sm text-center max-w-4xl mx-auto mb-20 -translate-y-12">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">{t("final.title")}</h3>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">{t("final.subtitle")}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="[Google Form URL]" target="_blank" rel="noreferrer">
              <Button size="lg" className="w-full sm:w-auto h-12 px-8">
                {t("nav.apply")}
              </Button>
            </a>
            <Link to="/auth" className="text-sm font-semibold text-primary hover:underline">
              {t("final.login")}
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0 text-primary">
                <Sun className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg text-white">Radiance Co. LTD</span>
            </div>
            <p className="text-primary-foreground/90 text-sm leading-relaxed max-w-xs">
              {language === "en" 
                ? "Vocational training and capacity building for Sudan's renewable energy sector."
                : "التدريب المهني وبناء القدرات لقطاع الطاقة المتجددة في السودان."}
            </p>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-lg text-white">{language === "en" ? "Contact" : "اتصال"}</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-primary-foreground/90">
                <Mail className="w-4 h-4 text-white" />
                <a href="mailto:info@radiance-sd.com" className="hover:text-white hover:underline transition-colors">
                  info@radiance-sd.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/90">
                <Phone className="w-4 h-4 text-white" />
                <span dir="ltr">+249 123 456 789</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/90">
                <MapPin className="w-4 h-4 text-white shrink-0" />
                <span>Khartoum, Sudan</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-lg text-white">{language === "en" ? "Quick Links" : "روابط سريعة"}</h4>
            <ul className="space-y-3 flex flex-col">
              <Link to="/auth" className="text-sm text-primary-foreground/90 hover:text-white hover:underline transition-colors w-fit">
                {t("nav.login")}
              </Link>
              <a href="#faq" className="text-sm text-primary-foreground/90 hover:text-white hover:underline transition-colors w-fit">
                {t("nav.faq")}
              </a>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-primary-foreground/20 text-center flex flex-col justify-center items-center gap-4">
          <p className="text-xs text-primary-foreground/80">
            &copy; {new Date().getFullYear()} Radiance Co. LTD. {language === "en" ? "All rights reserved." : "جميع الحقوق محفوظة."}
          </p>
        </div>
      </div>
    </footer>
  );
}
