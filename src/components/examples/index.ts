import { lazy } from 'react';
import type { ComponentType, LazyExoticComponent } from 'react';
import { RAW_TABLE, READS } from './swap-candle/swap-candle';

export interface SceneProps {
  howTo: string;
}

export interface Example {
  id: string;
  title: string;
  headline: string;
  subline: string;
  howTo: string;
  howItWorks: string[];
  subscription: {
    query: string;
    key: string;
    columns: string[];
    ready: () => Promise<void>;
    actions: { label: string; action: string; primary: boolean }[];
  };
  reads: { title: string; description: string; rql: string }[];
  load: () => Promise<{ default: ComponentType<SceneProps> }>;
}

export const EXAMPLES: Example[] = [
  {
    id: 'swap-candle',
    title: 'Swap to candle',
    headline: 'Watch a swap become a candle.',
    subline: 'One venue, one pipeline, every step a view running in this tab. Place a swap and follow it.',
    howTo: 'Click Buy or Sell, then follow your swap through each view.',
    howItWorks: [
      'Your swap lands as a raw venue row: integer amounts and a direction flag.',
      "A deferred view joins the pool's decimals and turns it into a trade with a price. Each later view builds on the one before: per slot VWAP, then volume, TWAP and candles per 10 slots.",
      'Nothing refreshes them. Each view catches up from the change alone, and your app just reads market::candles.',
    ],
    subscription: {
      query: READS.live,
      key: 'bucket',
      columns: ['bucket', 'open', 'high', 'low', 'close'],
      ready: () => import('./swap-candle/setup').then((setup) => setup.ensureSetup()),
      actions: [
        { label: 'Buy 25 RDB', action: 'buy:25', primary: true },
        { label: 'Sell 25 RDB', action: 'sell:25', primary: false },
      ],
    },
    reads: [
      {
        title: 'Raw, as the venue sends it',
        description: 'Integer amounts and a direction flag, before any view touches them.',
        rql: `from ${RAW_TABLE} sort { id } take 4`,
      },
      {
        title: 'Only buys',
        description: 'The same trades, filtered on the fly. Press Buy and run it again.',
        rql: 'from market::trades filter { is_buy == true } sort { id } take 5',
      },
      {
        title: 'Big trades',
        description: '25 RDB or more. Buy 25 or 100 to see your own swap here.',
        rql: 'from market::trades filter { base_volume >= 25.0 } sort { id } take 5',
      },
      {
        title: 'Busiest slots',
        description: 'Slots with the most swaps, read from the per-slot view.',
        rql: 'from market::block sort { swaps } take 3',
      },
      {
        title: 'Buy pressure',
        description: 'The share of volume that was buying, computed at read time.',
        rql: 'from market::volume map { bucket, buy_share: buy_volume / volume } take 2',
      },
      {
        title: 'Candle range',
        description: 'How far price moved inside each candle.',
        rql: 'from market::candles extend { range: high - low } map { bucket, open, close, range } take 8',
      },
      {
        title: 'Everything so far',
        description: 'One row over every trade.',
        rql: 'from market::trades aggregate { swaps: math::count(id), volume: math::sum(quote_volume) }',
      },
    ],
    load: () => import('./swap-candle/scene'),
  },
];

export const SCENES: Record<string, LazyExoticComponent<ComponentType<SceneProps>>> = Object.fromEntries(
  EXAMPLES.map((example) => [example.id, lazy(example.load)]),
);

export function exampleById(id: string | null): Example | undefined {
  return EXAMPLES.find((example) => example.id === id);
}

export { ExampleFrame, ExampleFrameSkeleton, ExampleHost } from './frame';
export { LivePanel } from './live-panel';
export { useWatchWhileVisible } from './use-watch-while-visible';
