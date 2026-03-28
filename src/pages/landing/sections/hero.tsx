import { DotGridBackground } from '@/components/backgrounds/dot-grid-background';
import { Button, ExecutableSnippet } from '@/components/ui';
import { guideExamples } from '@/lib/examples';

const heroExample = guideExamples.find((ex) => ex.id === 'guide-built-in-testing')!;

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <DotGridBackground className="absolute inset-0 z-0" />

      {/* Above the fold — H1 + Editor, vertically centered */}
      <div className="relative z-10 min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center mx-auto max-w-6xl px-6 md:px-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-8 leading-tight text-center">
          <span className="border-b-4 border-primary pb-1">Live Application State</span>
        </h1>

        <div className="w-full max-w-[50%] mx-auto">
          <ExecutableSnippet
            initialCode={heroExample.code}
            title={heroExample.title}
            description={heroExample.description}
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-text-muted mt-6">
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
      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-8 pb-24 sm:pb-32 text-center">
        <p className="max-w-3xl mx-auto text-lg sm:text-xl text-text-secondary mb-10 leading-relaxed">
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
