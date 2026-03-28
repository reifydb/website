import { useState, useEffect } from 'react';
import type { Sensor } from '../engine/types';
import { DISPLAY_TILE_SIZE, DISPLAY_SCALE, FARM_OFFSET_X, FARM_OFFSET_Y } from '../engine/constants';
import { eventBus, EVENTS } from '../game/event-bus';

interface IoTOverlayProps {
  sensors: Sensor[];
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

export function IoTOverlay({ sensors }: IoTOverlayProps) {
  const [cameraScroll, setCameraScroll] = useState({ scrollX: 0, scrollY: 0 });

  useEffect(() => {
    const handler = (pos: { scrollX: number; scrollY: number }) => {
      setCameraScroll(pos);
    };
    eventBus.on(EVENTS.CAMERA_MOVED, handler);
    return () => {
      eventBus.off(EVENTS.CAMERA_MOVED, handler);
    };
  }, []);

  // Transform: convert farm-local coords to screen coords accounting for camera scroll
  const offsetX = FARM_OFFSET_X * DISPLAY_TILE_SIZE - cameraScroll.scrollX * DISPLAY_SCALE;
  const offsetY = FARM_OFFSET_Y * DISPLAY_TILE_SIZE - cameraScroll.scrollY * DISPLAY_SCALE;

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ imageRendering: 'pixelated' }}
    >
      <div
        style={{
          position: 'absolute',
          transform: `translate(${offsetX}px, ${offsetY}px)`,
        }}
      >
        {/* Sensor radius circles */}
        {sensors.map(sensor => {
          const cx = sensor.x * DISPLAY_TILE_SIZE + DISPLAY_TILE_SIZE / 2;
          const cy = sensor.y * DISPLAY_TILE_SIZE + DISPLAY_TILE_SIZE / 2;
          const r = sensor.radius * DISPLAY_TILE_SIZE;
          const color = sensorColors[sensor.sensor_type] || '#888';
          return (
            <div
              key={`sr-${sensor.id}`}
              className="absolute rounded-full border opacity-20"
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
                className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] bg-bg-primary shadow-sm"
                style={{ borderColor: color }}
              >
                {sensorLabels[sensor.sensor_type]}
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}
