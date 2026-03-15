import { Layout } from '../../layout.tsx';
import { ExecutableSnippet } from '@/components/ui';
import { getExampleById } from '@/lib/examples';

export function DistinctPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Distinct Transform
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Use <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">distinct</code> to
            remove duplicate rows based on one or more columns.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Basic Usage</h2>
          <ExecutableSnippet
            title="Basic Usage"
            initialCode={getExampleById('distinct-basic')!.code}
          />
          <p className="text-text-secondary mt-4">
            Keep only the first row for each unique value. The entire row is preserved — <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">distinct</code> just picks which rows survive.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Multiple Columns</h2>
          <ExecutableSnippet
            title="Multiple Columns"
            initialCode={getExampleById('distinct-multi')!.code}
          />
          <p className="text-text-secondary mt-4">
            Specify multiple columns to deduplicate on the combination.
          </p>
        </section>

      </div>
    </Layout>
  );
}
