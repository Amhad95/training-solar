-- =====================================================
-- نظام إدارة التعلم - قاعدة البيانات الأساسية
-- =====================================================

-- 1. الأنواع المخصصة (Enums)
-- =====================================================

-- أدوار المستخدمين
CREATE TYPE public.app_role AS ENUM (
  'system_admin',      -- مدير النظام
  'program_manager',   -- مدير البرنامج
  'course_manager',    -- منسق المقرر
  'lead_instructor',   -- مدرب رئيسي
  'assistant_instructor', -- مدرب مساعد
  'examiner',          -- ممتحن نهائي
  'me_officer',        -- مسؤول المتابعة والتقييم
  'admin_finance',     -- مسؤول مالي وإداري
  'student',           -- متدرب
  'external_viewer'    -- مشاهد خارجي
);

-- حالة الحضور
CREATE TYPE public.attendance_status AS ENUM (
  'present',           -- حاضر
  'late',              -- متأخر
  'excused',           -- غائب بعذر
  'absent'             -- غائب بدون عذر
);

-- أنواع التقييمات
CREATE TYPE public.assessment_type AS ENUM (
  'quiz',              -- اختبار قصير
  'assignment',        -- واجب نظري
  'practical_task',    -- مهمة عملية
  'capstone'           -- تقييم نهائي عملي
);

-- حالة التسليم
CREATE TYPE public.submission_status AS ENUM (
  'pending',           -- قيد الانتظار
  'submitted',         -- تم التسليم
  'graded',            -- تم التقييم
  'returned'           -- مُعاد للمراجعة
);

-- حالة الكفاية
CREATE TYPE public.competency_status AS ENUM (
  'not_started',       -- لم يبدأ
  'in_progress',       -- قيد التنفيذ
  'evidence_submitted', -- تم رفع الدليل
  'achieved',          -- تم التحقق
  'not_achieved'       -- لم يتحقق
);

-- حالة الشهادة
CREATE TYPE public.certificate_status AS ENUM (
  'pending',           -- قيد الانتظار
  'recommended',       -- موصى بها
  'approved',          -- معتمدة
  'issued',            -- صدرت
  'revoked'            -- ملغاة
);

-- أنواع الاستبيانات
CREATE TYPE public.survey_type AS ENUM (
  'baseline',          -- قبلي
  'endline',           -- بعدي
  'pulse',             -- شهري
  'trainer_feedback',  -- تقييم المدرب
  'employment_1m',     -- متابعة التوظيف - شهر
  'employment_3m'      -- متابعة التوظيف - 3 أشهر
);

-- حالة الدفعة
CREATE TYPE public.cohort_status AS ENUM (
  'planning',          -- تخطيط
  'active',            -- نشطة
  'completed',         -- مكتملة
  'archived'           -- مؤرشفة
);

-- المستوى التعليمي
CREATE TYPE public.education_level AS ENUM (
  'primary',           -- أساسي
  'secondary',         -- ثانوي
  'diploma',           -- دبلوم
  'bachelor',          -- بكالوريوس
  'master',            -- ماجستير
  'doctorate'          -- دكتوراه
);

-- =====================================================
-- 2. جداول المستخدمين والصلاحيات
-- =====================================================

-- الملفات الشخصية
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  national_id TEXT,
  phone TEXT,
  state TEXT,
  city TEXT,
  education_level public.education_level,
  referral_source TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- أدوار المستخدمين (جدول منفصل للأمان)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id),
  UNIQUE(user_id, role)
);

-- =====================================================
-- 3. الهيكل الأكاديمي
-- =====================================================

-- الدفعات
CREATE TABLE public.cohorts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  start_date DATE,
  end_date DATE,
  status public.cohort_status NOT NULL DEFAULT 'planning',
  attendance_threshold INTEGER NOT NULL DEFAULT 90,
  pass_threshold INTEGER NOT NULL DEFAULT 60,
  retake_limit INTEGER NOT NULL DEFAULT 2,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- المقررات
CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cohort_id UUID NOT NULL REFERENCES public.cohorts(id) ON DELETE CASCADE,
  code TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_prerequisite BOOLEAN DEFAULT false,
  is_support_track BOOLEAN DEFAULT false,
  theory_weight INTEGER DEFAULT 40,
  practical_weight INTEGER DEFAULT 60,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id),
  UNIQUE(cohort_id, code)
);

-- الوحدات
CREATE TABLE public.modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  code TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  duration_hours INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- الدروس/الأسابيع
CREATE TABLE public.lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID NOT NULL REFERENCES public.modules(id) ON DELETE CASCADE,
  week_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  objectives TEXT,
  pre_class_content TEXT,
  in_class_content TEXT,
  post_class_content TEXT,
  common_mistakes TEXT,
  required_tools TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- الموارد والملفات
CREATE TABLE public.resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
  module_id UUID REFERENCES public.modules(id) ON DELETE CASCADE,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  file_path TEXT,
  file_size INTEGER,
  file_type TEXT,
  is_downloadable BOOLEAN DEFAULT true,
  is_offline_available BOOLEAN DEFAULT false,
  version INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  uploaded_by UUID REFERENCES auth.users(id)
);

-- =====================================================
-- 4. التسجيل والمجموعات
-- =====================================================

-- التسجيل في الدفعات
CREATE TABLE public.enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  cohort_id UUID NOT NULL REFERENCES public.cohorts(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'active',
  created_by UUID REFERENCES auth.users(id),
  UNIQUE(user_id, cohort_id)
);

-- المجموعات الصفية
CREATE TABLE public.groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cohort_id UUID NOT NULL REFERENCES public.cohorts(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(cohort_id, name)
);

-- أعضاء المجموعات
CREATE TABLE public.group_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID NOT NULL REFERENCES public.groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(group_id, user_id)
);

-- =====================================================
-- 5. الحضور
-- =====================================================

-- جلسات الحضور
CREATE TABLE public.attendance_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID NOT NULL REFERENCES public.groups(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES public.lessons(id),
  session_date DATE NOT NULL,
  session_time TIME,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- سجلات الحضور
CREATE TABLE public.attendance_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES public.attendance_sessions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status public.attendance_status NOT NULL,
  notes TEXT,
  marked_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  marked_by UUID REFERENCES auth.users(id),
  UNIQUE(session_id, user_id)
);

-- =====================================================
-- 6. التقييمات والدرجات
-- =====================================================

-- التقييمات
CREATE TABLE public.assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  module_id UUID REFERENCES public.modules(id),
  title TEXT NOT NULL,
  description TEXT,
  type public.assessment_type NOT NULL,
  max_score INTEGER NOT NULL DEFAULT 100,
  passing_score INTEGER NOT NULL DEFAULT 60,
  weight INTEGER NOT NULL DEFAULT 10,
  time_limit_minutes INTEGER,
  attempt_limit INTEGER DEFAULT 1,
  is_randomized BOOLEAN DEFAULT false,
  opens_at TIMESTAMPTZ,
  closes_at TIMESTAMPTZ,
  requires_attendance_check BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- بنك الأسئلة
CREATE TABLE public.assessment_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id UUID REFERENCES public.assessments(id) ON DELETE CASCADE,
  module_id UUID REFERENCES public.modules(id),
  question_text TEXT NOT NULL,
  question_type TEXT NOT NULL DEFAULT 'multiple_choice',
  options JSONB,
  correct_answer JSONB,
  points INTEGER NOT NULL DEFAULT 1,
  tags TEXT[],
  difficulty TEXT DEFAULT 'medium',
  version INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- معايير التقييم (Rubrics)
CREATE TABLE public.rubrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id UUID NOT NULL REFERENCES public.assessments(id) ON DELETE CASCADE,
  criterion TEXT NOT NULL,
  description TEXT,
  max_points INTEGER NOT NULL,
  levels JSONB NOT NULL,
  is_safety_critical BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- تسليمات المتدربين
