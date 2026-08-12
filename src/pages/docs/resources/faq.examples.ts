import type { CodeExample } from '@/lib/examples/types';

export const faqExtendDuplicateColumnExample: CodeExample = {
  id: 'faq-extend-duplicate-column',
  title: 'extend on an Existing Column Name',
  expectsError: true,
  code: `from app::orders
extend { total: total * 2 }`,
};

export const faqCastUnsupportedPairExample: CodeExample = {
  id: 'faq-cast-unsupported-pair',
  title: 'Casting Between Incompatible Types',
  expectsError: true,
  code: `map { cast(true, date) }`,
};

export const faqBareFromOrderExample: CodeExample = {
  id: 'faq-bare-from-order',
  title: 'Scanning a Table with No sort',
  code: `from app::orders`,
  expected: `id | total  | status    | region | created_at                     | order_date
---+--------+-----------+--------+--------------------------------+-----------
5  | 320.75 | pending   | North  | 2024-05-12T16:00:00.000000000Z | 2024-05-12
4  | 55.25  | completed | West   | 2024-04-05T11:30:00.000000000Z | 2024-04-05
3  | 245    | completed | East   | 2024-03-10T09:15:00.000000000Z | 2024-03-10
2  | 89.99  | pending   | South  | 2024-02-20T14:00:00.000000000Z | 2024-02-20
1  | 150.5  | completed | North  | 2024-01-15T10:30:00.000000000Z | 2024-01-15`,
};

export const faqExamples: CodeExample[] = [
  faqExtendDuplicateColumnExample,
  faqCastUnsupportedPairExample,
  faqBareFromOrderExample,
];
