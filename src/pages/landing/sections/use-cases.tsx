import { ScrollReveal } from '@/components/ui';

const useCases = [
  {
    title: 'User & Session State',
    description: 'Sessions, preferences, auth tokens. You need them consistent and fast. You get both.',
  },
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
  {
    title: 'Leaderboards & Rankings',
    description: 'Rankings that stay correct even when thousands of scores update at the same time. No eventual consistency surprises.',
  },
];

export function UseCasesSection() {
  return (
    <section id="use-cases" className="py-16 sm:py-24 bg-bg-secondary">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-xs font-semibold tracking-[0.12em] uppercase text-primary mb-2">
              # use_cases
            </p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
              Built for Live Application State
            </h2>
            <p className="max-w-2xl mx-auto text-text-secondary text-lg">
              If your application reads it, writes it, and reasons about it on every request, that is the state ReifyDB was built for.
            </p>
          </div>
        </ScrollReveal>

        {/* Use Cases Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((useCase, index) => (
            <ScrollReveal key={useCase.title} delay={index * 75}>
              <div className="group border-2 border-dashed border-black/25 p-6 h-full dotted-card">
                <h3 className="text-lg font-bold mb-2">
                  <span className="text-primary mr-2">&gt;</span>
                  {useCase.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed pl-5">
                  {useCase.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
