import { ScrollReveal, Button } from '@/components/ui';

const capabilities = [
  {
    marker: '[01]',
    title: 'ACID core for live state',
    description: 'Your state stays consistent, even under contention. Serializable transactions with real rollback, not the best-effort scripts you are used to patching together.',
  },
  {
    marker: '[02]',
    title: 'Incremental derived views',
    description: 'Your views update the moment your data changes. No cron job to schedule, no polling loop to tune, no dashboard that is quietly three minutes behind.',
  },
  {
    marker: '[03]',
    title: 'Programmable transitions',
    description: 'Your validation and business rules run inside the transaction, right next to the data. Fewer round trips, fewer places for things to go wrong.',
  },
  {
    marker: '[04]',
    title: 'Native state primitives',
    description: 'Tables, counters, ring buffers, histograms, and views all live in one transactional core. Embed it in your app or run it as a server.',
  },
];

export function CapabilitiesSection() {
  return (
    <section id="capabilities" className="relative z-10 py-16 sm:py-24 bg-bg-secondary">
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
              You should not need four systems to manage state that lives in one place. ReifyDB gives you transactions, incremental views, and programmable logic in a single engine.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2">
          {capabilities.map((capability, index) => (
            <ScrollReveal key={capability.title} delay={index * 75}>
              <div className="group border-2 border-dashed border-black/25 p-6 sm:p-7 h-full dotted-card">
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
