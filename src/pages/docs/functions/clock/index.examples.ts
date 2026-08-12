import type { CodeExample } from '@/lib/examples/types';

export const clockLifecycleExample: CodeExample = {
  id: 'clock-lifecycle',
  title: 'set, advance, and now Together',
  code: `call clock::set(0);
call clock::advance(duration::minutes(90));
map { clock::now() }`,
  expected: `clock::now()
------------
5400000`,
};

export const clockIndexExamples: CodeExample[] = [clockLifecycleExample];
