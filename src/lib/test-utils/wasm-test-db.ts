/**
 * Test utilities for WASM database
 */

import { createWasmDB, type WasmDB } from '../wasm-db';
import { seedCommand } from '../seed-data';
import { renderFrame } from './render-frame';
import type { CodeExample } from '../examples';

export interface ExecutionResult {
  success: boolean;
  data?: unknown[];
  error?: string;
}

export interface VerificationResult {
  success: boolean;
  error?: string;
  actual?: string;
}

/**
 * Creates a fresh WASM database instance seeded with test data.
 */
export async function createTestDB(): Promise<WasmDB> {
  const db = await createWasmDB();
  db.admin(seedCommand);
  return db;
}

/**
 * Executes RQL code against the database and returns the result.
 * Uses db.admin() to match the website's ExecutableSnippet behavior,
 * which supports both queries and DDL/DML operations.
 */
export function executeExample(db: WasmDB, code: string): ExecutionResult {
  try {
    const result = db.admin(code);
    const data = Array.isArray(result) ? result : [];
    return { success: true, data };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

/**
 * Verifies an example by executing it and comparing the result against the expected snapshot.
 */
export function verifyExample(
  db: WasmDB,
  example: CodeExample
): VerificationResult {
  const result = executeExample(db, example.code);

  if (example.expectsError) {
    return result.success
      ? { success: false, error: 'Expected error but query succeeded' }
      : { success: true };
  }

  if (!result.success) {
    return { success: false, error: result.error };
  }

  const actual = renderFrame(result.data ?? []);

  // If expected provided, compare rendered output
  if (example.expected !== undefined) {
    if (actual !== example.expected) {
      return {
        success: false,
        error: `Snapshot mismatch:\n\nExpected:\n${example.expected}\n\nActual:\n${actual}`,
        actual,
      };
    }
  }

  return { success: true, actual };
}
