import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export function WhatYouWillLearn() {
  const { t } = useLanguage();

  const themes = [
    "learn.1",
    "learn.2",
    "learn.3",
    "learn.4",
    "learn.5",
    "learn.6",
    "learn.7",
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("learn.title")}</h2>
            <div className="h-1.5 w-16 bg-primary mb-6 rounded-full" />
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {t("learn.body")}
            </p>
            
            <ul className="space-y-4">
              {themes.map((key) => (
                <li key={key} className="flex items-start gap-4 p-4 rounded-xl border bg-muted/20 hover:bg-muted/50 transition-colors">
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                  <span className="font-medium text-foreground">{t(key)}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="relative animate-fade-in hidden md:block aspect-[3/4] rounded-2xl overflow-hidden glass border shadow-xl">
             <img 
               src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=60" 
               alt="Solar Technical Training" 
               className="object-cover w-full h-full"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
          </div>

        </div>
      </div>
    </section>
  );
}
