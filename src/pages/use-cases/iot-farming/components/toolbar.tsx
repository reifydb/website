import type { ToolMode } from '../engine/types';

interface ToolbarProps {
  currentTool: ToolMode;
  speed: number;
  onToolChange: (mode: ToolMode) => void;
  onSpeedChange: (speed: number) => void;
}

interface ToolItem {
  mode: ToolMode;
  label: string;
  icon: string;
}

const cropTools: ToolItem[] = [
  { mode: 'plant_wheat', label: 'Wheat', icon: '🌾' },
  { mode: 'plant_tomato', label: 'Tomato', icon: '🍅' },
  { mode: 'plant_corn', label: 'Corn', icon: '🌽' },
  { mode: 'plant_lettuce', label: 'Lettuce', icon: '🥬' },
];

const sensorTools: ToolItem[] = [
  { mode: 'place_moisture_sensor', label: 'Moisture', icon: '💧' },
  { mode: 'place_temperature_sensor', label: 'Temp', icon: '🌡' },
  { mode: 'place_light_sensor', label: 'Light', icon: '☀' },
];

const actuatorTools: ToolItem[] = [
  { mode: 'place_sprinkler', label: 'Sprinkler', icon: '🚿' },
  { mode: 'place_heater', label: 'Heater', icon: '🔥' },
  { mode: 'place_lamp', label: 'Lamp', icon: '💡' },
];

const actionTools: ToolItem[] = [
  { mode: 'select', label: 'Select', icon: '↖' },
  { mode: 'harvest', label: 'Harvest', icon: '✂' },
  { mode: 'remove', label: 'Remove', icon: '✕' },
];

const speeds = [
  { value: 0, label: '⏸' },
  { value: 1, label: '1x' },
  { value: 2, label: '2x' },
  { value: 4, label: '4x' },
];

function ToolSection({ title, tools, currentTool, onToolChange }: {
  title: string;
  tools: ToolItem[];
  currentTool: ToolMode;
  onToolChange: (mode: ToolMode) => void;
}) {
  return (
    <div className="mb-3">
      <div className="text-[10px] font-mono uppercase tracking-wider text-text-muted mb-1.5 px-1">
        # {title}
      </div>
      <div className="flex flex-col gap-1">
        {tools.map(tool => (
          <button
            key={tool.mode}
            onClick={() => onToolChange(tool.mode)}
            className={`flex items-center gap-1.5 px-2 py-1 text-xs font-mono border border-dashed transition-colors ${
              currentTool === tool.mode
                ? 'border-primary text-primary bg-primary/5'
                : 'border-transparent text-text-secondary hover:text-text-primary hover:border-black/25'
            }`}
          >
            <span className="w-4 text-center">{tool.icon}</span>
            <span>{tool.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function Toolbar({ currentTool, speed, onToolChange, onSpeedChange }: ToolbarProps) {
  return (
    <div className="w-36 border-r-2 border-dashed border-black/25 bg-bg-primary p-3 flex flex-col overflow-y-auto">
      <ToolSection title="actions" tools={actionTools} currentTool={currentTool} onToolChange={onToolChange} />
      <ToolSection title="crops" tools={cropTools} currentTool={currentTool} onToolChange={onToolChange} />
      <ToolSection title="sensors" tools={sensorTools} currentTool={currentTool} onToolChange={onToolChange} />
      <ToolSection title="actuators" tools={actuatorTools} currentTool={currentTool} onToolChange={onToolChange} />

      <div className="mb-3 mt-auto">
        <div className="text-[10px] font-mono uppercase tracking-wider text-text-muted mb-1.5 px-1">
          # speed
        </div>
        <div className="flex gap-1">
          {speeds.map(s => (
            <button
              key={s.value}
              onClick={() => onSpeedChange(s.value)}
              className={`flex-1 px-1 py-1 text-xs font-mono border border-dashed transition-colors ${
                speed === s.value
                  ? 'border-primary text-primary bg-primary/5'
                  : 'border-transparent text-text-secondary hover:text-text-primary hover:border-black/25'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
