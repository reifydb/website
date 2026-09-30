import { useCallback, useEffect, useRef, useSyncExternalStore } from 'react';
import { cn } from '@/lib';
import {
  MARKET_ROWS,
  SYMBOL_WIDTH,
  TILES_PER_ROW,
  TRADE_PERIOD,
  advanceMarket,
  createMarket,
  formatPrice,
  hash,
  tileFlipTime,
  tradedRowOf,
  type BoardMode,
} from './pixel-market';
import { GEM_COLORS } from './pixel-icons';

type Context = CanvasRenderingContext2D;
type SceneKind = 'hall' | 'stack' | 'invaders' | 'booth' | 'pit' | 'plane' | 'build' | 'trade' | 'bug' | 'library' | BoardMode;
type Draw = (c: Context, width: number, height: number, time: number) => void;

interface RunnerBug {
  shape: 'beetle' | 'fly' | 'caterpillar' | 'spider';
  boxes: string[];
}

interface LevelWalk {
  from: number;
  to: number;
  start: number;
  at: number;
}

interface RaceState {
  rtt: number;
  statements: number;
  start: number;
}

const PRIMARY = '#7e85f2';
const PAPER = '#faf8f2';
const INK = '#1b1840';
const LINE = '#c9c3dc';
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const AWNING_COLORS = ['#f0a3b8', '#ffe08a', '#a3a9ff', '#ffc9a8'];
const FLIP_DURATION = 0.3;
const BOARD_WIDTH = 62;
const ROW_HEIGHT = 8;
const BOARD_HEIGHT = 3 + MARKET_ROWS.length * ROW_HEIGHT + 2;
const FRAME_INTERVAL = 83;
const MIN_WIDTH = 90;
const STACK_SYSTEMS = ['POSTGRES', 'REDIS', 'CRON', 'QUEUE', 'WORKERS'];
const STACK_LOOP = 12;
const ARRIVAL_GAP = 1.5;
const FOLD_START = 9;
const CALM_START = 10;
const HUT_WIDTH = 16;
const WIRE_WIDTH = 3;
const WIRE = '#6a71e6';
const RACE_LANE = 36;
const RACE_HEIGHT = 2 * RACE_LANE;
const DB_WIDTH = 20;
const NIGHT_TEXT = '#e6e8fd';
const BUCKET = ['.hh.', 'h..h', 'wwww', 'bbbb', '.bb.'];
const BUCKET_COLORS: Record<string, string> = { h: '#c9c3dc', w: '#ffffff', b: '#4b52d6' };
const PYRAMID = [4, 3, 2, 1];
const INVADERS = ['CACHE', 'CRON', 'QUEUE', 'WORKERS', 'GLUE'];
const KILL_ORDER = [2, 0, 4, 1, 3];
const WAVE_LOOP = 8;
const WAVE_ENTRY = 0.6;
const KILL_START = 1.2;
const KILL_GAP = 1.2;
const SHOT_TIME = 0.35;
const MARCH_STEP = 0.15;
const BOX_GAP = 6;
const NOTICE_HEIGHT = 54;
const NOTICE_LOOP = 7;
const NOTE_WIDTH = 15;
const NOTE_HEIGHT = 14;
const NOTE_GAP = 4;
const MAX_NOTES = 5;
const WOOD = '#b98b64';
const SPARK = '#ffe08a';
const SERVE_LOOP = 2.5;
const QUEUE_SIZE = 3;
const QUEUE_GAP = 9;
const ANSWER_END = 0.6;
const STEP_START = 1;
const EXIT_END = 1.8;
const PIT_LOOP = 5.5;
const TAP_PERIOD = 0.4;
const PLANE_LOOP = 6;
const LOOP_RADIUS = 7;
const SHAPES = [
  ['x.', 'x.', 'xx'],
  ['xxx', '.x.'],
  ['.xx', 'xx.'],
];
const SHAPE_TIME = 4;
const DROP_TIME = 0.5;
const TRADE_LOOP = 8;
const OFFER_TIME = 3;
const VULTURE = '#6b4a35';
const VULTURE_HEAD = '#e0a0a0';
const RUN_SPEED = 40;
const BUG_SPEED = 50;
const BUG_GAP = 2.5;
const JUMP_TIME = 0.5;
const SQUASH_TIME = 0.15;
const BOUNCE_TIME = 0.35;
const MERGE_TIME = 0.6;
const POOF_TIME = 0.6;
const MERGED_WIDTH = 31;
const LEVEL_HEIGHT = 27;
const LEVEL_WALK_SPEED = 40;
const LIBRARY_LOOP = 7;
const SHELF_WIDTH = 36;
const SHELF_BACK = '#8a6446';
const BOOK_SLOTS = 8;
const PULL_TIME = 0.4;
const FLY_TIME = 0.8;
const OPEN_TIME = 0.3;
const READ_TIME = 3;
const PAGE_TIME = 1;
const TURN_TIME = 0.3;
const RUNNER_BUGS: RunnerBug[] = [
  { shape: 'beetle', boxes: ['PG', 'REDIS'] },
  { shape: 'fly', boxes: ['CACHE'] },
  { shape: 'caterpillar', boxes: ['QUEUE', 'WORKERS'] },
  { shape: 'spider', boxes: ['CRON'] },
  { shape: 'beetle', boxes: ['PG', 'REDIS', 'CRON'] },
  { shape: 'fly', boxes: ['GLUE'] },
  { shape: 'caterpillar', boxes: ['PG', 'CACHE'] },
  { shape: 'spider', boxes: ['QUEUE'] },
];

const GLYPHS: Record<string, string> = {
  '0': '111101101101111',
  '1': '010110010010111',
  '2': '111001111100111',
  '3': '111001111001111',
  '4': '101101111001001',
  '5': '111100111001111',
  '6': '111100111101111',
  '7': '111001001010010',
  '8': '111101111101111',
  '9': '111101111001111',
  E: '111100110100111',
  T: '111010010010010',
  H: '101101111101101',
  B: '110101110101110',
  C: '111100100100111',
  S: '011100010001110',
  O: '010101101101010',
  L: '100100100100111',
  N: '110101101101101',
  P: '110101110100100',
  G: '011100101101011',
  R: '110101110101101',
  D: '110101101101110',
  I: '111010010010111',
  Y: '101101010010010',
  F: '111100110100100',
  Q: '010101101110011',
  U: '101101101101111',
  W: '101101101111101',
  K: '101101110101101',
  '+': '000010111010000',
  A: '010101111101101',
  '/': '001001010100100',
  V: '101101101101010',
  '?': '111001010000010',
  '!': '010010010000010',
};

const market = createMarket();
const marketListeners = new Set<() => void>();

function advanceSharedMarket(time: number) {
  const before = market.nextTrade;
  advanceMarket(market, time);
  if (market.nextTrade !== before) marketListeners.forEach((listener) => listener());
}

function subscribeToMarket(listener: () => void) {
  marketListeners.add(listener);
  return () => {
    marketListeners.delete(listener);
  };
}

function rect(c: Context, x: number, y: number, width: number, height: number, color: string) {
  c.fillStyle = color;
  c.fillRect(Math.round(x), Math.round(y), width, height);
}

function ease(u: number) {
  return u <= 0 ? 0 : u >= 1 ? 1 : u * u * (3 - 2 * u);
}

function lerp(from: number, to: number, u: number) {
  return from + (to - from) * u;
}

function dither(c: Context, width: number, top: number, bottom: number, from: string, to: string) {
  const rows = bottom - top;
  for (let j = 0; j < rows; j++) {
    const threshold = j >= rows - 2 ? 0 : 1 - (j + 1) / (rows - 1);
    rect(c, 0, top + j, width, 1, from);
    for (let x = 0; x < width; x++) {
      if (BAYER[(j % 4) * 4 + (x % 4)] / 16 >= threshold) rect(c, x, top + j, 1, 1, to);
    }
  }
}

function grass(c: Context, width: number, groundY: number, bottom: number, time: number, offset = 0) {
  rect(c, 0, groundY, width, bottom - groundY, PRIMARY);
  for (let x = 0; x < width; x++) {
    if (hash((x + offset) * 3 + 1) > 0.5) rect(c, x, groundY, 1, 1, '#a3a9ff');
  }
  for (let x = 0; x < width; x++) {
    const blade = hash((x + offset) * 13 + 1);
    if (blade < 0.55) continue;
    const bladeHeight = 1 + (blade > 0.85 ? 1 : 0) + (hash(x + offset + Math.floor(time * 1.5) * 131) > 0.85 ? 1 : 0);
    rect(c, x, groundY - bladeHeight, 1, bladeHeight, blade > 0.75 ? '#6a71e6' : PRIMARY);
  }
  for (let y = groundY + 2; y < Math.min(bottom, groundY + 6); y++) {
    for (let x = 0; x < width; x++) {
      const world = x + offset;
      if ((world - (y % 2) * 3) % 7 === 0 && hash(world * 5 + y) > 0.5) rect(c, x, y, 2, 1, '#6a71e6');
    }
  }
}

function clouds(c: Context, width: number, time: number) {
  for (let k = 0; k < 3; k++) {
    const x = ((time * 1.2 + k * (width / 3) + hash(k) * 40) % (width + 40)) - 20;
    const y = 2 + k * 3;
    rect(c, x, y + 2, 14, 3, '#ffffff');
    rect(c, x + 3, y, 6, 2, '#ffffff');
    rect(c, x + 9, y + 1, 3, 1, '#ffffff');
    rect(c, x + 1, y + 5, 12, 1, '#ebe4f7');
  }
}

