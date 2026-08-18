import { ScrollReveal } from '@/components/ui';
import { Badge } from '@reifydb/ui';
import { apologies } from '@/components/manifesto';

const lastRowStart = Math.floor((apologies.length - 1) / 2) * 2;

function ApologyCell({ item, index }: { item: (typeof apologies)[number]; index: number }) {
  const spansRow = index === apologies.length - 1 && apologies.length % 2 === 1;
  return (
    <ScrollReveal delay={index * 75}>
      <div
        className={`p-6 sm:p-8 h-full ${spansRow ? 'md:col-span-2' : index % 2 === 0 ? 'md:border-r' : ''} ${index < lastRowStart ? 'md:border-b' : ''} border-border-light`}
      >
        <div className="flex items-baseline gap-3 mb-3 flex-wrap">
          <span className="font-mono text-xs label-uppercase text-primary whitespace-nowrap">[ {item.box} ]</span>
          <span className="text-text-primary font-bold">{item.role}</span>
        </div>
        <p className="text-text-muted text-sm leading-relaxed mb-4">{item.text}</p>
        <div className="flex items-center gap-3 flex-wrap text-sm">
          <Badge variant="outline" className="line-through">{item.box}</Badge>
          <span className="text-text-muted">&rarr;</span>
          <Badge variant="active">{item.after}</Badge>
        </div>
      </div>
    </ScrollReveal>
  );
}

export function ApologiesSection() {
  return (
    <section id="replaces" className="bg-bg-secondary py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <ScrollReveal>
          <div className="text-center mb-12 sm:mb-16">
            <Badge variant="active" className="text-xs mb-3 uppercase tracking-[0.2em]">Replaces</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 text-balance">
              Every box is an apology.
            </h2>
            <p className="max-w-2xl mx-auto text-text-secondary text-lg">
              Each system in that stack exists because the database could not do one specific thing. Here is
              what each one is standing in for, and what takes its place.
            </p>
          </div>
        </ScrollReveal>
        <div className="glass-card overflow-hidden grid md:grid-cols-2 divide-y md:divide-y-0 divide-border-light">
          {apologies.map((item, index) => (
            <ApologyCell key={item.box} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
