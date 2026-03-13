import { useRef } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { usePhaser } from '../hooks/use-phaser';
import { useFarmDB } from '../hooks/use-farm-db';
import { useGameState } from '../hooks/use-game-state';
import { Toolbar } from './toolbar';
import { InfoPanel } from './info-panel';
import { IoTOverlay } from './iot-overlay';
import { RuleEditor } from './rule-editor';
import { ConsolePanel } from './console-panel';
import { DISPLAY_TILE_SIZE, GRID_WIDTH, GRID_HEIGHT } from '../engine/constants';

export function FarmPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { db, loading, error } = useFarmDB();
  const gameRef = usePhaser(containerRef, db);
  const { gameState, setToolMode, setSpeed, addRule, toggleRule, removeRule } = useGameState();

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="border-2 border-dashed border-red-500/50 p-6 font-mono text-sm text-red-600">
            Failed to initialize farm database: {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-bg-secondary">
      <Navbar />
      <div className="flex-1 flex flex-col">
        {/* Main content area */}
        <div className="flex-1 flex">
          {/* Toolbar */}
          <Toolbar
            currentTool={gameState.toolMode}
            speed={gameState.speed}
            onToolChange={setToolMode}
            onSpeedChange={setSpeed}
          />

          {/* Game canvas area */}
          <div className="flex-1 flex flex-col items-center justify-center p-4">
            {loading ? (
              <div className="font-mono text-sm text-text-muted animate-pulse">
                Initializing farm database...
              </div>
            ) : (
              <div className="relative" style={{
                width: GRID_WIDTH * DISPLAY_TILE_SIZE,
                height: GRID_HEIGHT * DISPLAY_TILE_SIZE,
              }}>
                <div
                  ref={containerRef}
                  className="border-2 border-dashed border-black/25"
                  style={{
                    width: GRID_WIDTH * DISPLAY_TILE_SIZE,
                    height: GRID_HEIGHT * DISPLAY_TILE_SIZE,
                  }}
                />
                <IoTOverlay
                  sensors={gameState.sensors}
                  actuators={gameState.actuators}
                />
              </div>
            )}
          </div>

          {/* Right panel: Info + Rules */}
          <div className="flex flex-col">
            <InfoPanel gameState={gameState} />
            <div className="border-l-2 border-dashed border-black/25 bg-bg-primary p-3 w-52">
              <RuleEditor
                rules={gameState.rules}
                onAddRule={addRule}
                onToggleRule={toggleRule}
                onRemoveRule={removeRule}
              />
            </div>
          </div>
        </div>

        {/* Console panel */}
        <ConsolePanel />
      </div>
    </div>
  );
}
