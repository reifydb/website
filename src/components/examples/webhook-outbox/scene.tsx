import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib';
import { Button } from '@/components/ui/button';
import { ExampleFrame, ExampleFrameSkeleton } from '../frame';
import type { SceneProps } from '../index';
import { ATTEMPTS, CLAIM, COUNTERS, ack, backoffAfter, fail, replay } from './webhook-outbox';
import { ensureSetup, exec, outboxState } from './setup';
import type { Hook, HookStatus } from './setup';

const TICK_MS = 250;
const RETURN_POLL_MS = 1_000;
const DONE_KEPT = 4;

interface Counters {
  depth: number;
  inFlight: number;
}

const COLUMNS: { title: string; kind: string; statuses: HookStatus[] }[] = [
  { title: 'ready', kind: 'waiting for a worker', statuses: ['ready', 'backoff'] },
  { title: 'claimed', kind: 'leased to you', statuses: ['claimed', 'returning'] },
  { title: 'done', kind: 'acked, kept in storage', statuses: ['done'] },
  { title: 'dead', kind: `out of ${ATTEMPTS} tries`, statuses: ['dead'] },
];

async function counters(): Promise<Counters> {
  const rows = await exec(COUNTERS);
  return rows.reduce<Counters>(
    (sum, row) => ({ depth: sum.depth + Number(row.depth), inFlight: sum.inFlight + Number(row.in_flight) }),
    { depth: 0, inFlight: 0 },
  );
}

function seconds(ms: number): number {
  return Math.max(0, Math.ceil(ms / 1000));
}

function waiting(): number {
  return outboxState().hooks.filter((hook) => hook.status === 'ready' || hook.status === 'backoff').length;
}

function retry(hook: Hook, depth: number) {
  if (depth > waiting()) {
    hook.status = 'backoff';
    hook.until = Date.now() + backoffAfter(hook.attempt);
  } else {
    hook.status = 'dead';
    hook.until = undefined;
  }
  hook.token = undefined;
  hook.at = Date.now();
}

function Card({ hook, now }: { hook: Hook; now: number }) {
  let meta = hook.attempt ? `try ${hook.attempt}` : 'new';
  if (hook.status === 'backoff') meta = `retry in ${seconds(hook.until! - now)}s`;
  if (hook.status === 'claimed') meta = `try ${hook.attempt} · lease ${seconds(hook.until! - now)}s`;
  if (hook.status === 'returning') meta = 'lease expired, returning...';
  return (
    <div className={cn('example-board__row webhook-outbox__card', `webhook-outbox__card--${hook.status}`)}>
      <span className="webhook-outbox__hook">
        #{hook.id} {hook.event} → {hook.url}
      </span>
      <span className="example-board__meta">{meta}</span>
    </div>
  );
}

