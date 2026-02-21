import type { CodeExample } from './index';

export const expressionExamples: CodeExample[] = [
  {
    id: 'expr-math-module',
    title: 'Math Module',
    category: 'rql',
    code: `from app.orders
aggregate {math::sum(total)} by {region}`,
    expected: `region | math::sum(total)
-------+------------------
North  | 471.25
West   | 55.25
East   | 245
South  | 89.98999786376953`,
  },
  {
    id: 'expr-text-module',
    title: 'Text Module',
    category: 'rql',
    code: `from app.users
extend { lower_email: text::lower(email) }`,
  },
  {
    id: 'expr-date-module',
    title: 'Date Module',
    category: 'rql',
    code: `from app.records
extend { processed_at: date::now() }`,
  },
  {
    id: 'expr-case',
    title: 'Case Expression',
    category: 'rql',
    code: `from app.orders
extend { tax: total * 0.1 }`,
  },
  {
    id: 'expr-named-args',
    title: 'Named Arguments',
    category: 'rql',
    code: `from app.users
take 10`,
  },
];
