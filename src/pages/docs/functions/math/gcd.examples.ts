import type { CodeExample } from '@/lib/examples/types';

export const mathGcdInlineExample: CodeExample = {
    id: 'math-gcd-inline',
    title: 'Greatest common divisor',
    code: `map {math::gcd(cast(12, int4), cast(8, int4))}`,
  };

export const functionsMathGcdExamples: CodeExample[] = [
  mathGcdInlineExample,
];
