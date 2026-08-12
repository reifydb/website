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
  /[ \t]*<meta property="og:type"[^>]*>\n?/,
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

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const { paths, render, prepare, feed, NOT_FOUND_PATH } = await import(
  pathToFileURL(ENTRY).href
);

await prepare();

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

const posts = feed().slice().sort((a, b) => b.date.localeCompare(a.date));
const newest = posts[0]?.date;

const lastmods = new Map();
for (const post of posts) {
  lastmods.set(`/blog/${post.slug}`, post.date);
}
if (newest) lastmods.set('/blog', newest);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((routePath) => {
    const loc = routePath === '/' ? `${BASE_URL}/` : `${BASE_URL}${routePath}/`;
    const lastmod = lastmods.get(routePath);
    const lastmodTag = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : '';
    return `  <url>\n    <loc>${loc}</loc>${lastmodTag}\n  </url>`;
  })
  .join('\n')}
</urlset>
`;
writeFileSync(join(DIST, 'sitemap.xml'), sitemap);

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>ReifyDB Blog</title>
    <link>${BASE_URL}/blog/</link>
    <description>Writing from the ReifyDB team on incremental views, application state, and building a database.</description>
    <language>en</language>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml"/>${
      newest ? `\n    <lastBuildDate>${new Date(newest).toUTCString()}</lastBuildDate>` : ''
    }
${posts
  .map((post) => {
    const link = `${BASE_URL}/blog/${post.slug}/`;
    return [
      '    <item>',
      `      <title>${escapeXml(post.title)}</title>`,
      `      <link>${link}</link>`,
      `      <guid isPermaLink="true">${link}</guid>`,
      `      <pubDate>${new Date(post.date).toUTCString()}</pubDate>`,
      `      <description>${escapeXml(post.excerpt)}</description>`,
      '    </item>',
    ].join('\n');
  })
  .join('\n')}
  </channel>
</rss>
`;
writeFileSync(join(DIST, 'rss.xml'), rss);

const llmsFull = pageTexts
  .sort((a, b) => a.routePath.localeCompare(b.routePath))
  .map(({ routePath, text }) => {
    const url = routePath === '/' ? `${BASE_URL}/` : `${BASE_URL}${routePath}/`;
    const rule = '='.repeat(79);
    return `${rule}\nURL: ${url}\n${rule}\n\n${text}`;
  })
  .join('\n\n');
writeFileSync(join(DIST, 'llms-full.txt'), llmsFull);

console.log(
  `prerendered ${routes.length} routes, sitemap.xml, rss.xml, llms-full.txt, 404.html`,
);
