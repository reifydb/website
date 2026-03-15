export interface NavItem {
  id: string;
  label: string;
  href?: string;
  children?: NavItem[];
  published?: boolean;
}

export interface NavSection {
  title: string;
  items: NavItem[];
  defaultOpen?: boolean;
}

export function filterPublished(items: NavItem[]): NavItem[] {
  return items
    .filter((item) => item.published === true)
    .map((item) => {
      if (!item.children) return item;
      const children = filterPublished(item.children);
      return children.length > 0 ? { ...item, children } : null;
    })
    .filter((item): item is NavItem => item !== null);
}

export function getPublishedPaths(sections: NavSection[]): Set<string> {
  const paths = new Set<string>();
  function collect(items: NavItem[]) {
    for (const item of items) {
      if (item.published === true && item.href) paths.add(item.href);
      if (item.children) collect(item.children);
    }
  }
  sections.forEach((s) => collect(s.items));
  return paths;
}

/**
 * Returns a flat, ordered list of all published leaf pages for prev/next navigation.
 */
export function getOrderedPages(sections: NavSection[]): { label: string; href: string }[] {
  const pages: { label: string; href: string }[] = [];
  function collect(items: NavItem[]) {
    for (const item of items) {
      if (item.published === true && item.href) {
        pages.push({ label: item.label, href: item.href });
      }
      if (item.children) collect(item.children);
    }
  }
  sections.forEach((s) => collect(s.items));
  return pages;
}

