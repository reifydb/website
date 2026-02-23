import { useState, useCallback, useEffect, useRef, Fragment } from 'react';
import { Play, RotateCcw, Copy, Check, Maximize2, Minimize2, Loader2 } from 'lucide-react';
import Editor, { type OnMount } from '@monaco-editor/react';
import type { editor } from 'monaco-editor';
import { rqlLanguageDefinition, rqlLanguageConfiguration } from '@/lib/rql-language';
import { premiumDarkTheme } from '@/lib/monaco-themes';
import { cn } from '@/lib';
import { type WasmDB } from '@/lib/wasm-db';
import { getWasmDB, getWasmDBSync } from '@/lib/wasm-db-singleton';
import { Value } from '@reifydb/core';

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
  // Initialize with cached instance if already loaded (e.g., from another snippet)
  const [db, setDb] = useState<WasmDB | null>(() => getWasmDBSync());
  const [dbLoading, setDbLoading] = useState(false);
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
    if (isExecuting || dbLoading) return;
    setResult(null);

    // Initialize WASM on first run
    let dbInstance = db;
    if (!dbInstance) {
      setDbLoading(true);
      try {
        dbInstance = await getWasmDB();
        setDb(dbInstance);
      } catch (err) {
        setDbError(err instanceof Error ? err.message : String(err));
        setDbLoading(false);
        return;
      }
      setDbLoading(false);
    }

    // Execute the query
    setIsExecuting(true);
    await new Promise(r => setTimeout(r, 0)); // yield so React paints
    try {
      const res = dbInstance.admin(code);
      setResult({ data: Array.isArray(res) ? res : [] });
    } catch (err) {
      setResult({ data: [], error: err instanceof Error ? err.message : String(err) });
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
  const maxKeyLength = columns.length > 0 ? Math.max(...columns.map(c => c.length)) : 0;

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
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-white/5 rounded transition-colors"
            title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
          <button
            onClick={handleCopy}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-white/5 rounded transition-colors"
            title="Copy code"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
          <button
            onClick={handleReset}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-white/5 rounded transition-colors"
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
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 border-t border-white/10 bg-bg-elevated shrink-0">
        <span className="text-xs text-text-muted">
          {dbLoading
            ? 'Initializing database...'
            : db
              ? <>
                  <span className="hidden sm:inline">Ctrl+Enter to run</span>
                  <span className="sm:hidden">Tap Run to execute</span>
                </>
              : 'First run will download the database (~11MB)'}
        </span>
        <button
          onClick={handleRun}
          disabled={dbLoading || isExecuting}
          className={cn(
            "flex items-center gap-2 px-4 py-1.5 text-white font-semibold text-xs uppercase tracking-wider rounded-lg transition-all active:scale-95",
            dbLoading || isExecuting
              ? "bg-gradient-to-r from-primary/70 to-accent-warm/70 animate-pulse cursor-wait"
              : "bg-gradient-to-r from-primary to-accent-warm hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]"
          )}
        >
          {dbLoading || isExecuting
            ? <Loader2 size={12} className="animate-spin" />
            : <Play size={12} />}
          {dbLoading ? 'Loading...' : isExecuting ? 'Running...' : 'Run'}
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

          {/* Results - stacked key-value layout */}
          {result?.data && result.data.length > 0 && !result.error && (
            <div className="p-2 sm:p-4 font-mono text-sm">
              {result.data.map((row, i) => (
                <div key={i} className={i > 0 ? 'mt-3' : ''}>
                  {/* Row header */}
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs text-text-muted">Row {i + 1}</span>
                    <div className="border-t border-white/[0.06] flex-1" />
                  </div>
                  {/* Key-value grid with left accent border and alternating stripes */}
                  <div
                    className="grid border-l-2 border-primary/30"
                    style={{ gridTemplateColumns: `${maxKeyLength + 4}ch 1fr` }}
                  >
                    {columns.map((col, j) => {
                      const vs = getValueStyle(row[col]);
                      return (
                        <Fragment key={col}>
                          <span className={cn(
                            'text-text-secondary pr-2 py-0.5 pl-3',
                            j % 2 === 0 ? 'bg-white/[0.02]' : 'bg-white/[0.05]'
                          )}>{col}</span>
                          <span
                            className={cn(
                              'break-all py-0.5 pr-2',
                              j % 2 === 0 ? 'bg-white/[0.02]' : 'bg-white/[0.05]',
                              vs.italic && 'italic'
                            )}
                            style={vs.color ? { color: vs.color } : undefined}
                          >{formatValue(row[col])}</span>
                        </Fragment>
                      );
                    })}
                  </div>
                </div>
              ))}
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
        <div className="fixed inset-0 sm:inset-4 bg-bg-secondary sm:border sm:border-white/10 sm:rounded-xl flex flex-col overflow-hidden">
          {content}
        </div>
      </div>
    );
  }

  return content;
}

