import { Database, Lock, RefreshCw, Cpu } from 'lucide-react';
import { ScrollReveal } from '@/components/ui';

const principles = [
  {
    title: 'State is First-Class',
    description: 'Not an afterthought bolted onto a query engine. ReifyDB is built from the ground up around mutable, live state.',
    icon: Database,
    color: 'text-primary',
    bgColor: 'from-primary/20 to-accent-warm/20',
  },
  {
    title: 'Transactional Boundaries',
    description: 'All mutations go through transactions. No side-channel updates, no eventual consistency surprises.',
    icon: Lock,
    color: 'text-feature-blue',
    bgColor: 'from-feature-blue/20 to-feature-teal/20',
  },
  {
    title: 'Incremental Maintenance',
    description: 'Derived state is updated as data changes, not recomputed on read. Views are always fresh.',
    icon: RefreshCw,
    color: 'text-feature-green',
    bgColor: 'from-feature-green/20 to-feature-teal/20',
  },
  {
    title: 'Colocation',
    description: 'Logic lives next to data, reducing network hops and eliminating consistency gaps between services.',
    icon: Cpu,
    color: 'text-feature-purple',
    bgColor: 'from-feature-purple/20 to-accent-warm/20',
  },
];

export function PhilosophySection() {
  return (
    <section id="philosophy" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
              Design Philosophy
            </h2>
            <p className="max-w-2xl mx-auto text-text-secondary text-lg">
              The architectural decisions behind ReifyDB.
            </p>
          </div>
        </ScrollReveal>

        {/* Principles Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((principle, index) => (
            <ScrollReveal key={principle.title} delay={index * 75}>
              <div className="group bg-bg-tertiary border border-white/10 rounded-2xl p-6 text-center transition-all duration-300 hover:scale-[1.02] hover:border-primary/40 hover:shadow-[0_0_40px_rgba(99,102,241,0.15)] h-full">
                <div className={`inline-flex items-center justify-center w-14 h-14 mb-4 rounded-xl bg-gradient-to-br ${principle.bgColor}`}>
                  <principle.icon className={`h-7 w-7 ${principle.color}`} strokeWidth={2} />
                </div>
                <h3 className="text-base font-bold mb-2">{principle.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {principle.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
