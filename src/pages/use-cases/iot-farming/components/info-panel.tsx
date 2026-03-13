import type { GameState } from '../engine/types';
import { CROP_CONFIGS } from '../engine/constants';
import { Dashboard } from './dashboard';

interface InfoPanelProps {
  gameState: GameState;
}

export function InfoPanel({ gameState }: InfoPanelProps) {
  const { selectedTile, tiles, crops, sensors, actuators } = gameState;
  const tile = selectedTile ? tiles.find(t => t.x === selectedTile.x && t.y === selectedTile.y) : null;
  const crop = selectedTile ? crops.find(c => c.x === selectedTile.x && c.y === selectedTile.y) : null;
  const sensor = selectedTile ? sensors.find(s => s.x === selectedTile.x && s.y === selectedTile.y) : null;
  const actuator = selectedTile ? actuators.find(a => a.x === selectedTile.x && a.y === selectedTile.y) : null;

  return (
    <div className="w-52 border-l-2 border-dashed border-black/25 bg-bg-primary p-3 flex flex-col overflow-y-auto">
      {tile && (
        <div className="mb-3">
          <div className="text-[10px] font-mono uppercase tracking-wider text-text-muted mb-1">
            # tile [{selectedTile!.x}, {selectedTile!.y}]
          </div>
          <div className="border border-dashed border-black/25 p-2 bg-bg-secondary space-y-0.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-text-muted">Soil</span>
              <span className="text-text-primary capitalize">{tile.soil_type}</span>
            </div>
            <div className="flex justify-between text-xs font-mono">
              <span className="text-text-muted">Moisture</span>
              <span className="text-text-primary">{(tile.moisture * 100).toFixed(0)}%</span>
            </div>
            <div className="flex justify-between text-xs font-mono">
              <span className="text-text-muted">Temp</span>
              <span className="text-text-primary">{(tile.temperature * 100).toFixed(0)}%</span>
            </div>
            <div className="flex justify-between text-xs font-mono">
              <span className="text-text-muted">Light</span>
              <span className="text-text-primary">{(tile.light * 100).toFixed(0)}%</span>
            </div>
          </div>
        </div>
      )}

      {crop && (
        <div className="mb-3">
          <div className="text-[10px] font-mono uppercase tracking-wider text-text-muted mb-1">
            # crop
          </div>
          <div className="border border-dashed border-black/25 p-2 bg-bg-secondary space-y-0.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-text-muted">Type</span>
              <span className="text-text-primary capitalize">{crop.crop_type}</span>
            </div>
            <div className="flex justify-between text-xs font-mono">
              <span className="text-text-muted">Stage</span>
              <span className="text-text-primary capitalize">{crop.growth_stage}</span>
            </div>
            <div className="flex justify-between text-xs font-mono">
              <span className="text-text-muted">Health</span>
              <span className={`${crop.health > 0.7 ? 'text-green-600' : crop.health > 0.3 ? 'text-yellow-600' : 'text-red-600'}`}>
                {(crop.health * 100).toFixed(0)}%
              </span>
            </div>
            <div className="flex justify-between text-xs font-mono">
              <span className="text-text-muted">Progress</span>
              <span className="text-text-primary">{crop.growth_progress.toFixed(1)}/{CROP_CONFIGS[crop.crop_type].stagesNeeded}</span>
            </div>
          </div>
        </div>
      )}

      {sensor && (
        <div className="mb-3">
          <div className="text-[10px] font-mono uppercase tracking-wider text-text-muted mb-1">
            # sensor
          </div>
          <div className="border border-dashed border-black/25 p-2 bg-bg-secondary space-y-0.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-text-muted">Type</span>
              <span className="text-text-primary capitalize">{sensor.sensor_type}</span>
            </div>
            <div className="flex justify-between text-xs font-mono">
              <span className="text-text-muted">Radius</span>
              <span className="text-text-primary">{sensor.radius}</span>
            </div>
            {(() => {
              const latest = gameState.readings
                .filter(r => r.sensor_id === sensor.id)
                .sort((a, b) => b.tick - a.tick)[0];
              return latest ? (
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-text-muted">Reading</span>
                  <span className="text-text-primary">{(latest.value * 100).toFixed(0)}%</span>
                </div>
              ) : null;
            })()}
          </div>
        </div>
      )}

      {actuator && (
        <div className="mb-3">
          <div className="text-[10px] font-mono uppercase tracking-wider text-text-muted mb-1">
            # actuator
          </div>
          <div className="border border-dashed border-black/25 p-2 bg-bg-secondary space-y-0.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-text-muted">Type</span>
              <span className="text-text-primary capitalize">{actuator.actuator_type}</span>
            </div>
            <div className="flex justify-between text-xs font-mono">
              <span className="text-text-muted">Active</span>
              <span className={actuator.active ? 'text-green-600' : 'text-text-muted'}>{actuator.active ? 'ON' : 'OFF'}</span>
            </div>
            <div className="flex justify-between text-xs font-mono">
              <span className="text-text-muted">Power</span>
              <span className="text-text-primary">{actuator.power_usage.toFixed(1)}</span>
            </div>
          </div>
        </div>
      )}

      <div className="mt-auto">
        <Dashboard
          stats={gameState.stats}
          weather={gameState.weather}
          cropCount={gameState.crops.length}
          sensorCount={gameState.sensors.length}
          actuatorCount={gameState.actuators.length}
        />
      </div>
    </div>
  );
}
