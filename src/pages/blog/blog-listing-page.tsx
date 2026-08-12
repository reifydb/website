import { Fragment, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Navbar, Footer } from '@/components/layout';
import { PageMeta } from '@/components/page-meta';
import { ScrollReveal } from '@/components/ui';
import { blogPosts, getPostBySlug } from '@/data/blog-data';
import { NotFoundPage } from '@/pages/not-found';
import { WalEntry } from './components/wal-entry';
import { FsyncBarrier } from './components/fsync-barrier';

export function BlogListingPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const arrivalSlug = useRef(slug);
  const openPost = slug ? getPostBySlug(slug) : undefined;

  useEffect(() => {
    const target = arrivalSlug.current;
    if (!target) return;
    document
      .getElementById(`entry-${target}`)
      ?.scrollIntoView({ block: 'start' });
  }, []);

  if (slug && !openPost) return <NotFoundPage />;

  const head = blogPosts[0]?.lsn;

  return (
    <>
      <PageMeta
        title={openPost ? `${openPost.title} | ReifyDB` : 'Blog | ReifyDB'}
        description={
          openPost
            ? openPost.excerpt
            : 'Writing from the ReifyDB team on incremental views, application state, and building a database.'
        }
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
            {blogPosts.map((post, index) => (
              <Fragment key={post.slug}>
                <WalEntry
                  post={post}
                  isOpen={post.slug === slug}
                  onToggle={() =>
                    navigate(
                      post.slug === slug ? '/blog' : `/blog/${post.slug}`,
                      { state: { preserveScroll: true } }
                    )
                  }
                />
                {index < blogPosts.length - 1 && <FsyncBarrier post={post} />}
              </Fragment>
            ))}

            <div className="mt-6 px-1 font-mono text-xs text-text-muted flex flex-wrap gap-x-3">
              <span>head @ {head}</span>
              <span aria-hidden="true">·</span>
              <span>
                {blogPosts.length}{' '}
                {blogPosts.length === 1 ? 'entry' : 'entries'}
              </span>
              {openPost && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-primary">reading {openPost.lsn}</span>
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
