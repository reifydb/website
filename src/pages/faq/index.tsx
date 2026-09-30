import { Navbar, Footer } from '@/components/layout';
import { PageMeta } from '@/components/page-meta';
import { Button, FaqItem, PageCloser, PageHero, PixelScene, ScrollReveal } from '@/components/ui';
import { faqs } from '@/data/faq-data';

export function FaqPage() {
  return (
    <>
      <PageMeta
        title="FAQ | ReifyDB"
        description="Answers to common questions about ReifyDB: what it is, how it differs from a traditional database, and when to use it."
      />
      <Navbar />

      <main>
        <PageHero
          eyebrow="FAQ"
          title="Frequently asked questions"
          subtitle="What ReifyDB is, how it differs from the stack you have, and where it fits today."
          scene={<PixelScene kind="booth" />}
        />

        <section className="section-elevated py-20 sm:py-28">
          <div className="mx-auto max-w-3xl px-6 md:px-8">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <ScrollReveal key={faq.question} delay={index * 60}>
                  <FaqItem {...faq} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <PageCloser
          title="Still have a question?"
          subtitle="Open a discussion on GitHub, or take thirty minutes and ask directly."
        >
          <Button href="https://cal.com/reifydb/30min" size="lg">
            Book a call
          </Button>
          <Button href="https://github.com/orgs/reifydb/discussions" variant="secondary" size="lg">
            Ask on GitHub
          </Button>
        </PageCloser>
      </main>

      <Footer />
    </>
  );
}
