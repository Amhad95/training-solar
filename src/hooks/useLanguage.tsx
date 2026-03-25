import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "ar";

type Translations = Record<string, Record<Language, string>>;

const translations: Translations = {
  // Navigation
  "nav.home": { en: "Home", ar: "الرئيسية" },
  "nav.about": { en: "About the Pilot", ar: "عن المشروع التجريبي" },
  "nav.program": { en: "Training Program", ar: "البرنامج التدريبي" },
  "nav.partners": { en: "Partners", ar: "الشركاء" },
  "nav.contact": { en: "Contact", ar: "اتصل بنا" },
  "nav.login": { en: "Student Login", ar: "دخول المتدربين" },
  // Hero
  "hero.headline": { 
    en: "Powering the Future of Sudan through Solar Excellence.", 
    ar: "تمكين مستقبل السودان عبر التميز في الطاقة الشمسية" 
  },
  "hero.subheadline": { 
    en: "Empowering 100 youth in Kassala and White Nile states with world-class Solar PV technical training and entrepreneurial mentorship.", 
    ar: "تمكين 100 شاب وشابة في ولايتي كسلا والنيل الأبيض عبر تدريب تقني عالمي المستوى في أنظمة الطاقة الشمسية وتوجيه ريادي متكامل." 
  },
  "hero.cta1": { en: "Access Training Platform", ar: "الدخول إلى منصة التدريب" },
  "hero.cta2": { en: "Learn About the Pilot", ar: "تعرف على المشروع التجريبي" },
  // Pilot Section
  "pilot.title": { en: "Expanding Our Reach: The Two-State Pilot", ar: "توسيع نطاقنا: المشروع التجريبي في ولايتين" },
  "pilot.kassala.title": { en: "Kassala State (Kassala)", ar: "ولاية كسلا (كسلا)" },
  "pilot.kassala.desc": { en: "Implementing advanced vocational training for 50 trainees in partnership with the Kassala TVET Council.", ar: "تنفيذ تدريب مهني متقدم لـ 50 متدرباً بالشراكة مع مجلس التعليم التقني والتدريب المهني بولاية كسلا." },
  "pilot.kosti.title": { en: "White Nile State (Kosti)", ar: "ولاية النيل الأبيض (كوستي)" },
  "pilot.kosti.desc": { en: "Establishing a center of excellence for 50 trainees in Kosti, focusing on climate-smart agricultural energy solutions.", ar: "إنشاء مركز تميز لـ 50 متدرباً في كوستي، مع التركيز على حلول الطاقة للزراعة الذكية مناخياً." },
  // Objectives
  "obj.title": { en: "Strategic Objectives & Impact", ar: "الأهداف الاستراتيجية والأثر" },
  "obj.1.title": { en: "Vocational Excellence", ar: "التميز المهني" },
  "obj.1.desc": { en: "Bridging the skills gap in the renewable energy sector.", ar: "سد فجوة المهارات في قطاع الطاقة المتجددة." },
  "obj.2.title": { en: "Economic Resilience", ar: "المرونة الاقتصادية" },
  "obj.2.desc": { en: "Supporting 100 households through sustainable livelihood creation.", ar: "دعم 100 أسرة من خلال خلق سبل عيش مستدامة." },
  "obj.3.title": { en: "Climate Action", ar: "العمل المناخي" },
  "obj.3.desc": { en: "Promoting solar water pumping and off-grid solutions for food security.", ar: "تعزيز ضخ المياه بالطاقة الشمسية والحلول غير المرتبطة بالشبكة للأمن الغذائي." },
  "obj.4.title": { en: "Institutional Growth", ar: "النمو المؤسسي" },
  "obj.4.desc": { en: "Capacity building for local TVET instructors through specialized ToT programs.", ar: "بناء قدرات مدربي التعليم التقني المحليين من خلال برامج تدريب المدربين المتخصصة." },
  // Journey
  "journey.title": { en: "The Training Journey", ar: "رحلة التدريب" },
  "journey.phase1.title": { en: "Phase 1: Technical Mastery (5 Months)", ar: "المرحلة الأولى: الإتقان التقني (5 أشهر)" },
  "journey.phase1.desc": { en: "Intensive hands-on training on Solar PV installation, maintenance, and system design.", ar: "تدريب عملي مكثف على تركيب وصيانة وتصميم أنظمة الطاقة الشمسية الكهروضوئية." },
  "journey.phase2.title": { en: "Phase 2: Training of Trainers (15 Days)", ar: "المرحلة الثانية: تدريب المدربين (15 يوماً)" },
  "journey.phase2.desc": { en: "Upgrading the pedagogical and technical skills of state TVET instructors to ensure sustainability.", ar: "رفع المهارات التربوية والتقنية لمدربي التعليم التقني بالولاية لضمان الاستدامة." },
  "journey.phase3.title": { en: "Phase 3: Mentorship & Incubation (6 Months)", ar: "المرحلة الثالثة: التوجيه والاحتضان (6 أشهر)" },
  "journey.phase3.desc": { en: "Business development support to transition trainees from students to solar entrepreneurs.", ar: "دعم تطوير الأعمال لنقل المتدربين من مرحلة الدراسة إلى ريادة الأعمال في مجال الطاقة الشمسية." },
  // Partners
  "partners.title": { en: "Institutional Partners", ar: "الشركاء المؤسسيون" },
  // Footer
  "footer.about.title": { en: "About Radiance Co. LTD", ar: "عن شركة راديانس المحدودة" },
  "footer.about.desc": { en: "A leader in sustainable energy consulting and vocational capacity building in Sudan.", ar: "رائدة في استشارات الطاقة المستدامة وبناء القدرات المهنية في السودان." },
  "footer.contact": { en: "Contact", ar: "اتصال" },
  "footer.quicklinks": { en: "Quick Links", ar: "روابط سريعة" },
  "footer.links.login": { en: "LMS Login", ar: "دخول المنصة" },
  "footer.links.docs": { en: "Program Docs", ar: "وثائق البرنامج" },
  "footer.links.privacy": { en: "Privacy Policy", ar: "سياسة الخصوصية" },
};

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("ar");

  useEffect(() => {
    // Set HTML dir attribute
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    // Optionally update font families based on lang. Arabic uses Tajawal, EN can use default Sans.
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ar" : "en"));
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
