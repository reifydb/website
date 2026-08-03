import type { CodeExample } from '@/lib/examples/types';

export const exprMathModuleExample: CodeExample = {
    id: 'expr-math-module',
    title: 'Math Module',
    category: 'rql',
    code: `from app::orders
aggregate {math::sum(total)} by {region}`,
    expected: `region | math::sum(total)
-------+-----------------
North  | 471.25
West   | 55.25
East   | 245
South  | 89.99`,
  };

export const exprTextModuleExample: CodeExample = {
    id: 'expr-text-module',
    title: 'Text Module',
    category: 'rql',
    code: `from app::users
extend { lower_email: text::lower(email) }`,
  };

export const exprDateModuleExample: CodeExample = {
    id: 'expr-date-module',
    title: 'Date Module',
    category: 'rql',
    code: `from app::orders
map { id, year: date::year(order_date), quarter: date::quarter(order_date) }
sort { id: asc }`,
  };

export const exprCaseExample: CodeExample = {
    id: 'expr-case',
    title: 'Case Expression',
    category: 'rql',
    code: `from app::orders
extend { tax: total * 0.1 }`,
  };

export const exprNamedArgsExample: CodeExample = {
    id: 'expr-named-args',
    title: 'Named Arguments',
    category: 'rql',
    code: `from app::users
take 10`,
  };

export const rqlExpressionsExamples: CodeExample[] = [
  exprMathModuleExample,
  exprTextModuleExample,
  exprDateModuleExample,
  exprCaseExample,
  exprNamedArgsExample,
];
