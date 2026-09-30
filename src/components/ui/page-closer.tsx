import type { ReactNode } from 'react';
import { cn } from '@/lib';
import { ARROW_COLORS, LEFT_ARROW, RIGHT_ARROW } from './pixel-arrow';
import { PixelIcon } from './pixel-icon';
import { ScrollReveal } from './scroll-reveal';

interface PageCloserProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  scene?: ReactNode;
  children: ReactNode;
}

export function PageCloser({ eyebrow, title, subtitle, scene, children }: PageCloserProps) {
  return (
    <section className={cn('night pt-24 sm:pt-32', !scene && 'pb-24 sm:pb-32')}>
      <div className="relative z-10 mx-auto max-w-4xl px-6 md:px-8 text-center">
        <ScrollReveal>
          {eyebrow && (
            <p className="eyebrow-pixel press-start uppercase inline-flex items-center gap-3 mb-8">
              <PixelIcon rows={RIGHT_ARROW} colors={ARROW_COLORS} className="h-3.5 w-2" />
              {eyebrow}
              <PixelIcon rows={LEFT_ARROW} colors={ARROW_COLORS} className="h-3.5 w-2" />
            </p>
          )}
          <h2 className="text-[clamp(28px,4vw,48px)] font-normal leading-[1.08] tracking-[-0.03em] text-[#f4f3fb] mb-6 text-balance">
            {title}
          </h2>
          {subtitle && <p className="max-w-2xl mx-auto text-[#b9bcf5] text-lg mb-12">{subtitle}</p>}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {children}
          </div>
        </ScrollReveal>
      </div>
      {scene && <div className="relative z-10 mt-16 sm:mt-20 -mb-px">{scene}</div>}
    </section>
  );
}
