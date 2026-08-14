const SHADES = [
  'bg-border-subtle',
  'bg-primary',
  'bg-primary-light',
  'bg-primary-dark',
];

const capsuleClass =
  'absolute left-1/2 -translate-x-1/2 bg-bg-secondary px-2 font-mono text-[10px] label-uppercase text-text-muted';

interface PostSigilProps {
  cells: number[][];
  label: string;
  fingerprint: string;
}

export function PostSigil({ cells, label, fingerprint }: PostSigilProps) {
  return (
    <div
      aria-hidden="true"
      className="relative shrink-0 border border-border-light rounded-md bg-bg-secondary px-4 py-4 sm:px-6 sm:py-6"
    >
      <span className={`${capsuleClass} -top-[7px]`}>{label}</span>
      <div className="flex flex-col gap-[2px] sm:gap-[3px]">
        {cells.map((row, y) => (
          <div key={y} className="flex gap-[2px] sm:gap-[3px]">
            {row.map((shade, x) => (
              <span
                key={x}
                className={`size-[5px] sm:size-[9px] ${SHADES[shade]}`}
              />
            ))}
          </div>
        ))}
      </div>
      <span className={`${capsuleClass} -bottom-[7px]`}>{fingerprint}</span>
    </div>
  );
}
