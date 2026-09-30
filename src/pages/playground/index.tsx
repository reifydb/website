import { Suspense, lazy, useState } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { PageMeta } from '@/components/page-meta';
import { useMounted } from '@/hooks';
import { playgroundExamples } from './playground.examples';

const PlaygroundConsole = lazy(() => import('./console'));

function ConsolePlaceholder() {
  return (
    <div className="h-full flex items-center justify-center bg-code-bg">
      <p className="text-sm text-code-text-muted">Loading the playground...</p>
    </div>
  );
}

export function PlaygroundPage() {
  const mounted = useMounted();
  const [activeId, setActiveId] = useState(playgroundExamples[0].id);
  const active = playgroundExamples.find((e) => e.id === activeId) ?? playgroundExamples[0];

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <PageMeta
        title="Playground | ReifyDB"
        description="Run RQL against a ReifyDB instance in your browser. No install, no signup - the database compiles to WebAssembly and executes locally."
      />
      <Navbar />

      <div className="border-b border-border-default bg-bg-secondary">
        <div className="px-4 sm:px-6 py-3 flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-6">
          <div className="flex items-baseline gap-3 shrink-0">
            <span className="font-mono text-xs label-uppercase text-text-primary font-bold">
              Playground
            </span>
            <span className="text-xs text-text-muted">
              The whole database compiled to WebAssembly, running in this tab. No server, no signup.
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 lg:ml-auto">
            {playgroundExamples.map((example) => (
              <button
                key={example.id}
                onClick={() => setActiveId(example.id)}
                className={`font-mono text-xs px-3 py-1.5 border transition-colors ${
                  example.id === activeId
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border-default text-text-secondary hover:border-primary/50 hover:text-text-primary'
                }`}
              >
                {example.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        {mounted ? (
          <Suspense fallback={<ConsolePlaceholder />}>
            <PlaygroundConsole code={active.code} />
          </Suspense>
        ) : (
          <ConsolePlaceholder />
        )}
      </div>
    </div>
  );
}
