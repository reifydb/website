import { useState, useCallback, useRef } from 'react';
import { WsClient } from '@reifydb/client';
import { Column, Value } from '@reifydb/core';
import { QueryResult, QueryHistoryItem } from '../types';

export type { QueryResult, QueryHistoryItem };

export interface ReifyQueryState {
  isExecuting: boolean;
  result: QueryResult | null;
  error: string | null;
  executionTime: number | null;
}

export interface ReifyQueryOptions {
  onSuccess?: (result: QueryResult) => void;
  onError?: (error: string) => void;
  addToHistory?: boolean;
}

export function useQuery(client: WsClient | null, options: ReifyQueryOptions = {}) {
  const [state, setState] = useState<ReifyQueryState>({
    isExecuting: false,
    result: null,
    error: null,
    executionTime: null,
  });

  const [history, setHistory] = useState<QueryHistoryItem[]>([]);
  const abortControllerRef = useRef<AbortController | null>(null);

  const executeQuery = useCallback(
    async (query: string): Promise<QueryResult | null> => {
      console.log('[useQuery] Executing query:', query);
      console.log('[useQuery] Client available:', !!client);
      
      if (!client) {
        const errorMessage = 'No connection to ReifyDB server';
        console.error('[useQuery] No client available:', errorMessage);
        // Don't use setState here - it affects all instances
        options.onError?.(errorMessage);
        return null;
      }

      if (!query.trim()) {
        const errorMessage = 'Query cannot be empty';
        options.onError?.(errorMessage);
        return null;
      }

      // Cancel any ongoing query for THIS instance only
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      setState({
        isExecuting: true,
        result: null,
        error: null,
        executionTime: null,
      });

      const startTime = Date.now();

      try {
        // Use client.query() with empty schemas array - cast to bypass TypeScript issue
        const frames = await (client as any).query(query, null, []);

        const executionTime = Date.now() - startTime;

        // Transform the response to our QueryResult format
        let queryResult: QueryResult;

        // The client.query returns an array of frames (one per statement)
        // Each frame is an array of rows, where each row is an object with Value types
        const firstFrame = frames?.[0] as Array<Record<string, Value>> | undefined;

        if (Array.isArray(firstFrame) && firstFrame.length > 0) {
          // Extract columns from the first row
          const firstRow = firstFrame[0];
          const columns: Column[] = Object.keys(firstRow).map((key) => {
            const value = firstRow[key];

            // Get the type from the Value object
            const dataType = value?.type || 'Utf8';

            return {
              name: key,
              ty: dataType,
              data: [], // We'll populate this if needed for columnar format
            };
          });

          // Keep rows as Value objects for now
          const rows = firstFrame;

          queryResult = {
            columns,
            rows,
            executionTimeMs: executionTime,
          };
        } else {
          // Empty result set or no frames returned
          queryResult = {
            columns: [],
            rows: [],
            executionTimeMs: executionTime,
          };
        }

        setState({
          isExecuting: false,
          result: queryResult,
          error: null,
          executionTime,
        });

        // Add to history if enabled
        if (options.addToHistory !== false) {
          const historyItem: QueryHistoryItem = {
            id: Date.now().toString(),
            query,
            timestamp: Date.now(),
            executionTimeMs: executionTime,
            success: true,
          };
          setHistory((prev) => [historyItem, ...prev].slice(0, 100));
        }

        options.onSuccess?.(queryResult);
        return queryResult;
      } catch (err) {
        const executionTime = Date.now() - startTime;
        let errorMessage = 'Query execution failed';

        if (err instanceof Error) {
          errorMessage = err.message;
        } else if (typeof err === 'string') {
          errorMessage = err;
        } else if (err && typeof err === 'object' && 'message' in err) {
          errorMessage = (err as { message: string }).message;
        }

        setState({
          isExecuting: false,
          result: null,
          error: errorMessage,
          executionTime,
        });

        // Add to history if enabled
        if (options.addToHistory !== false) {
          const historyItem: QueryHistoryItem = {
            id: Date.now().toString(),
            query,
            timestamp: Date.now(),
            executionTimeMs: executionTime,
            success: false,
            error: errorMessage,
          };
          setHistory((prev) => [historyItem, ...prev].slice(0, 100));
        }

        options.onError?.(errorMessage);
        return null;
      } finally {
        abortControllerRef.current = null;
      }
    },
    [client, options]
  );

  const clearResults = useCallback(() => {
    setState({
      isExecuting: false,
      result: null,
      error: null,
      executionTime: null,
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const cancelQuery = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setState((prev) => ({
        ...prev,
        isExecuting: false,
        error: 'Query cancelled',
      }));
    }
  }, []);

  return {
    // State
    isExecuting: state.isExecuting,
    result: state.result,
    error: state.error,
    executionTime: state.executionTime,
    history,

    // Actions
    executeQuery,
    clearResults,
    clearHistory,
    cancelQuery,
  };
}
