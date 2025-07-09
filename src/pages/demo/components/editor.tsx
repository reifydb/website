import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import {Maximize2, Play, Square, X} from 'lucide-react';
import {ConnectionStatus} from './status';

import {ResultsContent, ResultsHeader,} from './result';
import {QueryError, QueryResult} from "@pages/demo/utils/types";

interface EditorContentProps {
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

export const EditorContent: React.FC<EditorContentProps> = ({
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
    const textareaRef = useRef<EditorTextareaRef>(null);

    return (
        <div className="flex flex-col bg-[#0e0f14]">
            <div className="flex flex-col">
                <EditorHeader
                    isConnected={isConnected}
                    isExecuting={isExecuting}
                    isFullscreen={isFullscreen}
                    onExecute={onExecute}
                    onToggleFullscreen={onToggleFullscreen}
                    onClose={onClose}
                />

                <EditorTextarea
                    ref={textareaRef}
                    value={query}
                    onChange={onQueryChange}
                    onExecute={onExecute}
                />
            </div>

            <div className="flex flex-col border-t border-gray-800">
                <ResultsHeader
                    result={result}
                    onCopyResults={onCopyResults}
                    onDownloadResults={onDownloadResults}
                />

                <div className="p-4 space-y-4">
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

interface EditorHeaderProps {
    isConnected: boolean;
    isExecuting: boolean;
    isFullscreen: boolean;
    onExecute: () => void;
    onToggleFullscreen: () => void;
    onClose?: () => void;
}

export const EditorHeader: React.FC<EditorHeaderProps> = ({
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


interface EditorTextareaProps {
    value: string;
    onChange: (value: string) => void;
    onExecute: () => void;
}

export interface EditorTextareaRef {
    focus: () => void;
}

export const EditorTextarea = forwardRef<EditorTextareaRef, EditorTextareaProps>(
    ({value, onChange, onExecute}, ref) => {
        const textareaRef = useRef<HTMLTextAreaElement>(null);

        useImperativeHandle(ref, () => ({
            focus: () => textareaRef.current?.focus()
        }));

        const adjustHeight = () => {
            const textarea = textareaRef.current;
            if (textarea) {
                textarea.style.height = 'auto';
                textarea.style.height = `${textarea.scrollHeight}px`;
            }
        };

        const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            onChange(e.target.value);
            adjustHeight();
        };

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
                    adjustHeight();
                }, 0);
            }
        };

        React.useEffect(() => {
            adjustHeight();
        }, [value]);

        return (
            <div className="relative">
                <textarea
                    ref={textareaRef}
                    value={value}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    className="w-full p-4 bg-transparent text-gray-100 font-mono text-sm leading-relaxed resize-none outline-none min-h-[100px] overflow-hidden"
                    placeholder="Enter your RQL query here..."
                    spellCheck={false}
                />
            </div>
        );
    }
);