import { Layout } from '../../layout.tsx';
import { ExecutableSnippet } from '@/components/ui';
import { getExampleById } from '@/lib/examples';

export function TablesPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Tables
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Tables store your application state. Define columns with typed fields,
            insert data, and query it with RQL.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Create a Table</h2>
          <ExecutableSnippet
            title="Create Table"
            initialCode={getExampleById('scripting-create-table')!.code}
          />
          <p className="text-text-secondary mt-4">
            Each column has a name and a type. Supported types include{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">int4</code>,{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">utf8</code>,{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">bool</code>,{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">float8</code>, and more.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Auto Increment</h2>
          <ExecutableSnippet
            title="Auto Increment"
            initialCode={getExampleById('scripting-create-table-auto-increment')!.code}
          />
          <p className="text-text-secondary mt-4">
            Use <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">WITH {'{ auto_increment }'}</code> to
            let the database assign IDs automatically.
          </p>
        </section>
      </div>
    </Layout>
  );
}
