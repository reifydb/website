// Types from your existing code
export type Kind =
    | "Bool" | "Float4" | "Float8"
    | "Int1" | "Int2" | "Int4" | "Int8" | "Int16"
    | "Uint1" | "Uint2" | "Uint4"
    | "String" | "Undefined";

export interface WebsocketFrame {
    columns: WebsocketColumn[];
}

export interface DiagnosticColumn {
    name: string,
    value: Kind,
}

export interface Span {
    offset: number,
    line: number,
    fragment: string
}

export interface Diagnostic {
    code: string,
    statement?: string;
    message: string,
    column?: DiagnosticColumn,
    span?: Span,
    label?: string,
    help?: string,
    notes: Array<string>,
}

export interface WebsocketColumn {
    name: string;
    kind: Kind;
    data: string[];
}

export interface ErrorResponse {
    id: string;
    type: "Err";
    payload: {
        diagnostic: Diagnostic;
    };
}

export interface TxResponse {
    id: string;
    type: "Tx";
    payload: {
        frames: WebsocketFrame[];
    };
}

export interface RxResponse {
    id: string;
    type: "Rx";
    payload: {
        frames: WebsocketFrame[];
    };
}

export class ReifyError extends Error {
    public readonly code: string;
    public readonly statement?: string;
    public readonly column?: DiagnosticColumn;
    public readonly span?: Span;
    public readonly label?: string;
    public readonly help?: string;
    public readonly notes: string[];

    constructor(response: ErrorResponse) {
        const diagnostic = response.payload.diagnostic;
        const message = `[${diagnostic.code}] ${diagnostic.message}` +
            (diagnostic.label ? ` — ${diagnostic.label}` : "");

        super(message);

        this.name = "ReifyError";
        this.code = diagnostic.code;
        this.statement = diagnostic.statement;
        this.column = diagnostic.column;
        this.span = diagnostic.span;
        this.label = diagnostic.label;
        this.help = diagnostic.help;
        this.notes = diagnostic.notes ?? [];

        Object.setPrototypeOf(this, new.target.prototype);
    }

    toString(): string {
        const position = this.span
            ? `line ${this.span.line}, offset ${this.span.offset}`
            : "unknown position";

        const notes = this.notes.length
            ? `\nNotes:\n- ${this.notes.join("\n- ")}`
            : "";

        const help = this.help
            ? `\nHelp: ${this.help}`
            : "";

        return `${this.name}: ${this.message}\nAt ${position}${help}${notes}`;
    }
}

// Mock WebSocket client for demo
class MockWsClient {
    static async connect(url: string): Promise<MockWsClient> {
        await new Promise(resolve => setTimeout(resolve, 500));
        return new MockWsClient();
    }

    async tx<T extends readonly Record<string, unknown>[]>(statement: string): Promise<{
        [K in keyof T]: T[K][];
    }> {
        await new Promise(resolve => setTimeout(resolve, 800));

        const mockData = [
            [
                {user: "Alice Johnson", overdue_tasks: 3, department: "Engineering"},
                {user: "Bob Smith", overdue_tasks: 1, department: "Design"},
                {user: "Carol Williams", overdue_tasks: 5, department: "Product"},
                {user: "David Brown", overdue_tasks: 2, department: "Marketing"}
            ],
            [
                {task_id: 1, title: "Fix login bug", priority: "high", assigned_to: "Alice Johnson"},
                {task_id: 2, title: "Update docs", priority: "medium", assigned_to: "Bob Smith"},
                {task_id: 3, title: "UI redesign", priority: "low", assigned_to: "Carol Williams"}
            ]
        ];

        return mockData as any;
    }

    async rx<T extends readonly Record<string, unknown>[]>(statement: string): Promise<{
        [K in keyof T]: T[K][];
    }> {
        return this.tx(statement);
    }
}

type QueryResult = {
    tables: any[][];
    executionTime: number;
    rowCounts: number[];
};

type QueryError = {
    error: ReifyError;
    executionTime: number;
};

type SavedQuery = {
    id: string;
    name: string;
    query: string;
    lastRun: Date;
};


export const Demo = () => {
    return (
        <h1>Demo</h1>
    )
}

import React, {useEffect, useRef, useState} from "react";
import {AlertCircle, CheckCircle, Clock, Copy, Database, Download, Maximize2, Play, Square, X} from "lucide-react";


