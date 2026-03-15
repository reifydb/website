import { Layout } from '../../layout.tsx';
import { ExecutableSnippet } from '@/components/ui';
import { getExampleById } from '@/lib/examples';

export function MigrationsOverviewPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Migrations
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Migrations version your schema changes. Each migration has a name and a body,
            and optionally a rollback block.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Create a Migration</h2>
          <ExecutableSnippet
            title="Create Migration"
            initialCode={getExampleById('scripting-create-migration')!.code}
          />
          <p className="text-text-secondary mt-4">
            Define a migration with a name string and a body containing schema changes.
            Run <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">MIGRATE</code> to apply all pending migrations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Rollback Support</h2>
          <ExecutableSnippet
            title="Migration with Rollback"
            initialCode={getExampleById('scripting-migration-rollback')!.code}
          />
          <p className="text-text-secondary mt-4">
            Add a <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">ROLLBACK</code> block to define
            how to undo the migration. Use{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">ROLLBACK MIGRATION</code> to revert
            the last applied migration.
          </p>
        </section>
      </div>
    </Layout>
  );
}
