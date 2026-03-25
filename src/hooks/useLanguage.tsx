import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "ar";

type Translations = Record<string, Record<Language, string>>;

const translations: Translations = {
  // Navigation
  "nav.overview": { en: "Overview", ar: "نظرة عامة" },
  "nav.model": { en: "Training Model", ar: "نموذج التدريب" },
  "nav.locations": { en: "Locations", ar: "مواقع التنفيذ" },
  "nav.eligibility": { en: "Eligibility", ar: "شروط التقديم" },
  "nav.faq": { en: "FAQ", ar: "الأسئلة الشائعة" },
  "nav.login": { en: "Student Login", ar: "دخول المتدربين" },
  "nav.apply": { en: "Apply Now", ar: "قدم الآن" },

  // Hero
  "hero.headline": { 
    en: "Professional Solar PV Technical Training Program", 
    ar: "البرنامج التقني الاحترافي للتدريب على الطاقة الشمسية الكهروضوئية" 
  },
  "hero.subheadline": { 
    en: "A comprehensive 5-month vocational training program designed to build technical capacity in solar energy. Currently delivering in Kassala and White Nile states in partnership with regional TVET institutions.", 
    ar: "برنامج تدريب مهني مكثف مدته 5 أشهر، مصمم لبناء القدرات الفنية في مجال الطاقة الشمسية. يُنفذ حالياً في ولايتي كسلا والنيل الأبيض بالشراكة مع مؤسسات التعليم التقني والتدريب المهني الإقليمية." 
  },

  // Overview
  "overview.title": { en: "Advancing Technical Capacity in Renewable Energy", ar: "تطوير القدرات الفنية في قطاع الطاقة المتجددة" },
  "overview.body": { 
    en: "Radiance operates an intensive, 5-month technical training program focused on Solar Photovoltaic (PV) systems. Delivered directly within established TVET partner institutions, the program equips participants with immediate, deployable skills in solar installation, design, and operations. Our current implementation cycle is taking place in Kassala and White Nile states, targeting a cohort of 50 trainees per location.", 
    ar: 'تدير "راديانس" برنامجاً تدريبياً تقنياً مكثفاً يمتد لـ 5 أشهر يركز على أنظمة الطاقة الشمسية الكهروضوئية (PV). يتم تقديم البرنامج مباشرة داخل مؤسسات التعليم التقني والتدريب المهني (TVET) الشريكة، ويزود المشاركين بمهارات عملية وفورية في التركيب والتصميم والتشغيل. تُعقد دورة التنفيذ الحالية في ولايتي كسلا والنيل الأبيض، وتستهدف 50 متدرباً في كل ولاية.' 
  },

  // Training Model
  "model.title": { en: "Hands-On Methodology", ar: "منهجية التدريب العملي" },
  "model.body": { en: "The curriculum is structured around a strict 70% practical and 30% theoretical split to ensure functional competency over base memorization.", ar: "صُمم المنهج الدراسي بنسبة دقيقة ومدروسة تبلغ 70% للجانب العملي و30% للجانب النظري، لضمان الكفاءة الوظيفية الفعلية بدلاً من الحفظ النظري." },
  "model.p1.title": { en: "Pillar 1: Theoretical Training", ar: "الركيزة الأولى: التدريب النظري" },
  "model.p1.desc": { en: "In-classroom foundational instruction covering electrical safety, physics of solar energy, and component specifications.", ar: "توجيه تأسيسي داخل الفصول الدراسية يغطي السلامة الكهربائية، وفيزياء الطاقة الشمسية، ومواصفات المكونات." },
  "model.p2.title": { en: "Pillar 2: Blended Practical Training", ar: "الركيزة الثانية: التدريب العملي المدمج" },
  "model.p2.desc": { en: "Supervised workshop activities and hands-on installation practice inside TVET partner facilities.", ar: "أنشطة ورش عمل خاضعة للإشراف وممارسة فعلية للتركيب داخل مرافق مؤسسات التعليم التقني الشريكة." },
  "model.p3.title": { en: "Pillar 3: Real Capstone Project", ar: "الركيزة الثالثة: مشروع التخرج التطبيقي" },
  "model.p3.desc": { en: "A final, comprehensive assessment where trainees design, install, and commission a functional PV system.", ar: "تقييم نهائي وشامل يقوم فيه المتدربون بتصميم وتركيب وتشغيل نظام طاقة شمسية حقيقي." },

  // What You Will Learn
  "learn.title": { en: "Core Technical Themes", ar: "المحاور الفنية الأساسية" },
  "learn.body": { en: "Trainees will gain rigorous exposure to the complete solar PV lifecycle:", ar: "سيحصل المتدربون على احتكاك مباشر وصارم بكامل دورة حياة أنظمة الطاقة الشمسية:" },
  "learn.1": { en: "Electrical Fundamentals & Safety Standards", ar: "أساسيات الكهرباء ومعايير السلامة" },
  "learn.2": { en: "PV Components and System Architecture", ar: "مكونات الطاقة الشمسية الكهروضوئية وبنية الأنظمة" },
  "learn.3": { en: "System Sizing and Design Rules", ar: "أحجام الأنظمة وقواعد التصميم" },
  "learn.4": { en: "Wiring, Protections, and Diagnostics", ar: "التمديدات الكهربائية، وسُبل الحماية، وتشخيص الأعطال" },
  "learn.5": { en: "Installation Practice and Commissioning", ar: "ممارسة التركيب والتشغيل" },
  "learn.6": { en: "Ongoing Operations & Maintenance (O&M)", ar: "العمليات المستمرة والصيانة (O&M)" },
  "learn.7": { en: "Business Exposure and Entrepreneurship Basics", ar: "أسس التعرض لبيئة الأعمال والريادة" },

  // Locations
  "locations.title": { en: "Active Training Sites", ar: "مواقع التدريب النشطة" },
  "locations.body": { en: "The program is currently being delivered through strategic institutional partnerships in two states. Training takes place directly within partner facilities to strengthen local infrastructure.", ar: "يُقدم البرنامج حالياً من خلال شراكات مؤسسية استراتيجية في ولايتين. يُعقد التدريب مباشرة داخل مرافق الشركاء لتعزيز البنية التحتية المحلية." },
  "locations.kassala.title": { en: "Kassala State", ar: "ولاية كسلا" },
  "locations.kassala.desc": { en: "Delivered in partnership with the Kassala State TVET Council.", ar: "يُنفذ بالشراكة مع مجلس التعليم التقني والتدريب المهني بولاية كسلا." },
  "locations.kosti.title": { en: "White Nile State (Kosti)", ar: "ولاية النيل الأبيض (كوستي)" },
  "locations.kosti.desc": { en: "Delivered in partnership with the White Nile State TVET Council.", ar: "يُنفذ بالشراكة مع مجلس التعليم التقني والتدريب المهني بولاية النيل الأبيض." },

  // Eligibility
  "eligibility.title": { en: "Call for Applications: Eligibility Criteria", ar: "دعوة للتقديم: شروط القبول" },
  "eligibility.body": { en: "We are currently accepting applications for our upcoming cohorts. Ideal candidates must meet the following baseline requirements:", ar: "نستقبل حالياً طلبات الالتحاق بالدفعات القادمة. يجب أن يستوفي المرشحون المتطلبات الأساسية التالية:" },
  "eligibility.age.title": { en: "Age Requirement", ar: "العمر" },
  "eligibility.age.desc": { en: "[Age Range, e.g., 18-35 years old]", ar: "[النطاق العمري، مثلاً: 18-35 عاماً]" },
  "eligibility.location.title": { en: "Location", ar: "الموقع الجغرافي" },
  "eligibility.location.desc": { en: "Must be a resident of [Eligible Localities]", ar: "يجب أن يكون من سكان [المحليات المؤهلة]" },
  "eligibility.education.title": { en: "Education", ar: "التعليم" },
  "eligibility.education.desc": { en: "[Minimum Education Requirement]", ar: "[الحد الأدنى للتعليم]" },
  "eligibility.commitment.title": { en: "Commitment", ar: "الالتزام" },
  "eligibility.commitment.desc": { en: "Ability to commit to a full-time, 5-month intensive schedule.", ar: "القدرة على التفرغ التام لجدول تدريبي مكثف لمدة 5 أشهر." },

  // How to Apply
  "apply.title": { en: "Application Process", ar: "خطوات التقديم" },
  "apply.body": { en: "All applications are processed digitally.", ar: "تتم معالجة جميع الطلبات إلكترونياً." },
  "apply.step1": { en: "1. Prepare your [Required Documents].", ar: "1. جهّز [المستندات المطلوبة]." },
  "apply.step2": { en: "2. Complete the initial registration via our [Google Form URL].", ar: "2. أكمل التسجيل المبدئي عبر [رابط استمارة التطبيق]." },
  "apply.step3": { en: "3. Shortlisted candidates will be contacted for [how selection works].", ar: "3. سيتم التواصل مع المرشحين المؤهلين لإجراء [آلية الفرز]." },
  "apply.deadline": { en: "Deadline to Apply: [Application Deadline]", ar: "آخر موعد للتقديم: [تاريخ إغلاق باب التقديم]" },

  // Outcomes
  "outcomes.title": { en: "What to Expect Upon Completion", ar: "ما يمكن توقعه عند الإتمام" },
  "outcomes.body": { 
    en: "Participants who successfully complete all theoretical requirements, fulfill the 70% practical hours, and pass the capstone assessment will possess the core competencies to enter the renewable energy sector. Graduates receive a formal certificate of completion in Solar PV Technology, acknowledging their readiness for installation and maintenance roles.", 
    ar: "المشاركون الذين يجتازون كافة المتطلبات النظرية، ويستوفون الساعات العملية (70%)، وينجحون في مشروع التخرج، سيمتلكون الكفاءات الأساسية لدخول قطاع الطاقة المتجددة. يحصل الخريجون على شهادة إتمام رسمية في تكنولوجيا الطاقة الشمسية الكهروضوئية، كإقرار بجهوزيتهم لشغل أدوار التركيب والصيانة." 
  },

  // FAQ
  "faq.title": { en: "Frequently Asked Questions", ar: "الأسئلة الشائعة" },
  "faq.q1": { en: "Is this program free?", ar: "هل هذا البرنامج مجاني؟" },
  "faq.a1": { en: "[Answer regarding program cost/subsidy]", ar: "[إجابة توضح تكلفة البرنامج أو كونه ممولاً]" },
  "faq.q2": { en: "Where is the program delivered?", ar: "أين يُعقد البرنامج التدريبي؟" },
  "faq.a2": { en: "Training takes place at partner TVET locations in Kassala and Kosti. Radiance does not operate separate standalone campuses.", ar: "يتم التدريب في مواقع مؤسسات التعليم التقني التابعة لشركائنا في كسلا وكوستي. لا تدير 'راديانس' مراكز تدريب مستقلة أو منعزلة." },
  "faq.q3": { en: "What is the difference between 'Apply Now' and 'Student Login'?", ar: "ما الفرق بين 'قدم الآن' و 'دخول المتدربين'؟" },
  "faq.a3": { en: "'Apply Now' is for new applicants seeking to join the upcoming cohort. 'Student Login' is strictly for trainees who have already been accepted and need access to the online learning materials.", ar: "زر 'قدم الآن' مُخصص للمتقدمين الجدد الراغبين في الانضمام للدفعة القادمة. أما 'دخول المتدربين' فهو مخصص حصرياً للمتدربين الذين تم قبولهم بالفعل ويحتاجون للوصول إلى المواد التعليمية عبر الإنترنت." },
  "faq.q4": { en: "Do I need prior electrical experience?", ar: "هل أحتاج إلى خبرة سابقة في مجال الكهرباء؟" },
  "faq.a4": { en: "[Answer regarding previous experience requirements]", ar: "[إجابة توضح متطلبات الخبرة السابقة]" },
  "faq.q5": { en: "Can people outside Kassala and White Nile apply?", ar: "هل يمكن للأفراد من خارج كسلا والنيل الأبيض التقديم؟" },
  "faq.a5": { en: "Currently, applications are restricted to residents of our active implementation states.", ar: "تقتصر طلبات التقديم حالياً على المقيمين في الولايات التي ننفذ فيها البرنامج بفعالية." },

  // Final CTA
  "final.title": { en: "Ready to begin your technical training?", ar: "هل أنت مستعد للبدء في مسارك التدريبي التقني؟" },
  "final.subtitle": { en: "Review the eligibility criteria and submit your application before [Application Deadline].", ar: "راجع شروط القبول وقدم طلبك قبل [تاريخ إغلاق الدفعة]." },
  "final.login": { en: "Already enrolled? Go to Student Login.", ar: "مسجل بالفعل؟ اذهب إلى دخول المتدربين." }
};

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

// Ignore warning line since we are using Fast Refresh context without explicit separate file for types/constants
// eslint-disable-next-line react-refresh/only-export-components
export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("ar");

  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
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

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
