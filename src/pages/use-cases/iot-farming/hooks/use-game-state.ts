import { useState, useEffect, useCallback } from 'react';
import { eventBus, EVENTS } from '../game/event-bus';
import type { GameState } from '../engine/types';

const defaultState: GameState = {
  tiles: [], crops: [], sensors: [], readings: [],
  weather: { condition: 'sunny', intensity: 1.0, tick_changed: 0 },
  stats: { water_used: 0, energy_used: 0, total_yield: 0, current_tick: 0 },
  selectedTile: null,
  toolMode: 'select',
  speed: 1,
};

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(defaultState);

  useEffect(() => {
    const handler = (state: GameState) => {
      setGameState({ ...state });
    };
    eventBus.on(EVENTS.STATE_UPDATED, handler);
    return () => {
      eventBus.off(EVENTS.STATE_UPDATED, handler);
    };
  }, []);

  const setToolMode = useCallback((mode: GameState['toolMode']) => {
    eventBus.emit(EVENTS.TOOL_CHANGED, mode);
  }, []);

  const setSpeed = useCallback((speed: number) => {
    eventBus.emit(EVENTS.SPEED_CHANGED, speed);
  }, []);

  return { gameState, setToolMode, setSpeed };
}
