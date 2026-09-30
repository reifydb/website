import { cn } from '@/lib';

type CalloutVariant = 'info' | 'warning' | 'tip' | 'note';

interface CalloutProps {
  variant?: CalloutVariant;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const variantColors: Record<CalloutVariant, { frame: string; label: string }> = {
  info: { frame: '#4b52d6', label: '#4b52d6' },
  warning: { frame: '#e0a040', label: '#a8660f' },
  tip: { frame: '#2f9e6b', label: '#237a52' },
  note: { frame: '#c9c3dc', label: '#6b6785' },
};

const variantTitles: Record<CalloutVariant, string> = {
  info: 'Info',
  warning: 'Warning',
  tip: 'Tip',
  note: 'Note',
};

export function Callout({ variant = 'note', title, children, className }: CalloutProps) {
  const colors = variantColors[variant];

  return (
    <div
      className={cn('mt-6 border-2 px-5 py-4', className)}
      style={{ borderColor: colors.frame, backgroundColor: `${colors.frame}1f` }}
    >
      <div className="pixel-label uppercase mb-3" style={{ color: colors.label }}>
        {title || variantTitles[variant]}
      </div>
      <div className="text-text-secondary text-sm">{children}</div>
    </div>
  );
}
