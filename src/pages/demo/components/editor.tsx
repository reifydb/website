import React, {useRef, useState} from 'react';
import {Maximize2, Play, Square, X, Terminal} from 'lucide-react';
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
    const dockerCommand = "docker run -p 127.0.0.1:8090:8090 reifydb/testcontainer";
    const [copied, setCopied] = useState(false);
    
    const handleCopyCommand = () => {
        navigator.clipboard.writeText(dockerCommand);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!isConnected) {
        return (
            <div className="bg-yellow-900/20 border-b border-yellow-600/30 p-4">
                <div className="flex items-center gap-2 text-yellow-400 mb-2">
                    <Terminal className="w-5 h-5"/>
                    <span className="font-medium">No ReifyDB server running</span>
                </div>
                <p className="text-sm text-gray-300 mb-3">
                    At the moment, no server exists to run the demo environment. You need to start the ReifyDB test container yourself:
                </p>
                <div className="flex items-center gap-2 mb-2">
                    <code className="text-sm bg-black px-3 py-2 rounded flex-1 text-green-400 font-mono">
                        {dockerCommand}
                    </code>
                    <button
                        onClick={handleCopyCommand}
                        className="text-blue-400 hover:text-blue-300 text-sm px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
                    >
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                </div>
                <p className="text-xs text-gray-400">
                    After running this command, refresh the page to connect to the demo database.
                </p>
            </div>
        );
    }

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