function hills(c: Context, width: number, groundY: number, offset = 0) {
  for (let x = 0; x < width; x++) {
    const world = x + offset;
    const top = groundY - 10 - (8 + Math.sin(world * 0.05) * 4 + Math.sin(world * 0.013 + 1) * 6);
    rect(c, x, top, 1, groundY - top, '#e0daf6');
  }
  for (let x = 0; x < width; x++) {
    const world = x + offset;
    const top = groundY - 3 - (4 + Math.sin(world * 0.08 + 2) * 3 + Math.sin(world * 0.021) * 4);
    rect(c, x, top, 1, groundY - top, '#c3c6fb');
  }
}

function glyph(c: Context, char: string, x: number, y: number, color: string) {
  const pixels = GLYPHS[char];
  if (!pixels) return;
  for (let i = 0; i < 15; i++) {
    if (pixels[i] === '1') rect(c, x + (i % 3), y + Math.floor(i / 3), 1, 1, color);
  }
}

function tile(c: Context, x: number, y: number, now: string, old: string, elapsed: number) {
  rect(c, x, y, 5, 7, elapsed >= 0 && elapsed < 1.2 ? '#e3e5ff' : PAPER);
  if (elapsed >= 0 && elapsed < FLIP_DURATION) {
    const firstHalf = elapsed < FLIP_DURATION / 2;
    glyph(c, firstHalf ? old : now, x + 1, y + 1, INK);
    rect(c, x, firstHalf ? y : y + 4, 5, 3, LINE);
  } else {
    glyph(c, now, x + 1, y + 1, INK);
  }
  rect(c, x, y + 3, 1, 1, '#b8b3d6');
  rect(c, x + 4, y + 3, 1, 1, '#b8b3d6');
}

function board(c: Context, left: number, top: number, time: number, mode: BoardMode) {
  rect(c, left - 1, top - 1, BOARD_WIDTH + 2, BOARD_HEIGHT + 2, LINE);
  rect(c, left, top, BOARD_WIDTH, BOARD_HEIGHT, '#e6e4f5');
  rect(c, left, top, BOARD_WIDTH, 1, '#f3f2fb');
  MARKET_ROWS.forEach(({ symbol }, row) => {
    const y = top + 3 + row * ROW_HEIGHT;
    const change = market.lastChanges[row];
    const now = symbol.padEnd(SYMBOL_WIDTH) + formatPrice(market.prices[row]);
    const old = symbol.padEnd(SYMBOL_WIDTH) + formatPrice(change ? change.oldPrice : market.prices[row]);
    for (let column = 0; column < TILES_PER_ROW; column++) {
      const x = left + 3 + column * 6 + (column >= SYMBOL_WIDTH ? 3 : 0);
      tile(c, x, y, now[column], old[column], time - tileFlipTime(market, row, column, mode));
    }
    if (!change) return;
    const arrowX = left + 56;
    const arrowY = y + 2;
    if (change.rising) {
      rect(c, arrowX + 1, arrowY, 1, 1, '#2f9e6b');
      rect(c, arrowX, arrowY + 1, 3, 1, '#2f9e6b');
    } else {
      rect(c, arrowX, arrowY + 1, 3, 1, '#d4506c');
      rect(c, arrowX + 1, arrowY + 2, 1, 1, '#d4506c');
    }
  });
}

function bot(c: Context, x: number, floor: number, time: number, index: number, carrying: boolean, liftY?: number) {
  const y = floor - 7;
  rect(c, x - 1, y, 1, 4, LINE);
  rect(c, x + 5, y, 1, 4, LINE);
  rect(c, x, y, 5, 4, '#ffffff');
  rect(c, x, y + 3, 5, 1, '#e6e4f5');
  rect(c, x + 1, y + 1, 1, 1, PRIMARY);
  rect(c, x + 3, y + 1, 1, 1, PRIMARY);
  rect(c, x + 2, y - 2, 1, 2, LINE);
  rect(c, x + 2, y - 3, 1, 1, Math.floor(time * 2 + index) % 2 ? '#ffe08a' : '#e0708f');
  rect(c, x, floor - 3, 2, 2, '#3f3b99');
  rect(c, x + 3, floor - 3, 2, 2, '#3f3b99');
  if (carrying) {
    rect(c, x + 1, y - 7, 3, 4, '#ffffff');
    rect(c, x + 1, y - 6, 3, 1, PRIMARY);
    rect(c, x + 1, y - 4, 2, 1, LINE);
  }
  if (liftY !== undefined) {
    rect(c, x + 5, liftY, 1, y + 1 - liftY, LINE);
    rect(c, x + 4, liftY - 1, 3, 1, '#ffffff');
  }
}

function stall(c: Context, left: number, floor: number, index: number, flash: boolean, ticket: boolean) {
  const top = floor - 15;
  const awning = AWNING_COLORS[index % 4];
  rect(c, left + 1, top + 3, 1, 12, '#b98b64');
  rect(c, left + 14, top + 3, 1, 12, '#b98b64');
  for (let x = 0; x < 16; x++) rect(c, left + x, top, 1, 3, Math.floor(x / 2) % 2 ? '#ffffff' : awning);
  for (let x = 0; x < 16; x += 2) rect(c, left + x, top + 3, 1, 1, awning);
  rect(c, left + 6, floor - 9, 4, 3, '#ffffff');
  rect(c, left + 7, floor - 8, 1, 1, PRIMARY);
  rect(c, left + 8, floor - 8, 1, 1, PRIMARY);
  rect(c, left, floor - 6, 16, 6, flash ? '#ffe08a' : '#c9a27a');
  rect(c, left, floor - 6, 16, 1, '#e6caa0');
  for (let j = 0; j < 4; j++) rect(c, left + 2 + j * 3, floor - 7, 2, 1, AWNING_COLORS[(index + j + 1) % 4]);
  if (ticket) {
    rect(c, left + 6, top - 6, 4, 4, '#ffffff');
    rect(c, left + 6, top - 5, 4, 1, PRIMARY);
    rect(c, left + 7, top - 2, 2, 1, '#ffffff');
  }
}

function hall(c: Context, width: number, height: number, time: number) {
  const groundY = height - 14;
  clouds(c, width, time);
  hills(c, width, groundY);
  grass(c, width, groundY, height - 7, time);
  dither(c, width, height - 7, height, PRIMARY, PAPER);

  const left = Math.round(width * 0.05);
  const right = width - left;
  const span = right - left;
  const middle = left + span / 2;
  const floor = groundY + 3;
  const wallTop = floor - 46;
  const roofY = (x: number) => Math.round(wallTop - 13 * (1 - Math.abs(x - middle) / (span / 2)));
  for (let x = left; x < right; x++) rect(c, x, roofY(x), 1, wallTop - roofY(x), '#ffffff80');
  rect(c, left, wallTop, span, floor - wallTop, '#ffffff4d');
  rect(c, left, floor - 1, span, 2, '#e0d2b3');
  for (let x = left; x < right; x += 4) rect(c, x, floor, 2, 1, '#eadfc8');

  const boardLeft = Math.round(middle - BOARD_WIDTH / 2);
  const boardTop = wallTop + 1;
  const boardRight = boardLeft + BOARD_WIDTH;
  rect(c, boardLeft + 4, roofY(boardLeft + 4), 1, boardTop - roofY(boardLeft + 4), LINE);
  rect(c, boardRight - 5, roofY(boardRight - 5), 1, boardTop - roofY(boardRight - 5), LINE);
  board(c, boardLeft, boardTop, time, 'incremental');

  let stallXs = [left + 5, left + 29, right - 21, right - 45].filter(
    (x) => x >= left && x + 16 <= right && (x + 16 < boardLeft - 2 || x > boardRight + 2),
  );
  if (stallXs.length < 2) stallXs = [left + 1, right - 17];
  stallXs.sort((a, b) => a - b);
  const stallOf = (trade: number) => Math.floor(hash(trade * 5 + 1) * stallXs.length);
  const currentTrade = Math.floor(time / TRADE_PERIOD);
  stallXs.forEach((x, index) => {
    const hit = [currentTrade, currentTrade - 1].find(
      (trade) => trade >= 0 && stallOf(trade) === index && time - trade * TRADE_PERIOD < 0.5,
    );
    stall(c, x, floor, index, hit !== undefined, hit !== undefined && time - hit * TRADE_PERIOD < 0.25);
  });

  const dropX = boardLeft + 33;
  const stallCenter = (trade: number) => stallXs[stallOf(trade)] + 8;
  for (let botIndex = 0; botIndex < 2; botIndex++) {
    const lap = Math.floor((time - botIndex * TRADE_PERIOD) / (2 * TRADE_PERIOD));
    if (lap < 0) {
      bot(c, stallCenter(botIndex) - 2, floor, time, botIndex, false);
      continue;
    }
    const trade = 2 * lap + botIndex;
    const elapsed = time - trade * TRADE_PERIOD;
    const from = stallCenter(trade) - 2;
    if (elapsed < 0.25) {
      bot(c, from, floor, time, botIndex, false);
    } else if (elapsed < 1.4) {
      bot(c, lerp(from, dropX, ease((elapsed - 0.25) / 1.15)), floor, time, botIndex, true);
    } else if (elapsed < 1.75) {
      bot(c, dropX, floor, time, botIndex, false, boardTop + 3 + tradedRowOf(trade) * ROW_HEIGHT + 3);
    } else {
      const next = stallCenter(trade + 2) - 2;
      bot(c, lerp(dropX, next, ease((elapsed - 1.75) / (2 * TRADE_PERIOD - 1.75))), floor, time, botIndex, false);
    }
  }

  for (let x = left; x < right; x += 10) rect(c, x, roofY(x), 1, wallTop - roofY(x), '#ffffffd9');
  for (let x = left; x < right; x++) {
    rect(c, x, roofY(x), 1, 1, '#ffffff');
    rect(c, x, roofY(x) + 1, 1, 1, '#d9d5ec');
  }
  rect(c, left, wallTop, span, 2, '#ffffff');
  rect(c, left, wallTop + 2, span, 1, '#d9d5ec');
  [left, right - 2, Math.round(left + span * 0.3), Math.round(right - span * 0.3)]
    .filter((x) => x + 2 < boardLeft || x > boardRight)
    .forEach((x) => {
      rect(c, x, wallTop, 2, floor - wallTop - 1, '#ffffff');
      rect(c, x + 1, wallTop, 1, floor - wallTop - 1, '#d9d5ec');
    });
  const poleX = Math.round(middle);
  rect(c, poleX, roofY(poleX) - 6, 1, 6, LINE);
  rect(c, poleX + 1, roofY(poleX) - 6, 3 + (Math.floor(time * 4) % 2), 2, PRIMARY);
}

