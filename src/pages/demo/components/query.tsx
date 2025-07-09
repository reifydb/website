import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import {Maximize2, Play, Square, X} from 'lucide-react';
import {ConnectionStatus} from './status';

import {ResultsContent, ResultsHeader,} from './result';
import {QueryError, QueryResult} from "@pages/demo/utils/types";

interface QueryEditorContentProps {
    isFullscreen: boolean;
    isConnected: boolean;
    isExecuting: boolean;
    query: string;
    result: QueryResult | null;
    error: QueryError | null;
    onQueryChange: (query: string) => void;
    onExecute: () => void;
    onToggleFullscreen: () => void;
    onClose?: () => void;
    onCopyResults: () => void;
    onDownloadResults: () => void;
}

export const QueryEditorContent: React.FC<QueryEditorContentProps> = ({
                                                                          isFullscreen,
                                                                          isConnected,
                                                                          isExecuting,
                                                                          query,
                                                                          result,
                                                                          error,
                                                                          onQueryChange,
                                                                          onExecute,
                                                                          onToggleFullscreen,
                                                                          onClose,
                                                                          onCopyResults,
                                                                          onDownloadResults
                                                                      }) => {
    const textareaRef = useRef<QueryTextareaRef>(null);

    return (
        <div className={`flex flex-col ${isFullscreen ? 'h-full' : 'h-96'} bg-[#0e0f14]`}>
            {/* Query Input Section */}
            <div className="flex flex-col flex-1 min-w-0">
                <QueryHeader
                    isConnected={isConnected}
                    isExecuting={isExecuting}
                    isFullscreen={isFullscreen}
                    onExecute={onExecute}
                    onToggleFullscreen={onToggleFullscreen}
                    onClose={onClose}
                />

                <QueryTextarea
                    ref={textareaRef}
                    value={query}
                    onChange={onQueryChange}
                    onExecute={onExecute}
                />
            </div>

            {/* Results Section */}
            <div className="flex flex-col flex-1 border-t border-gray-800">
                <ResultsHeader
                    result={result}
                    onCopyResults={onCopyResults}
                    onDownloadResults={onDownloadResults}
                />

                <div className="flex-1 overflow-auto p-4 space-y-4">
                    <ResultsContent
                        isExecuting={isExecuting}
                        result={result}
                        error={error}
                    />
                </div>
            </div>
        </div>
    );
};

interface QueryHeaderProps {
    isConnected: boolean;
    isExecuting: boolean;
    isFullscreen: boolean;
    onExecute: () => void;
    onToggleFullscreen: () => void;
    onClose?: () => void;
}

export const QueryHeader: React.FC<QueryHeaderProps> = ({
                                                            isConnected,
                                                            isExecuting,
                                                            isFullscreen,
                                                            onExecute,
                                                            onToggleFullscreen,
                                                            onClose
                                                        }) => {
    return (
        <div
            className="flex items-center justify-between px-4 py-2 border-b border-gray-800 text-sm text-gray-400 bg-[#0d0e12]">
            <div className="flex items-center gap-3">
                <span className="font-mono">RQL</span>
                <ConnectionStatus isConnected={isConnected}/>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={onExecute}
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
                    <button onClick={onToggleFullscreen} className="hover:text-white">
                        <Maximize2 className="w-4 h-4"/>
                    </button>
                )}
                {isFullscreen && onClose && (
                    <button onClick={onClose} className="hover:text-white">
                        <X className="w-5 h-5"/>
                    </button>
                )}
            </div>
        </div>
    );
};


interface QueryTextareaProps {
    value: string;
    onChange: (value: string) => void;
    onExecute: () => void;
}

export interface QueryTextareaRef {
    focus: () => void;
}

export const QueryTextarea = forwardRef<QueryTextareaRef, QueryTextareaProps>(
    ({value, onChange, onExecute}, ref) => {
        const textareaRef = useRef<HTMLTextAreaElement>(null);

        useImperativeHandle(ref, () => ({
            focus: () => textareaRef.current?.focus()
        }));

        const handleKeyDown = (e: React.KeyboardEvent) => {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                onExecute();
            }

            if (e.key === 'Tab') {
                e.preventDefault();
                const textarea = e.target as HTMLTextAreaElement;
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                const currentValue = textarea.value;

                onChange(currentValue.substring(0, start) + '  ' + currentValue.substring(end));

                setTimeout(() => {
                    textarea.selectionStart = textarea.selectionEnd = start + 2;
                }, 0);
            }
        };

        return (
            <div className="flex-1 relative">
        <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full h-full p-4 bg-transparent text-gray-100 font-mono text-sm leading-relaxed resize-none outline-none"
            placeholder="Enter your RQL query here..."
            spellCheck={false}
        />
            </div>
        );
    }
);