import {useCallback, useState} from 'react';
import {QueryError, QueryResult, ReifyError} from '../utils/types';
import {MockWsClient} from "@pages/demo/hooks/ws.ts";

export const useQueryExecution = (client: MockWsClient | null) => {
    const [isExecuting, setIsExecuting] = useState(false);
    const [result, setResult] = useState<QueryResult | null>(null);
    const [error, setError] = useState<QueryError | null>(null);

    const executeQuery = useCallback(async (query: string) => {
        if (!client || !query.trim()) return;

        setIsExecuting(true);
        setError(null);
        setResult(null);

        const startTime = Date.now();

        try {
            const tables = await client.tx(query);
            const executionTime = Date.now() - startTime;
            const rowCounts = Array.isArray(tables) ? tables.map(table => table.length) : [tables.length];

            setResult({
                tables: Array.isArray(tables) ? tables : [tables],
                executionTime,
                rowCounts
            });
        } catch (err) {
            const executionTime = Date.now() - startTime;
            setError({
                error: err as ReifyError,
                executionTime
            });
        } finally {
            setIsExecuting(false);
        }
    }, [client]);

    const copyToClipboard = useCallback(() => {
        if (result) {
            navigator.clipboard.writeText(JSON.stringify(result.tables, null, 2));
        }
    }, [result]);

    const downloadResults = useCallback(() => {
        if (!result) return;

        const csvContent = result.tables.map((table, index) => {
            if (table.length === 0) return `Table ${index + 1}: No results`;

            const headers = Object.keys(table[0]);
            const rows = table.map(row => headers.map(h => row[h]).join(','));
            return `Table ${index + 1}:\n${headers.join(',')}\n${rows.join('\n')}`;
        }).join('\n\n');

        const blob = new Blob([csvContent], {type: 'text/csv'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'rql_results.csv';
        a.click();
        URL.revokeObjectURL(url);
    }, [result]);

    return {
        isExecuting,
        result,
        error,
        executeQuery,
        copyToClipboard,
        downloadResults
    };
};