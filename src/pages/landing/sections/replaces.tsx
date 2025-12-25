import { ArrowRight } from 'lucide-react';

const replacements = [
  {
    before: 'PostgreSQL + Redis',
    after: 'Single Transactional Store',
    description: 'No more cache invalidation headaches or consistency gaps between your database and cache layer.',
    beforeColor: 'bg-red-50 border-red-200 text-red-700',
    afterColor: 'bg-green-50 border-green-200 text-green-700',
  },
  {
    before: 'Batch Materialized Views',
    after: 'Incremental Derived State',
    description: 'Views update as data changes, not on a schedule. No polling, no refresh jobs, no stale data.',
    beforeColor: 'bg-red-50 border-red-200 text-red-700',
    afterColor: 'bg-green-50 border-green-200 text-green-700',
  },
  {
    before: 'Scattered Service Logic',
    after: 'Programmable Transitions',
    description: 'State logic lives in the database, not scattered across microservices, workers, and cron jobs.',
    beforeColor: 'bg-red-50 border-red-200 text-red-700',
    afterColor: 'bg-green-50 border-green-200 text-green-700',
  },
  {
    before: 'Redis + Kafka + Custom Code',
    after: 'Native State Primitives',
    description: 'Counters, queues, ring buffers, histograms—all in one engine with unified transactional guarantees.',
    beforeColor: 'bg-red-50 border-red-200 text-red-700',
    afterColor: 'bg-green-50 border-green-200 text-green-700',
  },
];

export function ReplacesSection() {
  return (
    <section id="replaces" className="py-16 sm:py-24 bg-bg-tertiary">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            What ReifyDB Replaces
          </h2>
          <p className="max-w-2xl mx-auto text-text-secondary text-lg">
            Modern applications manage state across multiple systems. ReifyDB centralizes it all.
          </p>
        </div>

        {/* Replacements Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {replacements.map((item) => (
            <div
              key={item.before}
              className="bg-white border-2 border-border-default rounded-lg p-6 shadow-minimal"
            >
              {/* Before -> After */}
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${item.beforeColor}`}>
                  {item.before}
                </span>
                <ArrowRight className="h-4 w-4 text-text-muted" />
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${item.afterColor}`}>
                  {item.after}
                </span>
              </div>
              {/* Description */}
              <p className="text-text-muted text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
