import { Link } from 'react-router-dom';
import { formatPostDate, formatReadTime, type BlogPost } from '@/data/blog-data';
import { PostSigil } from './post-sigil';

export function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link to={`/blog/${post.slug}`} className="level-card group flex flex-col">
      <PostSigil cells={post.sigilCells} className="mb-6" />
      <p className="pixel-label text-[#4b52d6] mb-3">ENTRY {post.sequence}</p>
      <h2 className="text-lg font-bold text-text-primary group-hover:text-[#4b52d6] transition-colors mb-2 text-balance">
        {post.title}
      </h2>
      <p className="text-text-muted text-sm leading-relaxed mb-6">{post.excerpt}</p>
      <p className="pixel-label text-text-muted mt-auto">
        {formatPostDate(post.date)} · {formatReadTime(post.readTime)}
      </p>
    </Link>
  );
}