CREATE TABLE public.assessment_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id UUID NOT NULL REFERENCES public.assessments(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  attempt_number INTEGER NOT NULL DEFAULT 1,
  answers JSONB,
  file_paths TEXT[],
  status public.submission_status NOT NULL DEFAULT 'pending',
  submitted_at TIMESTAMPTZ,
  score INTEGER,
  feedback TEXT,
  graded_at TIMESTAMPTZ,
  graded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- الدرجات (سجل موحد)
CREATE TABLE public.grades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  assessment_id UUID REFERENCES public.assessments(id),
  submission_id UUID REFERENCES public.assessment_submissions(id),
  score INTEGER NOT NULL,
  max_score INTEGER NOT NULL,
  weight INTEGER NOT NULL DEFAULT 100,
  is_final BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  graded_by UUID REFERENCES auth.users(id)
);

-- =====================================================
-- 7. الكفايات
-- =====================================================

-- قائمة الكفايات
CREATE TABLE public.competencies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID NOT NULL REFERENCES public.modules(id) ON DELETE CASCADE,
  code TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  performance_criteria TEXT,
  evidence_required TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- أدلة الكفايات المرفوعة
CREATE TABLE public.competency_evidence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  competency_id UUID NOT NULL REFERENCES public.competencies(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  evidence_type TEXT NOT NULL,
  file_path TEXT,
  description TEXT,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  status public.competency_status NOT NULL DEFAULT 'evidence_submitted'
);

-- توقيعات المقيّمين
CREATE TABLE public.competency_signoffs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  evidence_id UUID NOT NULL REFERENCES public.competency_evidence(id) ON DELETE CASCADE,
  assessor_id UUID NOT NULL REFERENCES auth.users(id),
  status public.competency_status NOT NULL,
  feedback TEXT,
  signed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =====================================================
-- 8. الشهادات
-- =====================================================

-- الشهادات
CREATE TABLE public.certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  cohort_id UUID NOT NULL REFERENCES public.cohorts(id),
  certificate_number TEXT NOT NULL UNIQUE,
  verification_code TEXT NOT NULL UNIQUE,
  status public.certificate_status NOT NULL DEFAULT 'pending',
  issued_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  pdf_path TEXT,
  recommended_by UUID REFERENCES auth.users(id),
  recommended_at TIMESTAMPTZ,
  approved_by UUID REFERENCES auth.users(id),
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- سجل التحقق من الشهادات
CREATE TABLE public.certificate_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  certificate_id UUID NOT NULL REFERENCES public.certificates(id),
  verification_code TEXT NOT NULL,
  verified_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  ip_address TEXT,
  user_agent TEXT,
  result BOOLEAN NOT NULL
);

-- =====================================================
-- 9. الاستبيانات
-- =====================================================

-- الاستبيانات
CREATE TABLE public.surveys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cohort_id UUID REFERENCES public.cohorts(id),
  title TEXT NOT NULL,
  description TEXT,
  type public.survey_type NOT NULL,
  is_active BOOLEAN DEFAULT true,
  opens_at TIMESTAMPTZ,
  closes_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- أسئلة الاستبيانات
CREATE TABLE public.survey_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  survey_id UUID NOT NULL REFERENCES public.surveys(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  question_type TEXT NOT NULL DEFAULT 'text',
  options JSONB,
  is_required BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- إجابات الاستبيانات
CREATE TABLE public.survey_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  survey_id UUID NOT NULL REFERENCES public.surveys(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  answers JSONB NOT NULL,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  ip_address TEXT
);

-- =====================================================
-- 10. سجل التدقيق
-- =====================================================

CREATE TABLE public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  table_name TEXT NOT NULL,
  record_id UUID,
  old_value JSONB,
  new_value JSONB,
  reason TEXT,
  ip_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =====================================================
-- 11. إعدادات النظام
-- =====================================================

CREATE TABLE public.system_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id)
);

-- =====================================================
-- 12. الدوال المساعدة
-- =====================================================

-- دالة التحقق من الدور (آمنة من التكرار)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- دالة للتحقق من أي دور من قائمة
CREATE OR REPLACE FUNCTION public.has_any_role(_user_id UUID, _roles public.app_role[])
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = ANY(_roles)
  )
$$;

