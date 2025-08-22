import { Column, Value } from '@reifydb/core';

export interface QueryResult {
  columns: Column[];
  rows: Array<Record<string, Value>>;
  executionTimeMs: number;
  rowsAffected?: number;
}

export interface QueryHistoryItem {
  id: string;
  query: string;
  timestamp: number;
  executionTimeMs: number;
  success: boolean;
  error?: string;
}