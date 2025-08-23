import React, { useState, useCallback, useRef, useEffect, lazy, Suspense } from 'react';
import { useConnection } from '../../hooks/useConnection';
import { useQuery, type QueryResult } from '../../hooks/useQuery';
import { Value } from '@reifydb/core';
import { REIFYDB_CONFIG } from '../../config';
import ResultViewer from '../ResultViewer';
import styles from './styles.module.css';

const CodeEditor = lazy(() => import('../CodeEditor'));

interface InlineEditorProps {
  query: string;
  defaultExpanded?: boolean;
  editable?: boolean;
}

interface StatementResult {
  statement: string;
  result: QueryResult | null;
  error: string | null;
}

export default function InlineEditor({
  query: initialQuery,
  defaultExpanded = false,
  editable = true,
}: InlineEditorProps) {
  const [query, setQuery] = useState(initialQuery);
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [statementResults, setStatementResults] = useState<StatementResult[]>([]);
  const [editorTheme, setEditorTheme] = useState('brutalist-light');
  const [showConnectionModal, setShowConnectionModal] = useState(false);
  const [connectionTimeout, setConnectionTimeout] = useState(0);
  const editorRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const handleExecuteRef = useRef<() => void>(() => {});
  
  const { 
    client, 
    isConnected, 
    isConnecting, 
    connectionError,
    connect,
    reconnect,
  } = useConnection();
  
  const {
    isExecuting,
    executeQuery: executeReifyQuery,
    clearResults,
  } = useQuery(client, {
    addToHistory: false,
  });

  const calculateHeight = useCallback((content: string) => {
    const lines = content.split('\n').length;
    const lineHeight = 24;
    const extraPadding = 20;
    const minLines = 3;
    const minHeight = (minLines * lineHeight) + extraPadding;
    
    // Get viewport height and calculate max allowed height (e.g., 80% of viewport)
    const viewportHeight = window.innerHeight;
    const maxHeight = Math.floor(viewportHeight * 0.8);
    
    // Calculate height but limit to max screen height
    const calculatedHeight = Math.min(
      Math.max((lines * lineHeight) + extraPadding, minHeight),
      maxHeight
    );
    return calculatedHeight;
  }, []);

  const [editorHeight, setEditorHeight] = useState(() => calculateHeight(initialQuery));
  
  const updateHeightDirectly = useCallback((newHeight: number) => {
    if (containerRef.current) {
      containerRef.current.style.height = `${newHeight}px`;
      containerRef.current.style.minHeight = `${newHeight}px`;
      containerRef.current.style.maxHeight = `${newHeight}px`;
    }
  }, []);

  useEffect(() => {
    const detectTheme = () => {
      const htmlTheme = document.documentElement.getAttribute('data-theme');
      setEditorTheme(htmlTheme === 'dark' ? 'brutalist-dark' : 'brutalist-light');
    };

    detectTheme();

    const observer = new MutationObserver(detectTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  // Handle window resize to recalculate max height
  useEffect(() => {
    const handleResize = () => {
      const newHeight = calculateHeight(query);
      updateHeightDirectly(newHeight);
      setEditorHeight(newHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [query, calculateHeight, updateHeightDirectly]);

  useEffect(() => {
    if (isConnected && showConnectionModal) {
      setShowConnectionModal(false);
      setConnectionTimeout(0);
      if (timeoutIntervalRef.current) {
        clearInterval(timeoutIntervalRef.current);
        timeoutIntervalRef.current = null;
      }
    }
  }, [isConnected, showConnectionModal]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showConnectionModal) {
        setShowConnectionModal(false);
      }
    };

    if (showConnectionModal) {
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [showConnectionModal]);

  useEffect(() => {
    return () => {
      if (timeoutIntervalRef.current) {
        clearInterval(timeoutIntervalRef.current);
      }
    };
  }, []);

  const startConnectionAttempt = useCallback(() => {
    if (!isConnecting) {
      setConnectionTimeout(10);
      
      if (timeoutIntervalRef.current) {
        clearInterval(timeoutIntervalRef.current);
      }
      
      timeoutIntervalRef.current = setInterval(() => {
        setConnectionTimeout((prev) => {
          if (prev <= 1) {
            if (timeoutIntervalRef.current) {
              clearInterval(timeoutIntervalRef.current);
              timeoutIntervalRef.current = null;
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      if (isConnected) {
        reconnect();
      } else {
        connect();
      }
    }
  }, [isConnecting, isConnected, reconnect, connect]);

  const parseStatements = (sql: string): string[] => {
    const statements: string[] = [];
    let current = '';
    let inString = false;
    let stringChar = '';

    for (let i = 0; i < sql.length; i++) {
      const char = sql[i];
      const prevChar = i > 0 ? sql[i - 1] : '';

      if (!inString && (char === "'" || char === '"')) {
        inString = true;
        stringChar = char;
        current += char;
      } else if (inString && char === stringChar && prevChar !== '\\') {
        inString = false;
        current += char;
      } else if (!inString && char === ';') {
        const trimmed = current.trim();
        if (trimmed) {
          statements.push(trimmed);
        }
        current = '';
      } else {
        current += char;
      }
    }

    const trimmed = current.trim();
    if (trimmed) {
      statements.push(trimmed);
    }

    return statements;
  };

  const handleExecute = useCallback(async () => {
    if (!query?.trim() || isExecuting) {
      return;
    }

    if (!isConnected) {
      setShowConnectionModal(true);
      return;
    }

    setIsExpanded(true);
    clearResults();

    const statements = parseStatements(query);
    const results: StatementResult[] = [];

    for (const statement of statements) {
      try {
        const result = await executeReifyQuery(statement);
        
        results.push({
          statement,
          result,
          error: null,
        });
      } catch (err) {
        results.push({
          statement,
          result: null,
          error: err instanceof Error ? err.message : 'Unknown error occurred',
        });
      }
    }

    setStatementResults(results);
  }, [query, isExecuting, isConnected, executeReifyQuery, clearResults, client]);

  useEffect(() => {
    handleExecuteRef.current = handleExecute;
  }, [handleExecute]);

  const stableHandleExecute = useCallback(() => {
    handleExecuteRef.current();
  }, []);

  const renderResult = (statementResult: StatementResult, index: number) => {
    const { statement, result, error } = statementResult;

    return (
      <div key={index} >
        <ResultViewer
          result={result || undefined}
          error={error || undefined}
          isLoading={false}
        />
      </div>
    );
  };

  return (
    <>
      {showConnectionModal && !isConnected && (
        <div className={styles.modalOverlay} onClick={() => setShowConnectionModal(false)}>
          <div className={styles.brutalistModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>NO CONNECTION</h3>
              <button 
                className={styles.modalCloseBtn}
                onClick={() => setShowConnectionModal(false)}
              >
                ✕
              </button>
            </div>
            <div className={styles.modalContent}>
              {connectionError && (
                <div className={styles.modalError}>
                  ERROR: {connectionError}
                </div>
              )}
              <p className={styles.modalText}>
                START THE REIFYDB TEST CONTAINER TO RUN QUERIES
              </p>
              <div className={styles.commandBox}>
                <code>{REIFYDB_CONFIG.DOCKER_COMMAND}</code>
                <button
                  className={styles.copyBtn}
                  onClick={() => {
                    navigator.clipboard.writeText(REIFYDB_CONFIG.DOCKER_COMMAND);
                    const button = event?.target as HTMLButtonElement;
                    if (button) {
                      button.textContent = 'COPIED';
                      setTimeout(() => {
                        button.textContent = 'COPY';
                      }, 2000);
                    }
                  }}
                >
                  COPY
                </button>
              </div>
            </div>
            <div className={styles.modalActions}>
              <button 
                className={styles.brutalistBtnSecondary}
                onClick={() => setShowConnectionModal(false)}
              >
                CANCEL
              </button>
              <button 
                className={styles.brutalistBtnPrimary}
                onClick={startConnectionAttempt}
                disabled={isConnecting || connectionTimeout > 0}
              >
                {isConnecting ? (
                  <>
                    <span className={styles.spinner} />
                    CONNECTING...
                  </>
                ) : connectionTimeout > 0 ? (
                  `RETRY IN ${connectionTimeout}S`
                ) : (
                  'TRY TO CONNECT'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className={styles.brutalistEditor}>
        <div className={styles.editorContainer}>
          {editable ? (
            <Suspense
              fallback={
                <div className={styles.editorLoading}>
                  <div className={styles.loadingSpinner} />
                  <span>LOADING EDITOR...</span>
                </div>
              }
            >
              <div className={styles.editorWrapper}>
                <div 
                  ref={containerRef}
                  className={styles.codeContainer} 
                  style={{ 
                    height: `${editorHeight}px`,
                    minHeight: `${editorHeight}px`,
                    maxHeight: `${editorHeight}px` 
                  }}
                >
                  <CodeEditor
                    ref={editorRef}
                    value={query}
                    onChange={useCallback((value) => {
                      setQuery(value);
                      const newHeight = calculateHeight(value);
                      setEditorHeight(newHeight);
                      updateHeightDirectly(newHeight);
                    }, [calculateHeight, updateHeightDirectly])}
                    onExecute={stableHandleExecute}
                    language="sql"
                    theme={editorTheme}
                    readOnly={isExecuting}
                  />
                </div>
                <div className={styles.editorActions}>
                  <button
                    className={styles.executeBtn}
                    onClick={handleExecute}
                    disabled={isExecuting}
                  >
                    {isExecuting ? (
                      <>
                        <span className={styles.spinner} />
                        EXECUTING...
                      </>
                    ) : (
                      <>
                        ▶ RUN QUERY
                      </>
                    )}
                  </button>

                  {statementResults.length > 0 && (
                    <button 
                      className={styles.toggleBtn} 
                      onClick={() => setIsExpanded(!isExpanded)}
                    >
                      {isExpanded ? '▼' : '▶'} {isExpanded ? 'HIDE' : 'SHOW'} RESULTS ({statementResults.length})
                    </button>
                  )}

                  {editable && query !== initialQuery && (
                    <button
                      className={styles.resetBtn}
                      onClick={() => {
                        setQuery(initialQuery);
                        const resetHeight = calculateHeight(initialQuery);
                        setEditorHeight(resetHeight);
                        updateHeightDirectly(resetHeight);
                        if (editorRef.current) {
                          editorRef.current.setValue(initialQuery);
                        }
                      }}
                    >
                      ↺ RESET
                    </button>
                  )}

                  <span className={styles.shortcutHint}>CTRL+ENTER TO RUN</span>
                  
                  <span className={`${styles.connectionDot} ${isConnected ? styles.connected : styles.disconnected}`}>
                    {isConnecting ? 'CONNECTING' : isConnected ? 'CONNECTED' : 'DISCONNECTED'}
                  </span>
                </div>
              </div>
            </Suspense>
          ) : (
            <div className={styles.staticEditor}>
              <pre className={styles.codeBlock}>
                <code>{query}</code>
              </pre>
              <div className={styles.editorActions}>
                <button
                  className={styles.executeBtn}
                  onClick={handleExecute}
                  disabled={isExecuting || !isConnected}
                >
                  {isExecuting ? (
                    <>
                      <span className={styles.spinner} />
                      EXECUTING...
                    </>
                  ) : (
                    <>▶ RUN QUERY</>
                  )}
                </button>

                {statementResults.length > 0 && (
                  <button 
                    className={styles.toggleBtn} 
                    onClick={() => setIsExpanded(!isExpanded)}
                  >
                    {isExpanded ? '▼' : '▶'} {isExpanded ? 'HIDE' : 'SHOW'} RESULTS ({statementResults.length})
                  </button>
                )}
                
                <span className={`${styles.connectionDot} ${isConnected ? styles.connected : styles.disconnected}`}>
                  {isConnecting ? 'CONNECTING' : isConnected ? 'CONNECTED' : 'DISCONNECTED'}
                </span>
              </div>
            </div>
          )}
        </div>

        {isExpanded && statementResults.length > 0 && (
          <div className={styles.resultsWrapper}>
            {statementResults.map((result, index) => renderResult(result, index))}
          </div>
        )}
      </div>
    </>
  );
}