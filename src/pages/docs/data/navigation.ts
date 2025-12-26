export interface NavItem {
  id: string;
  label: string;
  href?: string;
  children?: NavItem[];
}

export interface NavSection {
  title: string;
  items: NavItem[];
  defaultOpen?: boolean;
}

export const navSections: NavSection[] = [
  {
    title: 'Getting Started',
    items: [
      { id: 'overview', label: 'Introduction', href: '/docs' },
      { id: 'installation', label: 'Installation', href: '/docs/installation' },
      { id: 'quick-start', label: 'Quick Start', href: '/docs/quick-start' },
    ],
  },
  {
    title: 'RQL',
    items: [
      { id: 'rql-basics', label: 'Basics', href: '/docs/rql/basics' },
      {
        id: 'rql-transforms',
        label: 'Transforms',
        children: [
          { id: 'transforms-overview', label: 'Overview', href: '/docs/rql/transforms' },
          { id: 'transforms-filter', label: 'Filter', href: '/docs/rql/transforms/filter' },
          { id: 'transforms-sort', label: 'Sort', href: '/docs/rql/transforms/sort' },
        ],
      },
      {
        id: 'rql-expressions',
        label: 'Expressions',
        children: [
          { id: 'expressions-overview', label: 'Overview', href: '/docs/rql/expressions' },
          { id: 'expressions-operators', label: 'Operators', href: '/docs/rql/expressions/operators' },
        ],
      },
    ],
  },
  {
    title: 'Functions',
    items: [
      { id: 'functions-overview', label: 'Overview', href: '/docs/functions' },
      { id: 'functions-date', label: 'date', href: '/docs/functions/date' },
      { id: 'functions-math', label: 'math', href: '/docs/functions/math' },
      { id: 'functions-text', label: 'text', href: '/docs/functions/text' },
    ],
  },
];
