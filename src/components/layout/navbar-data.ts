export interface NavDropdownItem {
  label: string;
  href: string;
  description?: string;
}

export interface NavDropdownColumn {
  title: string;
  items: NavDropdownItem[];
}

export interface NavDropdown {
  id: string;
  label: string;
  columns: NavDropdownColumn[];
}

export interface NavDirectLink {
  href: string;
  label: string;
}

export const navDropdowns: NavDropdown[] = [
  {
    id: 'product',
    label: 'Product',
    columns: [
      {
        title: 'Overview',
        items: [
          { label: 'What is ReifyDB', href: '/#what-is-reifydb', description: 'Introduction to our platform' },
          { label: 'How It Works', href: '/#how-it-works', description: 'Architecture and flow' },
          { label: 'Philosophy', href: '/#philosophy', description: 'Our design principles' },
        ],
      },
      {
        title: 'Technology',
        items: [
          { label: 'RQL Engine', href: '/#rql', description: 'Relational Query Language' },
          { label: 'Real-time Sync', href: '/#capabilities', description: 'Live data updates' },
          { label: 'Unified Data Layer', href: '/#unified', description: 'One source of truth' },
        ],
      },
    ],
  },
  {
    id: 'solutions',
    label: 'Solutions',
    columns: [
      {
        title: 'Use Cases',
        items: [
          { label: 'Analytics', href: '/#use-cases', description: 'Real-time analytics pipelines' },
          { label: 'Real-time Apps', href: '/#use-cases', description: 'Live collaborative apps' },
          { label: 'OLTP/OLAP', href: '/#use-cases', description: 'Hybrid workloads' },
        ],
      },
      {
        title: 'Replaces',
        items: [
          { label: 'SQL Databases', href: '/#replaces', description: 'PostgreSQL, MySQL, etc.' },
          { label: 'NoSQL', href: '/#replaces', description: 'MongoDB, DynamoDB, etc.' },
          { label: 'Data Warehouses', href: '/#replaces', description: 'Snowflake, BigQuery, etc.' },
        ],
      },
    ],
  },
  {
    id: 'resources',
    label: 'Resources',
    columns: [
      {
        title: 'Learn',
        items: [
          { label: 'Documentation', href: '/docs', description: 'Guides and references' },
          { label: 'FAQ', href: '/#faq', description: 'Common questions' },
          { label: 'GitHub', href: 'https://github.com/nicksrandall/reifydb', description: 'Source code' },
        ],
      },
      {
        title: 'Connect',
        items: [
          { label: 'Contact', href: '/contact', description: 'Get in touch' },
          { label: 'Support', href: '/support', description: 'Technical help' },
          { label: 'Book a Call', href: '/contact', description: 'Schedule a demo' },
        ],
      },
    ],
  },
];

export const navDirectLinks: NavDirectLink[] = [
  { href: '/docs', label: 'Docs' },
  { href: '/#pricing', label: 'Pricing' },
];
