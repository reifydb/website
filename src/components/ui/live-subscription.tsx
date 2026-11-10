import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib';
import { wasmExecutor } from '@/lib/wasm-executor-singleton';
import { Button } from './button';
import { RqlHighlight } from './rql-highlight';
import { changesOf } from './live-subscription-changes';
import type { LiveChange, LiveRow } from './live-subscription-changes';

const LOG_SIZE = 6;
const POLL_MS = 500;

export interface LiveSubscriptionAction {
  label: string;
  primary?: boolean;
  onClick: () => void;
}

interface LiveSubscriptionProps {
  query: string;
  rowKey: string;
  columns: string[];
  actions?: LiveSubscriptionAction[];
  ready?: () => Promise<void>;
  onVisibleChange?: (visible: boolean) => void;
}

interface LogEntry {
  id: number;
  time: string;
  change: LiveChange;
}

interface State {
  rows: LiveRow[];
  changes: Map<string, LiveChange>;
  seq: number;
  log: LogEntry[];
}

const KIND: Record<LiveChange['kind'], string> = { insert: 'new row', update: 'changed', remove: 'left' };

const FLASH: Record<LiveChange['kind'], string | undefined> = {
  insert: 'example-live__flash--insert',
  update: 'example-live__flash--update',
  remove: undefined,
};

const th = 'px-4 py-1.5 text-left font-medium text-code-text-muted border-b border-border-default whitespace-nowrap';
const td = 'px-4 py-1 whitespace-nowrap';

function cell(value: unknown): string {
  const n = Number(value);
  return Number.isFinite(n) && !Number.isInteger(n) ? n.toFixed(2) : String(value);
}

function detail(change: LiveChange, rowKey: string, columns: string[]): string {
  if (change.kind === 'remove') return 'no longer in the result';
  if (change.kind === 'insert') {
    return columns
      .filter((column) => column !== rowKey)
      .map((column) => `${column} ${cell(change.row[column])}`)
      .join('  ');
  }
  return change.cells.map(({ column, before, after }) => `${column} ${cell(before)} → ${cell(after)}`).join('  ');
}

function subscriptionOf(query: string): string {
  return `create subscription as {\n${query
    .split('\n')
    .map((line) => `  ${line}`)
    .join('\n')}\n}`;
}

function Label({ children }: { children: string }) {
  return <div className="px-4 pt-4 pb-2 text-xs font-medium text-code-text-muted uppercase tracking-wider">{children}</div>;
}

export function LiveSubscription({ query, rowKey, columns, actions, ready, onVisibleChange }: LiveSubscriptionProps) {
  const [state, setState] = useState<State | null>(null);
  const [failure, setFailure] = useState<Error | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const visibleChangeRef = useRef(onVisibleChange);
  const readyRef = useRef(ready);

  useEffect(() => {
    visibleChangeRef.current = onVisibleChange;
    readyRef.current = ready;
  }, [onVisibleChange, ready]);

  useEffect(() => {
    let visible = false;
    let previous: LiveRow[] | null = null;
    let previousKey = '';
    let seq = 0;
    let entry = 0;
    let busy = false;
    let prepared = false;

    const poll = async () => {
      if (busy || !visible || document.hidden) return;
      busy = true;
      try {
        if (!prepared) {
          await readyRef.current?.();
          prepared = true;
        }
        const result = await wasmExecutor.execute(query);
        if (!result.success) throw new Error(`live subscription failed on "${query}": ${result.error}`);
        const rows = (result.data ?? []) as LiveRow[];
        const key = JSON.stringify(rows);
        if (key === previousKey) return;
        previousKey = key;
        const changes = changesOf(previous, rows, rowKey, columns);
        previous = rows;
        seq += 1;
        const time = new Date().toLocaleTimeString('en-GB');
        const fresh = changes.map((change) => ({ id: ++entry, time, change }));
        setState((old) => ({
          rows,
          changes: new Map(changes.map((change) => [change.key, change])),
          seq,
          log: [...fresh.reverse(), ...(old?.log ?? [])].slice(0, LOG_SIZE),
        }));
      } catch (error) {
        setFailure(error as Error);
      } finally {
        busy = false;
      }
    };

    const observer = new IntersectionObserver(([entryEvent]) => {
      visible = entryEvent.isIntersecting;
      visibleChangeRef.current?.(visible);
      void poll();
    });
    observer.observe(panelRef.current!);
    const timer = window.setInterval(() => void poll(), POLL_MS);
    return () => {
      observer.disconnect();
      window.clearInterval(timer);
      if (visible) visibleChangeRef.current?.(false);
    };
  }, [query, rowKey, columns]);

  if (failure) throw failure;

  return (
    <div ref={panelRef} className="border-2 border-[#4b52d6] bg-code-bg shadow-[0_4px_var(--color-primary-dark)] overflow-hidden">
      <div className="px-4 py-2 border-b border-border-default bg-code-bg-elevated font-mono text-sm text-code-text-muted">
        Live subscription
      </div>

      <RqlHighlight code={subscriptionOf(query)} className="px-4 py-2 border-b border-border-default bg-white font-mono text-[13px] leading-5 overflow-x-auto" />

      {state ? (
        <>
          <Label>{`What your app holds · ${state.rows.length} rows`}</Label>
          <div className="overflow-x-auto">
            <table className="w-full font-mono text-sm tabular-nums">
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th key={column} className={th}>
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {state.rows.map((row) => {
                  const id = String(row[rowKey]);
                  const change = state.changes.get(id);
                  const changed = new Set(change?.cells.map((c) => c.column));
                  return (
                    <tr key={change ? `${id}-${state.seq}` : id} className={cn(change?.kind === 'insert' && FLASH.insert)}>
                      {columns.map((column) => (
                        <td key={column} className={cn(td, 'text-code-text', changed.has(column) && FLASH.update)}>
                          {cell(row[column])}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <Label>What arrived · newest first</Label>
          <div className="overflow-x-auto pb-3">
            {state.log.length ? (
              <table className="w-full font-mono text-sm tabular-nums">
                <thead>
                  <tr>
                    <th className={th}>time</th>
                    <th className={th}>{rowKey}</th>
                    <th className={th}>change</th>
                    <th className={cn(th, 'w-full')}>values</th>
                  </tr>
                </thead>
                <tbody>
                  {state.log.map(({ id, time, change }) => (
                    <tr key={id} className={cn(FLASH[change.kind], change.kind === 'remove' ? 'text-code-text-muted' : 'text-code-text')}>
                      <td className={cn(td, 'text-code-text-muted')}>{time}</td>
                      <td className={td}>{change.key}</td>
                      <td className={td}>{KIND[change.kind]}</td>
                      <td className={td}>{detail(change, rowKey, columns)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="px-4 text-sm text-code-text-muted">Nothing yet. The next change shows up here.</p>
            )}
          </div>
        </>
      ) : (
        <p className="px-4 py-4 text-sm text-code-text-muted">Waiting for the first read...</p>
      )}

      {actions?.length ? (
        <div className="flex flex-wrap gap-2 px-4 py-3 border-t border-border-default">
          {actions.map(({ label, primary, onClick }) => (
            <Button key={label} type="button" variant={primary ? undefined : 'secondary'} onClick={onClick}>
              {label}
            </Button>
          ))}
        </div>
      ) : null}

      <div className="px-4 py-2 border-t border-border-default bg-code-bg-elevated font-mono text-xs text-code-text-muted">
        On a server this arrives as a push; in this tab we re-read it every half second
      </div>
    </div>
  );
}
