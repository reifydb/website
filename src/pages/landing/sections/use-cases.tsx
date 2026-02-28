import { ScrollReveal } from '@/components/ui';

const useCases = [
  {
    title: 'User & Session State',
    description: 'Manage user sessions, preferences, and authentication state with transactional guarantees.',
  },
  {
    title: 'Trading & Financial State',
    description: 'Track positions, balances, and order state with low latency and strong consistency.',
  },
  {
    title: 'Game & Simulation State',
    description: 'Handle game world state, player data, and real-time simulation updates.',
  },
  {
    title: 'Workflow & Process State',
    description: 'Coordinate multi-step workflows, task queues, and process orchestration.',
  },
  {
    title: 'Counters, Queues & Buffers',
    description: 'Native primitives for counters, ring buffers, histograms, and rate limits.',
  },
  {
    title: 'Leaderboards & Rankings',
    description: 'Real-time leaderboards and ranking systems that stay consistent under concurrent updates.',
  },
];

export function UseCasesSection() {
  return (
    <section id="use-cases" className="py-16 sm:py-24">
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
              ReifyDB is designed to manage state that your application reads, updates, and reasons about on every request.
            </p>
          </div>
        </ScrollReveal>

        {/* Use Cases Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((useCase, index) => (
            <ScrollReveal key={useCase.title} delay={index * 75}>
              <div className="group border-2 border-dashed border-white/15 p-6 h-full dotted-card">
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
