import { useLanguage } from "@/hooks/useLanguage";
import { Mail, Phone, MapPin, Sun } from "lucide-react";
import { Link } from "react-router-dom";

export function LandingFooter() {
  const { t, language } = useLanguage();

  return (
    <footer id="contact" className="bg-muted pt-16 pb-8 border-t">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shadow-primary shrink-0 text-primary-foreground">
                <Sun className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg">Radiance Co. LTD</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              {t("footer.about.desc")}
            </p>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-lg">{t("footer.contact")}</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:info@radiance-sd.com" className="hover:text-primary transition-colors">
                  info@radiance-sd.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                <span dir="ltr">+249 123 456 789</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>Khartoum, Sudan</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-lg">{t("footer.quicklinks")}</h4>
            <ul className="space-y-3 flex flex-col">
              <Link to="/auth" className="text-sm text-muted-foreground hover:text-primary transition-colors w-fit">
                {t("footer.links.login")}
              </Link>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors w-fit">
                {t("footer.links.docs")}
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors w-fit">
                {t("footer.links.privacy")}
              </a>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-border/50 text-center flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Radiance Co. LTD. {language === "en" ? "All rights reserved." : "جميع الحقوق محفوظة."}
          </p>
        </div>
      </div>
    </footer>
  );
}
