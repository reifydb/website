import { Star } from 'lucide-react';
import { Button, ExecutableShell, InstallCommand, PanelFrame } from '@/components/ui';
import { useGitHubStars } from '@/hooks';

const stats = [
  { value: '1 RTT', label: 'per transaction, not per statement' },
  { value: 'Rust', label: 'core, zero GC pauses' },
  { value: 'Apache-2.0', label: 'open source' },
  { value: 'Embedded', label: 'or standalone server' },
];

function TrustStrip() {
  const { formatted, loading } = useGitHubStars();

  return (
    <div className="mt-16 border-t border-white/10 pt-8">
      <div className="grid grid-cols-2 gap-y-6 gap-x-8 sm:grid-cols-3 lg:grid-cols-5">
        <a
          href="https://github.com/reifydb/reifydb"
          target="_blank"
          rel="noopener noreferrer"
          className="group"
        >
          <div className="flex items-center gap-1.5 text-xl font-black text-white group-hover:text-primary transition-colors">
            <Star size={16} className="fill-current text-primary" />
            {loading || !formatted ? 'GitHub' : formatted}
          </div>
          <div className="text-xs text-white/45 mt-1">stars on GitHub</div>
        </a>
        {stats.map((stat) => (
          <div key={stat.label}>
            <div className="text-xl font-black text-white">{stat.value}</div>
            <div className="text-xs text-white/45 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden section-dark">
      <div className="absolute inset-0 z-0 dot-grid-dark" />
      <div className="absolute inset-0 z-0 hero-glow" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-8 pt-20 pb-16 lg:pt-28 lg:pb-20">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-14 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-pill border border-white/15 bg-white/5 px-3 py-1 mb-7">
              <span className="status-dot status-dot-connected" />
              <span className="text-xs label-uppercase text-white/70">Runs in your browser, right here</span>
            </div>

            <h1 className="text-4xl sm:text-5xl leading-[1.05] tracking-tight text-white mb-6 text-balance">
              One database instead of Postgres + Redis + a queue + a cron job.
            </h1>

            <p className="text-lg sm:text-xl text-white/60 mb-9 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Writes, business rules, and derived views commit in one transaction, inside the database,
              as the user who asked. Nothing to invalidate. Nothing to babysit.
            </p>

            <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 mb-8">
              <Button href="/docs/quick-start" size="lg">
                Get started
              </Button>
              <Button href="/playground" variant="secondary" size="lg">
                Open the playground
              </Button>
            </div>

            <InstallCommand className="w-full sm:w-auto text-left" />
          </div>

          <div className="w-full min-w-0">
            <PanelFrame label="RQL SHELL (wasm)" fullscreen className="window-shell">
              <ExecutableShell deferLoad />
            </PanelFrame>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-sm text-white/50 mt-5">
              <a href="/examples" className="hover:text-white transition-colors">
                Explore all examples &rarr;
              </a>
              <a href="/tour" className="hover:text-white transition-colors">
                Take the tour &rarr;
              </a>
            </div>
          </div>
        </div>

        <TrustStrip />
      </div>
    </section>
  );
}
