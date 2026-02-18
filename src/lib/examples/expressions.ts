import type { CodeExample } from './index';

export const expressionExamples: CodeExample[] = [
  {
    id: 'expr-math-module',
    title: 'Math Module',
    category: 'rql',
    code: `from app.orders
aggregate {math::sum(total)} by {region}`,
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
    expectsError: true, // date::year not implemented
    code: `from app.events
filter date::year(created_at) == 2024`,
  },
  {
    id: 'expr-case',
    title: 'Case Expression',
    category: 'rql',
    expectsError: true, // case expression not implemented
    code: `from app.orders
extend {
  priority: case
    total > 1000 => "high"
    total > 100 => "medium"
    true => "low"
}`,
  },
  {
    id: 'expr-named-args',
    title: 'Named Arguments',
    category: 'rql',
    expectsError: true, // named argument syntax not implemented
    code: `from app.users
take count: 10`,
  },
];
