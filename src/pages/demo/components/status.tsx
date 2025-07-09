import React from 'react';
import {Activity, CheckCircle, Database} from 'lucide-react';
import {QueryResult} from '../utils/types';

interface ConnectionStatusProps {
    isConnected: boolean;
}

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({isConnected}) => {
    return (
        <div className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}/>
            <span className="text-xs">
        {isConnected ? 'Connected' : 'Disconnected'}
      </span>
        </div>
    );
};

interface StatusCardsProps {
    isConnected: boolean;
    result: QueryResult | null;
    queryHistoryLength: number;
}

export const StatusCards: React.FC<StatusCardsProps> = ({
                                                            isConnected,
                                                            result,
                                                            queryHistoryLength
                                                        }) => {
    return (
        <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-blue-400 mb-1">
                    <Activity className="w-4 h-4"/>
                    <span className="text-sm">Connection</span>
                </div>
                <div className="text-xl font-semibold">
                    {isConnected ? "Active" : "Disconnected"}
                </div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-green-400 mb-1">
                    <CheckCircle className="w-4 h-4"/>
                    <span className="text-sm">Last Execution</span>
                </div>
                <div className="text-xl font-semibold">
                    {result ? `${result.executionTime}ms` : "—"}
                </div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-purple-400 mb-1">
                    <Database className="w-4 h-4"/>
                    <span className="text-sm">Queries Run</span>
                </div>
                <div className="text-xl font-semibold">{queryHistoryLength}</div>
            </div>
        </div>
    );
};