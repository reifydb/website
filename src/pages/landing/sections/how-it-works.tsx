import { PenLine, Cog, Eye } from 'lucide-react';
import { ScrollReveal, Button } from '@/components/ui';

const steps = [
  {
    number: '1',
    title: 'Write state transactionally',
    description: 'ACID writes keep live state coherent and rollbackable, even under contention.',
    icon: PenLine,
  },
  {
    number: '2',
    title: 'Validate and apply logic',
    description: 'Programmable transitions run inside the same transaction to enforce invariants and emit changes.',
    icon: Cog,
  },
  {
    number: '3',
    title: 'Stay fresh automatically',
    description: 'Incremental materialized views update immediately, no cron jobs, no polling, no stale dashboards.',
    icon: Eye,
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-xs font-semibold tracking-[0.12em] uppercase text-text-secondary mb-2">
              End-to-end flow
            </p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
              How It Works
            </h2>
            <p className="max-w-2xl mx-auto text-text-secondary text-lg">
              Write, enforce logic, and keep derived state fresh inside one transactional pipeline.
            </p>
          </div>
        </ScrollReveal>

        {/* Steps */}
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <ScrollReveal key={step.title} delay={index * 100}>
              <div className="relative h-full">
                {/* Connector line (hidden on mobile, shown between items on desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[calc(50%+3rem)] w-[calc(100%-6rem)] h-0.5 bg-white/8" />
                )}

                <div className="group bg-bg-secondary/90 border border-white/10 rounded-2xl p-6 text-center relative z-10 transition-all duration-300 card-hover h-full shadow-[0_18px_50px_rgba(0,0,0,0.35)]">
                  {/* Step number */}
                  <div className="inline-flex items-center justify-center w-10 h-10 mb-4 bg-gradient-to-r from-primary to-accent-warm text-bg-primary rounded-full font-black text-lg">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="flex justify-center mb-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent-warm/20 flex items-center justify-center">
                      <step.icon className="h-7 w-7 text-primary" strokeWidth={2} aria-hidden />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={200}>
          <div className="mt-10 text-center">
            <p className="text-sm text-text-muted mb-4">
              One ACID envelope means writes, logic, and derived state cannot drift apart.
            </p>
            <div className="inline-flex gap-3 items-center justify-center">
              <Button variant="ghost" size="md" href="#code-example">
                See the RQL example
              </Button>
              <Button size="md" href="https://cal.com/reifydb/30min">
                Book a call
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
