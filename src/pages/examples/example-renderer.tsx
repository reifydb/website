import { ExecutableSnippet } from '@/components/ui';
import { PipelineVisual } from './widgets/pipeline-visual';
import type { ExampleSection } from './sections';

interface ExampleRendererProps {
  section: ExampleSection;
}

export function ExampleRenderer({ section }: ExampleRendererProps) {
  const { pipeline, steps } = section;
  const numbered = steps.length > 1;

  return (
    <div className="mt-8 space-y-8">
      <div className="rounded-lg border border-border-default bg-bg-secondary px-5 py-4">
        <h2 className="text-xs label-uppercase text-text-muted mb-3">What happens</h2>
        <PipelineVisual steps={pipeline} />
      </div>

      <ol className="space-y-8">
        {steps.map((step, index) => (
          <li
            key={step.example.id}
            className="grid grid-cols-[1.75rem_minmax(0,1fr)] gap-x-4 sm:grid-cols-[2rem_minmax(0,1fr)]"
          >
            <div className="flex flex-col items-center">
              {numbered ? (
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary font-mono text-xs font-bold text-white">
                  {index + 1}
                </span>
              ) : (
                <span className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />
              )}
              {index < steps.length - 1 && <div className="mt-2 w-px flex-1 bg-border-default" />}
            </div>

            <div className="min-w-0 space-y-4 pb-2">
              <h3 className="text-base font-semibold tracking-tight">{step.title}</h3>
              {step.body}
              <ExecutableSnippet
                initialCode={step.example.code}
                title={step.example.title}
                description={step.example.description}
              />
              {step.outcome}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
