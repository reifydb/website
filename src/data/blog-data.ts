import fm from 'front-matter';
import { sigil, postSeed, sigilLabel, ogImagePath } from '@/lib/sigil';

export const SITE_ORIGIN = 'https://reifydb.com';
export const BRAND_TAG = 'reifydb';

export interface BlogPostMeta {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  readTime: string;
  author: string;
  tags: string[];
}

export interface BlogPostHeading {
  index: string;
  text: string;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
  sequence: string;
  lsn: string;
  size: string;
  headings: BlogPostHeading[];
  sigilCells: number[][];
  sigilLabel: string;
  fingerprint: string;
  ogImage: string;
}

const modules = import.meta.glob('../pages/blog/*/content.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function extractHeadings(content: string): BlogPostHeading[] {
  const headings: BlogPostHeading[] = [];
  let inFence = false;

  for (const line of content.split('\n')) {
    if (line.trimStart().startsWith('```')) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^##\s+(.+?)\s*$/.exec(line);
    if (match) {
      headings.push({
        index: String(headings.length + 1).padStart(2, '0'),
        text: match[1],
      });
    }
  }

  return headings;
}

function extractSequence(path: string): string {
  const match = /\/(\d{3,})\/content\.md$/.exec(path);
  if (!match) {
    throw new Error(
      `blog post must live in a sequence-numbered directory, e.g. 001/content.md: ${path}`
    );
  }
  return match[1];
}

function formatSize(content: string): string {
  const bytes = new TextEncoder().encode(content).length;
  return `${(bytes / 1024).toFixed(1)} KB`;
}

function validateTags(tags: unknown, path: string): string[] {
  if (!Array.isArray(tags) || tags.length === 0) {
    throw new Error(
      `blog post must declare a non-empty "tags" array in its frontmatter: ${path}`
    );
  }
  for (const tag of tags) {
    if (typeof tag !== 'string' || !/^[a-z0-9]+$/.test(tag)) {
      throw new Error(
        `blog tag must be lowercase alphanumeric with no "#" or separators, got ${JSON.stringify(tag)}: ${path}`
      );
    }
    if (tag === BRAND_TAG) {
      throw new Error(
        `blog tag "${BRAND_TAG}" is added automatically and must not be listed: ${path}`
      );
    }
  }
  return tags as string[];
}

export const blogPosts: BlogPost[] = Object.entries(modules)
  .map(([path, raw]) => {
    const { attributes, body } = fm<BlogPostMeta>(raw);
    const sequence = extractSequence(path);
    const art = sigil(postSeed(attributes.title, attributes.slug, attributes.date));
    return {
      ...attributes,
      tags: validateTags(attributes.tags, path),
      content: body,
      sequence,
      lsn: `#${sequence}`,
      size: formatSize(body),
      headings: extractHeadings(body),
      sigilCells: art.cells,
      sigilLabel: sigilLabel(sequence),
      fingerprint: art.fingerprint,
      ogImage: ogImagePath(attributes.slug),
    };
  })
  .sort((a, b) => b.sequence.localeCompare(a.sequence));

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function formatReadTime(readTime: string): string {
  return readTime.replace(/\s*read\s*$/i, '').toUpperCase();
}
