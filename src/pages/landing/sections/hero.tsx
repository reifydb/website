import { Button } from '@/components/ui';
import { HeroTerminal } from '@/components/demo';

export function HeroSection() {
  return (
    <section className="relative py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="text-center">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white border-2 border-border-default rounded-full text-sm font-bold shadow-minimal">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            IN DEVELOPMENT
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6">
            One Database for
            <br />
            <span className="text-primary-color">Live Application State</span>
          </h1>

          {/* Tagline */}
          <p className="max-w-3xl mx-auto text-lg sm:text-xl text-text-secondary mb-8 leading-relaxed">
            Transactional guarantees, incremental derived state, and programmable state transitions—all in one engine.
          </p>

          {/* Terminal */}
          <div className="max-w-2xl mx-auto mb-6 text-left">
            <HeroTerminal />
          </div>

          {/* Problem Statement */}
          <p className="text-base sm:text-lg text-text-muted mb-10 font-medium">
            Modern apps scatter state across databases, caches, and queues. ReifyDB unifies it.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <span className="px-4 py-2 bg-white border-2 border-border-default rounded-full text-sm font-bold shadow-minimal">
              Transactional
            </span>
            <span className="px-4 py-2 bg-white border-2 border-feature-blue/30 text-feature-blue rounded-full text-sm font-bold shadow-minimal">
              Incremental
            </span>
            <span className="px-4 py-2 bg-white border-2 border-feature-green/30 text-feature-green rounded-full text-sm font-bold shadow-minimal">
              Embeddable
            </span>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/docs" size="lg">
              Read the Docs →
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
          <p className="mt-8 text-sm text-red-500 font-medium">
            Do not use in production yet. APIs and guarantees may change.
          </p>
        </div>
      </div>
    </section>
  );
}
