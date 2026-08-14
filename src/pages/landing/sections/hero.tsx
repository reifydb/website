import { Button, ExecutableSnippet } from '@/components/ui';
import { heroExamples } from './hero.examples';

const heroExample = heroExamples.find((ex) => ex.id === 'guide-built-in-testing')!;

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="hidden lg:block absolute inset-y-0 right-0 z-0 w-1/2 bg-primary" />
      <div className="relative z-10 min-h-[calc(100vh-61px)] flex items-center mx-auto max-w-6xl px-6 md:px-8 py-16 lg:py-0">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center w-full">
          {/* Left — pitch */}
          <div className="text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-6 whitespace-nowrap">
              Live Application State
            </h1>

            <p className="text-lg sm:text-xl text-text-secondary mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Your state, your logic, your derived views, all in one transactional flow. No caches to invalidate. No cron to babysit. No drift to debug.
            </p>

            <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4">
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

          {/* Right — proof */}
          <div className="w-full bg-primary rounded-2xl p-6 sm:p-8 lg:bg-transparent lg:rounded-none lg:p-0">
            <ExecutableSnippet
              initialCode={heroExample.code}
              title={heroExample.title}
              description={heroExample.description}
            />

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-sm text-white/70 mt-6">
              <a href="/examples" className="hover:text-white transition-colors">
                Explore all examples &rarr;
              </a>
              <a href="/tour" className="hover:text-white transition-colors">
                Take the tour &rarr;
              </a>
              <a href="/playground" className="hover:text-white transition-colors">
                Open playground &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
