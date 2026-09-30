import fm from 'front-matter';
import { sigil, postSeed, ogImagePath } from '@/lib/sigil';

export { SITE_ORIGIN } from '@/lib/site';

export interface BlogPostMeta {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  readTime: string;
  author: string;
  tags: string[];
}

export interface BlogPost extends BlogPostMeta {
  content: string;
  sequence: string;
  sigilCells: number[][];
  ogImage: string;
}

const modules = import.meta.glob('../pages/blog/*/content.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function extractSequence(path: string): string {
  const match = /\/(\d{3,})\/content\.md$/.exec(path);
  if (!match) {
    throw new Error(
      `blog post must live in a sequence-numbered directory, e.g. 001/content.md: ${path}`
    );
  }
  return match[1];
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
      sigilCells: art.cells,
      ogImage: ogImagePath(attributes.slug),
    };
  })
  .sort((a, b) => b.sequence.localeCompare(a.sequence));

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

export function formatPostDate(date: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  if (!match) {
    throw new Error(`blog date must be YYYY-MM-DD, got ${JSON.stringify(date)}`);
  }
  return `${MONTHS[Number(match[2]) - 1]} ${Number(match[3])}, ${match[1]}`;
}

export function formatReadTime(readTime: string): string {
  return readTime.replace(/\s*read\s*$/i, '').toUpperCase();
}
