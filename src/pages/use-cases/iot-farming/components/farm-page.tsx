import { useRef } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { usePhaser } from '../hooks/use-phaser';
import { useFarmDB } from '../hooks/use-farm-db';
import { useGameState } from '../hooks/use-game-state';
import { Toolbar } from './toolbar';
import { InfoPanel } from './info-panel';
import { IoTOverlay } from './iot-overlay';
import { ConsolePanel } from './console-panel';

export function FarmPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { db, loading, error } = useFarmDB();
  usePhaser(containerRef, db);
  const { gameState, setToolMode, setSpeed } = useGameState();

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="border border-red-500/30 p-6 font-mono text-sm text-red-600">
            Failed to initialize farm database: {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-bg-secondary">
      <Navbar />
      <div className="flex-1 relative">
        {/* Main content area */}
        <div className="h-full flex">
          {/* Toolbar */}
          <Toolbar
            currentTool={gameState.toolMode}
            speed={gameState.speed}
            onToolChange={setToolMode}
            onSpeedChange={setSpeed}
          />

          {/* Game canvas area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {loading ? (
              <div className="flex-1 flex items-center justify-center font-mono text-sm text-text-muted animate-pulse">
                Initializing farm database...
              </div>
            ) : (
              <div className="relative flex-1">
                <div
                  ref={containerRef}
                  tabIndex={-1}
                  className="w-full h-full border border-white/[0.08]"
                />
                <IoTOverlay
                  sensors={gameState.sensors}
                />
              </div>
            )}
          </div>

          {/* Right panel: Info */}
          <InfoPanel gameState={gameState} />
        </div>

        {/* Console panel */}
        <ConsolePanel />
      </div>
    </div>
  );
}
