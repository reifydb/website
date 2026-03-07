import { chromium } from 'playwright';
import { createServer } from 'http';
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'fs';
import { join, extname, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIST = join(ROOT, 'dist');
const BASE_URL = 'https://reifydb.com';
const CONCURRENCY = 6;

// --- Route collection ---

function getRoutesFromRouter() {
  const routerSource = readFileSync(join(ROOT, 'src', 'router.tsx'), 'utf-8');
  const pathRegex = /path:\s*['"]([^'"]+)['"]/g;
  const routes = [];
  let match;
  while ((match = pathRegex.exec(routerSource)) !== null) {
    const path = match[1];
    // Skip wildcard and parameterized routes (blog/:slug handled separately)
    if (path === '*' || path.includes(':')) continue;
    routes.push(path);
  }
  return routes;
}

function getBlogSlugs() {
  const blogDir = join(ROOT, 'src', 'content', 'blog');
  try {
    return readdirSync(blogDir)
      .filter((f) => extname(f) === '.md')
      .map((f) => f.replace(/\.md$/, ''));
  } catch {
    return [];
  }
}

function getAllRoutes() {
  const routerRoutes = getRoutesFromRouter();
  const blogRoutes = getBlogSlugs().map((slug) => `/blog/${slug}`);
  const all = [...routerRoutes, ...blogRoutes];
  return [...new Set(all)];
}

// --- Static file server ---

function startServer(port) {
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.wasm': 'application/wasm',
    '.webmanifest': 'application/manifest+json',
  };

  const server = createServer((req, res) => {
    let url = req.url || '/';
    url = url.split('?')[0];

    const candidates = [
      join(DIST, url),
      join(DIST, url, 'index.html'),
      join(DIST, 'index.html'),
    ];

    for (const filePath of candidates) {
      try {
        const data = readFileSync(filePath);
        const ext = extname(filePath);
        res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
        res.end(data);
        return;
      } catch {
        // Try next candidate
      }
    }

    res.writeHead(404);
    res.end('Not found');
  });

  server.listen(port);
  return server;
}

// --- Pre-rendering ---

async function prerender() {
  const routes = getAllRoutes();
  console.log(`Pre-rendering ${routes.length} routes...`);

  const port = 4173;
  const server = startServer(port);
  const origin = `http://localhost:${port}`;

  const browser = await chromium.launch();

  const pageTexts = [];

  // Process routes in batches
  for (let i = 0; i < routes.length; i += CONCURRENCY) {
    const batch = routes.slice(i, i + CONCURRENCY);
    await Promise.all(
      batch.map(async (route) => {
        const context = await browser.newContext();
        const page = await context.newPage();

        try {
          const url = `${origin}${route}`;
          await page.goto(url, { waitUntil: 'domcontentloaded' });

          // Wait for h1 to appear (content rendered)
          try {
            await page.waitForSelector('h1', { timeout: 10000 });
          } catch {
            // Some pages may not have h1
          }

          // Let React finish rendering
          await page.waitForTimeout(500);

          // Extract title from h1
          const h1Text = await page.$eval('h1', (el) => el.textContent?.trim() || '').catch(() => '');

          // Get the cleaned HTML — remove runtime-injected styles but keep scripts
          let html = await page.evaluate(() => {
            // Remove runtime-injected <style> tags (Monaco codicon CSS, etc.)
            // These bloat the HTML and overwhelm text extractors
            document.querySelectorAll('style').forEach((el) => el.remove());
            return document.documentElement.outerHTML;
          });

          // Inject per-page title if h1 was found
          if (h1Text) {
            const pageTitle = route === '/' ? 'ReifyDB' : `${h1Text} | ReifyDB`;
            html = html.replace(/<title>[^<]*<\/title>/, `<title>${pageTitle}</title>`);
          }

          html = `<!DOCTYPE html>\n${html}`;

          // Write to dist
          const outDir = route === '/' ? DIST : join(DIST, route);
          mkdirSync(outDir, { recursive: true });
          writeFileSync(join(outDir, 'index.html'), html);

          // Extract plain text for llms-full.txt
          const text = await page.evaluate(() => document.body.innerText);
          pageTexts.push({ route, text });

          console.log(`  ${route}`);
        } catch (err) {
          console.error(`  FAILED: ${route}`, err);
        } finally {
          await context.close();
        }
      }),
    );
  }

  await browser.close();
  server.close();

  // --- Generate sitemap.xml ---
  const today = new Date().toISOString().split('T')[0];
  const sitemapEntries = routes
    .map((route) => {
      // Add trailing slash for GitHub Pages canonical URLs (avoids 301 redirects)
      const loc = route === '/' ? `${BASE_URL}/` : `${BASE_URL}${route}/`;
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`;
    })
    .join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</urlset>
`;
  writeFileSync(join(DIST, 'sitemap.xml'), sitemap);
  console.log(`Generated sitemap.xml with ${routes.length} URLs`);

  // --- Generate llms-full.txt ---
  pageTexts.sort((a, b) => a.route.localeCompare(b.route));
  const llmsFull = pageTexts
    .map(({ route, text }) => {
      const url = route === '/' ? `${BASE_URL}/` : `${BASE_URL}${route}/`;
      const trimmed = text.trim();
      return `===============================================================================\nURL: ${url}\n===============================================================================\n\n${trimmed}`;
    })
    .join('\n\n');

  writeFileSync(join(DIST, 'llms-full.txt'), llmsFull);
  console.log(`Generated llms-full.txt (${pageTexts.length} pages)`);

  console.log('Pre-rendering complete!');
}

prerender().catch((err) => {
  console.error('Pre-rendering failed:', err);
  process.exit(1);
});
