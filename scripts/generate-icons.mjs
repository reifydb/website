import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createCanvas } from '@napi-rs/canvas';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = join(ROOT, 'public', 'assets', 'img');

const VIEW = 100;
const CENTER = VIEW / 2;
const RADIUS = 32;
const STROKE = 18;
const GAP = 8;
const CORE_RADIUS = 14;

const ARCS = ['#a8acf5', '#7e85f2', '#5d64e6', '#3d44c9'];
const CORE = '#262a8f';
const CORE_DARK = '#e6e8fd';
const TILE = '#ffffff';
const TILE_RING = 0.8;

function arcAngles(index) {
  return [45 + index * 90 + GAP / 2, 135 + index * 90 - GAP / 2];
}

function toRadians(angle) {
  return ((angle - 90) * Math.PI) / 180;
}

function point(angle) {
  const t = toRadians(angle);
  return `${(CENTER + RADIUS * Math.cos(t)).toFixed(2)} ${(CENTER + RADIUS * Math.sin(t)).toFixed(2)}`;
}

function svg(switchesOnDark) {
  const style = switchesOnDark
    ? `<style>@media (prefers-color-scheme: dark){.core{fill:${CORE_DARK}}}</style>`
    : '';
  const arcs = ARCS.map((color, index) => {
    const [from, to] = arcAngles(index);
    return `<path d="M${point(from)} A${RADIUS} ${RADIUS} 0 0 1 ${point(to)}" fill="none" stroke="${color}" stroke-width="${STROKE}"/>`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VIEW} ${VIEW}">${style}${arcs}<circle class="core" cx="${CENTER}" cy="${CENTER}" r="${CORE_RADIUS}" fill="${CORE}"/></svg>\n`;
}

function png(size, { tile = false } = {}) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  let scale = size / VIEW;
  if (tile) {
    ctx.fillStyle = TILE;
    ctx.fillRect(0, 0, size, size);
    scale = (size * TILE_RING) / ((RADIUS + STROKE / 2) * 2);
  }

  ctx.translate(size / 2, size / 2);
  ctx.scale(scale, scale);
  ctx.translate(-CENTER, -CENTER);

  ctx.lineWidth = STROKE;
  ARCS.forEach((color, index) => {
    const [from, to] = arcAngles(index);
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.arc(CENTER, CENTER, RADIUS, toRadians(from), toRadians(to));
    ctx.stroke();
  });

  ctx.fillStyle = CORE;
  ctx.beginPath();
  ctx.arc(CENTER, CENTER, CORE_RADIUS, 0, Math.PI * 2);
  ctx.fill();

  return canvas.toBuffer('image/png');
}

function ico(sizes) {
  const images = sizes.map((size) => ({ size, data: png(size) }));
  const header = Buffer.alloc(6 + images.length * 16);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);

  let offset = header.length;
  images.forEach(({ size, data }, index) => {
    const entry = 6 + index * 16;
    header.writeUInt8(size, entry);
    header.writeUInt8(size, entry + 1);
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(data.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += data.length;
  });

  return Buffer.concat([header, ...images.map((image) => image.data)]);
}

const FILES = [
  ['logo.svg', svg(false)],
  ['favicon.svg', svg(true)],
  ...[16, 32, 48, 64, 128].map((size) => [`favicon-${size}x${size}.png`, png(size)]),
  ['favicon.ico', ico([16, 32, 48])],
  ['apple-touch-icon.png', png(180, { tile: true })],
  ['android-chrome-192x192.png', png(192)],
  ['android-chrome-512x512.png', png(512)],
  ['logo.png', png(512)],
];

for (const [name, data] of FILES) {
  writeFileSync(join(OUT_DIR, name), data);
  console.log(`  assets/img/${name}  ${(Buffer.byteLength(data) / 1024).toFixed(1)} KB`);
}

console.log(`generated ${FILES.length} icon files`);
