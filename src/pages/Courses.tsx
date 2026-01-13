import { BookOpen, Clock, CheckCircle2, Lock, ChevronLeft, Loader2, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useCourses } from "@/hooks/useCourses";
import { useEnrollment } from "@/hooks/useEnrollment";

const typeLabels: Record<string, string> = {
  preparatory: "تمهيدي",
  core: "أساسي",
  support: "داعم",
  capstone: "تطبيقي",
  career: "مهني",
};

const typeColors: Record<string, string> = {
  preparatory: "bg-info/10 text-info border-info/20",
  core: "bg-primary/10 text-primary border-primary/20",
  support: "bg-warning/10 text-warning border-warning/20",
  capstone: "bg-success/10 text-success border-success/20",
  career: "bg-accent text-accent-foreground border-accent",
};

function getCourseType(code: string, isPrerequisite: boolean, isSupportTrack: boolean): string {
  if (isPrerequisite) return 'preparatory';
  if (isSupportTrack) return 'support';
  if (code.startsWith('CAP')) return 'capstone';
  if (code.startsWith('EMP')) return 'career';
  return 'core';
}

export default function Courses() {
  const { data: enrollment, isLoading: enrollmentLoading } = useEnrollment();
  const { data: courses, isLoading: coursesLoading } = useCourses();

  const isLoading = enrollmentLoading || coursesLoading;

  if (isLoading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      </div>
    );
  }

  if (!enrollment) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-foreground">المقررات</h1>
        </div>
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>لا يوجد تسجيل نشط</AlertTitle>
          <AlertDescription>
            لم يتم تسجيلك في أي دفعة تدريبية حتى الآن.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-foreground">المقررات</h1>
          <p className="text-muted-foreground">{enrollment.cohort.name}</p>
        </div>
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>لا توجد مقررات</AlertTitle>
          <AlertDescription>
            لم يتم إضافة مقررات لهذه الدفعة بعد.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">المقررات</h1>
        <p className="text-muted-foreground">{enrollment.cohort.name} - {courses.length} وحدة تدريبية</p>
      </div>

      {/* Course grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course, index) => {
          const courseType = getCourseType(course.code, course.is_prerequisite, course.is_support_track);
          
          // For now, simulate status based on order (will be replaced with real progress)
          const isCompleted = false;
          const isInProgress = index === 0;
          const isAvailable = index <= 1;
          const isLocked = !isAvailable && !isCompleted && !isInProgress;
          const progress = 0;

          return (
            <Card
              key={course.id}
              className={cn(
                "module-card",
                isLocked && "opacity-60",
                isCompleted && "border-success/30",
                isInProgress && "border-primary/30"
              )}
            >
              <div className="module-card-header">
                <div className="space-y-1">
                  <Badge
                    variant="outline"
                    className={cn("text-[10px]", typeColors[courseType])}
                  >
                    {typeLabels[courseType]}
                  </Badge>
                  <span className="module-card-code block">{course.code}</span>
                </div>
                <div className="shrink-0">
                  {isCompleted && (
                    <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    </div>
                  )}
                  {isLocked && (
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <Lock className="w-4 h-4 text-muted-foreground" />
                    </div>
                  )}
                  {isInProgress && (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  {isAvailable && !isInProgress && !isCompleted && (
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-muted-foreground" />
                    </div>
                  )}
                </div>
              </div>

              <h3 className="module-card-title mb-3">{course.name}</h3>

              {course.description && (
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                  {course.description}
                </p>
              )}

              {/* Progress */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">التقدم</span>
                  <span className="font-medium text-foreground">
                    {progress}%
                  </span>
                </div>
                <Progress
                  value={progress}
                  className={cn(
                    "h-2",
                    isCompleted && "[&>div]:bg-success"
                  )}
                />
              </div>

              {/* Meta info */}
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <span>نظري: {course.theory_weight}%</span>
                  <span className="mx-1">|</span>
                  <span>عملي: {course.practical_weight}%</span>
                </span>
              </div>

              {/* Action */}
              <Button
                variant={isLocked ? "secondary" : isCompleted ? "outline" : "default"}
                className="w-full"
                disabled={isLocked}
                asChild={!isLocked}
              >
                {isLocked ? (
                  <span>غير متاح</span>
                ) : (
                  <Link to={`/courses/${course.id}`}>
                    {isCompleted ? "مراجعة" : isInProgress ? "متابعة" : "بدء الدراسة"}
                    <ChevronLeft className="w-4 h-4 mr-1 rtl-flip" />
                  </Link>
                )}
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
