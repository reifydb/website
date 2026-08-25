import type { ReactNode } from 'react';

export function Prose({ children }: { children: ReactNode }) {
  return <div className="space-y-3 text-sm text-text-secondary leading-relaxed">{children}</div>;
}

export function Kw({ children }: { children: ReactNode }) {
  return (
    <code className="text-xs bg-black/5 px-1.5 py-0.5 rounded font-mono text-primary">{children}</code>
  );
}

export function Outcome({ rows, note }: { rows: string; note: ReactNode }) {
  return (
    <div className="rounded-md border border-primary/25 bg-primary/[0.04] px-4 py-3 space-y-2">
      <div className="text-xs label-uppercase text-primary">What you should see</div>
      <pre className="font-mono text-xs text-text-primary overflow-x-auto">{rows}</pre>
      <p className="text-xs text-text-muted leading-relaxed">{note}</p>
    </div>
  );
}