export const navSections: NavSection[] = [
  // ─── 1. Getting Started ───────────────────────────────────
  {
    title: 'Getting Started',
    items: [
      { id: 'overview', label: 'Introduction', href: '/docs', published: true },
      { id: 'installation', label: 'Installation', href: '/docs/installation' },
      { id: 'quick-start', label: 'Quick Start', href: '/docs/quick-start' },
      { id: 'connect', label: 'Connect', href: '/docs/connect' },
      {
        id: 'tutorials',
        label: 'Tutorials',
        children: [
          { id: 'tutorials-first-app', label: 'Build Your First App', href: '/docs/tutorials/first-app', published: false },
          { id: 'tutorials-live-dashboard', label: 'Live Dashboard', href: '/docs/tutorials/live-dashboard', published: false },
          { id: 'tutorials-real-time-chat', label: 'Real-Time Chat', href: '/docs/tutorials/real-time-chat', published: false },
          { id: 'tutorials-task-manager', label: 'Task Manager', href: '/docs/tutorials/task-manager', published: false },
        ],
      },
      {
        id: 'coming-from',
        label: 'Coming From...',
        children: [
          { id: 'coming-from-sql', label: 'SQL Databases', href: '/docs/coming-from/sql', published: false },
          { id: 'coming-from-mongodb', label: 'MongoDB', href: '/docs/coming-from/mongodb', published: false },
          { id: 'coming-from-redis', label: 'Redis', href: '/docs/coming-from/redis', published: false },
          { id: 'coming-from-firebase', label: 'Firebase / Firestore', href: '/docs/coming-from/firebase', published: false },
        ],
      },
    ],
  },

  // ─── 2. Concepts ──────────────────────────────────────────
  {
    title: 'Concepts',
    items: [
      { id: 'concepts-overview', label: 'Overview', href: '/docs/concepts', published: false },
      { id: 'concepts-data-model', label: 'Data Model', href: '/docs/concepts/data-model', published: false },
      { id: 'concepts-data-types', label: 'Data Types', href: '/docs/concepts/data-types' },
      { id: 'concepts-namespaces', label: 'Namespaces & Schemas', href: '/docs/concepts/namespaces', published: false },
      { id: 'concepts-transactions', label: 'Transactions & ACID', href: '/docs/concepts/transactions' },
      { id: 'concepts-materialized-views', label: 'Materialized Views', href: '/docs/concepts/materialized-views', published: false },
      { id: 'concepts-real-time', label: 'Real-Time Subscriptions', href: '/docs/concepts/real-time', published: false },
      { id: 'concepts-storage-engines', label: 'Storage Engines', href: '/docs/concepts/storage-engines', published: false },
      { id: 'concepts-consistency', label: 'Consistency Model', href: '/docs/concepts/consistency', published: false },
      { id: 'concepts-error-handling', label: 'Error Handling', href: '/docs/concepts/error-handling' },
      { id: 'concepts-embedded-vs-server', label: 'Embedded vs. Server Mode', href: '/docs/concepts/embedded-vs-server', published: false },
    ],
  },

  // ─── 3. RQL ───────────────────────────────────────────────
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
          { id: 'transforms-map', label: 'Map', href: '/docs/rql/transforms/map' },
          { id: 'transforms-extend', label: 'Extend', href: '/docs/rql/transforms/extend' },
          { id: 'transforms-aggregate', label: 'Aggregate', href: '/docs/rql/transforms/aggregate' },
          { id: 'transforms-distinct', label: 'Distinct', href: '/docs/rql/transforms/distinct' },
          { id: 'transforms-take', label: 'Take', href: '/docs/rql/transforms/take' },
          { id: 'transforms-join', label: 'Join', href: '/docs/rql/transforms/join' },
          { id: 'transforms-match', label: 'Match', href: '/docs/rql/transforms/match' },
          { id: 'transforms-patch', label: 'Patch', href: '/docs/rql/transforms/patch' },
        ],
      },
      {
        id: 'rql-expressions',
        label: 'Expressions',
        children: [
          { id: 'expressions-overview', label: 'Overview', href: '/docs/rql/expressions' },
          { id: 'expressions-operators', label: 'Operators', href: '/docs/rql/expressions/operators' },
          { id: 'expressions-conditionals', label: 'Conditionals', href: '/docs/rql/expressions/conditionals', published: false },
          { id: 'expressions-literals', label: 'Literals', href: '/docs/rql/expressions/literals', published: false },
          { id: 'expressions-field-access', label: 'Field Access', href: '/docs/rql/expressions/field-access', published: false },
        ],
      },
      {
        id: 'rql-patterns',
        label: 'Patterns & Recipes',
        children: [
          { id: 'patterns-pagination', label: 'Pagination', href: '/docs/rql/patterns/pagination', published: false },
          { id: 'patterns-hierarchical-data', label: 'Hierarchical Data', href: '/docs/rql/patterns/hierarchical-data', published: false },
          { id: 'patterns-time-series', label: 'Time-Series Queries', href: '/docs/rql/patterns/time-series', published: false },
          { id: 'patterns-text-search', label: 'Text Search', href: '/docs/rql/patterns/text-search', published: false },
          { id: 'patterns-dynamic-queries', label: 'Dynamic Queries', href: '/docs/rql/patterns/dynamic-queries', published: false },
        ],
      },
    ],
  },

  // ─── 4. Scripting ─────────────────────────────────────────
  {
    title: 'Scripting',
    items: [
      { id: 'scripting-overview', label: 'Overview', href: '/docs/scripting' },
      {
        id: 'scripting-schema',
        label: 'Schema',
        children: [
          { id: 'scripting-schema-namespaces', label: 'Namespaces', href: '/docs/scripting/schema/namespaces' },
          { id: 'scripting-schema-tables', label: 'Tables', href: '/docs/scripting/schema/tables' },
          { id: 'scripting-schema-enums', label: 'Enums', href: '/docs/scripting/schema/enums' },
          { id: 'scripting-schema-dictionaries', label: 'Dictionaries', href: '/docs/scripting/schema/dictionaries' },
          { id: 'scripting-schema-drop', label: 'Drop & Cleanup', href: '/docs/scripting/schema/drop' },
          { id: 'scripting-schema-constraints', label: 'Constraints', href: '/docs/scripting/schema/constraints', published: false },
          { id: 'scripting-schema-indexes', label: 'Indexes', href: '/docs/scripting/schema/indexes', published: false },
        ],
      },
      {
        id: 'scripting-storage',
        label: 'Storage Primitives',
        children: [
          { id: 'scripting-storage-tables', label: 'Tables', href: '/docs/scripting/storage/tables' },
          { id: 'scripting-storage-ringbuffers', label: 'Ringbuffers', href: '/docs/scripting/storage/ringbuffers' },
          { id: 'scripting-storage-series', label: 'Series', href: '/docs/scripting/storage/series' },
        ],
      },
      {
        id: 'scripting-dml',
        label: 'Data Manipulation',
        children: [
          { id: 'scripting-dml-insert', label: 'Insert', href: '/docs/scripting/dml/insert' },
          { id: 'scripting-dml-update', label: 'Update', href: '/docs/scripting/dml/update' },
          { id: 'scripting-dml-delete', label: 'Delete', href: '/docs/scripting/dml/delete' },
          { id: 'scripting-dml-upsert', label: 'Upsert', href: '/docs/scripting/dml/upsert', published: false },
          { id: 'scripting-dml-batch', label: 'Batch Operations', href: '/docs/scripting/dml/batch', published: false },
        ],
      },
      {
        id: 'scripting-views',
        label: 'Views',
        children: [
          { id: 'scripting-views-overview', label: 'Overview', href: '/docs/scripting/views' },
          { id: 'scripting-views-deferred', label: 'Deferred Views', href: '/docs/scripting/views/deferred' },
          { id: 'scripting-views-transactional', label: 'Transactional Views', href: '/docs/scripting/views/transactional' },
        ],
      },
      {
        id: 'scripting-procedures',
        label: 'Procedures',
        children: [
          { id: 'scripting-procedures-overview', label: 'Overview', href: '/docs/scripting/procedures' },
          { id: 'scripting-procedures-control-flow', label: 'Parameters & Control Flow', href: '/docs/scripting/procedures/control-flow' },
        ],
      },
      {
        id: 'scripting-events',
        label: 'Events',
        children: [
          { id: 'scripting-events-overview', label: 'Overview', href: '/docs/scripting/events' },
          { id: 'scripting-events-handlers', label: 'Handlers', href: '/docs/scripting/events/handlers' },
          { id: 'scripting-events-dispatch', label: 'Dispatch', href: '/docs/scripting/events/dispatch' },
        ],
      },
      { id: 'scripting-testing', label: 'Testing', href: '/docs/scripting/testing' },
      { id: 'scripting-migrations', label: 'Migrations', href: '/docs/scripting/migrations' },
      { id: 'scripting-subscriptions', label: 'Subscriptions', href: '/docs/scripting/subscriptions' },
      { id: 'scripting-access-control', label: 'Access Control', href: '/docs/scripting/access-control' },
    ],
  },

  // ─── 5. Guides ────────────────────────────────────────────
  {
    title: 'Guides',
    items: [
      { id: 'guides-overview', label: 'Overview', href: '/docs/guides', published: false },
      {
        id: 'guides-modeling',
        label: 'Data Modeling',
        children: [
          { id: 'guides-modeling-users-auth', label: 'Users & Auth', href: '/docs/guides/modeling/users-auth', published: false },
          { id: 'guides-modeling-e-commerce', label: 'E-Commerce', href: '/docs/guides/modeling/e-commerce', published: false },
          { id: 'guides-modeling-iot', label: 'IoT & Sensor Data', href: '/docs/guides/modeling/iot', published: false },
          { id: 'guides-modeling-cms', label: 'Content Management', href: '/docs/guides/modeling/cms', published: false },
          { id: 'guides-modeling-multi-tenancy', label: 'Multi-Tenancy', href: '/docs/guides/modeling/multi-tenancy', published: false },
          { id: 'guides-modeling-relationships', label: 'Relationships', href: '/docs/guides/modeling/relationships', published: false },
        ],
      },
      {
        id: 'guides-real-time',
        label: 'Real-Time',
        children: [
          { id: 'guides-real-time-live-queries', label: 'Live Queries', href: '/docs/guides/real-time/live-queries', published: false },
          { id: 'guides-real-time-reactive-views', label: 'Reactive Views', href: '/docs/guides/real-time/reactive-views', published: false },
          { id: 'guides-real-time-event-sourcing', label: 'Event Sourcing', href: '/docs/guides/real-time/event-sourcing', published: false },
          { id: 'guides-real-time-notifications', label: 'Notifications', href: '/docs/guides/real-time/notifications', published: false },
        ],
      },
      {
        id: 'guides-testing',
        label: 'Testing',
        children: [
          { id: 'guides-testing-unit', label: 'Unit Testing', href: '/docs/guides/testing/unit-testing', published: false },
          { id: 'guides-testing-integration', label: 'Integration Testing', href: '/docs/guides/testing/integration-testing', published: false },
          { id: 'guides-testing-fixtures', label: 'Test Fixtures & Seeding', href: '/docs/guides/testing/fixtures', published: false },
        ],
      },
      {
        id: 'guides-patterns',
        label: 'Common Patterns',
        children: [
          { id: 'guides-patterns-soft-deletes', label: 'Soft Deletes', href: '/docs/guides/patterns/soft-deletes', published: false },
          { id: 'guides-patterns-audit-trail', label: 'Audit Trail', href: '/docs/guides/patterns/audit-trail', published: false },
          { id: 'guides-patterns-state-machines', label: 'State Machines', href: '/docs/guides/patterns/state-machines', published: false },
          { id: 'guides-patterns-cqrs', label: 'CQRS', href: '/docs/guides/patterns/cqrs', published: false },
          { id: 'guides-patterns-computed-fields', label: 'Computed Fields', href: '/docs/guides/patterns/computed-fields', published: false },
          { id: 'guides-patterns-data-versioning', label: 'Data Versioning', href: '/docs/guides/patterns/data-versioning', published: false },
        ],
      },
    ],
  },

  // ─── 6. Client SDKs ──────────────────────────────────────
  {
    title: 'Client SDKs',
    items: [
      { id: 'sdks-overview', label: 'Overview', href: '/docs/sdks', published: false },
      {
        id: 'sdks-typescript',
        label: 'TypeScript / JavaScript',
        children: [
          { id: 'sdks-ts-quick-start', label: 'Quick Start', href: '/docs/sdks/typescript/quick-start', published: false },
          { id: 'sdks-ts-connection', label: 'Connection', href: '/docs/sdks/typescript/connection', published: false },
          { id: 'sdks-ts-queries', label: 'Queries', href: '/docs/sdks/typescript/queries', published: false },
          { id: 'sdks-ts-mutations', label: 'Mutations', href: '/docs/sdks/typescript/mutations', published: false },
          { id: 'sdks-ts-subscriptions', label: 'Subscriptions', href: '/docs/sdks/typescript/subscriptions', published: false },
          { id: 'sdks-ts-transactions', label: 'Transactions', href: '/docs/sdks/typescript/transactions', published: false },
          { id: 'sdks-ts-type-safety', label: 'Type Safety', href: '/docs/sdks/typescript/type-safety', published: false },
          { id: 'sdks-ts-error-handling', label: 'Error Handling', href: '/docs/sdks/typescript/error-handling', published: false },
          { id: 'sdks-ts-api-reference', label: 'API Reference', href: '/docs/sdks/typescript/api-reference', published: false },
        ],
      },
      {
        id: 'sdks-rust',
        label: 'Rust',
        children: [
          { id: 'sdks-rust-quick-start', label: 'Quick Start', href: '/docs/sdks/rust/quick-start', published: false },
          { id: 'sdks-rust-embedded', label: 'Embedded Mode', href: '/docs/sdks/rust/embedded', published: false },
          { id: 'sdks-rust-client', label: 'Client Mode', href: '/docs/sdks/rust/client', published: false },
          { id: 'sdks-rust-api-reference', label: 'API Reference', href: '/docs/sdks/rust/api-reference', published: false },
        ],
      },
      {
        id: 'sdks-python',
        label: 'Python',
        children: [
          { id: 'sdks-python-quick-start', label: 'Quick Start', href: '/docs/sdks/python/quick-start', published: false },
          { id: 'sdks-python-connection', label: 'Connection', href: '/docs/sdks/python/connection', published: false },
          { id: 'sdks-python-queries', label: 'Queries', href: '/docs/sdks/python/queries', published: false },
          { id: 'sdks-python-api-reference', label: 'API Reference', href: '/docs/sdks/python/api-reference', published: false },
        ],
      },
      {
        id: 'sdks-go',
        label: 'Go',
        children: [
          { id: 'sdks-go-quick-start', label: 'Quick Start', href: '/docs/sdks/go/quick-start', published: false },
          { id: 'sdks-go-connection', label: 'Connection', href: '/docs/sdks/go/connection', published: false },
          { id: 'sdks-go-queries', label: 'Queries', href: '/docs/sdks/go/queries', published: false },
          { id: 'sdks-go-api-reference', label: 'API Reference', href: '/docs/sdks/go/api-reference', published: false },
        ],
      },
    ],
  },

  // ─── 7. Architecture ──────────────────────────────────────
  {
    title: 'Architecture',
    items: [
      { id: 'architecture-overview', label: 'Overview', href: '/docs/architecture', published: false },
      { id: 'architecture-volcano', label: 'Volcano Execution Model', href: '/docs/architecture/volcano' },
      { id: 'architecture-types', label: 'Types & Expressions', href: '/docs/architecture/types' },
      { id: 'architecture-storage-engine', label: 'Storage Engine', href: '/docs/architecture/storage-engine', published: false },
      { id: 'architecture-incremental-maintenance', label: 'Incremental Maintenance', href: '/docs/architecture/incremental-maintenance', published: false },
      { id: 'architecture-transaction-engine', label: 'Transaction Engine', href: '/docs/architecture/transaction-engine', published: false },
      { id: 'architecture-wire-protocol', label: 'Wire Protocol', href: '/docs/architecture/wire-protocol', published: false },
    ],
  },

  // ─── 8. Security ──────────────────────────────────────────
  {
    title: 'Security',
    items: [
      { id: 'security-overview', label: 'Overview', href: '/docs/security', published: false },
      { id: 'security-authentication', label: 'Authentication', href: '/docs/security/authentication', published: false },
      { id: 'security-authorization', label: 'Authorization & Roles', href: '/docs/security/authorization', published: false },
      { id: 'security-row-level-security', label: 'Row-Level Security', href: '/docs/security/row-level-security', published: false },
      { id: 'security-encryption', label: 'Encryption', href: '/docs/security/encryption', published: false },
      { id: 'security-audit-logging', label: 'Audit Logging', href: '/docs/security/audit-logging', published: false },
      { id: 'security-tls', label: 'TLS & Network Security', href: '/docs/security/tls', published: false },
    ],
  },

  // ─── 9. Operations ────────────────────────────────────────
  {
    title: 'Operations',
    items: [
      { id: 'operations-configuration', label: 'Configuration', href: '/docs/operations/configuration' },
      {
        id: 'operations-deployment',
        label: 'Deployment',
        children: [
          { id: 'operations-deployment-standalone', label: 'Standalone', href: '/docs/operations/deployment/standalone', published: false },
          { id: 'operations-deployment-embedded', label: 'Embedded', href: '/docs/operations/deployment/embedded', published: false },
          { id: 'operations-deployment-docker', label: 'Docker', href: '/docs/operations/deployment/docker', published: false },
          { id: 'operations-deployment-kubernetes', label: 'Kubernetes', href: '/docs/operations/deployment/kubernetes', published: false },
          { id: 'operations-deployment-systemd', label: 'Systemd', href: '/docs/operations/deployment/systemd', published: false },
        ],
      },
      {
        id: 'operations-backup',
        label: 'Backup & Restore',
        children: [
          { id: 'operations-backup-overview', label: 'Overview', href: '/docs/operations/backup', published: false },
          { id: 'operations-backup-snapshots', label: 'Snapshots', href: '/docs/operations/backup/snapshots', published: false },
          { id: 'operations-backup-pit', label: 'Point-in-Time Recovery', href: '/docs/operations/backup/point-in-time', published: false },
        ],
      },
      {
        id: 'operations-monitoring',
        label: 'Monitoring',
        children: [
          { id: 'operations-monitoring-overview', label: 'Overview', href: '/docs/operations/monitoring', published: false },
          { id: 'operations-monitoring-metrics', label: 'Metrics', href: '/docs/operations/monitoring/metrics', published: false },
          { id: 'operations-monitoring-logging', label: 'Logging', href: '/docs/operations/monitoring/logging', published: false },
          { id: 'operations-monitoring-health-checks', label: 'Health Checks', href: '/docs/operations/monitoring/health-checks', published: false },
        ],
      },
      { id: 'operations-upgrades', label: 'Upgrades', href: '/docs/operations/upgrades', published: false },
      { id: 'operations-scaling', label: 'Scaling', href: '/docs/operations/scaling', published: false },
    ],
  },

  // ─── 10. Performance ──────────────────────────────────────
  {
    title: 'Performance',
    items: [
      { id: 'performance-overview', label: 'Overview', href: '/docs/performance', published: false },
      { id: 'performance-query-optimization', label: 'Query Optimization', href: '/docs/performance/query-optimization', published: false },
      { id: 'performance-indexing', label: 'Indexing Strategies', href: '/docs/performance/indexing', published: false },
      { id: 'performance-explain', label: 'EXPLAIN & Query Plans', href: '/docs/performance/explain', published: false },
      { id: 'performance-view-tuning', label: 'View Tuning', href: '/docs/performance/view-tuning', published: false },
      { id: 'performance-memory', label: 'Memory Management', href: '/docs/performance/memory', published: false },
      { id: 'performance-benchmarks', label: 'Benchmarks', href: '/docs/performance/benchmarks', published: false },
    ],
  },

  // ─── 11. Tools ────────────────────────────────────────────
  {
    title: 'Tools',
    items: [
      {
        id: 'tools-cli',
        label: 'CLI',
        children: [
          { id: 'tools-cli-overview', label: 'Overview', href: '/docs/tools/cli', published: false },
          { id: 'tools-cli-commands', label: 'Command Reference', href: '/docs/tools/cli/commands', published: false },
          { id: 'tools-cli-scripting', label: 'Scripting with CLI', href: '/docs/tools/cli/scripting', published: false },
        ],
      },
      {
        id: 'tools-console',
        label: 'Web Console',
        children: [
          { id: 'tools-console-overview', label: 'Overview', href: '/docs/tools/console', published: false },
          { id: 'tools-console-query-editor', label: 'Query Editor', href: '/docs/tools/console/query-editor', published: false },
          { id: 'tools-console-schema-browser', label: 'Schema Browser', href: '/docs/tools/console/schema-browser', published: false },
        ],
      },
      { id: 'tools-playground', label: 'Online Playground', href: '/docs/tools/playground', published: false },
    ],
  },

  // ─── 12. Integrations ─────────────────────────────────────
  {
    title: 'Integrations',
    items: [
      { id: 'integrations-overview', label: 'Overview', href: '/docs/integrations', published: false },
      {
        id: 'integrations-http-api',
        label: 'HTTP API',
        children: [
          { id: 'integrations-http-api-overview', label: 'Overview', href: '/docs/integrations/http-api', published: false },
          { id: 'integrations-http-api-auth', label: 'Authentication', href: '/docs/integrations/http-api/authentication', published: false },
          { id: 'integrations-http-api-query', label: 'Query Endpoint', href: '/docs/integrations/http-api/query', published: false },
          { id: 'integrations-http-api-mutation', label: 'Mutation Endpoint', href: '/docs/integrations/http-api/mutation', published: false },
          { id: 'integrations-http-api-subscription', label: 'Subscription Endpoint', href: '/docs/integrations/http-api/subscription', published: false },
          { id: 'integrations-http-api-errors', label: 'Error Codes', href: '/docs/integrations/http-api/errors', published: false },
        ],
      },
      { id: 'integrations-webhooks', label: 'Webhooks', href: '/docs/integrations/webhooks', published: false },
      { id: 'integrations-cdc', label: 'Change Data Capture', href: '/docs/integrations/cdc', published: false },
      {
        id: 'integrations-frameworks',
        label: 'Frameworks',
        children: [
          { id: 'integrations-frameworks-react', label: 'React', href: '/docs/integrations/frameworks/react', published: false },
          { id: 'integrations-frameworks-nextjs', label: 'Next.js', href: '/docs/integrations/frameworks/nextjs', published: false },
          { id: 'integrations-frameworks-svelte', label: 'Svelte', href: '/docs/integrations/frameworks/svelte', published: false },
        ],
      },
    ],
  },

  // ─── 13. Functions (UNCHANGED) ────────────────────────────
  {
    title: 'Functions',
    items: [
      { id: 'functions-overview', label: 'Overview', href: '/docs/functions' },
      {
        id: 'functions-blob',
        label: 'blob',
        href: '/docs/functions/blob',
        children: [
          { id: 'functions-blob-b58', label: 'b58', href: '/docs/functions/blob/b58' },
          { id: 'functions-blob-b64', label: 'b64', href: '/docs/functions/blob/b64' },
          { id: 'functions-blob-b64url', label: 'b64url', href: '/docs/functions/blob/b64url' },
          { id: 'functions-blob-hex', label: 'hex', href: '/docs/functions/blob/hex' },
          { id: 'functions-blob-utf8', label: 'utf8', href: '/docs/functions/blob/utf8' },
        ],
      },
      {
        id: 'functions-clock',
        label: 'clock',
        href: '/docs/functions/clock',
        children: [
          { id: 'functions-clock-advance', label: 'advance', href: '/docs/functions/clock/advance' },
          { id: 'functions-clock-now', label: 'now', href: '/docs/functions/clock/now' },
          { id: 'functions-clock-set', label: 'set', href: '/docs/functions/clock/set' },
        ],
      },
      {
        id: 'functions-date',
        label: 'date',
        href: '/docs/functions/date',
        children: [
          { id: 'functions-date-add', label: 'add', href: '/docs/functions/date/add' },
          { id: 'functions-date-age', label: 'age', href: '/docs/functions/date/age' },
          { id: 'functions-date-day', label: 'day', href: '/docs/functions/date/day' },
          { id: 'functions-date-day_of_week', label: 'day_of_week', href: '/docs/functions/date/day_of_week' },
          { id: 'functions-date-day_of_year', label: 'day_of_year', href: '/docs/functions/date/day_of_year' },
          { id: 'functions-date-days_in_month', label: 'days_in_month', href: '/docs/functions/date/days_in_month' },
          { id: 'functions-date-diff', label: 'diff', href: '/docs/functions/date/diff' },
          { id: 'functions-date-end_of_month', label: 'end_of_month', href: '/docs/functions/date/end_of_month' },
          { id: 'functions-date-format', label: 'format', href: '/docs/functions/date/format' },
          { id: 'functions-date-is_leap_year', label: 'is_leap_year', href: '/docs/functions/date/is_leap_year' },
          { id: 'functions-date-month', label: 'month', href: '/docs/functions/date/month' },
          { id: 'functions-date-new', label: 'new', href: '/docs/functions/date/new' },
          { id: 'functions-date-now', label: 'now', href: '/docs/functions/date/now' },
          { id: 'functions-date-quarter', label: 'quarter', href: '/docs/functions/date/quarter' },
          { id: 'functions-date-start_of_month', label: 'start_of_month', href: '/docs/functions/date/start_of_month' },
          { id: 'functions-date-start_of_year', label: 'start_of_year', href: '/docs/functions/date/start_of_year' },
          { id: 'functions-date-subtract', label: 'subtract', href: '/docs/functions/date/subtract' },
          { id: 'functions-date-trunc', label: 'trunc', href: '/docs/functions/date/trunc' },
          { id: 'functions-date-week', label: 'week', href: '/docs/functions/date/week' },
          { id: 'functions-date-year', label: 'year', href: '/docs/functions/date/year' },
        ],
      },
      {
        id: 'functions-datetime',
        label: 'datetime',
        href: '/docs/functions/datetime',
        children: [
          { id: 'functions-datetime-add', label: 'add', href: '/docs/functions/datetime/add' },
          { id: 'functions-datetime-age', label: 'age', href: '/docs/functions/datetime/age' },
          { id: 'functions-datetime-date', label: 'date', href: '/docs/functions/datetime/date' },
          { id: 'functions-datetime-day', label: 'day', href: '/docs/functions/datetime/day' },
          { id: 'functions-datetime-day_of_week', label: 'day_of_week', href: '/docs/functions/datetime/day_of_week' },
          { id: 'functions-datetime-day_of_year', label: 'day_of_year', href: '/docs/functions/datetime/day_of_year' },
          { id: 'functions-datetime-diff', label: 'diff', href: '/docs/functions/datetime/diff' },
          { id: 'functions-datetime-epoch', label: 'epoch', href: '/docs/functions/datetime/epoch' },
          { id: 'functions-datetime-epoch_millis', label: 'epoch_millis', href: '/docs/functions/datetime/epoch_millis' },
          { id: 'functions-datetime-format', label: 'format', href: '/docs/functions/datetime/format' },
          { id: 'functions-datetime-from_epoch', label: 'from_epoch', href: '/docs/functions/datetime/from_epoch' },
          { id: 'functions-datetime-from_epoch_millis', label: 'from_epoch_millis', href: '/docs/functions/datetime/from_epoch_millis' },
          { id: 'functions-datetime-hour', label: 'hour', href: '/docs/functions/datetime/hour' },
          { id: 'functions-datetime-minute', label: 'minute', href: '/docs/functions/datetime/minute' },
          { id: 'functions-datetime-month', label: 'month', href: '/docs/functions/datetime/month' },
          { id: 'functions-datetime-nanosecond', label: 'nanosecond', href: '/docs/functions/datetime/nanosecond' },
          { id: 'functions-datetime-new', label: 'new', href: '/docs/functions/datetime/new' },
          { id: 'functions-datetime-now', label: 'now', href: '/docs/functions/datetime/now' },
          { id: 'functions-datetime-quarter', label: 'quarter', href: '/docs/functions/datetime/quarter' },
          { id: 'functions-datetime-second', label: 'second', href: '/docs/functions/datetime/second' },
          { id: 'functions-datetime-subtract', label: 'subtract', href: '/docs/functions/datetime/subtract' },
          { id: 'functions-datetime-time', label: 'time', href: '/docs/functions/datetime/time' },
          { id: 'functions-datetime-trunc', label: 'trunc', href: '/docs/functions/datetime/trunc' },
          { id: 'functions-datetime-week', label: 'week', href: '/docs/functions/datetime/week' },
          { id: 'functions-datetime-year', label: 'year', href: '/docs/functions/datetime/year' },
        ],
      },
      {
        id: 'functions-duration',
        label: 'duration',
        href: '/docs/functions/duration',
        children: [
          { id: 'functions-duration-add', label: 'add', href: '/docs/functions/duration/add' },
          { id: 'functions-duration-days', label: 'days', href: '/docs/functions/duration/days' },
          { id: 'functions-duration-format', label: 'format', href: '/docs/functions/duration/format' },
          { id: 'functions-duration-get_days', label: 'get_days', href: '/docs/functions/duration/get_days' },
          { id: 'functions-duration-get_months', label: 'get_months', href: '/docs/functions/duration/get_months' },
          { id: 'functions-duration-get_nanos', label: 'get_nanos', href: '/docs/functions/duration/get_nanos' },
          { id: 'functions-duration-hours', label: 'hours', href: '/docs/functions/duration/hours' },
          { id: 'functions-duration-millis', label: 'millis', href: '/docs/functions/duration/millis' },
          { id: 'functions-duration-minutes', label: 'minutes', href: '/docs/functions/duration/minutes' },
          { id: 'functions-duration-months', label: 'months', href: '/docs/functions/duration/months' },
          { id: 'functions-duration-negate', label: 'negate', href: '/docs/functions/duration/negate' },
          { id: 'functions-duration-scale', label: 'scale', href: '/docs/functions/duration/scale' },
          { id: 'functions-duration-seconds', label: 'seconds', href: '/docs/functions/duration/seconds' },
          { id: 'functions-duration-subtract', label: 'subtract', href: '/docs/functions/duration/subtract' },
          { id: 'functions-duration-trunc', label: 'trunc', href: '/docs/functions/duration/trunc' },
          { id: 'functions-duration-weeks', label: 'weeks', href: '/docs/functions/duration/weeks' },
          { id: 'functions-duration-years', label: 'years', href: '/docs/functions/duration/years' },
        ],
      },
      {
        id: 'functions-identity',
        label: 'identity',
        href: '/docs/functions/identity',
        children: [
          { id: 'functions-identity-id', label: 'id', href: '/docs/functions/identity/id' },
        ],
      },
      {
        id: 'functions-is',
        label: 'is',
        href: '/docs/functions/is',
        children: [
          { id: 'functions-is-anonymous', label: 'anonymous', href: '/docs/functions/is/anonymous' },
          { id: 'functions-is-none', label: 'none', href: '/docs/functions/is/none' },
          { id: 'functions-is-root', label: 'root', href: '/docs/functions/is/root' },
          { id: 'functions-is-some', label: 'some', href: '/docs/functions/is/some' },
          { id: 'functions-is-type', label: 'type', href: '/docs/functions/is/type' },
        ],
      },
      {
        id: 'functions-json',
        label: 'json',
        href: '/docs/functions/json',
        children: [
          { id: 'functions-json-array', label: 'array', href: '/docs/functions/json/array' },
          { id: 'functions-json-object', label: 'object', href: '/docs/functions/json/object' },
          { id: 'functions-json-serialize', label: 'serialize', href: '/docs/functions/json/serialize' },
          { id: 'functions-json-pretty', label: 'pretty', href: '/docs/functions/json/pretty' },
        ],
      },
      {
        id: 'functions-math',
        label: 'math',
        href: '/docs/functions/math',
        children: [
          { id: 'functions-math-abs', label: 'abs', href: '/docs/functions/math/abs' },
          { id: 'functions-math-acos', label: 'acos', href: '/docs/functions/math/acos' },
          { id: 'functions-math-asin', label: 'asin', href: '/docs/functions/math/asin' },
          { id: 'functions-math-atan', label: 'atan', href: '/docs/functions/math/atan' },
          { id: 'functions-math-atan2', label: 'atan2', href: '/docs/functions/math/atan2' },
          { id: 'functions-math-avg', label: 'avg', href: '/docs/functions/math/avg' },
          { id: 'functions-math-ceil', label: 'ceil', href: '/docs/functions/math/ceil' },
          { id: 'functions-math-clamp', label: 'clamp', href: '/docs/functions/math/clamp' },
          { id: 'functions-math-cos', label: 'cos', href: '/docs/functions/math/cos' },
          { id: 'functions-math-e', label: 'e', href: '/docs/functions/math/e' },
          { id: 'functions-math-exp', label: 'exp', href: '/docs/functions/math/exp' },
          { id: 'functions-math-floor', label: 'floor', href: '/docs/functions/math/floor' },
          { id: 'functions-math-gcd', label: 'gcd', href: '/docs/functions/math/gcd' },
          { id: 'functions-math-lcm', label: 'lcm', href: '/docs/functions/math/lcm' },
          { id: 'functions-math-log', label: 'log', href: '/docs/functions/math/log' },
          { id: 'functions-math-log10', label: 'log10', href: '/docs/functions/math/log10' },
          { id: 'functions-math-log2', label: 'log2', href: '/docs/functions/math/log2' },
          { id: 'functions-math-max', label: 'max', href: '/docs/functions/math/max' },
          { id: 'functions-math-min', label: 'min', href: '/docs/functions/math/min' },
          { id: 'functions-math-mod', label: 'mod', href: '/docs/functions/math/mod' },
          { id: 'functions-math-pi', label: 'pi', href: '/docs/functions/math/pi' },
          { id: 'functions-math-power', label: 'power', href: '/docs/functions/math/power' },
          { id: 'functions-math-round', label: 'round', href: '/docs/functions/math/round' },
          { id: 'functions-math-sign', label: 'sign', href: '/docs/functions/math/sign' },
          { id: 'functions-math-sin', label: 'sin', href: '/docs/functions/math/sin' },
          { id: 'functions-math-sqrt', label: 'sqrt', href: '/docs/functions/math/sqrt' },
          { id: 'functions-math-sum', label: 'sum', href: '/docs/functions/math/sum' },
          { id: 'functions-math-tan', label: 'tan', href: '/docs/functions/math/tan' },
          { id: 'functions-math-truncate', label: 'truncate', href: '/docs/functions/math/truncate' },
        ],
      },
      {
        id: 'functions-meta',
        label: 'meta',
        href: '/docs/functions/meta',
        children: [
          { id: 'functions-meta-type', label: 'type', href: '/docs/functions/meta/type' },
        ],
      },
      {
        id: 'functions-text',
        label: 'text',
        href: '/docs/functions/text',
        children: [
          { id: 'functions-text-ascii', label: 'ascii', href: '/docs/functions/text/ascii' },
          { id: 'functions-text-char', label: 'char', href: '/docs/functions/text/char' },
          { id: 'functions-text-concat', label: 'concat', href: '/docs/functions/text/concat' },
          { id: 'functions-text-contains', label: 'contains', href: '/docs/functions/text/contains' },
          { id: 'functions-text-count', label: 'count', href: '/docs/functions/text/count' },
          { id: 'functions-text-ends_with', label: 'ends_with', href: '/docs/functions/text/ends_with' },
          { id: 'functions-text-format_bytes', label: 'format_bytes', href: '/docs/functions/text/format_bytes' },
          { id: 'functions-text-format_bytes_si', label: 'format_bytes_si', href: '/docs/functions/text/format_bytes_si' },
          { id: 'functions-text-index_of', label: 'index_of', href: '/docs/functions/text/index_of' },
          { id: 'functions-text-length', label: 'length', href: '/docs/functions/text/length' },
          { id: 'functions-text-lower', label: 'lower', href: '/docs/functions/text/lower' },
          { id: 'functions-text-pad_left', label: 'pad_left', href: '/docs/functions/text/pad_left' },
          { id: 'functions-text-pad_right', label: 'pad_right', href: '/docs/functions/text/pad_right' },
          { id: 'functions-text-repeat', label: 'repeat', href: '/docs/functions/text/repeat' },
          { id: 'functions-text-replace', label: 'replace', href: '/docs/functions/text/replace' },
          { id: 'functions-text-reverse', label: 'reverse', href: '/docs/functions/text/reverse' },
          { id: 'functions-text-starts_with', label: 'starts_with', href: '/docs/functions/text/starts_with' },
          { id: 'functions-text-substring', label: 'substring', href: '/docs/functions/text/substring' },
          { id: 'functions-text-trim', label: 'trim', href: '/docs/functions/text/trim' },
          { id: 'functions-text-trim_end', label: 'trim_end', href: '/docs/functions/text/trim_end' },
          { id: 'functions-text-trim_start', label: 'trim_start', href: '/docs/functions/text/trim_start' },
          { id: 'functions-text-upper', label: 'upper', href: '/docs/functions/text/upper' },
        ],
      },
      {
        id: 'functions-time',
        label: 'time',
        href: '/docs/functions/time',
        children: [
          { id: 'functions-time-add', label: 'add', href: '/docs/functions/time/add' },
          { id: 'functions-time-age', label: 'age', href: '/docs/functions/time/age' },
          { id: 'functions-time-diff', label: 'diff', href: '/docs/functions/time/diff' },
          { id: 'functions-time-format', label: 'format', href: '/docs/functions/time/format' },
          { id: 'functions-time-hour', label: 'hour', href: '/docs/functions/time/hour' },
          { id: 'functions-time-minute', label: 'minute', href: '/docs/functions/time/minute' },
          { id: 'functions-time-nanosecond', label: 'nanosecond', href: '/docs/functions/time/nanosecond' },
          { id: 'functions-time-new', label: 'new', href: '/docs/functions/time/new' },
          { id: 'functions-time-now', label: 'now', href: '/docs/functions/time/now' },
          { id: 'functions-time-second', label: 'second', href: '/docs/functions/time/second' },
          { id: 'functions-time-subtract', label: 'subtract', href: '/docs/functions/time/subtract' },
          { id: 'functions-time-trunc', label: 'trunc', href: '/docs/functions/time/trunc' },
        ],
      },
    ],
  },

  // ─── 14. Troubleshooting ──────────────────────────────────
  {
    title: 'Troubleshooting',
    items: [
      { id: 'troubleshooting-overview', label: 'Overview', href: '/docs/troubleshooting', published: false },
      { id: 'troubleshooting-common-errors', label: 'Common Errors', href: '/docs/troubleshooting/common-errors', published: false },
      { id: 'troubleshooting-connection-issues', label: 'Connection Issues', href: '/docs/troubleshooting/connection-issues', published: false },
      { id: 'troubleshooting-slow-queries', label: 'Slow Queries', href: '/docs/troubleshooting/slow-queries', published: false },
      { id: 'troubleshooting-transaction-conflicts', label: 'Transaction Conflicts', href: '/docs/troubleshooting/transaction-conflicts', published: false },
      { id: 'troubleshooting-view-issues', label: 'View Issues', href: '/docs/troubleshooting/view-issues', published: false },
      { id: 'troubleshooting-faq', label: 'FAQ', href: '/docs/troubleshooting/faq', published: false },
    ],
  },

  // ─── 15. Resources ────────────────────────────────────────
  {
    title: 'Resources',
    items: [
      { id: 'resources-changelog', label: 'Changelog', href: '/docs/resources/changelog', published: false },
      { id: 'resources-roadmap', label: 'Roadmap', href: '/docs/resources/roadmap', published: false },
      { id: 'resources-glossary', label: 'Glossary', href: '/docs/resources/glossary', published: false },
      { id: 'resources-contributing', label: 'Contributing', href: '/docs/resources/contributing', published: false },
      { id: 'resources-community', label: 'Community', href: '/docs/resources/community', published: false },
      { id: 'resources-release-notes', label: 'Release Notes', href: '/docs/resources/release-notes', published: false },
    ],
  },
];
