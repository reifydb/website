const accent = 'var(--color-primary)';
const label = 'var(--color-text-muted)';
const body = 'var(--color-text-secondary)';
const strong = 'var(--color-text-primary)';
const hairline = 'var(--color-border-light)';
const boxStroke = 'var(--color-border-subtle)';
const flow = 'var(--color-gray-400)';
const boxFill = 'var(--color-bg-tertiary)';
const panelFill = 'var(--color-bg-secondary)';
const mono = 'var(--font-mono)';
const sans = 'var(--font-body)';

const PANEL_W = 460;
const PANEL_H = 560;
const RAIL_X = 42;

const fanOut = [
  ['redis', 'drop the cached balance'],
  ['queue', 'worker recomputes totals'],
  ['cron', 'revenue, later'],
];

const inside = [
  ['policy', 'alice may place orders'],
  ['procedure', 'check balance, insert, debit'],
  ['view', 'revenue, updated by the same write'],
];

function Actor({ y, name, note }: { y: number; name: string; note: string }) {
  return (
    <g>
      <text x={24} y={y} fontFamily={mono} fontSize={14} fontWeight={700} fill={strong}>
        {name}
      </text>
      <text x={24} y={y + 19} fontFamily={sans} fontSize={13} fill={body}>
        {note}
      </text>
    </g>
  );
}

function Node({
  y,
  h,
  name,
  note,
  highlight,
}: {
  y: number;
  h: number;
  name: string;
  note: string;
  highlight?: boolean;
}) {
  return (
    <g>
      <rect
        x={24}
        y={y}
        width={PANEL_W - 48}
        height={h}
        rx={8}
        fill={highlight ? panelFill : boxFill}
        stroke={highlight ? accent : boxStroke}
        strokeWidth={highlight ? 2 : 1}
      />
      {highlight && <rect x={24} y={y} width={PANEL_W - 48} height={h} rx={8} fill={accent} fillOpacity={0.05} />}
      <text x={40} y={y + 24} fontFamily={mono} fontSize={14} fontWeight={700} fill={highlight ? accent : strong}>
        {name}
      </text>
      <text x={40} y={y + 43} fontFamily={sans} fontSize={13} fill={body}>
        {note}
      </text>
    </g>
  );
}

function Arrow({ y1, y2, note, tone }: { y1: number; y2: number; note?: string; tone: string }) {
  return (
    <g>
      <line x1={RAIL_X} y1={y1} x2={RAIL_X} y2={y2 - 8} stroke={tone} strokeWidth={2} />
      <path d={`M ${RAIL_X - 5} ${y2 - 8} L ${RAIL_X + 5} ${y2 - 8} L ${RAIL_X} ${y2} Z`} fill={tone} />
      {note && (
        <text x={RAIL_X + 14} y={(y1 + y2) / 2 + 4} fontFamily={sans} fontSize={12} fill={label}>
          {note}
        </text>
      )}
    </g>
  );
}

function Footer({ items, tone }: { items: string[]; tone: string }) {
  return (
    <g>
      <line x1={24} y1={PANEL_H - 62} x2={PANEL_W - 24} y2={PANEL_H - 62} stroke={hairline} />
      <text x={24} y={PANEL_H - 34} fontFamily={mono} fontSize={12} fill={tone}>
        {items.join('   ·   ')}
      </text>
    </g>
  );
}

function PanelFrame({ title, tone }: { title: string; tone: string }) {
  return (
    <g>
      <rect x={0} y={0} width={PANEL_W} height={PANEL_H} rx={12} fill={panelFill} stroke={hairline} />
      <text x={24} y={34} fontFamily={mono} fontSize={12} fontWeight={600} letterSpacing={1.4} fill={tone}>
        {title}
      </text>
    </g>
  );
}

