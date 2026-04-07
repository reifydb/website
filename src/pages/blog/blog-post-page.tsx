import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Navbar, Footer } from '@/components/layout';
import { ScrollReveal } from '@/components/ui';
import { getPostBySlug, getAdjacentPosts } from '@/data/blog-data';
import { BlogMarkdownRenderer } from './components/blog-markdown-renderer';
import { NotFoundPage } from '@/pages/not-found';

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;
  const adjacent = slug ? getAdjacentPosts(slug) : {};

  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    function onScroll() {
      setShowTopBtn(window.scrollY > 400);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
              &larr; Back to blog
            </Link>

            <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4 text-text-primary">
              {post.title}
            </h1>

            <div className="text-sm text-text-muted mb-4">
              {post.date} · {post.readTime} · {post.author}
            </div>

            <p className="text-lg text-text-secondary leading-relaxed mb-10">
              {post.excerpt}
            </p>

            <hr className="border border-border-default" />
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="glass-card p-6 sm:p-10 mt-10">
              <BlogMarkdownRenderer content={post.content} />
            </div>
          </ScrollReveal>

          {(adjacent.prev || adjacent.next) && (
            <ScrollReveal delay={200}>
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {adjacent.prev && (
                  <Link
                    to={`/blog/${adjacent.prev.slug}`}
                    className="glass-card p-5 hover:border-primary/50 transition-all duration-300 group"
                  >
                    <span className="text-sm text-text-muted">&larr; Previous</span>
                    <p className="font-bold text-text-primary group-hover:text-primary transition-colors duration-200 mt-1">
                      {adjacent.prev.title}
                    </p>
                  </Link>
                )}
                {adjacent.next && (
                  <Link
                    to={`/blog/${adjacent.next.slug}`}
                    className={`glass-card p-5 hover:border-primary/50 transition-all duration-300 group text-right${!adjacent.prev ? ' sm:col-start-2' : ''}`}
                  >
                    <span className="text-sm text-text-muted">Next &rarr;</span>
                    <p className="font-bold text-text-primary group-hover:text-primary transition-colors duration-200 mt-1">
                      {adjacent.next.title}
                    </p>
                  </Link>
                )}
              </div>
            </ScrollReveal>
          )}
        </div>
      </main>

      <Footer />

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 z-50 w-10 h-10 glass-card hover:border-primary/50 transition-all duration-300 flex items-center justify-center cursor-pointer ${showTopBtn ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-label="Back to top"
      >
        <span className="font-mono text-sm text-text-muted group-hover:text-primary">^</span>
      </button>
    </>
  );
}
