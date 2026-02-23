import {
  Shield,
  RefreshCw,
  Workflow,
  Boxes,
} from 'lucide-react';
import { ScrollReveal } from '@/components/ui';

const capabilities = [
  {
    title: 'Transactional Application State',
    description: 'ACID transactions over live, mutable state with predictable low latency. State is first-class — not an afterthought bolted onto a query engine.',
    icon: Shield,
    color: 'text-primary',
    bgColor: 'from-primary/20 to-primary/5',
  },
  {
    title: 'Incremental Derived State',
    description: 'Materialized views that update automatically as state changes. No polling, no batch refresh, no stale reads. Views are always fresh.',
    icon: RefreshCw,
    color: 'text-feature-blue',
    bgColor: 'from-feature-blue/20 to-feature-blue/5',
  },
  {
    title: 'Programmable State Transitions',
    description: 'Application-defined logic runs inside the database under the same transactional guarantees. Logic lives next to data, reducing network hops and eliminating consistency gaps.',
    icon: Workflow,
    color: 'text-feature-green',
    bgColor: 'from-feature-green/20 to-feature-green/5',
  },
  {
    title: 'Multiple Native State Primitives',
    description: 'Tables, views, counters, ring buffers, histograms — all in one engine with unified transactional guarantees. Embeddable or server mode.',
    icon: Boxes,
    color: 'text-feature-purple',
    bgColor: 'from-feature-purple/20 to-feature-purple/5',
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
              Why ReifyDB
            </h2>
            <p className="max-w-2xl mx-auto text-text-secondary text-lg">
              A single engine for live application state — transactional, incremental, and programmable.
            </p>
          </div>
        </ScrollReveal>

        {/* Alternating left-right layout */}
        <div className="space-y-12 sm:space-y-16">
          {capabilities.map((capability, index) => (
            <ScrollReveal key={capability.title} delay={index * 75}>
              <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}>
                {/* Text side */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${capability.bgColor} flex items-center justify-center shrink-0`}>
                      <capability.icon className={`h-5 w-5 ${capability.color}`} strokeWidth={2} />
                    </div>
                    <h3 className="text-xl font-bold">{capability.title}</h3>
                  </div>
                  <p className="text-text-muted text-base leading-relaxed">
                    {capability.description}
                  </p>
                </div>

                {/* Visual side */}
                <div className="flex-1 w-full">
                  <div className="bg-bg-secondary border border-white/10 rounded-2xl p-6 h-32 flex items-center justify-center">
                    <capability.icon className={`h-16 w-16 ${capability.color} opacity-20`} strokeWidth={1} />
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
