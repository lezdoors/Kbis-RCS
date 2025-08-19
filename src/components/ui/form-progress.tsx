import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface FormProgressProps {
  current: number;
  total: number;
  className?: string;
}

export const FormProgress = ({ current, total, className }: FormProgressProps) => {
  const percentage = Math.round((current / total) * 100);
  
  return (
    <div className={cn("w-full space-y-2", className)}>
      <div className="flex items-center justify-between text-sm">
        <span className="text-[hsl(var(--text-secondary))]">
          Étape {current} sur {total}
        </span>
        <span 
          className="font-medium text-[hsl(var(--brand-primary))]"
          aria-label={`Progression: ${percentage} pour cent`}
        >
          {percentage}%
        </span>
      </div>
      <Progress 
        value={percentage} 
        className="h-2 bg-[hsl(var(--bg-section))]"
        aria-label={`Progression du formulaire: ${percentage} pour cent complété`}
      />
    </div>
  );
};