import { hash } from './pixel-market';

export type Context = CanvasRenderingContext2D;

export const PRIMARY = '#7e85f2';
export const PAPER = '#faf8f2';
export const INK = '#1b1840';
export const LINE = '#c9c3dc';
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
export const AWNING_COLORS = ['#f0a3b8', '#ffe08a', '#a3a9ff', '#ffc9a8'];
const FLIP_DURATION = 0.3;
export const SMALL_RING = ['.TTT.', 'L...R', 'L.C.R', 'L...R', '.BBB.'];
const MEDIUM_RING = [
  '..TTTTT..',
  '.L.TTT.R.',
  'LL.....RR',
  'LL.....RR',
  'LL.....RR',
  'LL.....RR',
  'LL.....RR',
  '.L.BBB.R.',
  '..BBBBB..',
];
const RING_COLORS: Record<string, string> = { T: '#3d44c9', R: '#a8acf5', B: '#7e85f2', L: '#5d64e6', C: '#262a8f' };
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

export function rect(c: Context, x: number, y: number, width: number, height: number, color: string) {
  c.fillStyle = color;
  c.fillRect(Math.round(x), Math.round(y), width, height);
}

export function ease(u: number) {
  return u <= 0 ? 0 : u >= 1 ? 1 : u * u * (3 - 2 * u);
}

export function lerp(from: number, to: number, u: number) {
  return from + (to - from) * u;
}

export function dither(c: Context, width: number, top: number, bottom: number, from: string, to: string) {
  const rows = bottom - top;
  for (let j = 0; j < rows; j++) {
    const threshold = j >= rows - 2 ? 0 : 1 - (j + 1) / (rows - 1);
    rect(c, 0, top + j, width, 1, from);
    for (let x = 0; x < width; x++) {
      if (BAYER[(j % 4) * 4 + (x % 4)] / 16 >= threshold) rect(c, x, top + j, 1, 1, to);
    }
  }
}

export function grass(c: Context, width: number, groundY: number, bottom: number, time: number, offset = 0) {
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

export function clouds(c: Context, width: number, time: number) {
  for (let k = 0; k < 3; k++) {
    const x = ((time * 1.2 + k * (width / 3) + hash(k) * 40) % (width + 40)) - 20;
    const y = 2 + k * 3;
    rect(c, x, y + 2, 14, 3, '#ffffff');
    rect(c, x + 3, y, 6, 2, '#ffffff');
    rect(c, x + 9, y + 1, 3, 1, '#ffffff');
    rect(c, x + 1, y + 5, 12, 1, '#ebe4f7');
  }
}

export function hills(c: Context, width: number, groundY: number, offset = 0) {
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

export function glyph(c: Context, char: string, x: number, y: number, color: string) {
  const pixels = GLYPHS[char];
  if (!pixels) return;
  for (let i = 0; i < 15; i++) {
    if (pixels[i] === '1') rect(c, x + (i % 3), y + Math.floor(i / 3), 1, 1, color);
  }
}

export function tile(c: Context, x: number, y: number, now: string, old: string, elapsed: number) {
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

export function bot(c: Context, x: number, floor: number, time: number, index: number, carrying: boolean, liftY?: number) {
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

export function mascot(c: Context, x: number, floor: number, time: number, index: number, carrying: boolean, liftY?: number) {
  const left = x - 2;
  const y = floor - 12;
  rect(c, left + 2, floor - 3, 2, 2, RING_COLORS.C);
  rect(c, left + 5, floor - 3, 2, 2, RING_COLORS.C);
  rect(c, left + 2, y + 2, 5, 5, '#ffffff');
  ring(c, MEDIUM_RING, left, y);
  const eyeX = left + 3 + (Math.floor(time / 2.2 + index) % 4 === 1 ? 1 : 0);
  if ((time + index * 0.9) % 3.2 < 0.15) {
    rect(c, eyeX, y + 4, 1, 1, RING_COLORS.C);
    rect(c, eyeX + 2, y + 4, 1, 1, RING_COLORS.C);
  } else {
    rect(c, eyeX, y + 3, 1, 3, RING_COLORS.C);
    rect(c, eyeX + 2, y + 3, 1, 3, RING_COLORS.C);
  }
  if (carrying) {
    rect(c, left + 3, y - 4, 3, 4, '#ffffff');
    rect(c, left + 3, y - 3, 3, 1, PRIMARY);
    rect(c, left + 3, y - 1, 2, 1, LINE);
  }
  if (liftY !== undefined) {
    rect(c, left + 9, liftY, 1, floor - 7 - liftY, LINE);
    rect(c, left + 8, liftY - 1, 3, 1, '#ffffff');
  }
}

export function stall(c: Context, left: number, floor: number, index: number, flash: boolean, ticket: boolean) {
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

export function ring(c: Context, sprite: string[], x: number, y: number, core = RING_COLORS.C) {
  sprite.forEach((row, j) => {
    [...row].forEach((cell, i) => {
      if (cell !== '.') rect(c, x + i, y + j, 1, 1, cell === 'C' ? core : RING_COLORS[cell]);
    });
  });
}
