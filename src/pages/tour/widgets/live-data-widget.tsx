import { useState, useEffect, useRef, useCallback } from 'react';
import { getWasmDB, getWasmDBSync } from '@/lib/wasm-db-singleton';

const EVENT_TYPES = [
  { label: '[+ add login]', type: 'login' },
  { label: '[+ add purchase]', type: 'purchase' },
  { label: '[+ add error]', type: 'error' },
] as const;

export function LiveDataWidget() {
  const [dbReady, setDbReady] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const [lastInserted, setLastInserted] = useState<string | null>(null);
  const nextIdRef = useRef(1);

  useEffect(() => {
    const init = async () => {
      let db = getWasmDBSync();
      if (!db) {
        db = await getWasmDB();
      }
      // Create namespace (no-op if already exists)
      try {
        db.admin('create namespace tour');
      } catch { /* already exists */ }
      // Create table (no-op if already exists)
      try {
        db.admin('create table tour::events { id: int4, type: utf8, value: int4 }');
      } catch { /* already exists */ }
      // Get current row count to avoid id conflicts
      try {
        const rows = db.admin('from tour::events') as Record<string, unknown>[];
        const currentCount = Array.isArray(rows) ? rows.length : 0;
        nextIdRef.current = currentCount + 1;
        setRowCount(currentCount);
      } catch { /* table might be empty */ }
      setDbReady(true);
    };
    init();
  }, []);

  const insertRow = useCallback(async (type: string) => {
    const db = getWasmDBSync();
    if (!db) return;
    const id = nextIdRef.current;
    try {
      db.admin(`INSERT tour::events [{ id: ${id}, type: "${type}", value: 1 }]`);
      nextIdRef.current = id + 1;
      setRowCount(prev => prev + 1);
      setLastInserted(type);
    } catch (err) {
      console.error('Insert failed:', err);
    }
  }, []);

  return (
    <div className="border-2 border-dashed border-black/25 bg-bg-secondary">
      <div className="px-4 py-2 border-b border-dashed border-black/25 bg-bg-primary font-mono text-xs">
        <span className="text-primary">$</span> <span className="text-text-muted">live data widget :: tour::events</span>
      </div>
      <div className="p-4 space-y-4">
        {!dbReady ? (
          <p className="font-mono text-xs text-text-muted animate-pulse">$ initializing database...</p>
        ) : (
          <>
            {/* Row count display */}
            <div className="font-mono text-sm border border-dashed border-black/25 px-3 py-2 bg-bg-primary">
              <span className="text-text-muted">rows in </span>
              <span className="text-primary">tour::events</span>
              <span className="text-text-muted">: </span>
              <span className="text-primary font-bold">{rowCount}</span>
              {lastInserted && (
                <span className="text-text-muted ml-3 text-xs">← last insert: {lastInserted}</span>
              )}
            </div>
            {/* Insert buttons */}
            <div className="flex flex-wrap gap-2">
              {EVENT_TYPES.map(({ label, type }) => (
                <button
                  key={type}
                  onClick={() => insertRow(type)}
                  className="font-mono text-xs border border-primary/50 text-primary hover:bg-primary/10 hover:border-primary px-3 py-1.5 transition-colors"
                >
                  {label}
                </button>
              ))}
            </div>
            <p className="text-xs text-text-muted font-mono">
              $ insert rows above, then run the query below to see counts by type
            </p>
          </>
        )}
      </div>
    </div>
  );
}
