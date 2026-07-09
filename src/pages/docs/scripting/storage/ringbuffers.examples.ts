import type { CodeExample } from '@/lib/examples/types';

export const scriptingStorageRingbuffersExamples: CodeExample[] = [
{
    id: 'scripting-create-ringbuffer',
    title: 'Create Ringbuffer',
    category: 'scripting',
    code: `CREATE NAMESPACE st_rb;
CREATE RINGBUFFER st_rb::events {
  id: int4,
  message: utf8,
  active: bool
} WITH { capacity: 5 };
INSERT st_rb::events [
  { id: 1, message: 'first', active: true },
  { id: 2, message: 'second', active: true }
];
FROM st_rb::events`,
    expected: `id | message | active
---+---------+-------
1  | first   | true
2  | second  | true`,
  },
];
