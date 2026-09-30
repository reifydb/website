import { useParams } from 'react-router-dom';
import { Navbar, Footer } from '@/components/layout';
import { PageMeta } from '@/components/page-meta';
import { JsonLd } from '@/components/json-ld';
import { NoticeBoardScene, ScrollReveal } from '@/components/ui';
import { blogPosts, getPostBySlug } from '@/data/blog-data';
import { SITE_LOGO, SITE_NAME, absoluteUrl, canonicalUrl } from '@/lib/site';
import { NotFoundPage } from '@/pages/not-found';
import { EntryDetail } from './components/entry-detail';
import { PostCard } from './components/post-card';

export function BlogListingPage() {
  const { slug } = useParams<{ slug: string }>();
  const openPost = slug ? getPostBySlug(slug) : undefined;

  if (slug && !openPost) return <NotFoundPage />;

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

      <main>
        {openPost ? (
          <EntryDetail post={openPost} />
        ) : (
          <>
            <section className="sky">
              <div className="mx-auto max-w-6xl px-6 md:px-8 pt-[clamp(36px,6vw,72px)] text-center">
                <p className="eyebrow-pixel mb-3">BLOG</p>
                <h1 className="text-[clamp(26px,3.4vw,40px)] font-normal leading-[1.08] tracking-[-0.03em] text-text-primary mb-4 text-balance">
                  Notes from the build.
                </h1>
                <p className="max-w-2xl mx-auto text-text-secondary text-lg">
                  Writing from the ReifyDB team on incremental views, application state, and building a database.
                </p>
              </div>
              <NoticeBoardScene count={blogPosts.length} className="mt-10 sm:mt-12" />
            </section>
            <section className="pt-12 sm:pt-16 pb-24 sm:pb-32">
              <div className="mx-auto max-w-6xl px-6 md:px-8 grid gap-6 md:grid-cols-2">
                {blogPosts.map((post, index) => (
                  <ScrollReveal key={post.slug} className="h-full" delay={index * 75}>
                    <PostCard post={post} />
                  </ScrollReveal>
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />
    </>
  );
}
