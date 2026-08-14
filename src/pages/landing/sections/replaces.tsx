import { ScrollReveal } from '@/components/ui';
import { Badge } from '@reifydb/ui';

const replacements = [
  {
    before: 'PostgreSQL + Redis',
    after: 'Single Transactional Store',
    description: 'You know that moment when your cache says one thing and your database says another? That goes away. One store, one source of truth.',
  },
  {
    before: 'Batch Materialized Views',
    after: 'Incremental Derived State',
    description: 'Your views update when your data changes, not whenever a cron job gets around to it. No polling, no refresh buttons, no stale numbers.',
  },
  {
    before: 'Scattered Service Logic',
    after: 'Programmable Transitions',
    description: 'Stop scattering your state logic across microservices, workers, and cron jobs. Put it next to the data where it belongs.',
  },
  {
    before: 'Redis + Kafka + Custom Code',
    after: 'Native State Primitives',
    description: 'Counters, queues, ring buffers, histograms. You do not need three systems and a pile of glue code. One engine, full transactional guarantees.',
  },
];

function ReplacementCell({ item, index }: { item: (typeof replacements)[number]; index: number }) {
  return (
    <ScrollReveal delay={index * 75}>
      <div className="p-6 sm:p-8">
        {/* Before --> After */}
        <div className="flex items-center gap-3 mb-4 flex-wrap text-sm">
          <Badge variant="outline" className="line-through">{item.before}</Badge>
          <span className="text-text-muted">&rarr;</span>
          <Badge variant="active">{item.after}</Badge>
        </div>
        {/* Description */}
        <p className="text-text-muted text-sm leading-relaxed">
          {item.description}
        </p>
      </div>
    </ScrollReveal>
  );
}

export function ReplacesSection() {
  return (
    <section id="replaces" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-12 sm:mb-16">
            <Badge variant="active" className="text-xs mb-3 uppercase tracking-[0.2em]">Replaces</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              What ReifyDB Replaces
            </h2>
            <p className="max-w-2xl mx-auto text-text-secondary text-lg">
              You have probably duct-taped three or four systems together just to manage state. Here is what you can stop maintaining.
            </p>
          </div>
        </ScrollReveal>

        {/* Replacements Grid */}
        <div className="glass-card overflow-hidden divide-y divide-border-light">
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border-light">
            <ReplacementCell item={replacements[0]} index={0} />
            <ReplacementCell item={replacements[1]} index={1} />
          </div>
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border-light">
            <ReplacementCell item={replacements[2]} index={2} />
            <ReplacementCell item={replacements[3]} index={3} />
          </div>
        </div>
      </div>
    </section>
  );
}
