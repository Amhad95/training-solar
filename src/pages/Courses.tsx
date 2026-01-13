import { BookOpen, Clock, CheckCircle2, Lock, ChevronLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { DEFAULT_MODULES } from "@/lib/constants";

// Sample course data
const courses = DEFAULT_MODULES.map((module, index) => ({
  id: module.code,
  code: module.code,
  name: module.name,
  type: module.type,
  progress: index < 2 ? 100 : index === 2 ? 65 : 0,
  status: index < 2 ? "completed" : index === 2 ? "in_progress" : index === 3 ? "available" : "locked",
  weeksCount: index < 2 ? 1 : module.type === "core" ? 4 : 2,
  currentWeek: index < 2 ? 1 : index === 2 ? 3 : 0,
  grade: index < 3 ? (95 - index * 8) : undefined,
}));

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

export default function Courses() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">المقررات</h1>
        <p className="text-muted-foreground">الدُفعة التجريبية 01 - 11 وحدة تدريبية</p>
      </div>

      {/* Course grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => {
          const isLocked = course.status === "locked";
          const isCompleted = course.status === "completed";
          const isInProgress = course.status === "in_progress";

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
                    className={cn("text-[10px]", typeColors[course.type])}
                  >
                    {typeLabels[course.type]}
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
                </div>
              </div>

              <h3 className="module-card-title mb-3">{course.name}</h3>

              {/* Progress */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">التقدم</span>
                  <span className="font-medium text-foreground">
                    {course.progress}%
                  </span>
                </div>
                <Progress
                  value={course.progress}
                  className={cn(
                    "h-2",
                    isCompleted && "[&>div]:bg-success"
                  )}
                />
              </div>

              {/* Meta info */}
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {course.weeksCount} أسابيع
                </span>
                {course.grade !== undefined && (
                  <span className="font-medium text-foreground">
                    الدرجة: {course.grade}%
                  </span>
                )}
                {isInProgress && (
                  <span className="text-primary font-medium">
                    الأسبوع {course.currentWeek}
                  </span>
                )}
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
                    {isCompleted ? "مراجعة" : "متابعة"}
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
