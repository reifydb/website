import React, {useState} from 'react';
import {EditorContent} from './components/editor';
import {useWebSocketConnection} from './hooks/ws';
import {useQueryExecution} from './hooks/execute';
import {SavedQuery} from './utils/types';
import {sampleQueries, WEBSOCKET_URL} from './utils/constants';
import {copyToClipboard as copyText, downloadFile, generateCSVContent} from './utils/utils';
import {Navbar} from "@components/navbar.tsx";
import {StatusCards} from "./components/status";
import {Sidebar} from "./components/sidebar";
import {FullscreenEditor} from "@pages/demo/components/fullscreen.tsx";
import {Footer} from "@components/footer.tsx";

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
            setQueryHistory(prev => [newHistoryItem, ...prev]);
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
        <>
            {fullscreen ? (
                <FullscreenEditor
                    isConnected={isConnected}
                    isExecuting={isExecuting}
                    query={query}
                    result={result}
                    error={error}
                    onQueryChange={setQuery}
                    onExecute={handleExecuteQuery}
                    onClose={handleCloseFullscreen}
                    onCopyResults={handleCopyResults}
                    onDownloadResults={handleDownloadResults}
                />
            ) : (
                <div className="flex flex-col min-h-screen bg-[#0b0c10] text-white">
                    <Navbar/>

                    <div className="flex flex-1 min-h-0">
                        <Sidebar
                            sampleQueries={sampleQueries}
                            queryHistory={queryHistory}
                            onLoadQuery={handleLoadQuery}
                        />

                        <main className="flex-1 p-6 flex flex-col min-h-0">
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold mb-2">Demo</h2>
                                <p className="text-gray-400">
                                    Write and execute RQL queries against the demo database. Results support multiple
                                    tables.
                                </p>
                            </div>

                            <StatusCards
                                isConnected={isConnected}
                                result={result}
                                queryHistoryLength={queryHistory.length}
                            />

                            <div
                                className="relative w-full rounded-xl overflow-hidden border border-gray-700 bg-[#0e0f14] shadow-xl flex-1 min-h-0">
                                <EditorContent
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
                    <Footer/>
                </div>
            )}
        </>
    );
}