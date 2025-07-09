import React, { useState } from 'react';
import { Sidebar } from './sidebar';
import { QueryEditorContent } from './query';
import { StatusCards } from './status';
import { useWebSocketConnection } from './useWebSocketConnection';
import { useQueryExecution } from './useQueryExecution';
import { SavedQuery } from '../utils/types';
import {Navbar} from "@components/navbar.tsx";

const sampleQueries: SavedQuery[] = [
    {
        id: '1',
        name: 'Sample Query 1',
        query: 'SELECT * FROM users LIMIT 10',
        lastRun: new Date()
    },
    // Add more sample queries as needed
];

export function Editor() {
    const [fullscreen, setFullscreen] = useState(false);
    const [query, setQuery] = useState(sampleQueries[0].query);
    const [queryHistory, setQueryHistory] = useState<SavedQuery[]>([]);

    const { isConnected, client } = useWebSocketConnection("ws://127.0.0.1:9001");
    const {
        isExecuting,
        result,
        error,
        executeQuery,
        copyToClipboard,
        downloadResults
    } = useQueryExecution(client);

    const handleExecuteQuery = () => {
        executeQuery(query);
    };

    const handleLoadQuery = (savedQuery: SavedQuery) => {
        setQuery(savedQuery.query);
        // Clear previous results when loading a new query
        // This would be handled by the useQueryExecution hook if needed
    };

    const handleToggleFullscreen = () => {
        setFullscreen(!fullscreen);
    };

    const handleCloseFullscreen = () => {
        setFullscreen(false);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            <Navbar />

            <div className="flex">
                {/* Sidebar */}
                <Sidebar
                    sampleQueries={sampleQueries}
                    queryHistory={queryHistory}
                    onLoadQuery={handleLoadQuery}
                />

                {/* Main Content */}
                <main className="flex-1 p-6">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold mb-2">Query Editor</h2>
                        <p className="text-gray-400">
                            Write and execute RQL queries against the demo database. Results support multiple tables.
                        </p>
                    </div>

                    {/* Stats Cards */}
                    <StatusCards
                        isConnected={isConnected}
                        result={result}
                        queryHistoryLength={queryHistory.length}
                    />

                    {/* Content */}
                    <div className="relative w-full rounded-xl overflow-hidden border border-gray-700 bg-[#0e0f14] shadow-xl">
                        <QueryEditorContent
                            isFullscreen={false}
                            isConnected={isConnected}
                            isExecuting={isExecuting}
                            query={query}
                            result={result}
                            error={error}
                            onQueryChange={setQuery}
                            onExecute={handleExecuteQuery}
                            onToggleFullscreen={handleToggleFullscreen}
                            onCopyResults={copyToClipboard}
                            onDownloadResults={downloadResults}
                        />
                    </div>
                </main>
            </div>

            {/* Fullscreen Modal */}
            {fullscreen && (
                <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
                    <div className="relative w-full max-w-7xl h-full border border-gray-700 rounded-lg bg-[#0e0f14] shadow-2xl overflow-hidden">
                        <QueryEditorContent
                            isFullscreen={true}
                            isConnected={isConnected}
                            isExecuting={isExecuting}
                            query={query}
                            result={result}
                            error={error}
                            onQueryChange={setQuery}
                            onExecute={handleExecuteQuery}
                            onToggleFullscreen={handleToggleFullscreen}
                            onClose={handleCloseFullscreen}
                            onCopyResults={copyToClipboard}
                            onDownloadResults={downloadResults}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}