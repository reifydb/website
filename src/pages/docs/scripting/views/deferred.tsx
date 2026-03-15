import { Layout } from '../../layout.tsx';
import { ExecutableSnippet } from '@/components/ui';
import { getExampleById } from '@/lib/examples';

export function DeferredViewsPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Deferred Views
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Deferred views are incrementally maintained materialized views.
            They define a schema and a query, and ReifyDB keeps them up to date.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Create a Deferred View</h2>
          <ExecutableSnippet
            title="Deferred View"
            initialCode={getExampleById('scripting-deferred-view')!.code}
          />
          <p className="text-text-secondary mt-4">
            The view schema declares the output shape. The <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">AS</code> block
            defines the query that produces it. When source data changes, the view updates incrementally.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Query a View</h2>
          <ExecutableSnippet
            title="Query a View"
            initialCode={getExampleById('scripting-query-view')!.code}
          />
          <p className="text-text-secondary mt-4">
            Query a view just like a table. You can chain transforms like{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">SORT</code>,{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">FILTER</code>, and{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">TAKE</code> on view results.
          </p>
        </section>
      </div>
    </Layout>
  );
}
