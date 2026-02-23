import { Link } from 'react-router-dom';
import type { BlogPostMeta } from '@/data/blog-data';

interface BlogCardProps {
  post: BlogPostMeta;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link to={`/blog/${post.slug}`} className="block group">
      <article className="bg-bg-tertiary border border-white/10 rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.1)]">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="text-sm text-text-muted">{post.date}</span>
          <span className="text-sm text-text-muted">{post.readTime}</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-2 group-hover:text-primary transition-colors duration-200">
          {post.title}
        </h2>
        <p className="text-text-secondary leading-relaxed mb-4">
          {post.excerpt}
        </p>
        <span className="text-primary text-sm font-medium">
          Read more &rarr;
        </span>
      </article>
    </Link>
  );
}
