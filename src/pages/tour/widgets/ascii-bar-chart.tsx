import { useState, useCallback, useEffect } from 'react';
import { getWasmDB, getWasmDBSync } from '@/lib/wasm-db-singleton';

interface BarData {
  label: string;
  value: number;
}

interface AsciiBarChartProps {
  query: string;
  labelKey: string;
  valueKey: string;
}

export function AsciiBarChart({ query, labelKey, valueKey }: AsciiBarChartProps) {
  const [data, setData] = useState<BarData[]>([]);
  const [status, setStatus] = useState<'idle' | 'running' | 'done' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const runQuery = useCallback(async () => {
    setStatus('running');
    setError(null);
    try {
      let db = getWasmDBSync();
      if (!db) {
        db = await getWasmDB();
      }
      const result = db.admin(query) as Record<string, unknown>[];
      const bars: BarData[] = (Array.isArray(result) ? result : []).map(row => ({
        label: String(row[labelKey] ?? ''),
        value: Number(row[valueKey] ?? 0),
      }));
      setData(bars);
      setStatus('done');
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setStatus('error');
    }
  }, [query, labelKey, valueKey]);

  // Auto-run if DB is already initialized (e.g. user ran the snippet above)
  useEffect(() => {
    if (getWasmDBSync()) {
      runQuery();
    }
  }, [runQuery]);

  const max = data.length > 0 ? Math.max(...data.map(d => d.value)) : 0;
  const maxLabelLen = data.length > 0 ? Math.max(...data.map(d => d.label.length)) : 8;

  return (
    <div className="border-2 border-dashed border-white/15 bg-bg-tertiary">
      <div className="flex justify-between items-center px-4 py-2 border-b border-dashed border-white/15 bg-bg-elevated">
        <span className="font-mono text-xs"><span className="text-primary">$</span> <span className="text-text-muted">ascii bar chart</span></span>
        <button
          onClick={runQuery}
          disabled={status === 'running'}
          className="font-mono text-xs text-text-muted hover:text-primary transition-colors disabled:opacity-50"
        >
          {status === 'running' ? '[running...]' : '[refresh]'}
        </button>
      </div>
      <div className="p-4 font-mono text-xs">
        {status === 'idle' && (
          <p className="text-text-muted">$ run the query above, then click [refresh] to render chart</p>
        )}
        {status === 'error' && (
          <p className="text-status-error">ERR: {error}</p>
        )}
        {status === 'done' && data.length === 0 && (
          <p className="text-text-muted">$ no data returned</p>
        )}
        {data.length > 0 && (
          <div className="space-y-2">
            {data.map(({ label, value }) => {
              const pct = max > 0 ? (value / max) * 100 : 0;
              const displayVal = Number.isInteger(value) ? value.toString() : value.toFixed(2);
              return (
                <div key={label} className="flex items-center gap-3">
                  <span
                    className="text-text-secondary shrink-0"
                    style={{ minWidth: `${maxLabelLen}ch` }}
                  >
                    {label.padEnd(maxLabelLen)}
                  </span>
                  <div className="flex-1 flex items-center gap-2 min-w-0">
                    <div
                      className="h-4 bg-primary/70 shrink-0"
                      style={{ width: `${Math.max(pct, 1)}%` }}
                    />
                    <span className="text-primary shrink-0">{displayVal}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
