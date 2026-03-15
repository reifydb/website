import { Layout } from '../../layout.tsx';
import { ExecutableSnippet } from '@/components/ui';
import { getExampleById } from '@/lib/examples';

export function TransactionalViewsPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Transactional Views
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Transactional views are updated atomically within the same transaction
            as the source data. They are always consistent.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Create a Transactional View</h2>
          <ExecutableSnippet
            title="Transactional View"
            initialCode={getExampleById('scripting-transactional-view')!.code}
          />
          <p className="text-text-secondary mt-4">
            Use <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">CREATE VIEW</code> (without DEFERRED)
            to create a transactional view. The view updates atomically when its source tables change.
          </p>
        </section>
      </div>
    </Layout>
  );
}
