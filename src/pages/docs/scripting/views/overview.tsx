import { Layout } from '../../layout.tsx';
import { ExecutableSnippet } from '@/components/ui';
import { getExampleById } from '@/lib/examples';

export function ViewsOverviewPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Views
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Views are derived datasets that stay in sync with their source tables.
            ReifyDB supports deferred views (eventually consistent) and transactional views
            (updated within the same transaction as the source data).
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Deferred View</h2>
          <ExecutableSnippet
            title="Deferred View"
            initialCode={getExampleById('scripting-deferred-view')!.code}
          />
          <p className="text-text-secondary mt-4">
            Deferred views are incrementally maintained. They define their own schema
            and a query that produces it.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Transactional View</h2>
          <ExecutableSnippet
            title="Transactional View"
            initialCode={getExampleById('scripting-transactional-view')!.code}
          />
          <p className="text-text-secondary mt-4">
            Transactional views update atomically with the source data.
            When you insert a row, the view reflects it immediately.
          </p>
        </section>
      </div>
    </Layout>
  );
}
