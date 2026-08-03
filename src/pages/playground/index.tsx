import { Suspense, lazy } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { PageMeta } from '@/components/page-meta';
import { useMounted } from '@/hooks';

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

  return (
    <div className="min-h-screen flex flex-col">
      <PageMeta
        title="Playground | ReifyDB"
        description="Run RQL against a ReifyDB instance in your browser. No install, no signup - the database compiles to WebAssembly and executes locally."
      />
      <Navbar />
      <div style={{ height: 'calc(100vh - 60px)' }}>
        {mounted ? (
          <Suspense fallback={<ConsolePlaceholder />}>
            <PlaygroundConsole />
          </Suspense>
        ) : (
          <ConsolePlaceholder />
        )}
      </div>
    </div>
  );
}
