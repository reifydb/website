import type { CodeExample } from '@/lib/examples/types';

export const scriptingDeferredViewExample: CodeExample = {
    id: 'scripting-deferred-view',
    title: 'Deferred View',
    category: 'scripting',
    code: `CREATE NAMESPACE vw_d;
CREATE TABLE vw_d::employees {
  id: int4,
  name: utf8,
  active: bool
};
CREATE DEFERRED VIEW vw_d::active_employees {
  id: int4,
  name: utf8
} AS {
  FROM vw_d::employees
  FILTER active == true
  MAP { id: id, name: name }
};
INSERT vw_d::employees [
  { id: 1, name: 'Alice', active: true },
  { id: 2, name: 'Bob', active: false },
  { id: 3, name: 'Carol', active: true }
];`,
  };

export const scriptingQueryViewExample: CodeExample = {
    id: 'scripting-query-view',
    title: 'Query a View',
    category: 'scripting',
    code: `CREATE NAMESPACE vw_q;
CREATE TABLE vw_q::products {
  id: int4,
  name: utf8,
  price: float4,
  in_stock: bool
};
CREATE DEFERRED VIEW vw_q::available {
  id: int4,
  name: utf8,
  price: float4
} AS {
  FROM vw_q::products
  FILTER in_stock == true
  MAP { id: id, name: name, price: price }
};
INSERT vw_q::products [
  { id: 1, name: 'Widget', price: 9.99, in_stock: true },
  { id: 2, name: 'Gadget', price: 24.99, in_stock: false },
  { id: 3, name: 'Gizmo', price: 14.99, in_stock: true }
];`,
  };

export const scriptingQueryViewResultExample: CodeExample = {
    id: 'scripting-query-view-result',
    title: 'Query the View',
    category: 'scripting',
    code: `FROM vw_q::available
SORT { price: desc }`,
    expected: `id | name   | price
---+--------+------
3  | Gizmo  | 14.99
1  | Widget | 9.99`,
  };

export const scriptingViewsDeferredExamples: CodeExample[] = [
  scriptingDeferredViewExample,
  scriptingQueryViewExample,
  scriptingQueryViewResultExample,
];
