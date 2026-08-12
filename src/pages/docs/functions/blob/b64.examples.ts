import type { CodeExample } from '@/lib/examples/types';

export const blobB64Example: CodeExample = {
    id: 'blob-b64',
    title: 'Decode a Base64 string',
    code: `map {blob::b64('SGVsbG8=')}`,
  };

export const functionsBlobB64Examples: CodeExample[] = [
  blobB64Example,
];
