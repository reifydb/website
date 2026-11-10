import { useSyncExternalStore } from 'react';
import { Button } from '@/components/ui';
import { EXAMPLES, ExampleHost } from '@/components/examples';
import type { Example } from '@/components/examples';

const NEUTRAL_HEADLINE = 'A real database, running in this tab.';
const NEUTRAL_SUBLINE = 'Pick an example below and watch every write move through it.';
const PICKED = EXAMPLES[Math.floor(Math.random() * EXAMPLES.length)];

function subscribe(): () => void {
  return () => {};
}

export function HeroSection() {
  const example = useSyncExternalStore<Example | null>(subscribe, () => PICKED, () => null);

  return (
    <section className="dots relative overflow-hidden border-b border-[#e3e5f4]">
      <div className="mx-auto max-w-6xl px-6 md:px-8 pt-[clamp(36px,6vw,72px)] pb-[clamp(36px,5vw,64px)]">
        <div className="flex flex-col items-center text-center mb-[clamp(24px,3vw,36px)]">
          <p className="eyebrow mb-4">THE DATABASE THAT RUNS YOUR BACKEND</p>

          <h1 className="text-[clamp(32px,4.4vw,54px)] leading-[1.05] tracking-[-0.035em] text-text-primary mb-3 text-balance">
            {example?.headline ?? NEUTRAL_HEADLINE}
          </h1>

          <p className="text-[clamp(16px,1.6vw,18px)] leading-[1.6] text-text-muted max-w-[58ch] text-pretty">
            {example?.subline ?? NEUTRAL_SUBLINE}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 mt-[clamp(18px,2.4vw,26px)]">
            <Button href="/docs/quick-start" size="lg">
              Get started <span className="transition-transform group-hover:translate-x-[3px]">→</span>
            </Button>
            <Button href="/examples" size="lg" variant="secondary">
              Open examples
            </Button>
          </div>
        </div>

        <ExampleHost example={example} />
      </div>
    </section>
  );
}
