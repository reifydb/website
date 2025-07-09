import React from 'react';
import {AlertCircle, CheckCircle, Clock, Copy, Database, Download,} from 'lucide-react';
import {QueryError, QueryResult} from '../utils/types';


interface ResultsContentProps {
    isExecuting: boolean;
    result: QueryResult | null;
    error: QueryError | null;
}

export const ResultsContent: React.FC<ResultsContentProps> = ({
                                                                  isExecuting,
                                                                  result,
                                                                  error
                                                              }) => {
    if (isExecuting) {
        return (
            <div className="flex items-center gap-2 text-blue-400">
                <Clock className="w-4 h-4 animate-spin"/>
                <span>Executing query...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-900/30 border border-red-700/50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-red-400 mb-2">
                    <AlertCircle className="w-4 h-4"/>
                    <span className="font-medium">Query Error</span>
                    <span className="text-xs text-gray-400">
            ({error.executionTime}ms)
          </span>
                </div>
                <pre className="text-sm text-red-300 whitespace-pre-wrap">
          {error.error.toString()}
        </pre>
            </div>
        );
    }

    if (result) {
        return (
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle className="w-4 h-4"/>
                    <span className="font-medium">Query executed successfully</span>
                    <span className="text-xs text-gray-400">
            ({result.executionTime}ms)
          </span>
                </div>

                {result.tables.map((table, index) => (
                    <div key={index}>
                        <ResultTable table={table} tableIndex={index}/>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center h-32 text-gray-500">
            <div className="text-center">
                <Database className="w-8 h-8 mx-auto mb-2 opacity-50"/>
                <p>Run a query to see results</p>
            </div>
        </div>
    );
};

interface ResultsHeaderProps {
    result: QueryResult | null;
    onCopyResults: () => void;
    onDownloadResults: () => void;
}

export const ResultsHeader: React.FC<ResultsHeaderProps> = ({
                                                                result,
                                                                onCopyResults,
                                                                onDownloadResults
                                                            }) => {
    return (
        <div
            className="flex items-center justify-between px-4 py-2 border-b border-gray-800 text-sm text-gray-400 bg-[#0d0e12]">
            <div className="flex items-center gap-2">
                <Database className="w-4 h-4"/>
                <span>Results</span>
            </div>
            {result && (
                <div className="flex items-center gap-2">
                    <button
                        onClick={onCopyResults}
                        className="hover:text-white"
                        title="Copy as JSON"
                    >
                        <Copy className="w-4 h-4"/>
                    </button>
                    <button
                        onClick={onDownloadResults}
                        className="hover:text-white"
                        title="Download as CSV"
                    >
                        <Download className="w-4 h-4"/>
                    </button>
                </div>
            )}
        </div>
    );
};

interface ResultTableProps {
    table: any[];
    tableIndex: number;
}

export const ResultTable: React.FC<ResultTableProps> = ({table, tableIndex}) => {
    if (!table || table.length === 0) {
        return (
            <div className="bg-gray-800/50 rounded-lg p-4 text-center text-gray-400">
                No results for table {tableIndex + 1}
            </div>
        );
    }

    const headers = Object.keys(table[0]);

    return (
        <div className="bg-gray-800/50 rounded-lg overflow-hidden">
            <div className="bg-gray-700/50 px-4 py-2 border-b border-gray-600">
        <span className="text-sm font-medium text-gray-300">
          Table {tableIndex + 1} ({table.length} row{table.length !== 1 ? 's' : ''})
        </span>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                    <tr className="bg-gray-700/30">
                        {headers.map((header, i) => (
                            <th key={i} className="px-4 py-2 text-left text-gray-300 font-medium">
                                {header}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {table.map((row, i) => (
                        <tr key={i} className="border-t border-gray-700/50 hover:bg-gray-700/20">
                            {headers.map((header, j) => (
                                <td key={j} className="px-4 py-2 text-gray-100">
                                    {String(row[header])}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};