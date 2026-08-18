import { ScrollReveal } from '@/components/ui';
import { Badge } from '@reifydb/ui';
import { FeatureDiagram } from '@/components/manifesto';

export function FeatureTwiceSection() {
  return (
    <section id="what-it-is" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <ScrollReveal>
          <div className="text-center mb-12 sm:mb-16">
            <Badge variant="active" className="text-xs mb-3 uppercase tracking-[0.2em]">What ReifyDB Is</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-6 text-balance">
              Same feature. Two stacks.
            </h2>
            <p className="max-w-2xl mx-auto text-text-secondary text-lg leading-relaxed">
              ReifyDB is one database for that state. Tables hold the rows. Views hold the derived numbers, and
              the write keeps them current. Rules run inside the transaction, as procedures and handlers you
              version and test. Counters, queues, ring buffers, and histograms are built in. And it knows who is
              asking: clients authenticate as themselves, and policies decide, per user, what may be read and
              written.
            </p>
            <p className="max-w-2xl mx-auto text-text-primary text-lg font-bold mt-6">
              Alice places an order. First on today's stack, then on ReifyDB.
            </p>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <div className="mx-auto max-w-3xl">
            <FeatureDiagram />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
