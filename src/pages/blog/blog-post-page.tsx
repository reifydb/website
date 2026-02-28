import { Link, useParams } from 'react-router-dom';
import { Navbar, Footer } from '@/components/layout';
import { ScrollReveal } from '@/components/ui';
import { getPostBySlug } from '@/data/blog-data';
import { BlogMarkdownRenderer } from './components/blog-markdown-renderer';
import { NotFoundPage } from '@/pages/not-found';

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) return <NotFoundPage />;

  return (
    <>
      <Navbar />

      <main className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-6 md:px-8">
          <ScrollReveal>
            <Link
              to="/blog"
              className="inline-flex items-center text-sm text-text-muted hover:text-primary transition-colors duration-200 mb-8"
            >
              &lt;-- back to blog
            </Link>

            <div className="mb-10 text-center">
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4 text-text-primary">
                {post.title}
              </h1>
              <p className="text-lg text-text-secondary leading-relaxed mb-4">
                {post.excerpt}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 mb-2">
                <span className="text-sm text-text-muted">{post.date}</span>
                <span className="text-sm text-text-muted">·</span>
                <span className="text-sm text-text-muted">{post.readTime}</span>
              </div>
              <span className="text-sm text-text-muted">{post.author}</span>
            </div>

            <hr className="my-10 border-dashed border-white/15" />
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="border-2 border-dashed border-white/15 bg-bg-secondary p-6 sm:p-10">
              <BlogMarkdownRenderer content={post.content} />
            </div>
          </ScrollReveal>
        </div>
      </main>

      <Footer />
    </>
  );
}
