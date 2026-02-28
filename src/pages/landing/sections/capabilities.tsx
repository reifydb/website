import { ScrollReveal, Button } from '@/components/ui';

const capabilities = [
  {
    marker: '[01]',
    title: 'ACID core for live state',
    description: 'Serializable transactions with rollback keep mutable state consistent under contention. No best-effort scripts or cache drift.',
  },
  {
    marker: '[02]',
    title: 'Incremental derived views',
    description: 'Materialization stays fresh as changes flow through the same pipeline. No cron, no polling, no stale dashboards.',
  },
  {
    marker: '[03]',
    title: 'Programmable transitions',
    description: 'Application logic runs next to the data inside the transaction envelope. Fewer hops, tighter invariants.',
  },
  {
    marker: '[04]',
    title: 'Native state primitives',
    description: 'Tables, counters, ring buffers, histograms, and views share one transactional, memory-resident core, embedded or server mode.',
  },
];

export function CapabilitiesSection() {
  return (
    <section id="capabilities" className="relative z-10 py-16 sm:py-24 bg-bg-tertiary">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-xs font-semibold tracking-[0.12em] uppercase text-primary mb-2">
              # capabilities
            </p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
              Why ReifyDB
            </h2>
            <p className="max-w-3xl mx-auto text-text-secondary text-lg">
              A single engine for live application state — transactional, incremental, and programmable in one flow.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2">
          {capabilities.map((capability, index) => (
            <ScrollReveal key={capability.title} delay={index * 75}>
              <div className="group border-2 border-dashed border-white/15 p-6 sm:p-7 h-full dotted-card">
                <div className="mb-3 text-primary text-sm font-bold">{capability.marker}</div>
                <h3 className="text-lg font-bold mb-2 text-text-primary">{capability.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {capability.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={200}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" href="https://cal.com/reifydb/30min">
              Book a call
            </Button>
            <Button size="lg" variant="secondary" href="/docs">
              Read the docs
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
