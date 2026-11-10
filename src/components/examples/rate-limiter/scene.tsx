import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib';
import { Button } from '@/components/ui/button';
import { ExampleFrame, ExampleFrameSkeleton } from '../frame';
import type { SceneProps } from '../index';
import { handleLiveActions, isWatched } from '../live';
import { LIMIT, READS, USERS, WINDOW_MS, sendRequest, windowQuery } from './rate-limiter';
import type { User } from './rate-limiter';
import { ensureSetup, exec, takeId } from './setup';

const TICK_MS = 400;
const BOB_EVERY = 8;
const CAROL_EVERY = 38;
const CAROL_BURST = 7;
const SPAM = 5;

interface Slot {
  id: number;
  age: number;
}

interface Lane {
  slots: (Slot | null)[];
  head: number;
  inWindow: number;
  written: number | null;
  blocked: number | null;
}

interface View {
  lanes: Record<User, Lane>;
  event: string;
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function emptyLanes(): Record<User, Lane> {
  return Object.fromEntries(
    USERS.map((user) => [user, { slots: Array(LIMIT).fill(null), head: 0, inWindow: 0, written: null, blocked: null }]),
  ) as Record<User, Lane>;
}

export default function RateLimiterScene({ howTo }: SceneProps) {
  const [view, setView] = useState<View | null>(null);
  const [ran, setRan] = useState<string | null>(null);
  const [failure, setFailure] = useState<Error | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const visibleRef = useRef(false);
  const chainRef = useRef<Promise<void>>(Promise.resolve());
  const slotOfRef = useRef(new Map<number, number>());
  const laneOfRef = useRef(new Map<number, User>());
  const seqRef = useRef<Record<User, number>>({ alice: 0, bob: 0, carol: 0 });
  const marksRef = useRef<Record<User, { written: number | null; blocked: number | null }>>({
    alice: { written: null, blocked: null },
    bob: { written: null, blocked: null },
    carol: { written: null, blocked: null },
  });
  const eventRef = useRef('Waiting for the first request.');
  const markRef = useRef(0);

  const refresh = useRef(async () => {
    const now = Date.now();
    const [rows, counts] = await Promise.all([exec(READS.ring), exec(windowQuery(now))]);
    const lanes = emptyLanes();
    for (const row of rows) {
      const id = Number(row.id);
      const user = String(row.user) as User;
      const slot = slotOfRef.current.get(id);
      if (slot === undefined || !lanes[user]) continue;
      lanes[user].slots[slot] = { id, age: now - Date.parse(String(row.at)) };
    }
    for (const row of counts) {
      const user = String(row.user) as User;
      if (lanes[user]) lanes[user].inWindow = Number(row.in_window);
    }
    for (const user of USERS) {
      lanes[user].head = seqRef.current[user] % LIMIT;
      lanes[user].written = marksRef.current[user].written;
      lanes[user].blocked = marksRef.current[user].blocked;
    }
    setView({ lanes, event: eventRef.current });
  });

  const send = useRef((user: User) => {
    chainRef.current = chainRef.current
      .then(async () => {
        const id = takeId();
        const slot = seqRef.current[user] % LIMIT;
        const outcome = await sendRequest(exec, id, user, Date.now());
        setRan(outcome.rql);
        markRef.current += 1;
        if (outcome.blocked) {
          marksRef.current[user].blocked = markRef.current;
          eventRef.current = `${user} blocked: ${LIMIT} of ${LIMIT} requests in the last ${WINDOW_MS / 1000} s, nothing stored`;
        } else {
          const replaced = [...slotOfRef.current].find(([other, at]) => at === slot && laneOfRef.current.get(other) === user)?.[0];
          if (replaced !== undefined) {
            slotOfRef.current.delete(replaced);
            laneOfRef.current.delete(replaced);
          }
          slotOfRef.current.set(id, slot);
          laneOfRef.current.set(id, user);
          seqRef.current[user] += 1;
          marksRef.current[user].written = markRef.current;
          eventRef.current =
            replaced === undefined
              ? `${user} #${id} stored in slot ${slot + 1}`
              : `${user} #${id} stored in slot ${slot + 1}, #${replaced} evicted`;
        }
        await refresh.current();
      })
      .catch(setFailure);
  });

  useEffect(() => {
    ensureSetup()
      .then(() => refresh.current())
      .catch(setFailure);
  }, []);

  const loaded = view !== null;

  useEffect(() => {
    if (!loaded) return;
    const observer = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
    });
    observer.observe(stageRef.current!);
    const reduce = prefersReducedMotion();
    let tick = 0;
    const timer = window.setInterval(() => {
      if (document.hidden || !(visibleRef.current || isWatched('rate-limiter'))) return;
      tick += 1;
      if (!reduce) {
        if (tick % BOB_EVERY === 0) send.current('bob');
        if (tick % CAROL_EVERY < CAROL_BURST) send.current('carol');
      }
      chainRef.current = chainRef.current.then(() => refresh.current()).catch(setFailure);
    }, TICK_MS);
    return () => {
      observer.disconnect();
      window.clearInterval(timer);
    };
  }, [loaded]);

  useEffect(
    () =>
      handleLiveActions('rate-limiter', (action) => {
        const times = action === 'spam' ? SPAM : 1;
        for (let k = 0; k < times; k++) send.current('alice');
      }),
    [],
  );

  if (failure) throw failure;
  if (!view) return <ExampleFrameSkeleton howTo={howTo} />;

  return (
    <ExampleFrame
      howTo={howTo}
      ran={ran}
      scene={
        <div ref={stageRef} className="rate-limiter" role="img" aria-label="One ring buffer of five slots per user, with a verdict per user">
          <div className="rate-limiter__head">
            <span className="rate-limiter__table">limits::requests</span>
            <span>
              ring of {LIMIT} per user · limit {LIMIT} per {WINDOW_MS / 1000} s
            </span>
          </div>
          <div className="rate-limiter__cards">
            {USERS.map((user) => {
              const lane = view.lanes[user];
              const blocked = lane.inWindow >= LIMIT;
              const fresh = (lane.head + LIMIT - 1) % LIMIT;
              const next = lane.slots[lane.head];
              return (
                <div key={user} className={cn('rate-limiter__card', blocked && 'rate-limiter__card--blocked')}>
                  <div className="rate-limiter__card-head">
                    <span className="rate-limiter__user">{user}</span>
                    <span
                      key={lane.blocked ?? 'verdict'}
                      className={cn('rate-limiter__verdict', blocked && 'rate-limiter__verdict--blocked', lane.blocked !== null && 'rate-limiter__verdict--hit')}
                    >
                      {blocked ? 'blocked' : 'ok'} {lane.inWindow}/{LIMIT}
                    </span>
                  </div>
                  <div className="rate-limiter__slots">
                    {lane.slots.map((slot, index) => (
                      <span
                        key={slot && lane.written !== null && index === fresh ? `${index}-${lane.written}` : index}
                        className={cn(
                          'rate-limiter__slot',
                          slot && 'rate-limiter__slot--filled',
                          slot && slot.age > WINDOW_MS && 'rate-limiter__slot--stale',
                          index === lane.head && 'rate-limiter__slot--head',
                          slot && lane.written !== null && index === fresh && 'rate-limiter__slot--fresh',
                        )}
                      >
                        {slot ? (
                          <>
                            <span>#{slot.id}</span>
                            <span className="rate-limiter__age">{Math.floor(slot.age / 1000)} s</span>
                          </>
                        ) : (
                          <span className="rate-limiter__age">empty</span>
                        )}
                      </span>
                    ))}
                  </div>
                  <div className="rate-limiter__next">
                    {lane.slots.map((_, index) => (
                      <span key={index} className={cn(index > 2 && 'rate-limiter__next--end')}>
                        {index === lane.head && (index > 2 ? `${next ? `overwrites #${next.id}` : 'next'} ▲` : `▲ ${next ? `overwrites #${next.id}` : 'next'}`)}
                      </span>
                    ))}
                  </div>
                  <div className="rate-limiter__window">
                    <span className="rate-limiter__window-label">last {WINDOW_MS / 1000} s</span>
                    <span className="rate-limiter__bar">
                      <span className="rate-limiter__fill" style={{ width: `${(lane.inWindow / LIMIT) * 100}%` }} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="rate-limiter__event" aria-live="polite">
            {view.event}
          </p>
        </div>
      }
      dock={
        <>
          <span className="swap-candle__lead">Your turn</span>
          <Button type="button" size="lg" onClick={() => send.current('alice')}>
            Send as alice
          </Button>
          <Button
            type="button"
            size="lg"
            variant="secondary"
            onClick={() => {
              for (let k = 0; k < SPAM; k++) send.current('alice');
            }}
          >
            Spam {SPAM} as alice
          </Button>
        </>
      }
    />
  );
}
