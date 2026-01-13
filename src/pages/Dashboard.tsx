import { CalendarCheck, BookOpen, Award, GraduationCap } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { WeekSchedule } from "@/components/dashboard/WeekSchedule";
import { TaskList } from "@/components/dashboard/TaskList";
import { ModuleProgress } from "@/components/dashboard/ModuleProgress";
import { AttendanceSummary } from "@/components/dashboard/AttendanceSummary";
import { CompetencyOverview } from "@/components/dashboard/CompetencyOverview";
import { GradeSummary } from "@/components/dashboard/GradeSummary";

// Sample data - will be replaced with real data from database
const scheduleItems = [
  {
    id: "1",
    title: "أساسيات الكهرباء - الدوائر المتوازية",
    moduleCode: "M-01",
    day: "الأحد",
    time: "09:00 - 11:00",
    location: "قاعة 1",
    type: "lecture" as const,
  },
  {
    id: "2",
    title: "تطبيق عملي - قياس الجهد والتيار",
    moduleCode: "M-01",
    day: "الاثنين",
    time: "09:00 - 12:00",
    location: "المختبر",
    type: "practical" as const,
  },
  {
    id: "3",
    title: "اختبار قصير - الأسبوع الثاني",
    moduleCode: "M-01",
    day: "الأربعاء",
    time: "09:00 - 09:30",
    location: "قاعة 1",
    type: "assessment" as const,
  },
];

const tasks = [
  {
    id: "1",
    title: "واجب حساب الدوائر الكهربائية",
    moduleCode: "M-01",
    dueDate: "غداً 11:59 م",
    type: "assignment" as const,
    status: "pending" as const,
  },
  {
    id: "2",
    title: "اختبار قصير - الأسبوع الثاني",
    moduleCode: "M-01",
    dueDate: "الأربعاء",
    type: "quiz" as const,
    status: "pending" as const,
  },
  {
    id: "3",
    title: "تقرير التجربة العملية",
    moduleCode: "M-01",
    dueDate: "منتهي منذ يومين",
    type: "practical" as const,
    status: "overdue" as const,
  },
];

const modules = [
  { id: "1", code: "M-00A", name: "التهيئة والمهارات الرقمية", progress: 100, status: "completed" as const, grade: 95 },
  { id: "2", code: "M-00B", name: "السلامة ومدونة السلوك", progress: 100, status: "completed" as const, grade: 88 },
  { id: "3", code: "M-01", name: "أساسيات الكهرباء", progress: 65, status: "in_progress" as const, grade: 78 },
  { id: "4", code: "M-02", name: "أساسيات الطاقة الشمسية", progress: 0, status: "not_started" as const },
  { id: "5", code: "M-03", name: "التركيب والسلامة المهنية", progress: 0, status: "not_started" as const },
];

const moduleGrades = [
  { code: "M-00A", name: "التهيئة والمهارات الرقمية", grade: 95, passing: 60 },
  { code: "M-00B", name: "السلامة ومدونة السلوك", grade: 88, passing: 60 },
  { code: "M-01", name: "أساسيات الكهرباء", grade: 78, passing: 60 },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page title */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">لوحة المتدرب</h1>
        <p className="text-muted-foreground">الدُفعة التجريبية 01</p>
      </div>

      {/* Stats row */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="نسبة الحضور"
          value="87%"
          subtitle="35 من 40 حصة"
          icon={<CalendarCheck className="w-5 h-5" />}
          variant="warning"
        />
        <StatCard
          title="الوحدات المكتملة"
          value="2/11"
          subtitle="18% من البرنامج"
          icon={<BookOpen className="w-5 h-5" />}
          variant="primary"
        />
        <StatCard
          title="الكفايات المحققة"
          value="8/24"
          subtitle="33% مكتمل"
          icon={<Award className="w-5 h-5" />}
          variant="primary"
        />
        <StatCard
          title="المعدل التراكمي"
          value="82%"
          subtitle="جيد جداً"
          icon={<GraduationCap className="w-5 h-5" />}
          variant="success"
        />
      </div>

      {/* Main content grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left column */}
        <div className="space-y-6">
          <WeekSchedule items={scheduleItems} />
          <TaskList tasks={tasks} />
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <ModuleProgress modules={modules} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <AttendanceSummary
              percentage={87}
              totalSessions={40}
              attendedSessions={35}
              threshold={90}
            />
            <CompetencyOverview
              totalCompetencies={24}
              achievedCompetencies={8}
            />
          </div>
          <GradeSummary overallGrade={82} moduleGrades={moduleGrades} />
        </div>
      </div>
    </div>
  );
}
