import type { ReactNode } from 'react';
import { cn } from '@/lib';

interface WindowFrameProps {
  label: string;
  children: ReactNode;
  className?: string;
}

export function WindowFrame({ label, children, className }: WindowFrameProps) {
  return (
    <div className={cn('rounded-lg overflow-hidden bg-bg-secondary', className)}>
      <div className="flex items-center gap-2 px-4 py-3 bg-bg-tertiary border-b border-border-light">
        <span className="w-3 h-3 rounded-full bg-status-error/70" />
        <span className="w-3 h-3 rounded-full bg-status-warning/70" />
        <span className="w-3 h-3 rounded-full bg-status-success/70" />
        <span className="ml-3 font-mono text-xs text-text-muted truncate">{label}</span>
      </div>
      <div className="window-body-flush">{children}</div>
    </div>
  );
}
