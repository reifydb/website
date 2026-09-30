import type { ReactNode } from 'react';

export function Prose({ children }: { children: ReactNode }) {
  return <div className="space-y-3 text-sm text-text-secondary leading-relaxed">{children}</div>;
}

export function Kw({ children }: { children: ReactNode }) {
  return (
    <code className="text-xs bg-black/5 px-1.5 py-0.5 font-mono text-primary">{children}</code>
  );
}
