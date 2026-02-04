import { useState, useCallback, useEffect, useRef } from 'react';
import { Play, RotateCcw, Copy, Check, Maximize2, Minimize2 } from 'lucide-react';
import Editor, { type OnMount } from '@monaco-editor/react';
import type { editor } from 'monaco-editor';
import { rqlLanguageDefinition, rqlLanguageConfiguration } from '@/lib/rql-language';
import { premiumDarkTheme } from '@/lib/monaco-themes';
import { cn } from '@/lib';
import { createWasmDB, type WasmDB } from '@/lib/wasm-db';
import { seedCommand } from '@/lib/seed-data';
import { UNDEFINED_VALUE, Value } from '@reifydb/core';

let languageRegistered = false;

function registerRqlLanguage(monaco: typeof import('monaco-editor')) {
  if (languageRegistered) return;

  monaco.languages.register({ id: 'rql' });
  monaco.languages.setMonarchTokensProvider('rql', rqlLanguageDefinition);
  monaco.languages.setLanguageConfiguration('rql', rqlLanguageConfiguration);
  monaco.editor.defineTheme('premium-dark', premiumDarkTheme);

  languageRegistered = true;
}

interface ExecutableSnippetProps {
  initialCode: string;
  title?: string;
  description?: string;
  className?: string;
}

interface QueryResult {
  data: Record<string, unknown>[];
  error?: string;
}

