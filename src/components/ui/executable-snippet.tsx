import { Loader2 } from 'lucide-react';
import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { useMounted } from '@/hooks';

/** Matches the live Monaco editor's rendered line-height at the console package's fixed 13px font size. */
const MONACO_LINE_HEIGHT_PX = 18;
const MONACO_BODY_VERTICAL_PADDING_PX = 34;

const ExecutableSnippetLive = lazy(() => import('./executable-snippet-live'));

interface ExecutableSnippetProps {
  initialCode: string;
  title?: string;
  description?: string;
  className?: string;
  readonly?: boolean;
  /** Render an editor-shaped skeleton and load the live editor during browser idle time, instead of on mount. */
  deferLoad?: boolean;
}

function StaticSnippet({
  initialCode,
  title,
  description,
}: Omit<ExecutableSnippetProps, 'className' | 'readonly' | 'deferLoad'>) {
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

function EditorSkeleton({
  initialCode,
  title,
  description,
}: Omit<ExecutableSnippetProps, 'className' | 'readonly' | 'deferLoad'>) {
  const lineCount = initialCode.split('\n').length;
  return (
    <div className="border border-border-default rounded-lg bg-code-bg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border-default bg-code-bg-elevated">
        <div>
          {title && (
            <div className="text-xs font-medium text-code-text-muted uppercase tracking-wider">
              {title}
            </div>
          )}
          {description && <p className="mt-1 text-xs text-code-text-muted">{description}</p>}
        </div>
        <div className="flex items-center gap-2">
          <div className="h-5 w-12 rounded bg-code-text-muted/20 animate-pulse" />
          <div className="h-5 w-12 rounded bg-code-text-muted/20 animate-pulse" />
          <div className="h-5 w-12 rounded bg-code-text-muted/20 animate-pulse" />
        </div>
      </div>
      <div
        className="flex items-center justify-center"
        style={{ height: `${lineCount * MONACO_LINE_HEIGHT_PX + MONACO_BODY_VERTICAL_PADDING_PX}px` }}
      >
        <Loader2 className="h-6 w-6 animate-spin text-code-text-muted" />
      </div>
      <div className="flex items-center justify-between px-4 py-2 border-t border-border-default bg-code-bg-elevated">
        <span className="text-xs text-code-text-muted">ctrl+enter to run</span>
        <div className="h-7 w-16 rounded bg-primary/30 animate-pulse" />
      </div>
    </div>
  );
}

function useIdleReady(enabled: boolean): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const ric = window.requestIdleCallback ?? ((cb: IdleRequestCallback) => setTimeout(cb, 1));
    const cic = window.cancelIdleCallback ?? clearTimeout;
    const id = ric(() => setReady(true));
    return () => cic(id as never);
  }, [enabled]);

  return ready;
}

function useMonacoPainted(containerRef: React.RefObject<HTMLDivElement | null>, active: boolean): boolean {
  const [painted, setPainted] = useState(false);

  useEffect(() => {
    if (!active) return;
    const el = containerRef.current;
    if (!el || el.querySelector('.monaco-editor')) {
      setPainted(true);
      return;
    }
    const observer = new MutationObserver(() => {
      if (el.querySelector('.monaco-editor')) {
        setPainted(true);
        observer.disconnect();
      }
    });
    observer.observe(el, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [active, containerRef]);

  return painted;
}

export function ExecutableSnippet({ className, deferLoad = false, ...props }: ExecutableSnippetProps) {
  const mounted = useMounted();
  const idleReady = useIdleReady(deferLoad);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldLoadLive = deferLoad ? idleReady : mounted;
  const livePainted = useMonacoPainted(containerRef, shouldLoadLive);
  const wrapperClass = className ? `my-10 ${className}` : 'my-10';

  if (!deferLoad) {
    const staticSnippet = <StaticSnippet {...props} />;
    return (
      <div className={wrapperClass}>
        {shouldLoadLive ? (
          <Suspense fallback={staticSnippet}>
            <ExecutableSnippetLive {...props} />
          </Suspense>
        ) : (
          staticSnippet
        )}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative ${wrapperClass}`}>
      <div className={livePainted ? '' : 'invisible absolute inset-0'}>
        {shouldLoadLive && (
          <Suspense fallback={null}>
            <ExecutableSnippetLive {...props} />
          </Suspense>
        )}
      </div>
      <div className={livePainted ? 'invisible absolute inset-0' : ''}>
        <EditorSkeleton {...props} />
      </div>
    </div>
  );
}
