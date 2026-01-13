import { Award, CheckCircle2, Circle, ChevronLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface CompetencyOverviewProps {
  totalCompetencies: number;
  achievedCompetencies: number;
  className?: string;
}

export function CompetencyOverview({
  totalCompetencies,
  achievedCompetencies,
  className,
}: CompetencyOverviewProps) {
  const percentage = Math.round((achievedCompetencies / totalCompetencies) * 100);

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Award className="w-5 h-5 text-primary" />
            الكفايات
          </CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/competencies" className="flex items-center gap-1">
              التفاصيل
              <ChevronLeft className="w-4 h-4 rtl-flip" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {achievedCompetencies}/{totalCompetencies}
                </p>
                <p className="text-sm text-muted-foreground">كفاية محققة</p>
              </div>
            </div>
            <div className="text-left">
              <p className="text-3xl font-bold text-primary">{percentage}%</p>
              <p className="text-xs text-muted-foreground">مكتمل</p>
            </div>
          </div>

          <Progress value={percentage} className="h-3" />

          <div className="flex items-center justify-between text-sm text-muted-foreground pt-2">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-success" />
              {achievedCompetencies} محققة
            </span>
            <span className="flex items-center gap-1.5">
              <Circle className="w-4 h-4" />
              {totalCompetencies - achievedCompetencies} متبقية
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
