// constants.ts
import {SavedQuery} from './types';

export const WEBSOCKET_URL = "ws://127.0.0.1:8090";

export const sampleQueries: SavedQuery[] = [
    {
        id: '1',
        name: 'Get Everything',
        query: 'FROM test.arith',
        lastRun: new Date()
    },
];
