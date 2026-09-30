import { cn } from '@/lib';

const SHADES = [
  'bg-border-subtle',
  'bg-primary',
  'bg-primary-light',
  'bg-primary-dark',
];

interface PostSigilProps {
  cells: number[][];
  className?: string;
}

export function PostSigil({ cells, className }: PostSigilProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('grid gap-[2px]', className)}
      style={{ gridTemplateColumns: `repeat(${cells[0].length}, minmax(0, 1fr))` }}
    >
      {cells.flatMap((row, y) =>
        row.map((shade, x) => <span key={`${x}-${y}`} className={cn('aspect-square', SHADES[shade])} />),
      )}
    </div>
  );
}
