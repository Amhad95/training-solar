// Application constants - Arabic LMS for Solar PV Training

export const APP_NAME = "نافذة المتدرب";
export const APP_SHORT_NAME = "نافذة المتدرب";

// User Roles
export const USER_ROLES = {
  SYSTEM_ADMIN: 'system_admin',
  PROGRAM_MANAGER: 'program_manager',
  COURSE_MANAGER: 'course_manager',
  LEAD_INSTRUCTOR: 'lead_instructor',
  ASSISTANT_INSTRUCTOR: 'assistant_instructor',
  EXAMINER: 'examiner',
  ME_OFFICER: 'me_officer',
  ADMIN_FINANCE: 'admin_finance',
  STUDENT: 'student',
  EXTERNAL_VIEWER: 'external_viewer',
} as const;

export const USER_ROLE_LABELS: Record<string, string> = {
  [USER_ROLES.SYSTEM_ADMIN]: 'مدير النظام',
  [USER_ROLES.PROGRAM_MANAGER]: 'مدير البرنامج',
  [USER_ROLES.COURSE_MANAGER]: 'منسق المقرر',
  [USER_ROLES.LEAD_INSTRUCTOR]: 'مدرب رئيسي',
  [USER_ROLES.ASSISTANT_INSTRUCTOR]: 'مدرب مساعد',
  [USER_ROLES.EXAMINER]: 'ممتحن نهائي',
  [USER_ROLES.ME_OFFICER]: 'مسؤول المتابعة والتقييم',
  [USER_ROLES.ADMIN_FINANCE]: 'مسؤول مالي وإداري',
  [USER_ROLES.STUDENT]: 'متدرب',
  [USER_ROLES.EXTERNAL_VIEWER]: 'مشاهد خارجي',
};

// Attendance statuses
export const ATTENDANCE_STATUS = {
  PRESENT: 'present',
  LATE: 'late',
  EXCUSED: 'excused',
  ABSENT: 'absent',
} as const;

export const ATTENDANCE_STATUS_LABELS: Record<string, string> = {
  [ATTENDANCE_STATUS.PRESENT]: 'حاضر',
  [ATTENDANCE_STATUS.LATE]: 'متأخر',
  [ATTENDANCE_STATUS.EXCUSED]: 'غائب بعذر',
  [ATTENDANCE_STATUS.ABSENT]: 'غائب بدون عذر',
};

// Assessment types
export const ASSESSMENT_TYPES = {
  QUIZ: 'quiz',
  ASSIGNMENT: 'assignment',
  PRACTICAL: 'practical',
  CAPSTONE: 'capstone',
} as const;

export const ASSESSMENT_TYPE_LABELS: Record<string, string> = {
  [ASSESSMENT_TYPES.QUIZ]: 'اختبار قصير',
  [ASSESSMENT_TYPES.ASSIGNMENT]: 'واجب نظري',
  [ASSESSMENT_TYPES.PRACTICAL]: 'مهمة عملية',
  [ASSESSMENT_TYPES.CAPSTONE]: 'تقييم نهائي عملي',
};

// Education levels
export const EDUCATION_LEVELS = [
  { value: 'primary', label: 'ابتدائي' },
  { value: 'intermediate', label: 'متوسط' },
  { value: 'secondary', label: 'ثانوي' },
  { value: 'diploma', label: 'دبلوم' },
  { value: 'bachelor', label: 'بكالوريوس' },
  { value: 'master', label: 'ماجستير' },
  { value: 'doctorate', label: 'دكتوراه' },
];

// Sudan states
export const SUDAN_STATES = [
  'الخرطوم',
  'الجزيرة',
  'القضارف',
  'كسلا',
  'نهر النيل',
  'الشمالية',
  'البحر الأحمر',
  'سنار',
  'النيل الأبيض',
  'النيل الأزرق',
  'جنوب كردفان',
  'شمال كردفان',
  'غرب كردفان',
  'جنوب دارفور',
  'شمال دارفور',
  'غرب دارفور',
  'شرق دارفور',
  'وسط دارفور',
];

