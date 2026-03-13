import { useState, useEffect } from 'react';
import type { WasmDB } from '@reifydb/wasm';
import { getFarmDB, destroyFarmDB } from '../engine/farm-db';

export function useFarmDB() {
  const [db, setDb] = useState<WasmDB | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    getFarmDB()
      .then(instance => {
        if (!cancelled) {
          setDb(instance);
          setLoading(false);
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err?.message || 'Failed to initialize farm database');
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
      destroyFarmDB();
    };
  }, []);

  return { db, loading, error };
}
