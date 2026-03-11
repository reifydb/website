import { ScrollReveal } from '@/components/ui';

export function BuildingWithSection() {
  return (
    <section id="building-with" className="relative z-10 py-16 sm:py-24 bg-bg-tertiary">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <ScrollReveal>
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-xs font-semibold tracking-[0.12em] uppercase text-primary mb-2">
              # building-with
            </p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
              Building With
            </h2>
            <p className="max-w-3xl mx-auto text-text-secondary text-lg">
              Backed by world-class partners and programs.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={75}>
          <div className="max-w-2xl mx-auto">
            <div className="border-2 border-dashed border-black/25 border-l-4 border-l-primary p-6 sm:p-7 dotted-card">
              <div className="flex items-start gap-4">
                <div className="text-4xl font-black text-orange-500 leading-none select-none">
                  A
                </div>
                <div>
                  <p className="text-xs font-bold tracking-[0.12em] uppercase text-primary mb-2">
                    APPWORKS COHORT #32
                  </p>
                  <p className="text-text-muted text-sm leading-relaxed">
                    Selected for AppWorks accelerator program, Asia's leading founder community and venture fund.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
