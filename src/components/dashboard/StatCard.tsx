import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    label: string;
    positive?: boolean;
  };
  variant?: "default" | "primary" | "success" | "warning" | "danger";
  className?: string;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  variant = "default",
  className,
}: StatCardProps) {
  const variantStyles = {
    default: "bg-card",
    primary: "bg-primary/5 border-primary/20",
    success: "bg-success/5 border-success/20",
    warning: "bg-warning/5 border-warning/20",
    danger: "bg-destructive/5 border-destructive/20",
  };

  const iconStyles = {
    default: "bg-muted text-muted-foreground",
    primary: "bg-primary/10 text-primary",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    danger: "bg-destructive/10 text-destructive",
  };

  return (
    <div
      className={cn(
        "stat-card border rounded-xl transition-all hover:shadow-sm",
        variantStyles[variant],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="stat-label">{title}</p>
          <p className="stat-value">{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {icon && (
          <div
            className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
              iconStyles[variant]
            )}
          >
            {icon}
          </div>
        )}
      </div>
      
      {trend && (
        <div className="flex items-center gap-1 mt-3 pt-3 border-t border-border">
          <span
            className={cn(
              "text-xs font-medium",
              trend.positive ? "text-success" : "text-destructive"
            )}
          >
            {trend.positive ? "+" : ""}{trend.value}%
          </span>
          <span className="text-xs text-muted-foreground">{trend.label}</span>
        </div>
      )}
    </div>
  );
}
