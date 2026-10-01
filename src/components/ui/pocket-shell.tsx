import { Loader2, Maximize2, X } from 'lucide-react';
import { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react';
import type { Shell } from '@reifydb/shell';
import { useMounted } from '@/hooks';
import { cn } from '@/lib';

const PocketShellLive = lazy(() => import('./pocket-shell-live'));

interface PocketShellProps {
  className?: string;
  /** Render a terminal-shaped skeleton and load xterm during browser idle time, instead of on mount. */
  deferLoad?: boolean;
}

function ShellSkeleton() {
  return (
    <div className="pocket__boot">
      <Loader2 className="h-4 w-4 animate-spin" />
      <span>Booting the database in this tab...</span>
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

export function PocketShell({ className, deferLoad = false }: PocketShellProps) {
  const mounted = useMounted();
  const idleReady = useIdleReady(deferLoad);
  const slotRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldLoadLive = deferLoad ? idleReady : mounted;
  const painted = useTerminalPainted(containerRef, shouldLoadLive);
  const [shell, setShell] = useState<Shell | null>(null);
  const [full, setFull] = useState(false);
  const [slotHeight, setSlotHeight] = useState<number>();

  const handleFullscreenChange = useCallback((next: boolean) => {
    if (next) setSlotHeight(slotRef.current?.offsetHeight);
    setFull(next);
  }, []);

  useEffect(() => {
    if (!full || !shell) return;
    const root = document.documentElement;
    const overflow = root.style.overflow;
    root.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') shell.exitFullscreen();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      root.style.overflow = overflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [full, shell]);

  return (
    <div ref={slotRef} className={className} style={full ? { height: slotHeight } : undefined}>
      {full && <div className="pocket__backdrop" />}
      <div className={cn('pocket', full && 'pocket--full')}>
        <div className="pocket__bezel">
          <div className="pocket__bezel-top">
            <span className="pocket__led" />
            POWER
            <button
              type="button"
              className="pocket__toggle"
              aria-label={full ? 'Exit full screen' : 'Full screen'}
              disabled={!shell}
              onClick={() => (full ? shell?.exitFullscreen() : shell?.enterFullscreen())}
            >
              {full ? <X className="h-3 w-3" /> : <Maximize2 className="h-3 w-3" />}
            </button>
          </div>
          <div ref={containerRef} className="pocket__screen">
            <div className={cn('pocket__surface', !painted && 'invisible absolute inset-0')}>
              {shouldLoadLive && (
                <Suspense fallback={null}>
                  <PocketShellLive onReady={setShell} onFullscreenChange={handleFullscreenChange} />
                </Suspense>
              )}
            </div>
            <div className={cn('pocket__surface', painted && 'invisible absolute inset-0')}>
              <ShellSkeleton />
            </div>
          </div>
        </div>
        <div className="pocket__pad">
          <span className="pocket__maker">RQL POCKET</span>
          <div className="pocket__buttons">
            <button type="button" className="pocket__button" disabled={!shell} onClick={() => shell?.clear()}>
              CLEAR
            </button>
            <button type="button" className="pocket__button" disabled={!shell} onClick={() => void shell?.run()}>
              RUN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
