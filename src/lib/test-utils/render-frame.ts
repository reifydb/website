/**
 * Renders query results as a text table for snapshot testing.
 */

import { Value, UNDEFINED_VALUE } from '@reifydb/core';

/**
 * Format a single value using @reifydb/core Value.toString()
 */
function formatValue(value: unknown): string {
  if (value === null || value === undefined) {
    return UNDEFINED_VALUE;
  }
  if (value instanceof Value) {
    return value.toString();
  }
  if (typeof value === 'object') {
    return JSON.stringify(value);
  }
  return String(value);
}

/**
 * Renders a query result as a text table (like SQL CLI output)
 *
 * Example output:
 * ```
 * name  | age | active
 * ------+-----+-------
 * Alice | 30  | true
 * Bob   | 25  | false
 * ```
 */
export function renderFrame(data: unknown[]): string {
  if (!Array.isArray(data) || data.length === 0) {
    return '(empty)';
  }

  // Get column names from first row
  const columns = Object.keys(data[0] as Record<string, unknown>);

  // Format all values using @reifydb/core
  const formattedRows = data.map((row) =>
    columns.map((col) => formatValue((row as Record<string, unknown>)[col]))
  );

  // Calculate column widths
  const widths = columns.map((col, i) =>
    Math.max(col.length, ...formattedRows.map((row) => row[i].length))
  );

  // Build table (trimEnd removes trailing whitespace from last column)
  const header = columns
    .map((col, i) => col.padEnd(widths[i]))
    .join(' | ')
    .trimEnd();
  const separator = widths.map((w) => '-'.repeat(w)).join('-+-');
  const rows = formattedRows.map((row) =>
    row
      .map((val, i) => val.padEnd(widths[i]))
      .join(' | ')
      .trimEnd()
  );

  return [header, separator, ...rows].join('\n');
}
