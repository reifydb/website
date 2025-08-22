import React, { useState, useCallback, useRef, useEffect, lazy, Suspense } from 'react';
import { useConnection } from '../../hooks/useConnection';
import { useQuery, type QueryResult } from '../../hooks/useQuery';
import { Value } from '@reifydb/core';
import { REIFYDB_CONFIG } from '../../config';
import ResultViewer from '../ResultViewer';
import styles from './styles.module.css';

// Lazy load the Monaco editor to reduce initial bundle size
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
  const [editorTheme, setEditorTheme] = useState('vs-light');
  const [showConnectionModal, setShowConnectionModal] = useState(false);
  const [connectionTimeout, setConnectionTimeout] = useState(0);
  const editorRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Use a ref to store the latest handleExecute function to avoid stale closures
  const handleExecuteRef = useRef<() => void>(() => {});
  
  // Use the global singleton WebSocket connection
  const { 
    client, 
    isConnected, 
    isConnecting, 
    connectionError,
    connect,
    reconnect,
  } = useConnection();
  
  // Use the shared query execution hook
  const {
    isExecuting,
    executeQuery: executeReifyQuery,
    clearResults,
  } = useQuery(client, {
    addToHistory: false, // Inline editor doesn't need history
  });

  // Calculate dynamic height based on content with minimum 3 lines
  const calculateHeight = useCallback((content: string) => {
    const lines = content.split('\n').length;
    const lineHeight = 21;
    const extraPadding = 10; // Account for Monaco's internal padding
    const minLines = 3;
    const maxHeight = 400;
    const minHeight = (minLines * lineHeight) + extraPadding;
    const calculatedHeight = Math.min(Math.max((lines * lineHeight) + extraPadding, minHeight), maxHeight);
    return calculatedHeight;
  }, []);

  const [editorHeight, setEditorHeight] = useState(() => calculateHeight(initialQuery));
  
  // Update height directly on the DOM to avoid re-renders
  const updateHeightDirectly = useCallback((newHeight: number) => {
    if (containerRef.current) {
      containerRef.current.style.height = `${newHeight}px`;
      containerRef.current.style.minHeight = `${newHeight}px`;
      containerRef.current.style.maxHeight = `${newHeight}px`;
    }
  }, []);

  // Detect theme changes
  useEffect(() => {
    const detectTheme = () => {
      const htmlTheme = document.documentElement.getAttribute('data-theme');
      setEditorTheme(htmlTheme === 'dark' ? 'vs-dark' : 'vs-light');
    };

    detectTheme();

    const observer = new MutationObserver(detectTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  // Auto-close modal when connection succeeds
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

  // Handle ESC key to close modal
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

  // Cleanup timeout interval on unmount
  useEffect(() => {
    return () => {
      if (timeoutIntervalRef.current) {
        clearInterval(timeoutIntervalRef.current);
      }
    };
  }, []);

  const startConnectionAttempt = useCallback(() => {
    if (!isConnecting) {
      // Start a 10-second timeout
      setConnectionTimeout(10);
      
      // Clear any existing interval
      if (timeoutIntervalRef.current) {
        clearInterval(timeoutIntervalRef.current);
      }
      
      // Start countdown
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
      
      // Attempt connection
      if (isConnected) {
        reconnect();
      } else {
        connect();
      }
    }
  }, [isConnecting, isConnected, reconnect, connect]);

  const parseStatements = (sql: string): string[] => {
    // Split by semicolon but respect quoted strings
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

    // Check connection first
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

  // Update the ref whenever handleExecute changes
  useEffect(() => {
    handleExecuteRef.current = handleExecute;
  }, [handleExecute]);

  // Create a stable callback that uses the ref
  const stableHandleExecute = useCallback(() => {
    handleExecuteRef.current();
  }, []);


  const renderResult = (statementResult: StatementResult, index: number) => {
    const { statement, result, error } = statementResult;

    return (
      <div key={index} className={styles.statementResult}>
        <div className={styles.statementHeader}>
          <span className={styles.statementText}>Statement {index + 1}</span>
          <code className={styles.statementPreview}>
            {statement.length > 50 ? statement.substring(0, 50) + '...' : statement}
          </code>
        </div>

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
      {/* Connection Modal */}
      {showConnectionModal && !isConnected && (
        <div className={styles.modalBackdrop} onClick={() => setShowConnectionModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.modalTitle}>
                <span className={styles.modalIcon}>⚠️</span>
                <h3>No ReifyDB Connection</h3>
              </div>
              <button 
                className={styles.modalClose}
                onClick={() => setShowConnectionModal(false)}
                aria-label="Close modal"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className={styles.modalBody}>
              {connectionError && (
                <div className={styles.modalError}>
                  <strong>Error:</strong> {connectionError}
                </div>
              )}
              <p className={styles.modalDescription}>
                To run queries, you need to start the ReifyDB test container.
              </p>
              <div className={styles.modalCommand}>
                <code>{REIFYDB_CONFIG.DOCKER_COMMAND}</code>
                <button
                  className={styles.modalCopyButton}
                  onClick={() => {
                    navigator.clipboard.writeText(REIFYDB_CONFIG.DOCKER_COMMAND);
                    // Optional: Add visual feedback for copy action
                    const button = event?.target as HTMLButtonElement;
                    if (button) {
                      const originalText = button.textContent;
                      button.textContent = 'Copied!';
                      setTimeout(() => {
                        button.textContent = originalText;
                      }, 2000);
                    }
                  }}
                >
                  Copy
                </button>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button 
                className={styles.modalCancelButton}
                onClick={() => setShowConnectionModal(false)}
              >
                Cancel
              </button>
              <button 
                className={styles.modalPrimaryButton}
                onClick={startConnectionAttempt}
                disabled={isConnecting || connectionTimeout > 0}
              >
                {isConnecting ? (
                  <>
                    <span className={styles.modalSpinner} />
                    Connecting...
                  </>
                ) : connectionTimeout > 0 ? (
                  `Retry in ${connectionTimeout}s`
                ) : (
                  'Try to Connect'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className={styles.inlineEditor}>
        <div className={styles.editorWrapper}>
        {editable ? (
          <Suspense
            fallback={
              <div className={styles.editorLoading}>
                <div className={styles.spinner} />
                Loading editor...
              </div>
            }
          >
            <div className={styles.editorContainer}>
              <div 
                ref={containerRef}
                className={styles.editorInner} 
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
                    updateHeightDirectly(newHeight);
                  }, [calculateHeight, updateHeightDirectly])}
                  onExecute={stableHandleExecute}
                  language="sql"
                  theme={editorTheme}
                  readOnly={isExecuting}
                />
              </div>
              <div className={styles.actions}>
                <button
                  className={styles.executeButton}
                  onClick={handleExecute}
                  disabled={isExecuting}
                  title={!isConnected ? 'Connect to ReifyDB to run queries' : ''}
                >
                  {isExecuting ? (
                    <>
                      <span className={styles.spinner} />
                      Executing...
                    </>
                  ) : (
                    <>
                      <svg className={styles.playIcon} width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                        <path d="M3 2v10l8-5z" />
                      </svg>
                      Run Query
                    </>
                  )}
                </button>

                {statementResults.length > 0 && (
                  <button className={styles.toggleButton} onClick={() => setIsExpanded(!isExpanded)} aria-expanded={isExpanded}>
                    <svg
                      className={`${styles.chevron} ${isExpanded ? styles.expanded : ''}`}
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="currentColor"
                    >
                      <path d="M3 5l4 4 4-4" />
                    </svg>
                    {isExpanded ? 'Hide' : 'Show'} Results ({statementResults.length} statement
                    {statementResults.length !== 1 ? 's' : ''})
                  </button>
                )}

                {editable && query !== initialQuery && (
                  <button
                    className={styles.resetButton}
                    onClick={() => {
                      setQuery(initialQuery);
                      const resetHeight = calculateHeight(initialQuery);
                      updateHeightDirectly(resetHeight);
                      if (editorRef.current) {
                        editorRef.current.setValue(initialQuery);
                      }
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                      <path d="M7 2.5a4.5 4.5 0 1 0 4.09 2.62.45.45 0 0 1 .82-.37A5.4 5.4 0 1 1 7 1.8v.7z" />
                      <path d="M7 0.9a.45.45 0 0 1 .45.45v2.7a.45.45 0 0 1-.45.45h-2.7a.45.45 0 0 1 0-.9h2.06L5.08 2.12a.45.45 0 1 1 .64-.64L7 2.76V1.35A.45.45 0 0 1 7 0.9z" />
                    </svg>
                    Reset
                  </button>
                )}

                <span className={styles.shortcutHint}>Ctrl+Enter to execute</span>
                
                {/* Connection Status Indicator - positioned after the shortcut hint */}
                <span className={`${styles.connectionStatus} ${isConnected ? styles.connected : styles.disconnected}`}>
                  <span className={styles.statusDot}></span>
                  {isConnecting ? 'Connecting...' : isConnected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
            </div>
          </Suspense>
        ) : (
          <div className={styles.staticCodeContainer}>
            <div className={styles.staticCode}>
              <pre>
                <code>{query}</code>
              </pre>
            </div>
            <div className={styles.actions}>
              <button
                className={styles.executeButton}
                onClick={handleExecute}
                disabled={isExecuting || !isConnected}
                title={!isConnected ? 'Connect to ReifyDB to run queries' : ''}
              >
                {isExecuting ? (
                  <>
                    <span className={styles.spinner} />
                    Executing...
                  </>
                ) : (
                  <>
                    <svg className={styles.playIcon} width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                      <path d="M3 2v10l8-5z" />
                    </svg>
                    Run Query
                  </>
                )}
              </button>

              {statementResults.length > 0 && (
                <button className={styles.toggleButton} onClick={() => setIsExpanded(!isExpanded)} aria-expanded={isExpanded}>
                  <svg
                    className={`${styles.chevron} ${isExpanded ? styles.expanded : ''}`}
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="currentColor"
                  >
                    <path d="M3 5l4 4 4-4" />
                  </svg>
                  {isExpanded ? 'Hide' : 'Show'} Results ({statementResults.length} statement
                  {statementResults.length !== 1 ? 's' : ''})
                </button>
              )}
              
              {/* Connection Status Indicator - positioned at the end */}
              <span className={`${styles.connectionStatus} ${isConnected ? styles.connected : styles.disconnected}`} style={{ marginLeft: 'auto' }}>
                <span className={styles.statusDot}></span>
                {isConnecting ? 'Connecting...' : isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
          </div>
        )}
      </div>

      {isExpanded && statementResults.length > 0 && (
        <div className={styles.resultsContainer}>
          {statementResults.map((result, index) => renderResult(result, index))}
        </div>
      )}
      </div>
    </>
  );
}