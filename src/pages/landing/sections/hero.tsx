import { Button } from '@/components/ui';

const heroHighlights = [
  {
    marker: '[~]',
    title: 'ACID core for live state',
    description: 'Serializable transactions with rollback, not best-effort Lua scripts or cache hacks.',
  },
  {
    marker: '[+]',
    title: 'Derived views stay fresh',
    description: 'Incremental materialization removes the cron-tangle and stale dashboards.',
  },
  {
    marker: '[>]',
    title: 'Logic lives next to data',
    description: 'Programmable transitions cut network hops and keep invariants close to the facts.',
  },
];

export function HeroSection() {
  return (
    <section className="relative py-16 sm:py-24 lg:py-28 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-8">
        <div className="text-center">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 border border-dashed border-white/20 text-sm text-text-secondary">
            <span className="text-primary blink-cursor">█</span>
            Developer Preview — APIs subject to change
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-black tracking-tight mb-6 leading-[1.05] mx-auto max-w-5xl">
            The database for{' '}
            <span className="text-primary">live application state</span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-3xl mx-auto text-lg sm:text-xl text-text-secondary mb-10 leading-relaxed">
            Write, enforce logic, and keep derived views fresh in one transactional flow — no caches, cron, or drift.
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
            <span className="text-primary">$</span> warning: do not use in production yet. early adopters welcome.
          </p>

          {/* Hero highlights */}
          <div className="mt-10 border-2 border-dashed border-white/15 p-5 sm:p-6 text-left dotted-card">
            <div className="flex items-center gap-2 mb-4">
              <p className="text-xs font-semibold text-primary uppercase tracking-[0.08em]">// why_teams_care</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {heroHighlights.map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-3 border border-dashed border-white/10 p-4 h-full"
                >
                  <span className="text-primary text-sm font-bold flex-shrink-0 mt-0.5">{item.marker}</span>
                  <div>
                    <p className="font-semibold text-text-primary leading-tight">{item.title}</p>
                    <p className="text-sm text-text-muted leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
