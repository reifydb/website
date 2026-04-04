import { Link } from 'react-router-dom';
import type { BlogPostMeta } from '@/data/blog-data';
import { Badge } from '@reifydb/ui';

interface BlogCardProps {
  post: BlogPostMeta;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link to={`/blog/${post.slug}`} className="block group">
      <article className="glass-card p-6 sm:p-8 transition-all duration-300 hover:border-primary/50">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Badge variant="outline">{post.date}</Badge>
          <Badge variant="outline">{post.readTime}</Badge>
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
