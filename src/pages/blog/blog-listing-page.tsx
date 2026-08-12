import { useState } from 'react';
import { Navbar, Footer } from '@/components/layout';
import { PageMeta } from '@/components/page-meta';
import { ScrollReveal } from '@/components/ui';
import { blogPosts } from '@/data/blog-data';
import { WalEntry } from './components/wal-entry';

export function BlogListingPage() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const head = blogPosts[0]?.lsn;
  const openLsn = blogPosts.find((p) => p.slug === openSlug)?.lsn;

  return (
    <>
      <PageMeta
        title="Blog | ReifyDB"
        description="Writing from the ReifyDB team on incremental views, application state, and building a database."
      />
      <Navbar />

      <main className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          <ScrollReveal>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
              Blog
            </h1>
            <p className="text-text-secondary text-lg max-w-2xl mb-10">
              An append-only log of what is getting built, why it is built that
              way, and what broke along the way.
            </p>

            <div className="border-2 border-border-default bg-code-bg mb-12">
              <div className="px-4 py-2 border-b border-border-default bg-code-bg-elevated label-uppercase text-xs text-code-text-muted font-mono">
                blog::posts
              </div>
              <pre className="p-4 overflow-x-auto font-mono text-sm text-code-text">
                <code>{'from blog::posts\n  sort { date desc }'}</code>
              </pre>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="border-2 border-border-default bg-bg-secondary shadow-[4px_4px_0_var(--color-border-default)]">
              <div className="flex items-baseline gap-3 sm:gap-4 px-3 sm:px-4 py-3 border-b-2 border-border-default bg-bg-tertiary font-mono text-xs label-uppercase text-text-muted">
                <span aria-hidden="true" className="w-3 shrink-0" />
                <span className="w-14 shrink-0">lsn</span>
                <span className="hidden sm:block w-28 shrink-0">committed</span>
                <span className="flex-1 min-w-0">entry</span>
                <span className="hidden sm:block w-20 shrink-0 text-right">
                  read
                </span>
              </div>

              {blogPosts.map((post) => (
                <WalEntry
                  key={post.slug}
                  post={post}
                  isOpen={post.slug === openSlug}
                  onToggle={() =>
                    setOpenSlug(post.slug === openSlug ? null : post.slug)
                  }
                />
              ))}
            </div>

            <div className="mt-4 px-1 font-mono text-xs text-text-muted flex flex-wrap gap-x-3">
              <span>head @ {head}</span>
              <span aria-hidden="true">·</span>
              <span>
                {blogPosts.length}{' '}
                {blogPosts.length === 1 ? 'entry' : 'entries'}
              </span>
              {openLsn && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-primary">reading {openLsn}</span>
                </>
              )}
            </div>
          </ScrollReveal>
        </div>
      </main>

      <Footer />
    </>
  );
}
