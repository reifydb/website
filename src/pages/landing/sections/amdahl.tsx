import { ScrollReveal } from '@/components/ui';
import { AmdahlSimulator } from '@/components/amdahl';

export function AmdahlSection() {
  return (
    <section className="py-16 sm:py-24 bg-bg-elevated">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <ScrollReveal>
          <AmdahlSimulator />
        </ScrollReveal>
      </div>
    </section>
  );
}