function compare(c: Context, width: number, height: number, time: number, mode: BoardMode) {
  const floor = height - 3;
  rect(c, 0, floor, width, height - floor, '#e0d2b3');
  const boardLeft = Math.round(width / 2 - BOARD_WIDTH / 2);
  const boardTop = 3;
  rect(c, boardLeft + 4, 0, 1, boardTop, LINE);
  rect(c, boardLeft + BOARD_WIDTH - 5, 0, 1, boardTop, LINE);
  board(c, boardLeft, boardTop, time, mode);
  const elapsed = time - market.lastFlipTime;
  if (mode === 'incremental') {
    const liftY = elapsed >= 0 && elapsed < 0.45 ? boardTop + 3 + market.lastTradedRow * ROW_HEIGHT + 3 : undefined;
    bot(c, boardLeft + 33, floor, time, 0, false, liftY);
    return;
  }
  const sweeping = elapsed >= 0 && elapsed < 0.7;
  const x = sweeping ? boardLeft + 2 + (elapsed / 0.7) * (BOARD_WIDTH - 6) : boardLeft + 2;
  const liftY = sweeping ? boardTop + 3 + Math.min(3, Math.floor((elapsed / 0.7) * 4)) * ROW_HEIGHT + 3 : undefined;
  bot(c, x - 5, floor, time, 1, false, liftY);
}

function caption(c: Context, text: string, x: number, y: number, color: string) {
  [...text].forEach((char, i) => glyph(c, char, x + i * 4, y, color));
}

function wire(c: Context, from: number, to: number, y: number) {
  for (let x = from; x < to; x++) rect(c, x, y + (x % 3 === 1 ? 1 : 0), 1, 1, WIRE);
}

function tangle(c: Context, from: number, to: number, top: number, rise: number) {
  for (let x = from; x <= to; x++) {
    rect(c, x, top - Math.round(Math.sin((Math.PI * (x - from)) / (to - from)) * rise), 1, 1, WIRE);
  }
}

function shelterWall(grow: number) {
  return Math.round(20 * Math.min(1, grow * 2));
}

function shelterRoof(left: number, right: number, grow: number) {
  const peak = 8 * ease(grow * 2 - 1);
  const middle = (left + right) / 2;
  return (x: number) => Math.round(peak * (1 - Math.abs(x - middle) / ((right - left) / 2)));
}

function shelterBack(c: Context, left: number, right: number, floor: number, grow: number) {
  if (grow <= 0) return;
  const wall = shelterWall(grow);
  const roof = shelterRoof(left, right, grow);
  rect(c, left, floor - wall, right - left, wall, '#ffffff4d');
  for (let x = left; x < right; x++) rect(c, x, floor - 20 - roof(x), 1, roof(x), '#ffffff80');
  rect(c, left, floor - 1, right - left, 2, '#e0d2b3');
}

function shelterFront(c: Context, left: number, right: number, floor: number, grow: number) {
  if (grow <= 0) return;
  const wall = shelterWall(grow);
  [left, right - 2].forEach((x) => {
    rect(c, x, floor - wall, 2, Math.max(0, wall - 1), '#ffffff');
    rect(c, x + 1, floor - wall, 1, Math.max(0, wall - 1), '#d9d5ec');
  });
  if (grow < 0.5) return;
  const roof = shelterRoof(left, right, grow);
  rect(c, left, floor - 20, right - left, 2, '#ffffff');
  rect(c, left, floor - 18, right - left, 1, '#d9d5ec');
  for (let x = left; x < right; x++) {
    rect(c, x, floor - 20 - roof(x), 1, 1, '#ffffff');
    rect(c, x, floor - 19 - roof(x), 1, 1, '#d9d5ec');
  }
}

function stack(c: Context, width: number, height: number, time: number) {
  const t = time % STACK_LOOP;
  const groundY = height - 9;
  const floor = groundY + 2;
  grass(c, width, groundY, height, time);

  const count = STACK_SYSTEMS.length;
  const left = Math.round(width / 2 - (count * HUT_WIDTH + (count - 1) * WIRE_WIDTH) / 2);
  const packedLeft = Math.round(width / 2 - (count * HUT_WIDTH) / 2);
  const fold = ease(t - FOLD_START);
  const huts = STACK_SYSTEMS.map((_, i) =>
    Math.round(lerp(left + i * (HUT_WIDTH + WIRE_WIDTH), packedLeft + i * HUT_WIDTH, fold)),
  );
  const arrived = Math.min(count, Math.floor(t / ARRIVAL_GAP) + 1);
  const botX = (i: number) => huts[i] + HUT_WIDTH / 2 - 2;
  const hits = new Set<number>();
  const bots: { x: number; carrying: boolean }[] = [];

  if (t < (count - 1) * ARRIVAL_GAP) {
    const hop = Math.floor(t / 0.75);
    const u = (t % 0.75) / 0.75;
    const from = hop % arrived;
    if (u < 0.25) hits.add(from);
    bots.push({ x: lerp(botX(from), botX((hop + 1) % arrived), ease(u)), carrying: true });
  } else if (t < FOLD_START) {
    for (let b = 0; b < 3; b++) {
      const local = t + b * 0.13;
      const hop = Math.floor(local / 0.4);
      const u = (local % 0.4) / 0.4;
      const target = (n: number) => Math.floor(hash(b * 97 + n * 7 + 3) * count);
      if (u < 0.3) hits.add(target(hop));
      bots.push({ x: lerp(botX(target(hop)), botX(target(hop + 1)), ease(u)), carrying: true });
    }
  } else if (t < CALM_START) {
    bots.push({ x: botX(2), carrying: false });
  } else {
    const elapsed = t - CALM_START;
    if (elapsed >= 1 && elapsed < 1.5) hits.add(2);
    bots.push({ x: lerp(botX(0), botX(2), ease(elapsed)), carrying: elapsed < 1 });
  }

  const shelterLeft = packedLeft - 4;
  const shelterRight = packedLeft + count * HUT_WIDTH + 4;
  shelterBack(c, shelterLeft, shelterRight, floor, fold);

  if (t < FOLD_START) {
    for (let i = 1; i < arrived; i++) wire(c, huts[i - 1] + HUT_WIDTH, huts[i], floor - 11);
    if (arrived === count) {
      [[0, 2, 3], [1, 3, 4], [2, 4, 5], [0, 4, 7]].forEach(([a, b, rise]) =>
        tangle(c, huts[a] + HUT_WIDTH / 2, huts[b] + HUT_WIDTH / 2, floor - 16, rise),
      );
    }
  }

  for (let i = 0; i < arrived; i++) {
    const pop = Math.min(1, (t - i * ARRIVAL_GAP) / 0.3);
    stall(c, huts[i], floor - Math.round((1 - ease(pop)) * 6), i, pop < 1 || hits.has(i), hits.has(i));
  }
  bots.forEach((b, index) => bot(c, b.x, floor, time, index, b.carrying));
  shelterFront(c, shelterLeft, shelterRight, floor, fold);

  const folded = t >= FOLD_START;
  const label = folded ? 'REIFYDB' : arrived === 1 ? STACK_SYSTEMS[0] : `+ ${STACK_SYSTEMS[arrived - 1]}`;
  caption(c, label, left, 4, folded ? '#4b52d6' : INK);
}

function database(c: Context, left: number, floor: number, flash: boolean) {
  rect(c, left - 1, floor - 16, DB_WIDTH + 2, 2, '#ffffff');
  rect(c, left, floor - 14, DB_WIDTH, 14, flash ? '#ffe08a' : '#c9ccfb');
  rect(c, left, floor - 14, DB_WIDTH, 1, NIGHT_TEXT);
  caption(c, 'DB', left + 7, floor - 11, INK);
  rect(c, left + 8, floor - 5, 4, 5, '#4b52d6');
}

function bucket(c: Context, x: number, y: number) {
  BUCKET.forEach((row, j) => {
    [...row].forEach((cell, i) => {
      if (cell !== '.') rect(c, x + i, y + j, 1, 1, BUCKET_COLORS[cell]);
    });
  });
}

function buckets(c: Context, botX: number, floor: number, count: number) {
  let left = count;
  PYRAMID.forEach((capacity, row) => {
    const size = Math.min(capacity, left);
    left -= size;
    const rowLeft = Math.round(botX + 2.5 - (size * 5 - 1) / 2);
    for (let k = 0; k < size; k++) bucket(c, rowLeft + k * 5, floor - 14 - row * 4);
  });
}

