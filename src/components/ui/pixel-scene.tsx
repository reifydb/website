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

type Context = CanvasRenderingContext2D;
type SceneKind = 'hall' | 'ground' | 'stack' | BoardMode;
type Draw = (c: Context, width: number, height: number, time: number) => void;

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

function grass(c: Context, width: number, groundY: number, bottom: number, time: number) {
  rect(c, 0, groundY, width, bottom - groundY, PRIMARY);
  for (let x = 0; x < width; x++) {
    if (hash(x * 3 + 1) > 0.5) rect(c, x, groundY, 1, 1, '#a3a9ff');
  }
  for (let x = 0; x < width; x++) {
    const blade = hash(x * 13 + 1);
    if (blade < 0.55) continue;
    const bladeHeight = 1 + (blade > 0.85 ? 1 : 0) + (hash(x + Math.floor(time * 1.5) * 131) > 0.85 ? 1 : 0);
    rect(c, x, groundY - bladeHeight, 1, bladeHeight, blade > 0.75 ? '#6a71e6' : PRIMARY);
  }
  for (let y = groundY + 2; y < Math.min(bottom, groundY + 6); y++) {
    for (let x = (y % 2) * 3; x < width; x += 7) {
      if (hash(x * 5 + y) > 0.5) rect(c, x, y, 2, 1, '#6a71e6');
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

function hills(c: Context, width: number, groundY: number) {
  for (let x = 0; x < width; x++) {
    const top = groundY - 10 - (8 + Math.sin(x * 0.05) * 4 + Math.sin(x * 0.013 + 1) * 6);
    rect(c, x, top, 1, groundY - top, '#e0daf6');
  }
  for (let x = 0; x < width; x++) {
    const top = groundY - 3 - (4 + Math.sin(x * 0.08 + 2) * 3 + Math.sin(x * 0.021) * 4);
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

function ground(c: Context, width: number, height: number, time: number) {
  grass(c, width, 3, height - 7, time);
  dither(c, width, height - 7, height, PRIMARY, PAPER);
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

const SCENES: Record<SceneKind, { height: number; heightClass: string; draw: Draw }> = {
  hall: { height: 84, heightClass: 'h-[336px] max-sm:h-[252px] max-[341px]:h-[168px]', draw: hall },
  full: { height: 54, heightClass: 'h-[216px]', draw: (c, width, height, time) => compare(c, width, height, time, 'full') },
  incremental: {
    height: 54,
    heightClass: 'h-[216px]',
    draw: (c, width, height, time) => compare(c, width, height, time, 'incremental'),
  },
  ground: { height: 17, heightClass: 'h-[68px]', draw: ground },
  stack: { height: 54, heightClass: 'h-[216px] max-sm:h-[108px]', draw: stack },
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
