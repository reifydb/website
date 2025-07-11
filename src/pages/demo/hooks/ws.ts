import {useEffect, useState} from 'react';
import {Client, WsClient} from "@reifydb/client";


export const useWebSocketConnection = (url: string) => {
    const [isConnected, setIsConnected] = useState(false);
    const [client, setClient] = useState<WsClient | null>(null);

    useEffect(() => {
        const connect = async () => {
            try {
                const wsClient = await Client.connect_ws(url, {
                    timeoutMs: 10000,
                });
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
