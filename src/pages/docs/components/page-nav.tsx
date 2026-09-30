import { Link } from 'react-router-dom';
import { cn } from '@/lib';
import { ARROW_COLORS, LEFT_ARROW, PixelIcon, RIGHT_ARROW } from '@/components/ui';

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
        'group level-card flex-1 min-w-0 flex flex-col',
        direction === 'next' && 'items-end text-right',
      )}
    >
      <span className="inline-flex items-center gap-2 pixel-label uppercase text-[#4b52d6] mb-2">
        {direction === 'prev' && <PixelIcon rows={LEFT_ARROW} colors={ARROW_COLORS} className="h-3.5 w-2" />}
        {direction === 'prev' ? 'Previous' : 'Next'}
        {direction === 'next' && <PixelIcon rows={RIGHT_ARROW} colors={ARROW_COLORS} className="h-3.5 w-2" />}
      </span>
      <span className="font-bold text-text-primary group-hover:text-[#4b52d6] transition-colors truncate w-full">
        {entry.label}
      </span>
    </Link>
  );
}

export function PageNav({ prev, next }: PageNavProps) {
  if (!prev && !next) return null;

  return (
    <nav aria-label="Page navigation" className="mt-12 pt-6 border-t border-[#c9c3dc] flex gap-4">
      {prev ? <PageNavCard entry={prev} direction="prev" /> : <div className="flex-1" />}
      {next ? <PageNavCard entry={next} direction="next" /> : <div className="flex-1" />}
    </nav>
  );
}
