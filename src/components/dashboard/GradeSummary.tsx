import { GraduationCap, TrendingUp, TrendingDown, ChevronLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface ModuleGrade {
  code: string;
  name: string;
  grade: number;
  passing: number;
}

interface GradeSummaryProps {
  overallGrade: number;
  moduleGrades: ModuleGrade[];
  className?: string;
}

export function GradeSummary({
  overallGrade,
  moduleGrades,
  className,
}: GradeSummaryProps) {
  const getGradeColor = (grade: number, passing: number) => {
    if (grade >= passing + 20) return "text-success";
    if (grade >= passing) return "text-primary";
    return "text-destructive";
  };

  const getGradeLabel = (grade: number) => {
    if (grade >= 90) return "ممتاز";
    if (grade >= 80) return "جيد جداً";
    if (grade >= 70) return "جيد";
    if (grade >= 60) return "مقبول";
    return "ضعيف";
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <GraduationCap className="w-5 h-5 text-primary" />
            الدرجات
          </CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/grades" className="flex items-center gap-1">
              التفاصيل
              <ChevronLeft className="w-4 h-4 rtl-flip" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-border">
          <div
            className={cn(
              "w-16 h-16 rounded-xl flex items-center justify-center",
              overallGrade >= 60 ? "bg-success/10" : "bg-destructive/10"
            )}
          >
            <span
              className={cn(
                "text-2xl font-bold",
                overallGrade >= 60 ? "text-success" : "text-destructive"
              )}
            >
              {overallGrade}%
            </span>
          </div>
          <div>
            <p className="text-lg font-semibold text-foreground">
              {getGradeLabel(overallGrade)}
            </p>
            <p className="text-sm text-muted-foreground">المعدل التراكمي</p>
          </div>
        </div>

        <div className="space-y-3">
          {moduleGrades.slice(0, 4).map((module) => (
            <div
              key={module.code}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-xs font-medium text-muted-foreground bg-muted px-1.5 py-0.5 rounded shrink-0">
                  {module.code}
                </span>
                <span className="text-sm text-foreground truncate">
                  {module.name}
                </span>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                {module.grade >= module.passing ? (
                  <TrendingUp className="w-3.5 h-3.5 text-success" />
                ) : (
                  <TrendingDown className="w-3.5 h-3.5 text-destructive" />
                )}
                <span
                  className={cn(
                    "text-sm font-semibold",
                    getGradeColor(module.grade, module.passing)
                  )}
                >
                  {module.grade}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
