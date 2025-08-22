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
    if (actualValue === true) return 'true';
    if (actualValue === false) return 'false';
    if (typeof actualValue === 'bigint') return actualValue.toString();
    
    if (actualValue instanceof Date) {
      return actualValue.toLocaleString('en-US', {
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
      const hex = Array.from(actualValue)
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('');
      return '0x' + hex.match(/.{1,4}/g)?.join(' ') || hex;
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
        result.columns.map(col => formatValue(row[col.name])).join(',')
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


  const renderValue = useCallback((valueType: ValueType, formattedValue: string) => {
    if (formattedValue === 'NULL') {
      return <span className={styles.nullValue}>NULL</span>;
    }

    switch (valueType) {
      case 'json':
        try {
          const parsed = JSON.parse(formattedValue);
          return (
            <pre className={styles.jsonValue}>
              {JSON.stringify(parsed, null, 2)}
            </pre>
          );
        } catch {
          return <span className={styles.stringValue}>{formattedValue}</span>;
        }

      case 'blob':
        return (
          <span className={styles.blobValue}>
            {formattedValue.length > 50 ? 
              formattedValue.substring(0, 50) + '...' : 
              formattedValue
            }
          </span>
        );

      case 'boolean':
        return (
          <span className={`${styles.booleanValue} ${formattedValue === 'true' ? styles.true : styles.false}`}>
            {formattedValue === 'true' ? '✓' : '✗'} {formattedValue}
          </span>
        );

      case 'date':
        return (
          <span className={styles.dateValue}>
            📅 {formattedValue}
          </span>
        );

      case 'number':
        return <span className={styles.numberValue}>{formattedValue}</span>;

      default:
        return (
          <span className={styles.stringValue}>
            {formattedValue.length > 100 ? 
              formattedValue.substring(0, 100) + '...' : 
              formattedValue
            }
          </span>
        );
    }
  }, []);

  const renderCell = useCallback((row: Record<string, Value>, column: any, colIndex: number) => {
    const value = row[column.name];
    const formattedValue = formatValue(value);
    const valueType = getValueType(value);
    
    return (
      <td 
        key={colIndex}
        className={`${styles.dataCell} ${styles[`type-${valueType}`]}`}
      >
        <div className={styles.cellContent}>
          {renderValue(valueType, formattedValue)}
        </div>
      </td>
    );
  }, [formatValue, getValueType, renderValue]);

  const renderHeader = useCallback(() => {
    if (!result) return null;

    return (
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
            onClick={exportToCsv}
            title="Export as CSV"
          >
            📥 Export CSV
          </button>
        </div>
      </div>
    );
  }, [result, exportToCsv]);

  const renderTable = useCallback(() => {
    if (!result) return null;

    const hasRows = result.rows.length > 0;

    return (
      <div 
        className={styles.tableWrapper}
      >
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
            {hasRows ? (
              sortedRows.map((row, rowIndex) => (
                <tr key={rowIndex} className={styles.dataRow}>
                  <td className={styles.rowNumber}>{rowIndex + 1}</td>
                  {result.columns.map((column, colIndex) => 
                    renderCell(row, column, colIndex)
                  )}
                </tr>
              ))
            ) : (
              <tr className={styles.emptyRow}>
                <td className={styles.rowNumber}>-</td>
                <td colSpan={result.columns.length} className={styles.emptyMessage}>
                  <div className={styles.emptyTableState}>
                    <p>Query executed successfully</p>
                    <p className={styles.hint}>No rows returned</p>
                    {result.rowsAffected !== undefined && (
                      <p className={styles.stats}>{result.rowsAffected} rows affected</p>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }, [result, sortColumn, sortDirection, handleSort, sortedRows, renderCell]);

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

  return (
    <div className={styles.resultContainer}>
      {renderHeader()}
      {renderTable()}
    </div>
  );
}