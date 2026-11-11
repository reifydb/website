import { PixelScene, ScrollReveal } from '@/components/ui';
import { EditorialSection } from './editorial-section';

export function BuiltThisSection() {
  return (
    <EditorialSection
      tone="tint"
      id="built-this"
      eyebrow="THE STACK"
      title="You have built this."
      after={
        <ScrollReveal delay={100}>
          <PixelScene kind="stack" />
        </ScrollReveal>
      }
    >
      <ScrollReveal>
        <p className="text-text-secondary text-lg leading-relaxed mb-4 max-w-2xl">
          A database. Then Redis, because it was not fast enough. Then a cron job, because a dashboard
          needed a total. Then a queue, because a rule had to run on write. All of it connecting as one
          account, with one password.
        </p>
        <p className="text-text-primary text-lg font-bold">
          You did not architect that. You accumulated it.
        </p>
      </ScrollReveal>
    </EditorialSection>
  );
}
