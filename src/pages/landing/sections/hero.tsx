import { Button, MarketHall } from '@/components/ui';

export function HeroSection() {
  return (
    <section className="dots relative overflow-hidden border-b border-[#e3e5f4]">
      <div className="mx-auto max-w-6xl px-6 md:px-8 pt-[clamp(36px,6vw,72px)] pb-[clamp(36px,5vw,64px)]">
        <div className="flex flex-col items-center text-center mb-[clamp(24px,3vw,36px)]">
          <p className="eyebrow-pixel mb-4">THE DATABASE THAT RUNS YOUR BACKEND</p>

          <h1 className="text-[clamp(32px,4.4vw,54px)] leading-[1.05] tracking-[-0.035em] text-text-primary mb-3 text-balance">
            Watch a swap become a candle.
          </h1>

          <p className="text-[clamp(16px,1.6vw,18px)] leading-[1.6] text-text-muted max-w-[58ch] text-pretty">
            One venue, one pipeline, every step a view running in this tab. Place a swap and follow it.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 mt-[clamp(18px,2.4vw,26px)]">
            <Button href="/docs/quick-start" size="lg">
              Get started <span className="transition-transform group-hover:translate-x-[3px]">→</span>
            </Button>
            <Button href="/playground" size="lg" variant="secondary">
              Open the playground
            </Button>
          </div>
        </div>

        <MarketHall />
      </div>
    </section>
  );
}
