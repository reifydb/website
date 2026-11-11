import type { ReactNode } from 'react';
import { cn } from '@/lib';

interface SectionProps {
  tone?: 'plain' | 'tint';
  id?: string;
  className?: string;
  children: ReactNode;
}

export function Section({ tone = 'plain', id, className, children }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'py-16 sm:py-24 border-t border-[#e3e5f4]',
        tone === 'tint' ? 'bg-bg-tint' : 'bg-bg-primary',
        className
      )}
    >
      {children}
    </section>
  );
}
