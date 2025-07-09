// utils.ts
import { QueryResult } from './types';

export const formatExecutionTime = (time: number): string => {
    if (time < 1000) {
        return `${time}ms`;
    }
    return `${(time / 1000).toFixed(2)}s`;
};

export const generateCSVContent = (result: QueryResult): string => {
    return result.tables.map((table, index) => {
        if (table.length === 0) return `Table ${index + 1}: No results`;

        const headers = Object.keys(table[0]);
        const rows = table.map(row =>
            headers.map(h => {
                const value = row[h];
                // Escape commas and quotes in CSV
                if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
                    return `"${value.replace(/"/g, '""')}"`;
                }
                return value;
            }).join(',')
        );
        return `Table ${index + 1}:\n${headers.join(',')}\n${rows.join('\n')}`;
    }).join('\n\n');
};

export const copyToClipboard = async (text: string): Promise<void> => {
    try {
        await navigator.clipboard.writeText(text);
    } catch (err) {
        console.error('Failed to copy to clipboard:', err);
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
};

export const downloadFile = (content: string, filename: string, mimeType: string = 'text/plain'): void => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
};