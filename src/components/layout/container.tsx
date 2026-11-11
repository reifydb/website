import type { ReactNode } from 'react';
import { cn } from '@/lib';

interface ContainerProps {
  width?: 'wide' | 'narrow';
  className?: string;
  children: ReactNode;
}

export function Container({ width = 'wide', className, children }: ContainerProps) {
  return (
    <div className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8', width === 'wide' ? 'max-w-7xl' : 'max-w-3xl', className)}>
      {children}
    </div>
  );
}
