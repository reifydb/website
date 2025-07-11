import {useCallback, useEffect, useRef, useState} from 'react';
import {QueryError, QueryResult, ReifyError} from '../utils/types';
import {WsClient} from "@reifydb/client";

export const useQueryExecution = (client: WsClient | null) => {
    const [isExecuting, setIsExecuting] = useState(false);
    const [result, setResult] = useState<QueryResult | null>(null);
    const [error, setError] = useState<QueryError | null>(null);

    const clientRef = useRef(client);

    // Always keep the ref up to date
    useEffect(() => {
        clientRef.current = client;
    }, [client]);

    const executeQuery = useCallback(async (query: string) => {
        const currentClient = clientRef.current;

        if (!currentClient || !query.trim()) return;

        setIsExecuting(true);
        setError(null);
        setResult(null);

        const startTime = Date.now();

        try {
            const tables = await currentClient.tx(query);
            const executionTime = Date.now() - startTime;
            const rowCounts = Array.isArray(tables) ? tables.map(table => table.length) : [0];

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
    }, []); // Empty dependency array - callback never recreated

    const clearResults = useCallback(() => {
        setResult(null);
        setError(null);
    }, []);

    return { isExecuting, result, error, executeQuery, clearResults };
};