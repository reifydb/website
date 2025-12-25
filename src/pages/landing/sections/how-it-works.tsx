import { PenLine, Cog, Eye } from 'lucide-react';

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
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            How It Works
          </h2>
          <p className="max-w-2xl mx-auto text-text-secondary text-lg">
            A single transactional flow from write to derived state.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              {/* Connector line (hidden on mobile, shown between items on desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[calc(50%+3rem)] w-[calc(100%-6rem)] h-0.5 bg-border-default" />
              )}

              <div className="bg-white border-2 border-border-default rounded-lg p-6 shadow-minimal text-center relative z-10">
                {/* Step number */}
                <div className="inline-flex items-center justify-center w-10 h-10 mb-4 bg-primary text-white rounded-full font-black text-lg">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <step.icon className="h-8 w-8 text-text-primary" strokeWidth={2} />
                </div>

                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