function TodayPanel() {
  const fanTop = 286;
  const fanGap = 42;
  const fanH = 32;
  const fanBottom = fanTop + 2 * fanGap + fanH;

  return (
    <g>
      <PanelFrame title="TODAY" tone={label} />
      <Actor y={72} name="alice" note="POST /orders" />
      <Arrow y1={100} y2={128} tone={flow} />
      <Node y={128} h={56} name="api server" note="may alice? build the query" />
      <Arrow y1={184} y2={222} note={'as "app", the one account'} tone={flow} />
      <Node y={222} h={56} name="postgres" note="insert, debit" />

      <line x1={RAIL_X} y1={278} x2={RAIL_X} y2={fanBottom - fanH / 2} stroke={flow} strokeWidth={2} />
      {fanOut.map(([name, note], i) => {
        const y = fanTop + i * fanGap;
        return (
          <g key={name}>
            <line x1={RAIL_X} y1={y + fanH / 2} x2={72} y2={y + fanH / 2} stroke={flow} strokeWidth={2} />
            <rect x={72} y={y} width={PANEL_W - 96} height={fanH} rx={6} fill={boxFill} stroke={boxStroke} />
            <text x={86} y={y + 21} fontFamily={mono} fontSize={12} fontWeight={700} fill={body}>
              {name}
            </text>
            <text x={148} y={y + 21} fontFamily={sans} fontSize={12} fill={label}>
              {note}
            </text>
          </g>
        );
      })}

      <Arrow y1={fanBottom + 6} y2={fanBottom + 44} tone={flow} />
      <Actor y={fanBottom + 62} name="alice" note="polls balance, revenue: stale in between" />
      <Footer items={['5 systems', 'runs as "app"', 'stale']} tone={label} />
    </g>
  );
}

function ReifyPanel() {
  const blockY = 128;
  const blockH = 226;

  return (
    <g>
      <PanelFrame title="WITH REIFYDB" tone={accent} />
      <Actor y={72} name="alice" note="place_order(...)" />
      <Arrow y1={100} y2={blockY} tone={accent} />

      <rect x={24} y={blockY} width={PANEL_W - 48} height={blockH} rx={10} fill={panelFill} stroke={accent} strokeWidth={2} />
      <rect x={24} y={blockY} width={PANEL_W - 48} height={blockH} rx={10} fill={accent} fillOpacity={0.05} />
      <text x={44} y={blockY + 28} fontFamily={mono} fontSize={13} fontWeight={700} letterSpacing={1.4} fill={accent}>
        REIFYDB
      </text>
      <line x1={44} y1={blockY + 44} x2={PANEL_W - 44} y2={blockY + 44} stroke={accent} strokeOpacity={0.3} />
      {inside.map(([keyword, note], i) => (
        <g key={keyword}>
          <text x={44} y={blockY + 74 + i * 34} fontFamily={mono} fontSize={13} fontWeight={700} fill={accent}>
            {keyword}
          </text>
          <text x={148} y={blockY + 74 + i * 34} fontFamily={sans} fontSize={13} fill={body}>
            {note}
          </text>
        </g>
      ))}
      <line x1={44} y1={blockY + 180} x2={PANEL_W - 44} y2={blockY + 180} stroke={accent} strokeOpacity={0.3} />
      <text x={44} y={blockY + 206} fontFamily={sans} fontSize={14} fontWeight={700} fill={accent}>
        one transaction
      </text>

      <Arrow y1={blockY + blockH} y2={blockY + blockH + 54} tone={accent} />
      <Actor y={blockY + blockH + 72} name="alice" note="sees balance, revenue: current, pushed" />
      <Footer items={['1 system', 'runs as alice', 'current']} tone={accent} />
    </g>
  );
}

export function FeatureDiagram() {
  const gap = 40;
  const wideW = PANEL_W * 2 + gap;

  return (
    <>
      <svg
        viewBox={`0 0 ${wideW} ${PANEL_H}`}
        className="hidden md:block w-full h-auto"
        role="img"
        aria-label="Alice places an order on today's stack and on ReifyDB"
      >
        <TodayPanel />
        <g transform={`translate(${PANEL_W + gap} 0)`}>
          <ReifyPanel />
        </g>
      </svg>

      <svg
        viewBox={`0 0 ${PANEL_W} ${PANEL_H * 2 + gap}`}
        className="md:hidden w-full h-auto"
        role="img"
        aria-label="Alice places an order on today's stack and on ReifyDB"
      >
        <TodayPanel />
        <g transform={`translate(0 ${PANEL_H + gap})`}>
          <ReifyPanel />
        </g>
      </svg>
    </>
  );
}
