import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const ENTRY = join(ROOT, 'dist-ssr', 'entry-server.js');
const BASE_URL = process.env.PRERENDER_ORIGIN || 'https://reifydb.com';

const HEAD_MARKER = '<!--ssr-head-->';
const OUTLET = /<!--ssr-outlet-start-->[\s\S]*?<!--ssr-outlet-end-->/;

const TEMPLATE_DEFAULTS = [
  /[ \t]*<title>[\s\S]*?<\/title>\n?/,
  /[ \t]*<meta name="title"[^>]*>\n?/,
  /[ \t]*<meta name="description"[^>]*>\n?/,
  /[ \t]*<meta property="og:title"[^>]*>\n?/,
  /[ \t]*<meta property="og:description"[^>]*>\n?/,
  /[ \t]*<meta name="twitter:title"[^>]*>\n?/,
  /[ \t]*<meta name="twitter:description"[^>]*>\n?/,
];

function stripTemplateDefaults(template) {
  return TEMPLATE_DEFAULTS.reduce((html, pattern) => html.replace(pattern, ''), template);
}

function htmlToText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<\/(p|div|h[1-6]|li|tr|section|article|header|footer|pre|nav)>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .split('\n')
    .map((line) => line.replace(/[ \t]+/g, ' ').trim())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function buildPage(template, routePath, rendered) {
  if (!rendered.html.trim()) {
    throw new Error(`${routePath}: render produced no markup`);
  }
  if (!rendered.head.includes('<title>')) {
    throw new Error(`${routePath}: render produced no <title>; add PageMeta to this page`);
  }

  const canonical = `<link rel="canonical" href="${BASE_URL}${routePath === '/' ? '/' : `${routePath}/`}"/>`;
  const head = rendered.head + canonical;

  return stripTemplateDefaults(template)
    .replace(HEAD_MARKER, head)
    .replace(OUTLET, rendered.html);
}

function writePage(routePath, html) {
  const outDir = routePath === '/' ? DIST : join(DIST, routePath);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'index.html'), html);
}

const { paths, render, NOT_FOUND_PATH } = await import(pathToFileURL(ENTRY).href);

const template = readFileSync(join(DIST, 'index.html'), 'utf-8');
if (!template.includes(HEAD_MARKER) || !OUTLET.test(template)) {
  throw new Error(
    'dist/index.html has no SSR markers. It is either already prerendered or was built from an ' +
      'index.html without them. Run `pnpm run build` to regenerate it, then prerender again.',
  );
}

const routes = paths();
const pageTexts = [];

for (const routePath of routes) {
  const rendered = render(routePath);
  const page = buildPage(template, routePath, rendered);
  writePage(routePath, page);
  pageTexts.push({ routePath, text: htmlToText(rendered.html) });
  console.log(`  ${routePath}`);
}

writeFileSync(join(DIST, '404.html'), buildPage(template, NOT_FOUND_PATH, render(NOT_FOUND_PATH)));
console.log(`  404.html`);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((routePath) => {
    const loc = routePath === '/' ? `${BASE_URL}/` : `${BASE_URL}${routePath}/`;
    return `  <url>\n    <loc>${loc}</loc>\n  </url>`;
  })
  .join('\n')}
</urlset>
`;
writeFileSync(join(DIST, 'sitemap.xml'), sitemap);

const llmsFull = pageTexts
  .sort((a, b) => a.routePath.localeCompare(b.routePath))
  .map(({ routePath, text }) => {
    const url = routePath === '/' ? `${BASE_URL}/` : `${BASE_URL}${routePath}/`;
    const rule = '='.repeat(79);
    return `${rule}\nURL: ${url}\n${rule}\n\n${text}`;
  })
  .join('\n\n');
writeFileSync(join(DIST, 'llms-full.txt'), llmsFull);

console.log(`prerendered ${routes.length} routes, sitemap.xml, llms-full.txt, 404.html`);
