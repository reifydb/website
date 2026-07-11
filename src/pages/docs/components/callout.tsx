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
    border: 'border-primary/50',
    bg: 'bg-primary/10',
    icon: 'text-primary',
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
    border: 'border-border-default',
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
        'mt-6 border rounded-md overflow-hidden',
        styles.border,
        className
      )}
    >
      <div className={cn('flex items-center gap-2 px-4 py-2.5 border-b', styles.border, styles.bg)}>
        <Icon className={cn('w-4 h-4 flex-shrink-0', styles.icon)} />
        <strong className="text-text-primary font-semibold text-sm">
          {title || defaultTitle}
        </strong>
      </div>
      <div className="px-4 py-3 text-text-secondary text-sm">{children}</div>
    </div>
  );
}
