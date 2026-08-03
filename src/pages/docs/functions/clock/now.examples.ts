import type { CodeExample } from '@/lib/examples/types';

export const clockNowDefaultExample: CodeExample = {
  id: 'clock-now-default',
  title: 'The Mock Clock Starts at the Unix Epoch',
  category: 'function',
  code: `call clock::set(0);
map { clock::now() }`,
  expected: `clock::now()
------------
0`,
};

export const clockNowAfterSetExample: CodeExample = {
  id: 'clock-now-after-set',
  title: 'clock::now Reflects the Last clock::set',
  category: 'function',
  code: `call clock::set(5000);
map { clock::now() }`,
  expected: `clock::now()
------------
5000`,
};

export const clockNowMultiRowExample: CodeExample = {
  id: 'clock-now-multi-row',
  title: 'Stable Across a Multi-Row Scan',
  category: 'function',
  code: `call clock::set(1000);
from app::orders
map { id, now: clock::now() }`,
  expected: `id | now
---+-----
5  | 1000
4  | 1000
3  | 1000
2  | 1000
1  | 1000`,
};

export const clockNowExamples: CodeExample[] = [
  clockNowDefaultExample,
  clockNowAfterSetExample,
  clockNowMultiRowExample,
];
