import { Layout } from '../../layout.tsx';
import { ExecutableSnippet } from '@/components/ui';
import { getExampleById } from '@/lib/examples';

export function ExtendPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Extend Transform
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Use <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">extend</code> to
            add computed columns without dropping anything.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Basic Usage</h2>
          <ExecutableSnippet
            title="Basic Usage"
            initialCode={getExampleById('extend-basic')!.code}
          />
          <p className="text-text-secondary mt-4">
            Add a new column based on existing data. All original columns stay.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Multiple Columns</h2>
          <ExecutableSnippet
            title="Multiple Columns"
            initialCode={getExampleById('extend-multiple')!.code}
          />
          <p className="text-text-secondary mt-4">
            Add several columns in one pass.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Chaining Extends</h2>
          <ExecutableSnippet
            title="Chaining Extends"
            initialCode={getExampleById('extend-chained')!.code}
          />
          <p className="text-text-secondary mt-4">
            Chain extends when later columns depend on earlier ones.
          </p>
        </section>

      </div>
    </Layout>
  );
}
