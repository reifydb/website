import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '@/lib';
import { Button } from '@/components/ui/button';
import { ExampleFrame, ExampleFrameSkeleton } from '../frame';
import type { SceneProps } from '../index';
import { handleLiveActions, isWatched } from '../live';
import { CLAIM, FLEET, READS, ack, insertAlert, insertCommand, insertDevice, insertReading } from './shared-dictionary';
import { activeDevices, ensureSetup, exec, fleetState, nextAt, random, write } from './setup';
import type { Command } from './setup';

type Row = Record<string, unknown>;

const TICK_MS = 400;
const ALERT_EVERY = 8;
const COMMAND_EVERY = 10;
const CLAIM_EVERY = 5;
const DELIVERED_MS = 2_000;
const COMMANDS = ['open', 'close', 'restart', 'calibrate'];
const LEVELS = ['low', 'high', 'offline'];

interface View {
  names: { id: number; value: string }[];
  devices: Row[];
  readings: Row[];
  alerts: Row[];
  commands: Command[];
  written: number;
  fresh: string | null;
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function time(value: unknown): string {
  return new Date(String(value)).toLocaleTimeString('en-GB');
}

function pick<T>(items: T[]): T {
  return items[Math.floor(random() * items.length)];
}

function Badge({ id }: { id: number | undefined }) {
  return <span className="shared-dictionary__badge">{id ?? '?'}</span>;
}

function Board({ title, kind, children }: { title: string; kind: string; children: ReactNode }) {
  return (
    <div className="shared-dictionary__board">
      <div className="shared-dictionary__board-head">
        <span className="shared-dictionary__table">{title}</span>
        <span>{kind}</span>
      </div>
      <div className="shared-dictionary__rows">{children}</div>
    </div>
  );
}

function Name({ name, ids, fresh }: { name: string; ids: Map<string, number>; fresh: string | null }) {
  return (
    <span className={cn('shared-dictionary__name', name === fresh && 'shared-dictionary__name--fresh')}>
      <Badge id={ids.get(name)} />
      {name}
    </span>
  );
}

export default function SharedDictionaryScene({ howTo }: SceneProps) {
  const [view, setView] = useState<View | null>(null);
  const [ran, setRan] = useState<string | null>(null);
  const [failure, setFailure] = useState<Error | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const visibleRef = useRef(false);
  const chainRef = useRef<Promise<void>>(Promise.resolve());
  const freshRef = useRef<string | null>(null);

  const refresh = useRef(async () => {
    const state = fleetState();
    const [names, devices, readings, alerts] = await Promise.all([
      exec(READS.names),
      exec(READS.devices),
      exec(READS.readings),
      exec(READS.alerts),
    ]);
    const now = Date.now();
    state.commands = state.commands.filter((command) => command.status !== 'delivered' || now - command.doneAt! < DELIVERED_MS);
    setView({
      names: names.map((row) => ({ id: Number(row.id), value: String(row.value) })).sort((a, b) => a.id - b.id),
      devices: [...devices].sort((a, b) => FLEET.indexOf(String(a.name)) - FLEET.indexOf(String(b.name))),
      readings,
      alerts,
      commands: [...state.commands],
      written: state.written,
      fresh: freshRef.current,
    });
  });

  const run = useRef((step: () => Promise<string | null>) => {
    chainRef.current = chainRef.current
      .then(async () => {
        const rql = await step();
        if (rql) setRan(rql);
        await refresh.current();
      })
      .catch(setFailure);
  });

  const actions = useRef({
    addDevice: () =>
      run.current(async () => {
        const state = fleetState();
        if (state.devices >= FLEET.length) return null;
        const name = FLEET[state.devices];
        state.devices += 1;
        freshRef.current = name;
        const rql = insertDevice(name, 'new');
        await write(rql);
        await write(insertReading(nextAt(), name, 2 + random() * 2));
        await write(insertAlert(nextAt(), name, 'online'));
        const id = state.nextCommand++;
        await write(insertCommand(id, name, 'calibrate'));
        state.commands.push({ id, name, cmd: 'calibrate', status: 'waiting' });
        return rql;
      }),
    reading: () =>
      run.current(async () => {
        const rql = insertReading(nextAt(), pick(activeDevices()), 2 + random() * 2);
        await write(rql);
        return rql;
      }),
    alert: () =>
      run.current(async () => {
        const rql = insertAlert(nextAt(), pick(activeDevices()), pick(LEVELS));
        await write(rql);
        return rql;
      }),
    command: () =>
      run.current(async () => {
        const state = fleetState();
        const id = state.nextCommand++;
        const name = pick(activeDevices());
        const cmd = pick(COMMANDS);
        const rql = insertCommand(id, name, cmd);
        await write(rql);
        state.commands.push({ id, name, cmd, status: 'waiting' });
        return rql;
      }),
    work: () =>
      run.current(async () => {
        const state = fleetState();
        const claimed = state.commands.find((command) => command.status === 'claimed');
        if (claimed) {
          const rql = ack(claimed.token!);
          await exec(rql);
          claimed.status = 'delivered';
          claimed.doneAt = Date.now();
          return rql;
        }
        const [item] = await exec(CLAIM);
        if (!item) return null;
        const command = state.commands.find((entry) => entry.id === Number(item.id));
        if (command) {
          command.status = 'claimed';
          command.token = String(item.token);
        }
        return CLAIM;
      }),
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
      if (document.hidden || !(visibleRef.current || isWatched('shared-dictionary'))) return;
      tick += 1;
      if (reduce) return;
      actions.current.reading();
      if (tick % ALERT_EVERY === 0) actions.current.alert();
      if (tick % COMMAND_EVERY === 0) actions.current.command();
      if (tick % CLAIM_EVERY === 0) actions.current.work();
    }, TICK_MS);
    return () => {
      observer.disconnect();
      window.clearInterval(timer);
    };
  }, [loaded]);

  useEffect(
    () =>
      handleLiveActions('shared-dictionary', (action) => {
        if (action === 'add') actions.current.addDevice();
        if (action === 'alert') actions.current.alert();
        if (action === 'command') actions.current.command();
      }),
    [],
  );

  if (failure) throw failure;
  if (!view) return <ExampleFrameSkeleton howTo={howTo} />;

  const ids = new Map(view.names.map((entry) => [entry.value, entry.id]));
  const full = view.names.length >= FLEET.length;

  return (
    <ExampleFrame
      howTo={howTo}
      ran={ran}
      scene={
        <div ref={stageRef} className="shared-dictionary" role="img" aria-label="One dictionary of device names shared by a table, a series, a ring buffer and a queue">
          <div className="shared-dictionary__dict">
            <div className="shared-dictionary__board-head">
              <span className="shared-dictionary__table">fleet::names</span>
              <span>dictionary, utf8 → uint2</span>
            </div>
            <div className="shared-dictionary__entries">
              {view.names.map((entry) => (
                <span
                  key={entry.id}
                  className={cn('shared-dictionary__entry', entry.value === view.fresh && 'shared-dictionary__entry--fresh')}
                >
                  <Badge id={entry.id} />
                  {entry.value}
                </span>
              ))}
            </div>
          </div>

          <div className="shared-dictionary__boards">
            <Board title="fleet::devices" kind="table">
              {view.devices.map((row) => (
                <div key={String(row.name)} className="shared-dictionary__row">
                  <Name name={String(row.name)} ids={ids} fresh={view.fresh} />
                  <span>{String(row.status)}</span>
                </div>
              ))}
            </Board>
            <Board title="fleet::readings" kind="series, key at">
              {view.readings.map((row) => (
                <div key={String(row.at)} className="shared-dictionary__row">
                  <Name name={String(row.name)} ids={ids} fresh={view.fresh} />
                  <span>
                    {Number(row.bar).toFixed(2)} bar · {time(row.at)}
                  </span>
                </div>
              ))}
            </Board>
            <Board title="fleet::alerts" kind="ring, capacity 5">
              {view.alerts.length ? (
                view.alerts.map((row) => (
                  <div key={String(row.at)} className="shared-dictionary__row">
                    <Name name={String(row.name)} ids={ids} fresh={view.fresh} />
                    <span>{String(row.level)}</span>
                  </div>
                ))
              ) : (
                <div className="shared-dictionary__empty">no alerts yet</div>
              )}
            </Board>
            <Board title="fleet::commands" kind="queue, claim and ack">
              {view.commands.length ? (
                view.commands.map((command) => (
                  <div
                    key={command.id}
                    className={cn('shared-dictionary__row', command.status === 'delivered' && 'shared-dictionary__row--done')}
                  >
                    <Name name={command.name} ids={ids} fresh={view.fresh} />
                    <span>
                      {command.cmd} · {command.status}
                    </span>
                  </div>
                ))
              ) : (
                <div className="shared-dictionary__empty">queue empty</div>
              )}
            </Board>
          </div>

          <p className="shared-dictionary__count">
            names written in this tab: {view.written.toLocaleString('en-US')} · dictionary entries: {view.names.length}
          </p>
        </div>
      }
      dock={
        <>
          <span className="swap-candle__lead">Your turn</span>
          <Button type="button" size="lg" variant="demo" disabled={full} onClick={() => actions.current.addDevice()}>
            {full ? 'Fleet full' : 'Add device'}
          </Button>
          <Button type="button" size="lg" variant="demo" onClick={() => actions.current.alert()}>
            Trigger alert
          </Button>
          <Button type="button" size="lg" variant="demo" onClick={() => actions.current.command()}>
            Send command
          </Button>
        </>
      }
    />
  );
}