export default function WebhookOutboxScene({ howTo }: SceneProps) {
  const [hooks, setHooks] = useState<Hook[] | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const [ran, setRan] = useState<string | null>(null);
  const [failure, setFailure] = useState<Error | null>(null);
  const chainRef = useRef<Promise<void>>(Promise.resolve());

  const publish = useRef(() => {
    const state = outboxState();
    const done = state.hooks.filter((hook) => hook.status === 'done');
    const dropped = new Set(done.slice(0, Math.max(0, done.length - DONE_KEPT)));
    state.hooks = state.hooks.filter((hook) => !dropped.has(hook));
    setHooks(state.hooks.map((hook) => ({ ...hook })));
  });

  const run = useRef((step: () => Promise<string | null>) => {
    chainRef.current = chainRef.current
      .then(async () => {
        const rql = await step();
        if (rql) setRan(rql);
        publish.current();
      })
      .catch(setFailure);
  });

  const claimed = () => outboxState().hooks.find((hook) => hook.status === 'claimed' || hook.status === 'returning');

  const actions = useRef({
    claim: () =>
      run.current(async () => {
        if (claimed()) return null;
        const [item] = await exec(CLAIM);
        const hook = item && outboxState().hooks.find((entry) => entry.id === Number(item.id));
        if (hook) {
          hook.status = 'claimed';
          hook.token = String(item.token);
          hook.attempt = Number(item.attempt);
          hook.until = Date.parse(String(item.deadline).replace(/\.(\d{3})\d*Z$/, '.$1Z'));
          hook.at = Date.now();
        }
        return CLAIM;
      }),
    succeed: () =>
      run.current(async () => {
        const hook = claimed();
        if (hook?.status !== 'claimed') return null;
        const rql = ack(hook.token!);
        const [result] = await exec(rql);
        if (String(result.status) === 'stale') {
          hook.status = 'returning';
          return rql;
        }
        hook.status = 'done';
        hook.token = undefined;
        hook.at = Date.now();
        return rql;
      }),
    fail: () =>
      run.current(async () => {
        const hook = claimed();
        if (hook?.status !== 'claimed') return null;
        const rql = fail(hook.token!, '503 from receiver');
        await exec(rql);
        retry(hook, (await counters()).depth);
        return rql;
      }),
    replay: () =>
      run.current(async () => {
        const hook = outboxState().hooks.find((entry) => entry.status === 'dead');
        if (!hook) return null;
        const rql = replay(hook.id);
        await exec(rql);
        hook.status = 'ready';
        hook.at = Date.now();
        return rql;
      }),
    checkReturned: () =>
      run.current(async () => {
        const hook = claimed();
        if (hook?.status !== 'returning') return null;
        const after = await counters();
        if (after.inFlight > 0) return null;
        retry(hook, after.depth);
        return COUNTERS;
      }),
  });

  useEffect(() => {
    ensureSetup()
      .then(() => publish.current())
      .catch(setFailure);
  }, []);

  const loaded = hooks !== null;

  useEffect(() => {
    if (!loaded) return;
    const tick = window.setInterval(() => {
      const at = Date.now();
      let changed = false;
      for (const hook of outboxState().hooks) {
        if (hook.status === 'backoff' && hook.until! <= at) {
          hook.status = 'ready';
          changed = true;
        }
        if (hook.status === 'claimed' && hook.until! <= at) {
          hook.status = 'returning';
          changed = true;
        }
      }
      if (changed) publish.current();
      setNow(at);
    }, TICK_MS);
    const poll = window.setInterval(() => actions.current.checkReturned(), RETURN_POLL_MS);
    return () => {
      window.clearInterval(tick);
      window.clearInterval(poll);
    };
  }, [loaded]);

  if (failure) throw failure;
  if (!hooks) return <ExampleFrameSkeleton howTo={howTo} />;

  const holding = hooks.find((hook) => hook.status === 'claimed');
  const busy = hooks.some((hook) => hook.status === 'claimed' || hook.status === 'returning');
  const anyReady = hooks.some((hook) => hook.status === 'ready');
  const anyDead = hooks.some((hook) => hook.status === 'dead');

  return (
    <ExampleFrame
      howTo={howTo}
      ran={ran}
      scene={
        <div className="webhook-outbox" role="img" aria-label="A webhook queue with ready, claimed, done and dead columns">
          <div className="example-boards">
            {COLUMNS.map((column) => {
              const cards = hooks
                .filter((hook) => column.statuses.includes(hook.status))
                .sort((a, b) => (column.title === 'ready' ? a.id - b.id : b.at - a.at));
              return (
                <div key={column.title} className={cn('example-board', `webhook-outbox__column--${column.title}`)}>
                  <div className="example-board__head">
                    <span className="example-board__title">{column.title}</span>
                    <span className="example-board__meta">{column.kind}</span>
                  </div>
                  <div className="example-board__rows webhook-outbox__cards">
                    {cards.length ? (
                      cards.map((hook) => <Card key={hook.id} hook={hook} now={now} />)
                    ) : (
                      <div className="example-board__empty">none</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      }
      dock={
        <>
          <span className="swap-candle__lead">You are the worker</span>
          <Button type="button" size="lg" variant="demo" disabled={busy || !anyReady} onClick={() => actions.current.claim()}>
            Claim next
          </Button>
          <Button type="button" size="lg" variant="demo" disabled={!holding} onClick={() => actions.current.succeed()}>
            Succeed
          </Button>
          <Button type="button" size="lg" variant="demo" disabled={!holding} onClick={() => actions.current.fail()}>
            Fail
          </Button>
          <Button type="button" size="lg" variant="demo" disabled={!anyDead} onClick={() => actions.current.replay()}>
            Replay dead
          </Button>
        </>
      }
    />
  );
}
