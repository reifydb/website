import { Link } from 'react-router-dom';
import { ARROW_COLORS, LEFT_ARROW, PixelIcon } from '@/components/ui';
import { cn } from '@/lib';

interface BackLinkProps {
  label: string;
  className?: string;
}

export function BackLink({ label, className }: BackLinkProps) {
  return (
    <Link
      to="/blog"
      className={cn('pixel-label inline-flex items-center gap-2 text-[#4b52d6] hover:text-primary-dark transition-colors', className)}
    >
      <PixelIcon rows={LEFT_ARROW} colors={ARROW_COLORS} className="h-3.5 w-2" />
      {label}
    </Link>
  );
}
