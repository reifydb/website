import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { wasmExecutor } from '@/lib/wasm-executor-singleton';
import { cn } from '@/lib';
import { Button } from './button';
import { MarketHallSkeleton } from './market-hall';
import { NORMALIZED_VIEW, RAW_COLUMNS, RAW_TABLE, READS, SETUP, SLOTS_PER_BUCKET, insertSwaps } from './market-hall.examples';
import type { Swap } from './market-hall.examples';
import { PAPER, INK, LINE, rect, ease, lerp, bot, mascot, stall } from './pixel-kit';
import type { Context } from './pixel-kit';

type Row = Record<string, unknown>;
type NodeId = 'normalized' | 'trades' | 'block' | 'volume' | 'twap' | 'candles' | 'app';

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

interface Flow {
  start: number;
  swap: Swap;
  mine: boolean;
  snapshot: Snapshot;
  previous: Snapshot;
}

type Mark = { flow: number; fresh: true } | { flow: number; fresh: false; delta: number };

interface NodeView {
  snapshot: Snapshot;
  marks: Record<string, Mark>;
}

interface View {
  slot: number;
  nodes: Record<NodeId, NodeView>;
  you: number | null;
}

interface Box {
  x: number;
  y: number;
  width: number;
  height?: number;
}

const WIDTH = 360;
const HEIGHT = 140;
const FLOOR = 126;
const FRAME_INTERVAL = 83;
const SLOT_MS = 400;
const AUTO_MS = 1200;
const START_SLOT = 333_000_000;
const HISTORY_SLOTS = 80;
const VISITOR_SIZES = [5, 25, 100];
const MARK_SECONDS = 2;
const RETIRE = 3;
const NODES: NodeId[] = ['normalized', 'trades', 'block', 'volume', 'twap', 'candles', 'app'];
const DEPTH: Record<NodeId, number> = { normalized: 0, trades: 1, block: 2, volume: 3, twap: 3, candles: 3, app: 4 };
const ARRIVE = [0.7, 1.0, 1.3, 1.6, 1.9];
const STALL_X = 30;
const DESK_X = 72;
const RISE = '#2f9e6b';
const FALL = '#d4506c';

const BOXES: Record<NodeId, Box> = {
  normalized: { x: 6, y: 20, width: 126 },
  trades: { x: 142, y: 6, width: 66 },
  block: { x: 142, y: 60, width: 66 },
  volume: { x: 216, y: 6, width: 64 },
  twap: { x: 216, y: 36, width: 64 },
  candles: { x: 216, y: 66, width: 64, height: 54 },
  app: { x: 290, y: 40, width: 64 },
};

const CANDLE_CHART = { x: 216, y: 75, width: 64, height: 44 };

const WIRES: { target: NodeId; points: [number, number][] }[] = [
  { target: 'trades', points: [[132, 50], [137, 50], [137, 22], [142, 22]] },
  { target: 'block', points: [[175, 44], [175, 60]] },
  { target: 'volume', points: [[208, 74], [212, 74], [212, 16], [216, 16]] },
  { target: 'twap', points: [[212, 46], [216, 46]] },
  { target: 'candles', points: [[212, 74], [212, 80], [216, 80]] },
  { target: 'app', points: [[280, 96], [285, 96], [285, 62], [290, 62]] },
];

let setupPromise: Promise<void> | null = null;
let clockStart = 0;
let nextId = 1;
let mid = 142.5;
let seed = 7;
let visitorTookOver = false;
let lastSwap: Swap | null = null;

import.meta.hot?.accept(() => window.location.reload());

function random(): number {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
}

function makeSwap(slot: number, isBuy?: boolean, size?: number): Swap {
  const side = isBuy ?? random() < 0.5 + (142.5 - mid) * 0.04;
  const amount = size ?? Math.round((0.2 + random() * 6) * 100) / 100;
  mid *= 1 + (side ? 1 : -1) * amount * 0.00012 + (random() - 0.5) * 0.0012;
  const price = Math.round(mid * 1000000) / 1000000;
  return { id: nextId++, slot, isBuy: side, size: amount, price };
}

async function exec(rql: string): Promise<Row[]> {
  const result = await wasmExecutor.execute(rql);
  if (!result.success) throw new Error(`market hall failed on "${rql.slice(0, 120)}": ${result.error}`);
  return result.data ?? [];
}

function currentSlot(now: number): number {
  return START_SLOT + Math.floor((now - clockStart) / SLOT_MS);
}

