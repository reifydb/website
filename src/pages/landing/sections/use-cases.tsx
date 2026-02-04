import {
  User,
  TrendingUp,
  Gamepad2,
  GitBranch,
  Database,
  Layers,
} from 'lucide-react';
import { ScrollReveal } from '@/components/ui';

const useCases = [
  {
    title: 'User & Session State',
    description: 'Manage user sessions, preferences, and authentication state with transactional guarantees.',
    icon: User,
    color: 'text-primary',
    bgColor: 'from-primary/20 to-primary/5',
  },
  {
    title: 'Trading & Financial State',
    description: 'Track positions, balances, and order state with low latency and strong consistency.',
    icon: TrendingUp,
    color: 'text-feature-blue',
    bgColor: 'from-feature-blue/20 to-feature-blue/5',
  },
  {
    title: 'Game & Simulation State',
    description: 'Handle game world state, player data, and real-time simulation updates.',
    icon: Gamepad2,
    color: 'text-feature-purple',
    bgColor: 'from-feature-purple/20 to-feature-purple/5',
  },
  {
    title: 'Workflow & Process State',
    description: 'Coordinate multi-step workflows, task queues, and process orchestration.',
    icon: GitBranch,
    color: 'text-feature-green',
    bgColor: 'from-feature-green/20 to-feature-green/5',
  },
  {
    title: 'Counters, Queues & Buffers',
    description: 'Native primitives for counters, ring buffers, histograms, and rate limits.',
    icon: Database,
    color: 'text-feature-teal',
    bgColor: 'from-feature-teal/20 to-feature-teal/5',
  },
  {
    title: 'Leaderboards & Rankings',
    description: 'Real-time leaderboards and ranking systems that stay consistent under concurrent updates.',
    icon: Layers,
    color: 'text-feature-orange',
    bgColor: 'from-feature-orange/20 to-feature-orange/5',
  },
];

export function UseCasesSection() {
  return (
    <section id="use-cases" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-12 sm:mb-16">
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
              <div className="group bg-bg-tertiary border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:border-primary/40 hover:shadow-[0_0_40px_rgba(99,102,241,0.15)] h-full">
                <div className={`mb-4 w-12 h-12 rounded-xl bg-gradient-to-br ${useCase.bgColor} flex items-center justify-center`}>
                  <useCase.icon className={`h-6 w-6 ${useCase.color}`} strokeWidth={2} />
                </div>
                <h3 className="text-lg font-bold mb-2">{useCase.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">
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
