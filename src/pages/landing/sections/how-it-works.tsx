import { PenLine, Cog, Eye } from 'lucide-react';
import { ScrollReveal } from '@/components/ui';

const steps = [
  {
    number: '1',
    title: 'Write State',
    description: 'Insert, update, or delete data through transactions. All mutations are ACID-compliant.',
    icon: PenLine,
  },
  {
    number: '2',
    title: 'Execute Logic',
    description: 'Programmable transitions run inside the transaction, colocated with your data.',
    icon: Cog,
  },
  {
    number: '3',
    title: 'Derived State Updates',
    description: 'Materialized views update incrementally. No refresh jobs, no stale reads.',
    icon: Eye,
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-bg-tertiary">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
              How It Works
            </h2>
            <p className="max-w-2xl mx-auto text-text-secondary text-lg">
              A single transactional flow from write to derived state.
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
                  <div className="hidden md:block absolute top-12 left-[calc(50%+3rem)] w-[calc(100%-6rem)] h-0.5 bg-white/10" />
                )}

                <div className="group bg-bg-secondary border border-white/10 rounded-2xl p-6 text-center relative z-10 transition-all duration-300 hover:scale-[1.02] hover:border-primary/40 hover:shadow-[0_0_40px_rgba(99,102,241,0.15)] h-full">
                  {/* Step number */}
                  <div className="inline-flex items-center justify-center w-10 h-10 mb-4 bg-gradient-to-r from-primary to-accent-warm text-white rounded-full font-black text-lg">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="flex justify-center mb-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent-warm/20 flex items-center justify-center">
                      <step.icon className="h-7 w-7 text-primary" strokeWidth={2} />
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
      </div>
    </section>
  );
}
