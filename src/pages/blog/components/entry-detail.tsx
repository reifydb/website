import { Link } from 'react-router-dom';
import { formatReadTime, type BlogPost } from '@/data/blog-data';
import { BlogMarkdownRenderer } from './blog-markdown-renderer';
import { ShareRow } from './share-row';
import { TagChips } from './tag-chips';

const backClass =
  'font-mono text-xs label-uppercase text-text-muted hover:text-primary transition-colors duration-200';

export function EntryDetail({ post }: { post: BlogPost }) {
  return (
    <article className="border border-l-[6px] border-border-light border-l-primary bg-bg-secondary rounded-md shadow-[var(--shadow-medium)]">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 px-3 sm:px-4 py-4 border-b border-border-light font-mono text-sm">
        <span className="text-primary" data-numeric>
          {post.lsn}
        </span>
        <span className="text-text-muted" data-numeric>
          {post.date}
        </span>
        <span className="text-xs text-text-muted label-uppercase">
          {formatReadTime(post.readTime)}
        </span>
        <span className="text-xs text-text-muted label-uppercase">
          {post.author}
        </span>
        <span className="text-xs text-text-muted label-uppercase" data-numeric>
          {post.size}
        </span>
      </div>

      <div className="px-3 sm:px-4 pt-8 pb-8">
        <h1 className="font-display text-2xl sm:text-3xl font-black tracking-tight text-text-primary">
          {post.title}
        </h1>
        <p className="mt-4 max-w-2xl text-text-secondary leading-relaxed">
          {post.excerpt}
        </p>

        <div className="mt-10 font-body">
          <BlogMarkdownRenderer content={post.content} />
        </div>

        <div className="mt-12 pt-6 border-t border-border-light flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-xs label-uppercase">
          <Link
            to="/blog"
            state={{ preserveScroll: true, fromSlug: post.slug }}
            className={backClass}
          >
            <span aria-hidden="true">&larr;</span> Back to log
          </Link>
          <ShareRow post={post} />
        </div>

        <div className="mt-8">
          <TagChips tags={post.tags} />
        </div>
      </div>
    </article>
  );
}
