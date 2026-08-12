import type { CodeExample } from '@/lib/examples/types';

export const blobUtf8Example: CodeExample = {
    id: 'blob-utf8',
    title: 'Create a blob from UTF-8 text',
    code: `map {blob::utf8('hello')}`,
  };

export const functionsBlobUtf8Examples: CodeExample[] = [
  blobUtf8Example,
];
