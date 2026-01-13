import { Calendar, Clock, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ScheduleItem {
  id: string;
  title: string;
  moduleCode: string;
  day: string;
  time: string;
  location?: string;
  type: "lecture" | "practical" | "assessment";
}

interface WeekScheduleProps {
  items: ScheduleItem[];
  className?: string;
}

export function WeekSchedule({ items, className }: WeekScheduleProps) {
  const typeStyles = {
    lecture: "bg-info/10 text-info border-info/20",
    practical: "bg-success/10 text-success border-success/20",
    assessment: "bg-warning/10 text-warning border-warning/20",
  };

  const typeLabels = {
    lecture: "محاضرة",
    practical: "تطبيق عملي",
    assessment: "تقييم",
  };

  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Calendar className="w-5 h-5 text-primary" />
          جدول هذا الأسبوع
        </CardTitle>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <div className="empty-state py-8">
            <Calendar className="empty-state-icon" />
            <p className="empty-state-title">لا توجد مواعيد هذا الأسبوع</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "flex items-start gap-3 p-3 rounded-lg border",
                  typeStyles[item.type]
                )}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary" className="text-[10px] px-1.5">
                      {item.moduleCode}
                    </Badge>
                    <Badge variant="outline" className="text-[10px] px-1.5">
                      {typeLabels[item.type]}
                    </Badge>
                  </div>
                  <p className="font-medium text-foreground truncate">{item.title}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {item.day} - {item.time}
                    </span>
                    {item.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {item.location}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
