import { Maximize2, Minimize2 } from 'lucide-react';
import type { ReactNode } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { cn } from '@/lib';

interface PanelFrameProps {
  label: string;
  fullscreen?: boolean;
  children: ReactNode;
  className?: string;
}

export function PanelFrame({ label, fullscreen = false, children, className }: PanelFrameProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = useCallback(() => setIsFullscreen((open) => !open), []);

  useEffect(() => {
    if (!isFullscreen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsFullscreen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isFullscreen]);

  return (
    <div className={cn('panel-frame rounded-lg overflow-hidden bg-gray-900', isFullscreen && 'panel-frame--fullscreen', className)}>
      <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-800 border-b border-white/10">
        <span className="font-mono text-xs font-semibold tracking-[1.4px] text-white/70">{label}</span>
        {fullscreen && (
          <button
            type="button"
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Exit fullscreen (Esc)' : 'Fullscreen'}
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            className="ml-auto text-white/40 hover:text-white transition-colors"
          >
            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
        )}
      </div>
      <div className="panel-frame__body window-body-flush">{children}</div>
    </div>
  );
}
