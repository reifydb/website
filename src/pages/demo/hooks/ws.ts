import {useEffect, useState} from 'react';
import {Client, WsClient} from "@reifydb/client";


export const useWebSocketConnection = (url: string) => {
    const [isConnected, setIsConnected] = useState(false);
    const [client, setClient] = useState<WsClient | null>(null);

    useEffect(() => {
        let wsClient: WsClient | null = null;
        let isCancelled = false;

        const connect = async () => {
            try {
                wsClient = await Client.connect_ws(url, {
                    timeoutMs: 10000,
                });

                if (!isCancelled) {
                    setClient(wsClient);
                    setIsConnected(true);
                }
            } catch (err) {
                console.error("Failed to connect:", err);
                if (!isCancelled) {
                    setIsConnected(false);
                }
            }
        };

        connect().catch(err => {
            console.error("Connection failed:", err);
            if (!isCancelled) {
                setIsConnected(false);
            }
        });

    }, [url]);

    return [isConnected, client];
};