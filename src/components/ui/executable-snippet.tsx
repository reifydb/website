import { Suspense, lazy } from 'react';
import { useMounted } from '@/hooks';

const ExecutableSnippetLive = lazy(() => import('./executable-snippet-live'));

interface ExecutableSnippetProps {
  initialCode: string;
  title?: string;
  description?: string;
  className?: string;
  readonly?: boolean;
}

function StaticSnippet({
  initialCode,
  title,
  description,
}: Omit<ExecutableSnippetProps, 'className' | 'readonly'>) {
  return (
    <div className="border border-border-default rounded-lg bg-code-bg overflow-hidden">
      {(title || description) && (
        <div className="px-4 py-2 border-b border-border-default bg-code-bg-elevated">
          {title && (
            <div className="text-xs font-medium text-code-text-muted uppercase tracking-wider">
              {title}
            </div>
          )}
          {description && <p className="mt-1 text-xs text-code-text-muted">{description}</p>}
        </div>
      )}
      <pre className="p-4 overflow-x-auto text-sm font-mono text-code-text">
        <code>{initialCode}</code>
      </pre>
    </div>
  );
}

export function ExecutableSnippet({ className, ...props }: ExecutableSnippetProps) {
  const mounted = useMounted();
  const staticSnippet = <StaticSnippet {...props} />;

  return (
    <div className={className}>
      {mounted ? (
        <Suspense fallback={staticSnippet}>
          <ExecutableSnippetLive {...props} />
        </Suspense>
      ) : (
        staticSnippet
      )}
    </div>
  );
}
