import { ArrowRight } from 'lucide-react';
import { ScrollReveal } from '@/components/ui';
import { Badge } from '@reifydb/ui';
import { apologies } from '@/components/manifesto';

const spans = ['md:col-span-4', 'md:col-span-2', 'md:col-span-2', 'md:col-span-2', 'md:col-span-2'];

function ApologyTile({ item, index }: { item: (typeof apologies)[number]; index: number }) {
  return (
    <ScrollReveal className={spans[index] ?? 'md:col-span-2'} delay={index * 75}>
      <div className="bento-tile lift-card h-full p-6 sm:p-8 flex flex-col">
        <div className="flex items-baseline gap-3 mb-3 flex-wrap">
          <span className="font-mono text-xs label-uppercase text-primary whitespace-nowrap">[ {item.box} ]</span>
          <span className="text-text-primary font-bold">{item.role}</span>
        </div>
        <p className="text-text-muted text-sm leading-relaxed mb-6">{item.text}</p>
        <div className="mt-auto flex items-center gap-3 flex-wrap text-sm">
          <Badge variant="outline" className="line-through">{item.box}</Badge>
          <ArrowRight size={14} className="text-text-muted shrink-0" />
          <Badge variant="active">{item.after}</Badge>
        </div>
      </div>
    </ScrollReveal>
  );
}

export function ApologiesSection() {
  return (
    <section id="replaces" className="section-elevated py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <ScrollReveal>
          <div className="text-center mb-12 sm:mb-16">
            <Badge variant="active" className="text-xs mb-3 uppercase tracking-[0.2em]">Replaces</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 text-balance">
              Every box is an apology.
            </h2>
            <p className="max-w-2xl mx-auto text-text-secondary text-lg">
              Each system exists because the database could not do one specific thing. Here is what each one
              stands in for, and what takes its place.
            </p>
          </div>
        </ScrollReveal>
        <div className="grid gap-5 md:grid-cols-6">
          {apologies.map((item, index) => (
            <ApologyTile key={item.box} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
