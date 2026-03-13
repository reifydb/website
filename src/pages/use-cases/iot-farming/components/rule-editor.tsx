import { useState } from 'react';
import type { SensorType, Operator, ActuatorType, Rule } from '../engine/types';

interface RuleEditorProps {
  rules: Rule[];
  onAddRule: (rule: Omit<Rule, 'id'>) => void;
  onToggleRule: (id: number) => void;
  onRemoveRule: (id: number) => void;
}

export function RuleEditor({ rules, onAddRule, onToggleRule, onRemoveRule }: RuleEditorProps) {
  const [sensorType, setSensorType] = useState<SensorType>('moisture');
  const [operator, setOperator] = useState<Operator>('<');
  const [threshold, setThreshold] = useState('0.3');
  const [actuatorType, setActuatorType] = useState<ActuatorType>('sprinkler');

  const handleAdd = () => {
    const t = parseFloat(threshold);
    if (isNaN(t) || t < 0 || t > 1) return;
    onAddRule({
      sensor_type: sensorType,
      operator,
      threshold: t,
      actuator_type: actuatorType,
      enabled: true,
    });
  };

  return (
    <div className="space-y-2">
      <div className="text-[10px] font-mono uppercase tracking-wider text-text-muted">
        # automation rules
      </div>

      {/* New rule form */}
      <div className="border border-dashed border-black/25 p-2 bg-bg-secondary space-y-1.5">
        <div className="flex gap-1">
          <select
            value={sensorType}
            onChange={e => setSensorType(e.target.value as SensorType)}
            className="flex-1 text-[10px] font-mono bg-bg-primary border border-dashed border-black/25 px-1 py-0.5"
          >
            <option value="moisture">moisture</option>
            <option value="temperature">temperature</option>
            <option value="light">light</option>
          </select>
          <select
            value={operator}
            onChange={e => setOperator(e.target.value as Operator)}
            className="w-10 text-[10px] font-mono bg-bg-primary border border-dashed border-black/25 px-1 py-0.5"
          >
            <option value="<">&lt;</option>
            <option value=">">&gt;</option>
            <option value="<=">&lt;=</option>
            <option value=">=">&gt;=</option>
          </select>
          <input
            type="number"
            min="0"
            max="1"
            step="0.1"
            value={threshold}
            onChange={e => setThreshold(e.target.value)}
            className="w-12 text-[10px] font-mono bg-bg-primary border border-dashed border-black/25 px-1 py-0.5"
          />
        </div>
        <div className="flex gap-1 items-center">
          <span className="text-[10px] font-mono text-text-muted">→</span>
          <select
            value={actuatorType}
            onChange={e => setActuatorType(e.target.value as ActuatorType)}
            className="flex-1 text-[10px] font-mono bg-bg-primary border border-dashed border-black/25 px-1 py-0.5"
          >
            <option value="sprinkler">sprinkler</option>
            <option value="heater">heater</option>
            <option value="lamp">lamp</option>
          </select>
          <button
            onClick={handleAdd}
            className="text-[10px] font-mono text-primary border border-dashed border-primary px-2 py-0.5 hover:bg-primary/5 transition-colors"
          >
            [+]
          </button>
        </div>
      </div>

      {/* Existing rules */}
      {rules.map(rule => (
        <div
          key={rule.id}
          className={`border border-dashed p-1.5 text-[10px] font-mono flex items-center gap-1 ${
            rule.enabled ? 'border-primary/50 bg-primary/5' : 'border-black/15 bg-bg-secondary text-text-muted'
          }`}
        >
          <button
            onClick={() => onToggleRule(rule.id)}
            className="hover:text-primary transition-colors"
          >
            {rule.enabled ? '[•]' : '[○]'}
          </button>
          <span className="flex-1 truncate">
            {rule.sensor_type} {rule.operator} {rule.threshold} → {rule.actuator_type}
          </span>
          <button
            onClick={() => onRemoveRule(rule.id)}
            className="text-text-muted hover:text-red-500 transition-colors"
          >
            [x]
          </button>
        </div>
      ))}
    </div>
  );
}
