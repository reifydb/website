import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Navbar, Footer } from '@/components/layout';
import { PageMeta } from '@/components/page-meta';
import { ScrollReveal } from '@/components/ui';
import {
  getPostBySlug,
  getAdjacentPosts,
  formatReadTime,
} from '@/data/blog-data';
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
      <PageMeta title={`${post.title} | ReifyDB`} description={post.excerpt} />
      <Navbar />

      <main className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-6 md:px-8">
          <ScrollReveal>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 font-mono text-xs label-uppercase text-text-muted hover:text-primary transition-colors duration-200 mb-10"
            >
              <span aria-hidden="true">&larr;</span> Back to blog
            </Link>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-text-muted mb-4">
              <span className="text-primary" data-numeric>
                {post.lsn}
              </span>
              <span aria-hidden="true">·</span>
              <span className="label-uppercase">committed</span>
              <span data-numeric>{post.date}</span>
              <span aria-hidden="true">·</span>
              <span>{formatReadTime(post.readTime)}</span>
              <span aria-hidden="true">·</span>
              <span className="label-uppercase">{post.author}</span>
            </div>

            <div className="h-[3px] bg-primary w-full mb-8" />

            <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-6 text-text-primary">
              {post.title}
            </h1>

            <p className="text-lg text-text-secondary leading-relaxed mb-12">
              {post.excerpt}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="font-body">
              <BlogMarkdownRenderer
                content={post.content}
                headings={post.headings}
              />
            </div>
          </ScrollReveal>

          {(adjacent.prev || adjacent.next) && (
            <ScrollReveal delay={200}>
              <div className="mt-16 pt-8 border-t-2 border-border-default grid grid-cols-1 sm:grid-cols-2 gap-4">
                {adjacent.prev && (
                  <Link
                    to={`/blog/${adjacent.prev.slug}`}
                    className="glass-card p-5 hover:border-primary/50 transition-all duration-300 group"
                  >
                    <span className="font-mono text-xs label-uppercase text-text-muted">
                      <span aria-hidden="true">&larr;</span> Previous{' '}
                      {adjacent.prev.lsn}
                    </span>
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
                    <span className="font-mono text-xs label-uppercase text-text-muted">
                      Next {adjacent.next.lsn}{' '}
                      <span aria-hidden="true">&rarr;</span>
                    </span>
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
