import type { ReactNode } from 'react';
import { ARROW_COLORS, LEFT_ARROW, RIGHT_ARROW } from './pixel-arrow';
import { PixelIcon } from './pixel-icon';
import { ScrollReveal } from './scroll-reveal';
import { Container, Section } from '@reifydb/ui';

interface PageCloserProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
}

export function PageCloser({ eyebrow, title, subtitle, children }: PageCloserProps) {
  return (
    <Section tone="plain">
      <Container className="text-center">
        <ScrollReveal>
          {eyebrow && (
            <p className="eyebrow uppercase inline-flex items-center gap-3 mb-8">
              <PixelIcon rows={RIGHT_ARROW} colors={ARROW_COLORS} className="h-3.5 w-2" />
              {eyebrow}
              <PixelIcon rows={LEFT_ARROW} colors={ARROW_COLORS} className="h-3.5 w-2" />
            </p>
          )}
          <h2 className="text-[clamp(28px,4vw,48px)] font-normal leading-[1.08] tracking-[-0.03em] text-text-primary mb-6 text-balance">
            {title}
          </h2>
          {subtitle && <p className="max-w-2xl mx-auto text-text-secondary text-lg mb-12">{subtitle}</p>}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {children}
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
