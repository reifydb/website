import { ExecutableSnippet } from '@/components/ui/executable-snippet';
import type { TourStep } from './tour-data';

interface TourStepProps {
  step: TourStep;
}

export function TourStepView({ step }: TourStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-3 text-text-primary font-mono">
          {step.title}
        </h1>
        <div className="text-sm text-text-secondary leading-relaxed">
          {step.description}
        </div>
      </div>

      {step.before && (
        <div>{step.before}</div>
      )}

      <ExecutableSnippet
        initialCode={step.code}
        title={`tour: ${step.id}`}
      />

      {step.after && (
        <div>{step.after}</div>
      )}
    </div>
  );
}
