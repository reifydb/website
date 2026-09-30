import { PixelScene, ScrollReveal } from '@/components/ui';

export function BuiltThisSection() {
  return (
    <section id="built-this" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <ScrollReveal>
          <div className="text-center mb-12 sm:mb-16">
            <p className="eyebrow-pixel mb-3">THE STACK</p>
            <h2 className="text-[clamp(26px,3.4vw,40px)] font-normal leading-[1.08] tracking-[-0.03em] text-text-primary mb-6 text-balance">
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
          <div className="mx-auto max-w-5xl overflow-hidden rounded-[14px] border border-border-light bg-white">
            <PixelScene kind="stack" className="bg-[linear-gradient(#f6f4fd,#fbf8f1)]" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
