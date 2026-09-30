import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib';

const targets = [
  { id: 'rust', label: 'Rust', command: 'cargo add reifydb' },
  { id: 'typescript', label: 'TypeScript', command: 'pnpm add @reifydb/client' },
] as const;

export function InstallCommand({ className }: { className?: string }) {
  const [active, setActive] = useState<(typeof targets)[number]['id']>('rust');
  const [copied, setCopied] = useState(false);
  const command = targets.find((t) => t.id === active)!.command;

  const copy = () => {
    navigator.clipboard.writeText(command).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  };

  return (
    <div className={cn('inline-flex flex-col gap-2', className)}>
      <div className="flex items-center gap-4 justify-start">
        {targets.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActive(t.id)}
            className={cn(
              'text-xs label-uppercase transition-colors',
              active === t.id ? 'text-text-primary' : 'text-text-muted hover:text-text-primary'
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-3 border border-border-light bg-white shadow-soft px-4 py-3 font-mono text-sm">
        <span className="text-primary select-none">$</span>
        <code className="text-text-primary whitespace-nowrap">{command}</code>
        <button
          type="button"
          onClick={copy}
          aria-label="Copy install command"
          className="ml-auto text-text-muted hover:text-text-primary transition-colors"
        >
          {copied ? <Check size={16} className="text-status-success" /> : <Copy size={16} />}
        </button>
      </div>
    </div>
  );
}
