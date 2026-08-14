import { Link } from 'react-router-dom';
import { ScrollReveal } from '@/components/ui';
import { Badge } from '@reifydb/ui';

const useCases: { title: string; description: string; href?: string }[] = [
  {
    title: 'Trading & Financial State',
    description: 'Positions, balances, order state. One bad write here can cost real money. ReifyDB makes sure that does not happen.',
  },
  {
    title: 'Game & Simulation State',
    description: 'Player state, world state, simulation ticks. Everything stays consistent even when thousands of updates hit at once.',
  },
  {
    title: 'Workflow & Process State',
    description: 'Multi-step workflows, task queues, process coordination. No more duct-taping Redis, Postgres, and a cron job together.',
  },
  {
    title: 'Counters, Queues & Buffers',
    description: 'Counters, ring buffers, histograms, rate limiters. Built in, transactional, and ready to use. No external dependencies.',
  },
];

function UseCaseCell({ useCase, index }: { useCase: (typeof useCases)[number]; index: number }) {
  const content = (
    <div className="p-6 sm:p-8 group">
      <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
        {useCase.title}
      </h3>
      <p className="text-text-muted text-sm leading-relaxed">
        {useCase.description}
      </p>
      {useCase.href && (
        <p className="text-primary text-sm mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
          Try Demo &rarr;
        </p>
      )}
    </div>
  );

  return (
    <ScrollReveal delay={index * 75}>
      {useCase.href ? (
        <Link to={useCase.href} className="block">
          {content}
        </Link>
      ) : (
        content
      )}
    </ScrollReveal>
  );
}

export function UseCasesSection() {
  return (
    <section id="use-cases" className="bg-bg-secondary py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-12 sm:mb-16">
            <Badge variant="active" className="text-xs mb-3 uppercase tracking-[0.2em]">Use Cases</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Built for Live Application State
            </h2>
            <p className="max-w-2xl mx-auto text-text-secondary text-lg">
              If your application reads it, writes it, and reasons about it on every request, that is the state ReifyDB was built for.
            </p>
          </div>
        </ScrollReveal>

        {/* Use Cases Grid - 2x2 */}
        <div className="glass-card overflow-hidden divide-y divide-border-light">
          <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border-light">
            <UseCaseCell useCase={useCases[0]} index={0} />
            <UseCaseCell useCase={useCases[1]} index={1} />
          </div>
          <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border-light">
            <UseCaseCell useCase={useCases[2]} index={2} />
            <UseCaseCell useCase={useCases[3]} index={3} />
          </div>
        </div>
      </div>
    </section>
  );
}
