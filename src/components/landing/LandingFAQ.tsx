import { useLanguage } from "@/hooks/useLanguage";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export function LandingFAQ() {
  const { t } = useLanguage();

  const faqs = [
    { q: "faq.q1", a: "faq.a1" },
    { q: "faq.q2", a: "faq.a2" },
    { q: "faq.q3", a: "faq.a3" },
    { q: "faq.q4", a: "faq.a4" },
    { q: "faq.q5", a: "faq.a5" },
  ];

  return (
    <section id="faq" className="py-24 bg-muted/30 border-t">
      <div className="container max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("faq.title")}</h2>
          <div className="h-1.5 w-20 bg-primary mx-auto rounded-full" />
        </div>

        <Accordion type="single" collapsible className="w-full bg-background border rounded-2xl p-4 shadow-sm">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b last:border-0">
              <AccordionTrigger className="text-start font-bold text-base md:text-lg px-4 hover:no-underline hover:text-primary transition-colors">
                {t(faq.q)}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm md:text-base leading-relaxed px-4 pb-4">
                {t(faq.a)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
