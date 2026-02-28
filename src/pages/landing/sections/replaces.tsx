import { ScrollReveal } from '@/components/ui';

const replacements = [
  {
    before: 'PostgreSQL + Redis',
    after: 'Single Transactional Store',
    description: 'No more cache invalidation headaches or consistency gaps between your database and cache layer.',
  },
  {
    before: 'Batch Materialized Views',
    after: 'Incremental Derived State',
    description: 'Views update as data changes, not on a schedule. No polling, no refresh jobs, no stale data.',
  },
  {
    before: 'Scattered Service Logic',
    after: 'Programmable Transitions',
    description: 'State logic lives in the database, not scattered across microservices, workers, and cron jobs.',
  },
  {
    before: 'Redis + Kafka + Custom Code',
    after: 'Native State Primitives',
    description: 'Counters, queues, ring buffers, histograms, all in one engine with unified transactional guarantees.',
  },
];

export function ReplacesSection() {
  return (
    <section id="replaces" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-xs font-semibold tracking-[0.12em] uppercase text-primary mb-2">
              # replaces
            </p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
              What ReifyDB Replaces
            </h2>
            <p className="max-w-2xl mx-auto text-text-secondary text-lg">
              Modern applications manage state across multiple systems. ReifyDB centralizes it all.
            </p>
          </div>
        </ScrollReveal>

        {/* Replacements Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {replacements.map((item, index) => (
            <ScrollReveal key={item.before} delay={index * 75}>
              <div className="border-2 border-dashed border-white/15 p-6 h-full dotted-card">
                {/* Before --> After */}
                <div className="flex items-center gap-3 mb-4 flex-wrap text-sm">
                  <span className="text-status-error line-through">
                    {item.before}
                  </span>
                  <span className="text-text-muted">--&gt;</span>
                  <span className="text-primary font-bold">
                    {item.after}
                  </span>
                </div>
                {/* Description */}
                <p className="text-text-muted text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
