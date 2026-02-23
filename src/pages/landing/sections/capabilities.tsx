import {
  Shield,
  RefreshCw,
  Workflow,
  Boxes,
} from 'lucide-react';
import { ScrollReveal, Button } from '@/components/ui';

const capabilities = [
  {
    title: 'ACID core for live state',
    description: 'Serializable transactions with rollback keep mutable state consistent under contention. No best-effort scripts or cache drift.',
    icon: Shield,
    color: 'text-primary',
    bgColor: 'from-primary/20 to-primary/5',
  },
  {
    title: 'Incremental derived views',
    description: 'Materialization stays fresh as changes flow through the same pipeline. No cron, no polling, no stale dashboards.',
    icon: RefreshCw,
    color: 'text-feature-blue',
    bgColor: 'from-feature-blue/20 to-feature-blue/5',
  },
  {
    title: 'Programmable transitions',
    description: 'Application logic runs next to the data inside the transaction envelope. Fewer hops, tighter invariants.',
    icon: Workflow,
    color: 'text-feature-green',
    bgColor: 'from-feature-green/20 to-feature-green/5',
  },
  {
    title: 'Native state primitives',
    description: 'Tables, counters, ring buffers, histograms, and views share one transactional, memory-resident core, embedded or server mode.',
    icon: Boxes,
    color: 'text-feature-purple',
    bgColor: 'from-feature-purple/20 to-feature-purple/5',
  },
];

export function CapabilitiesSection() {
  return (
    <section id="capabilities" className="relative z-10 py-16 sm:py-24 bg-bg-tertiary">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-xs font-semibold tracking-[0.12em] uppercase text-text-secondary mb-2">
              What you get
            </p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
              Why ReifyDB
            </h2>
            <p className="max-w-3xl mx-auto text-text-secondary text-lg">
              A single engine for live application state - transactional, incremental, and programmable in one flow.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2">
          {capabilities.map((capability, index) => (
            <ScrollReveal key={capability.title} delay={index * 75}>
              <div className="group bg-bg-secondary/90 border border-white/10 rounded-2xl p-6 sm:p-7 transition-all duration-300 card-hover h-full shadow-[0_18px_50px_rgba(0,0,0,0.35)]">
                <div className={`mb-4 w-11 h-11 rounded-xl bg-gradient-to-br ${capability.bgColor} flex items-center justify-center text-primary/90`}>
                  <capability.icon className={`h-6 w-6 ${capability.color}`} strokeWidth={2} aria-hidden />
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
