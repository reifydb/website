import { Link } from 'react-router-dom';
import { formatPostDate, formatReadTime, type BlogPost } from '@/data/blog-data';
import { PostSigil } from './post-sigil';

export function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link to={`/blog/${post.slug}`} className="group flex flex-col sm:flex-row gap-6 py-8">
      <PostSigil cells={post.sigilCells} className="w-full sm:w-40 shrink-0" />
      <div className="flex flex-col">
        <p className="label text-[#4b52d6] mb-3">ENTRY {post.sequence}</p>
        <h2 className="text-lg font-bold text-text-primary group-hover:text-[#4b52d6] transition-colors mb-2 text-balance">
          {post.title}
        </h2>
        <p className="text-text-muted text-sm leading-relaxed mb-6">{post.excerpt}</p>
        <p className="label text-text-muted mt-auto">
          {formatPostDate(post.date)} · {formatReadTime(post.readTime)}
        </p>
      </div>
    </Link>
  );
}
