import { useState, useCallback, useEffect, useRef } from 'react';
import { Play, RotateCcw, Copy, Check, Maximize2, Minimize2 } from 'lucide-react';
import Editor, { type OnMount } from '@monaco-editor/react';
import type { editor } from 'monaco-editor';
import { rqlLanguageDefinition, rqlLanguageConfiguration } from '@/lib/rql-language';
import { brutalistLightTheme } from '@/lib/monaco-themes';
import { cn } from '@/lib';
import type { WasmDB } from '@/lib/wasm/reifydb_webassembly';

let languageRegistered = false;

function registerRqlLanguage(monaco: typeof import('monaco-editor')) {
  if (languageRegistered) return;

  monaco.languages.register({ id: 'rql' });
  monaco.languages.setMonarchTokensProvider('rql', rqlLanguageDefinition);
  monaco.languages.setLanguageConfiguration('rql', rqlLanguageConfiguration);
  monaco.editor.defineTheme('brutalist-light', brutalistLightTheme);

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
        const { WasmDB } = await import('@/lib/wasm/reifydb_webassembly');
        if (mounted) {
          const instance = new WasmDB();
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
      'border-2 border-border-default bg-white overflow-hidden',
      isFullscreen ? 'flex flex-col h-full' : '',
      !isFullscreen && className
    )}>
      {/* Terminal Header */}
      <div className="flex justify-between items-center px-4 py-2 border-b-2 border-border-default bg-bg-tertiary shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[var(--color-status-error)]" />
            <div className="w-3 h-3 rounded-full bg-[var(--color-accent-yellow)]" />
            <div className="w-3 h-3 rounded-full bg-[var(--color-feature-green)]" />
          </div>
          <span className="text-xs font-bold text-primary-color uppercase tracking-wider">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 hover:bg-border-default hover:text-white transition-colors border border-transparent hover:border-border-default"
            title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
          <button
            onClick={handleCopy}
            className="p-1.5 hover:bg-border-default hover:text-white transition-colors border border-transparent hover:border-border-default"
            title="Copy code"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 hover:bg-border-default hover:text-white transition-colors border border-transparent hover:border-border-default"
            title="Reset code"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Description */}
      {description && (
        <div className="px-4 py-2 bg-bg-tertiary border-b border-border-default shrink-0">
          <p className="text-xs text-text-muted">{description}</p>
        </div>
      )}

      {/* Code Editor */}
      <div className={isFullscreen ? 'flex-1 min-h-0' : ''} style={isFullscreen ? undefined : { height: editorHeight }}>
        <Editor
          height="100%"
          language="rql"
          theme="brutalist-light"
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
      <div className="flex items-center justify-between px-4 py-2 border-t-2 border-border-default bg-bg-tertiary shrink-0">
        <span className="text-xs text-text-muted">
          {dbLoading ? 'Loading WASM...' : 'Ctrl+Enter to run'}
        </span>
        <button
          onClick={handleRun}
          disabled={dbLoading || isExecuting}
          className="flex items-center gap-2 px-4 py-1.5 bg-[var(--color-primary)] text-white font-bold text-xs uppercase tracking-wider border-2 border-border-default shadow-[2px_2px_0px_0px_var(--color-border-default)] hover:shadow-[1px_1px_0px_0px_var(--color-border-default)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Play size={12} />
          {isExecuting ? 'Running...' : 'Run'}
        </button>
      </div>

      {/* Results Section */}
      {(result || dbError) && (
        <div className={cn(
          'border-t-2 border-border-default shrink-0',
          isFullscreen && 'max-h-[40vh] overflow-y-auto'
        )}>
          {/* Result Header */}
          <div className="px-4 py-2 bg-bg-tertiary border-b border-border-default flex items-center justify-between sticky top-0">
            <span className="text-xs font-bold uppercase tracking-wider text-text-secondary">
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
            <div className="p-4 bg-[var(--color-status-error)]/10">
              <pre className="text-xs text-[var(--color-status-error)] font-mono whitespace-pre-wrap">
                {result?.error || dbError}
              </pre>
            </div>
          )}

          {/* Results Table */}
          {result?.data && result.data.length > 0 && !result.error && (
            <div className="p-4 overflow-x-auto">
              <table className="w-full text-sm font-mono">
                <thead>
                  <tr className="border-b-2 border-border-default">
                    {columns.map((col) => (
                      <th
                        key={col}
                        className="text-left py-2 px-3 text-xs font-bold uppercase tracking-wider text-text-secondary bg-bg-tertiary"
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
                      className="border-b border-border-default last:border-b-0 hover:bg-bg-tertiary"
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
      <div className="fixed inset-0 z-50 bg-black/50">
        <div className="fixed inset-4 bg-white border-2 border-border-default flex flex-col">
          {content}
        </div>
      </div>
    );
  }

  return content;
}

function formatValue(value: unknown): string {
  if (value === null || value === undefined) {
    return 'null';
  }
  if (typeof value === 'object') {
    return JSON.stringify(value);
  }
  return String(value);
}
