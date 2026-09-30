interface PixelIconProps {
  rows: string[];
  colors: Record<string, string>;
  className?: string;
}

export function PixelIcon({ rows, colors, className }: PixelIconProps) {
  return (
    <svg
      viewBox={`0 0 ${rows[0].length} ${rows.length}`}
      className={className}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {rows.flatMap((row, y) =>
        [...row].map((cell, x) =>
          cell === '.' ? null : <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={colors[cell]} />,
        ),
      )}
    </svg>
  );
}
