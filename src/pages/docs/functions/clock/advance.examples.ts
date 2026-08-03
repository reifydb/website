import type { CodeExample } from '@/lib/examples/types';

export const clockAdvanceBasicExample: CodeExample = {
  id: 'clock-advance-basic',
  title: 'Advance the Mock Clock',
  category: 'function',
  code: `call clock::set(0);
call clock::advance(duration::hours(2))`,
  expected: `clock
------------------------------
1970-01-01T02:00:00.000000000Z`,
};

export const clockAdvanceAdditiveExample: CodeExample = {
  id: 'clock-advance-additive',
  title: 'advance Is Relative, Not Absolute',
  category: 'function',
  code: `call clock::set(0);
call clock::advance(duration::minutes(30));
call clock::advance(duration::minutes(45))`,
  expected: `clock
------------------------------
1970-01-01T01:15:00.000000000Z`,
};

export const clockAdvanceRejectsNegativeExample: CodeExample = {
  id: 'clock-advance-rejects-negative',
  title: 'Cannot Advance Before the Unix Epoch',
  category: 'function',
  expectsError: true,
  code: `call clock::set(0);
call clock::advance(duration::seconds(-1))`,
};

export const clockAdvanceExamples: CodeExample[] = [
  clockAdvanceBasicExample,
  clockAdvanceAdditiveExample,
  clockAdvanceRejectsNegativeExample,
];
