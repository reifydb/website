import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import fm from 'front-matter';
import { GlobalFonts, createCanvas } from '@napi-rs/canvas';
import { sigil, postSeed, sigilLabel, ogImagePath } from '../src/lib/sigil.ts';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const POSTS_DIR = join(ROOT, 'src', 'pages', 'blog');
const OUT_DIR = join(ROOT, 'public', 'blog', 'og');
const DEFAULT_OG_PATH = 'assets/img/og-default.png';

const SITE_TITLE = 'ReifyDB';
const SITE_SUBTITLE = 'The database that runs your backend logic.';
const SITE_BLURB =
  'One database instead of Postgres + Redis + a queue + a cron job. No caches to invalidate. No cron to babysit. No drift to debug.';

const WIDTH = 1200;
const HEIGHT = 630;
const PAD = 64;
const PANEL_OFFSET = 10;
const TITLE_TOP = 150;
const META_TOP = 262;
const TAGS_TOP = 300;

const BG = '#f7f7f8';
const PANEL = '#ffffff';
const BORDER = '#18181b';
const TEXT = '#18181b';
const MUTED = '#71717a';
const PRIMARY = '#7e85f2';
const PRIMARY_LIGHT = '#6366f1';
const PRIMARY_DARK = '#2e39df';
const SUBTLE = '#d4d4d8';

const SHADES = [SUBTLE, PRIMARY, PRIMARY_LIGHT, PRIMARY_DARK];

const CELL = 22;
const GAP = 8;
const INSET = 34;

const MONO = 'JetBrains Mono Variable';
const DISPLAY = 'Archivo Black';
const BODY = 'IBM Plex Sans Variable';

const FONTS = [
  ['@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2', MONO],
  ['@fontsource/archivo-black/files/archivo-black-latin-400-normal.woff2', DISPLAY],
  ['@fontsource-variable/ibm-plex-sans/files/ibm-plex-sans-latin-wght-normal.woff2', BODY],
];

for (const [file, family] of FONTS) {
  const path = join(ROOT, 'node_modules', file);
  if (!GlobalFonts.registerFromPath(path, family)) {
    throw new Error(`failed to register font ${family} from ${path}`);
  }
}

function readPosts() {
  const posts = [];
  for (const entry of readdirSync(POSTS_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory() || !/^\d{3,}$/.test(entry.name)) continue;
    const raw = readFileSync(join(POSTS_DIR, entry.name, 'content.md'), 'utf-8');
    const { attributes } = fm(raw);
    if (!Array.isArray(attributes.tags) || attributes.tags.length === 0) {
      throw new Error(
        `blog post must declare a non-empty "tags" array in its frontmatter: ${entry.name}/content.md`
      );
    }
    posts.push({ sequence: entry.name, ...attributes });
  }
  return posts;
}

