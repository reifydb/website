import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import fm from 'front-matter';
import { GlobalFonts, createCanvas } from '@napi-rs/canvas';
import {
  sigil,
  frameSigil,
  postSeed,
  sigilLabel,
  ogImagePath,
} from '../src/lib/randomart.ts';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const POSTS_DIR = join(ROOT, 'src', 'pages', 'blog');
const OUT_DIR = join(ROOT, 'public', 'blog', 'og');

const WIDTH = 1200;
const HEIGHT = 630;
const PAD = 64;
const PANEL_OFFSET = 10;

const BG = '#f7f7f8';
const PANEL = '#ffffff';
const BORDER = '#18181b';
const TEXT = '#18181b';
const MUTED = '#71717a';
const PRIMARY = '#7e85f2';

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

function renderCard(post) {
  const art = sigil(postSeed(post.title, post.slug, post.date));
  const framed = frameSigil(art, sigilLabel(post.sequence));

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

  const glyphSize = 26;
  ctx.font = `${glyphSize}px "${MONO}"`;
  const artWidth = ctx.measureText(framed[0]).width;
  const lineHeight = glyphSize * 1.18;
  const panelW = artWidth + 56;
  const panelH = framed.length * lineHeight + 48;
  const panelX = PAD;
  const panelY = Math.round((HEIGHT - panelH) / 2) + 10;

  hardPanel(ctx, panelX, panelY, panelW, panelH);

  const charWidth = artWidth / framed[0].length;
  framed.forEach((line, index) => {
    const x = panelX + 28;
    const y = panelY + 34 + index * lineHeight;
    if (index === 0 || index === framed.length - 1) {
      ctx.fillStyle = MUTED;
      ctx.fillText(line, x, y);
      return;
    }
    ctx.fillStyle = MUTED;
    ctx.fillText(line[0], x, y);
    ctx.fillText(line.at(-1), x + charWidth * (line.length - 1), y);
    ctx.fillStyle = PRIMARY;
    ctx.fillText(line.slice(1, -1), x + charWidth, y);
  });

  const textX = panelX + panelW + 56;
  const textW = WIDTH - PAD - textX;

  ctx.font = `52px "${DISPLAY}"`;
  const titleLines = wrap(ctx, post.title, textW).slice(0, 3);
  let cursor = panelY + 46;
  ctx.fillStyle = TEXT;
  for (const line of titleLines) {
    ctx.fillText(line, textX, cursor);
    cursor += 62;
  }

  cursor += 12;
  ctx.font = `24px "${BODY}"`;
  ctx.fillStyle = MUTED;
  ctx.fillText(`${post.date}   ${post.readTime}`, textX, cursor);

  cursor += 46;
  ctx.font = `22px "${MONO}"`;
  ctx.fillStyle = PRIMARY;
  const tagLine = ['reifydb', ...post.tags].map((tag) => `#${tag}`).join('  ');
  for (const line of wrap(ctx, tagLine, textW).slice(0, 2)) {
    ctx.fillText(line, textX, cursor);
    cursor += 30;
  }

  return canvas.toBuffer('image/png');
}

const posts = readPosts();
mkdirSync(OUT_DIR, { recursive: true });

for (const post of posts) {
  const png = renderCard(post);
  writeFileSync(join(ROOT, 'public', ogImagePath(post.slug)), png);
  console.log(`  ${ogImagePath(post.slug)}  ${(png.length / 1024).toFixed(1)} KB`);
}

console.log(`generated ${posts.length} og images`);
