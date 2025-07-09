// constants.ts
import {SavedQuery} from './types';

export const WEBSOCKET_URL = "ws://127.0.0.1:9001";

export const sampleQueries: SavedQuery[] = [
    {
        id: '1',
        name: 'Get All Users',
        query: 'SELECT * FROM users LIMIT 10',
        lastRun: new Date()
    },
    {
        id: '2',
        name: 'User Count by Department',
        query: 'SELECT department, COUNT(*) as count FROM users GROUP BY department',
        lastRun: new Date()
    },
    {
        id: '3',
        name: 'Recent Orders',
        query: 'SELECT * FROM orders WHERE created_at > NOW() - INTERVAL 7 DAY ORDER BY created_at DESC',
        lastRun: new Date()
    },
    {
        id: '4',
        name: 'Product Sales Summary',
        query: 'SELECT p.name, SUM(oi.quantity) as total_sold, SUM(oi.price * oi.quantity) as revenue FROM products p JOIN order_items oi ON p.id = oi.product_id GROUP BY p.id, p.name ORDER BY revenue DESC',
        lastRun: new Date()
    }
];
