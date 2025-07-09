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
        <aside className="w-72 bg-gradient-to-b from-gray-900 to-gray-800 border-r border-gray-600/50 min-h-screen shadow-xl">
            <div className="p-6">
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <div className="w-1 h-4 bg-yellow-400 rounded-full"></div>
                            Elodie Care log
                        </h3>
                        <div className="space-y-1">
                            {sampleQueries.map((savedQuery) => (
                                <button
                                    key={savedQuery.id}
                                    onClick={() => onLoadQuery(savedQuery)}
                                    className="group w-full text-left px-4 py-3 rounded-lg hover:bg-gray-700/50 text-sm text-gray-300 transition-all duration-200 border border-transparent hover:border-gray-600/30"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 bg-yellow-400/10 rounded-md flex items-center justify-center group-hover:bg-yellow-400/20 transition-colors">
                                            <Zap className="w-3 h-3 text-yellow-400"/>
                                        </div>
                                        <span className="truncate font-medium group-hover:text-white transition-colors">
                                        {savedQuery.name}
                                    </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Recent Queries Section */}
                    {queryHistory.length > 0 && (
                        <div>
                            <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                <div className="w-1 h-4 bg-blue-400 rounded-full"></div>
                                Recent Queries
                            </h3>
                            <div className="space-y-1">
                                {queryHistory.slice(0, 5).map((historyItem) => (
                                    <button
                                        key={historyItem.id}
                                        onClick={() => onLoadQuery(historyItem)}
                                        className="group w-full text-left px-4 py-3 rounded-lg hover:bg-gray-700/50 text-sm text-gray-300 transition-all duration-200 border border-transparent hover:border-gray-600/30"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-6 h-6 bg-blue-400/10 rounded-md flex items-center justify-center group-hover:bg-blue-400/20 transition-colors">
                                                <Clock className="w-3 h-3 text-blue-400"/>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                            <span className="truncate font-medium group-hover:text-white transition-colors block">
                                                {historyItem.name}
                                            </span>
                                                <div className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors mt-0.5">
                                                    {historyItem.lastRun.toLocaleTimeString()}
                                                </div>
                                            </div>
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