import React, { useState, useMemo } from 'react';
import { Value } from '@reifydb/core';
import { QueryResult } from '../../types';
import styles from './styles.module.css';

interface ResultViewerProps {
  result: QueryResult | undefined;
  error: string | undefined;
  isLoading: boolean;
}

export default function ResultViewer({ result, error, isLoading }: ResultViewerProps) {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [copiedCell, setCopiedCell] = useState<{ row: number; col: number } | null>(null);
  if (isLoading) {
    return (
      <div className={styles.centerContent}>
        <div className={styles.loader}>
          <div className={styles.spinner}></div>
          <p>Executing query...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorHeader}>
          <span className={styles.errorIcon}>⚠️</span>
          <span>Query Error</span>
        </div>
        <pre className={styles.errorMessage}>{error}</pre>
      </div>
    );
  }

  if (!result) {
    return (
      <div className={styles.centerContent}>
        <div className={styles.emptyState}>
          <p>No results to display</p>
          <p className={styles.hint}>Execute a query to see results here</p>
        </div>
      </div>
    );
  }

  if (result.rows.length === 0) {
    return (
      <div className={styles.centerContent}>
        <div className={styles.emptyState}>
          <p>Query executed successfully</p>
          <p className={styles.hint}>No rows returned</p>
          {result.rowsAffected !== undefined && (
            <p className={styles.stats}>{result.rowsAffected} rows affected</p>
          )}
        </div>
      </div>
    );
  }

  const formatValue = (value: Value | undefined): string | undefined => {
    if (value === undefined) return 'NULL';
    
    const actualValue = value.valueOf();
    if (actualValue === undefined || actualValue === null) return undefined;
    if (actualValue === true) return 'true';
    if (actualValue === false) return 'false';
    if (typeof actualValue === 'bigint') return actualValue.toString();
    if (actualValue instanceof Date) {
      return new Date(actualValue).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
    }
    if (actualValue instanceof Uint8Array) {
      // Format blob as hex with better readability
      const hex = Array.from(actualValue)
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('');
      // Add spaces every 4 hex characters for readability
      return '0x' + hex.match(/.{1,4}/g)?.join(' ') || hex;
    }
    return String(actualValue);
  };

  const getValueType = (value: Value | undefined): string => {
    if (value === undefined) return 'null';
    const actualValue = value.valueOf();
    if (actualValue === undefined || actualValue === null) return 'null';
    if (typeof actualValue === 'boolean') return 'boolean';
    if (typeof actualValue === 'bigint') return 'number';
    if (typeof actualValue === 'number') return 'number';
    if (typeof actualValue === 'string') {
      // Try to detect if it's JSON
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
    if (actualValue instanceof Date) return 'date';
    if (actualValue instanceof Uint8Array) return 'blob';
    return 'unknown';
  };

  const formatJSON = (str: string): React.ReactNode => {
    try {
      const parsed = JSON.parse(str);
      return (
        <pre className={styles.jsonValue}>
          {JSON.stringify(parsed, null, 2)}
        </pre>
      );
    } catch {
      return str;
    }
  };

  const handleCopyCell = async (value: string, rowIndex: number, colIndex: number) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedCell({ row: rowIndex, col: colIndex });
      setTimeout(() => setCopiedCell(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleSort = (columnName: string) => {
    if (sortColumn === columnName) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnName);
      setSortDirection('asc');
    }
  };

  const sortedRows = useMemo(() => {
    if (!result || !sortColumn) return result?.rows || [];
    
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

  return (
    <div className={styles.resultContainer}>
      <div className={styles.resultHeader}>
        <div className={styles.resultStats}>
          <span className={styles.rowCount}>
            <span className={styles.statIcon}>📊</span>
            {result.rows.length} row{result.rows.length !== 1 ? 's' : ''}
          </span>
          <span className={styles.executionTime}>
            <span className={styles.statIcon}>⏱️</span>
            {result.executionTimeMs}ms
          </span>
        </div>
        <div className={styles.resultActions}>
          <button 
            className={styles.exportButton}
            onClick={() => {
              const csv = [result.columns.map(c => c.name).join(',')]
                .concat(result.rows.map(row => 
                  result.columns.map(col => formatValue(row[col.name]) || '').join(',')
                ))
                .join('\n');
              const blob = new Blob([csv], { type: 'text/csv' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `query-results-${Date.now()}.csv`;
              a.click();
              URL.revokeObjectURL(url);
            }}
            title="Export as CSV"
          >
            📥 Export CSV
          </button>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.resultTable}>
          <thead>
            <tr>
              <th className={styles.rowNumberHeader}>#</th>
              {result.columns.map((column, index) => (
                <th 
                  key={index}
                  className={styles.sortableHeader}
                  onClick={() => handleSort(column.name)}
                >
                  <div className={styles.columnHeader}>
                    <div className={styles.columnInfo}>
                      <span className={styles.columnName}>{column.name}</span>
                      <span className={styles.columnType}>{column.ty}</span>
                    </div>
                    <span className={styles.sortIndicator}>
                      {sortColumn === column.name && (
                        sortDirection === 'asc' ? '▲' : '▼'
                      )}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedRows.map((row, rowIndex) => (
              <tr key={rowIndex} className={styles.dataRow}>
                <td className={styles.rowNumber}>{rowIndex + 1}</td>
                {result.columns.map((column, colIndex) => {
                  const value = row[column.name];
                  const formattedValue = formatValue(value);
                  const valueType = getValueType(value);
                  const isNull = formattedValue === 'NULL';
                  const isCopied = copiedCell?.row === rowIndex && copiedCell?.col === colIndex;
                  
                  return (
                    <td 
                      key={colIndex}
                      className={`${styles.dataCell} ${styles[`type-${valueType}`]}`}
                      onClick={() => !isNull && formattedValue && handleCopyCell(formattedValue, rowIndex, colIndex)}
                      title={!isNull ? 'Click to copy' : undefined}
                    >
                      <div className={styles.cellContent}>
                        {isNull ? (
                          <span className={styles.nullValue}>NULL</span>
                        ) : valueType === 'json' && formattedValue ? (
                          formatJSON(formattedValue)
                        ) : valueType === 'blob' && formattedValue ? (
                          <span className={styles.blobValue}>
                            {formattedValue.length > 50 ? 
                              formattedValue.substring(0, 50) + '...' : 
                              formattedValue
                            }
                          </span>
                        ) : valueType === 'boolean' ? (
                          <span className={`${styles.booleanValue} ${formattedValue === 'true' ? styles.true : styles.false}`}>
                            {formattedValue === 'true' ? '✓' : '✗'} {formattedValue}
                          </span>
                        ) : valueType === 'date' ? (
                          <span className={styles.dateValue}>
                            📅 {formattedValue}
                          </span>
                        ) : valueType === 'number' ? (
                          <span className={styles.numberValue}>
                            {formattedValue}
                          </span>
                        ) : (
                          <span className={styles.stringValue}>
                            {formattedValue && formattedValue.length > 100 ? 
                              formattedValue.substring(0, 100) + '...' : 
                              formattedValue
                            }
                          </span>
                        )}
                        {isCopied && (
                          <span className={styles.copiedIndicator}>Copied!</span>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}