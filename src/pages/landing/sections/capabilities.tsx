import { ScrollReveal, Button } from '@/components/ui';
import { Badge } from '@reifydb/ui';

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
    stat: '0 partial writes',
    description: 'Your state stays consistent, even under contention. Serializable transactions with real rollback, not the best-effort scripts you are used to patching together.',
    accent: 'bg-primary/10 text-primary',
  },
  {
    title: 'Incremental derived views',
    stat: '0 cron jobs',
    description: 'Your views update the moment your data changes. No cron job to schedule, no polling loop to tune, no dashboard that is quietly three minutes behind.',
    accent: 'bg-primary/10 text-primary',
  },
  {
    title: 'Programmable transitions',
    stat: '100k TPS, 0 round trips',
    description: 'Your validation and business rules run inside the transaction, right next to the data. Fewer round trips, fewer places for things to go wrong.',
    accent: 'bg-primary/10 text-primary',
  },
  {
    title: 'Native state primitives',
    stat: '5 built-in primitives',
    description: 'Tables, counters, ring buffers, histograms, and views all live in one transactional core. Embed it in your app or run it as a server.',
    accent: 'bg-primary/10 text-primary',
  },
  {
    title: 'Knows who is asking',
    stat: '0 shared passwords',
    description: 'Every client authenticates as itself, and policies decide, per user, what may be read and written. A hostile query runs as that user and can do nothing the user could not do anyway.',
    accent: 'bg-primary/10 text-primary',
  },
];

function CapabilityCell({ capability, index }: { capability: (typeof capabilities)[number]; index: number }) {
  return (
    <ScrollReveal delay={index * 75}>
      <div className="p-6 sm:p-8">
        <Badge variant="active" className={`justify-center w-10 h-10 rounded-none font-bold text-sm mb-4 ${capability.accent}`}>
          {String(index + 1).padStart(2, '0')}
        </Badge>
        <h3 className="text-lg font-bold mb-1 text-text-primary">{capability.title}</h3>
        <p className="text-xs font-mono uppercase tracking-wide text-primary mb-2">
          {capability.stat}
        </p>
        <p className="text-text-muted text-sm leading-relaxed">
          {capability.description}
        </p>
      </div>
    </ScrollReveal>
  );
}

export function CapabilitiesSection() {
  return (
    <section id="capabilities" className="relative z-10 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16 sm:mb-20">
            <Badge variant="active" className="text-xs mb-3 uppercase tracking-[0.2em]">How It Works</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Why ReifyDB
            </h2>
            <p className="max-w-3xl mx-auto text-text-secondary text-lg">
              You should not need four systems to manage state that lives in one place. ReifyDB gives you transactions, incremental views, and programmable logic in a single engine that knows who is asking.
            </p>
          </div>
        </ScrollReveal>

        {/* Pipeline - 3 steps */}
        <div className="glass-card grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border-light overflow-hidden mb-16 sm:mb-20">
          {pipeline.map((step, index) => (
            <ScrollReveal key={step.title} delay={index * 100}>
              <div className="p-6 sm:p-8 text-center">
                <Badge variant="active" className="justify-center w-10 h-10 rounded-none bg-primary/10 font-bold text-sm mb-4">{step.number}</Badge>
                <h3 className="text-base font-bold mb-2">{step.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Capability Cards - 2x2 */}
        <div className="glass-card overflow-hidden divide-y divide-border-light">
          <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border-light">
            <CapabilityCell capability={capabilities[0]} index={0} />
            <CapabilityCell capability={capabilities[1]} index={1} />
          </div>
          <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border-light">
            <CapabilityCell capability={capabilities[2]} index={2} />
            <CapabilityCell capability={capabilities[3]} index={3} />
          </div>
          <CapabilityCell capability={capabilities[4]} index={4} />
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
