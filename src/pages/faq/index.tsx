import { useState } from 'react';
import { cn } from '@/lib';
import { Navbar, Footer } from '@/components/layout';
import { PageMeta } from '@/components/page-meta';
import { Button, PageCloser, PageHero, ScrollReveal } from '@/components/ui';
import { faqs } from '@/data/faq-data';

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bento-tile lift-card overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <span className="font-bold text-text-primary pr-4">
          <span className="text-primary mr-2">&gt;</span>
          {question}
        </span>
        <span className="text-text-muted text-sm font-mono">[{isOpen ? '-' : '+'}]</span>
      </button>
      <div
        className={cn(
          'overflow-hidden transition-all duration-200',
          isOpen ? 'max-h-96' : 'max-h-0'
        )}
      >
        <div className="px-6 pb-6 text-text-muted text-sm leading-relaxed border-t border-border-light pt-4">
          {answer}
        </div>
      </div>
    </div>
  );
}

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
