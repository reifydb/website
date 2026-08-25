import { ScrollReveal } from '@/components/ui';
import { Badge } from '@reifydb/ui';
import { StackDiagram } from '@/components/manifesto';

export function BuiltThisSection() {
  return (
    <section id="built-this" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <ScrollReveal>
          <div className="text-center mb-12 sm:mb-16">
            <Badge variant="active" className="text-xs mb-3 uppercase tracking-[0.2em]">The Stack</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-6 text-balance">
              You have built this.
            </h2>
            <div className="max-w-2xl mx-auto">
              <p className="text-text-secondary text-lg leading-relaxed mb-4">
                A database. Then Redis, because it was not fast enough. Then a cron job, because a dashboard
                needed a total. Then a queue, because a rule had to run on write. All of it connecting as one
                account, with one password.
              </p>
              <p className="text-text-primary text-lg font-bold">
                You did not architect that. You accumulated it.
              </p>
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <div className="mx-auto max-w-5xl">
            <StackDiagram />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
