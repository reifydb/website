import type { CodeExample } from '@/lib/examples/types';

export const clockSetBasicExample: CodeExample = {
  id: 'clock-set-basic',
  title: 'Set the Mock Clock to an Absolute Point',
  category: 'function',
  code: `call clock::set(duration::days(1))`,
  expected: `clock
------------------------------
1970-01-02T00:00:00.000000000Z`,
};

export const clockSetThenNowExample: CodeExample = {
  id: 'clock-set-then-now',
  title: 'clock::now Reads Back What You Set',
  category: 'function',
  code: `call clock::set(duration::hours(1));
map { clock::now() }`,
  expected: `clock::now()
------------
3600000`,
};

export const clockSetJumpsBackwardExample: CodeExample = {
  id: 'clock-set-jumps-backward',
  title: 'set Is Absolute: It Can Move the Clock Backward',
  category: 'function',
  code: `call clock::set(5000);
call clock::set(1000);
map { clock::now() }`,
  expected: `clock::now()
------------
1000`,
};

export const clockSetRejectsNegativeExample: CodeExample = {
  id: 'clock-set-rejects-negative',
  title: 'Cannot Set Before the Unix Epoch',
  category: 'function',
  expectsError: true,
  code: `call clock::set(duration::seconds(-1))`,
};

export const clockSetExamples: CodeExample[] = [
  clockSetBasicExample,
  clockSetThenNowExample,
  clockSetJumpsBackwardExample,
  clockSetRejectsNegativeExample,
];
