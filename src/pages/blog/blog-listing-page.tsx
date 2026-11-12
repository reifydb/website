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
import { Container, PageHero, Section } from '@reifydb/ui';

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
            <PageHero
              eyebrow="Blog"
              title="Notes from the build."
              subtitle="Writing from the ReifyDB team on incremental views, application state, and building a database."
              scene={<NoticeBoardScene count={blogPosts.length} />}
            />
            <Section>
              <Container className="divide-y divide-[#e3e5f4] border-y border-[#e3e5f4]">
                {blogPosts.map((post, index) => (
                  <ScrollReveal key={post.slug} delay={index * 75}>
                    <PostCard post={post} />
                  </ScrollReveal>
                ))}
              </Container>
            </Section>
          </>
        )}
      </main>

      <Footer />
    </>
  );
}
