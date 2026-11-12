import { Button, PixelScene, ScrollReveal } from '@/components/ui';
import { HEADLINE } from '@/components/manifesto';
import { Container, Section } from '@reifydb/ui';


export function CloserSection() {
  return (
    <Section className="pb-0! sm:pb-0!">
      <Container className="text-center">
        <ScrollReveal>
          <p className="text-[clamp(28px,4vw,48px)] font-normal leading-[1.08] tracking-[-0.03em] text-text-primary mb-6 text-balance">
            {HEADLINE}
          </p>
          <p className="max-w-2xl mx-auto text-text-secondary text-lg mb-12">
            Read the docs, run the examples, and see how it fits your workload.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/docs/quick-start" size="lg">
              Get started <span className="transition-transform group-hover:translate-x-[3px]">→</span>
            </Button>
            <Button href="/manifesto" size="lg" variant="secondary">
              Read the Manifesto
            </Button>
            <Button href="https://github.com/reifydb/reifydb" size="lg" variant="secondary">
              View on GitHub
            </Button>
          </div>
        </ScrollReveal>
      </Container>
      <PixelScene kind="invaders" className="mt-16 sm:mt-20 -mb-px" />
    </Section>
  );
}
