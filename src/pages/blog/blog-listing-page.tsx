import { Navbar, Footer } from '@/components/layout';
import { ScrollReveal } from '@/components/ui';
import { blogPosts } from '@/data/blog-data';
import { BlogCard } from './components/blog-card';

export function BlogListingPage() {
  return (
    <>
      <Navbar />

      <main className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-6 md:px-8">
          <ScrollReveal>
            <div className="text-center mb-12 sm:mb-16">
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
                Blog
              </h1>
              <p className="max-w-2xl mx-auto text-text-secondary text-lg">
                Engineering insights, tutorials, and updates from the ReifyDB
                team
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-6">
            {blogPosts.map((post, index) => (
              <ScrollReveal key={post.slug} delay={index * 75}>
                <BlogCard post={post} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
