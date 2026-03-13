import { useMemo, useState, useCallback, useEffect } from 'react';
import { Console } from '@reifydb/console';
import '@reifydb/console/styles.css';
import { createFarmExecutor } from '../engine/farm-db';

const DEFAULT_HEIGHT = 320;
const MIN_HEIGHT = 150;
const MAX_HEIGHT = 1200;

export function ConsolePanel() {
  const executor = useMemo(() => createFarmExecutor(), []);
  const [height, setHeight] = useState(DEFAULT_HEIGHT);
  const [dragging, setDragging] = useState<{ startY: number; startHeight: number } | null>(null);

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
      <div className="h-[calc(100%-6px)]">
        <Console
          executor={executor}
          initialCode="FROM farm::crops"
          historyKey="iot-farming"
        />
      </div>
    </div>
  );
}
