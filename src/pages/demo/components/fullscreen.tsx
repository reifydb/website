import React from 'react';
import {EditorContent} from "./editor";
import {QueryError, QueryResult} from "../utils/types";

interface FullscreenEditorProps {
    isConnected: boolean;
    isExecuting: boolean;
    query: string;
    result: QueryResult | null;
    error: QueryError | null;
    onQueryChange: (query: string) => void;
    onExecute: () => void;
    onClose: () => void;
    onCopyResults: () => void;
    onDownloadResults: () => void;
}

export const FullscreenEditor: React.FC<FullscreenEditorProps> = ({
                                                                      isConnected,
                                                                      isExecuting,
                                                                      query,
                                                                      result,
                                                                      error,
                                                                      onQueryChange,
                                                                      onExecute,
                                                                      onClose,
                                                                      onCopyResults,
                                                                      onDownloadResults
                                                                  }) => {
    return (
        <div className="fixed inset-0 bg-gray-900 text-gray-100 z-50 flex flex-col">
            <div className="flex-1 overflow-auto">
                <EditorContent
                    isFullscreen={true}
                    isConnected={isConnected}
                    isExecuting={isExecuting}
                    query={query}
                    result={result}
                    error={error}
                    onQueryChange={onQueryChange}
                    onExecute={onExecute}
                    onToggleFullscreen={onClose}
                    onClose={onClose}
                    onCopyResults={onCopyResults}
                    onDownloadResults={onDownloadResults}
                />
            </div>
        </div>
    );
};