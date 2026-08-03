import type { CodeExample } from '@/lib/examples/types';

export const mapBasicExample: CodeExample = {
    id: 'map-basic',
    title: 'Map Basic',
    category: 'rql',
    code: `from app::employees
map { id, salary }`,
    expected: `id | salary
---+-------
5  | 90000
4  | 71000
3  | 65000
2  | 82000
1  | 75000`,
  };

export const mapAliasExample: CodeExample = {
    id: 'map-alias',
    title: 'Map with Alias',
    category: 'rql',
    code: `from app::employees
map { employee_id: id, annual_salary: salary, double_salary: salary * 2 }`,
  };

export const mapConstantsExample: CodeExample = {
    id: 'map-constants',
    title: 'Map Constants',
    category: 'rql',
    code: `from [{ x: 1 }, { x: 2 }, { x: 3 }]
map { x, label: "row", active: true }`,
  };

export const rqlTransformsMapExamples: CodeExample[] = [
  mapBasicExample,
  mapAliasExample,
  mapConstantsExample,
];