function lane(
  c: Context,
  width: number,
  top: number,
  time: number,
  t: number,
  distance: number,
  trip: number,
  trips: number,
  stack: number,
  label: string,
  index: number,
) {
  const floor = top + RACE_LANE - 3;
  grass(c, width, floor, top + RACE_LANE, time);
  const appLeft = Math.max(4, Math.round(width * 0.04));
  const home = appLeft + 18;
  const dbLeft = home + 6 + Math.round(distance * (width - appLeft - DB_WIDTH - home - 6));
  const target = dbLeft - 6;
  const done = Math.min(trips, Math.floor(t / trip));
  const moving = done < trips;
  const phase = (t % trip) / trip;
  const outbound = moving && phase < 0.5;
  const x = !moving ? home : outbound ? lerp(home, target, ease(phase * 2)) : lerp(target, home, ease((phase - 0.5) * 2));

  stall(c, appLeft, floor, index, false, false);
  database(c, dbLeft, floor, moving && phase >= 0.5 && phase < 0.62);
  bot(c, x, floor, time, index, false);
  if (outbound) buckets(c, x, floor, stack);

  const count = `${done}/${trips}`;
  caption(c, label, appLeft, top + 2, NIGHT_TEXT);
  caption(c, count, width - appLeft - count.length * 4 + 1, top + 2, moving ? NIGHT_TEXT : '#ffe08a');
}

function race(c: Context, width: number, time: number, state: RaceState) {
  const distance = 0.4 + (0.6 * (state.rtt - 1)) / 9;
  const trip = 1.2 * distance;
  if (time - state.start >= state.statements * trip + 1) state.start = time;
  const t = time - state.start;
  lane(c, width, 0, time, t, distance, trip, state.statements, 1, 'TRADITIONAL', 0);
  lane(c, width, RACE_LANE, time, t, distance, trip, 1, state.statements, 'REIFYDB', 1);
}

function invader(c: Context, x: number, y: number, label: string, step: number) {
  const width = label.length * 4 + 5;
  rect(c, x, y, width, 9, '#c9ccfb');
  rect(c, x, y, width, 1, NIGHT_TEXT);
  rect(c, x, y + 8, width, 1, '#8f95ea');
  caption(c, label, x + 3, y + 2, INK);
  const spread = step % 2 ? 1 : 2;
  rect(c, x + spread, y + 9, 1, 1, '#8f95ea');
  rect(c, x + width - 1 - spread, y + 9, 1, 1, '#8f95ea');
}

function puff(c: Context, centerX: number, centerY: number, u: number) {
  for (let k = 0; k < 14; k++) {
    if (hash(k * 7 + 1) < u) continue;
    const angle = hash(k * 3 + 2) * Math.PI * 2;
    const radius = u * 10 * (0.4 + hash(k * 5 + 3));
    rect(c, centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius * 0.6, 1, 1, k % 3 ? '#ffe08a' : '#ffffff');
  }
}

function invaders(c: Context, width: number, height: number, time: number) {
  const t = time % WAVE_LOOP;
  const wave = Math.floor(time / WAVE_LOOP);
  const floor = height - 3;
  grass(c, width, floor, height, time);

  const widths = INVADERS.map((label) => label.length * 4 + 5);
  const formation = widths.reduce((sum, w) => sum + w, 0) + BOX_GAP * (INVADERS.length - 1);
  const reach = Math.max(1, Math.floor(Math.min(60, width - formation - 8) / 2));
  const formationAt = (at: number) => {
    const step = Math.floor(at / MARCH_STEP);
    const swing = step % (2 * reach);
    const offset = (swing < reach ? swing : 2 * reach - swing) * 2 - reach;
    const drop = Math.min(2, Math.floor(step / reach)) * 2;
    const entry = lerp(-20, 0, ease(at / WAVE_ENTRY));
    return { left: Math.round(width / 2 - formation / 2 + offset), top: Math.round(10 + drop + entry), step };
  };
  const boxLeft = (i: number, at: number) =>
    formationAt(at).left + widths.slice(0, i).reduce((sum, w) => sum + w, 0) + i * BOX_GAP;
  const killTime = (i: number) => KILL_START + KILL_ORDER.indexOf(i) * KILL_GAP;
  const aimX = (i: number) => boxLeft(i, killTime(i)) + widths[i] / 2 - 2;

  const now = formationAt(t);
  INVADERS.forEach((label, i) => {
    const hit = killTime(i);
    if (t < hit) invader(c, boxLeft(i, t), now.top, label, now.step);
    else if (t < hit + 0.5) puff(c, aimX(i) + 2, formationAt(hit).top + 4, (t - hit) / 0.5);
  });

  const home = width / 2 - 2;
  const lastKill = killTime(KILL_ORDER[KILL_ORDER.length - 1]);
  const next = KILL_ORDER.findIndex((i) => t < killTime(i));
  let botX = lerp(aimX(KILL_ORDER[KILL_ORDER.length - 1]), home, ease(t - lastKill));
  if (next !== -1) {
    const target = KILL_ORDER[next];
    const from = next === 0 ? home : aimX(KILL_ORDER[next - 1]);
    const fromTime = next === 0 ? WAVE_ENTRY : killTime(KILL_ORDER[next - 1]);
    const fireTime = killTime(target) - SHOT_TIME;
    botX = lerp(from, aimX(target), ease((t - fromTime) / (fireTime - fromTime)));
    if (t >= fireTime) {
      const boltY = lerp(floor - 11, formationAt(killTime(target)).top + 9, (t - fireTime) / SHOT_TIME);
      rect(c, botX + 2, boltY, 1, 3, '#ffe08a');
    }
  }
  bot(c, botX, floor, time, 0, false);

  const margin = Math.max(4, Math.round(width * 0.04));
  const kills = wave * INVADERS.length + KILL_ORDER.filter((i) => t >= killTime(i)).length;
  caption(c, `SCORE ${String(kills * 10).padStart(6, '0')}`, margin, 2, NIGHT_TEXT);
  if (t >= lastKill + 0.3 && t < WAVE_LOOP - 0.3 && Math.floor(t * 4) % 2 === 0) {
    caption(c, 'WAVE CLEAR', Math.round(width / 2 - 20), 16, '#ffe08a');
  }
}

function note(c: Context, x: number, y: number, label: string, pin: string, fresh: boolean) {
  rect(c, x, y, NOTE_WIDTH, NOTE_HEIGHT, fresh ? '#fff4c2' : '#ffffff');
  rect(c, x, y + NOTE_HEIGHT - 1, NOTE_WIDTH, 1, fresh ? '#f0dc8c' : '#e6e4f5');
  rect(c, x + 6, y - 1, 3, 2, pin);
  caption(c, label, x + 2, y + 3, INK);
  rect(c, x + 2, y + 9, 11, 1, LINE);
  rect(c, x + 2, y + 11, 7, 1, LINE);
}

function sparkle(c: Context, x: number, y: number, time: number) {
  const arm = Math.floor(time * 4) % 2 ? 1 : 2;
  rect(c, x, y, 1, 1, SPARK);
  for (let d = 1; d <= arm; d++) {
    rect(c, x - d, y, 1, 1, SPARK);
    rect(c, x + d, y, 1, 1, SPARK);
    rect(c, x, y - d, 1, 1, SPARK);
    rect(c, x, y + d, 1, 1, SPARK);
  }
}

function noticeBoard(c: Context, width: number, height: number, time: number, count: number) {
  const groundY = height - 14;
  const floor = groundY + 3;
  clouds(c, width, time);
  hills(c, width, groundY);
  grass(c, width, groundY, height - 7, time);
  dither(c, width, height - 7, height, PRIMARY, PAPER);

  const slots = Math.max(1, Math.min(MAX_NOTES, count, Math.floor((width - 16) / (NOTE_WIDTH + NOTE_GAP))));
  const boardWidth = slots * (NOTE_WIDTH + NOTE_GAP) - NOTE_GAP + 10;
  const boardHeight = NOTE_HEIGHT + 10;
  const boardLeft = Math.round(width / 2 - boardWidth / 2);
  const boardTop = 6;
  const boardBottom = boardTop + boardHeight;
  const slotX = (i: number) => boardLeft + 5 + i * (NOTE_WIDTH + NOTE_GAP);
  const slotY = boardTop + 5;

  [boardLeft + 4, boardLeft + boardWidth - 6].forEach((x) => rect(c, x, boardBottom, 2, groundY - boardBottom + 1, WOOD));
  rect(c, boardLeft, boardTop, boardWidth, boardHeight, WOOD);
  rect(c, boardLeft, boardTop, boardWidth, 1, '#d4ad86');
  rect(c, boardLeft + 2, boardTop + 2, boardWidth - 4, boardHeight - 4, '#ecdcc0');
  for (let x = boardLeft + 2; x < boardLeft + boardWidth - 2; x++) {
    for (let y = boardTop + 2; y < boardBottom - 2; y++) {
      if (hash(x * 7 + y * 131) > 0.86) rect(c, x, y, 1, 1, '#dfc9a3');
    }
  }

  const newest = slots - 1;
  const first = count - newest;
  const label = (i: number) => String(first + i).padStart(3, '0');
  const pin = (i: number) => AWNING_COLORS[(first + i) % 4];
  for (let i = 0; i < newest; i++) note(c, slotX(i), slotY, label(i), pin(i), false);

  const t = time % NOTICE_LOOP;
  const head = floor - 7;
  const standX = slotX(newest) + 2;
  const carryLift = head - 2;
  const pinLift = slotY + NOTE_HEIGHT + 1;
  const walkEnd = 2.2;
  const liftEnd = 2.8;
  const lowerEnd = 3.4;
  const leaveEnd = 5.4;

  if (t < liftEnd) {
    const x = t < walkEnd ? lerp(-10, standX, ease(t / walkEnd)) : standX;
    const lift = t < walkEnd ? carryLift : lerp(carryLift, pinLift, ease((t - walkEnd) / (liftEnd - walkEnd)));
    bot(c, x, floor, time, 0, false, lift);
    note(c, x - 2, lift - 1 - NOTE_HEIGHT, label(newest), pin(newest), true);
    return;
  }

  note(c, slotX(newest), slotY, label(newest), pin(newest), true);
  sparkle(c, slotX(newest) + NOTE_WIDTH, slotY - 1, time);
  if (t < lowerEnd) {
    bot(c, standX, floor, time, 0, false, lerp(pinLift, carryLift, ease((t - liftEnd) / (lowerEnd - liftEnd))));
  } else if (t < leaveEnd) {
    bot(c, lerp(standX, width + 10, ease((t - lowerEnd) / (leaveEnd - lowerEnd))), floor, time, 0, false);
  }
}

