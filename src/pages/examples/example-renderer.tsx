import { Check } from 'lucide-react';
import { ExecutableSnippet } from '@/components/ui';
import { PipelineVisual } from './widgets/pipeline-visual';
import type { ExampleSection } from './sections';

interface ExampleRendererProps {
  section: ExampleSection;
}

const rowClass =
  'grid grid-cols-[1.75rem_minmax(0,1fr)] gap-x-4 sm:grid-cols-[2rem_minmax(0,1fr)]';

export function ExampleRenderer({ section }: ExampleRendererProps) {
  const { pipeline, steps, finish } = section;

  return (
    <div className="mt-8 space-y-8">
      <div className="rounded-lg border border-border-default bg-bg-secondary px-5 py-4">
        <h2 className="text-xs label-uppercase text-text-muted mb-3">What happens</h2>
        <PipelineVisual steps={pipeline} />
      </div>

      <ol>
        {steps.map((step, index) => (
          <li key={step.example.id} className={rowClass}>
            <div className="flex flex-col items-center">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary font-mono text-xs font-bold text-white">
                {index + 1}
              </span>
              <div className="mt-2 w-px flex-1 bg-border-default" />
            </div>

            <div className="min-w-0 space-y-4 pb-8">
              <h3 className="text-base font-semibold tracking-tight">{step.title}</h3>
              {step.body}
              <ExecutableSnippet
                initialCode={step.example.code}
                title={step.example.title}
                description={step.example.description}
              />
            </div>
          </li>
        ))}

        <li className={rowClass}>
          <div className="flex flex-col items-center">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-primary bg-bg-primary text-primary">
              <Check size={14} strokeWidth={3} />
            </span>
          </div>

          <div className="min-w-0">
            <h3 className="text-xs label-uppercase text-text-muted">What you now have</h3>
            <div className="mt-2 text-text-secondary leading-relaxed">{finish}</div>
          </div>
        </li>
      </ol>
    </div>
  );
}