-- دالة إنشاء ملف شخصي عند التسجيل
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone, state, city, education_level, referral_source)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''),
    NEW.raw_user_meta_data ->> 'phone',
    NEW.raw_user_meta_data ->> 'state',
    NEW.raw_user_meta_data ->> 'city',
    (NEW.raw_user_meta_data ->> 'education_level')::public.education_level,
    NEW.raw_user_meta_data ->> 'referral_source'
  );
  
  -- إضافة دور المتدرب افتراضياً
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'student');
  
  RETURN NEW;
END;
$$;

-- تفعيل المشغل عند إنشاء مستخدم جديد
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- دالة تحديث updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- مشغلات تحديث التاريخ
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_cohorts_updated_at BEFORE UPDATE ON public.cohorts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON public.courses FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_modules_updated_at BEFORE UPDATE ON public.modules FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_lessons_updated_at BEFORE UPDATE ON public.lessons FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_resources_updated_at BEFORE UPDATE ON public.resources FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_assessments_updated_at BEFORE UPDATE ON public.assessments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_grades_updated_at BEFORE UPDATE ON public.grades FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- دالة حساب نسبة الحضور
CREATE OR REPLACE FUNCTION public.calculate_attendance_percentage(_user_id UUID, _course_id UUID)
RETURNS INTEGER
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    (
      SELECT ROUND(
        (COUNT(*) FILTER (WHERE ar.status IN ('present', 'late'))::NUMERIC / 
         NULLIF(COUNT(*)::NUMERIC, 0)) * 100
      )::INTEGER
      FROM public.attendance_records ar
      JOIN public.attendance_sessions ase ON ar.session_id = ase.id
      WHERE ar.user_id = _user_id
        AND ase.course_id = _course_id
    ),
    0
  )
$$;

-- دالة توليد رقم الشهادة
CREATE OR REPLACE FUNCTION public.generate_certificate_number(_cohort_id UUID)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  cohort_code TEXT;
  current_year TEXT;
  next_number INTEGER;
  cert_number TEXT;
BEGIN
  SELECT code INTO cohort_code FROM public.cohorts WHERE id = _cohort_id;
  current_year := EXTRACT(YEAR FROM CURRENT_DATE)::TEXT;
  
  SELECT COALESCE(MAX(
    SUBSTRING(certificate_number FROM '[0-9]+$')::INTEGER
  ), 0) + 1
  INTO next_number
  FROM public.certificates
  WHERE cohort_id = _cohort_id;
  
  cert_number := 'SLPV-' || current_year || '-' || cohort_code || '-' || LPAD(next_number::TEXT, 4, '0');
  
  RETURN cert_number;
END;
$$;

-- =====================================================
-- 13. تفعيل Row Level Security
-- =====================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cohorts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rubrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competency_evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competency_signoffs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificate_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.surveys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.survey_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.survey_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 14. سياسات RLS
-- =====================================================

-- الملفات الشخصية
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Staff can view all profiles" ON public.profiles FOR SELECT USING (
  public.has_any_role(auth.uid(), ARRAY['system_admin', 'program_manager', 'course_manager', 'lead_instructor', 'assistant_instructor', 'examiner', 'me_officer', 'admin_finance']::public.app_role[])
);

-- أدوار المستخدمين
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage roles" ON public.user_roles FOR ALL USING (
  public.has_any_role(auth.uid(), ARRAY['system_admin', 'program_manager']::public.app_role[])
);

-- الدفعات
CREATE POLICY "Anyone can view cohorts" ON public.cohorts FOR SELECT USING (true);
CREATE POLICY "Managers can manage cohorts" ON public.cohorts FOR ALL USING (
  public.has_any_role(auth.uid(), ARRAY['system_admin', 'program_manager']::public.app_role[])
);

-- المقررات
CREATE POLICY "Enrolled users can view courses" ON public.courses FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.enrollments e 
    WHERE e.user_id = auth.uid() AND e.cohort_id = courses.cohort_id
  ) OR public.has_any_role(auth.uid(), ARRAY['system_admin', 'program_manager', 'course_manager', 'lead_instructor', 'assistant_instructor', 'examiner', 'me_officer', 'admin_finance', 'external_viewer']::public.app_role[])
);
CREATE POLICY "Course managers can manage courses" ON public.courses FOR ALL USING (
  public.has_any_role(auth.uid(), ARRAY['system_admin', 'program_manager', 'course_manager', 'lead_instructor']::public.app_role[])
);

