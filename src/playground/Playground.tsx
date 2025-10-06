import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { useConnection, useQueryExecutor, type QueryResult } from '@reifydb/react';
import CodeEditor from '@components/CodeEditor';
import ResultViewer from '@components/ResultViewer';
import SchemaExplorer from './components/SchemaExplorer';
import QueryHistory from './components/QueryHistory';
import Toolbar from './components/Toolbar';
import type { CodeEditorRef } from '@components/CodeEditor';
import type { TableInfo, QueryHistoryItem } from './types';
import styles from './Playground.module.css';

const DEFAULT_QUERY = `MAP {42}`;

export default function Playground() {
  const [query, setQuery] = useState(DEFAULT_QUERY);
  const [activeTab, setActiveTab] = useState<'result' | 'history'>('result');
  const [editorTheme, setEditorTheme] = useState('vs'); // Default to light theme
  const [schema, setSchema] = useState<TableInfo[]>([]);
  const [history, setHistory] = useState<QueryHistoryItem[]>([]);
  const [currentResult, setCurrentResult] = useState<QueryResult | null>(null);
  const [currentError, setCurrentError] = useState<string | null>(null);
  const editorRef = useRef<CodeEditorRef | null>(null);

  const { isConnected: connected, isConnecting, connect, disconnect, reconnect } = useConnection();
  const { isExecuting, query: executeReifyQuery, results, error: queryError } = useQueryExecutor();

  const handleExecute = useCallback(() => {
    if (!query.trim() || isExecuting) return;

    if (!connected) {
      setCurrentError('Not connected to ReifyDB server');
      setActiveTab('result');
      return;
    }

    setActiveTab('result');
    setCurrentResult(null);
    setCurrentError(null);
    
    // Execute the query
    executeReifyQuery(query);
    
    // Add to history
    const historyItem: QueryHistoryItem = {
      id: Date.now().toString(),
      query,
      timestamp: Date.now(),
      executionTimeMs: 0,
      success: true,
    };
    setHistory(prev => [historyItem, ...prev].slice(0, 100));
  }, [query, isExecuting, connected, executeReifyQuery]);


  // Detect theme changes
  useEffect(() => {
    const detectTheme = () => {
      // Docusaurus adds data-theme attribute to the html element
      const htmlTheme = document.documentElement.getAttribute('data-theme');
      const isDark = htmlTheme === 'dark';

      // Update editor theme
      setEditorTheme(isDark ? 'vs-dark' : 'vs');
    };

    // Initial detection
    detectTheme();

    // Watch for theme changes
    const observer = new MutationObserver(detectTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  // Update result when query results change
  useEffect(() => {
    if (results && results.length > 0) {
      setCurrentResult(results[0]);
      setCurrentError(null);
    } else if (queryError) {
      setCurrentError(queryError);
      setCurrentResult(null);
    }
  }, [results, queryError]);

  const handleExampleLoad = useCallback((exampleQuery: string) => {
    setQuery(exampleQuery);
    if (editorRef.current) {
      editorRef.current.setValue(exampleQuery);
    }
  }, []);

  const resetDatabase = useCallback(() => {
    setCurrentResult(null);
    setCurrentError(null);
    setHistory([]);
    setSchema([]);
  }, []);

  const loadExample = useCallback((exampleQuery: string) => {
    return exampleQuery;
  }, []);

  return (
    <div className={styles.playground}>
      <Toolbar
        connected={connected}
        isExecuting={isExecuting}
        onExecute={handleExecute}
        onReset={resetDatabase}
        onLoadExample={loadExample}
      />

      <div className={styles.content}>
        <PanelGroup direction="horizontal">
          <Panel defaultSize={20} minSize={15} maxSize={30}>
            <SchemaExplorer
              schema={schema}
              onTableClick={(tableName) => {
                const insertQuery = `SELECT * FROM ${tableName} LIMIT 10;`;
                setQuery(insertQuery);
              }}
            />
          </Panel>

          <PanelResizeHandle className={styles.resizeHandle} />

          <Panel defaultSize={80}>
            <PanelGroup direction="vertical">
              <Panel defaultSize={40} minSize={20}>
                <CodeEditor
                  ref={editorRef}
                  value={query}
                  onChange={setQuery}
                  onExecute={handleExecute}
                  language="rql"
                  theme={editorTheme}
                />
              </Panel>

              <PanelResizeHandle className={styles.resizeHandle} />

              <Panel defaultSize={60} minSize={20}>
                <div className={styles.resultPanel}>
                  <div className={styles.tabs}>
                    <button
                      className={`${styles.tab} ${activeTab === 'result' ? styles.active : ''}`}
                      onClick={() => setActiveTab('result')}
                    >
                      Result
                    </button>
                    <button
                      className={`${styles.tab} ${activeTab === 'history' ? styles.active : ''}`}
                      onClick={() => setActiveTab('history')}
                    >
                      History
                    </button>
                  </div>

                  <div className={styles.tabContent}>
                    {activeTab === 'result' ? (
                      <ResultViewer result={currentResult} error={currentError} isLoading={isExecuting} />
                    ) : (
                      <QueryHistory history={history} onQuerySelect={handleExampleLoad} />
                    )}
                  </div>
                </div>
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}
