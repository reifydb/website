import React from 'react';
import {BookOpen, Clock, History, Zap} from 'lucide-react';
import {SavedQuery} from '../utils/types';

interface QuerySidebarProps {
    sampleQueries: SavedQuery[];
    queryHistory: SavedQuery[];
    onLoadQuery: (query: SavedQuery) => void;
}

export const Sidebar: React.FC<QuerySidebarProps> = ({
                                                              sampleQueries,
                                                              queryHistory,
                                                              onLoadQuery
                                                          }) => {
    return (
        <aside className="w-72 bg-gray-800 border-r border-gray-700 min-h-screen">
            <div className="p-4">
                <div className="space-y-4">
                    <div>
                        <h3 className="text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                            <BookOpen className="w-4 h-4"/>
                            Elodie Carelog
                        </h3>
                        <div className="space-y-1">
                            {sampleQueries.map((savedQuery) => (
                                <button
                                    key={savedQuery.id}
                                    onClick={() => onLoadQuery(savedQuery)}
                                    className="w-full text-left px-3 py-2 rounded hover:bg-gray-700 text-sm text-gray-300 transition-colors"
                                >
                                    <div className="flex items-center gap-2">
                                        <Zap className="w-3 h-3 text-yellow-400"/>
                                        <span className="truncate">{savedQuery.name}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {queryHistory.length > 0 && (
                        <div>
                            <h3 className="text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                                <History className="w-4 h-4"/>
                                Recent Queries
                            </h3>
                            <div className="space-y-1">
                                {queryHistory.slice(0, 5).map((historyItem) => (
                                    <button
                                        key={historyItem.id}
                                        onClick={() => onLoadQuery(historyItem)}
                                        className="w-full text-left px-3 py-2 rounded hover:bg-gray-700 text-sm text-gray-300 transition-colors"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-3 h-3 text-gray-500"/>
                                            <span className="truncate">{historyItem.name}</span>
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            {historyItem.lastRun.toLocaleTimeString()}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
};