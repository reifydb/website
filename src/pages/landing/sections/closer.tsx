import { Button, ScrollReveal } from '@/components/ui';
import { HEADLINE } from '@/components/manifesto';

export function CloserSection() {
  return (
    <section className="section-dark relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 z-0 dot-grid-dark" />
      <div className="absolute inset-0 z-0 hero-glow" />
      <div className="relative z-10 mx-auto max-w-4xl px-6 md:px-8 text-center">
        <ScrollReveal>
          <p className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-6 text-balance">
            {HEADLINE}
          </p>
          <p className="max-w-2xl mx-auto text-white/60 text-lg mb-12">
            Read the docs, run the examples in the playground, and see how it fits your workload.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/docs/quick-start" size="lg">
              Get started
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
