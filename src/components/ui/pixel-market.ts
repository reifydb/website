export const MARKET_ROWS = [
  { symbol: 'ETH', basePrice: 3415 },
  { symbol: 'BTC', basePrice: 64210 },
  { symbol: 'SOL', basePrice: 142 },
  { symbol: 'BNB', basePrice: 590 },
]

export const TRADE_PERIOD = 2.2
export const SYMBOL_WIDTH = 3
export const PRICE_WIDTH = 5
export const TILES_PER_ROW = SYMBOL_WIDTH + PRICE_WIDTH

const FIRST_FLIP_DELAY = 1.4
const DRIFT_LIMIT = 0.01

export type BoardMode = 'full' | 'incremental'

export interface PriceChange {
  oldPrice: number
  flipTime: number
  changedDigits: boolean[]
  rising: boolean
}

export interface Market {
  prices: number[]
  lastChanges: (PriceChange | null)[]
  nextTrade: number
  lastFlipTime: number
  lastTradedRow: number
  incrementalFlips: number
  fullRecomputeFlips: number
}

export function hash(n: number): number {
  n = Math.imul((n ^ 61) ^ (n >>> 16), 9)
  n = n ^ (n >>> 4)
  n = Math.imul(n, 0x27d4eb2d)
  n = n ^ (n >>> 15)
  return (n >>> 0) / 4294967296
}

export function flipTimeOf(trade: number): number {
  return trade * TRADE_PERIOD + FIRST_FLIP_DELAY
}

export function tradedRowOf(trade: number): number {
  return Math.floor(hash(trade * 3 + 11) * MARKET_ROWS.length)
}

function priceStepOf(trade: number, basePrice: number): number {
  return Math.max(1, Math.round(basePrice * 0.0004 * (1 + hash(trade * 7 + 5) * 4)))
}

function risesOn(trade: number, oldPrice: number, basePrice: number): boolean {
  if (oldPrice > basePrice * (1 + DRIFT_LIMIT)) return false
  if (oldPrice < basePrice * (1 - DRIFT_LIMIT)) return true
  return hash(trade * 13 + 2) > 0.5
}

export function formatPrice(price: number): string {
  return String(price).padStart(PRICE_WIDTH, ' ')
}

export function changedDigits(oldPrice: number, newPrice: number): boolean[] {
  const before = formatPrice(oldPrice)
  const after = formatPrice(newPrice)
  return [...before].map((digit, i) => digit !== after[i])
}

export function createMarket(): Market {
  return {
    prices: MARKET_ROWS.map((row) => row.basePrice),
    lastChanges: MARKET_ROWS.map(() => null),
    nextTrade: 0,
    lastFlipTime: Number.NEGATIVE_INFINITY,
    lastTradedRow: 0,
    incrementalFlips: 0,
    fullRecomputeFlips: 0,
  }
}

export function advanceMarket(market: Market, time: number): void {
  while (flipTimeOf(market.nextTrade) <= time) {
    const trade = market.nextTrade++
    const row = tradedRowOf(trade)
    const { basePrice } = MARKET_ROWS[row]
    const oldPrice = market.prices[row]
    const rising = risesOn(trade, oldPrice, basePrice)
    const newPrice = Math.max(1, oldPrice + (rising ? 1 : -1) * priceStepOf(trade, basePrice))
    const digits = changedDigits(oldPrice, newPrice)
    market.prices[row] = newPrice
    market.lastChanges[row] = { oldPrice, flipTime: flipTimeOf(trade), changedDigits: digits, rising }
    market.lastFlipTime = flipTimeOf(trade)
    market.lastTradedRow = row
    market.incrementalFlips += digits.filter(Boolean).length
    market.fullRecomputeFlips += MARKET_ROWS.length * TILES_PER_ROW
  }
}

export function tileFlipTime(market: Market, row: number, column: number, mode: BoardMode): number {
  if (mode === 'full') return market.lastFlipTime + column * 0.03 + row * 0.05
  const change = market.lastChanges[row]
  if (!change || column < SYMBOL_WIDTH || !change.changedDigits[column - SYMBOL_WIDTH]) {
    return Number.NEGATIVE_INFINITY
  }
  return change.flipTime
}
