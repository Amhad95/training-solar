import { BookOpen, ChevronLeft, CheckCircle2, Circle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface ModuleProgressItem {
  id: string;
  code: string;
  name: string;
  progress: number;
  status: "not_started" | "in_progress" | "completed";
  grade?: number;
}

interface ModuleProgressProps {
  modules: ModuleProgressItem[];
  className?: string;
}

export function ModuleProgress({ modules, className }: ModuleProgressProps) {
  const statusIcons = {
    not_started: <Circle className="w-4 h-4 text-muted-foreground" />,
    in_progress: <Circle className="w-4 h-4 text-primary fill-primary/20" />,
    completed: <CheckCircle2 className="w-4 h-4 text-success" />,
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <BookOpen className="w-5 h-5 text-primary" />
            تقدم الوحدات
          </CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/courses" className="flex items-center gap-1">
              عرض الكل
              <ChevronLeft className="w-4 h-4 rtl-flip" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {modules.map((module) => (
            <div key={module.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {statusIcons[module.status]}
                  <span className="text-xs font-medium text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                    {module.code}
                  </span>
                  <span className="text-sm font-medium text-foreground truncate max-w-[200px]">
                    {module.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {module.grade !== undefined && (
                    <span className="text-xs font-medium text-muted-foreground">
                      {module.grade}%
                    </span>
                  )}
                  <span className="text-xs font-bold text-primary">
                    {module.progress}%
                  </span>
                </div>
              </div>
              <Progress 
                value={module.progress} 
                className={cn(
                  "h-2",
                  module.status === "completed" && "[&>div]:bg-success"
                )}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
