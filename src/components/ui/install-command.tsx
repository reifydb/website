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
      <div className="flex items-center gap-4 justify-center lg:justify-start">
        {targets.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActive(t.id)}
            className={cn(
              'text-xs label-uppercase transition-colors',
              active === t.id ? 'text-white' : 'text-white/40 hover:text-white/70'
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-3 rounded-md border border-white/15 bg-white/5 px-4 py-3 font-mono text-sm">
        <span className="text-primary select-none">$</span>
        <code className="text-white/90 whitespace-nowrap">{command}</code>
        <button
          type="button"
          onClick={copy}
          aria-label="Copy install command"
          className="ml-auto text-white/40 hover:text-white transition-colors"
        >
          {copied ? <Check size={16} className="text-status-success" /> : <Copy size={16} />}
        </button>
      </div>
    </div>
  );
}