function bubble(c: Context, x: number, y: number, char: string, color: string) {
  rect(c, x, y, 5, 7, '#ffffff');
  rect(c, x + 1, y + 7, 1, 1, '#ffffff');
  glyph(c, char, x + 1, y + 1, color);
}

function booth(c: Context, width: number, height: number, time: number) {
  const groundY = height - 14;
  const floor = groundY + 3;
  clouds(c, width, time);
  hills(c, width, groundY);
  grass(c, width, groundY, height - 7, time);
  dither(c, width, height - 7, height, PRIMARY, PAPER);

  const boothLeft = Math.round(width / 2 - 8);
  const t = time % SERVE_LOOP;
  const serve = Math.floor(time / SERVE_LOOP);
  stall(c, boothLeft, floor, 2, false, false);
  caption(c, 'INFO', boothLeft + 1, floor - 21, INK);
  if (t < ANSWER_END) bubble(c, boothLeft + 5, floor - 30, '!', PRIMARY);

  const slotX = (slot: number) => boothLeft - 7 - slot * QUEUE_GAP;
  const step = ease((t - STEP_START) / (EXIT_END - STEP_START));
  const visitor = (x: number, id: number, asking: boolean) => {
    bot(c, x, floor, time, id, false);
    if (asking) bubble(c, x, floor - 19, '?', INK);
  };
  const exit = ease((t - ANSWER_END) / (EXIT_END - ANSWER_END));
  visitor(lerp(slotX(0), width + 10, exit), serve, t < ANSWER_END);
  for (let slot = 1; slot < QUEUE_SIZE; slot++) visitor(lerp(slotX(slot), slotX(slot - 1), step), serve + slot, true);
  visitor(lerp(-10, slotX(QUEUE_SIZE - 1), step), serve + QUEUE_SIZE, true);
}

function garage(c: Context, left: number, floor: number) {
  const top = floor - 16;
  rect(c, left, top, 20, 16, '#ffffff');
  rect(c, left + 19, top, 1, 16, '#e6e4f5');
  rect(c, left - 1, top - 1, 22, 7, PRIMARY);
  caption(c, 'PIT', left + 5, top, INK);
  rect(c, left + 4, floor - 10, 12, 10, INK);
}

function smoke(c: Context, x: number, floor: number, time: number) {
  for (let k = 0; k < 3; k++) {
    const u = (time * 1.5 + k / 3) % 1;
    if (u < 0.8) rect(c, x - 2 - u * 4, floor - 8 - u * 8, 2, 2, '#b8b3d6');
  }
}

function kart(c: Context, x: number, floor: number, time: number) {
  bot(c, x, floor - 1, time, 0, false);
  rect(c, x - 6, floor - 9, 3, 1, INK);
  rect(c, x - 5, floor - 8, 1, 3, INK);
  rect(c, x - 4, floor - 5, 15, 3, '#e0708f');
  rect(c, x - 4, floor - 5, 13, 1, '#f0a3b8');
  [x - 3, x + 5].forEach((wheelX) => {
    rect(c, wheelX, floor - 3, 3, 3, INK);
    rect(c, wheelX + 1, floor - 2, 1, 1, LINE);
  });
}

function crew(c: Context, x: number, floor: number, time: number, liftY: number) {
  bot(c, x, floor, time, 1, false);
  rect(c, x - 1, liftY, 1, floor - 6 - liftY, LINE);
  rect(c, x - 3, liftY - 1, 3, 2, '#9a96b8');
}

function pitStop(c: Context, width: number, height: number, time: number) {
  const groundY = height - 14;
  const floor = groundY + 3;
  clouds(c, width, time);
  hills(c, width, groundY);
  grass(c, width, groundY, height - 7, time);
  dither(c, width, height - 7, height, PRIMARY, PAPER);

  const garageLeft = Math.round(width / 2 + 4);
  const stopX = garageLeft - 22;
  const doorX = garageLeft + 7;
  const crewX = stopX + 12;
  garage(c, garageLeft, floor);
  rect(c, stopX - 7, floor - 1, 19, 1, '#e0d2b3');
  rect(c, stopX - 7, floor - 1, 2, 1, SPARK);
  rect(c, stopX + 10, floor - 1, 2, 1, SPARK);

  const t = time % PIT_LOOP;
  const arriveEnd = 1.5;
  const outEnd = 2.1;
  const tapEnd = 3.3;
  const departEnd = 4.3;
  const backStart = 3.6;
  const backEnd = 4.4;

  if (t >= arriveEnd && t < backEnd) {
    let x = crewX;
    let lift = floor - 9;
    let hit = false;
    if (t < outEnd) {
      x = lerp(doorX, crewX, ease((t - arriveEnd) / (outEnd - arriveEnd)));
    } else if (t < tapEnd) {
      hit = (t - outEnd) % TAP_PERIOD >= TAP_PERIOD / 2;
      lift = hit ? floor - 6 : floor - 12;
    } else if (t >= backStart) {
      x = lerp(crewX, doorX, ease((t - backStart) / (backEnd - backStart)));
    }
    crew(c, x, floor, time, lift);
    if (hit) sparkle(c, crewX - 3, floor - 6, time);
  }

  if (t < departEnd) {
    const x =
      t < arriveEnd
        ? lerp(-18, stopX, ease(t / arriveEnd))
        : t < tapEnd
          ? stopX
          : lerp(stopX, width + 10, ((t - tapEnd) / (departEnd - tapEnd)) ** 2);
    if (t < tapEnd) smoke(c, x - 4, floor, time);
    kart(c, x, floor, time);
  }
}

function plane(c: Context, x: number, y: number) {
  rect(c, x, y, 2, 1, PRIMARY);
  rect(c, x, y + 1, 5, 1, PRIMARY);
  rect(c, x + 1, y + 2, 2, 1, PRIMARY);
}

function house(c: Context, left: number, floor: number, lit: boolean) {
  for (let r = 0; r < 10; r++) rect(c, left - 1 + r, floor - 13 - r, 20 - 2 * r, 1, PRIMARY);
  rect(c, left, floor - 12, 18, 12, '#ffffff');
  rect(c, left + 17, floor - 12, 1, 12, '#e6e4f5');
  rect(c, left + 3, floor - 7, 4, 7, WOOD);
  rect(c, left + 10, floor - 10, 5, 4, lit ? SPARK : INK);
  rect(c, left + 12, floor - 10, 1, 4, '#ffffff');
}

function quad(from: number, via: number, to: number, u: number) {
  return lerp(lerp(from, via, u), lerp(via, to, u), u);
}

function paperPlane(c: Context, width: number, height: number, time: number) {
  const groundY = height - 14;
  const floor = groundY + 3;
  clouds(c, width, time);
  hills(c, width, groundY);
  grass(c, width, groundY, height - 7, time);
  dither(c, width, height - 7, height, PRIMARY, PAPER);

  const botX = Math.round(width * 0.25) - 2;
  const houseLeft = Math.round(width * 0.75) - 9;
  const t = time % PLANE_LOOP;
  const throwEnd = 0.5;
  const landEnd = 3.5;
  const glowEnd = 5;
  const lit = t >= landEnd && t < glowEnd;
  house(c, houseLeft, floor, lit);
  if (lit) sparkle(c, houseLeft + 16, floor - 12, time);

  const raised = floor - 13;
  const rest = floor - 6;
  const held = lerp(rest, raised, ease(t / throwEnd));
  const lift =
    t < throwEnd
      ? held
      : t < landEnd
        ? raised
        : t < glowEnd
          ? lerp(raised, rest, ease((t - landEnd) / (glowEnd - landEnd)))
          : undefined;
  bot(c, botX, floor, time, 0, false, lift);

  if (t < throwEnd) {
    plane(c, botX + 3, held - 4);
    return;
  }
  if (t >= landEnd) return;

  const startX = botX + 3;
  const startY = raised - 4;
  const endX = houseLeft + 10;
  const endY = floor - 10;
  const centerX = Math.round((startX + endX) / 2);
  const centerY = floor - 30;
  const bottomY = centerY + LOOP_RADIUS;
  const u = (t - throwEnd) / (landEnd - throwEnd);
  if (u < 0.35) {
    const v = u / 0.35;
    plane(c, quad(startX, (startX + centerX) / 2, centerX, v), quad(startY, bottomY, bottomY, v));
  } else if (u < 0.65) {
    const angle = Math.PI / 2 - 2 * Math.PI * ((u - 0.35) / 0.3);
    plane(c, centerX + LOOP_RADIUS * Math.cos(angle), centerY + LOOP_RADIUS * Math.sin(angle));
  } else {
    const v = (u - 0.65) / 0.35;
    plane(c, quad(centerX, lerp(centerX, endX, 0.6), endX, v), quad(bottomY, bottomY, endY, v));
  }
}

