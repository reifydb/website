import type { CodeExample } from '../index';

export const blobExamples: CodeExample[] = [
  {
    id: 'blob-b58',
    title: 'Decode a Base58 string',
    category: 'function',
    code: `map {blob::b58('3YRGqV')}`,
  },
  {
    id: 'blob-b64',
    title: 'Decode a Base64 string',
    category: 'function',
    code: `map {blob::b64('SGVsbG8=')}`,
  },
  {
    id: 'blob-b64url',
    title: 'Decode a Base64URL string',
    category: 'function',
    code: `map {blob::b64url('SGVsbG8')}`,
  },
  {
    id: 'blob-hex',
    title: 'Decode a hex string',
    category: 'function',
    code: `map {blob::hex('48656c6c6f')}`,
  },
  {
    id: 'blob-utf8',
    title: 'Create a blob from UTF-8 text',
    category: 'function',
    code: `map {blob::utf8('hello')}`,
  },
];
