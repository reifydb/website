import { ShieldCheck, Sparkles, Cpu } from 'lucide-react';
import { Button } from '@/components/ui';

const heroHighlights = [
  {
    title: 'ACID core for live state',
    description: 'Serializable transactions with rollback, not best-effort Lua scripts or cache hacks.',
    icon: ShieldCheck,
  },
  {
    title: 'Derived views stay fresh',
    description: 'Incremental materialization removes the cron-tangle and stale dashboards.',
    icon: Sparkles,
  },
  {
    title: 'Logic lives next to data',
    description: 'Programmable transitions cut network hops and keep invariants close to the facts.',
    icon: Cpu,
  },
];

export function HeroSection() {
  return (
    <section className="relative py-16 sm:py-24 lg:py-28 overflow-hidden">
      {/* Subtle radial amber glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(600px,100vw)] h-[400px] bg-primary/10 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-8">
        <div className="text-center">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-bg-tertiary border border-white/10 rounded-full text-sm font-medium text-text-secondary">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            Developer Preview - APIs subject to change
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-black tracking-tight mb-6 leading-[1.05] mx-auto max-w-5xl">
            The database for{' '}
            <span className="gradient-text">live application state</span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-3xl mx-auto text-lg sm:text-xl text-text-secondary mb-10 leading-relaxed">
            Write, enforce logic, and keep derived views fresh in one transactional flow - no caches, cron, or drift.
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
            Do not use in production yet. Early adopters welcome.
          </p>

          {/* Hero highlights */}
          <div className="mt-10 bg-bg-tertiary border border-white/10 rounded-2xl p-5 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] text-left">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 bg-primary rounded-full" />
              <p className="text-xs font-semibold text-text-secondary uppercase tracking-[0.08em]">Why teams care</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {heroHighlights.map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-3 bg-bg-secondary/70 border border-white/5 rounded-xl p-4 h-full card-hover"
                >
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary/20 to-accent-warm/15 flex items-center justify-center text-primary flex-shrink-0">
                    <item.icon className="h-5 w-5" strokeWidth={2} />
                  </div>
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
