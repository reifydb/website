import type { CodeExample } from '@/lib/examples/types';

export const scriptingMigrationsOverviewExamples: CodeExample[] = [
{
    id: 'scripting-create-migration',
    title: 'Create Migration',
    category: 'scripting',
    code: `CREATE MIGRATION '001_create_users' {
  CREATE NAMESPACE mg;
  CREATE TABLE mg::users { id: int4, name: utf8 }
};
MIGRATE`,
  },
{
    id: 'scripting-migration-rollback',
    title: 'Migration with Rollback',
    category: 'scripting',
    code: `CREATE MIGRATION '001_create_orders' {
  CREATE NAMESPACE mg_r;
  CREATE TABLE mg_r::orders { id: int4, total: int4 }
} ROLLBACK {
  DROP TABLE mg_r::orders;
  DROP NAMESPACE mg_r
};
MIGRATE`,
  },
];
