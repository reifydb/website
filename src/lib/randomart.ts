const MASK = (1n << 64n) - 1n;
const C1 = 0x87c37b91114253d5n;
const C2 = 0x4cf5ad432745937fn;

const BOARD_WIDTH = 17;
const BOARD_HEIGHT = 9;
const GLYPHS = ' .o+=*BOX@%&#/^';

export interface Sigil {
  rows: string[];
  fingerprint: string;
}

function rotl(x: bigint, r: bigint): bigint {
  return ((x << r) | (x >> (64n - r))) & MASK;
}

function fmix(k: bigint): bigint {
  let h = k;
  h = (h ^ (h >> 33n)) & MASK;
  h = (h * 0xff51afd7ed558ccdn) & MASK;
  h = (h ^ (h >> 33n)) & MASK;
  h = (h * 0xc4ceb9fe1a85ec53n) & MASK;
  h = (h ^ (h >> 33n)) & MASK;
  return h;
}

function readLe64(bytes: Uint8Array, offset: number): bigint {
  let value = 0n;
  for (let i = 7; i >= 0; i--) {
    value = (value << 8n) | BigInt(bytes[offset + i]);
  }
  return value;
}

function writeLe64(value: bigint): number[] {
  const out: number[] = [];
  let v = value;
  for (let i = 0; i < 8; i++) {
    out.push(Number(v & 0xffn));
    v >>= 8n;
  }
  return out;
}

function digest(seed: string): Uint8Array {
  const bytes = new TextEncoder().encode(seed);
  const blocks = Math.floor(bytes.length / 16);
  let h1 = 0n;
  let h2 = 0n;

  for (let i = 0; i < blocks; i++) {
    let k1 = readLe64(bytes, i * 16);
    let k2 = readLe64(bytes, i * 16 + 8);

    k1 = (k1 * C1) & MASK;
    k1 = rotl(k1, 31n);
    k1 = (k1 * C2) & MASK;
    h1 ^= k1;
    h1 = rotl(h1, 27n);
    h1 = (h1 + h2) & MASK;
    h1 = (h1 * 5n + 0x52dce729n) & MASK;

    k2 = (k2 * C2) & MASK;
    k2 = rotl(k2, 33n);
    k2 = (k2 * C1) & MASK;
    h2 ^= k2;
    h2 = rotl(h2, 31n);
    h2 = (h2 + h1) & MASK;
    h2 = (h2 * 5n + 0x38495ab5n) & MASK;
  }

  let k1 = 0n;
  let k2 = 0n;
  const tail = blocks * 16;
  for (let i = bytes.length - 1; i >= tail; i--) {
    const index = i - tail;
    if (index >= 8) {
      k2 = (k2 << 8n) | BigInt(bytes[i]);
    } else {
      k1 = (k1 << 8n) | BigInt(bytes[i]);
    }
  }
  const tailLength = bytes.length - tail;
  if (tailLength > 8) {
    k2 = (k2 * C2) & MASK;
    k2 = rotl(k2, 33n);
    k2 = (k2 * C1) & MASK;
    h2 ^= k2;
  }
  if (tailLength > 0) {
    k1 = (k1 * C1) & MASK;
    k1 = rotl(k1, 31n);
    k1 = (k1 * C2) & MASK;
    h1 ^= k1;
  }

  const length = BigInt(bytes.length);
  h1 ^= length;
  h2 ^= length;
  h1 = (h1 + h2) & MASK;
  h2 = (h2 + h1) & MASK;
  h1 = fmix(h1);
  h2 = fmix(h2);
  h1 = (h1 + h2) & MASK;
  h2 = (h2 + h1) & MASK;

  return new Uint8Array([...writeLe64(h1), ...writeLe64(h2)]);
}

function clamp(value: number, max: number): number {
  return value < 0 ? 0 : value > max ? max : value;
}

export function sigil(seed: string): Sigil {
  const bytes = digest(seed);
  const counts = new Array<number>(BOARD_WIDTH * BOARD_HEIGHT).fill(0);

  let x = (BOARD_WIDTH - 1) / 2;
  let y = (BOARD_HEIGHT - 1) / 2;
  const start = y * BOARD_WIDTH + x;

  for (const byte of bytes) {
    for (let step = 0; step < 4; step++) {
      const bits = (byte >> (step * 2)) & 0b11;
      x = clamp(x + (bits & 0b01 ? 1 : -1), BOARD_WIDTH - 1);
      y = clamp(y + (bits & 0b10 ? 1 : -1), BOARD_HEIGHT - 1);
      counts[y * BOARD_WIDTH + x]++;
    }
  }

  const end = y * BOARD_WIDTH + x;
  const cells = counts.map((count, index) => {
    if (index === end) return 'E';
    if (index === start) return 'S';
    return GLYPHS[Math.min(count, GLYPHS.length - 1)];
  });

  const rows: string[] = [];
  for (let row = 0; row < BOARD_HEIGHT; row++) {
    rows.push(cells.slice(row * BOARD_WIDTH, (row + 1) * BOARD_WIDTH).join(''));
  }

  const fingerprint = Array.from(bytes.slice(0, 3))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  return { rows, fingerprint };
}

function border(label: string): string {
  const padded = ` ${label} `;
  if (padded.length > BOARD_WIDTH) {
    throw new Error(`sigil label does not fit in ${BOARD_WIDTH} columns: ${label}`);
  }
  const left = Math.floor((BOARD_WIDTH - padded.length) / 2);
  const right = BOARD_WIDTH - padded.length - left;
  return `+${'-'.repeat(left)}${padded}${'-'.repeat(right)}+`;
}

export function postSeed(title: string, slug: string, date: string): string {
  return `${title}|${slug}|${date}`;
}

export function sigilLabel(sequence: string): string {
  return `REIFYDB ${sequence}`;
}

export function ogImagePath(slug: string): string {
  return `/blog/og/${slug}.png`;
}

export function frameSigil(entry: Sigil, label: string): string[] {
  return [
    border(label),
    ...entry.rows.map((row) => `|${row}|`),
    border(entry.fingerprint),
  ];
}
