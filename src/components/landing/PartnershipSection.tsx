import { useLanguage } from "@/hooks/useLanguage";

export function PartnershipSection() {
  const { t } = useLanguage();

  return (
    <section id="partners" className="py-24 bg-background border-t">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("partners.title")}</h2>
          <div className="h-1.5 w-20 bg-primary mx-auto rounded-full" />
        </div>

        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-70">
          {/* ILO / Anchor Donor Placeholder */}
          <div className="flex flex-col items-center gap-3 grayscale hover:grayscale-0 transition-all duration-300">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-sm font-bold text-center p-2 border shadow-sm">
              Anchor<br />Donor
            </div>
          </div>
          
          {/* Kassala TVET */}
          <div className="flex flex-col items-center gap-3 grayscale hover:grayscale-0 transition-all duration-300">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-sm font-bold text-center p-2 border shadow-sm">
              Kassala<br />TVET
            </div>
          </div>
          
          {/* White Nile TVET */}
          <div className="flex flex-col items-center gap-3 grayscale hover:grayscale-0 transition-all duration-300">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-sm font-bold text-center p-2 border shadow-sm">
              White Nile<br />TVET
            </div>
          </div>

          {/* Radiance Co. LTD */}
          <div className="flex flex-col items-center gap-3 grayscale hover:grayscale-0 transition-all duration-300">
            <div className="w-32 h-16 bg-muted flex items-center justify-center text-muted-foreground text-sm font-bold border shadow-sm rounded">
              Radiance Co.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
