import { Link } from 'react-router-dom';
import { cn } from '@/lib';

interface PageNavEntry {
  label: string;
  href: string;
}

interface PageNavProps {
  prev: PageNavEntry | null;
  next: PageNavEntry | null;
}

function PageNavCard({ entry, direction }: { entry: PageNavEntry; direction: 'prev' | 'next' }) {
  return (
    <Link
      to={entry.href}
      className={cn(
        'group glass-card px-5 py-4 flex-1 min-w-0 flex flex-col',
        direction === 'next' && 'items-end text-right',
      )}
    >
      <span className="label-uppercase text-xs text-text-muted mb-1">
        {direction === 'prev' ? '← Previous' : 'Next →'}
      </span>
      <span className="font-bold text-text-primary group-hover:text-primary transition-colors truncate w-full">
        {entry.label}
      </span>
    </Link>
  );
}

export function PageNav({ prev, next }: PageNavProps) {
  if (!prev && !next) return null;

  return (
    <nav aria-label="Page navigation" className="mt-12 pt-6 border-t border-border-default flex gap-4">
      {prev ? <PageNavCard entry={prev} direction="prev" /> : <div className="flex-1" />}
      {next ? <PageNavCard entry={next} direction="next" /> : <div className="flex-1" />}
    </nav>
  );
}
