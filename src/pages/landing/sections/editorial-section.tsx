import type { ReactNode } from 'react';
import { Container, Section } from '@reifydb/ui';

interface EditorialSectionProps {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  after?: ReactNode;
  tone?: 'plain' | 'tint';
}

export function EditorialSection({ id, eyebrow, title, intro, children, after, tone }: EditorialSectionProps) {
  return (
    <Section id={id} tone={tone}>
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)] lg:gap-16">
        <div className="lg:sticky lg:top-[calc(var(--nav-h)+32px)] lg:self-start">
          {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
          <h2 className="text-[clamp(26px,3vw,36px)] font-normal leading-[1.08] tracking-[-0.02em] text-text-primary mb-4 text-balance">
            {title}
          </h2>
          {intro && <div className="text-text-secondary text-[15.5px] leading-relaxed text-pretty">{intro}</div>}
        </div>
        <div className="min-w-0">{children}</div>
      </Container>
      {after}
    </Section>
  );
}
