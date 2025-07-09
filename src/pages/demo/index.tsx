import React, {useState} from 'react';
import {Sidebar} from './components/sidebar';
import {QueryEditorContent} from './components/query.tsx';
import {StatusCards} from './components/status.tsx';
import {useWebSocketConnection} from './hooks/ws.ts';
import {useQueryExecution} from './hooks/execute.ts';
import {SavedQuery} from './utils/types';
import {sampleQueries, WEBSOCKET_URL} from './utils/constants';
import {copyToClipboard as copyText, downloadFile, generateCSVContent} from './utils/utils';
import {Navbar} from "@components/navbar.tsx";

export function DemoPage() {
    const [fullscreen, setFullscreen] = useState(false);
    const [query, setQuery] = useState(sampleQueries[0].query);
    const [queryHistory, setQueryHistory] = useState<SavedQuery[]>([]);

    const {isConnected, client} = useWebSocketConnection(WEBSOCKET_URL);
    const {
        isExecuting,
        result,
        error,
        executeQuery,
        copyToClipboard,
        downloadResults
    } = useQueryExecution(client);

    const handleExecuteQuery = async () => {
        await executeQuery(query);

        // Add to history after successful execution
        if (result) {
            const newHistoryItem: SavedQuery = {
                id: Date.now().toString(),
                name: `Query ${queryHistory.length + 1}`,
                query,
                lastRun: new Date()
            };
            setQueryHistory(prev => [newHistoryItem, ...prev.slice(0, 9)]);
        }
    };

    const handleLoadQuery = (savedQuery: SavedQuery) => {
        setQuery(savedQuery.query);
    };

    const handleToggleFullscreen = () => {
        setFullscreen(!fullscreen);
    };

    const handleCloseFullscreen = () => {
        setFullscreen(false);
    };

    const handleCopyResults = async () => {
        if (result) {
            await copyText(JSON.stringify(result.tables, null, 2));
        }
    };

    const handleDownloadResults = () => {
        if (result) {
            const csvContent = generateCSVContent(result);
            downloadFile(csvContent, 'rql_results.csv', 'text/csv');
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            <Navbar/>

            <div className="flex">
                <Sidebar
                    sampleQueries={sampleQueries}
                    queryHistory={queryHistory}
                    onLoadQuery={handleLoadQuery}
                />

                <main className="flex-1 p-6">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold mb-2">Query Editor</h2>
                        <p className="text-gray-400">
                            Write and execute RQL queries against the demo database. Results support multiple tables.
                        </p>
                    </div>

                    <StatusCards
                        isConnected={isConnected}
                        result={result}
                        queryHistoryLength={queryHistory.length}
                    />

                    <div
                        className="relative w-full rounded-xl overflow-hidden border border-gray-700 bg-[#0e0f14] shadow-xl">
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
                            onCopyResults={handleCopyResults}
                            onDownloadResults={handleDownloadResults}
                        />
                    </div>
                </main>
            </div>

            {fullscreen && (
                <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
                    <div
                        className="relative w-full max-w-7xl h-full border border-gray-700 rounded-lg bg-[#0e0f14] shadow-2xl overflow-hidden">
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
                            onCopyResults={handleCopyResults}
                            onDownloadResults={handleDownloadResults}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}