function getValueStyle(value: unknown): { color?: string; italic?: boolean } {
  if (value === null || value === undefined) {
    return { color: 'var(--color-text-muted)', italic: true };
  }

  // Duck-type on `type` property - Value classes use `implements` (not extends),
  // so instanceof fails. Every concrete Value sets this.type in its constructor.
  const t = (value as { type?: unknown }).type;
  if (typeof t === 'string') {
    switch (t) {
      case 'None':
        return { color: 'var(--color-text-muted)', italic: true };
      case 'Boolean':
        return { color: '#818CF8' };
      case 'Int1': case 'Int2': case 'Int4': case 'Int8': case 'Int16':
      case 'Uint1': case 'Uint2': case 'Uint4': case 'Uint8': case 'Uint16':
      case 'Float4': case 'Float8': case 'Decimal':
        return { color: '#F472B6' };
      case 'Date': case 'DateTime': case 'Time': case 'Duration':
        return { color: '#06B6D4' };
      case 'Uuid4': case 'Uuid7': case 'IdentityId':
        return { color: '#14B8A6' };
      case 'Utf8':
        return { color: '#34D399' };
      case 'Blob':
        return { color: 'var(--color-text-secondary)' };
    }
  }

  // Fallback: color by JS typeof (for inline data / untyped primitives)
  switch (typeof value) {
    case 'number':
    case 'bigint':
      return { color: '#F472B6' };     // pink - number
    case 'boolean':
      return { color: '#818CF8' };     // indigo - boolean
    case 'string':
      return { color: '#34D399' };     // emerald - string
    default:
      return {};
  }
}

function formatValue(value: unknown): string {
  if (value === null || value === undefined) {
    return 'none';
  }
  const str = value instanceof Value ? value.toString()
    : typeof value === 'object' ? JSON.stringify(value)
    : String(value);
  // Safety net: convert raw WASM DateTime repr to readable format
  const dtMatch = str.match(/DateTime\(.*?seconds:\s*(\d+)/);
  if (dtMatch) {
    const d = new Date(Number(dtMatch[1]) * 1000);
    return d.toISOString().slice(0, 19).replace('T', ' ') + ' UTC';
  }
  // Safety net: convert raw WASM Date repr to readable format
  const dateMatch = str.match(/Date\(.*?days_since_epoch:\s*(\d+)/);
  if (dateMatch) {
    return new Date(Number(dateMatch[1]) * 86400000).toISOString().slice(0, 10);
  }
  // Safety net: convert raw WASM Time repr to readable format
  const timeMatch = str.match(/Time\(.*?nanos_since_midnight:\s*(\d+)/);
  if (timeMatch) {
    const totalNanos = Number(timeMatch[1]);
    const totalSeconds = Math.floor(totalNanos / 1e9);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }
  // Safety net: convert raw WASM Duration repr to readable format
  const durMatch = str.match(/Duration\(.*?months:\s*(\d+).*?days:\s*(\d+).*?nanos:\s*(\d+)/);
  if (durMatch) {
    const months = Number(durMatch[1]);
    const days = Number(durMatch[2]);
    const nanos = Number(durMatch[3]);
    const totalSeconds = Math.floor(nanos / 1e9);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    const parts: string[] = [];
    if (months > 0) parts.push(`${months} month${months !== 1 ? 's' : ''}`);
    if (days > 0) parts.push(`${days} day${days !== 1 ? 's' : ''}`);
    const time = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    if (h > 0 || m > 0 || s > 0) parts.push(time);
    return parts.length > 0 ? parts.join(' ') : '0 days';
  }
  return str;
}
