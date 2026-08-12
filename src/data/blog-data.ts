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
  lsn: string;
  size: string;
  headings: BlogPostHeading[];
}

const modules = import.meta.glob('../content/blog/*.md', {
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

function formatSize(content: string): string {
  const bytes = new TextEncoder().encode(content).length;
  return `${(bytes / 1024).toFixed(1)} KB`;
}

const ordered = Object.values(modules)
  .map((raw) => {
    const { attributes, body } = fm<BlogPostMeta>(raw);
    return { ...attributes, content: body };
  })
  .sort((a, b) => b.date.localeCompare(a.date));

export const blogPosts: BlogPost[] = ordered.map((post, index) => ({
  ...post,
  lsn: `#${String(ordered.length - index).padStart(4, '0')}`,
  size: formatSize(post.content),
  headings: extractHeadings(post.content),
}));

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAdjacentPosts(slug: string): { prev?: BlogPost; next?: BlogPost } {
  const index = blogPosts.findIndex((p) => p.slug === slug);
  if (index === -1) return {};
  return {
    prev: index < blogPosts.length - 1 ? blogPosts[index + 1] : undefined,
    next: index > 0 ? blogPosts[index - 1] : undefined,
  };
}

export function formatReadTime(readTime: string): string {
  return readTime.replace(/\s*read\s*$/i, '').toUpperCase();
}
