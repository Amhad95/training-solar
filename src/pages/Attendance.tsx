import { CalendarCheck, CheckCircle2, Clock, XCircle, AlertTriangle, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { useAttendanceRecords, useAttendanceSummary } from "@/hooks/useAttendance";
import { useEnrollment } from "@/hooks/useEnrollment";
import { ATTENDANCE_STATUS_LABELS } from "@/lib/constants";

const statusConfig = {
  present: { icon: CheckCircle2, color: 'text-success', bgColor: 'bg-success/10' },
  late: { icon: Clock, color: 'text-warning', bgColor: 'bg-warning/10' },
  excused: { icon: AlertTriangle, color: 'text-info', bgColor: 'bg-info/10' },
  absent: { icon: XCircle, color: 'text-destructive', bgColor: 'bg-destructive/10' },
};

export default function Attendance() {
  const { data: enrollment, isLoading: enrollmentLoading } = useEnrollment();
  const { data: records, isLoading: recordsLoading } = useAttendanceRecords();
  const { data: summary, isLoading: summaryLoading } = useAttendanceSummary();

  const isLoading = enrollmentLoading || recordsLoading || summaryLoading;

  if (isLoading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  if (!enrollment) {
    return (
      <div className="space-y-6 animate-fade-in">
        <h1 className="text-2xl font-bold text-foreground">سجل الحضور</h1>
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

  const threshold = enrollment.cohort.attendance_threshold;
  const isAtRisk = summary.percentage > 0 && summary.percentage < threshold;
  const progressColor = summary.percentage >= threshold 
    ? 'bg-success' 
    : summary.percentage >= threshold - 10 
      ? 'bg-warning' 
      : 'bg-destructive';

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">سجل الحضور</h1>
        <p className="text-muted-foreground">{enrollment.cohort.name}</p>
      </div>

      {/* Warning if at risk */}
      {isAtRisk && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>تحذير: نسبة الحضور منخفضة</AlertTitle>
          <AlertDescription>
            نسبة حضورك الحالية {summary.percentage}% وهي أقل من الحد المطلوب ({threshold}%).
            يرجى الانتباه للحضور لتجنب عدم الأهلية للاختبارات النهائية.
          </AlertDescription>
        </Alert>
      )}

      {/* Summary cards */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-5">
        <Card className="col-span-2 lg:col-span-1">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground mb-1">
                {summary.percentage}%
              </div>
              <p className="text-sm text-muted-foreground">نسبة الحضور</p>
              <Progress 
                value={summary.percentage} 
                className={cn("h-2 mt-3", `[&>div]:${progressColor}`)} 
              />
              <p className="text-xs text-muted-foreground mt-2">
                الحد المطلوب: {threshold}%
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-success" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{summary.attended}</div>
                <p className="text-xs text-muted-foreground">حاضر</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-warning" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{summary.late}</div>
                <p className="text-xs text-muted-foreground">متأخر</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-info/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-info" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{summary.excused}</div>
                <p className="text-xs text-muted-foreground">بعذر</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                <XCircle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{summary.absent}</div>
                <p className="text-xs text-muted-foreground">غائب</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance records */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarCheck className="w-5 h-5 text-primary" />
            سجل الحصص
          </CardTitle>
        </CardHeader>
        <CardContent>
          {records && records.length > 0 ? (
            <div className="space-y-3">
              {records.map((record) => {
                const config = statusConfig[record.status];
                const Icon = config.icon;

                return (
                  <div
                    key={record.id}
                    className="flex items-center justify-between p-3 rounded-lg border bg-card"
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", config.bgColor)}>
                        <Icon className={cn("w-5 h-5", config.color)} />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {record.session?.course?.name || 'غير محدد'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {record.session?.course?.code} - {formatDate(record.session?.session_date)}
                          {record.session?.session_time && ` - ${record.session.session_time}`}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className={cn(config.bgColor, config.color, "border-0")}>
                      {ATTENDANCE_STATUS_LABELS[record.status]}
                    </Badge>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              لا توجد سجلات حضور بعد
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function formatDate(dateString: string | undefined): string {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('ar-SD', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
