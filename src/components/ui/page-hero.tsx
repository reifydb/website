import type { ReactNode } from 'react';
import { cn } from '@/lib';

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export function PageHero({ eyebrow, title, subtitle, children, className }: PageHeroProps) {
  return (
    <section className={cn('relative overflow-hidden section-dark', className)}>
      <div className="absolute inset-0 z-0 dot-grid-dark" />
      <div className="absolute inset-0 z-0 hero-glow" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 md:px-8 py-20 sm:py-28 text-center">
        {eyebrow && (
          <span className="inline-block rounded-pill border border-white/15 bg-white/5 px-3 py-1 text-xs label-uppercase text-white/70 mb-6">
            {eyebrow}
          </span>
        )}

        <h1 className="text-4xl sm:text-5xl font-black leading-[1.08] tracking-tight text-white text-balance">
          {title}
        </h1>

        {subtitle && (
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60 leading-relaxed text-balance">
            {subtitle}
          </p>
        )}

        {children && (
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
