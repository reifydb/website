import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { cn } from '@/lib';
import { Button } from '@/components/ui/button';
import { ExampleFrame, ExampleFrameSkeleton } from '../frame';
import type { SceneProps } from '../index';
import { handleLiveActions, isWatched } from '../live';
import { NORMALIZED_VIEW, RAW_COLUMNS, RAW_TABLE, READS, SLOTS_PER_BUCKET, insertSwaps } from './swap-candle';
import { currentSlot, ensureSetup, exec, getLastSwap, makeSwap, setLastSwap } from './setup';
import type { Swap } from './swap-candle';

type Row = Record<string, unknown>;
type NodeId = 'normalized' | 'trades' | 'block' | 'volume' | 'twap' | 'candles' | 'app';
type WireId = Exclude<NodeId, 'normalized'>;
type Point = [number, number];

interface Card {
  raw: Row;
  normalized: Row;
}

interface Snapshot {
  card: Card;
  trades: Row[];
  block: Row[];
  volume: Row[];
  twap: Row[];
  candles: Row[];
}

interface Settled {
  snapshot: Snapshot;
}

interface Flow extends Settled {
  start: number;
  swap: Swap;
  mine: boolean;
  previous: Snapshot;
}

type Mark = { flow: number; fresh: true } | { flow: number; fresh: false; delta: number };

interface NodeView {
  snapshot: Snapshot;
  marks: Record<string, Mark>;
}

interface Packet {
  key: string;
  x: number;
  y: number;
  mine: boolean;
}

interface View {
  slot: number;
  nodes: Record<NodeId, NodeView>;
  packets: Packet[];
}

interface Box {
  x: number;
  y: number;
  width: number;
  height?: number;
}

interface Layout {
  width: number;
  height: number;
  pair: Point;
  boxes: Record<NodeId, Box>;
  candleChart: Required<Box>;
  wires: Record<WireId, Point[]>;
}

const FRAME_INTERVAL = 83;
const AUTO_MS = 400;
const VISITOR_SIZES = [5, 25, 100];
const MARK_SECONDS = 2;
const HOP = 0.35;
const ARRIVAL: Record<NodeId, number> = { normalized: 0, trades: HOP, block: 2 * HOP, volume: 3 * HOP, twap: 3 * HOP, candles: 3 * HOP, app: 4 * HOP };
const RETIRE = ARRIVAL.app + MARK_SECONDS + 0.5;
const NODES: NodeId[] = ['normalized', 'trades', 'block', 'volume', 'twap', 'candles', 'app'];
const WIRES: WireId[] = ['trades', 'block', 'volume', 'twap', 'candles', 'app'];
const INK = '#1b1840';
const LINE = '#c9c3dc';
const PRIMARY = '#7e85f2';
const RISE = '#2f9e6b';
const FALL = '#d4506c';

const WIDE: Layout = {
  width: 384,
  height: 126,
  pair: [6, 5],
  boxes: {
    normalized: { x: 6, y: 20, width: 126 },
    trades: { x: 150, y: 6, width: 66 },
    block: { x: 150, y: 60, width: 66 },
    volume: { x: 232, y: 6, width: 64 },
    twap: { x: 232, y: 36, width: 64 },
    candles: { x: 232, y: 66, width: 64, height: 54 },
    app: { x: 314, y: 40, width: 64 },
  },
  candleChart: { x: 232, y: 75, width: 64, height: 44 },
  wires: {
    trades: [[132, 50], [141, 50], [141, 22], [150, 22]],
    block: [[183, 44], [183, 60]],
    volume: [[216, 74], [224, 74], [224, 16], [232, 16]],
    twap: [[216, 74], [224, 74], [224, 46], [232, 46]],
    candles: [[216, 74], [224, 74], [224, 80], [232, 80]],
    app: [[296, 96], [305, 96], [305, 62], [314, 62]],
  },
};

