import { Button, ScrollReveal } from '@/components/ui';
import { HEADLINE } from '@/components/manifesto';

export function CloserSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 z-0 dot-grid opacity-60" />
      <div className="relative z-10 mx-auto max-w-4xl px-6 md:px-8 text-center">
        <ScrollReveal>
          <p className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-6 text-balance">{HEADLINE}</p>
          <p className="max-w-2xl mx-auto text-text-secondary text-lg mb-12">
            Version 0.9. Not production ready, and every page says so. Read the docs, run the examples in the
            playground, and see if it fits your workload.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/docs" size="lg">
              Read the Docs
            </Button>
            <Button href="/manifesto" variant="secondary" size="lg">
              Read the Manifesto
            </Button>
            <Button href="https://github.com/reifydb/reifydb" variant="secondary" size="lg">
              View on GitHub
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
