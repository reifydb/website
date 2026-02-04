import { Info, AlertTriangle, Lightbulb, FileText } from 'lucide-react';
import { cn } from '@/lib';

type CalloutVariant = 'info' | 'warning' | 'tip' | 'note';

interface CalloutProps {
  variant?: CalloutVariant;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<CalloutVariant, { border: string; bg: string; icon: string }> = {
  info: {
    border: 'border-feature-blue/50',
    bg: 'bg-feature-blue/10',
    icon: 'text-feature-blue',
  },
  warning: {
    border: 'border-status-warning/50',
    bg: 'bg-status-warning/10',
    icon: 'text-status-warning',
  },
  tip: {
    border: 'border-status-success/50',
    bg: 'bg-status-success/10',
    icon: 'text-status-success',
  },
  note: {
    border: 'border-white/10',
    bg: 'bg-bg-tertiary',
    icon: 'text-text-muted',
  },
};

const variantIcons: Record<CalloutVariant, React.ElementType> = {
  info: Info,
  warning: AlertTriangle,
  tip: Lightbulb,
  note: FileText,
};

const variantTitles: Record<CalloutVariant, string> = {
  info: 'Info',
  warning: 'Warning',
  tip: 'Tip',
  note: 'Note',
};

export function Callout({ variant = 'note', title, children, className }: CalloutProps) {
  const styles = variantStyles[variant];
  const Icon = variantIcons[variant];
  const defaultTitle = variantTitles[variant];

  return (
    <div
      className={cn(
        'border border-l-4 rounded-lg p-4',
        styles.border,
        styles.bg,
        className
      )}
    >
      <div className="flex gap-3">
        <Icon className={cn('w-5 h-5 flex-shrink-0 mt-0.5', styles.icon)} />
        <div>
          <strong className="text-text-primary font-semibold uppercase text-sm tracking-wider">
            {title || defaultTitle}
          </strong>
          <div className="text-text-secondary text-sm mt-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
