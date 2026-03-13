import type { FarmStats, Weather } from '../engine/types';

interface DashboardProps {
  stats: FarmStats;
  weather: Weather;
  cropCount: number;
  sensorCount: number;
  actuatorCount: number;
}

function StatRow({ label, value, unit }: { label: string; value: string | number; unit?: string }) {
  return (
    <div className="flex justify-between items-center py-0.5">
      <span className="text-text-muted text-xs font-mono">{label}</span>
      <span className="text-text-primary text-xs font-mono font-bold">
        {value}{unit && <span className="text-text-muted font-normal ml-0.5">{unit}</span>}
      </span>
    </div>
  );
}

const weatherIcons: Record<string, string> = {
  sunny: '☀',
  cloudy: '☁',
  rainy: '🌧',
};

export function Dashboard({ stats, weather, cropCount, sensorCount, actuatorCount }: DashboardProps) {
  return (
    <div className="space-y-3">
      <div>
        <div className="text-[10px] font-mono uppercase tracking-wider text-text-muted mb-1">
          # weather
        </div>
        <div className="border border-dashed border-black/25 p-2 bg-bg-secondary">
          <div className="flex items-center gap-2">
            <span className="text-lg">{weatherIcons[weather.condition] || '?'}</span>
            <span className="text-xs font-mono capitalize text-text-primary">{weather.condition}</span>
          </div>
        </div>
      </div>

      <div>
        <div className="text-[10px] font-mono uppercase tracking-wider text-text-muted mb-1">
          # resources
        </div>
        <div className="border border-dashed border-black/25 p-2 bg-bg-secondary space-y-0.5">
          <StatRow label="Water" value={stats.water_used.toFixed(1)} unit="L" />
          <StatRow label="Energy" value={stats.energy_used.toFixed(1)} unit="kW" />
          <StatRow label="Yield" value={stats.total_yield.toFixed(0)} />
          <StatRow label="Tick" value={stats.current_tick} />
        </div>
      </div>

      <div>
        <div className="text-[10px] font-mono uppercase tracking-wider text-text-muted mb-1">
          # farm
        </div>
        <div className="border border-dashed border-black/25 p-2 bg-bg-secondary space-y-0.5">
          <StatRow label="Crops" value={cropCount} />
          <StatRow label="Sensors" value={sensorCount} />
          <StatRow label="Actuators" value={actuatorCount} />
        </div>
      </div>
    </div>
  );
}
