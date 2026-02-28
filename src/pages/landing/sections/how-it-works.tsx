import { ScrollReveal, Button } from '@/components/ui';

const steps = [
  {
    number: '01',
    title: 'Write state transactionally',
    description: 'ACID writes keep live state coherent and rollbackable, even under contention.',
  },
  {
    number: '02',
    title: 'Validate and apply logic',
    description: 'Programmable transitions run inside the same transaction to enforce invariants and emit changes.',
  },
  {
    number: '03',
    title: 'Stay fresh automatically',
    description: 'Incremental materialized views update immediately, no cron jobs, no polling, no stale dashboards.',
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-xs font-semibold tracking-[0.12em] uppercase text-primary mb-2">
              # pipeline
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
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[calc(50%+3rem)] w-[calc(100%-6rem)] border-t-2 border-dashed border-white/15" />
                )}

                <div className="group border-2 border-dashed border-white/15 p-6 text-center relative z-10 h-full dotted-card">
                  {/* Step number */}
                  <div className="inline-block mb-4 text-primary font-black text-2xl">
                    {step.number}
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
              <a
                href="#code-example"
                className="text-sm text-text-secondary underline underline-offset-4 decoration-text-muted hover:text-text-primary hover:decoration-primary transition-colors"
              >
                see the rql example --&gt;
              </a>
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
