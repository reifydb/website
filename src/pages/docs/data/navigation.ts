export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
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
    title: 'RQL Language',
    items: [
      { id: 'rql-basics', label: 'RQL Basics', href: '/docs/rql/basics' },
      { id: 'rql-transforms', label: 'Transforms', href: '/docs/rql/transforms' },
      { id: 'rql-expressions', label: 'Expressions', href: '/docs/rql/expressions' },
    ],
  },
];
