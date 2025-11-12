import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  gradient?: boolean;
}

export const MetricCard = ({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  gradient = false,
}: MetricCardProps) => {
  return (
    <Card 
      className={cn(
        "p-6 transition-all duration-300 hover:shadow-lg",
        gradient && "bg-gradient-primary text-white border-0"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className={cn(
            "text-sm font-medium mb-2",
            gradient ? "text-white/80" : "text-muted-foreground"
          )}>
            {title}
          </p>
          <h3 className={cn(
            "text-3xl font-bold mb-2",
            gradient ? "text-white" : "text-foreground"
          )}>
            {value}
          </h3>
          <p className={cn(
            "text-sm font-medium",
            gradient ? "text-white/90" : 
            changeType === "positive" ? "text-success" :
            changeType === "negative" ? "text-destructive" :
            "text-muted-foreground"
          )}>
            {change}
          </p>
        </div>
        <div className={cn(
          "p-3 rounded-lg",
          gradient ? "bg-white/20" : "bg-primary/10"
        )}>
          <Icon className={cn(
            "w-6 h-6",
            gradient ? "text-white" : "text-primary"
          )} />
        </div>
      </div>
    </Card>
  );
};
