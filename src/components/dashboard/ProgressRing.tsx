import { cn } from "@/lib/utils";

interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  showLabel?: boolean;
  labelSuffix?: string;
  variant?: "default" | "success" | "warning" | "danger";
}

export function ProgressRing({
  progress,
  size = 80,
  strokeWidth = 6,
  className,
  showLabel = true,
  labelSuffix = "%",
  variant = "default",
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  const variantColors = {
    default: "stroke-primary",
    success: "stroke-success",
    warning: "stroke-warning",
    danger: "stroke-destructive",
  };

  const getVariant = () => {
    if (variant !== "default") return variant;
    if (progress >= 90) return "success";
    if (progress >= 70) return "default";
    if (progress >= 50) return "warning";
    return "danger";
  };

  const activeVariant = getVariant();

  return (
    <div className={cn("progress-ring", className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="fill-none stroke-muted"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={cn(
            "fill-none transition-all duration-500 ease-out",
            variantColors[activeVariant]
          )}
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold text-foreground">
            {Math.round(progress)}{labelSuffix}
          </span>
        </div>
      )}
    </div>
  );
}
