import { DotGridBackground } from '@/components/backgrounds/dot-grid-background';
import { HaikuTypewriter } from '@/components/demo';
import type { Haiku } from '@/components/demo';
import { Button, ExecutableSnippet } from '@/components/ui';
import { guideExamples } from '@/lib/examples';

const heroExample = guideExamples.find((ex) => ex.id === 'guide-built-in-testing')!;

const heroHaikus: Haiku[] = [
  { lines: ['No {cyan:cache}. No {cyan:cron job}.', 'Your {primary:state} stays {green:consistent} here', 'Nothing {cyan:drifts} apart'] },
  { lines: ['{primary:Write state}. {cyan:Derive views}.', 'One {green:transactional} engine', 'Nothing left to {cyan:drift}'] },
  { lines: ['Stop {cyan:duct-taping} state', '{primary:Transact}, {cyan:derive}, stay in {green:sync}', 'One {primary:database}. Done.'] },
  { lines: ['No {cyan:polls}. No {cyan:stale reads}.', 'Your {primary:views} update when {primary:state} does', '{green:Fresh data}. Always.'] },
  { lines: ['No {cyan:Redis}. No {cyan:cron}.', 'One {green:transaction} holds it all', '{primary:State} never goes {cyan:stale}'] },
  { lines: ['No {cyan:sync bugs} to chase', 'Your {cyan:cache} and {primary:data} agree', "Because there's no {cyan:cache}"] },
  { lines: ['One {primary:engine}, one {green:truth}', '{primary:State} derives the moment you', '{green:Commit}. No {cyan:drift} left.'] },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <DotGridBackground className="absolute inset-0 z-0" />

      {/* Above the fold — H1 + Editor, vertically centered */}
      <div className="relative z-10 min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center mx-auto max-w-6xl px-6 md:px-8">
        <HaikuTypewriter
          haikus={heroHaikus}
          className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-16 sm:mb-10 leading-[1.3] text-center pt-12 sm:pt-0"
        />

        <div className="w-full max-w-3xl mx-auto">
          <ExecutableSnippet
            initialCode={heroExample.code}
            title={heroExample.title}
            description={heroExample.description}
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-text-muted mt-8">
          <a href="/examples" className="hover:text-primary transition-colors">
            Explore all examples &rarr;
          </a>
          <a href="/tour" className="hover:text-primary transition-colors">
            Take the tour &rarr;
          </a>
          <a href="/playground" className="hover:text-primary transition-colors">
            Open playground &rarr;
          </a>
        </div>
      </div>

      {/* Below the fold — subtitle, CTAs */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-8 pb-20 sm:pb-28 text-center">
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-text-secondary mb-8 leading-relaxed">
          Your state, your logic, your derived views, all in one transactional flow. No caches to invalidate. No cron to babysit. No drift to debug.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/docs" size="lg">
            Read the Docs
          </Button>
          <Button
            href="https://github.com/reifydb/reifydb"
            variant="secondary"
            size="lg"
          >
            View on GitHub
          </Button>
        </div>
      </div>
    </section>
  );
}
