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
    border: 'border-[#61AFEF]',
    bg: 'bg-[#61AFEF]/10',
    icon: 'text-[#61AFEF]',
  },
  warning: {
    border: 'border-[#E5C07B]',
    bg: 'bg-[#E5C07B]/10',
    icon: 'text-[#E5C07B]',
  },
  tip: {
    border: 'border-[#34D399]',
    bg: 'bg-[#34D399]/10',
    icon: 'text-[#34D399]',
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
        'border-2 border-l-4 p-4',
        styles.border,
        styles.bg,
        className
      )}
    >
      <div className="flex gap-3">
        <Icon className={cn('w-5 h-5 flex-shrink-0 mt-0.5', styles.icon)} />
        <div>
          <strong className="text-text-primary font-bold uppercase text-sm tracking-wider">
            {title || defaultTitle}
          </strong>
          <div className="text-text-secondary text-sm mt-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
