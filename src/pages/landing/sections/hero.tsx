import { Button } from '@/components/ui';

export function HeroSection() {
  return (
    <section className="relative py-20 sm:py-28 lg:py-36 overflow-hidden">
      {/* Subtle radial amber glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-8">
        <div className="text-center">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-bg-tertiary border border-white/10 rounded-full text-sm font-medium text-text-secondary">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            In Development
          </div>

          {/* Main Title */}
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black tracking-tight mb-6 leading-[1.05]">
            The Database for
            <br />
            <span className="gradient-text">Live Application State</span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-text-secondary mb-10 leading-relaxed">
            Transactional, incremental, and programmable. ReifyDB treats state as a reasoning problem - not just a storage problem.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
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

          {/* Warning Notice */}
          <p className="text-sm text-text-muted">
            Do not use in production yet. APIs and guarantees may change.
          </p>
        </div>
      </div>
    </section>
  );
}
