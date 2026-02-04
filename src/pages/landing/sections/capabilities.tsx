import {
  Shield,
  RefreshCw,
  Workflow,
  Boxes,
  Zap,
  Server,
  Globe,
} from 'lucide-react';
import { ScrollReveal } from '@/components/ui';

const capabilities = [
  {
    title: 'Transactional Application State',
    description: 'ACID transactions over live, mutable state with predictable low latency.',
    icon: Shield,
    color: 'text-primary',
    bgColor: 'from-primary/20 to-primary/5',
  },
  {
    title: 'Incremental Derived State',
    description: 'Materialized views that update automatically as state changes, without polling or batch refresh.',
    icon: RefreshCw,
    color: 'text-feature-blue',
    bgColor: 'from-feature-blue/20 to-feature-blue/5',
  },
  {
    title: 'Programmable State Transitions',
    description: 'Application-defined logic that runs inside the database under the same transactional guarantees.',
    icon: Workflow,
    color: 'text-feature-purple',
    bgColor: 'from-feature-purple/20 to-feature-purple/5',
  },
  {
    title: 'Multiple Native State Primitives',
    description: 'Tables, views, counters, ring buffers, histograms, and other state structures in one engine.',
    icon: Boxes,
    color: 'text-feature-green',
    bgColor: 'from-feature-green/20 to-feature-green/5',
  },
  {
    title: 'Asynchronous Durability',
    description: 'State is persisted off the hot path with bounded durability latency and deterministic recovery.',
    icon: Zap,
    color: 'text-feature-teal',
    bgColor: 'from-feature-teal/20 to-feature-teal/5',
  },
  {
    title: 'Embeddable or Server Mode',
    description: 'Run ReifyDB embedded in your application or as a standalone process, similar to SQLite or DuckDB.',
    icon: Server,
    color: 'text-feature-orange',
    bgColor: 'from-feature-orange/20 to-feature-orange/5',
  },
  {
    title: 'Direct Client Access',
    description: 'Applications and services can connect directly using WebSocket or HTTP without intermediary APIs.',
    icon: Globe,
    color: 'text-feature-purple-light',
    bgColor: 'from-feature-purple-light/20 to-feature-purple-light/5',
  },
];

export function CapabilitiesSection() {
  return (
    <section id="capabilities" className="relative z-10 py-16 sm:py-24 bg-bg-tertiary">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
              Core Capabilities
            </h2>
            <p className="max-w-2xl mx-auto text-text-secondary text-lg">
              Everything you need to manage application state under a single transactional engine.
            </p>
          </div>
        </ScrollReveal>

        {/* Capabilities List */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          {capabilities.map((capability, index) => (
            <ScrollReveal key={capability.title} delay={index * 75}>
              <div className="group bg-bg-tertiary border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:border-primary/40 hover:shadow-[0_0_40px_rgba(99,102,241,0.15)] h-full">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${capability.bgColor} flex items-center justify-center shrink-0`}>
                    <capability.icon className={`h-6 w-6 ${capability.color}`} strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold mb-1">{capability.title}</h3>
                    <p className="text-text-muted text-sm leading-relaxed">
                      {capability.description}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
