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
      {
        id: 'functions-date',
        label: 'date',
        href: '/docs/functions/date',
        children: [
          { id: 'functions-date-add', label: 'add', href: '/docs/functions/date/add' },
          { id: 'functions-date-day', label: 'day', href: '/docs/functions/date/day' },
          { id: 'functions-date-diff', label: 'diff', href: '/docs/functions/date/diff' },
          { id: 'functions-date-format', label: 'format', href: '/docs/functions/date/format' },
          { id: 'functions-date-hour', label: 'hour', href: '/docs/functions/date/hour' },
          { id: 'functions-date-minute', label: 'minute', href: '/docs/functions/date/minute' },
          { id: 'functions-date-month', label: 'month', href: '/docs/functions/date/month' },
          { id: 'functions-date-now', label: 'now', href: '/docs/functions/date/now' },
          { id: 'functions-date-second', label: 'second', href: '/docs/functions/date/second' },
          { id: 'functions-date-year', label: 'year', href: '/docs/functions/date/year' },
        ],
      },
      {
        id: 'functions-math',
        label: 'math',
        href: '/docs/functions/math',
        children: [
          { id: 'functions-math-abs', label: 'abs', href: '/docs/functions/math/abs' },
          { id: 'functions-math-avg', label: 'avg', href: '/docs/functions/math/avg' },
          { id: 'functions-math-ceil', label: 'ceil', href: '/docs/functions/math/ceil' },
          { id: 'functions-math-count', label: 'count', href: '/docs/functions/math/count' },
          { id: 'functions-math-floor', label: 'floor', href: '/docs/functions/math/floor' },
          { id: 'functions-math-max', label: 'max', href: '/docs/functions/math/max' },
          { id: 'functions-math-min', label: 'min', href: '/docs/functions/math/min' },
          { id: 'functions-math-power', label: 'power', href: '/docs/functions/math/power' },
          { id: 'functions-math-round', label: 'round', href: '/docs/functions/math/round' },
          { id: 'functions-math-sum', label: 'sum', href: '/docs/functions/math/sum' },
        ],
      },
      {
        id: 'functions-text',
        label: 'text',
        href: '/docs/functions/text',
        children: [
          { id: 'functions-text-concat', label: 'concat', href: '/docs/functions/text/concat' },
          { id: 'functions-text-length', label: 'length', href: '/docs/functions/text/length' },
          { id: 'functions-text-lower', label: 'lower', href: '/docs/functions/text/lower' },
          { id: 'functions-text-substring', label: 'substring', href: '/docs/functions/text/substring' },
          { id: 'functions-text-trim', label: 'trim', href: '/docs/functions/text/trim' },
          { id: 'functions-text-upper', label: 'upper', href: '/docs/functions/text/upper' },
        ],
      },
    ],
  },
];
