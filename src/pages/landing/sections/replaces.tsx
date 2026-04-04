import { ScrollReveal } from '@/components/ui';
import { Card, CardContent, Badge } from '@reifydb/ui';

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

export function ReplacesSection() {
  return (
    <section id="replaces" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-12 sm:mb-16">
            <Badge variant="active" className="text-xs mb-3 uppercase tracking-[0.12em]">Replaces</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">
              What ReifyDB Replaces
            </h2>
            <p className="max-w-2xl mx-auto text-text-secondary text-lg">
              You have probably duct-taped three or four systems together just to manage state. Here is what you can stop maintaining.
            </p>
          </div>
        </ScrollReveal>

        {/* Replacements Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {replacements.map((item, index) => (
            <ScrollReveal key={item.before} delay={index * 75}>
              <Card className="sm:p-8 h-full">
                <CardContent>
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
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
