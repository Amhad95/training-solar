import { CalendarCheck, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressRing } from "./ProgressRing";
import { cn } from "@/lib/utils";

interface AttendanceSummaryProps {
  percentage: number;
  totalSessions: number;
  attendedSessions: number;
  threshold: number;
  className?: string;
}

export function AttendanceSummary({
  percentage,
  totalSessions,
  attendedSessions,
  threshold,
  className,
}: AttendanceSummaryProps) {
  const isAtRisk = percentage < threshold;
  const remainingToThreshold = Math.ceil(
    (threshold / 100) * totalSessions - attendedSessions
  );

  return (
    <Card className={cn(isAtRisk && "border-warning/50", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <CalendarCheck className="w-5 h-5 text-primary" />
          الحضور
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-6">
          <ProgressRing
            progress={percentage}
            size={100}
            strokeWidth={8}
            variant={isAtRisk ? "warning" : "default"}
          />
          <div className="space-y-3">
            <div>
              <p className="text-2xl font-bold text-foreground">
                {attendedSessions}/{totalSessions}
              </p>
              <p className="text-sm text-muted-foreground">حصة حضور</p>
            </div>
            <div className="text-xs text-muted-foreground">
              الحد الأدنى المطلوب: {threshold}%
            </div>
          </div>
        </div>

        {isAtRisk && (
          <div className="flex items-start gap-2 mt-4 p-3 rounded-lg bg-warning/10 border border-warning/20">
            <AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-warning">تنبيه</p>
              <p className="text-muted-foreground">
                تحتاج إلى حضور {remainingToThreshold} حصة إضافية للوصول إلى الحد
                الأدنى المطلوب
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