function block(c: Context, x: number, y: number, color: string) {
  rect(c, x, y, 4, 4, color);
  rect(c, x, y, 4, 1, '#6a71e6');
}

function thought(c: Context, x: number, y: number, shape: string[]) {
  rect(c, x + 1, y, 13, 11, '#ffffff');
  rect(c, x, y + 1, 15, 9, '#ffffff');
  const left = x + Math.round((15 - 2 * shape[0].length) / 2);
  const top = y + Math.round((11 - 2 * shape.length) / 2);
  shape.forEach((row, r) =>
    [...row].forEach((cell, col) => {
      if (cell === 'x') rect(c, left + col * 2, top + r * 2, 2, 2, PRIMARY);
    }),
  );
}

function build(c: Context, width: number, height: number, time: number) {
  const groundY = height - 14;
  const floor = groundY + 3;
  clouds(c, width, time);
  hills(c, width, groundY);
  grass(c, width, groundY, height - 7, time);
  dither(c, width, height - 7, height, PRIMARY, PAPER);

  const botX = Math.round(width / 2) - 14;
  const buildLeft = botX + 10;
  const t = time % SHAPE_TIME;
  const shape = SHAPES[Math.floor(time / SHAPE_TIME) % SHAPES.length];
  const cells = shape
    .flatMap((row, r) => [...row].flatMap((cell, col) => (cell === 'x' ? [{ r, col }] : [])))
    .sort((a, b) => b.r - a.r || a.col - b.col);
  const popEnd = 0.6;
  const buildEnd = popEnd + cells.length * DROP_TIME;
  const clearStart = buildEnd + 0.6;
  const raised = floor - 14;
  bot(c, botX, floor, time, 0, false, t >= popEnd && t < buildEnd ? raised : undefined);

  if (t < clearStart) {
    rect(c, botX - 2, floor - 13, 1, 1, '#ffffff');
    if (t >= 0.2) rect(c, botX - 5, floor - 17, 2, 2, '#ffffff');
    if (t >= 0.4) thought(c, botX - 18, floor - 29, shape);
  }

  const blink = t >= clearStart && Math.floor(t * 8) % 2 === 0;
  const handX = botX + 4;
  const handY = raised - 5;
  cells.forEach(({ r, col }, i) => {
    const start = popEnd + i * DROP_TIME;
    if (t < start) return;
    const x = buildLeft + col * 4;
    const y = floor - 4 * (shape.length - r);
    const u = ease((t - start) / DROP_TIME);
    block(c, lerp(handX, x, u), quad(handY, Math.min(handY, y) - 4, y, u), blink ? '#ffffff' : '#3f3b99');
  });
  if (t >= buildEnd && t < clearStart) sparkle(c, buildLeft + shape[0].length * 4 + 1, floor - 4 * shape.length - 1, time);
}

function cross(c: Context, x: number, y: number) {
  for (let i = 0; i < 5; i++) {
    rect(c, x + i, y + i, 1, 1, '#d4506c');
    rect(c, x + 4 - i, y + i, 1, 1, '#d4506c');
  }
}

function gem(c: Context, x: number, y: number, color: string) {
  rect(c, x + 1, y, 1, 3, color);
  rect(c, x, y + 1, 3, 1, color);
  rect(c, x + 1, y, 1, 1, '#ffffff');
}

function vulture(c: Context, x: number, y: number, time: number, facing: number) {
  const at = (dx: number, dy: number, w: number, h: number, color: string) =>
    rect(c, facing > 0 ? x + dx : x - dx - w + 1, y + dy, w, h, color);
  const slope = Math.floor(time * 4) % 2 === 0 ? -0.5 : 0.3;
  for (let k = 0; k < 13; k++) {
    const dy = Math.round(k * slope);
    const thickness = k < 6 ? 3 : k < 10 ? 2 : 1;
    at(-3 - k, dy, 1, thickness, VULTURE);
    at(3 + k, dy, 1, thickness, VULTURE);
  }
  at(-3, 0, 7, 4, VULTURE);
  at(-2, 4, 5, 1, VULTURE);
  at(-1, 5, 1, 2, SPARK);
  at(1, 5, 1, 2, SPARK);
  at(3, 3, 1, 1, VULTURE_HEAD);
  at(4, 2, 3, 3, VULTURE_HEAD);
  at(5, 2, 1, 1, INK);
  at(7, 3, 2, 1, SPARK);
  at(8, 4, 1, 1, SPARK);
}

function moneyBag(c: Context, x: number, top: number, size: number) {
  const half = (size - 1) / 2;
  const y = top + 3;
  rect(c, x - 1, top, 3, 2, WOOD);
  rect(c, x - 2, top + 2, 5, 1, VULTURE);
  rect(c, x - half + 1, y, size - 2, size + 1, WOOD);
  rect(c, x - half, y + 1, size, size - 1, WOOD);
  const dollar = y + Math.ceil((size - 6) / 2);
  rect(c, x, dollar, 1, 7, SPARK);
  glyph(c, 'S', x - 1, dollar + 1, SPARK);
}

function trade(c: Context, width: number, height: number, time: number) {
  const groundY = height - 14;
  const floor = groundY + 3;
  clouds(c, width, time);
  hills(c, width, groundY);
  grass(c, width, groundY, height - 7, time);
  dither(c, width, height - 7, height, PRIMARY, PAPER);

  const botX = Math.round(width / 2) + 14;
  const hoverX = botX - 30;
  const hoverY = 14;
  const t = time % TRADE_LOOP;

  let shake = 0;
  if (t < 2 * OFFER_TIME) {
    const size = t < OFFER_TIME ? 7 : 9;
    const u = t % OFFER_TIME;
    const slideEnd = 0.8;
    const shakeEnd = 1.4;
    const crossEnd = 2.2;
    const leaving = u >= crossEnd;
    const progress =
      u < slideEnd ? ease(u / slideEnd) : leaving ? 1 - ease((u - crossEnd) / (OFFER_TIME - crossEnd)) : 1;
    const x = Math.round(lerp(-20, hoverX, progress));
    const bob = Math.floor(time * 4) % 2 === 0 ? 0 : -1;
    const y = Math.round(lerp(leaving ? 2 : 4, hoverY, progress)) + bob;
    vulture(c, x, y, time, leaving ? -1 : 1);
    moneyBag(c, x, y + 7, size);
    if (u >= slideEnd && u < shakeEnd) shake = Math.floor(time * 12) % 2 ? 1 : -1;
    if (u >= shakeEnd && u < crossEnd && Math.floor(time * 6) % 2 === 0) cross(c, hoverX + 8, hoverY + 12);
  }
  bot(c, botX + shake, floor, time, 0, false);

  const middle = (GEM_COLORS.length - 1) / 2;
  GEM_COLORS.forEach((color, i) => {
    const x = botX + 1 + Math.round((i - middle) * 5);
    const y = floor - 17 - Math.round((middle - Math.abs(i - middle)) * 2) + Math.round(Math.sin(time * 3 + i));
    gem(c, x, y, color);
    if (t >= 2 * OFFER_TIME && Math.floor((t - 2 * OFFER_TIME) * 2.5) % GEM_COLORS.length === i) {
      sparkle(c, x + 1, y - 2, time);
    }
  });
}

function boxWidth(text: string) {
  return text.length * 4 + 3;
}

function labelBox(c: Context, text: string, left: number, top: number, color: string) {
  const width = boxWidth(text);
  rect(c, left, top, width, 7, '#ffffff');
  rect(c, left, top + 7, width, 1, LINE);
  caption(c, text, left + 2, top + 1, color);
}

function beetle(c: Context, x: number, floor: number, time: number) {
  const step = Math.floor(time * 8) % 2;
  [8, 13, 18].forEach((legX, i) => rect(c, x + legX + (i % 2 ? -step : step), floor - 3, 1, 2, INK));
  rect(c, x + 5, floor - 9, 16, 1, '#6a71e6');
  rect(c, x + 4, floor - 8, 18, 5, '#3f3b99');
  rect(c, x + 9, floor - 8, 1, 5, '#6a71e6');
  rect(c, x + 15, floor - 8, 1, 5, '#6a71e6');
  rect(c, x, floor - 7, 4, 4, '#3f3b99');
  rect(c, x + 1, floor - 6, 1, 1, '#ffffff');
  rect(c, x, floor - 9, 1, 2, INK);
  rect(c, x - 1, floor - 10, 1, 1, INK);
}

function caterpillar(c: Context, x: number, floor: number, time: number, segments: number) {
  for (let j = segments; j >= 1; j--) {
    const bump = (Math.floor(time * 6) + j) % 2 ? -1 : 0;
    rect(c, x + j * 4, floor - 6 + bump, 4, 4, j % 2 ? '#6a71e6' : '#3f3b99');
    rect(c, x + j * 4 + 1, floor - 2, 1, 1, INK);
  }
  rect(c, x, floor - 6, 4, 4, '#3f3b99');
  rect(c, x + 1, floor - 5, 1, 1, '#ffffff');
  rect(c, x + 1, floor - 8, 1, 2, INK);
}

