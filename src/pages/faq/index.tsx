import { Footer, Navbar } from '@/components/layout';
import { PageMeta } from '@/components/page-meta';
import { Button, FaqRobot, PageCloser, PixelScene, ScrollReveal } from '@/components/ui';
import { faqs } from '@/data/faq-data';
import { Container, FaqItem, PageHero, Section } from '@reifydb/ui';

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

        <Section tone="tint">
          <Container width="narrow">
            <div className="border-b border-[#e3e5f4]">
              {faqs.map((faq, index) => (
                <ScrollReveal key={faq.question} delay={index * 60}>
                  <FaqItem {...faq} portrait={<FaqRobot />} />
                </ScrollReveal>
              ))}
            </div>
          </Container>
        </Section>

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
