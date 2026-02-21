/**
 * Renders query results as a text table for snapshot testing.
 */

import { Value, NONE_VALUE } from '@reifydb/core';

/**
 * Format a single value using @reifydb/core Value.toString()
 */
function formatValue(value: unknown): string {
  if (value === null || value === undefined) {
    return NONE_VALUE;
  }
  const str = value instanceof Value ? value.toString()
    : typeof value === 'object' ? JSON.stringify(value)
    : String(value);
  // Safety net: convert raw WASM DateTime repr to readable format
  const dtMatch = str.match(/DateTime\(.*?seconds:\s*(\d+)/);
  if (dtMatch) {
    const d = new Date(Number(dtMatch[1]) * 1000);
    return d.toISOString().slice(0, 19).replace('T', ' ') + ' UTC';
  }
  // Safety net: convert raw WASM Date repr to readable format
  const dateMatch = str.match(/Date\(.*?days_since_epoch:\s*(\d+)/);
  if (dateMatch) {
    return new Date(Number(dateMatch[1]) * 86400000).toISOString().slice(0, 10);
  }
  // Safety net: convert raw WASM Time repr to readable format
  const timeMatch = str.match(/Time\(.*?nanos_since_midnight:\s*(\d+)/);
  if (timeMatch) {
    const totalNanos = Number(timeMatch[1]);
    const totalSeconds = Math.floor(totalNanos / 1e9);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }
  // Safety net: convert raw WASM Duration repr to readable format
  const durMatch = str.match(/Duration\(.*?months:\s*(\d+).*?days:\s*(\d+).*?nanos:\s*(\d+)/);
  if (durMatch) {
    const months = Number(durMatch[1]);
    const days = Number(durMatch[2]);
    const nanos = Number(durMatch[3]);
    const totalSeconds = Math.floor(nanos / 1e9);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    const parts: string[] = [];
    if (months > 0) parts.push(`${months} month${months !== 1 ? 's' : ''}`);
    if (days > 0) parts.push(`${days} day${days !== 1 ? 's' : ''}`);
    const time = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    if (h > 0 || m > 0 || s > 0) parts.push(time);
    return parts.length > 0 ? parts.join(' ') : '0 days';
  }
  return str;
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
