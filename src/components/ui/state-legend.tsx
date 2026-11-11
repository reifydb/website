import { cn } from '@/lib';

export type StateKind = 'insert' | 'update' | 'delete';

const STATES: Record<StateKind, { label: string; swatch: string }> = {
  insert: { label: 'inserted', swatch: 'bg-[var(--color-state-insert,#fafd6f)]' },
  update: { label: 'updated', swatch: 'bg-[var(--color-state-update,#a9e5f2)]' },
  delete: { label: 'deleted', swatch: 'bg-[var(--color-state-delete,#eb4fc0)]' },
};

export function StateLegend({ states, className }: { states: StateKind[]; className?: string }) {
  return (
    <ul className={cn('flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] font-medium uppercase tracking-wider text-code-text-muted', className)}>
      {states.map((state) => (
        <li key={state} className="flex items-center gap-1.5">
          <span aria-hidden="true" className={cn('size-2.5 rounded-sm border border-black/10', STATES[state].swatch)} />
          {STATES[state].label}
        </li>
      ))}
    </ul>
  );
}