function spider(c: Context, x: number, floor: number, time: number) {
  const step = Math.floor(time * 8) % 2;
  [3, 6, 9, 12].forEach((legX, i) => {
    rect(c, x + legX, floor - 14, 1, 7, INK);
    rect(c, x + legX + (i % 2 ? step : -step), floor - 7, 1, 6, INK);
  });
  rect(c, x + 3, floor - 13, 9, 1, '#6a71e6');
  rect(c, x + 3, floor - 12, 9, 4, '#3f3b99');
  rect(c, x, floor - 11, 3, 3, '#3f3b99');
  rect(c, x, floor - 10, 1, 1, '#ffffff');
}

function fly(c: Context, x: number, y: number, time: number) {
  const flap = Math.floor(time * 12) % 2;
  [8, 14].forEach((wingX) => {
    rect(c, x + wingX, y - 11 - flap, 5, 2, '#ffffff');
    rect(c, x + wingX, y - 9 - flap, 5, 1, LINE);
  });
  rect(c, x + 4, y + 1, 10, 3, '#3f3b99');
  rect(c, x + 4, y + 1, 10, 1, '#6a71e6');
  rect(c, x, y, 4, 4, '#3f3b99');
  rect(c, x + 1, y + 1, 2, 2, '#ffffff');
  rect(c, x + 6, y + 4, 1, 2, INK);
  rect(c, x + 10, y + 4, 1, 2, INK);
}

function flattened(c: Context, x: number, y: number, length: number) {
  rect(c, x, y, length, 3, '#3f3b99');
  rect(c, x, y, length, 1, '#6a71e6');
}

function poof(c: Context, x: number, y: number, u: number) {
  for (let k = 0; k < 6; k++) {
    const angle = (k / 6) * Math.PI * 2;
    const radius = 3 + u * 8;
    const size = u < 0.5 ? 3 : 2;
    rect(
      c,
      x + Math.cos(angle) * radius * 1.5 - 1,
      y + Math.sin(angle) * radius * 0.6 - 1,
      size,
      size,
      k % 2 ? '#ffffff' : '#b8b3d6',
    );
  }
}

function caterpillarSegments(boxes: string[]) {
  const row = boxes.reduce((sum, text) => sum + boxWidth(text) + 1, -1);
  return Math.ceil((row + 2) / 4);
}

function bugLength(bug: RunnerBug) {
  if (bug.shape === 'caterpillar') return 4 + caterpillarSegments(bug.boxes) * 4;
  return bug.shape === 'beetle' ? 22 : bug.shape === 'spider' ? 13 : 14;
}

function flyY(floor: number, time: number) {
  return floor - 16 + Math.round(Math.sin(time * 6));
}

function headTop(bug: RunnerBug, floor: number, flyTop: number) {
  if (bug.shape === 'beetle') return floor - 7;
  if (bug.shape === 'caterpillar') return floor - 6;
  return bug.shape === 'spider' ? floor - 11 : flyTop;
}

function ridingBoxes(bug: RunnerBug, x: number, floor: number, flyTop: number) {
  if (bug.shape === 'caterpillar') {
    const lefts = bug.boxes.map((_, i) =>
      bug.boxes.slice(0, i).reduce((left, text) => left + boxWidth(text) + 1, x + 6),
    );
    return bug.boxes.map((text, i) => ({ text, left: lefts[i], top: floor - 15 }));
  }
  if (bug.shape === 'beetle') {
    return bug.boxes.map((text, i) => ({
      text,
      left: Math.round(x + 13 - boxWidth(text) / 2),
      top: floor - 17 - 8 * i,
    }));
  }
  const base = bug.shape === 'spider' ? floor - 21 : flyTop - 8;
  return bug.boxes.map((text, i) => ({ text, left: x + 6, top: base - 8 * i }));
}

function drawBug(c: Context, bug: RunnerBug, x: number, floor: number, flyTop: number, time: number) {
  if (bug.shape === 'beetle') beetle(c, x, floor, time);
  else if (bug.shape === 'caterpillar') caterpillar(c, x, floor, time, caterpillarSegments(bug.boxes));
  else if (bug.shape === 'spider') spider(c, x, floor, time);
  else fly(c, x, flyTop, time);
}

function runner(c: Context, width: number, height: number, time: number) {
  const groundY = height - 14;
  const floor = groundY + 3;
  const scroll = Math.floor(time * RUN_SPEED);
  clouds(c, width, time);
  hills(c, width, groundY, Math.floor(scroll / 4));
  grass(c, width, groundY, height - 7, time, scroll);
  dither(c, width, height - 7, height, PRIMARY, PAPER);

  const botX = Math.round(width * 0.3);
  const spawnX = width + 4;
  const newest = Math.floor(time / BUG_GAP);
  const oldest = Math.max(0, Math.floor((time - (spawnX + 80) / RUN_SPEED) / BUG_GAP));
  let botFloor = floor;

  for (let n = oldest; n <= newest; n++) {
    const bug = RUNNER_BUGS[Math.floor(hash(n * 7 + 3) * RUNNER_BUGS.length)];
    const length = bugLength(bug);
    const hitX = botX + (bug.shape === 'spider' ? 1 : 0);
    const spawn = n * BUG_GAP;
    const hit = spawn + (spawnX - hitX) / BUG_SPEED;
    const since = time - hit;
    const x =
      since < 0 ? Math.round(spawnX - (time - spawn) * BUG_SPEED) : Math.round(hitX + hit * RUN_SPEED) - scroll;
    const flyTop = flyY(floor, Math.min(time, hit));
    const squashTop = bug.shape === 'fly' ? flyTop + 1 : floor - 4;
    const settle = since - SQUASH_TIME;

    if (since < 0) drawBug(c, bug, x, floor, flyTop, time);
    else if (since < SQUASH_TIME) flattened(c, x, squashTop, length);
    if (settle >= 0 && settle < POOF_TIME) poof(c, x + length / 2, squashTop + 1, settle / POOF_TIME);

    const center = x + length / 2;
    if (settle < MERGE_TIME) {
      const u = ease(Math.max(0, settle) / MERGE_TIME);
      ridingBoxes(bug, x, floor, flyTop).forEach((box) => {
        const left = Math.round(lerp(box.left, center - boxWidth(box.text) / 2, u));
        labelBox(c, box.text, left, Math.round(lerp(box.top, floor - 9, u)), INK);
      });
    } else {
      labelBox(c, 'REIFYDB', Math.round(center - MERGED_WIDTH / 2), floor - 9, '#4b52d6');
    }

    if (since >= -JUMP_TIME && since < SQUASH_TIME + BOUNCE_TIME) {
      const land = headTop(bug, floor, flyTop) + 1;
      if (since < 0) botFloor = quad(floor, land - 14, land, 1 + since / JUMP_TIME);
      else if (since < SQUASH_TIME) botFloor = squashTop + 1;
      else botFloor = quad(squashTop + 1, squashTop - 7, floor, (since - SQUASH_TIME) / BOUNCE_TIME);
    }
  }

  if (botFloor === floor) {
    bot(c, botX, floor - 1, time, 0, false);
    rect(c, botX + (Math.floor(time * 8) % 2 ? 0 : 3), floor - 2, 2, 1, '#3f3b99');
  } else {
    bot(c, botX, Math.round(botFloor), time, 0, false);
  }
}

function levelMap(
  c: Context,
  width: number,
  height: number,
  time: number,
  count: number,
  index: number,
  walk: LevelWalk,
) {
  const groundY = height - 7;
  const floor = groundY + 3;
  clouds(c, width, time);
  grass(c, width, groundY, height - 4, time);
  dither(c, width, height - 4, height, PRIMARY, PAPER);

  const margin = Math.max(12, Math.round(width * 0.1));
  const span = count > 1 ? (width - 2 * margin - 16) / (count - 1) : 0;
  const signX = (p: number) => Math.round(count > 1 ? margin + p * span : width / 2 - 8);
  for (let i = 0; i < count; i++) {
    const x = signX(i);
    if (i < count - 1) {
      for (let d = x + 9; d < signX(i + 1) - 1; d += 3) rect(c, d, groundY + 1, 1, 1, LINE);
    }
    rect(c, x + 3, floor - 8, 1, 6, WOOD);
    rect(c, x, floor - 15, 7, 7, i === index ? SPARK : '#ffffff');
    rect(c, x, floor - 9, 7, 1, LINE);
    glyph(c, String(i + 1), x + 2, floor - 14, INK);
  }

  const distance = Math.abs(signX(walk.to) - signX(walk.from));
  const u = distance > 0 ? Math.min(1, (time - walk.start) / (distance / LEVEL_WALK_SPEED)) : 1;
  walk.at = lerp(walk.from, walk.to, ease(u));
  const x = Math.round(lerp(signX(walk.from), signX(walk.to), ease(u))) + 9;
  if (u < 1) {
    bot(c, x, floor - 1, time, 0, false);
    rect(c, x + (Math.floor(time * 8) % 2 ? 0 : 3), floor - 2, 2, 1, '#3f3b99');
  } else {
    bot(c, x, floor, time, 0, false);
  }
}

function bookHeight(shelf: number, slot: number) {
  return 8 + Math.floor(hash(shelf * 17 + slot * 5 + 2) * 3);
}

function bookColor(shelf: number, slot: number) {
  return GEM_COLORS[(slot + shelf * 3) % GEM_COLORS.length];
}

function closedBook(c: Context, x: number, y: number, height: number, color: string) {
  rect(c, x, y, 3, height, color);
  rect(c, x, y + 2, 3, 1, '#ffffff');
}

