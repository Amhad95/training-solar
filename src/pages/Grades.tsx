import { GraduationCap, BookOpen, CheckCircle2, XCircle, AlertCircle, Lock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { useGradesSummary } from "@/hooks/useGrades";
import { useEnrollment } from "@/hooks/useEnrollment";

export default function Grades() {
  const { data: enrollment, isLoading: enrollmentLoading } = useEnrollment();
  const { data: courseGrades, overall, isLoading: gradesLoading } = useGradesSummary();

  const isLoading = enrollmentLoading || gradesLoading;

  if (isLoading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-32" />
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
        <h1 className="text-2xl font-bold text-foreground">الدرجات</h1>
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

  const hasGrades = courseGrades.length > 0;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">الدرجات</h1>
        <p className="text-muted-foreground">{enrollment.cohort.name}</p>
      </div>

      {/* Info alert */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>ملاحظة</AlertTitle>
        <AlertDescription>
          تظهر الدرجات فقط بعد إعلانها من قبل المدرب. الدرجات المعروضة هي الدرجات المعلنة فقط.
        </AlertDescription>
      </Alert>

      {hasGrades ? (
        <>
          {/* Overall grade card */}
          <Card className="border-primary/30">
            <CardContent className="pt-6">
              <div className="flex items-center gap-6">
                <div className={cn(
                  "w-24 h-24 rounded-full flex items-center justify-center",
                  overall.isPassing ? 'bg-success/10' : 'bg-destructive/10'
                )}>
                  <div className="text-center">
                    <div className={cn(
                      "text-3xl font-bold",
                      overall.isPassing ? 'text-success' : 'text-destructive'
                    )}>
                      {overall.percentage}%
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-foreground mb-2">المعدل التراكمي</h2>
                  <Progress 
                    value={overall.percentage} 
                    className={cn(
                      "h-3",
                      overall.isPassing ? '[&>div]:bg-success' : '[&>div]:bg-destructive'
                    )} 
                  />
                  <div className="flex items-center justify-between mt-2 text-sm">
                    <span className="text-muted-foreground">
                      {overall.totalScore} من {overall.maxScore} درجة
                    </span>
                    <Badge variant="outline" className={cn(
                      overall.isPassing ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
                    )}>
                      {overall.isPassing ? 'ناجح' : 'غير ناجح'}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Course grades */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-primary" />
                درجات المقررات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courseGrades.map((course) => (
                  <div
                    key={course.courseId}
                    className="flex items-center justify-between p-4 rounded-lg border bg-card"
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-lg flex items-center justify-center",
                        course.isPassing ? 'bg-success/10' : 'bg-destructive/10'
                      )}>
                        {course.isPassing ? (
                          <CheckCircle2 className="w-6 h-6 text-success" />
                        ) : (
                          <XCircle className="w-6 h-6 text-destructive" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{course.courseName}</h3>
                        <p className="text-sm text-muted-foreground">{course.courseCode}</p>
                      </div>
                    </div>
                    <div className="text-left">
                      <div className={cn(
                        "text-2xl font-bold",
                        course.isPassing ? 'text-success' : 'text-destructive'
                      )}>
                        {course.percentage}%
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {course.totalScore}/{course.maxScore}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Grade breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                تفاصيل الدرجات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {courseGrades.map((course) => (
                  <div key={course.courseId} className="space-y-3">
                    <h4 className="font-semibold text-foreground border-b pb-2">
                      {course.courseCode} - {course.courseName}
                    </h4>
                    {course.grades.length > 0 ? (
                      <div className="grid gap-2">
                        {course.grades.map((grade) => (
                          <div
                            key={grade.id}
                            className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                          >
                            <div>
                              <p className="font-medium text-foreground">
                                {grade.assessment?.title || 'تقييم عام'}
                              </p>
                              {grade.notes && (
                                <p className="text-sm text-muted-foreground">{grade.notes}</p>
                              )}
                            </div>
                            <div className="text-left">
                              <span className="font-bold text-foreground">
                                {grade.score}/{grade.max_score}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">لا توجد تفاصيل</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                لا توجد درجات معلنة
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                لم يتم إعلان أي درجات بعد. ستظهر درجاتك هنا بعد إعلانها من قبل المدربين.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
