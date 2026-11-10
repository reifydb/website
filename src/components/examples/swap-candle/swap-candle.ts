export interface Swap {
  id: number;
  slot: number;
  isBuy: boolean;
  size: number;
  price: number;
}

export const SLOTS_PER_BUCKET = 10;

export const RAW_TABLE = 'market::raw_swaps';

export const RAW_COLUMNS = ['pool', 'amount0', 'amount1', 'zero_for_one'];

export const NORMALIZED_VIEW = 'market::normalized';

export const SETUP = `create namespace market;
create table market::pools { pool: utf8, base_decimals: int4, quote_decimals: int4 };
insert market::pools [{ pool: "rdb-usd", base_decimals: 9, quote_decimals: 6 }];
create table ${RAW_TABLE} { id: int8, slot: int8, pool: utf8, amount0: int8, amount1: int8, zero_for_one: bool };
create deferred view ${NORMALIZED_VIEW} { id: int8, slot: int8, venue: utf8, price: float8, base_volume: float8, quote_volume: float8, is_buy: bool } as { from ${RAW_TABLE} inner join { from market::pools } as p using (pool, p.pool) map { id, slot, venue: "rdb-usd", base_volume: cast(amount0, float8) / math::power(10.0, cast(p_base_decimals, float8)), quote_volume: cast(amount1, float8) / math::power(10.0, cast(p_quote_decimals, float8)), is_buy: zero_for_one == false } extend { price: quote_volume / base_volume } };
create deferred view market::trades { id: int8, slot: int8, venue: utf8, price: float8, base_volume: float8, quote_volume: float8, is_buy: bool } as { from ${NORMALIZED_VIEW} map { id, slot, venue, price, base_volume, quote_volume, is_buy } };
create deferred view market::block { slot: int8, vwap: float8, volume: float8, buy_volume: float8, swaps: int8 } as { from market::trades extend { pv: price * base_volume, bv: quote_volume * cast(is_buy, float8) } aggregate { pvs: math::sum(pv), bvs: math::sum(base_volume), volume: math::sum(quote_volume), buy_volume: math::sum(bv), swaps: math::count(slot) } by { slot } map { slot, vwap: pvs / bvs, volume, buy_volume, swaps } };
create deferred view market::volume { bucket: int8, volume: float8, buy_volume: float8, swaps: int8 } as { from market::block extend { bucket: slot / ${SLOTS_PER_BUCKET} } aggregate { volume: math::sum(volume), buy_volume: math::sum(buy_volume), swaps: math::sum(swaps) } by { bucket } };
create deferred view market::twap { bucket: int8, twap: float8, slots: int8 } as { from market::block extend { bucket: slot / ${SLOTS_PER_BUCKET} } aggregate { twap: math::avg(vwap), slots: math::count(slot) } by { bucket } };
create deferred view market::candle_span { bucket: int8, first_slot: int8, last_slot: int8, high: float8, low: float8 } as { from market::block extend { bucket: slot / ${SLOTS_PER_BUCKET} } aggregate { first_slot: math::min(slot), last_slot: math::max(slot), high: math::max(vwap), low: math::min(vwap) } by { bucket } };
create deferred view market::candles { bucket: int8, open: float8, high: float8, low: float8, close: float8 } as { from market::candle_span inner join { from market::block } as o using (first_slot, o.slot) inner join { from market::block } as c using (last_slot, c.slot) map { bucket, open: o_vwap, high, low, close: c_vwap } }`;

export const READS = {
  raw: (id: number) => `from ${RAW_TABLE} filter { id == ${id} }`,
  normalized: (id: number) => `from ${NORMALIZED_VIEW} filter { id == ${id} }`,
  trades: 'from market::trades sort { id } take 4',
  block: 'from market::block sort { slot } take 3',
  volume: 'from market::volume sort { bucket } take 2',
  twap: 'from market::twap sort { bucket } take 2',
  candles: 'from market::candles sort { bucket } take 8',
  live: 'from market::candles\ntake 10',
};

function units(amount: number, decimals: number): number {
  return Math.round(amount * 10 ** decimals);
}

export function insertSwaps(swaps: Swap[]): string {
  const rows = swaps.map(
    (s) =>
      `{ id: ${s.id}, slot: ${s.slot}, pool: "rdb-usd", amount0: ${units(s.size, 9)}, amount1: ${units(s.size * s.price, 6)}, zero_for_one: ${!s.isBuy} }`,
  );
  return `insert ${RAW_TABLE} [${rows.join(', ')}]`;
}
