import { lazy } from 'react';
import type { ComponentType, LazyExoticComponent } from 'react';
import { CANDLES_DDL, NORMALIZED_DDL, RAW_DDL, RAW_TABLE, READS } from './swap-candle/swap-candle';
import { PROCEDURE_DDL, READS as RATE_READS, RING_DDL, requestCall } from './rate-limiter/rate-limiter';
import { CLAIM, NAMES_DDL, READS as FLEET_READS, STORAGES_DDL, insertDevice } from './shared-dictionary/shared-dictionary';

export interface SceneProps {
  howTo: string;
}

export interface Example {
  id: string;
  title: string;
  headline: string;
  subline: string;
  howTo: string;
  howItWorks: { why: string; steps: { text: string; rql?: string }[] };
  subscription?: {
    heading: string;
    query: string;
    key: string;
    columns: string[];
    ready: () => Promise<void>;
    actions: { label: string; action: string; primary: boolean }[];
  };
  editor?: { heading: string; title: string; description: string; rql: string };
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
    howItWorks: {
      why: 'Trades arrive as raw integers and flags, and your app wants candles. Usually that means a batch job. Here every step is a view that keeps itself up to date.',
      steps: [
        { text: 'Your swap lands as a raw venue row: integer amounts and a direction flag.', rql: RAW_DDL },
        { text: "A deferred view joins the pool's decimals and turns it into a trade with a price.", rql: NORMALIZED_DDL },
        { text: 'Each later view builds on the one before: per-slot VWAP, then volume, TWAP and candles per 10 slots.', rql: CANDLES_DDL },
        { text: 'Nothing refreshes them. Your app just reads market::candles.', rql: READS.candles },
      ],
    },
    subscription: {
      heading: 'Subscribe to the candles',
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
  {
    id: 'rate-limiter',
    title: 'Rate limiter',
    headline: 'Five requests, then the door shuts.',
    subline: 'One ring buffer per user keeps their last five requests. No cleanup job, no counters to reset.',
    howTo: 'Click Send as alice, or spam her, and watch her ring fill and turn.',
    howItWorks: {
      why: 'A rate limiter has to decide and record in one step. If the check and the write are separate calls, two requests can both see 4 and both get through.',
      steps: [
        {
          text: 'Requests land in a ring buffer with capacity 5 and one ring per user. A full ring overwrites its oldest row, so nothing ever cleans up.',
          rql: RING_DDL,
        },
        {
          text: "The rule is a procedure. It counts this user's rows from the last 10 seconds, asserts fewer than five, then inserts, all inside one transaction.",
          rql: PROCEDURE_DDL,
        },
        {
          text: 'The app makes one call per request. A failed assert means blocked, and nothing is stored.',
          rql: requestCall(1, 'alice'),
        },
      ],
    },
    subscription: {
      heading: 'Subscribe to the requests',
      query: RATE_READS.live,
      key: 'id',
      columns: ['id', 'user', 'at'],
      ready: () => import('./rate-limiter/setup').then((setup) => setup.ensureSetup()),
      actions: [
        { label: 'Send as alice', action: 'send', primary: true },
        { label: 'Spam 5 as alice', action: 'spam', primary: false },
      ],
    },
    reads: [
      {
        title: 'The whole ring',
        description: 'Every request still held. However long it runs, this never passes 15 rows.',
        rql: 'from limits::requests sort { id }',
      },
      {
        title: "One user's ring",
        description: 'The partition for alice. Spam her and run it again: still five rows or fewer.',
        rql: 'from limits::requests filter { user == "alice" } sort { id }',
      },
      {
        title: 'Rows per user',
        description: 'Each user is capped at the capacity on their own.',
        rql: 'from limits::requests aggregate { kept: math::count(id) } by { user }',
      },
      {
        title: 'Newest request',
        description: 'The last request that got through.',
        rql: 'from limits::requests sort { id } take 1',
      },
    ],
    load: () => import('./rate-limiter/scene'),
  },
  {
    id: 'shared-dictionary',
    title: 'Shared dictionary',
    headline: 'One dictionary, four kinds of storage.',
    subline: 'Device names live once in a dictionary. A table, a series, a ring buffer and a queue all point at\u00a0it.',
    howTo: 'Click Add device and watch one new entry reach all four boards with the same id.',
    howItWorks: {
      why: 'The same device name gets written thousands of times, into very different kinds of storage. A shared dictionary stores each name once and gives every storage the same small id, so a name means one thing everywhere.',
      steps: [
        { text: 'The dictionary maps each name to a small id.', rql: NAMES_DDL },
        { text: 'Four storages, one column type. Each name column points at the same dictionary.', rql: STORAGES_DDL },
        {
          text: 'Writes and reads use plain strings. A new name gets its id on first insert; repeats reuse it.',
          rql: insertDevice('gate-1', 'new'),
        },
        { text: 'A worker takes commands off the queue and reports back. The name comes back decoded.', rql: CLAIM },
      ],
    },
    editor: {
      heading: 'Query the dictionary',
      title: 'The dictionary',
      description: 'Every device name and the id the four storages share. Add a device above and run it again.',
      rql: FLEET_READS.names,
    },
    reads: [],
    load: () => import('./shared-dictionary/scene'),
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
