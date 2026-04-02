import { Link } from "react-router-dom";
import { Menu, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import radianceLogo from "@/assets/radiance-logo.png";

export function LandingNavbar() {
  const { language, toggleLanguage, t } = useLanguage();

  const navLinks = [
    { href: "#overview", key: "nav.overview" },
    { href: "#model", key: "nav.model" },
    { href: "#locations", key: "nav.locations" },
    { href: "#eligibility", key: "nav.eligibility" },
    { href: "#faq", key: "nav.faq" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shadow-primary shrink-0">
            <Sun className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg hidden sm:inline-block">Radiance Co. LTD</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t(link.key)}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <Button variant="ghost" size="sm" onClick={toggleLanguage} className="gap-2 shrink-0">
            <Globe className="w-4 h-4" />
            <span className="hidden sm:inline-block">
              {language === "en" ? "عربي" : "English"}
            </span>
            <span className="sm:hidden">
              {language === "en" ? "AR" : "EN"}
            </span>
          </Button>

          {/* Secondary CTA */}
          <Link to="/auth" className="hidden sm:inline-block">
            <Button variant="outline" size="sm" className="shrink-0">{t("nav.login")}</Button>
          </Link>

          {/* Primary CTA */}
          <a href="[Google Form URL]" target="_blank" rel="noreferrer">
            <Button size="sm" className="shrink-0">{t("nav.apply")}</Button>
          </a>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden shrink-0">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side={language === "ar" ? "right" : "left"}>
              <div className="flex flex-col gap-6 pt-10">
                {navLinks.map((link) => (
                  <a
                    key={link.key}
                    href={link.href}
                    className="text-lg font-medium text-foreground"
                  >
                    {t(link.key)}
                  </a>
                ))}
                
                <div className="h-px bg-border my-2" />
                
                <a href="[Google Form URL]" target="_blank" rel="noreferrer">
                  <Button className="w-full">{t("nav.apply")}</Button>
                </a>
                
                <Link to="/auth" className="w-full">
                  <Button variant="outline" className="w-full">{t("nav.login")}</Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