function bookshelf(c: Context, left: number, floor: number, gapShelf: number, gapSlot: number) {
  const top = floor - 29;
  rect(c, left, top, SHELF_WIDTH, 28, WOOD);
  rect(c, left, top, SHELF_WIDTH, 1, '#d8b08a');
  for (let shelf = 0; shelf < 2; shelf++) {
    const back = top + 2 + shelf * 13;
    rect(c, left + 2, back, SHELF_WIDTH - 4, 11, SHELF_BACK);
    for (let slot = 0; slot < BOOK_SLOTS; slot++) {
      if (shelf === gapShelf && slot === gapSlot) continue;
      const height = bookHeight(shelf, slot);
      closedBook(c, left + 2 + slot * 4, back + 11 - height, height, bookColor(shelf, slot));
    }
  }
}

function openBook(c: Context, middle: number, top: number, color: string, open: number, page: number, turn: number) {
  const half = Math.round(lerp(1, 7, open));
  rect(c, middle - half, top, half * 2 + 1, 9, color);
  if (open < 1) return;
  rect(c, middle - 6, top, 6, 8, '#ffffff');
  rect(c, middle + 1, top, 6, 8, '#ffffff');
  for (let row = 0; row < 3; row++) {
    rect(c, middle - 5, top + 2 + row * 2, 1 + Math.floor(hash(page * 11 + row) * 4), 1, LINE);
    rect(c, middle + 2, top + 2 + row * 2, 1 + Math.floor(hash(page * 13 + row + 5) * 4), 1, row === 0 ? PRIMARY : LINE);
  }
  if (turn < 0 || turn >= 1) return;
  const width = Math.round(6 * Math.abs(1 - 2 * turn));
  rect(c, turn < 0.5 ? middle + 1 : middle - width, top - 1, width, 8, '#f3f2fb');
}

function library(c: Context, width: number, height: number, time: number) {
  const groundY = height - 14;
  const floor = groundY + 3;
  clouds(c, width, time);
  hills(c, width, groundY);
  grass(c, width, groundY, height - 7, time);
  dither(c, width, height - 7, height, PRIMARY, PAPER);

  const center = Math.round(width / 2);
  const shelfLeft = center + 2;
  const botX = center - 16;
  const round = Math.floor(time / LIBRARY_LOOP);
  const t = time % LIBRARY_LOOP;
  const shelf = round % 2;
  const slot = Math.floor(hash(round * 7 + 1) * BOOK_SLOTS);
  const bookH = bookHeight(shelf, slot);
  const color = bookColor(shelf, slot);
  const slotX = shelfLeft + 2 + slot * 4;
  const slotY = floor - 16 + shelf * 13 - bookH;
  const liftedY = slotY - 4;
  const bookTop = floor - 22;
  const pullEnd = PULL_TIME;
  const flyEnd = pullEnd + FLY_TIME;
  const openEnd = flyEnd + OPEN_TIME;
  const readEnd = openEnd + READ_TIME;
  const closeEnd = readEnd + OPEN_TIME;
  const backEnd = closeEnd + FLY_TIME;
  const pushEnd = backEnd + PULL_TIME;

  bookshelf(c, shelfLeft, floor, t < pushEnd ? shelf : -1, slot);
  bot(c, botX, floor, time, 0, false);

  if (t < pullEnd || (t >= backEnd && t < pushEnd)) {
    const u = t < pullEnd ? t / PULL_TIME : 1 - (t - backEnd) / PULL_TIME;
    closedBook(c, slotX, lerp(slotY, liftedY, ease(u)), bookH, color);
  } else if (t < flyEnd || (t >= closeEnd && t < backEnd)) {
    const u = ease(t < flyEnd ? (t - pullEnd) / FLY_TIME : 1 - (t - closeEnd) / FLY_TIME);
    closedBook(c, lerp(slotX, botX + 1, u), quad(liftedY, Math.min(liftedY, bookTop) - 6, bookTop, u), bookH, color);
  } else if (t < closeEnd) {
    const reading = t - openEnd;
    const open = t < openEnd ? ease((t - flyEnd) / OPEN_TIME) : t < readEnd ? 1 : 1 - ease((t - readEnd) / OPEN_TIME);
    const turn = reading >= 0 && t < readEnd ? ((reading % PAGE_TIME) - PAGE_TIME + TURN_TIME) / TURN_TIME : -1;
    openBook(c, botX + 2, bookTop, color, open, round * 7 + Math.floor(Math.max(0, reading) / PAGE_TIME), turn);
  } else {
    sparkle(c, slotX + 1, slotY - 3, time);
  }
}

const SCENES: Record<SceneKind, { height: number; heightClass: string; draw: Draw }> = {
  hall: { height: 84, heightClass: 'h-[336px] max-sm:h-[252px] max-[341px]:h-[168px]', draw: hall },
  full: { height: 54, heightClass: 'h-[216px]', draw: (c, width, height, time) => compare(c, width, height, time, 'full') },
  incremental: {
    height: 54,
    heightClass: 'h-[216px]',
    draw: (c, width, height, time) => compare(c, width, height, time, 'incremental'),
  },
  stack: { height: 54, heightClass: 'h-[216px] max-sm:h-[108px]', draw: stack },
  invaders: { height: 48, heightClass: 'h-[192px] max-sm:h-[96px]', draw: invaders },
  booth: { height: 54, heightClass: 'h-[216px] max-sm:h-[108px]', draw: booth },
  pit: { height: 54, heightClass: 'h-[216px] max-sm:h-[108px]', draw: pitStop },
  plane: { height: 54, heightClass: 'h-[216px] max-sm:h-[108px]', draw: paperPlane },
  build: { height: 54, heightClass: 'h-[216px] max-sm:h-[108px]', draw: build },
  trade: { height: 54, heightClass: 'h-[216px] max-sm:h-[108px]', draw: trade },
  bug: { height: 54, heightClass: 'h-[216px] max-sm:h-[108px]', draw: runner },
  library: { height: 54, heightClass: 'h-[216px] max-sm:h-[108px]', draw: library },
};

interface PixelSceneProps {
  kind: SceneKind;
  className?: string;
}

function usePixelLoop(height: number, draw: Draw) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('pixel canvas has no 2d context');
    let width = 0;
    let frame = 0;
    let lastPaint = 0;

    const paint = (ms: number) => {
      const time = ms / 1000;
      advanceSharedMarket(time);
      context.clearRect(0, 0, width, height);
      draw(context, width, height, time);
    };
    const resize = () => {
      const scale = Math.round(canvas.clientHeight / height);
      width = Math.max(MIN_WIDTH, Math.round(canvas.clientWidth / scale));
      canvas.width = width;
      canvas.height = height;
      paint(performance.now());
    };

    resize();
    window.addEventListener('resize', resize);
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const loop = (ms: number) => {
        if (ms - lastPaint > FRAME_INTERVAL) {
          lastPaint = ms;
          paint(ms);
        }
        frame = requestAnimationFrame(loop);
      };
      frame = requestAnimationFrame(loop);
    }
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frame);
    };
  }, [height, draw]);

  return canvasRef;
}

export function PixelScene({ kind, className }: PixelSceneProps) {
  const canvasRef = usePixelLoop(SCENES[kind].height, SCENES[kind].draw);

  return (
    <canvas ref={canvasRef} aria-hidden="true" className={cn('pixel-canvas', SCENES[kind].heightClass, className)} />
  );
}

interface RaceSceneProps {
  rtt: number;
  statements: number;
  className?: string;
}

export function RaceScene({ rtt, statements, className }: RaceSceneProps) {
  const state = useRef<RaceState>({ rtt, statements, start: -Infinity });
  useEffect(() => {
    state.current.rtt = rtt;
    state.current.statements = statements;
  }, [rtt, statements]);
  const draw = useCallback<Draw>((c, width, _height, time) => race(c, width, time, state.current), []);
  const canvasRef = usePixelLoop(RACE_HEIGHT, draw);

  return <canvas ref={canvasRef} aria-hidden="true" className={cn('pixel-canvas h-[288px] max-sm:h-[144px]', className)} />;
}

interface NoticeBoardSceneProps {
  count: number;
  className?: string;
}

export function NoticeBoardScene({ count, className }: NoticeBoardSceneProps) {
  const draw = useCallback<Draw>((c, width, height, time) => noticeBoard(c, width, height, time, count), [count]);
  const canvasRef = usePixelLoop(NOTICE_HEIGHT, draw);

  return <canvas ref={canvasRef} aria-hidden="true" className={cn('pixel-canvas h-[216px] max-sm:h-[108px]', className)} />;
}

interface LevelMapSceneProps {
  index: number;
  count: number;
  className?: string;
}

export function LevelMapScene({ index, count, className }: LevelMapSceneProps) {
  const walk = useRef<LevelWalk>({ from: index, to: index, start: 0, at: index });
  useEffect(() => {
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const from = still ? index : walk.current.at;
    walk.current = { from, to: index, start: performance.now() / 1000, at: from };
  }, [index]);
  const draw = useCallback<Draw>(
    (c, width, height, time) => levelMap(c, width, height, time, count, index, walk.current),
    [count, index],
  );
  const canvasRef = usePixelLoop(LEVEL_HEIGHT, draw);

  return <canvas ref={canvasRef} aria-hidden="true" className={cn('pixel-canvas h-[108px] max-sm:h-[54px]', className)} />;
}

interface FlipCounterProps {
  mode: BoardMode;
}

export function FlipCounter({ mode }: FlipCounterProps) {
  const count = useSyncExternalStore(
    subscribeToMarket,
    () => (mode === 'full' ? market.fullRecomputeFlips : market.incrementalFlips),
    () => 0,
  );
  return (
    <span key={count} className="flip-pop">
      {count.toLocaleString()}
    </span>
  );
}
