export type LiveRow = Record<string, unknown>;

export interface LiveChange {
  key: string;
  kind: 'insert' | 'update' | 'remove';
  row: LiveRow;
  cells: { column: string; before: unknown; after: unknown }[];
}

export function changesOf(previous: LiveRow[] | null, rows: LiveRow[], key: string, columns: string[]): LiveChange[] {
  if (!previous) return [];
  const before = new Map(previous.map((row) => [String(row[key]), row]));
  const changes: LiveChange[] = [];
  for (const row of rows) {
    const id = String(row[key]);
    const old = before.get(id);
    before.delete(id);
    if (!old) {
      changes.push({ key: id, kind: 'insert', row, cells: [] });
      continue;
    }
    const cells = columns.filter((column) => String(old[column]) !== String(row[column])).map((column) => ({ column, before: old[column], after: row[column] }));
    if (cells.length) changes.push({ key: id, kind: 'update', row, cells });
  }
  for (const [id, row] of before) changes.push({ key: id, kind: 'remove', row, cells: [] });
  return changes;
}
