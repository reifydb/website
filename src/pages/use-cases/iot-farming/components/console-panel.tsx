import { useMemo, useState, useCallback, useEffect } from 'react';
import { Console } from '@reifydb/console';
import '@reifydb/console/styles.css';
import { createFarmExecutor } from '../engine/farm-db';

const DEFAULT_HEIGHT = 320;
const MIN_HEIGHT = 150;
const MAX_HEIGHT = 1200;

const COOKBOOK_QUERIES = [
  { label: 'Crop Summary', query: 'FROM farm::crop_summary' },
  { label: 'Soil Overview', query: 'FROM farm::soil_overview' },
  { label: 'Alerts', query: 'FROM farm::alerts' },
  { label: 'Aggregation', query: 'FROM farm::tiles | aggregate { avg: math::avg(moisture) } by { soil_type }' },
  { label: 'Filter + Sort', query: 'FROM farm::crops | FILTER health < 0.5 | sort { health }' },
  { label: 'Latest Readings', query: 'FROM farm::latest_readings' },
];

export function ConsolePanel() {
  const executor = useMemo(() => createFarmExecutor(), []);
  const [height, setHeight] = useState(DEFAULT_HEIGHT);
  const [dragging, setDragging] = useState<{ startY: number; startHeight: number } | null>(null);
  const [activeQuery, setActiveQuery] = useState('FROM farm::crops');
  const [consoleKey, setConsoleKey] = useState(0);

  const loadQuery = useCallback((query: string) => {
    setActiveQuery(query);
    setConsoleKey(k => k + 1);
  }, []);

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setDragging({ startY: e.clientY, startHeight: height });
    },
    [height],
  );

  useEffect(() => {
    if (!dragging) return;

    const onMouseMove = (e: MouseEvent) => {
      const newHeight = Math.min(MAX_HEIGHT, Math.max(MIN_HEIGHT, dragging.startHeight + (dragging.startY - e.clientY)));
      setHeight(newHeight);
    };

    const onMouseUp = () => setDragging(null);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [dragging]);

  return (
    <div className="absolute bottom-0 left-0 right-0 z-50 shadow-[0_-2px_8px_rgba(0,0,0,0.15)]" style={{ height }}>
      {/* Drag handle */}
      <div
        onMouseDown={onMouseDown}
        className="h-1.5 cursor-row-resize border-t-2 border-dashed border-black/25 flex items-center justify-center"
      >
        <div className="w-8 h-0.5 rounded bg-black/25" />
      </div>
      {/* Cookbook query buttons */}
      <div className="flex items-center gap-1 px-2 py-1 bg-bg-secondary border-b border-black/10 overflow-x-auto">
        <span className="text-[10px] font-mono text-text-muted whitespace-nowrap mr-1">Cookbook:</span>
        {COOKBOOK_QUERIES.map(({ label, query }) => (
          <button
            key={label}
            onClick={() => loadQuery(query)}
            className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-black/15 bg-bg-primary text-text-muted hover:text-text-primary hover:border-black/30 whitespace-nowrap transition-colors"
          >
            {label}
          </button>
        ))}
      </div>
      <div className="h-[calc(100%-6px-28px)]">
        <Console
          key={consoleKey}
          executor={executor}
          initialCode={activeQuery}
          historyKey="iot-farming"
        />
      </div>
    </div>
  );
}
