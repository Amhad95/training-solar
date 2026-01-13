import { ClipboardList, Clock, CheckCircle2, AlertTriangle, FileText, Wrench, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { usePendingTasks, useMySubmissions } from "@/hooks/useAssessments";
import { useEnrollment } from "@/hooks/useEnrollment";
import { Link } from "react-router-dom";
import { ASSESSMENT_TYPE_LABELS } from "@/lib/constants";

const typeIcons = {
  quiz: FileText,
  assignment: ClipboardList,
  practical_task: Wrench,
  capstone: Award,
};

const typeColors = {
  quiz: 'bg-info/10 text-info',
  assignment: 'bg-primary/10 text-primary',
  practical_task: 'bg-warning/10 text-warning',
  capstone: 'bg-success/10 text-success',
};

export default function Assignments() {
  const { data: enrollment, isLoading: enrollmentLoading } = useEnrollment();
  const { data: pendingTasks, isLoading: tasksLoading } = usePendingTasks();
  const { data: submissions, isLoading: submissionsLoading } = useMySubmissions();

  const isLoading = enrollmentLoading || tasksLoading || submissionsLoading;

  if (isLoading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-12 w-full" />
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
      </div>
    );
  }

  if (!enrollment) {
    return (
      <div className="space-y-6 animate-fade-in">
        <h1 className="text-2xl font-bold text-foreground">المهام والتقييمات</h1>
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>لا يوجد تسجيل نشط</AlertTitle>
          <AlertDescription>
            لم يتم تسجيلك في أي دفعة تدريبية حتى الآن.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const overdueCount = pendingTasks.filter(t => t.status === 'overdue').length;
  const completedSubmissions = submissions?.filter(s => s.status === 'graded') || [];
  const pendingSubmissions = submissions?.filter(s => ['submitted', 'pending'].includes(s.status)) || [];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">المهام والتقييمات</h1>
        <p className="text-muted-foreground">{enrollment.cohort.name}</p>
      </div>

      {/* Warning for overdue tasks */}
      {overdueCount > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>لديك مهام متأخرة</AlertTitle>
          <AlertDescription>
            لديك {overdueCount} مهمة متأخرة. يرجى إكمالها في أقرب وقت ممكن.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending" className="relative">
            المطلوبة
            {pendingTasks.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                {pendingTasks.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="submitted">قيد التقييم</TabsTrigger>
          <TabsTrigger value="graded">المقيّمة</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-6">
          {pendingTasks.length > 0 ? (
            <div className="space-y-4">
              {pendingTasks.map((task) => {
                const Icon = typeIcons[task.type] || ClipboardList;
                const colorClass = typeColors[task.type] || 'bg-muted text-muted-foreground';

                return (
                  <Card key={task.id} className={cn(task.status === 'overdue' && 'border-destructive/50')}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center shrink-0", colorClass)}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <div className="space-y-1">
                            <h3 className="font-semibold text-foreground">{task.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {task.courseCode} - {task.courseName}
                            </p>
                            <div className="flex items-center gap-2 text-sm">
                              <Badge variant="outline" className={colorClass}>
                                {ASSESSMENT_TYPE_LABELS[task.type] || task.type}
                              </Badge>
                              {task.dueDate && (
                                <span className={cn(
                                  "flex items-center gap-1",
                                  task.status === 'overdue' ? 'text-destructive' : 'text-muted-foreground'
                                )}>
                                  <Clock className="w-3 h-3" />
                                  {formatDueDate(task.dueDate)}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <Button asChild>
                          <Link to={`/assignments/${task.id}`}>
                            {task.type === 'quiz' ? 'بدء الاختبار' : 'تسليم'}
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <CheckCircle2 className="w-12 h-12 text-success mx-auto mb-4" />
                  <p className="text-muted-foreground">لا توجد مهام معلقة</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="submitted" className="mt-6">
          {pendingSubmissions.length > 0 ? (
            <div className="space-y-4">
              {pendingSubmissions.map((submission) => {
                const Icon = typeIcons[submission.assessment.type] || ClipboardList;
                const colorClass = typeColors[submission.assessment.type] || 'bg-muted text-muted-foreground';

                return (
                  <Card key={submission.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center shrink-0", colorClass)}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="space-y-1 flex-1">
                          <h3 className="font-semibold text-foreground">{submission.assessment.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {submission.assessment.course.code} - {submission.assessment.course.name}
                          </p>
                          <div className="flex items-center gap-2 text-sm">
                            <Badge variant="outline" className="bg-warning/10 text-warning">
                              قيد التقييم
                            </Badge>
                            {submission.submitted_at && (
                              <span className="text-muted-foreground">
                                تم التسليم: {formatDate(submission.submitted_at)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground py-8">
                  لا توجد مهام قيد التقييم
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="graded" className="mt-6">
          {completedSubmissions.length > 0 ? (
            <div className="space-y-4">
              {completedSubmissions.map((submission) => {
                const Icon = typeIcons[submission.assessment.type] || ClipboardList;
                const isPassing = submission.score !== null && 
                  submission.score >= submission.assessment.passing_score;

                return (
                  <Card key={submission.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className={cn(
                            "w-12 h-12 rounded-lg flex items-center justify-center shrink-0",
                            isPassing ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
                          )}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <div className="space-y-1">
                            <h3 className="font-semibold text-foreground">{submission.assessment.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {submission.assessment.course.code} - {submission.assessment.course.name}
                            </p>
                            {submission.feedback && (
                              <p className="text-sm text-muted-foreground">
                                {submission.feedback}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="text-left">
                          <div className={cn(
                            "text-2xl font-bold",
                            isPassing ? 'text-success' : 'text-destructive'
                          )}>
                            {submission.score}/{submission.assessment.max_score}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            الحد الأدنى: {submission.assessment.passing_score}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground py-8">
                  لا توجد مهام مقيّمة بعد
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function formatDueDate(dateString: string): string {
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
  } else {
    return date.toLocaleDateString('ar-SD');
  }
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('ar-SD', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
