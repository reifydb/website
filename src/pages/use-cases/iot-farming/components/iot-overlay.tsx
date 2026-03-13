import type { Sensor, Actuator } from '../engine/types';
import { DISPLAY_TILE_SIZE, SENSOR_DEFAULT_RADIUS, ACTUATOR_DEFAULT_RADIUS } from '../engine/constants';

interface IoTOverlayProps {
  sensors: Sensor[];
  actuators: Actuator[];
}

const sensorColors: Record<string, string> = {
  moisture: '#3b82f6',
  temperature: '#ef4444',
  light: '#f59e0b',
};

const sensorLabels: Record<string, string> = {
  moisture: '💧',
  temperature: '🌡',
  light: '☀',
};

const actuatorColors: Record<string, string> = {
  sprinkler: '#06b6d4',
  heater: '#f97316',
  lamp: '#eab308',
};

const actuatorLabels: Record<string, string> = {
  sprinkler: '🚿',
  heater: '🔥',
  lamp: '💡',
};

export function IoTOverlay({ sensors, actuators }: IoTOverlayProps) {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ imageRendering: 'pixelated' }}>
      {/* Sensor radius circles */}
      {sensors.map(sensor => {
        const cx = sensor.x * DISPLAY_TILE_SIZE + DISPLAY_TILE_SIZE / 2;
        const cy = sensor.y * DISPLAY_TILE_SIZE + DISPLAY_TILE_SIZE / 2;
        const r = sensor.radius * DISPLAY_TILE_SIZE;
        const color = sensorColors[sensor.sensor_type] || '#888';
        return (
          <div
            key={`sr-${sensor.id}`}
            className="absolute rounded-full border border-dashed opacity-20"
            style={{
              left: cx - r,
              top: cy - r,
              width: r * 2,
              height: r * 2,
              borderColor: color,
              backgroundColor: color,
            }}
          />
        );
      })}

      {/* Sensor markers */}
      {sensors.map(sensor => {
        const x = sensor.x * DISPLAY_TILE_SIZE;
        const y = sensor.y * DISPLAY_TILE_SIZE;
        const color = sensorColors[sensor.sensor_type] || '#888';
        return (
          <div
            key={`s-${sensor.id}`}
            className="absolute flex items-center justify-center pointer-events-auto"
            style={{
              left: x,
              top: y,
              width: DISPLAY_TILE_SIZE,
              height: DISPLAY_TILE_SIZE,
            }}
            title={`${sensor.sensor_type} sensor (r=${sensor.radius})`}
          >
            <div
              className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] bg-white/90 shadow-sm"
              style={{ borderColor: color }}
            >
              {sensorLabels[sensor.sensor_type]}
            </div>
          </div>
        );
      })}

      {/* Actuator markers */}
      {actuators.map(actuator => {
        const x = actuator.x * DISPLAY_TILE_SIZE;
        const y = actuator.y * DISPLAY_TILE_SIZE;
        const color = actuatorColors[actuator.actuator_type] || '#888';
        return (
          <div
            key={`a-${actuator.id}`}
            className="absolute flex items-center justify-center pointer-events-auto"
            style={{
              left: x,
              top: y,
              width: DISPLAY_TILE_SIZE,
              height: DISPLAY_TILE_SIZE,
            }}
            title={`${actuator.actuator_type} (${actuator.active ? 'ON' : 'OFF'})`}
          >
            <div
              className={`w-6 h-6 rounded border-2 flex items-center justify-center text-[10px] bg-white/90 shadow-sm transition-all ${
                actuator.active ? 'animate-pulse' : ''
              }`}
              style={{ borderColor: color }}
            >
              {actuatorLabels[actuator.actuator_type]}
            </div>
          </div>
        );
      })}
    </div>
  );
}
