import type { ReactNode } from 'react';
import { cn } from '@/lib';

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  scene?: ReactNode;
  children?: ReactNode;
}

export function PageHero({ eyebrow, title, subtitle, scene, children }: PageHeroProps) {
  return (
    <section className="sky">
      <div
        className={cn(
          'mx-auto max-w-6xl px-6 md:px-8 pt-[clamp(36px,6vw,72px)] text-center',
          !scene && 'pb-[clamp(36px,6vw,72px)]'
        )}
      >
        {eyebrow && <p className="eyebrow-pixel uppercase mb-3">{eyebrow}</p>}

        <h1 className="text-[clamp(26px,3.4vw,40px)] font-normal leading-[1.08] tracking-[-0.03em] text-text-primary mb-4 text-balance">
          {title}
        </h1>

        {subtitle && <p className="max-w-2xl mx-auto text-text-secondary text-lg">{subtitle}</p>}

        {children && (
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            {children}
          </div>
        )}
      </div>

      {scene && <div className="mt-10 sm:mt-12">{scene}</div>}
    </section>
  );
}
