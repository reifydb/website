import { Button, PixelScene, ScrollReveal } from '@/components/ui';
import { HEADLINE } from '@/components/manifesto';


export function CloserSection() {
  return (
    <section className="night pt-24 sm:pt-32">
      <div className="relative z-10 mx-auto max-w-4xl px-6 md:px-8 text-center">
        <ScrollReveal>
          <p className="text-[clamp(28px,4vw,48px)] font-normal leading-[1.08] tracking-[-0.03em] text-[#f4f3fb] mb-6 text-balance">
            {HEADLINE}
          </p>
          <p className="max-w-2xl mx-auto text-[#b9bcf5] text-lg mb-12">
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
      </div>
      <PixelScene kind="invaders" className="relative z-10 mt-16 sm:mt-20 -mb-px" />
    </section>
  );
}
