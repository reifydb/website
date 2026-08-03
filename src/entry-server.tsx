import { renderToString } from 'react-dom/server';
import type { RouteObject } from 'react-router-dom';
import { StaticRouter, useRoutes } from 'react-router-dom';
import { routes } from './routes';
import { blogPosts } from './data/blog-data';
import { navSections, getPublishedPaths } from './pages/docs/data/navigation';

export const NOT_FOUND_PATH = '/__not_found__';

function collectPaths(entries: RouteObject[]): string[] {
  const found: string[] = [];
  for (const entry of entries) {
    if (entry.path && entry.path !== '*' && !entry.path.includes(':')) {
      found.push(entry.path);
    }
    if (entry.children) found.push(...collectPaths(entry.children));
  }
  return found;
}

export function paths(): string[] {
  const published = getPublishedPaths(navSections);
  const configured = collectPaths(routes).filter(
    (path) => !path.startsWith('/docs') || published.has(path),
  );
  const blog = blogPosts.map((post) => `/blog/${post.slug}`);
  return [...configured, ...blog];
}

function StaticApp() {
  return useRoutes(routes);
}

const HOISTED_HEAD = /^(?:<title>[\s\S]*?<\/title>|<meta\b[^>]*\/>|<link\b[^>]*\/>)+/;

export interface RenderResult {
  html: string;
  head: string;
}

export function render(url: string): RenderResult {
  const rendered = renderToString(
    <StaticRouter location={url}>
      <StaticApp />
    </StaticRouter>,
  );
  const match = rendered.match(HOISTED_HEAD);
  if (!match) return { html: rendered, head: '' };
  return { html: rendered.slice(match[0].length), head: match[0] };
}
