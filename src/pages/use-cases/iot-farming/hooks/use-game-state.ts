import { useState, useEffect, useCallback } from 'react';
import { eventBus, EVENTS } from '../game/event-bus';
import type { GameState } from '../engine/types';
import { createInitialState } from '../engine/simulation';

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(createInitialState);

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

  const addRule = useCallback((rule: Omit<import('../engine/types').Rule, 'id'>) => {
    eventBus.emit(EVENTS.RULE_ADDED, rule);
  }, []);

  const toggleRule = useCallback((ruleId: number) => {
    eventBus.emit(EVENTS.RULE_TOGGLED, ruleId);
  }, []);

  const removeRule = useCallback((ruleId: number) => {
    eventBus.emit(EVENTS.RULE_REMOVED, ruleId);
  }, []);

  return { gameState, setToolMode, setSpeed, addRule, toggleRule, removeRule };
}