export function ExecutableSnippet({
  initialCode,
  title = 'reifydb playground',
  description,
  className,
}: ExecutableSnippetProps) {
  const [db, setDb] = useState<WasmDB | null>(null);
  const [dbLoading, setDbLoading] = useState(true);
  const [dbError, setDbError] = useState<string | null>(null);
  const [code, setCode] = useState(initialCode);
  const [result, setResult] = useState<QueryResult | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const handleRunRef = useRef<() => void>(() => {});

  // Calculate editor height based on line count
  const lineCount = code.split('\n').length;
  const editorHeight = Math.max(lineCount * 20 + 16, 80);

  // Initialize WASM database lazily
  useEffect(() => {
    let mounted = true;

    async function initDb() {
      try {
        const instance = await createWasmDB();
        if (mounted) {
          // Run seed command to populate tables for documentation examples
          try {
            instance.command(seedCommand);
          } catch {
            // Ignore seed errors silently
          }
          setDb(instance);
          setDbLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setDbError(err instanceof Error ? err.message : 'Failed to load WASM');
          setDbLoading(false);
        }
      }
    }

    initDb();

    return () => {
      mounted = false;
    };
  }, []);

  // Fullscreen ESC key handler and body scroll lock
  useEffect(() => {
    if (!isFullscreen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsFullscreen(false);
    };

    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isFullscreen]);

  const handleRun = useCallback(async () => {
    if (!db || dbLoading || isExecuting) return;

    setIsExecuting(true);
    setResult(null);

    try {
      // Use command() which handles both queries and DDL/DML
      const res = db.command(code);
      // Result is a flat array of row objects
      const data = Array.isArray(res) ? res : [];
      setResult({ data });
    } catch (err) {
      setResult({
        data: [],
        error: err instanceof Error ? err.message : String(err),
      });
    } finally {
      setIsExecuting(false);
    }
  }, [code, db, dbLoading, isExecuting]);

  // Keep ref updated with latest handleRun
  handleRunRef.current = handleRun;

  const handleReset = useCallback(() => {
    setCode(initialCode);
    setResult(null);
  }, [initialCode]);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    registerRqlLanguage(monaco);

    // Use addAction for proper focus handling with multiple editors
    editor.addAction({
      id: 'run-query',
      label: 'Run Query',
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
      run: () => {
        handleRunRef.current();
      },
    });
  };

  const handleBeforeMount = (monaco: typeof import('monaco-editor')) => {
    registerRqlLanguage(monaco);
  };

  // Extract columns from result data
  const columns = result?.data && result.data.length > 0 ? Object.keys(result.data[0]) : [];

  const content = (
    <div className={cn(
      'border border-white/10 bg-bg-tertiary rounded-xl overflow-hidden',
      isFullscreen ? 'flex flex-col h-full' : '',
      !isFullscreen && className
    )}>
      {/* Terminal Header */}
      <div className="flex justify-between items-center px-4 py-2 border-b border-white/10 bg-bg-elevated shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-status-error" />
            <div className="w-3 h-3 rounded-full bg-status-warning" />
            <div className="w-3 h-3 rounded-full bg-status-success" />
          </div>
          <span className="text-xs font-medium text-primary uppercase tracking-wider">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 text-text-muted hover:text-text-primary hover:bg-white/5 rounded transition-colors"
            title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
          <button
            onClick={handleCopy}
            className="p-1.5 text-text-muted hover:text-text-primary hover:bg-white/5 rounded transition-colors"
            title="Copy code"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 text-text-muted hover:text-text-primary hover:bg-white/5 rounded transition-colors"
            title="Reset code"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Description */}
      {description && (
        <div className="px-4 py-2 bg-bg-secondary border-b border-white/10 shrink-0">
          <p className="text-xs text-text-muted">{description}</p>
        </div>
      )}

      {/* Code Editor */}
      <div className={isFullscreen ? 'flex-1 min-h-0' : ''} style={isFullscreen ? undefined : { height: editorHeight }}>
        <Editor
          height="100%"
          language="rql"
          theme="premium-dark"
          value={code}
          onChange={(value) => setCode(value || '')}
          beforeMount={handleBeforeMount}
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: false },
            lineNumbers: 'on',
            glyphMargin: false,
            folding: false,
            lineDecorationsWidth: 16,
            lineNumbersMinChars: 3,
            scrollBeyondLastLine: false,
            scrollbar: {
              vertical: isFullscreen ? 'auto' : 'hidden',
              horizontal: isFullscreen ? 'auto' : 'hidden',
            },
            overviewRulerLanes: 0,
            hideCursorInOverviewRuler: true,
            overviewRulerBorder: false,
            renderLineHighlight: 'none',
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 13,
            padding: { top: 8, bottom: 8 },
            wordWrap: 'on',
            automaticLayout: true,
          }}
        />
      </div>

      {/* Run Button Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-white/10 bg-bg-elevated shrink-0">
        <span className="text-xs text-text-muted">
          {dbLoading ? 'Loading WASM...' : 'Ctrl+Enter to run'}
        </span>
        <button
          onClick={handleRun}
          disabled={dbLoading || isExecuting}
          className="flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-primary to-accent-warm text-white font-semibold text-xs uppercase tracking-wider rounded-lg hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Play size={12} />
          {isExecuting ? 'Running...' : 'Run'}
        </button>
      </div>

      {/* Results Section */}
      {(result || dbError) && (
        <div className={cn(
          'border-t border-white/10 shrink-0',
          isFullscreen && 'max-h-[40vh] overflow-y-auto'
        )}>
          {/* Result Header */}
          <div className="px-4 py-2 bg-bg-elevated border-b border-white/10 flex items-center justify-between sticky top-0">
            <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
              {result?.error || dbError ? 'Error' : 'Result'}
            </span>
            {result?.data && !result.error && (
              <span className="text-xs text-text-muted">
                {result.data.length} row{result.data.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>

          {/* Error Display */}
          {(result?.error || dbError) && (
            <div className="p-4 bg-status-error/10">
              <pre className="text-xs text-status-error font-mono whitespace-pre-wrap">
                {result?.error || dbError}
              </pre>
            </div>
          )}

          {/* Results Table */}
          {result?.data && result.data.length > 0 && !result.error && (
            <div className="p-4 overflow-x-auto">
              <table className="w-full text-sm font-mono">
                <thead>
                  <tr className="border-b border-white/10">
                    {columns.map((col) => (
                      <th
                        key={col}
                        className="text-left py-2 px-3 text-xs font-semibold uppercase tracking-wider text-text-secondary bg-bg-elevated"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.data.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-white/5 last:border-b-0 hover:bg-white/5"
                    >
                      {columns.map((col) => (
                        <td key={col} className="py-2 px-3 text-text-primary">
                          {formatValue(row[col])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Empty Result */}
          {result?.data && result.data.length === 0 && !result.error && (
            <div className="p-4 text-center text-sm text-text-muted">
              Query executed successfully. No rows returned.
            </div>
          )}
        </div>
      )}
    </div>
  );

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
        <div className="fixed inset-4 bg-bg-secondary border border-white/10 rounded-xl flex flex-col overflow-hidden">
          {content}
        </div>
      </div>
    );
  }

  return content;
}

function formatValue(value: unknown): string {
  if (value === null || value === undefined) {
    return UNDEFINED_VALUE;
  }
  if (value instanceof Value) {
    return value.toString();
  }
  if (typeof value === 'object') {
    return JSON.stringify(value);
  }
  return String(value);
}
