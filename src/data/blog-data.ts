import fm from 'front-matter';

export interface BlogPostMeta {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  readTime: string;
  author: string;
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

export const blogPosts: BlogPost[] = Object.entries(modules)
  .map(([path, raw]) => {
    const { attributes, body } = fm<BlogPostMeta>(raw);
    const sequence = extractSequence(path);
    return {
      ...attributes,
      content: body,
      sequence,
      lsn: `#${sequence}`,
      size: formatSize(body),
      headings: extractHeadings(body),
    };
  })
  .sort((a, b) => b.sequence.localeCompare(a.sequence));

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function formatReadTime(readTime: string): string {
  return readTime.replace(/\s*read\s*$/i, '').toUpperCase();
}
