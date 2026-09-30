import { GameButton, PixelIcon, PixelScene, ScrollReveal } from '@/components/ui';
import { HEADLINE } from '@/components/manifesto';

const RIGHT_ARROW = ['x...', 'xx..', 'xxx.', 'xxxx', 'xxx.', 'xx..', 'x...'];
const LEFT_ARROW = RIGHT_ARROW.map((row) => [...row].reverse().join(''));
const ARROW_COLORS = { x: 'currentColor' };

export function CloserSection() {
  return (
    <section className="night pt-24 sm:pt-32">
      <div className="relative z-10 mx-auto max-w-4xl px-6 md:px-8 text-center">
        <ScrollReveal>
          <p className="eyebrow-pixel press-start inline-flex items-center gap-3 mb-8">
            <PixelIcon rows={RIGHT_ARROW} colors={ARROW_COLORS} className="h-3.5 w-2" />
            PRESS START
            <PixelIcon rows={LEFT_ARROW} colors={ARROW_COLORS} className="h-3.5 w-2" />
          </p>
          <p className="text-[clamp(28px,4vw,48px)] font-normal leading-[1.08] tracking-[-0.03em] text-[#f4f3fb] mb-6 text-balance">
            {HEADLINE}
          </p>
          <p className="max-w-2xl mx-auto text-[#b9bcf5] text-lg mb-12">
            Read the docs, run the examples in the playground, and see how it fits your workload.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <GameButton href="/docs/quick-start" size="lg">
              Get started <span className="game-button__arrow">→</span>
            </GameButton>
            <GameButton href="/manifesto" size="lg" variant="secondary">
              Read the Manifesto
            </GameButton>
            <GameButton href="https://github.com/reifydb/reifydb" size="lg" variant="secondary">
              View on GitHub
            </GameButton>
          </div>
        </ScrollReveal>
      </div>
      <PixelScene kind="invaders" className="relative z-10 mt-16 sm:mt-20 -mb-px" />
    </section>
  );
}
