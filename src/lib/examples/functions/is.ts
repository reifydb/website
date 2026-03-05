import type { CodeExample } from '../index';

export const isExamples: CodeExample[] = [
  {
    id: 'is-anonymous',
    title: 'Check if the current user is anonymous',
    category: 'function',
    code: `map {is::anonymous()}`,
  },
  {
    id: 'is-none',
    title: 'Check if a value is none',
    category: 'function',
    code: `map {is::none(cast(42, int4))}`,
  },
  {
    id: 'is-root',
    title: 'Check if the current user is root',
    category: 'function',
    code: `map {is::root()}`,
  },
  {
    id: 'is-some',
    title: 'Check if a value is some',
    category: 'function',
    code: `map {is::some(cast(42, int4))}`,
  },
  {
    id: 'is-type',
    title: 'Check if a value is a specific type',
    category: 'function',
    code: `map {is::type(cast(42, int4), int4)}`,
  },
];
