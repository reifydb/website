import { cn } from '@/lib';

interface AsciiDiagramProps {
  children: string;
  label?: string;
  className?: string;
}

export function AsciiDiagram({ children, label, className }: AsciiDiagramProps) {
  return (
    <div className={cn('glass-card overflow-x-auto', className)}>
      {label && (
        <div className="px-4 py-2 border-b-2 border-border-default bg-bg-tertiary">
          <span className="label-uppercase text-xs text-text-muted">{label}</span>
        </div>
      )}
      <pre className="px-4 py-4 text-xs sm:text-sm leading-relaxed text-text-secondary font-mono whitespace-pre">
        {children.trim()}
      </pre>
    </div>
  );
}
