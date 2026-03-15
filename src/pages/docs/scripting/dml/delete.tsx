import { Layout } from '../../layout.tsx';
import { ExecutableSnippet } from '@/components/ui';
import { getExampleById } from '@/lib/examples';

export function DmlDeletePage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Delete
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Remove rows from a table with <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">DELETE</code>.
            A filter determines which rows to remove.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Delete with Filter</h2>
          <ExecutableSnippet
            title="Delete Rows"
            initialCode={getExampleById('scripting-delete-basic')!.code}
          />
          <p className="text-text-secondary mt-4">
            The <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">FILTER</code> clause
            determines which rows are deleted. Only matching rows are removed.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Delete All</h2>
          <ExecutableSnippet
            title="Delete All"
            initialCode={getExampleById('scripting-delete-all')!.code}
          />
          <p className="text-text-secondary mt-4">
            Use <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">FILTER {'{ true }'}</code> to
            delete all rows from a table while keeping the table itself.
          </p>
        </section>
      </div>
    </Layout>
  );
}
