import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { formatReadTime, type BlogPost } from '@/data/blog-data';
import { BlogMarkdownRenderer } from './blog-markdown-renderer';

interface WalEntryProps {
  post: BlogPost;
  isOpen: boolean;
  onToggle: () => void;
}

export function WalEntry({ post, isOpen, onToggle }: WalEntryProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  function scrollToRow() {
    requestAnimationFrame(() => {
      rowRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
    });
  }

  function handleToggle() {
    onToggle();
    scrollToRow();
  }

  return (
    <div
      ref={rowRef}
      className="border-b border-border-default last:border-b-0 scroll-mt-24"
    >
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={isOpen}
        className="w-full flex items-baseline gap-3 sm:gap-4 px-3 sm:px-4 py-4 text-left font-mono text-sm cursor-pointer group hover:bg-bg-tertiary transition-colors duration-200"
      >
        <span
          aria-hidden="true"
          className={`w-3 shrink-0 transition-colors duration-200 ${isOpen ? 'text-primary' : 'text-text-muted group-hover:text-primary'}`}
        >
          {isOpen ? '▾' : '▸'}
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
        <span className="flex-1 min-w-0 font-display text-base font-bold text-text-primary group-hover:text-primary transition-colors duration-200">
          {post.title}
        </span>
        <span className="hidden sm:block w-20 shrink-0 text-right text-xs text-text-muted label-uppercase">
          {formatReadTime(post.readTime)}
        </span>
      </button>

      <div
        className={`ml-3 sm:ml-4 border-l-[3px] pl-5 sm:pl-8 pr-3 sm:pr-4 pb-8 transition-colors duration-200 ${isOpen ? 'border-primary' : 'border-border-default'}`}
      >
        {isOpen ? (
          <div className="animate-fade-in">
            <div className="font-body">
              <BlogMarkdownRenderer
                content={post.content}
                headings={post.headings}
              />
            </div>

            <div className="mt-12 pt-6 border-t-2 border-border-default flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-xs label-uppercase">
              <button
                type="button"
                onClick={handleToggle}
                className="text-text-muted hover:text-primary transition-colors duration-200 cursor-pointer"
              >
                <span aria-hidden="true">&uarr;</span> Collapse entry
              </button>
              <Link
                to={`/blog/${post.slug}`}
                className="text-text-muted hover:text-primary transition-colors duration-200"
              >
                Permalink <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in">
            <p className="text-text-secondary leading-relaxed max-w-2xl">
              {post.excerpt}
            </p>

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
                      <span className="text-text-secondary">
                        {heading.text}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 font-mono text-xs text-text-muted">
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

            <button
              type="button"
              onClick={handleToggle}
              className="inline-flex items-center gap-2 mt-6 px-5 py-3 font-mono text-sm label-uppercase border-2 border-border-default bg-bg-secondary text-text-primary shadow-[4px_4px_0_var(--color-border-default)] hover:border-primary hover:text-primary hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--color-primary)] transition-all duration-150 cursor-pointer"
            >
              Read entry <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
