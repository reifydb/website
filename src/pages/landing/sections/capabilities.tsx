import {
  Shield,
  RefreshCw,
  Workflow,
  Boxes,
  Zap,
  Server,
  Globe,
} from 'lucide-react';

const capabilities = [
  {
    title: 'Transactional Application State',
    description: 'ACID transactions over live, mutable state with predictable low latency.',
    icon: Shield,
    color: 'border-l-primary',
  },
  {
    title: 'Incremental Derived State',
    description: 'Materialized views that update automatically as state changes, without polling or batch refresh.',
    icon: RefreshCw,
    color: 'border-l-feature-blue',
  },
  {
    title: 'Programmable State Transitions',
    description: 'Application-defined logic that runs inside the database under the same transactional guarantees.',
    icon: Workflow,
    color: 'border-l-feature-purple',
  },
  {
    title: 'Multiple Native State Primitives',
    description: 'Tables, views, counters, ring buffers, histograms, and other state structures in one engine.',
    icon: Boxes,
    color: 'border-l-feature-green',
  },
  {
    title: 'Asynchronous Durability',
    description: 'State is persisted off the hot path with bounded durability latency and deterministic recovery.',
    icon: Zap,
    color: 'border-l-feature-teal',
  },
  {
    title: 'Embeddable or Server Mode',
    description: 'Run ReifyDB embedded in your application or as a standalone process, similar to SQLite or DuckDB.',
    icon: Server,
    color: 'border-l-feature-orange',
  },
  {
    title: 'Direct Client Access',
    description: 'Applications and services can connect directly using WebSocket or HTTP without intermediary APIs.',
    icon: Globe,
    color: 'border-l-feature-purple-light',
  },
];

export function CapabilitiesSection() {
  return (
    <section id="capabilities" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Core Capabilities
          </h2>
          <p className="max-w-2xl mx-auto text-text-secondary text-lg">
            Everything you need to manage application state under a single transactional engine.
          </p>
        </div>

        {/* Capabilities List */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          {capabilities.map((capability) => (
            <div
              key={capability.title}
              className={`bg-white border-2 border-border-default border-l-4 ${capability.color} rounded-lg p-6 shadow-minimal hover:shadow-minimal-md transition-all`}
            >
              <div className="flex items-start gap-4">
                <div className="text-text-primary">
                  <capability.icon className="h-6 w-6" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-base font-bold mb-1">{capability.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    {capability.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