function ensureSetup(): Promise<void> {
  setupPromise ??= (async () => {
    await exec(SETUP);
    const history: Swap[] = [];
    for (let slot = START_SLOT - HISTORY_SLOTS; slot < START_SLOT; slot++) {
      const count = Math.floor(random() * 3);
      for (let k = 0; k < count; k++) history.push(makeSwap(slot));
    }
    await exec(insertSwaps(history));
    lastSwap = history[history.length - 1];
    clockStart = performance.now();
  })();
  return setupPromise;
}

const SETTLE_TIMEOUT_MS = 2000;
const SETTLE_POLL_MS = 15;

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

async function settle(swap: Swap): Promise<Snapshot> {
  const deadline = performance.now() + SETTLE_TIMEOUT_MS;
  let previous = '';
  for (;;) {
    const snapshot = await readSnapshot(swap);
    if (snapshot && reflects(snapshot, swap)) {
      const key = JSON.stringify(snapshot);
      if (key === previous) return snapshot;
      previous = key;
    }
    if (performance.now() > deadline) throw new Error(`market hall views did not catch up with swap ${swap.id} within ${SETTLE_TIMEOUT_MS}ms`);
    await new Promise((resolve) => setTimeout(resolve, SETTLE_POLL_MS));
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

function arrival(flow: Flow, id: NodeId): number {
  return flow.start + ARRIVE[DEPTH[id]];
}

function shownSnapshot(base: Snapshot, flows: Flow[], id: NodeId, now: number): Snapshot {
  let shown = base;
  for (const flow of flows) if (now >= arrival(flow, id)) shown = flow.snapshot;
  return shown;
}

function recentMarks(flows: Flow[], id: NodeId, now: number): Record<string, Mark> {
  let marks: Record<string, Mark> = {};
  for (const flow of flows) {
    if (now < arrival(flow, id) || now >= arrival(flow, id) + MARK_SECONDS) continue;
    marks = { ...marks, ...marksOf(id, flow) };
  }
  return marks;
}

function viewOf(base: Snapshot, flows: Flow[], now: number): View {
  const nodes = {} as Record<NodeId, NodeView>;
  for (const id of NODES) {
    nodes[id] = { snapshot: shownSnapshot(base, flows, id, now), marks: recentMarks(flows, id, now) };
  }
  const walking = flows.find((flow) => flow.mine && now - flow.start < ARRIVE[0] + 1.2);
  const you = walking ? lerp(STALL_X + 8, DESK_X, ease(Math.min(1, (now - walking.start) / ARRIVE[0]))) : null;
  return { slot: currentSlot(performance.now()), nodes, you: you === null ? null : Math.round(you) };
}

function drawHall(c: Context) {
  rect(c, 0, 0, WIDTH, HEIGHT, PAPER);
  rect(c, 0, 0, WIDTH, FLOOR, '#f3f2fb');
  for (let x = 0; x < WIDTH; x += 24) rect(c, x, 0, 1, FLOOR, '#ebe9f7');
  rect(c, 0, FLOOR, WIDTH, 2, '#e0d2b3');
  for (let x = 0; x < WIDTH; x += 4) rect(c, x, FLOOR + 2, 2, 1, '#eadfc8');
  rect(c, 0, FLOOR + 3, WIDTH, HEIGHT - FLOOR - 3, '#f1e8d6');
}

function drawWire(c: Context, points: [number, number][]) {
  for (let i = 1; i < points.length; i++) {
    const [ax, ay] = points[i - 1];
    const [bx, by] = points[i];
    rect(c, Math.min(ax, bx), Math.min(ay, by), Math.abs(bx - ax) + 1, Math.abs(by - ay) + 1, LINE);
  }
}

function drawCandles(c: Context, node: NodeView) {
  const { x, y, width, height } = CANDLE_CHART;
  rect(c, x, y, width, height, '#ffffff');
  const candles = node.snapshot.candles;
  if (!candles.length) return;
  const top = Math.max(...candles.map((row) => Number(row.high)));
  const bottom = Math.min(...candles.map((row) => Number(row.low)));
  const span = Math.max(top - bottom, 0.01);
  const chartTop = y + 3;
  const chartHeight = height - 6;
  const toY = (value: number) => Math.round(chartTop + ((top - value) / span) * (chartHeight - 1));
  candles.forEach((row, index) => {
    const cx = x + 4 + index * 7;
    const open = Number(row.open);
    const close = Number(row.close);
    rect(c, cx + 2, toY(Number(row.high)), 1, toY(Number(row.low)) - toY(Number(row.high)) + 1, INK);
    rect(c, cx, Math.min(toY(open), toY(close)), 5, Math.max(1, Math.abs(toY(open) - toY(close))), close >= open ? RISE : FALL);
  });
}

function drawFloor(c: Context, flows: Flow[], now: number) {
  stall(c, STALL_X, FLOOR, 0, false, false);
  rect(c, DESK_X - 2, FLOOR - 9, 60, 9, '#c9a27a');
  rect(c, DESK_X - 2, FLOOR - 9, 60, 1, '#e6caa0');
  mascot(c, DESK_X + 28, FLOOR - 9, now, 0, false);
  flows.forEach((flow, index) => {
    const elapsed = now - flow.start;
    const from = STALL_X + 6;
    if (elapsed < ARRIVE[0]) bot(c, lerp(from, DESK_X, ease(elapsed / ARRIVE[0])), FLOOR, now, index, true);
    else if (elapsed < ARRIVE[0] + 1.2) bot(c, lerp(DESK_X, from, ease((elapsed - ARRIVE[0]) / 1.2)), FLOOR, now, index, false);
  });
}

function draw(c: Context, view: View, flows: Flow[], now: number) {
  drawHall(c);
  for (const wire of WIRES) drawWire(c, wire.points);
  drawCandles(c, view.nodes.candles);
  drawFloor(c, flows, now);
}

function place(box: Box): CSSProperties {
  const style: CSSProperties = { left: `${(box.x / WIDTH) * 100}%`, top: `${(box.y / HEIGHT) * 100}%`, width: `${(box.width / WIDTH) * 100}%` };
  if (box.height) style.height = `${(box.height / HEIGHT) * 100}%`;
  return style;
}

function at(x: number, y: number): CSSProperties {
  return { left: `${(x / WIDTH) * 100}%`, top: `${(y / HEIGHT) * 100}%` };
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
    return (
      <span className="market-hall__delta market-hall__delta--new">
        new
      </span>
    );
  }
  return (
    <span className={cn('market-hall__delta', mark.delta >= 0 ? 'market-hall__delta--up' : 'market-hall__delta--down')}>
      {signed(mark.delta, format)}
    </span>
  );
}

interface BoardProps {
  id: NodeId;
  title: string;
  node: NodeView;
  rows: { key: string; left: string; right: string }[];
  format: (value: number) => string;
}

function BoardView({ id, title, node, rows, format }: BoardProps) {
  return (
    <div className="market-hall__board" style={place(BOXES[id])}>
      <div className="market-hall__title">{title}</div>
      {rows.map((row) => (
        <div key={row.key} className="market-hall__row">
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

function Overlay({ view }: { view: View }) {
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
  const volume = nodes.volume.snapshot.volume.map((row, i) => ({ key: String(row.bucket), left: i === 0 ? 'now' : 'prev', right: `${compact(row.volume)} USDC` }));
  const twap = nodes.twap.snapshot.twap.map((row, i) => ({ key: String(row.bucket), left: i === 0 ? 'now' : 'prev', right: money(row.twap) }));
  const candles = nodes.app.snapshot.candles;
  const last = candles[candles.length - 1];
  const first = candles[0];
  const change = last && first ? ((Number(last.close) - Number(first.open)) / Number(first.open)) * 100 : 0;
  return (
    <div className="market-hall__overlay">
      <div className="market-hall__pair" style={at(6, 5)}>
        SOL/USDC · slot {view.slot.toLocaleString('en-US')}
      </div>
      <div className="market-hall__board market-hall__card" style={place(BOXES.normalized)}>
        <div className="market-hall__title">Normalize</div>
        <div className="market-hall__source">{RAW_TABLE}</div>
        {RAW_COLUMNS.map((column) => (
          <div key={column} className="market-hall__row">
            <span>{column}</span>
            <span>{String(card.raw[column])}</span>
          </div>
        ))}
        <div className="market-hall__source">→ {NORMALIZED_VIEW}</div>
        <div className="market-hall__row market-hall__result">
          <span>
            {Number(normalized.base_volume).toFixed(2)} SOL · {money(normalized.quote_volume)} USDC
          </span>
          <span>
            @{money(normalized.price)} {side(normalized)}
          </span>
        </div>
      </div>
      <BoardView id="trades" title="market::trades" node={nodes.trades} rows={trades} format={money} />
      <BoardView id="block" title="market::block · vwap" node={nodes.block} rows={block} format={money} />
      <BoardView id="volume" title="market::volume" node={nodes.volume} rows={volume} format={compact} />
      <BoardView id="twap" title="market::twap" node={nodes.twap} rows={twap} format={money} />
      <div className="market-hall__board market-hall__candles" style={place(BOXES.candles)}>
        <div className="market-hall__title">market::candles</div>
      </div>
      <div className="market-hall__board market-hall__app" style={place(BOXES.app)}>
        <div className="market-hall__title">Your app</div>
        <div className="market-hall__price">
          {last ? money(last.close) : '-'}
          {last && <MarkView key={nodes.app.marks[keyOf('app', last)]?.flow ?? 'none'} mark={nodes.app.marks[keyOf('app', last)]} format={money} />}
        </div>
        <div className={change >= 0 ? 'market-hall__rise' : 'market-hall__fall'}>
          {change >= 0 ? '+' : ''}
          {change.toFixed(2)}% · 8 candles
        </div>
        <div className="market-hall__source">reads market::candles</div>
      </div>
      <div className="market-hall__stall" style={at(STALL_X + 8, FLOOR - 29)}>
        raydium
      </div>
      {view.you !== null && (
        <div className="market-hall__you" style={at(view.you, FLOOR - 34)}>
          you
        </div>
      )}
    </div>
  );
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function MarketHallLive() {
  const [view, setView] = useState<View | null>(null);
  const [failure, setFailure] = useState<Error | null>(null);
  const [driving, setDriving] = useState(visitorTookOver);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const baseRef = useRef<Snapshot | null>(null);
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
        const previous = flows.length ? flows[flows.length - 1].snapshot : baseRef.current!;
        await exec(insertSwaps([swap]));
        lastSwap = swap;
        const snapshot = await settle(swap);
        const start = reduceRef.current ? -Infinity : performance.now() / 1000;
        flows.push({ start, swap, mine, snapshot, previous });
        if (reduceRef.current) repaintRef.current();
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
      .then(() => settle(lastSwap!))
      .then((snapshot) => {
        baseRef.current = snapshot;
        setView(viewOf(snapshot, [], performance.now() / 1000));
      }, setFailure);
  }, []);

  const loaded = view !== null;

  useEffect(() => {
    if (!loaded) return;
    const canvas = canvasRef.current!;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('market hall canvas has no 2d context');
    const observer = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
    });
    observer.observe(canvas);
    let frameId = 0;
    let lastPaint = 0;
    let lastKey = '';
    const paint = (ms: number) => {
      const now = reduceRef.current ? Infinity : ms / 1000;
      const flows = flowsRef.current;
      while (flows.length && ms / 1000 - flows[0].start > RETIRE) baseRef.current = flows.shift()!.snapshot;
      const next = viewOf(baseRef.current!, flows, now);
      draw(context, next, flows, now);
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
          if (visitorTookOver || !visibleRef.current || queueRef.current.length > 1) return;
          enqueue(makeSwap(currentSlot(performance.now())), false);
        }, AUTO_MS);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameId);
      window.clearInterval(auto);
    };
  }, [loaded]);

  if (failure) throw failure;
  if (!view) return <MarketHallSkeleton />;

  const trade = (isBuy: boolean, size: number) => {
    visitorTookOver = true;
    setDriving(true);
    queueRef.current = queueRef.current.filter((item) => item.mine);
    enqueue(makeSwap(currentSlot(performance.now()), isBuy, size), true);
  };

  return (
    <>
      <div className="market-hall__scroll">
        <div className="market-hall__stage">
          <canvas
            ref={canvasRef}
            width={WIDTH}
            height={HEIGHT}
            className="market-hall__frame pixel-canvas"
            role="img"
            aria-label="A pixel market hall where bots carry raydium swaps from a stall to a normalize desk"
          />
          <Overlay view={view} />
        </div>
      </div>
      <div className="market-hall__dock">
        <span className="market-hall__lead">Your turn</span>
        <div className="market-hall__side" role="group" aria-label="Buy">
          {VISITOR_SIZES.map((size) => (
            <Button key={size} type="button" size="lg" onClick={() => trade(true, size)}>
              Buy {size} SOL
            </Button>
          ))}
        </div>
        <div className="market-hall__side" role="group" aria-label="Sell">
          {VISITOR_SIZES.map((size) => (
            <Button key={size} type="button" size="lg" variant="secondary" onClick={() => trade(false, size)}>
              Sell {size} SOL
            </Button>
          ))}
        </div>
        <span className="market-hall__status" aria-live="polite">
          <i className={driving ? 'market-hall__dot market-hall__dot--off' : 'market-hall__dot'} aria-hidden="true" />
          {driving ? "you're driving · auto-play off" : 'auto-playing until you click'}
        </span>
      </div>
    </>
  );
}