-- الوحدات
CREATE POLICY "View modules" ON public.modules FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.courses c
    JOIN public.enrollments e ON e.cohort_id = c.cohort_id
    WHERE c.id = modules.course_id AND e.user_id = auth.uid()
  ) OR public.has_any_role(auth.uid(), ARRAY['system_admin', 'program_manager', 'course_manager', 'lead_instructor', 'assistant_instructor', 'examiner', 'me_officer', 'external_viewer']::public.app_role[])
);
CREATE POLICY "Manage modules" ON public.modules FOR ALL USING (
  public.has_any_role(auth.uid(), ARRAY['system_admin', 'program_manager', 'course_manager', 'lead_instructor']::public.app_role[])
);

-- الدروس
CREATE POLICY "View lessons" ON public.lessons FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.modules m
    JOIN public.courses c ON c.id = m.course_id
    JOIN public.enrollments e ON e.cohort_id = c.cohort_id
    WHERE m.id = lessons.module_id AND e.user_id = auth.uid()
  ) OR public.has_any_role(auth.uid(), ARRAY['system_admin', 'program_manager', 'course_manager', 'lead_instructor', 'assistant_instructor', 'me_officer', 'external_viewer']::public.app_role[])
);
CREATE POLICY "Manage lessons" ON public.lessons FOR ALL USING (
  public.has_any_role(auth.uid(), ARRAY['system_admin', 'program_manager', 'course_manager', 'lead_instructor']::public.app_role[])
);

-- الموارد
CREATE POLICY "View resources" ON public.resources FOR SELECT USING (
  public.has_any_role(auth.uid(), ARRAY['system_admin', 'program_manager', 'course_manager', 'lead_instructor', 'assistant_instructor', 'me_officer', 'external_viewer']::public.app_role[])
  OR EXISTS (
    SELECT 1 FROM public.courses c
    JOIN public.enrollments e ON e.cohort_id = c.cohort_id
    WHERE (c.id = resources.course_id OR c.id IN (
      SELECT m.course_id FROM public.modules m WHERE m.id = resources.module_id
    )) AND e.user_id = auth.uid()
  )
);
CREATE POLICY "Manage resources" ON public.resources FOR ALL USING (
  public.has_any_role(auth.uid(), ARRAY['system_admin', 'program_manager', 'course_manager', 'lead_instructor']::public.app_role[])
);

-- التسجيل
CREATE POLICY "Users can view own enrollment" ON public.enrollments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Staff can view enrollments" ON public.enrollments FOR SELECT USING (
  public.has_any_role(auth.uid(), ARRAY['system_admin', 'program_manager', 'course_manager', 'lead_instructor', 'assistant_instructor', 'me_officer', 'admin_finance']::public.app_role[])
);
CREATE POLICY "Managers can manage enrollments" ON public.enrollments FOR ALL USING (
  public.has_any_role(auth.uid(), ARRAY['system_admin', 'program_manager', 'admin_finance']::public.app_role[])
);

-- المجموعات
CREATE POLICY "View groups" ON public.groups FOR SELECT USING (
  public.has_any_role(auth.uid(), ARRAY['system_admin', 'program_manager', 'course_manager', 'lead_instructor', 'assistant_instructor', 'me_officer', 'admin_finance']::public.app_role[])
  OR EXISTS (
    SELECT 1 FROM public.group_members gm WHERE gm.group_id = groups.id AND gm.user_id = auth.uid()
  )
);
CREATE POLICY "Manage groups" ON public.groups FOR ALL USING (
  public.has_any_role(auth.uid(), ARRAY['system_admin', 'program_manager', 'course_manager']::public.app_role[])
);