const TALL: Layout = {
  width: 186,
  height: 226,
  pair: [6, 2],
  boxes: {
    normalized: { x: 6, y: 12, width: 174 },
    trades: { x: 6, y: 78, width: 81 },
    block: { x: 99, y: 78, width: 81 },
    volume: { x: 6, y: 132, width: 81 },
    twap: { x: 99, y: 132, width: 81 },
    candles: { x: 6, y: 164, width: 81, height: 54 },
    app: { x: 99, y: 172, width: 81 },
  },
  candleChart: { x: 6, y: 173, width: 81, height: 44 },
  wires: {
    trades: [[46, 50], [46, 78]],
    block: [[87, 90], [99, 90]],
    volume: [[139, 110], [139, 124], [46, 124], [46, 132]],
    twap: [[139, 110], [139, 132]],
    candles: [[139, 110], [139, 124], [3, 124], [3, 178], [6, 178]],
    app: [[87, 194], [99, 194]],
  },
};

const TALL_QUERY = '(max-width: 767px)';

import.meta.hot?.accept(() => window.location.reload());


const SETTLE_TIMEOUT_MS = 2000;

function yieldTask(): Promise<void> {
  return new Promise((resolve) => {
    const channel = new MessageChannel();
    channel.port1.onmessage = () => resolve();
    channel.port2.postMessage(null);
  });
}

function whenVisible(): Promise<void> {
  return new Promise((resolve) => {
    const update = () => {
      if (document.hidden) return;
      document.removeEventListener('visibilitychange', update);
      resolve();
    };
    document.addEventListener('visibilitychange', update);
  });
}

function bucketOf(slot: number): string {
  return String(Math.floor(slot / SLOTS_PER_BUCKET));
}

async function readSnapshot(swap: Swap): Promise<Snapshot | null> {
  const [raw] = await exec(READS.raw(swap.id));
  const [normalized] = await exec(READS.normalized(swap.id));
  if (!raw || !normalized) return null;
  return {
    card: { raw, normalized },
    trades: await exec(READS.trades),
    block: await exec(READS.block),
    volume: await exec(READS.volume),
    twap: await exec(READS.twap),
    candles: (await exec(READS.candles)).reverse(),
  };
}

function reflects(snapshot: Snapshot, swap: Swap): boolean {
  const bucket = bucketOf(swap.slot);
  return (
    snapshot.trades.some((row) => String(row.id) === String(swap.id)) &&
    snapshot.block.some((row) => String(row.slot) === String(swap.slot)) &&
    [snapshot.volume, snapshot.twap, snapshot.candles].every((rows) => rows.some((row) => String(row.bucket) === bucket))
  );
}

async function settle(swap: Swap): Promise<Settled> {
  let deadline = performance.now() + SETTLE_TIMEOUT_MS;
  let previous = '';
  for (;;) {
    const snapshot = await readSnapshot(swap);
    if (snapshot && reflects(snapshot, swap)) {
      const key = JSON.stringify(snapshot);
      if (key === previous) return { snapshot };
      previous = key;
    }
    if (document.hidden) {
      await whenVisible();
      deadline = performance.now() + SETTLE_TIMEOUT_MS;
    }
    if (performance.now() > deadline) throw new Error(`swap to candle views did not catch up with swap ${swap.id} within ${SETTLE_TIMEOUT_MS}ms`);
    await yieldTask();
  }
}

function rowsOf(snapshot: Snapshot, id: NodeId): Row[] {
  if (id === 'normalized') return [snapshot.card.normalized];
  if (id === 'app') return snapshot.candles.slice(-1);
  return snapshot[id];
}

function keyOf(id: NodeId, row: Row): string {
  if (id === 'normalized' || id === 'trades') return String(row.id);
  if (id === 'block') return String(row.slot);
  return String(row.bucket);
}

const MEASURE: Partial<Record<NodeId, string>> = { block: 'vwap', volume: 'volume', twap: 'twap', app: 'close' };

