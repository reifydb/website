import React, { useState, useMemo, useCallback } from 'react';
import { Value } from '@reifydb/core';
import { QueryResult } from '../../types';
import styles from './styles.module.css';

interface ResultViewerProps {
  result: QueryResult | undefined;
  error: string | undefined;
  isLoading: boolean;
}

type ValueType = 'null' | 'boolean' | 'number' | 'string' | 'date' | 'blob' | 'json' | 'unknown';
type SortDirection = 'asc' | 'desc';

export default function ResultViewer({ result, error, isLoading }: ResultViewerProps) {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const formatValue = useCallback((value: Value | undefined): string => {
    if (value === undefined) return 'NULL';

    const actualValue = value.valueOf();
    if (actualValue === undefined || actualValue === null) return 'NULL';
    if (actualValue === true) return 'TRUE';
    if (actualValue === false) return 'FALSE';
    if (typeof actualValue === 'bigint') return actualValue.toString();

    if (actualValue instanceof Date) {
      return actualValue.toISOString().replace('T', ' ').substring(0, 19);
    }

    if (actualValue instanceof Uint8Array) {
      const hex = Array.from(actualValue)
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('');
      return '0x' + (hex.length > 16 ? hex.substring(0, 16) + '...' : hex);
    }

    return String(actualValue);
  }, []);

  const getValueType = useCallback((value: Value | undefined): ValueType => {
    if (value === undefined) return 'null';
    const actualValue = value.valueOf();
    if (actualValue === undefined || actualValue === null) return 'null';
    if (typeof actualValue === 'boolean') return 'boolean';
    if (typeof actualValue === 'bigint' || typeof actualValue === 'number') return 'number';
    if (actualValue instanceof Date) return 'date';
    if (actualValue instanceof Uint8Array) return 'blob';

    if (typeof actualValue === 'string') {
      if ((actualValue.startsWith('{') && actualValue.endsWith('}')) ||
          (actualValue.startsWith('[') && actualValue.endsWith(']'))) {
        try {
          JSON.parse(actualValue);
          return 'json';
        } catch {
          return 'string';
        }
      }
      return 'string';
    }

    return 'unknown';
  }, []);

  const handleSort = useCallback((columnName: string) => {
    if (sortColumn === columnName) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnName);
      setSortDirection('asc');
    }
  }, [sortColumn, sortDirection]);

  const sortedRows = useMemo(() => {
    if (!result || !sortColumn || result.rows.length === 0) {
      return result?.rows || [];
    }

    return [...result.rows].sort((a, b) => {
      const aVal = a[sortColumn]?.valueOf();
      const bVal = b[sortColumn]?.valueOf();

      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;

      let comparison = 0;
      if (aVal < bVal) comparison = -1;
      if (aVal > bVal) comparison = 1;

      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [result, sortColumn, sortDirection]);

  const exportToCsv = useCallback(() => {
    if (!result) return;

    const csv = [
      result.columns.map(c => c.name).join(','),
      ...result.rows.map(row =>
        result.columns.map(col => {
          const val = formatValue(row[col.name]);
          return val.includes(',') ? `"${val}"` : val;
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `query-results-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [result, formatValue]);

  if (isLoading) {
    return (
      <div className={styles.brutalistContainer}>
        <div className={styles.loadingBox}>
          <div className={styles.loadingSpinner}></div>
          <span className={styles.loadingText}>EXECUTING QUERY</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.brutalistContainer}>
        <div className={styles.errorBox}>
          <div className={styles.errorHeader}>
            <span className={styles.errorLabel}>ERROR</span>
          </div>
          <pre className={styles.errorMessage}>{error}</pre>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className={styles.brutalistContainer}>
        <div className={styles.emptyBox}>
          <span className={styles.emptyText}>NO RESULTS</span>
          <span className={styles.emptyHint}>EXECUTE A QUERY TO SEE RESULTS</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.brutalistContainer}>
      <div className={styles.tableContainer}>
        <table className={styles.brutalistTable}>
          <thead>
            <tr>
              <th className={styles.indexHeader}>#</th>
              {result.columns.map((column, index) => (
                <th
                  key={index}
                  className={styles.columnHeader}
                  onClick={() => handleSort(column.name)}
                >
                  <div className={styles.headerContent}>
                    <span className={styles.columnName}>{column.name}</span>
                    <span className={styles.columnType}>{column.type}</span>
                    {sortColumn === column.name && (
                      <span className={styles.sortArrow}>
                        {sortDirection === 'asc' ? '▲' : '▼'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedRows.length > 0 ? (
              sortedRows.map((row, rowIndex) => (
                <tr key={rowIndex} className={styles.dataRow}>
                  <td className={styles.indexCell}>{rowIndex + 1}</td>
                  {result.columns.map((column, colIndex) => {
                    const value = row[column.name];
                    const formattedValue = formatValue(value);
                    const valueType = getValueType(value);

                    return (
                      <td
                        key={colIndex}
                        className={`${styles.dataCell} ${styles[`type-${valueType}`]}`}
                      >
                        {valueType === 'null' ? (
                          <span className={styles.nullValue}>NULL</span>
                        ) : valueType === 'boolean' ? (
                          <span className={`${styles.boolValue} ${formattedValue === 'TRUE' ? styles.true : styles.false}`}>
                            {formattedValue}
                          </span>
                        ) : valueType === 'json' ? (
                          <code className={styles.jsonValue}>
                            {formattedValue.length > 50 ? formattedValue.substring(0, 50) + '...' : formattedValue}
                          </code>
                        ) : (
                          <span className={styles.cellValue}>
                            {formattedValue}
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={result.columns.length + 1} className={styles.noDataCell}>
                  <div className={styles.noDataBox}>
                    <span>QUERY EXECUTED SUCCESSFULLY</span>
                    <span className={styles.noDataHint}>NO ROWS RETURNED</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className={styles.resultHeader}>
        <div className={styles.statsBox}>
          <span className={styles.statItem}>
            ROWS: <strong>{result.rows.length}</strong>
          </span>
          {result.rowsAffected !== undefined && (
            <span className={styles.statItem}>
              AFFECTED: <strong>{result.rowsAffected}</strong>
            </span>
          )}
        </div>
        <button
          className={styles.brutalistButton}
          onClick={exportToCsv}
        >
          EXPORT CSV
        </button>
      </div>
    </div>
  );
}