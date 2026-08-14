import { Fragment, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Navbar, Footer } from '@/components/layout';
import { PageMeta } from '@/components/page-meta';
import { JsonLd } from '@/components/json-ld';
import { ScrollReveal } from '@/components/ui';
import { blogPosts, getPostBySlug } from '@/data/blog-data';
import { SITE_LOGO, SITE_NAME, absoluteUrl, canonicalUrl } from '@/lib/site';
import { NotFoundPage } from '@/pages/not-found';
import { WalEntry } from './components/wal-entry';
import { EntryDetail } from './components/entry-detail';
import { FsyncBarrier } from './components/fsync-barrier';
import { RqlCode } from './components/rql-code';

export function BlogListingPage() {
  const { slug } = useParams<{ slug: string }>();
  const { state } = useLocation();
  const fromSlug = (state as { fromSlug?: string } | null)?.fromSlug;
  const openPost = slug ? getPostBySlug(slug) : undefined;

  useEffect(() => {
    if (slug || !fromSlug) return;
    document
      .getElementById(`entry-${fromSlug}`)
      ?.scrollIntoView({ block: 'start' });
  }, [slug, fromSlug]);

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
        image={openPost ? absoluteUrl(openPost.ogImage) : undefined}
        imageAlt={openPost ? openPost.title : undefined}
        article={
          openPost
            ? {
                publishedTime: openPost.date,
                author: openPost.author,
                tags: openPost.tags,
              }
            : undefined
        }
      />
      {openPost && (
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: openPost.title,
            description: openPost.excerpt,
            image: absoluteUrl(openPost.ogImage),
            datePublished: openPost.date,
            dateModified: openPost.date,
            author: { '@type': 'Person', name: openPost.author },
            publisher: {
              '@type': 'Organization',
              name: SITE_NAME,
              logo: {
                '@type': 'ImageObject',
                url: absoluteUrl(SITE_LOGO),
              },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': canonicalUrl(`/blog/${openPost.slug}`),
            },
            keywords: openPost.tags.join(', '),
          }}
        />
      )}
      <Navbar />

      <main className={openPost ? 'pb-16 sm:pb-24' : 'py-16 sm:py-24'}>
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          {!openPost && (
            <ScrollReveal>
              <div className="border border-border-light rounded-md overflow-hidden bg-code-bg mb-6">
                <div className="px-4 py-2 border-b border-border-light bg-code-bg-elevated label-uppercase text-xs text-code-text-muted font-mono">
                  blog::posts
                </div>
                <pre className="p-4 overflow-x-auto">
                  <RqlCode query="from blog::posts sort { date: desc }" />
                </pre>
              </div>
            </ScrollReveal>
          )}

          {openPost ? (
            <div className="sticky top-[60px] z-30 -mx-6 md:-mx-8 mb-8 flex flex-wrap gap-x-3 border-b border-border-light bg-bg-primary px-6 md:px-8 py-2 font-mono text-xs text-text-muted">
              <Link
                to="/blog"
                state={{ preserveScroll: true, fromSlug: openPost.slug }}
                className="label-uppercase hover:text-primary transition-colors duration-200"
              >
                <span aria-hidden="true">&larr;</span> Back to log
              </Link>
              <span aria-hidden="true">·</span>
              <span className="truncate">{openPost.title}</span>
            </div>
          ) : (
            <div className="mb-6 flex flex-wrap gap-x-3 px-1 font-mono text-xs text-text-muted">
              <span>head @ {head}</span>
              <span aria-hidden="true">·</span>
              <span>
                {blogPosts.length}{' '}
                {blogPosts.length === 1 ? 'entry' : 'entries'}
              </span>
            </div>
          )}

          {openPost ? (
            <EntryDetail post={openPost} />
          ) : (
            <ScrollReveal delay={100}>
              {blogPosts.map((post, index) => (
                <Fragment key={post.slug}>
                  <WalEntry post={post} />
                  {index < blogPosts.length - 1 && <FsyncBarrier post={post} />}
                </Fragment>
              ))}
            </ScrollReveal>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