// Sample queries for the sidebar

export function CodeEditor() {
    const [fullscreen, setFullscreen] = useState(false);
    const [query, setQuery] = useState("");
    const [isExecuting, setIsExecuting] = useState(false);
    const [result, setResult] = useState<QueryResult | null>(null);
    const [error, setError] = useState<QueryError | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [client, setClient] = useState<MockWsClient | null>(null);
    const [queryHistory, setQueryHistory] = useState<SavedQuery[]>([]);

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const connect = async () => {
            try {
                const wsClient = await MockWsClient.connect("ws://127.0.0.1:9001");
                setClient(wsClient);
                setIsConnected(true);
            } catch (err) {
                console.error("Failed to connect:", err);
                setIsConnected(false);
            }
        };
        connect();
    }, []);

    const executeQuery = async () => {
        // if (!client || !query.trim()) return;

        setIsExecuting(true);
        setError(null);
        setResult(null);

        const startTime = Date.now();

        try {
            const tables = await client.tx(query);
            const executionTime = Date.now() - startTime;
            const rowCounts = Array.isArray(tables) ? tables.map(table => table.length) : [tables.length];

            setResult({
                tables: Array.isArray(tables) ? tables : [tables],
                executionTime,
                rowCounts
            });

        } catch (err) {
            const executionTime = Date.now() - startTime;
            setError({
                error: err as ReifyError,
                executionTime
            });
        } finally {
            setIsExecuting(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        e.preventDefault();



        // if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
        //     e.preventDefault();
        //     executeQuery();
        // }
        //
        // if (e.key === 'Tab') {
        //     e.preventDefault();
        //     const textarea = e.target as HTMLTextAreaElement;
        //     const start = textarea.selectionStart;
        //     const end = textarea.selectionEnd;
        //     const value = textarea.value;
        //
        //     setQuery(value.substring(0, start) + '  ' + value.substring(end));
        //
        //     setTimeout(() => {
        //         textarea.selectionStart = textarea.selectionEnd = start + 2;
        //     }, 0);
        // }
    };

    const loadQuery = (savedQuery: SavedQuery) => {
        setQuery(savedQuery.query);
        setResult(null);
        setError(null);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    const downloadResults = () => {
        if (!result) return;

        const csvContent = result.tables.map((table, index) => {
            if (table.length === 0) return `Table ${index + 1}: No results`;

            const headers = Object.keys(table[0]);
            const rows = table.map(row => headers.map(h => row[h]).join(','));
            return `Table ${index + 1}:\n${headers.join(',')}\n${rows.join('\n')}`;
        }).join('\n\n');

        const blob = new Blob([csvContent], {type: 'text/csv'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'rql_results.csv';
        a.click();
        URL.revokeObjectURL(url);
    };

    const renderTable = (table: any[], tableIndex: number) => {
        if (!table || table.length === 0) {
            return (
                <div className="bg-gray-800/50 rounded-lg p-4 text-center text-gray-400">
                    No results for table {tableIndex + 1}
                </div>
            );
        }

        const headers = Object.keys(table[0]);

        return (
            <div className="bg-gray-800/50 rounded-lg overflow-hidden">
                <div className="bg-gray-700/50 px-4 py-2 border-b border-gray-600">
                    <span className="text-sm font-medium text-gray-300">
                        Table {tableIndex + 1} ({table.length} row{table.length !== 1 ? 's' : ''})
                    </span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                        <tr className="bg-gray-700/30">
                            {headers.map((header, i) => (
                                <th key={i} className="px-4 py-2 text-left text-gray-300 font-medium">
                                    {header}
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {table.map((row, i) => (
                            <tr key={i} className="border-t border-gray-700/50 hover:bg-gray-700/20">
                                {headers.map((header, j) => (
                                    <td key={j} className="px-4 py-2 text-gray-100">
                                        {String(row[header])}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    const Editor = ({isFullscreen}: { isFullscreen: boolean }) => (
        <div className={`flex flex-col ${isFullscreen ? 'h-full' : 'h-96'} bg-[#0e0f14]`}>
            {/* Query Input Section */}
            <div className="flex flex-col flex-1 min-w-0">
                <div
                    className="flex items-center justify-between px-4 py-2 border-b border-gray-800 text-sm text-gray-400 bg-[#0d0e12]">
                    <div className="flex items-center gap-3">
                        <span className="font-mono">RQL</span>
                        <div className="flex items-center gap-1">
                            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}/>
                            <span className="text-xs">
                            {isConnected ? 'Connected' : 'Disconnected'}
                        </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={executeQuery}
                            disabled={!isConnected || isExecuting}
                            className="flex items-center gap-1 px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white text-xs transition-colors"
                        >
                            {isExecuting ? (
                                <>
                                    <Square className="w-3 h-3"/>
                                    Executing...
                                </>
                            ) : (
                                <>
                                    <Play className="w-3 h-3"/>
                                    Run (⌘↵)
                                </>
                            )}
                        </button>
                        {!isFullscreen && (
                            <button onClick={() => setFullscreen(true)} className="hover:text-white">
                                <Maximize2 className="w-4 h-4"/>
                            </button>
                        )}
                        {isFullscreen && (
                            <button onClick={() => setFullscreen(false)} className="hover:text-white">
                                <X className="w-5 h-5"/>
                            </button>
                        )}
                    </div>
                </div>

                <div className="flex-1 relative">
                <textarea
                    ref={textareaRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full h-full p-4 bg-transparent text-gray-100 font-mono text-sm leading-relaxed resize-none outline-none"
                    placeholder="Enter your RQL query here..."
                    spellCheck={false}
                />
                    {/*<div className="absolute bottom-2 right-2 text-xs text-gray-500">*/}
                    {/*    Line {query.split('\n').length} | Col {query.length}*/}
                    {/*</div>*/}
                </div>
            </div>

            {/* Results Section */}
            <div className="flex flex-col flex-1 border-t border-gray-800">
                <div
                    className="flex items-center justify-between px-4 py-2 border-b border-gray-800 text-sm text-gray-400 bg-[#0d0e12]">
                    <div className="flex items-center gap-2">
                        <Database className="w-4 h-4"/>
                        <span>Results</span>
                    </div>
                    {result && (
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => copyToClipboard(JSON.stringify(result.tables, null, 2))}
                                className="hover:text-white"
                                title="Copy as JSON"
                            >
                                <Copy className="w-4 h-4"/>
                            </button>
                            <button
                                onClick={downloadResults}
                                className="hover:text-white"
                                title="Download as CSV"
                            >
                                <Download className="w-4 h-4"/>
                            </button>
                        </div>
                    )}
                </div>

                <div className="flex-1 overflow-auto p-4 space-y-4">
                    {isExecuting && (
                        <div className="flex items-center gap-2 text-blue-400">
                            <Clock className="w-4 h-4 animate-spin"/>
                            <span>Executing query...</span>
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-900/30 border border-red-700/50 rounded-lg p-4">
                            <div className="flex items-center gap-2 text-red-400 mb-2">
                                <AlertCircle className="w-4 h-4"/>
                                <span className="font-medium">Query Error</span>
                                <span className="text-xs text-gray-400">
                                ({error.executionTime}ms)
                            </span>
                            </div>
                            <pre className="text-sm text-red-300 whitespace-pre-wrap">
                            {error.error.toString()}
                        </pre>
                        </div>
                    )}

                    {result && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-green-400">
                                <CheckCircle className="w-4 h-4"/>
                                <span className="font-medium">Statements executed successfully</span>
                                <span className="text-xs text-gray-400">
                                ({result.executionTime}ms)
                            </span>
                            </div>

                            {result.tables.map((table, index) => (
                                <div key={index}>
                                    {renderTable(table, index)}
                                </div>
                            ))}
                        </div>
                    )}

                    {!isExecuting && !result && !error && (
                        <div className="flex items-center justify-center h-32 text-gray-500">
                            <div className="text-center">
                                <Database className="w-8 h-8 mx-auto mb-2 opacity-50"/>
                                <p>Run a query to see results</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div>
            <Editor isFullscreen={false}/>

            {/* Fullscreen Modal */}
            {fullscreen && (
                <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
                    <div
                        className="relative w-full max-w-7xl h-full border border-gray-700 rounded-lg bg-[#0e0f14] shadow-2xl overflow-hidden">
                        <Editor isFullscreen={true}/>
                    </div>
                </div>
            )}
        </div>
    );
}
