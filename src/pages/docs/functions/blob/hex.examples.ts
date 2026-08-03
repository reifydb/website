import type { CodeExample } from '@/lib/examples/types';

export const blobHexExample: CodeExample = {
    id: 'blob-hex',
    title: 'Decode a hex string',
    category: 'function',
    code: `map {blob::hex('48656c6c6f')}`,
  };

export const functionsBlobHexExamples: CodeExample[] = [
  blobHexExample,
];
