import { ClipboardList, Clock, AlertCircle, ChevronLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface Task {
  id: string;
  title: string;
  moduleCode: string;
  dueDate: string;
  type: "quiz" | "assignment" | "practical";
  status: "pending" | "overdue" | "submitted";
}

interface TaskListProps {
  tasks: Task[];
  className?: string;
}

export function TaskList({ tasks, className }: TaskListProps) {
  const typeLabels = {
    quiz: "اختبار قصير",
    assignment: "واجب",
    practical: "مهمة عملية",
  };

  const statusStyles = {
    pending: "status-warning",
    overdue: "status-danger",
    submitted: "status-success",
  };

  const statusLabels = {
    pending: "قيد الانتظار",
    overdue: "متأخر",
    submitted: "تم التسليم",
  };

  const pendingTasks = tasks.filter((t) => t.status !== "submitted");

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <ClipboardList className="w-5 h-5 text-primary" />
            المهام المطلوبة
            {pendingTasks.length > 0 && (
              <Badge variant="secondary">{pendingTasks.length}</Badge>
            )}
          </CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/assignments" className="flex items-center gap-1">
              عرض الكل
              <ChevronLeft className="w-4 h-4 rtl-flip" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {tasks.length === 0 ? (
          <div className="empty-state py-8">
            <ClipboardList className="empty-state-icon" />
            <p className="empty-state-title">لا توجد مهام حالياً</p>
            <p className="empty-state-description">ستظهر المهام الجديدة هنا</p>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.slice(0, 5).map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                    task.status === "overdue"
                      ? "bg-destructive/10 text-destructive"
                      : "bg-primary/10 text-primary"
                  )}
                >
                  {task.status === "overdue" ? (
                    <AlertCircle className="w-5 h-5" />
                  ) : (
                    <ClipboardList className="w-5 h-5" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-[10px] px-1.5">
                      {task.moduleCode}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground">
                      {typeLabels[task.type]}
                    </span>
                  </div>
                  <p className="font-medium text-foreground truncate text-sm">
                    {task.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {task.dueDate}
                    </span>
                  </div>
                </div>
                <div className={cn("status-badge", statusStyles[task.status])}>
                  {statusLabels[task.status]}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
