import {useEffect, useState} from 'react';


export const useWebSocketConnection = (url: string) => {
    const [isConnected, setIsConnected] = useState(false);
    const [client, setClient] = useState<MockWsClient | null>(null);

    useEffect(() => {
        const connect = async () => {
            try {
                const wsClient = await MockWsClient.connect(url);
                setClient(wsClient);
                setIsConnected(true);
            } catch (err) {
                console.error("Failed to connect:", err);
                setIsConnected(false);
            }
        };

        connect();
    }, [url]);

    return {isConnected, client};
};

// Mock WebSocket client for demo
class MockWsClient {
    static async connect(url: string): Promise<MockWsClient> {
        await new Promise(resolve => setTimeout(resolve, 500));
        return new MockWsClient();
    }

    async tx<T extends readonly Record<string, unknown>[]>(statement: string): Promise<{
        [K in keyof T]: T[K][];
    }> {
        await new Promise(resolve => setTimeout(resolve, 800));

        const mockData = [
            [
                { user: "Alice Johnson", overdue_tasks: 3, department: "Engineering" },
                { user: "Bob Smith", overdue_tasks: 1, department: "Design" },
                { user: "Carol Williams", overdue_tasks: 5, department: "Product" },
                { user: "David Brown", overdue_tasks: 2, department: "Marketing" }
            ],
            [
                { task_id: 1, title: "Fix login bug", priority: "high", assigned_to: "Alice Johnson" },
                { task_id: 2, title: "Update docs", priority: "medium", assigned_to: "Bob Smith" },
                { task_id: 3, title: "UI redesign", priority: "low", assigned_to: "Carol Williams" }
            ]
        ];

        return mockData as any;
    }

    async rx<T extends readonly Record<string, unknown>[]>(statement: string): Promise<{
        [K in keyof T]: T[K][];
    }> {
        return this.tx(statement);
    }
}