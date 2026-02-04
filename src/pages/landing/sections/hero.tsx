import { Button } from '@/components/ui';
import { HeroTerminal } from '@/components/demo';

const featurePills = [
  { label: 'Transactional', borderClass: 'border-white/10', textClass: 'text-text-secondary' },
  { label: 'Incremental', borderClass: 'border-feature-blue/30', textClass: 'text-feature-blue' },
  { label: 'Embeddable', borderClass: 'border-feature-green/30', textClass: 'text-feature-green' },
];

export function HeroSection() {
  return (
    <section className="relative py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="text-center">
          {/* Status Badge - with entrance animation */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-bg-tertiary border border-white/10 rounded-full text-sm font-medium text-text-secondary opacity-0 animate-slide-up">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            In Development
          </div>

          {/* Main Title - staggered */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6 opacity-0 animate-slide-up delay-100">
            One Database for
            <br />
            <span className="gradient-text">Live Application State</span>
          </h1>

          {/* Tagline - staggered */}
          <p className="max-w-3xl mx-auto text-lg sm:text-xl text-text-secondary mb-8 leading-relaxed opacity-0 animate-slide-up delay-200">
            A database designed for reasoning about state - not just persisting it. Transactional, incremental, and programmable.
          </p>

          {/* Terminal - staggered */}
          <div className="max-w-2xl mx-auto mb-6 text-left opacity-0 animate-slide-up delay-300">
            <HeroTerminal />
          </div>

          {/* Problem Statement */}
          <p className="text-base sm:text-lg text-text-muted mb-10 font-medium opacity-0 animate-slide-up" style={{ animationDelay: '400ms' }}>
            Traditional databases treat state as a storage problem. ReifyDB treats it as a reasoning problem.
          </p>

          {/* Feature Pills - each pill with stagger */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {featurePills.map((pill, i) => (
              <span
                key={pill.label}
                className={`px-4 py-2 bg-bg-tertiary border ${pill.borderClass} rounded-full text-sm font-medium ${pill.textClass} opacity-0 animate-slide-up`}
                style={{ animationDelay: `${500 + i * 100}ms` }}
              >
                {pill.label}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-slide-up" style={{ animationDelay: '800ms' }}>
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

          {/* Notice */}
          <p className="mt-8 text-sm text-status-error font-medium opacity-0 animate-slide-up" style={{ animationDelay: '900ms' }}>
            Do not use in production yet. APIs and guarantees may change.
          </p>
        </div>
      </div>
    </section>
  );
}
