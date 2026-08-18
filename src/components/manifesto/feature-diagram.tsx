import { Fragment, type ReactNode } from 'react';
import { Badge } from '@reifydb/ui';

type Tone = 'muted' | 'primary';

const toneText: Record<Tone, string> = { muted: 'text-text-muted', primary: 'text-primary' };

const fanOut = [
  ['redis', 'drop cached balance'],
  ['queue', 'worker: totals'],
  ['cron', 'revenue, later'],
];

const inside = [
  ['policy', 'alice may place orders'],
  ['procedure', 'check balance, insert, debit'],
  ['view', 'revenue, updated by the same write'],
];

function Arrow({ note }: { note?: string }) {
  return (
    <div className="flex items-center gap-3 pl-3 py-1">
      <div className="flex flex-col items-center">
        <span className="block w-px h-4 bg-border-light" />
        <span className="block h-0 w-0 border-x-4 border-x-transparent border-t-[6px] border-t-border-light" />
      </div>
      {note && <span className="text-xs text-text-muted">{note}</span>}
    </div>
  );
}

function Actor({ name, note }: { name: string; note: string }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 px-1">
      <span className="font-mono text-sm font-bold text-text-primary">{name}</span>
      <span className="text-sm text-text-secondary">{note}</span>
    </div>
  );
}

function Node({ name, note, children }: { name: string; note: string; children?: ReactNode }) {
  return (
    <div className="rounded-md border border-border-light bg-bg-primary p-3">
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
        <span className="font-mono text-sm font-bold text-text-primary">{name}</span>
        <span className="text-sm text-text-secondary">{note}</span>
      </div>
      {children}
    </div>
  );
}

function Stats({ items, tone }: { items: string[]; tone: Tone }) {
  return (
    <div className={`mt-auto pt-4 flex flex-wrap gap-y-1 font-mono text-xs ${toneText[tone]}`}>
      {items.map((item, index) => (
        <span key={item} className={index === 0 ? '' : 'ml-3 pl-3 border-l border-border-light'}>
          {item}
        </span>
      ))}
    </div>
  );
}

function Column({ label, tone, children }: { label: string; tone: Tone; children: ReactNode }) {
  return (
    <div className="glass-card p-5 sm:p-6 flex flex-col">
      <div className={`font-mono text-xs label-uppercase mb-4 ${toneText[tone]}`}>{label}</div>
      {children}
    </div>
  );
}

export function FeatureDiagram() {
  return (
    <div className="grid md:grid-cols-2 gap-6 text-left">
      <Column label="Today" tone="muted">
        <Actor name="alice" note="POST /orders" />
        <Arrow />
        <Node name="api server" note="may alice? build the query" />
        <Arrow note='as "app", the one account' />
        <Node name="postgres" note="insert, debit">
          <ul className="mt-3 space-y-1.5 border-l-2 border-border-light pl-3">
            {fanOut.map(([box, note]) => (
              <li key={box} className="flex flex-wrap items-baseline gap-x-2 text-sm">
                <Badge variant="outline">{box}</Badge>
                <span className="text-text-secondary">{note}</span>
              </li>
            ))}
          </ul>
        </Node>
        <Arrow />
        <Actor name="alice" note="polls balance, revenue: stale in between" />
        <Stats tone="muted" items={['5 systems', 'runs as "app"', 'stale']} />
      </Column>
      <Column label="With ReifyDB" tone="primary">
        <Actor name="alice" note="place_order(...)" />
        <Arrow />
        <div className="glass-card-strong p-4">
          <div className="font-mono text-xs label-uppercase text-primary mb-3">reifydb</div>
          <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-sm">
            {inside.map(([keyword, note]) => (
              <Fragment key={keyword}>
                <dt className="font-mono text-primary">{keyword}</dt>
                <dd className="text-text-secondary">{note}</dd>
              </Fragment>
            ))}
          </dl>
          <div className="mt-3 pt-3 border-t border-border-light text-sm font-bold text-primary">one transaction</div>
        </div>
        <Arrow />
        <Actor name="alice" note="sees balance, revenue: current, pushed" />
        <Stats tone="primary" items={['1 system', 'runs as alice', 'current']} />
      </Column>
    </div>
  );
}
