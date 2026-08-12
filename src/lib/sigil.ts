const MASK = (1n << 64n) - 1n;
const C1 = 0x87c37b91114253d5n;
const C2 = 0x4cf5ad432745937fn;

export const BITS_PER_ROW = 32;
export const ROWS = 4;
export const TOTAL_BITS = BITS_PER_ROW * ROWS;

export interface Sigil {
  cells: number[][];
  fingerprint: string;
  setBits: number;
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

export function sigil(seed: string): Sigil {
  const bytes = digest(seed);
  const bits: number[] = [];
  let setBits = 0;

  for (let index = 0; index < TOTAL_BITS; index++) {
    const bit = (bytes[index >> 3] >> (index & 7)) & 1;
    bits.push(bit);
    setBits += bit;
  }

  const neighbours = (row: number, column: number): number => {
    let count = 0;
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const y = row + dy;
        const x = column + dx;
        if (y < 0 || y >= ROWS || x < 0 || x >= BITS_PER_ROW) continue;
        count += bits[y * BITS_PER_ROW + x];
      }
    }
    return count;
  };

  const cells: number[][] = [];
  for (let row = 0; row < ROWS; row++) {
    const line: number[] = [];
    for (let column = 0; column < BITS_PER_ROW; column++) {
      if (!bits[row * BITS_PER_ROW + column]) {
        line.push(0);
        continue;
      }
      const density = neighbours(row, column);
      line.push(density <= 2 ? 1 : density <= 4 ? 2 : 3);
    }
    cells.push(line);
  }

  const fingerprint = Array.from(bytes.slice(0, 3))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  return { cells, fingerprint, setBits };
}

export function postSeed(title: string, slug: string, date: string): string {
  return `${title}|${slug}|${date}`;
}

export function sigilLabel(sequence: string): string {
  return `BLOOM ${sequence}`;
}

export function ogImagePath(slug: string): string {
  return `/blog/og/${slug}.png`;
}
