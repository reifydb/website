import { ScrollReveal } from '@/components/ui';

export function FoundationSection() {
  return (
    <section className="relative z-10 py-16 sm:py-24 bg-bg-tertiary">
      <div className="mx-auto max-w-4xl px-6 md:px-8">
        <ScrollReveal>
          <div className="text-center">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
              A Different Foundation
            </p>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary leading-tight mb-6">
              Most databases optimize for persistence.
              <br />
              <span className="text-text-secondary">
                ReifyDB optimizes for reasoning.
              </span>
            </h2>

            <p className="max-w-2xl mx-auto text-text-secondary text-lg leading-relaxed">
              Persistence is table stakes. The harder problem is building systems
              where state is predictable, evolvable, and trustworthy as complexity grows.
              ReifyDB starts from that premise.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
