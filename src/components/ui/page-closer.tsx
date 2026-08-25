import type { ReactNode } from 'react';

interface PageCloserProps {
  title: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
}

export function PageCloser({ title, subtitle, children }: PageCloserProps) {
  return (
    <section className="relative overflow-hidden section-dark">
      <div className="absolute inset-0 z-0 dot-grid-dark" />
      <div className="absolute inset-0 z-0 hero-glow opacity-70" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 md:px-8 py-20 sm:py-24 text-center">
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white text-balance">
          {title}
        </h2>
        {subtitle && (
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/60 leading-relaxed text-balance">
            {subtitle}
          </p>
        )}
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
          {children}
        </div>
      </div>
    </section>
  );
}
