import type { CodeExample } from '@/lib/examples/types';

export const blobB64urlExample: CodeExample = {
    id: 'blob-b64url',
    title: 'Decode a Base64URL string',
    category: 'function',
    code: `map {blob::b64url('SGVsbG8')}`,
  };

export const functionsBlobB64urlExamples: CodeExample[] = [
  blobB64urlExample,
];