-- أعضاء المجموعات
CREATE POLICY "View group members" ON public.group_members FOR SELECT USING (
  public.has_any_role(auth.uid(), ARRAY['system_admin', 'program_manager', 'course_manager', 'lead_instructor', 'assistant_instructor', 'me_officer', 'admin_finance']::public.app_role[])
  OR auth.uid() = user_id
);
CREATE POLICY "Manage group members" ON public.group_members FOR ALL USING (
  public.has_any_role(auth.uid(), ARRAY['system_admin', 'program_manager', 'course_manager']::public.app_role[])
);

-- جلسات الحضور
CREATE POLICY "View attendance sessions" ON public.attendance_sessions FOR SELECT USING (
  public.has_any_role(auth.uid(), ARRAY['system_admin', 'program_manager', 'course_manager', 'lead_instructor', 'assistant_instructor', 'me_officer', 'admin_finance']::public.app_role[])
  OR EXISTS (
    SELECT 1 FROM public.group_members gm WHERE gm.group_id = attendance_sessions.group_id AND gm.user_id = auth.uid()
  )
);
CREATE POLICY "Manage attendance sessions" ON public.attendance_sessions FOR ALL USING (
  public.has_any_role(auth.uid(), ARRAY['system_admin', 'program_manager', 'course_manager', 'lead_instructor', 'assistant_instructor', 'admin_finance']::public.app_role[])
);

-- سجلات الحضور
CREATE POLICY "Users can view own attendance" ON public.attendance_records FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Staff can view attendance" ON public.attendance_records FOR SELECT USING (
  public.has_any_role(auth.uid(), ARRAY['system_admin', 'program_manager', 'course_manager', 'lead_instructor', 'assistant_instructor', 'me_officer', 'admin_finance']::public.app_role[])
);
CREATE POLICY "Instructors can manage attendance" ON public.attendance_records FOR ALL USING (
  public.has_any_role(auth.uid(), ARRAY['system_admin', 'program_manager', 'lead_instructor', 'assistant_instructor', 'admin_finance']::public.app_role[])
);

-- التقييمات
CREATE POLICY "View assessments" ON public.assessments FOR SELECT USING (
  public.has_any_role(auth.uid(), ARRAY['system_admin', 'program_manager', 'course_manager', 'lead_instructor', 'assistant_instructor', 'examiner', 'me_officer']::public.app_role[])
  OR (
    opens_at IS NULL OR opens_at <= now()
  ) AND EXISTS (
    SELECT 1 FROM public.courses c
    JOIN public.enrollments e ON e.cohort_id = c.cohort_id
    WHERE c.id = assessments.course_id AND e.user_id = auth.uid()
  )
);
CREATE POLICY "Manage assessments" ON public.assessments FOR ALL USING (
  public.has_any_role(auth.uid(), ARRAY['system_admin', 'program_manager', 'course_manager', 'lead_instructor']::public.app_role[])
);

-- أسئلة التقييمات
CREATE POLICY "View questions" ON public.assessment_questions FOR SELECT USING (
  public.has_any_role(auth.uid(), ARRAY['system_admin', 'program_manager', 'course_manager', 'lead_instructor', 'assistant_instructor', 'examiner']::public.app_role[])
);
CREATE POLICY "Manage questions" ON public.assessment_questions FOR ALL USING (
  public.has_any_role(auth.uid(), ARRAY['system_admin', 'program_manager', 'course_manager', 'lead_instructor']::public.app_role[])
);

-- معايير التقييم
CREATE POLICY "View rubrics" ON public.rubrics FOR SELECT USING (
  public.has_any_role(auth.uid(), ARRAY['system_admin', 'program_manager', 'course_manager', 'lead_instructor', 'assistant_instructor', 'examiner']::public.app_role[])
);
CREATE POLICY "Manage rubrics" ON public.rubrics FOR ALL USING (
  public.has_any_role(auth.uid(), ARRAY['system_admin', 'program_manager', 'course_manager', 'lead_instructor']::public.app_role[])
);