function wrap(ctx, text, maxWidth) {
  const lines = [];
  let line = '';
  for (const word of text.split(/\s+/)) {
    const candidate = line ? `${line} ${word}` : word;
    if (line && ctx.measureText(candidate).width > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function hardPanel(ctx, x, y, w, h) {
  ctx.fillStyle = BORDER;
  ctx.fillRect(x + PANEL_OFFSET, y + PANEL_OFFSET, w, h);
  ctx.fillStyle = PANEL;
  ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = BORDER;
  ctx.lineWidth = 4;
  ctx.strokeRect(x + 2, y + 2, w - 4, h - 4);
}

function capsule(ctx, text, centerX, borderY) {
  const width = ctx.measureText(text).width + 20;
  ctx.fillStyle = PANEL;
  ctx.fillRect(centerX - width / 2, borderY - 13, width, 26);
  ctx.fillStyle = MUTED;
  ctx.fillText(text, centerX, borderY + 7);
}

function drawSigilPanel(ctx, art, label) {
  const gridW = art.cells[0].length * (CELL + GAP) - GAP;
  const gridH = art.cells.length * (CELL + GAP) - GAP;
  const panelW = gridW + INSET * 2;
  const panelH = gridH + INSET * 2;
  const panelX = Math.round((WIDTH - panelW) / 2);
  const panelY = HEIGHT - PAD - panelH;

  hardPanel(ctx, panelX, panelY, panelW, panelH);

  art.cells.forEach((row, y) => {
    row.forEach((shade, x) => {
      ctx.fillStyle = SHADES[shade];
      ctx.fillRect(
        panelX + INSET + x * (CELL + GAP),
        panelY + INSET + y * (CELL + GAP),
        CELL,
        CELL
      );
    });
  });

  ctx.font = `20px "${MONO}"`;
  ctx.textAlign = 'center';
  capsule(ctx, label, WIDTH / 2, panelY);
  capsule(ctx, art.fingerprint, WIDTH / 2, panelY + panelH);
  ctx.textAlign = 'left';
}

function renderCard(post) {
  const art = sigil(postSeed(post.title, post.slug, post.date));

  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  ctx.font = `20px "${MONO}"`;
  ctx.fillStyle = MUTED;
  ctx.fillText('reifydb.com/blog', PAD, PAD + 4);
  ctx.textAlign = 'right';
  ctx.fillStyle = PRIMARY;
  ctx.fillText(`#${post.sequence}`, WIDTH - PAD, PAD + 4);
  ctx.textAlign = 'left';

  const textW = WIDTH - PAD * 2;

  ctx.font = `50px "${DISPLAY}"`;
  const titleLines = wrap(ctx, post.title, textW).slice(0, 2);
  ctx.fillStyle = TEXT;
  titleLines.forEach((line, index) => {
    ctx.fillText(line, PAD, TITLE_TOP + index * 58);
  });

  ctx.font = `24px "${BODY}"`;
  ctx.fillStyle = MUTED;
  ctx.fillText(`${post.date}   ${post.readTime}`, PAD, META_TOP);

  ctx.font = `22px "${MONO}"`;
  ctx.fillStyle = PRIMARY;
  const tagLine = ['reifydb', ...post.tags].map((tag) => `#${tag}`).join('  ');
  ctx.fillText(wrap(ctx, tagLine, textW)[0], PAD, TAGS_TOP);

  drawSigilPanel(ctx, art, sigilLabel(post.sequence));

  return canvas.toBuffer('image/png');
}

function renderDefaultCard() {
  const art = sigil(postSeed(SITE_TITLE, 'reifydb', SITE_SUBTITLE));

  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  ctx.font = `20px "${MONO}"`;
  ctx.fillStyle = MUTED;
  ctx.fillText('reifydb.com', PAD, PAD + 4);

  ctx.font = `76px "${DISPLAY}"`;
  ctx.fillStyle = TEXT;
  ctx.fillText(SITE_TITLE, PAD, TITLE_TOP + 6);

  ctx.font = `34px "${DISPLAY}"`;
  ctx.fillStyle = PRIMARY_DARK;
  ctx.fillText(SITE_SUBTITLE, PAD, TITLE_TOP + 58);

  ctx.font = `24px "${BODY}"`;
  ctx.fillStyle = MUTED;
  const blurbLines = wrap(ctx, SITE_BLURB, WIDTH - PAD * 2).slice(0, 2);
  blurbLines.forEach((line, index) => {
    ctx.fillText(line, PAD, TITLE_TOP + 110 + index * 32);
  });

  drawSigilPanel(ctx, art, 'REIFYDB');

  return canvas.toBuffer('image/png');
}

const posts = readPosts();
mkdirSync(OUT_DIR, { recursive: true });

for (const post of posts) {
  const png = renderCard(post);
  writeFileSync(join(ROOT, 'public', ogImagePath(post.slug)), png);
  console.log(`  ${ogImagePath(post.slug)}  ${(png.length / 1024).toFixed(1)} KB`);
}

const defaultPng = renderDefaultCard();
writeFileSync(join(ROOT, 'public', DEFAULT_OG_PATH), defaultPng);
console.log(`  ${DEFAULT_OG_PATH}  ${(defaultPng.length / 1024).toFixed(1)} KB`);

console.log(`generated ${posts.length} post og images and 1 default`);
