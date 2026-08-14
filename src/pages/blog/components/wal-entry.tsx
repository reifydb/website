import { Link } from 'react-router-dom';
import { formatReadTime, type BlogPost } from '@/data/blog-data';
import { PostSigil } from './post-sigil';
import { TagChips } from './tag-chips';

export function WalEntry({ post }: { post: BlogPost }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      id={`entry-${post.slug}`}
      className="group block border border-l-[6px] border-border-light bg-bg-secondary rounded-md shadow-[var(--shadow-soft)] scroll-mt-24 transition-colors duration-200 hover:border-l-primary hover:bg-bg-tertiary"
    >
      <div className="flex items-baseline gap-3 sm:gap-4 px-3 sm:px-4 py-4 font-mono text-sm">
        <span
          aria-hidden="true"
          className="w-3 shrink-0 text-text-muted transition-colors duration-200 group-hover:text-primary"
        >
          &#9656;
        </span>
        <span className="w-14 shrink-0 text-primary" data-numeric>
          {post.lsn}
        </span>
        <span
          className="hidden sm:block w-28 shrink-0 text-text-muted"
          data-numeric
        >
          {post.date}
        </span>
        <span className="flex-1 min-w-0 font-display text-base font-bold text-text-primary transition-colors duration-200 group-hover:text-primary">
          {post.title}
        </span>
        <span className="hidden sm:block w-20 shrink-0 text-right text-xs text-text-muted label-uppercase">
          {formatReadTime(post.readTime)}
        </span>
      </div>

      <div className="px-3 sm:px-4 pb-8">
        <p className="max-w-2xl text-text-secondary leading-relaxed">
          {post.excerpt}
        </p>

        <div className="mt-8 flex justify-center">
          <PostSigil
            cells={post.sigilCells}
            label={post.sigilLabel}
            fingerprint={post.fingerprint}
          />
        </div>

        {post.headings.length > 0 && (
          <div className="mt-6">
            <div className="label-uppercase text-xs text-text-muted mb-3">
              Contents
            </div>
            <ol className="space-y-1.5 font-mono text-sm">
              {post.headings.map((heading) => (
                <li key={heading.index} className="flex gap-3">
                  <span className="text-text-muted shrink-0" data-numeric>
                    {heading.index}
                  </span>
                  <span className="text-text-secondary">{heading.text}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        <div className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-2 font-mono text-xs text-text-muted">
          <span>
            <span className="label-uppercase">author</span>{' '}
            <span className="text-text-secondary">{post.author}</span>
          </span>
          <span>
            <span className="label-uppercase">size</span>{' '}
            <span className="text-text-secondary" data-numeric>
              {post.size}
            </span>
          </span>
          <span className="sm:hidden">
            <span className="label-uppercase">read</span>{' '}
            <span className="text-text-secondary">
              {formatReadTime(post.readTime)}
            </span>
          </span>
        </div>

        <div className="mt-4">
          <TagChips tags={post.tags} />
        </div>

        <div className="mt-8 flex justify-end font-mono text-xs label-uppercase text-text-muted transition-colors duration-200 group-hover:text-primary">
          Read entry <span aria-hidden="true">&nbsp;&rarr;</span>
        </div>
      </div>
    </Link>
  );
}