// Default courses/modules for the pilot
export const DEFAULT_MODULES = [
  { code: 'M-00A', name: 'التهيئة والمهارات الرقمية', type: 'preparatory' },
  { code: 'M-00B', name: 'السلامة ومدونة السلوك', type: 'preparatory' },
  { code: 'M-01', name: 'أساسيات الكهرباء', type: 'core' },
  { code: 'M-02', name: 'أساسيات الطاقة الشمسية الكهروضوئية', type: 'core' },
  { code: 'M-03', name: 'التركيب والسلامة المهنية', type: 'core' },
  { code: 'M-04', name: 'تصميم النظام وتقييم الموقع', type: 'core' },
  { code: 'M-05', name: 'الفحص والتشغيل والاختبار', type: 'core' },
  { code: 'M-06', name: 'التشغيل والصيانة وريادة الأعمال', type: 'core' },
  { code: 'M-S', name: 'تقوية الرياضيات والكهرباء', type: 'support' },
  { code: 'M-CAP', name: 'المشروع التطبيقي النهائي والتقييم النهائي', type: 'capstone' },
  { code: 'M-EMP', name: 'التوظيف والمسار المهني', type: 'career' },
];

// Navigation items by role
export const NAVIGATION_ITEMS = {
  student: [
    { path: '/dashboard', label: 'لوحة المتدرب', icon: 'LayoutDashboard' },
    { path: '/courses', label: 'المقررات', icon: 'BookOpen' },
    { path: '/assignments', label: 'المهام', icon: 'ClipboardList' },
    { path: '/grades', label: 'الدرجات', icon: 'GraduationCap' },
    { path: '/attendance', label: 'الحضور', icon: 'CalendarCheck' },
    { path: '/competencies', label: 'الكفايات', icon: 'Award' },
    { path: '/resources', label: 'المواد', icon: 'FolderOpen' },
    { path: '/help', label: 'طلب مساعدة', icon: 'HelpCircle' },
  ],
  instructor: [
    { path: '/dashboard', label: 'لوحة التحكم', icon: 'LayoutDashboard' },
    { path: '/courses', label: 'المقررات', icon: 'BookOpen' },
    { path: '/students', label: 'المتدربون', icon: 'Users' },
    { path: '/attendance', label: 'الحضور', icon: 'CalendarCheck' },
    { path: '/assessments', label: 'التقييمات', icon: 'ClipboardList' },
    { path: '/gradebook', label: 'سجل الدرجات', icon: 'GraduationCap' },
    { path: '/competencies', label: 'الكفايات', icon: 'Award' },
    { path: '/question-bank', label: 'بنك الأسئلة', icon: 'FileQuestion' },
  ],
  manager: [
    { path: '/dashboard', label: 'لوحة التحكم', icon: 'LayoutDashboard' },
    { path: '/cohorts', label: 'الدفعات', icon: 'Users' },
    { path: '/courses', label: 'المقررات', icon: 'BookOpen' },
    { path: '/certificates', label: 'الشهادات', icon: 'Award' },
    { path: '/reports', label: 'التقارير', icon: 'BarChart3' },
    { path: '/surveys', label: 'الاستبيانات', icon: 'ClipboardCheck' },
    { path: '/audit', label: 'سجل التدقيق', icon: 'Shield' },
    { path: '/settings', label: 'الإعدادات', icon: 'Settings' },
  ],
};

// Certificate number format
export const CERTIFICATE_PREFIX = 'SLPV';

// Default configuration values
export const DEFAULT_CONFIG = {
  attendanceThreshold: 90,
  passThreshold: 60,
  modulePassThreshold: 50,
  retakeLimit: 2,
  quizWeight: 15,
  assignmentWeight: 25,
  practicalWeight: 30,
  capstoneWeight: 30,
};

// Week labels
export const WEEK_PHASES = {
  before: 'قبل الحصة',
  during: 'أثناء الحصة',
  after: 'بعد الحصة',
};
