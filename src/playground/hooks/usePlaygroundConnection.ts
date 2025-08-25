import { useState, useCallback } from 'react';
import { useConnection } from '../../hooks/useConnection';
import { useQuery, type QueryResult } from '../../hooks/useQuery';
import { Column, Utf8Value, Int4Value, BoolValue, DateTimeValue } from '@reifydb/core';
import { REIFYDB_CONFIG } from '../../config';
import { TableInfo } from '../types';

// Mock data for demonstration - will be replaced with WebSocket connection
const MOCK_SCHEMA: TableInfo[] = [
  {
    name: 'users',
    columns: [
      { name: 'id', dataType: 'INTEGER', nullable: false },
      { name: 'name', dataType: 'TEXT', nullable: false },
      { name: 'email', dataType: 'TEXT', nullable: true },
      { name: 'created_at', dataType: 'TIMESTAMP', nullable: true },
    ],
    indexes: ['PRIMARY KEY (id)', 'UNIQUE (email)'],
    rowCount: 3,
  },
  {
    name: 'posts',
    columns: [
      { name: 'id', dataType: 'INTEGER', nullable: false },
      { name: 'user_id', dataType: 'INTEGER', nullable: true },
      { name: 'title', dataType: 'TEXT', nullable: false },
      { name: 'content', dataType: 'TEXT', nullable: true },
      { name: 'published', dataType: 'BOOLEAN', nullable: true },
      { name: 'created_at', dataType: 'TIMESTAMP', nullable: true },
    ],
    indexes: ['PRIMARY KEY (id)', 'FOREIGN KEY (user_id) REFERENCES users(id)'],
    rowCount: 4,
  },
];

const MOCK_USERS_DATA = [
  [1, 'Alice Johnson', 'alice@example.com', '2024-01-15 10:30:00'],
  [2, 'Bob Smith', 'bob@example.com', '2024-01-16 14:20:00'],
  [3, 'Charlie Brown', 'charlie@example.com', '2024-01-17 09:15:00'],
];

const MOCK_POSTS_DATA = [
  [
    1,
    1,
    'Getting Started with ReifyDB',
    'ReifyDB is a modern database...',
    true,
    '2024-01-20 11:00:00',
  ],
  [2, 1, 'Advanced Query Optimization', 'In this post we explore...', true, '2024-01-22 15:30:00'],
  [3, 2, 'Building Real-time Apps', 'Learn how to build...', true, '2024-01-23 10:45:00'],
  [4, 3, 'Draft Post', 'This is a work in progress...', false, '2024-01-24 16:20:00'],
];

export function usePlaygroundConnection(wsUrl?: string) {
  // Use the global singleton WebSocket connection
  const {
    client,
    isConnected: connected,
    isConnecting,
    connectionError,
    connect,
    disconnect,
    reconnect,
  } = useConnection();

  // Use the shared query execution hook
  const {
    isExecuting,
    result,
    error,
    executionTime,
    history,
    executeQuery: executeReifyQuery,
    clearResults,
    clearHistory,
  } = useQuery(client, {
    addToHistory: true,
  });

  const [schema, setSchema] = useState<TableInfo[]>(MOCK_SCHEMA);

  // Wrapper for executeQuery to maintain compatibility
  const executeQuery = useCallback(async (query: string) => {
    console.log('[usePlaygroundConnection] executeQuery called, connected:', connected);
    
    if (!connected) {
      console.log('[usePlaygroundConnection] Not connected, using mock data fallback');
      // If not connected, try to use mock data as fallback
      const queryLower = query.toLowerCase().trim();
      
      // Provide mock results when disconnected for demonstration
      if (queryLower.includes('from users')) {
        const mockColumns: Column[] = [
          { name: 'id', ty: 'Int4', data: [] },
          { name: 'name', ty: 'Utf8', data: [] },
          { name: 'email', ty: 'Utf8', data: [] },
          { name: 'created_at', ty: 'DateTime', data: [] }
        ];
        
        const mockRows = MOCK_USERS_DATA.map(row => ({
          id: new Int4Value(row[0] as number),
          name: new Utf8Value(row[1] as string),
          email: new Utf8Value(row[2] as string),
          created_at: new DateTimeValue(row[3] as string)
        }));
        
        const mockResult: QueryResult = {
          columns: mockColumns,
          rows: mockRows,
          executionTimeMs: 100,
        };
        return mockResult;
      } else if (queryLower.includes('from posts')) {
        const mockColumns: Column[] = [
          { name: 'id', ty: 'Int4', data: [] },
          { name: 'user_id', ty: 'Int4', data: [] },
          { name: 'title', ty: 'Utf8', data: [] },
          { name: 'content', ty: 'Utf8', data: [] },
          { name: 'published', ty: 'Bool', data: [] },
          { name: 'created_at', ty: 'DateTime', data: [] }
        ];
        
        const mockRows = MOCK_POSTS_DATA.map(row => ({
          id: new Int4Value(row[0] as number),
          user_id: new Int4Value(row[1] as number),
          title: new Utf8Value(row[2] as string),
          content: new Utf8Value(row[3] as string),
          published: new BoolValue(row[4] as boolean),
          created_at: new DateTimeValue(row[5] as string)
        }));
        
        const mockResult: QueryResult = {
          columns: mockColumns,
          rows: mockRows,
          executionTimeMs: 100,
        };
        return mockResult;
      }
    }
    
    // Use the real WebSocket connection when available
    return await executeReifyQuery(query);
  }, [connected, executeReifyQuery]);

  const resetDatabase = useCallback(() => {
    clearResults();
    clearHistory();
    setSchema(MOCK_SCHEMA);
  }, [clearResults, clearHistory]);

  const loadExample = useCallback((exampleQuery: string) => {
    // This would be handled by the parent component
    return exampleQuery;
  }, []);

  // Fetch schema from server when connected
  const fetchSchema = useCallback(async () => {
    if (!client || !connected) return;
    
    try {
      // Try to fetch actual schema from server
      // This would depend on the ReifyDB API for getting schema information
      // For now, we'll use the mock schema
      setSchema(MOCK_SCHEMA);
    } catch (err) {
      console.error('Failed to fetch schema:', err);
      // Fall back to mock schema
      setSchema(MOCK_SCHEMA);
    }
  }, [client, connected]);

  return {
    connected,
    isConnecting,
    connectionError,
    result,
    error,
    schema,
    history,
    executeQuery,
    resetDatabase,
    loadExample,
    connect,
    disconnect,
    reconnect,
    fetchSchema,
  };
}