-- التسليمات
CREATE POLICY "Users can view own submissions" ON public.assessment_submissions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create submissions" ON public.assessment_submissions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own pending submissions" ON public.assessment_submissions FOR UPDATE USING (auth.uid() = user_id AND status = 'pending');
CREATE POLICY "Staff can view submissions" ON public.assessment_submissions FOR SELECT USING (
  public.has_any_role(auth.uid(), ARRAY['system_admin', 'program_manager', 'course_manager', 'lead_instructor', 'assistant_instructor', 'examiner', 'me_officer']::public.app_role[])
);
CREATE POLICY "Graders can update submissions" ON public.assessment_submissions FOR UPDATE USING (
  public.has_any_role(auth.uid(), ARRAY['system_admin', 'program_manager', 'lead_instructor', 'assistant_instructor', 'examiner']::public.app_role[])
);

-- الدرجات
CREATE POLICY "Users can view own published grades" ON public.grades FOR SELECT USING (auth.uid() = user_id AND is_published = true);
CREATE POLICY "Staff can view all grades" ON public.grades FOR SELECT USING (
  public.has_any_role(auth.uid(), ARRAY['system_admin', 'program_manager', 'course_manager', 'lead_instructor', 'assistant_instructor', 'examiner', 'me_officer']::public.app_role[])
);
CREATE POLICY "Graders can manage grades" ON public.grades FOR ALL USING (
  public.has_any_role(auth.uid(), ARRAY['system_admin', 'program_manager', 'lead_instructor', 'assistant_instructor', 'examiner']::public.app_role[])
);

-- الكفايات
CREATE POLICY "View competencies" ON public.competencies FOR SELECT USING (true);
CREATE POLICY "Manage competencies" ON public.competencies FOR ALL USING (
  public.has_any_role(auth.uid(), ARRAY['system_admin', 'program_manager', 'course_manager', 'lead_instructor']::public.app_role[])
);

-- أدلة الكفايات
CREATE POLICY "Users can view own evidence" ON public.competency_evidence FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can submit evidence" ON public.competency_evidence FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Staff can view evidence" ON public.competency_evidence FOR SELECT USING (
  public.has_any_role(auth.uid(), ARRAY['system_admin', 'program_manager', 'course_manager', 'lead_instructor', 'assistant_instructor', 'examiner', 'me_officer', 'external_viewer']::public.app_role[])
);

-- توقيعات الكفايات
CREATE POLICY "View signoffs" ON public.competency_signoffs FOR SELECT USING (
  public.has_any_role(auth.uid(), ARRAY['system_admin', 'program_manager', 'course_manager', 'lead_instructor', 'assistant_instructor', 'examiner', 'me_officer']::public.app_role[])
  OR EXISTS (
    SELECT 1 FROM public.competency_evidence ce WHERE ce.id = competency_signoffs.evidence_id AND ce.user_id = auth.uid()
  )
);
CREATE POLICY "Assessors can create signoffs" ON public.competency_signoffs FOR INSERT WITH CHECK (
  public.has_any_role(auth.uid(), ARRAY['system_admin', 'program_manager', 'lead_instructor', 'assistant_instructor', 'examiner']::public.app_role[])
);

-- الشهادات
CREATE POLICY "Users can view own certificate" ON public.certificates FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Staff can view certificates" ON public.certificates FOR SELECT USING (
  public.has_any_role(auth.uid(), ARRAY['system_admin', 'program_manager', 'course_manager', 'lead_instructor', 'me_officer', 'admin_finance', 'external_viewer']::public.app_role[])
);
CREATE POLICY "Managers can manage certificates" ON public.certificates FOR ALL USING (
  public.has_any_role(auth.uid(), ARRAY['system_admin', 'program_manager']::public.app_role[])
);

-- التحقق من الشهادات (عام للقراءة)
CREATE POLICY "Anyone can verify certificates" ON public.certificate_verifications FOR INSERT WITH CHECK (true);
CREATE POLICY "Staff can view verifications" ON public.certificate_verifications FOR SELECT USING (
  public.has_any_role(auth.uid(), ARRAY['system_admin', 'program_manager', 'me_officer']::public.app_role[])
);

-- الاستبيانات
CREATE POLICY "View active surveys" ON public.surveys FOR SELECT USING (
  is_active = true OR public.has_any_role(auth.uid(), ARRAY['system_admin', 'program_manager', 'me_officer']::public.app_role[])
);
CREATE POLICY "Manage surveys" ON public.surveys FOR ALL USING (
  public.has_any_role(auth.uid(), ARRAY['system_admin', 'program_manager', 'me_officer']::public.app_role[])
);

