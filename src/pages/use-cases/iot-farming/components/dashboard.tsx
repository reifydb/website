import type { FarmStats, Weather, CropSummary, SoilOverview, Alert } from '../engine/types';

interface DashboardProps {
  stats: FarmStats;
  weather: Weather;
  cropCount: number;
  sensorCount: number;
  cropSummary: CropSummary[];
  soilOverview: SoilOverview[];
  alerts: Alert[];
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

export function Dashboard({ stats, weather, cropCount, sensorCount, cropSummary, soilOverview, alerts }: DashboardProps) {
  return (
    <div className="space-y-3">
      <div>
        <div className="text-[10px] font-mono uppercase tracking-wider text-text-muted mb-1">
          # weather
        </div>
        <div className="border border-white/[0.08] p-2 bg-bg-secondary">
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
        <div className="border border-white/[0.08] p-2 bg-bg-secondary space-y-0.5">
          <StatRow label="Water" value={Number(stats.water_used).toFixed(1)} unit="L" />
          <StatRow label="Energy" value={Number(stats.energy_used).toFixed(1)} unit="kW" />
          <StatRow label="Yield" value={Number(stats.total_yield).toFixed(0)} />
          <StatRow label="Tick" value={stats.current_tick} />
        </div>
      </div>

      <div>
        <div className="text-[10px] font-mono uppercase tracking-wider text-text-muted mb-1">
          # farm
        </div>
        <div className="border border-white/[0.08] p-2 bg-bg-secondary space-y-0.5">
          <StatRow label="Crops" value={cropCount} />
          <StatRow label="Sensors" value={sensorCount} />
        </div>
      </div>

      {cropSummary.length > 0 && (
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-text-muted mb-1">
            # crop health <span className="text-[8px] opacity-60">(view)</span>
          </div>
          <div className="border border-white/[0.08] p-2 bg-bg-secondary space-y-1.5">
            {cropSummary.map(cs => (
              <div key={cs.crop_type} className="space-y-0.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-text-muted capitalize">{cs.crop_type}</span>
                  <span className="text-text-primary">{cs.total}</span>
                </div>
                <div className="w-full bg-white/[0.05] h-1.5 rounded">
                  <div
                    className={`h-full rounded ${cs.avg_health > 0.7 ? 'bg-green-500' : cs.avg_health > 0.3 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: `${(cs.avg_health * 100).toFixed(0)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {soilOverview.length > 0 && (
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-text-muted mb-1">
            # soil conditions <span className="text-[8px] opacity-60">(view)</span>
          </div>
          <div className="border border-white/[0.08] p-2 bg-bg-secondary space-y-0.5">
            {soilOverview.map(so => (
              <div key={so.soil_type} className="flex justify-between text-xs font-mono">
                <span className="text-text-muted capitalize">{so.soil_type}</span>
                <span className="text-text-primary text-[10px]">
                  M:{(so.avg_moisture * 100).toFixed(0)}% T:{(so.avg_temp * 100).toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {alerts.length > 0 && (
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-text-muted mb-1">
            # alerts <span className="text-[8px] opacity-60">(view)</span>
          </div>
          <div className="border border-red-400/30 p-2 bg-bg-secondary space-y-0.5">
            <div className="text-xs font-mono text-red-600 font-bold">
              {alerts.length} crop{alerts.length !== 1 ? 's' : ''} at risk
            </div>
            {alerts.slice(0, 5).map(a => (
              <div key={a.id} className="flex justify-between text-xs font-mono">
                <span className="text-text-muted capitalize">{a.crop_type} [{a.x},{a.y}]</span>
                <span className="text-red-600">{(a.health * 100).toFixed(0)}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
