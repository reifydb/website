const systems = ['POSTGRES', 'REDIS', 'CRON', 'QUEUE', 'WORKERS'];

const capabilities = [
  ['tables', 'the rows, in memory'],
  ['views', 'derived, current on write'],
  ['transitions', 'rules, inside the transaction'],
  ['primitives', 'counters, queues, buffers'],
];

const boxFill = 'var(--color-bg-tertiary)';
const boxStroke = 'var(--color-border-subtle)';
const glue = 'var(--color-border-subtle)';
const accent = 'var(--color-primary)';
const label = 'var(--color-text-muted)';
const body = 'var(--color-text-secondary)';
const strong = 'var(--color-text-primary)';
const mono = 'var(--font-mono)';
const sans = 'var(--font-body)';

function SystemBox({ x, y, w, h, name }: { x: number; y: number; w: number; h: number; name: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={boxFill} stroke={boxStroke} />
      <text
        x={x + w / 2}
        y={y + h / 2}
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily={mono}
        fontSize={14}
        fontWeight={700}
        letterSpacing={1.2}
        fill={body}
      >
        {name}
      </text>
    </g>
  );
}

function ReifyBlock({
  x,
  y,
  w,
  h,
  rowGap,
  firstRow,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  rowGap: number;
  firstRow: number;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="var(--color-bg-secondary)" stroke="#4b52d6" strokeWidth={2} />
      <rect x={x} y={y} width={w} height={h} fill={accent} fillOpacity={0.05} />
      <text x={x + 24} y={y + 34} fontFamily={mono} fontSize={15} fontWeight={700} letterSpacing={1.6} fill={accent}>
        REIFYDB
      </text>
      <line x1={x + 24} y1={y + 52} x2={x + w - 24} y2={y + 52} stroke={accent} strokeOpacity={0.3} />
      {capabilities.map(([name, note], i) => (
        <g key={name}>
          <text x={x + 24} y={y + firstRow + i * rowGap} fontFamily={mono} fontSize={15} fontWeight={700} fill={strong}>
            {name}
          </text>
          <text x={x + 24} y={y + firstRow + i * rowGap + 21} fontFamily={sans} fontSize={13} fill={label}>
            {note}
          </text>
        </g>
      ))}
    </g>
  );
}

function GlueRail({
  x,
  boxRight,
  centerX,
  ys,
  boxHeight,
  gap,
}: {
  x: number;
  boxRight: number;
  centerX: number;
  ys: number[];
  boxHeight: number;
  gap: number;
}) {
  return (
    <g>
      {ys.map((y, i) => (
        <line
          key={y}
          x1={boxRight}
          y1={y + boxHeight / 2}
          x2={x}
          y2={y + boxHeight / 2}
          stroke={glue}
          strokeWidth={1.5}
          strokeDasharray="4 3"
          opacity={i === 0 || i === ys.length - 1 ? 1 : 0.8}
        />
      ))}
      <line
        x1={x}
        y1={ys[0] + boxHeight / 2}
        x2={x}
        y2={ys[ys.length - 1] + boxHeight / 2}
        stroke={glue}
        strokeWidth={1.5}
        strokeDasharray="4 3"
      />
      {ys.slice(0, -1).map((y) => (
        <text
          key={y}
          x={centerX}
          y={y + boxHeight + gap / 2 + 4}
          textAnchor="middle"
          fontFamily={mono}
          fontSize={11}
          fill={label}
        >
          ~ glue ~
        </text>
      ))}
    </g>
  );
}

function WideStack() {
  const bx = 30;
  const bw = 230;
  const bh = 54;
  const gap = 22;
  const railX = 300;
  const ys = systems.map((_, i) => 56 + i * (bh + gap));
  const top = ys[0];
  const bottom = ys[ys.length - 1] + bh;
  const midY = (top + bottom) / 2;

  return (
    <svg
      viewBox="0 0 980 450"
      className="w-full h-auto"
      role="img"
      aria-label="Five systems glued together today, one ReifyDB with ReifyDB"
    >
      <text x={bx} y={30} fontFamily={mono} fontSize={12} fontWeight={600} letterSpacing={1.4} fill={label}>
        TODAY
      </text>
      <text x={470} y={30} fontFamily={mono} fontSize={12} fontWeight={600} letterSpacing={1.4} fill={accent}>
        WITH REIFYDB
      </text>

      {ys.map((y, i) => (
        <SystemBox key={systems[i]} x={bx} y={y} w={bw} h={bh} name={systems[i]} />
      ))}
      <GlueRail x={railX} boxRight={bx + bw} centerX={bx + bw / 2} ys={ys} boxHeight={bh} gap={gap} />

      <g>
        <line x1={railX + 40} y1={midY} x2={424} y2={midY} stroke={accent} strokeWidth={4} />
        <path d={`M 424 ${midY - 11} L 448 ${midY} L 424 ${midY + 11} Z`} fill={accent} />
      </g>

      <ReifyBlock x={470} y={top} w={480} h={bottom - top} rowGap={70} firstRow={102} />

      <text x={bx} y={bottom + 30} fontFamily={sans} fontSize={14} fill={label}>
        five systems, one state
      </text>
      <text x={470} y={bottom + 30} fontFamily={sans} fontSize={14} fontWeight={700} fill={accent}>
        one system, one transaction
      </text>
    </svg>
  );
}

function TallStack() {
  const bx = 16;
  const bw = 232;
  const bh = 46;
  const gap = 22;
  const railX = 292;
  const ys = systems.map((_, i) => 36 + i * (bh + gap));
  const bottom = ys[ys.length - 1] + bh;
  const arrowTop = bottom + 46;
  const blockY = arrowTop + 88;
  const blockH = 260;

  return (
    <svg
      viewBox={`0 0 360 ${blockY + blockH + 40}`}
      className="w-full h-auto"
      role="img"
      aria-label="Five systems glued together today, one ReifyDB with ReifyDB"
    >
      <text x={bx} y={20} fontFamily={mono} fontSize={11} fontWeight={600} letterSpacing={1.4} fill={label}>
        TODAY
      </text>

      {ys.map((y, i) => (
        <SystemBox key={systems[i]} x={bx} y={y} w={bw} h={bh} name={systems[i]} />
      ))}
      <GlueRail x={railX} boxRight={bx + bw} centerX={bx + bw / 2} ys={ys} boxHeight={bh} gap={gap} />

      <text x={bx} y={bottom + 26} fontFamily={sans} fontSize={13} fill={label}>
        five systems, one state
      </text>

      <g>
        <line x1={132} y1={arrowTop} x2={132} y2={arrowTop + 32} stroke={accent} strokeWidth={4} />
        <path d={`M 121 ${arrowTop + 32} L 143 ${arrowTop + 32} L 132 ${arrowTop + 54} Z`} fill={accent} />
      </g>

      <text x={bx} y={blockY - 14} fontFamily={mono} fontSize={11} fontWeight={600} letterSpacing={1.4} fill={accent}>
        WITH REIFYDB
      </text>
      <ReifyBlock x={bx} y={blockY} w={328} h={blockH} rowGap={50} firstRow={86} />
      <text x={bx} y={blockY + blockH + 26} fontFamily={sans} fontSize={13} fontWeight={700} fill={accent}>
        one system, one transaction
      </text>
    </svg>
  );
}

export function StackDiagram() {
  return (
    <div className="dialog p-6 sm:p-10">
      <div className="hidden md:block">
        <WideStack />
      </div>
      <div className="md:hidden">
        <TallStack />
      </div>
    </div>
  );
}
