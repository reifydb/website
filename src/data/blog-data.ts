import fm from 'front-matter';

export interface BlogPostMeta {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  readTime: string;
  author: string;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

const modules = import.meta.glob('../content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export const blogPosts: BlogPost[] = Object.values(modules)
  .map((raw) => {
    const { attributes, body } = fm<BlogPostMeta>(raw);
    return { ...attributes, content: body };
  })
  .sort((a, b) => b.date.localeCompare(a.date));

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
