import { ScrollReveal, Button } from '@/components/ui';

const pipeline = [
  {
    number: '01',
    title: 'Write state transactionally',
    description: 'Full ACID guarantees. If something goes wrong, it rolls back. No partial writes.',
  },
  {
    number: '02',
    title: 'Validate and apply logic',
    description: 'Business rules run inside the same transaction, right next to the data.',
  },
  {
    number: '03',
    title: 'Stay fresh automatically',
    description: 'Derived views update the moment the transaction commits. No polling, no stale data.',
  },
];

const capabilities = [
  {
    title: 'ACID core for live state',
    description: 'Your state stays consistent, even under contention. Serializable transactions with real rollback, not the best-effort scripts you are used to patching together.',
    accent: 'bg-primary/10 text-primary',
  },
  {
    title: 'Incremental derived views',
    description: 'Your views update the moment your data changes. No cron job to schedule, no polling loop to tune, no dashboard that is quietly three minutes behind.',
    accent: 'bg-accent-lime/10 text-accent-lime',
  },
  {
    title: 'Programmable transitions',
    description: 'Your validation and business rules run inside the transaction, right next to the data. Fewer round trips, fewer places for things to go wrong.',
    accent: 'bg-accent-purple/10 text-accent-purple',
  },
  {
    title: 'Native state primitives',
    description: 'Tables, counters, ring buffers, histograms, and views all live in one transactional core. Embed it in your app or run it as a server.',
    accent: 'bg-primary/10 text-primary',
  },
];

export function CapabilitiesSection() {
  return (
    <section id="capabilities" className="relative z-10 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16 sm:mb-20">
            <p className="text-xs font-semibold tracking-[0.12em] uppercase text-primary mb-3">
              How It Works
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">
              Why ReifyDB
            </h2>
            <p className="max-w-3xl mx-auto text-text-secondary text-lg">
              You should not need four systems to manage state that lives in one place. ReifyDB gives you transactions, incremental views, and programmable logic in a single engine.
            </p>
          </div>
        </ScrollReveal>

        {/* Pipeline - 3 steps */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-3 mb-16 sm:mb-20">
          {pipeline.map((step, index) => (
            <ScrollReveal key={step.title} delay={index * 100}>
              <div className="glass-card p-6 text-center h-full">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-sm mb-4">
                  {step.number}
                </div>
                <h3 className="text-base font-bold mb-2">{step.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Capability Cards - 2x2 */}
        <div className="grid gap-6 sm:grid-cols-2">
          {capabilities.map((capability, index) => (
            <ScrollReveal key={capability.title} delay={index * 75}>
              <div className="glass-card p-6 sm:p-8 h-full">
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-md ${capability.accent} font-bold text-sm mb-4`}>
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="text-lg font-bold mb-2 text-text-primary">{capability.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {capability.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={200}>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
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
