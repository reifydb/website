import {
  User,
  TrendingUp,
  Gamepad2,
  GitBranch,
  Database,
  Layers,
} from 'lucide-react';

const useCases = [
  {
    title: 'User & Session State',
    description: 'Manage user sessions, preferences, and authentication state with transactional guarantees.',
    icon: User,
    color: 'text-primary',
  },
  {
    title: 'Trading & Financial State',
    description: 'Track positions, balances, and order state with low latency and strong consistency.',
    icon: TrendingUp,
    color: 'text-feature-blue',
  },
  {
    title: 'Game & Simulation State',
    description: 'Handle game world state, player data, and real-time simulation updates.',
    icon: Gamepad2,
    color: 'text-feature-purple',
  },
  {
    title: 'Workflow & Process State',
    description: 'Coordinate multi-step workflows, task queues, and process orchestration.',
    icon: GitBranch,
    color: 'text-feature-green',
  },
  {
    title: 'Counters, Queues & Buffers',
    description: 'Native primitives for counters, ring buffers, histograms, and rate limits.',
    icon: Database,
    color: 'text-feature-teal',
  },
  {
    title: 'Leaderboards & Rankings',
    description: 'Real-time leaderboards and ranking systems that stay consistent under concurrent updates.',
    icon: Layers,
    color: 'text-feature-orange',
  },
];

export function UseCasesSection() {
  return (
    <section id="use-cases" className="py-16 sm:py-24 bg-bg-tertiary">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Built for Live Application State
          </h2>
          <p className="max-w-2xl mx-auto text-text-secondary text-lg">
            ReifyDB is designed to manage state that your application reads, updates, and reasons about on every request.
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((useCase) => (
            <div
              key={useCase.title}
              className="bg-white border-2 border-border-default rounded-lg p-6 shadow-minimal hover:shadow-minimal-md transition-all"
            >
              <div className={`mb-4 ${useCase.color}`}>
                <useCase.icon className="h-8 w-8" strokeWidth={2} />
              </div>
              <h3 className="text-lg font-bold mb-2">{useCase.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">
                {useCase.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
