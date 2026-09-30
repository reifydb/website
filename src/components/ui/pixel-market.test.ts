import { describe, it, expect } from 'vitest'
import {
  MARKET_ROWS,
  PRICE_WIDTH,
  SYMBOL_WIDTH,
  TILES_PER_ROW,
  advanceMarket,
  changedDigits,
  createMarket,
  flipTimeOf,
  formatPrice,
  tileFlipTime,
  tradedRowOf,
} from './pixel-market'

describe('pixel market', () => {
  it('marks exactly the one digit a one-unit move changes', () => {
    // The board promises only what changed flips; a one-unit move must flip exactly one tile.
    expect(changedDigits(3415, 3416)).toEqual([false, false, false, false, true])
  })

  it('marks every digit that shifts when a price gains a digit', () => {
    // 999 -> 1000 changes four digits; the shared leading pad must never flip.
    expect(changedDigits(999, 1000)).toEqual([false, true, true, true, true])
  })

  it('flips only changed price tiles in incremental mode, across many trades', () => {
    // Every drawn tile must flip exactly when its digit differs from before, otherwise the claim is false.
    const market = createMarket()
    for (let trade = 0; trade < 60; trade++) {
      advanceMarket(market, flipTimeOf(trade))
      const row = tradedRowOf(trade)
      const change = market.lastChanges[row]
      expect(change).not.toBeNull()
      const before = formatPrice(change!.oldPrice)
      const after = formatPrice(market.prices[row])
      for (let column = 0; column < TILES_PER_ROW; column++) {
        const flips = Number.isFinite(tileFlipTime(market, row, column, 'incremental'))
        const digitChanged = column >= SYMBOL_WIDTH && before[column - SYMBOL_WIDTH] !== after[column - SYMBOL_WIDTH]
        expect(flips, `trade ${trade} column ${column}`).toBe(digitChanged)
      }
    }
  })

  it('never flips the symbol tiles in incremental mode', () => {
    // Symbols never change, so a flip there would show recomputation that did not happen.
    const market = createMarket()
    advanceMarket(market, flipTimeOf(40))
    for (let row = 0; row < MARKET_ROWS.length; row++) {
      for (let column = 0; column < SYMBOL_WIDTH; column++) {
        expect(Number.isFinite(tileFlipTime(market, row, column, 'incremental'))).toBe(false)
      }
    }
  })

  it('flips every tile of every row in full mode', () => {
    // Full recompute must redraw the whole board, otherwise the comparison understates its cost.
    const market = createMarket()
    advanceMarket(market, flipTimeOf(0))
    for (let row = 0; row < MARKET_ROWS.length; row++) {
      for (let column = 0; column < TILES_PER_ROW; column++) {
        expect(Number.isFinite(tileFlipTime(market, row, column, 'full'))).toBe(true)
      }
    }
  })

  it('leaves untouched rows at their price with no change recorded', () => {
    // A trade on one coin must never move another coin's row.
    const market = createMarket()
    advanceMarket(market, flipTimeOf(0))
    const traded = tradedRowOf(0)
    MARKET_ROWS.forEach((row, index) => {
      if (index === traded) return
      expect(market.prices[index]).toBe(row.basePrice)
      expect(market.lastChanges[index]).toBeNull()
    })
  })

  it('counts between one and five incremental flips per trade against a full board per trade', () => {
    // Each trade moves a price, so at least one tile must flip, and at most every price digit.
    const market = createMarket()
    const trades = 100
    advanceMarket(market, flipTimeOf(trades - 1))
    expect(market.nextTrade).toBe(trades)
    expect(market.fullRecomputeFlips).toBe(trades * MARKET_ROWS.length * TILES_PER_ROW)
    expect(market.incrementalFlips).toBeGreaterThanOrEqual(trades)
    expect(market.incrementalFlips).toBeLessThanOrEqual(trades * PRICE_WIDTH)
  })

  it('advances the same way for the same time', () => {
    // All scenes share one clock; two markets at the same time must agree exactly, otherwise boards disagree.
    const first = createMarket()
    const second = createMarket()
    advanceMarket(first, 50)
    advanceMarket(second, 20)
    advanceMarket(second, 50)
    expect(second).toEqual(first)
  })
})
