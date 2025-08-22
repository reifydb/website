import { QueryResult, QueryHistoryItem } from '../types';

export interface ColumnInfo {
  name: string;
  dataType: string;
  nullable: boolean;
}

export interface TableInfo {
  name: string;
  columns: ColumnInfo[];
  indexes: string[];
  rowCount?: number;
}

export interface PlaygroundRequest {
  type: 'execute' | 'getSchema' | 'getHistory' | 'loadExample' | 'reset';
  id: string;
  query?: string;
  exampleId?: string;
}

export interface PlaygroundResponse {
  type: 'queryResult' | 'error' | 'schema' | 'history' | 'exampleLoaded' | 'resetComplete';
  id: string;
  result?: QueryResult;
  error?: string;
  schema?: TableInfo[];
  history?: QueryHistoryItem[];
  example?: {
    title: string;
    description: string;
    queries: string[];
  };
}