function marksOf(id: NodeId, flow: Flow): Record<string, Mark> {
  const column = MEASURE[id];
  const before = new Map(rowsOf(flow.previous, id).map((row) => [keyOf(id, row), row]));
  const marks: Record<string, Mark> = {};
  for (const row of rowsOf(flow.snapshot, id)) {
    const key = keyOf(id, row);
    const old = before.get(key);
    if (!old) {
      marks[key] = { flow: flow.swap.id, fresh: true };
      continue;
    }
    if (!column) continue;
    const delta = Number(row[column]) - Number(old[column]);
    if (Math.abs(delta) >= 0.005) marks[key] = { flow: flow.swap.id, fresh: false, delta };
  }
  return marks;
}

function money(value: unknown): string {
  return Number(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function compact(value: unknown): string {
  const n = Number(value);
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n.toFixed(0);
}

function shownSnapshot(base: Snapshot, flows: Flow[], id: NodeId, now: number): Snapshot {
  let shown = base;
  for (const flow of flows) if (now >= flow.start + ARRIVAL[id]) shown = flow.snapshot;
  return shown;
}

function recentMarks(flows: Flow[], id: NodeId, now: number): Record<string, Mark> {
  let marks: Record<string, Mark> = {};
  for (const flow of flows) {
    const arrived = flow.start + ARRIVAL[id];
    if (now < arrived || now >= arrived + MARK_SECONDS) continue;
    marks = { ...marks, ...marksOf(id, flow) };
  }
  return marks;
}

function pointAt(points: Point[], u: number): Point {
  const lengths = points.slice(1).map(([x, y], i) => Math.abs(x - points[i][0]) + Math.abs(y - points[i][1]));
  let left = u * lengths.reduce((sum, length) => sum + length, 0);
  for (let i = 0; i < lengths.length; i++) {
    if (left <= lengths[i] || i === lengths.length - 1) {
      const t = lengths[i] ? Math.min(1, left / lengths[i]) : 1;
      const [ax, ay] = points[i];
      const [bx, by] = points[i + 1];
      return [ax + (bx - ax) * t, ay + (by - ay) * t];
    }
    left -= lengths[i];
  }
  return points[points.length - 1];
}

function packetsOf(layout: Layout, flows: Flow[], now: number): Packet[] {
  const packets: Packet[] = [];
  for (const flow of flows) {
    for (const wire of WIRES) {
      const u = (now - flow.start - (ARRIVAL[wire] - HOP)) / HOP;
      if (u < 0 || u >= 1) continue;
      const [x, y] = pointAt(layout.wires[wire], u);
      packets.push({ key: `${flow.swap.id}-${wire}`, x: Math.round(x * 4) / 4, y: Math.round(y * 4) / 4, mine: flow.mine });
    }
  }
  return packets;
}

function viewOf(base: Settled, flows: Flow[], now: number, packets: Packet[]): View {
  const nodes = {} as Record<NodeId, NodeView>;
  for (const id of NODES) {
    nodes[id] = { snapshot: shownSnapshot(base.snapshot, flows, id, now), marks: recentMarks(flows, id, now) };
  }
  return { slot: currentSlot(performance.now()), nodes, packets };
}

function place({ width, height }: Layout, box: Box): CSSProperties {
  const style: CSSProperties = { left: `${(box.x / width) * 100}%`, top: `${(box.y / height) * 100}%`, width: `${(box.width / width) * 100}%` };
  if (box.height) style.height = `${(box.height / height) * 100}%`;
  return style;
}

function at({ width, height }: Layout, [x, y]: Point): CSSProperties {
  return { left: `${(x / width) * 100}%`, top: `${(y / height) * 100}%` };
}

function side(row: Row): string {
  return String(row.is_buy) === 'true' ? 'buy' : 'sell';
}

function signed(delta: number, format: (value: number) => string): string {
  return `${delta >= 0 ? '+' : '-'}${format(Math.abs(delta))}`;
}

function MarkView({ mark, format }: { mark?: Mark; format: (value: number) => string }) {
  if (!mark) return null;
  if (mark.fresh) {
    return <span className="swap-candle__delta swap-candle__delta--new">new</span>;
  }
  return (
    <span className={cn('swap-candle__delta', mark.delta >= 0 ? 'swap-candle__delta--up' : 'swap-candle__delta--down')}>
      {signed(mark.delta, format)}
    </span>
  );
}

interface BoardProps {
  layout: Layout;
  id: NodeId;
  title: string;
  node: NodeView;
  rows: { key: string; left: string; right: string }[];
  format: (value: number) => string;
}

function BoardView({ layout, id, title, node, rows, format }: BoardProps) {
  return (
    <div className="swap-candle__board" style={place(layout, layout.boxes[id])}>
      <div className="swap-candle__title">{title}</div>
      {rows.map((row) => (
        <div key={row.key} className="swap-candle__row">
          <span>{row.left}</span>
          <span>
            {row.right}
            <MarkView key={node.marks[row.key]?.flow ?? 'none'} mark={node.marks[row.key]} format={format} />
          </span>
        </div>
      ))}
    </div>
  );
}

function CandleChart({ chart, candles }: { chart: Required<Box>; candles: Row[] }) {
  const { x, y, height } = chart;
  if (!candles.length) return null;
  const top = Math.max(...candles.map((row) => Number(row.high)));
  const bottom = Math.min(...candles.map((row) => Number(row.low)));
  const span = Math.max(top - bottom, 0.01);
  const chartTop = y + 3;
  const chartHeight = height - 6;
  const toY = (value: number) => chartTop + ((top - value) / span) * (chartHeight - 1);
  return (
    <g>
      {candles.map((row, index) => {
        const cx = x + 4 + index * 7;
        const open = Number(row.open);
        const close = Number(row.close);
        const bodyTop = Math.min(toY(open), toY(close));
        return (
          <g key={String(row.bucket)}>
            <rect x={cx + 2} y={toY(Number(row.high))} width={1} height={Math.max(0.5, toY(Number(row.low)) - toY(Number(row.high)))} fill={INK} />
            <rect x={cx} y={bodyTop} width={5} height={Math.max(1, Math.abs(toY(open) - toY(close)))} fill={close >= open ? RISE : FALL} />
          </g>
        );
      })}
    </g>
  );
}

function Wiring({ view, layout }: { view: View; layout: Layout }) {
  return (
    <svg className="swap-candle__wiring" viewBox={`0 0 ${layout.width} ${layout.height}`} aria-hidden="true">
      {WIRES.map((wire) => (
        <polyline key={wire} points={layout.wires[wire].map((p) => p.join(',')).join(' ')} fill="none" stroke={LINE} strokeWidth={1} />
      ))}
      <rect {...layout.candleChart} fill="#ffffff" />
      <CandleChart chart={layout.candleChart} candles={view.nodes.candles.snapshot.candles} />
      {view.packets.map((packet) => (
        <circle key={packet.key} cx={packet.x} cy={packet.y} r={2.2} fill={packet.mine ? FALL : PRIMARY} />
      ))}
    </svg>
  );
}

function Boards({ view, layout }: { view: View; layout: Layout }) {
  const { nodes } = view;
  const card = nodes.normalized.snapshot.card;
  const normalized = card.normalized;
  const trades = nodes.trades.snapshot.trades.map((row) => {
    const size = Number(row.base_volume);
    return {
      key: String(row.id),
      left: `${row.venue} ${size.toFixed(size >= 10 ? 0 : 2)}`,
      right: money(row.price),
    };
  });
  const block = nodes.block.snapshot.block.map((row) => ({ key: String(row.slot), left: `…${String(row.slot).slice(-3)}`, right: money(row.vwap) }));
  const volume = nodes.volume.snapshot.volume.map((row, i) => ({ key: String(row.bucket), left: i === 0 ? 'now' : 'prev', right: `${compact(row.volume)} USD` }));
  const twap = nodes.twap.snapshot.twap.map((row, i) => ({ key: String(row.bucket), left: i === 0 ? 'now' : 'prev', right: money(row.twap) }));
  const candles = nodes.app.snapshot.candles;
  const last = candles[candles.length - 1];
  const first = candles[0];
  const change = last && first ? ((Number(last.close) - Number(first.open)) / Number(first.open)) * 100 : 0;
  return (
    <div className="swap-candle__boards">
      <div className="swap-candle__pair" style={at(layout, layout.pair)}>
        RDB/USD · slot {view.slot.toLocaleString('en-US')}
      </div>
      <div className="swap-candle__board swap-candle__card" style={place(layout, layout.boxes.normalized)}>
        <div className="swap-candle__title">Normalize</div>
        <div className="swap-candle__source">{RAW_TABLE}</div>
        {RAW_COLUMNS.map((column) => (
          <div key={column} className="swap-candle__row">
            <span>{column}</span>
            <span>{String(card.raw[column])}</span>
          </div>
        ))}
        <div className="swap-candle__source">→ {NORMALIZED_VIEW}</div>
        <div className="swap-candle__row swap-candle__result">
          <span>
            {Number(normalized.base_volume).toFixed(2)} RDB · {money(normalized.quote_volume)} USD
          </span>
          <span>
            @{money(normalized.price)} {side(normalized)}
          </span>
        </div>
      </div>
      <BoardView layout={layout} id="trades" title="market::trades" node={nodes.trades} rows={trades} format={money} />
      <BoardView layout={layout} id="block" title="market::block · vwap" node={nodes.block} rows={block} format={money} />
      <BoardView layout={layout} id="volume" title="market::volume" node={nodes.volume} rows={volume} format={compact} />
      <BoardView layout={layout} id="twap" title="market::twap" node={nodes.twap} rows={twap} format={money} />
      <div className="swap-candle__board swap-candle__candles" style={place(layout, layout.boxes.candles)}>
        <div className="swap-candle__title">market::candles</div>
      </div>
      <div className="swap-candle__board swap-candle__app" style={place(layout, layout.boxes.app)}>
        <div className="swap-candle__title">Your app</div>
        <div className="swap-candle__price">
          {last ? money(last.close) : '-'}
          {last && <MarkView key={nodes.app.marks[keyOf('app', last)]?.flow ?? 'none'} mark={nodes.app.marks[keyOf('app', last)]} format={money} />}
        </div>
        <div className={change >= 0 ? 'swap-candle__rise' : 'swap-candle__fall'}>
          {change >= 0 ? '+' : ''}
          {change.toFixed(2)}% · 8 candles
        </div>
        <div className="swap-candle__source">reads market::candles</div>
      </div>
    </div>
  );
}

function useLayout(): Layout {
  const [tall, setTall] = useState(() => window.matchMedia(TALL_QUERY).matches);
  useEffect(() => {
    const query = window.matchMedia(TALL_QUERY);
    const update = () => setTall(query.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return tall ? TALL : WIDE;
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function SwapCandleScene({ howTo }: SceneProps) {
  const layout = useLayout();
  const [view, setView] = useState<View | null>(null);
  const [ran, setRan] = useState<string | null>(null);
  const [failure, setFailure] = useState<Error | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const baseRef = useRef<Settled | null>(null);
  const flowsRef = useRef<Flow[]>([]);
  const queueRef = useRef<{ swap: Swap; mine: boolean }[]>([]);
  const busyRef = useRef(false);
  const visibleRef = useRef(false);
  const reduceRef = useRef(prefersReducedMotion());
  const repaintRef = useRef<() => void>(() => {});

  const pump = useRef(async () => {
    if (busyRef.current) return;
    busyRef.current = true;
    try {
      while (queueRef.current.length) {
        const { swap, mine } = queueRef.current.shift()!;
        const flows = flowsRef.current;
        const previous = flows.length ? flows[flows.length - 1].snapshot : baseRef.current!.snapshot;
        const insert = insertSwaps([swap]);
        await exec(insert);
        setRan(insert);
        setLastSwap(swap);
        const { snapshot } = await settle(swap);
        const start = reduceRef.current ? -Infinity : performance.now() / 1000;
        flows.push({ start, swap, mine, snapshot, previous });
        repaintRef.current();
      }
    } catch (error) {
      setFailure(error as Error);
    } finally {
      busyRef.current = false;
    }
  });

  const enqueue = (swap: Swap, mine: boolean) => {
    queueRef.current.push({ swap, mine });
    void pump.current();
  };

  useEffect(() => {
    ensureSetup()
      .then(() => settle(getLastSwap()!))
      .then(({ snapshot }) => {
        baseRef.current = { snapshot };
        setView(viewOf(baseRef.current, [], performance.now() / 1000, []));
      }, setFailure);
  }, []);

  const loaded = view !== null;

  useEffect(() => {
    if (!loaded) return;
    const stage = stageRef.current!;
    const observer = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
    });
    observer.observe(stage);
    let frameId = 0;
    let lastPaint = 0;
    let lastKey = '';
    const paint = (ms: number) => {
      const now = reduceRef.current ? Infinity : ms / 1000;
      const flows = flowsRef.current;
      while (flows.length && ms / 1000 - flows[0].start > RETIRE) {
        const retired = flows.shift()!;
        baseRef.current = { snapshot: retired.snapshot };
      }
      const next = viewOf(baseRef.current!, flows, now, packetsOf(layout, flows, now));
      const key = JSON.stringify(next);
      if (key !== lastKey) {
        lastKey = key;
        setView(next);
      }
    };
    repaintRef.current = () => paint(performance.now());
    const loop = (ms: number) => {
      if (ms - lastPaint > FRAME_INTERVAL && visibleRef.current) {
        lastPaint = ms;
        paint(ms);
      }
      frameId = requestAnimationFrame(loop);
    };
    paint(performance.now());
    frameId = requestAnimationFrame(loop);
    const auto = reduceRef.current
      ? 0
      : window.setInterval(() => {
          if (document.hidden || !(visibleRef.current || isWatched('swap-candle')) || queueRef.current.length > 1) return;
          enqueue(makeSwap(currentSlot(performance.now())), false);
        }, AUTO_MS);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameId);
      window.clearInterval(auto);
    };
  }, [loaded, layout]);

  const tradeRef = useRef((isBuy: boolean, size: number) => {
    queueRef.current = queueRef.current.filter((item) => item.mine);
    queueRef.current.push({ swap: makeSwap(currentSlot(performance.now()), isBuy, size), mine: true });
    void pump.current();
  });

  useEffect(
    () =>
      handleLiveActions('swap-candle', (action) => {
        const [side, size] = action.split(':');
        tradeRef.current(side === 'buy', Number(size));
      }),
    [],
  );

  if (failure) throw failure;
  if (!view) return <ExampleFrameSkeleton howTo={howTo} />;

  const trade = (isBuy: boolean, size: number) => tradeRef.current(isBuy, size);

  return (
    <ExampleFrame
      howTo={howTo}
      ran={ran}
      scene={
        <div className="swap-candle__scroll">
          <div
            ref={stageRef}
            className="swap-candle__stage"
            role="img"
            aria-label="A pipeline of views carrying swaps from a raw row to candles"
            style={{ '--hall-width': layout.width, aspectRatio: `${layout.width} / ${layout.height}` } as CSSProperties}
          >
            <Wiring view={view} layout={layout} />
            <Boards view={view} layout={layout} />
          </div>
        </div>
      }
      dock={
        <>
          <span className="swap-candle__lead">Your turn</span>
          <div className="swap-candle__side" role="group" aria-label="Buy">
            {VISITOR_SIZES.map((size) => (
              <Button key={size} type="button" size="lg" onClick={() => trade(true, size)}>
                Buy {size} RDB
              </Button>
            ))}
          </div>
          <div className="swap-candle__side" role="group" aria-label="Sell">
            {VISITOR_SIZES.map((size) => (
              <Button key={size} type="button" size="lg" variant="secondary" onClick={() => trade(false, size)}>
                Sell {size} RDB
              </Button>
            ))}
          </div>
        </>
      }
    />
  );
}
