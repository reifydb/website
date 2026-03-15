import { Layout } from '../../layout.tsx';
import { ExecutableSnippet } from '@/components/ui';
import { getExampleById } from '@/lib/examples';

export function DmlUpdatePage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Update
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Modify existing rows with <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">UPDATE</code>.
            Use a filter to target specific rows.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Update Rows</h2>
          <ExecutableSnippet
            title="Update Rows"
            initialCode={getExampleById('scripting-update-basic')!.code}
          />
          <p className="text-text-secondary mt-4">
            The update body specifies the new values for each column. The{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">FILTER</code> clause
            determines which rows are affected.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Update with Expressions</h2>
          <ExecutableSnippet
            title="Update with Expression"
            initialCode={getExampleById('scripting-update-expression')!.code}
          />
          <p className="text-text-secondary mt-4">
            Use expressions in the update body to compute new values from existing columns.
          </p>
        </section>
      </div>
    </Layout>
  );
}
