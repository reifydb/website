import React, {useRef} from 'react';
import {Maximize2, Play, Square, X} from 'lucide-react';
import {ConnectionStatus} from './status';

import {ResultsContent, ResultsHeader,} from './result';
import {QueryError, QueryResult} from "@pages/demo/utils/types";
import {RqlEditor, RqlEditorRef} from './monaco.tsx';

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
    const editorRef = useRef<RqlEditorRef>(null);

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

                <RqlEditor
                    ref={editorRef}
                    value={query}
                    onChange={onQueryChange}
                    onExecute={onExecute}
                    language="rql"
                    height="200px"
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
