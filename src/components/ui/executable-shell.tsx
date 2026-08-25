import { Loader2 } from 'lucide-react';
import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { useMounted } from '@/hooks';
import { cn } from '@/lib';

const ExecutableShellLive = lazy(() => import('./executable-shell-live'));

interface ExecutableShellProps {
  className?: string;
  /** Render a terminal-shaped skeleton and load xterm during browser idle time, instead of on mount. */
  deferLoad?: boolean;
}

function ShellSkeleton() {
  return (
    <div className="shell-surface flex flex-col justify-center gap-3 px-4 font-mono text-sm">
      <div className="flex items-center gap-2 text-gray-500">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="text-xs">Booting the database in this tab...</span>
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

function useTerminalPainted(containerRef: React.RefObject<HTMLDivElement | null>, active: boolean): boolean {
  const [painted, setPainted] = useState(false);

  useEffect(() => {
    if (!active) return;
    const el = containerRef.current;
    if (!el) return;

    const check = () => {
      if (!el.querySelector('.xterm-screen')) return false;
      setPainted(true);
      return true;
    };

    const observer = new MutationObserver(() => {
      if (check()) observer.disconnect();
    });
    observer.observe(el, { childList: true, subtree: true });
    queueMicrotask(() => {
      if (check()) observer.disconnect();
    });

    return () => observer.disconnect();
  }, [active, containerRef]);

  return painted;
}

export function ExecutableShell({ className, deferLoad = false }: ExecutableShellProps) {
  const mounted = useMounted();
  const idleReady = useIdleReady(deferLoad);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldLoadLive = deferLoad ? idleReady : mounted;
  const painted = useTerminalPainted(containerRef, shouldLoadLive);

  return (
    <div ref={containerRef} className={cn('shell-frame relative', className)}>
      <div className={cn('shell-surface', !painted && 'invisible absolute inset-0')}>
        {shouldLoadLive && (
          <Suspense fallback={null}>
            <ExecutableShellLive />
          </Suspense>
        )}
      </div>
      <div className={cn('shell-surface', painted && 'invisible absolute inset-0')}>
        <ShellSkeleton />
      </div>
    </div>
  );
}
