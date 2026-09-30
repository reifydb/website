import { ScrollReveal } from '@/components/ui';
import { apologies } from '@/components/manifesto';
import { cn } from '@/lib';

function TradeArrow() {
  return (
    <div className="trade__arrow" aria-hidden="true">
      <span className="trade__dots" />
      <svg viewBox="0 0 4 7" className="h-3.5 w-2" shapeRendering="crispEdges" fill="currentColor">
        <rect x="0" y="0" width="1" height="7" />
        <rect x="1" y="1" width="1" height="5" />
        <rect x="2" y="2" width="1" height="3" />
        <rect x="3" y="3" width="1" height="1" />
      </svg>
    </div>
  );
}

function TradeRow({ item }: { item: (typeof apologies)[number] }) {
  const empty = item.after === 'nothing';

  return (
    <div className="trade grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:grid-cols-[200px_56px_300px_minmax(0,1fr)] items-center gap-x-4 lg:gap-x-6 gap-y-4">
      <div className="trade__old">{item.box}</div>
      <TradeArrow />
      <div className={cn('trade__new', empty && 'trade__new--empty')}>
        {!empty && <span aria-hidden="true">✦</span>}
        {item.after}
      </div>
      <div className="col-span-3 lg:col-span-1">
        <p className="font-bold text-text-primary mb-1">{item.role}</p>
        <p className="text-text-muted text-sm leading-relaxed">{item.text}</p>
      </div>
    </div>
  );
}

export function ApologiesSection() {
  return (
    <section id="replaces" className="section-elevated py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <ScrollReveal>
          <div className="text-center mb-12 sm:mb-16">
            <p className="eyebrow-pixel mb-3">REPLACES</p>
            <h2 className="text-[clamp(26px,3.4vw,40px)] font-normal leading-[1.08] tracking-[-0.03em] text-text-primary mb-4 text-balance">
              Every box is an apology.
            </h2>
            <p className="max-w-2xl mx-auto text-text-secondary text-lg">
              Each system exists because the database could not do one specific thing. Here is what each one
              stands in for, and what takes its place.
            </p>
          </div>
        </ScrollReveal>
        <div className="flex flex-col gap-10 lg:gap-8">
          {apologies.map((item, index) => (
            <ScrollReveal key={item.box} delay={index * 75}>
              <TradeRow item={item} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
