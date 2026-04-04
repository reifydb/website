import { Link } from 'react-router-dom';
import { ScrollReveal } from '@/components/ui';
import { Card, CardContent, Badge } from '@reifydb/ui';

const useCases: { title: string; description: string; href?: string }[] = [
  {
    title: 'Trading & Financial State',
    description: 'Positions, balances, order state. One bad write here can cost real money. ReifyDB makes sure that does not happen.',
  },
  {
    title: 'Game & Simulation State',
    description: 'Player state, world state, simulation ticks. Everything stays consistent even when thousands of updates hit at once.',
    href: '/use-cases/iot-farming',
  },
  {
    title: 'Workflow & Process State',
    description: 'Multi-step workflows, task queues, process coordination. No more duct-taping Redis, Postgres, and a cron job together.',
  },
  {
    title: 'Counters, Queues & Buffers',
    description: 'Counters, ring buffers, histograms, rate limiters. Built in, transactional, and ready to use. No external dependencies.',
  },
];

export function UseCasesSection() {
  return (
    <section id="use-cases" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-12 sm:mb-16">
            <Badge variant="active" className="text-xs mb-3 uppercase tracking-[0.12em]">Use Cases</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">
              Built for Live Application State
            </h2>
            <p className="max-w-2xl mx-auto text-text-secondary text-lg">
              If your application reads it, writes it, and reasons about it on every request, that is the state ReifyDB was built for.
            </p>
          </div>
        </ScrollReveal>

        {/* Use Cases Grid - 2x2 */}
        <div className="grid gap-6 sm:grid-cols-2">
          {useCases.map((useCase, index) => (
            <ScrollReveal key={useCase.title} delay={index * 75}>
              {useCase.href ? (
                <Link to={useCase.href} className="block h-full">
                  <Card className="sm:p-8 h-full group hover:border-primary/20">
                    <CardContent>
                      <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                        {useCase.title}
                      </h3>
                      <p className="text-text-muted text-sm leading-relaxed">
                        {useCase.description}
                      </p>
                      <p className="text-primary text-sm mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        Try Demo &rarr;
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ) : (
                <Card className="sm:p-8 h-full">
                  <CardContent>
                    <h3 className="text-lg font-bold mb-2">
                      {useCase.title}
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed">
                      {useCase.description}
                    </p>
                  </CardContent>
                </Card>
              )}
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