-- أسئلة الاستبيانات
CREATE POLICY "View survey questions" ON public.survey_questions FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.surveys s WHERE s.id = survey_questions.survey_id AND s.is_active = true)
  OR public.has_any_role(auth.uid(), ARRAY['system_admin', 'program_manager', 'me_officer']::public.app_role[])
);
CREATE POLICY "Manage survey questions" ON public.survey_questions FOR ALL USING (
  public.has_any_role(auth.uid(), ARRAY['system_admin', 'program_manager', 'me_officer']::public.app_role[])
);

-- إجابات الاستبيانات
CREATE POLICY "Users can submit responses" ON public.survey_responses FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Users can view own responses" ON public.survey_responses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "ME can view all responses" ON public.survey_responses FOR SELECT USING (
  public.has_any_role(auth.uid(), ARRAY['system_admin', 'program_manager', 'me_officer']::public.app_role[])
);

-- سجل التدقيق
CREATE POLICY "Admins can view audit logs" ON public.audit_logs FOR SELECT USING (
  public.has_any_role(auth.uid(), ARRAY['system_admin', 'program_manager']::public.app_role[])
);
CREATE POLICY "System can insert audit logs" ON public.audit_logs FOR INSERT WITH CHECK (true);

-- إعدادات النظام
CREATE POLICY "Anyone can view settings" ON public.system_settings FOR SELECT USING (true);
CREATE POLICY "Admins can manage settings" ON public.system_settings FOR ALL USING (
  public.has_role(auth.uid(), 'system_admin')
);

-- =====================================================
-- 15. إنشاء Storage Buckets
-- =====================================================

INSERT INTO storage.buckets (id, name, public) VALUES ('course_materials', 'course_materials', false);
INSERT INTO storage.buckets (id, name, public) VALUES ('student_submissions', 'student_submissions', false);
INSERT INTO storage.buckets (id, name, public) VALUES ('practical_evidence', 'practical_evidence', false);
INSERT INTO storage.buckets (id, name, public) VALUES ('certificates', 'certificates', false);
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);

-- سياسات Storage
CREATE POLICY "Course materials access" ON storage.objects FOR SELECT USING (
  bucket_id = 'course_materials' AND (
    public.has_any_role(auth.uid(), ARRAY['system_admin', 'program_manager', 'course_manager', 'lead_instructor', 'assistant_instructor']::public.app_role[])
    OR EXISTS (SELECT 1 FROM public.enrollments WHERE user_id = auth.uid())
  )
);

CREATE POLICY "Upload course materials" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'course_materials' AND public.has_any_role(auth.uid(), ARRAY['system_admin', 'program_manager', 'course_manager', 'lead_instructor']::public.app_role[])
);

CREATE POLICY "Students can upload submissions" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'student_submissions' AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Students can view own submissions" ON storage.objects FOR SELECT USING (
  bucket_id = 'student_submissions' AND (
    auth.uid()::text = (storage.foldername(name))[1]
    OR public.has_any_role(auth.uid(), ARRAY['system_admin', 'program_manager', 'lead_instructor', 'assistant_instructor', 'examiner']::public.app_role[])
  )
);

CREATE POLICY "Students can upload evidence" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'practical_evidence' AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "View practical evidence" ON storage.objects FOR SELECT USING (
  bucket_id = 'practical_evidence' AND (
    auth.uid()::text = (storage.foldername(name))[1]
    OR public.has_any_role(auth.uid(), ARRAY['system_admin', 'program_manager', 'lead_instructor', 'assistant_instructor', 'examiner', 'me_officer', 'external_viewer']::public.app_role[])
  )
);

CREATE POLICY "Managers can manage certificates" ON storage.objects FOR ALL USING (
  bucket_id = 'certificates' AND public.has_any_role(auth.uid(), ARRAY['system_admin', 'program_manager']::public.app_role[])
);

CREATE POLICY "Users can view own certificate" ON storage.objects FOR SELECT USING (
  bucket_id = 'certificates' AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Avatar upload" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Avatar public read" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');