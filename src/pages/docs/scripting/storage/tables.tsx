import { Layout } from '../../layout.tsx';
import { ExecutableSnippet } from '@/components/ui';
import { getExampleById } from '@/lib/examples';

export function StorageTablesPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Tables
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Tables are the most common storage primitive. They hold rows of typed columns
            with full transactional guarantees.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Create, Insert, Query</h2>
          <ExecutableSnippet
            title="Table Storage"
            initialCode={getExampleById('scripting-storage-table')!.code}
          />
          <p className="text-text-secondary mt-4">
            Tables persist rows durably. Every insert, update, and delete is transactional.
            Query tables with <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">FROM</code> and
            chain any RQL transform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Auto Increment</h2>
          <ExecutableSnippet
            title="Auto Increment"
            initialCode={getExampleById('scripting-create-table-auto-increment')!.code}
          />
          <p className="text-text-secondary mt-4">
            Use <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">WITH {'{ auto_increment }'}</code> on
            a column to let the database assign IDs automatically.
          </p>
        </section>
      </div>
    </Layout>
  );
}
