import { CalendarCheck, BookOpen, Award, ClipboardList, AlertCircle, Loader2 } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { WeekSchedule } from "@/components/dashboard/WeekSchedule";
import { TaskList } from "@/components/dashboard/TaskList";
import { ModuleProgress } from "@/components/dashboard/ModuleProgress";
import { AttendanceSummary } from "@/components/dashboard/AttendanceSummary";
import { CompetencyOverview } from "@/components/dashboard/CompetencyOverview";
import { useAuth } from "@/hooks/useAuth";
import { useEnrollment } from "@/hooks/useEnrollment";
import { useCourses } from "@/hooks/useCourses";
import { useAttendanceSummary } from "@/hooks/useAttendance";
import { usePendingTasks } from "@/hooks/useAssessments";
import { useMyCompetencyProgress } from "@/hooks/useCompetencies";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const { profile, loading: authLoading } = useAuth();
  const { data: enrollment, isLoading: enrollmentLoading } = useEnrollment();
  const { data: courses, isLoading: coursesLoading } = useCourses();
  const { data: attendanceSummary, isLoading: attendanceLoading } = useAttendanceSummary();
  const { data: pendingTasks, isLoading: tasksLoading } = usePendingTasks();
  const { summary: competencySummary, isLoading: competencyLoading } = useMyCompetencyProgress();

  const isLoading = authLoading || enrollmentLoading;

  if (isLoading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }

  // No enrollment found
  if (!enrollment) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-foreground">مرحباً {profile?.full_name || ''}</h1>
        </div>
        
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>لا يوجد تسجيل نشط</AlertTitle>
          <AlertDescription>
            لم يتم تسجيلك في أي دفعة تدريبية حتى الآن.
            يرجى التواصل مع إدارة البرنامج لإتمام التسجيل.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>معلومات الحساب</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p><span className="text-muted-foreground">الاسم:</span> {profile?.full_name}</p>
            {profile?.phone && <p><span className="text-muted-foreground">الهاتف:</span> {profile.phone}</p>}
            {profile?.state && <p><span className="text-muted-foreground">الولاية:</span> {profile.state}</p>}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Calculate stats
  const completedCourses = 0; // Will be calculated when we have lesson progress
  const totalCourses = courses?.length || 0;

  // Transform tasks for TaskList component
  const tasksForList = pendingTasks.map(task => ({
    id: task.id,
    title: task.title,
    moduleCode: task.courseCode,
    dueDate: task.dueDate ? formatArabicDate(task.dueDate) : 'غير محدد',
    type: mapTaskType(task.type),
    status: task.status as 'pending' | 'overdue' | 'submitted',
  }));

  // Transform courses for ModuleProgress
  const modulesForProgress = (courses || []).map((course, index) => ({
    id: course.id,
    code: course.code,
    name: course.name,
    progress: 0, // Will be calculated when we have lesson progress
    status: (index < 2 ? 'completed' : index === 2 ? 'in_progress' : 'not_started') as 'completed' | 'in_progress' | 'not_started',
    grade: undefined, // Grades are not shown until published
  }));

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page title */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">مرحباً {profile?.full_name || ''}</h1>
        <p className="text-muted-foreground">{enrollment.cohort.name}</p>
      </div>

      {/* Attendance warning */}
      {attendanceSummary.percentage > 0 && attendanceSummary.percentage < enrollment.cohort.attendance_threshold && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>تحذير: نسبة الحضور منخفضة</AlertTitle>
          <AlertDescription>
            نسبة حضورك الحالية {attendanceSummary.percentage}% وهي أقل من الحد المطلوب ({enrollment.cohort.attendance_threshold}%).
            يرجى الانتباه للحضور لتجنب عدم الأهلية للاختبارات النهائية.
          </AlertDescription>
        </Alert>
      )}

      {/* Stats row */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="نسبة الحضور"
          value={attendanceLoading ? '-' : `${attendanceSummary.percentage}%`}
          subtitle={attendanceLoading ? 'جاري التحميل...' : `${attendanceSummary.attended + attendanceSummary.late} من ${attendanceSummary.totalSessions} حصة`}
          icon={<CalendarCheck className="w-5 h-5" />}
          variant={attendanceSummary.percentage >= 90 ? 'success' : attendanceSummary.percentage >= 80 ? 'warning' : 'danger'}
        />
        <StatCard
          title="المقررات"
          value={coursesLoading ? '-' : `${completedCourses}/${totalCourses}`}
          subtitle="الوحدات التدريبية"
          icon={<BookOpen className="w-5 h-5" />}
          variant="primary"
        />
        <StatCard
          title="الكفايات المحققة"
          value={competencyLoading ? '-' : `${competencySummary.achieved}/${competencySummary.total}`}
          subtitle={competencyLoading ? 'جاري التحميل...' : `${competencySummary.inProgress} قيد التنفيذ`}
          icon={<Award className="w-5 h-5" />}
          variant="primary"
        />
        <StatCard
          title="المهام المعلقة"
          value={tasksLoading ? '-' : String(pendingTasks.length)}
          subtitle={tasksLoading ? 'جاري التحميل...' : pendingTasks.filter(t => t.status === 'overdue').length > 0 ? `${pendingTasks.filter(t => t.status === 'overdue').length} متأخرة` : 'لا توجد متأخرات'}
          icon={<ClipboardList className="w-5 h-5" />}
          variant={pendingTasks.filter(t => t.status === 'overdue').length > 0 ? 'warning' : 'success'}
        />
      </div>

      {/* Main content grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left column */}
        <div className="space-y-6">
          {/* Schedule placeholder - will be implemented with real schedule data */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarCheck className="w-5 h-5 text-primary" />
                جدول هذا الأسبوع
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">
                لم يتم إضافة جدول الحصص بعد
              </p>
            </CardContent>
          </Card>
          
          <TaskList tasks={tasksForList} />
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <ModuleProgress modules={modulesForProgress.slice(0, 5)} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <AttendanceSummary
              percentage={attendanceSummary.percentage}
              totalSessions={attendanceSummary.totalSessions}
              attendedSessions={attendanceSummary.attended + attendanceSummary.late}
              threshold={enrollment.cohort.attendance_threshold}
            />
            <CompetencyOverview
              totalCompetencies={competencySummary.total}
              achievedCompetencies={competencySummary.achieved}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper functions
function formatArabicDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return `متأخر منذ ${Math.abs(diffDays)} يوم`;
  } else if (diffDays === 0) {
    return 'اليوم';
  } else if (diffDays === 1) {
    return 'غداً';
  } else if (diffDays <= 7) {
    return `خلال ${diffDays} أيام`;
  } else {
    return date.toLocaleDateString('ar-SD');
  }
}

function mapTaskType(type: string): 'quiz' | 'assignment' | 'practical' {
  switch (type) {
    case 'quiz': return 'quiz';
    case 'practical_task': return 'practical';
    case 'capstone': return 'practical';
    default: return 'assignment';
  }
}
