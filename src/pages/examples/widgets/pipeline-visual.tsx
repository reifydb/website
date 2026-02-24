import { cn } from '@/lib';

interface PipelineStep {
  label: string;
  description: string;
}

interface PipelineVisualProps {
  steps: PipelineStep[];
  className?: string;
}

export function PipelineVisual({ steps, className }: PipelineVisualProps) {
  return (
    <div className={cn('flex flex-col gap-0', className)}>
      {steps.map((step, i) => (
        <div key={step.label} className="flex items-stretch gap-3">
          {/* Vertical connector line + dot */}
          <div className="flex flex-col items-center w-5 shrink-0">
            <div
              className={cn(
                'w-2.5 h-2.5 rounded-full border-2 shrink-0 mt-3',
                i === 0
                  ? 'border-primary bg-primary'
                  : 'border-primary/60 bg-primary/20'
              )}
            />
            {i < steps.length - 1 && (
              <div className="w-px flex-1 bg-primary/20" />
            )}
          </div>

          {/* Step content */}
          <div className="pb-4 pt-1.5">
            <span className="font-mono text-xs font-semibold text-primary">
              {step.label}
            </span>
            <p className="text-xs text-text-muted mt-0.5">
              {step.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
