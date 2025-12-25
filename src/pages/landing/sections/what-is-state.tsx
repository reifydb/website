import {
  User,
  ShoppingCart,
  Wallet,
  Gamepad2,
  GitBranch,
  Gauge,
  BarChart3,
  Archive,
  ScrollText,
} from 'lucide-react';

const examples = [
  {
    title: 'User Sessions',
    description: 'Authentication tokens, preferences, and login state.',
    icon: User,
  },
  {
    title: 'Shopping Carts',
    description: 'Items, quantities, and pricing that update in real-time.',
    icon: ShoppingCart,
  },
  {
    title: 'Balances & Counters',
    description: 'Account balances, rate limits, and usage quotas.',
    icon: Wallet,
  },
  {
    title: 'Game State',
    description: 'Player positions, scores, and inventory.',
    icon: Gamepad2,
  },
  {
    title: 'Workflow Status',
    description: 'Approval steps, task assignments, and process state.',
    icon: GitBranch,
  },
  {
    title: 'Real-time Metrics',
    description: 'Active users, queue depths, and system health.',
    icon: Gauge,
  },
];

const notExamples = [
  {
    title: 'Analytics & OLAP',
    description: 'Historical, read-heavy data for reports and dashboards.',
    icon: BarChart3,
  },
  {
    title: 'Cold Storage',
    description: 'Archived data rarely accessed after initial write.',
    icon: Archive,
  },
  {
    title: 'Event Logs',
    description: 'Append-only, immutable audit trails and event streams.',
    icon: ScrollText,
  },
];

export function WhatIsStateSection() {
  return (
    <section id="what-is-state" className="py-16 sm:py-24 bg-bg-tertiary">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            What is Live Application State?
          </h2>
          <p className="max-w-3xl mx-auto text-text-secondary text-lg leading-relaxed">
            Live application state is the data your application reads, updates, and reasons about on every request.
            It's mutable, frequently accessed, and critical to your application's behavior.
          </p>
        </div>

        {/* Examples Grid - What it IS */}
        <div className="mb-12">
          <h3 className="text-lg font-bold text-center mb-6 text-text-primary">
            Examples of Live Application State
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {examples.map((example) => (
              <div
                key={example.title}
                className="bg-white border-2 border-border-default rounded-lg p-5 shadow-minimal"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-50 border border-green-200 rounded-lg flex items-center justify-center">
                    <example.icon className="h-5 w-5 text-green-600" strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-primary mb-1">{example.title}</h4>
                    <p className="text-sm text-text-muted">{example.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contrast Grid - What it's NOT */}
        <div>
          <h3 className="text-lg font-bold text-center mb-6 text-text-primary">
            What Live Application State is <span className="text-red-500">NOT</span>
          </h3>
          <div className="grid gap-4 sm:grid-cols-3 max-w-4xl mx-auto">
            {notExamples.map((example) => (
              <div
                key={example.title}
                className="bg-white border-2 border-border-default rounded-lg p-5 shadow-minimal"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-50 border border-red-200 rounded-lg flex items-center justify-center">
                    <example.icon className="h-5 w-5 text-red-400" strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-primary mb-1">{example.title}</h4>
                    <p className="text-sm text-text-muted">{example.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
