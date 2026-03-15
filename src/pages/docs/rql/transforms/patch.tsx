import { Layout } from '../../layout.tsx';
import { ExecutableSnippet } from '@/components/ui';
import { getExampleById } from '@/lib/examples';

export function PatchPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Patch Transform
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Use <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">patch</code> to
            update or add columns while keeping everything else. Like{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">map</code>, but
            unspecified columns are preserved.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Replace a Column</h2>
          <ExecutableSnippet
            title="Replace a Column"
            initialCode={getExampleById('patch-basic')!.code}
          />
          <p className="text-text-secondary mt-4">
            Columns named in the patch are replaced. Everything else stays unchanged.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Add New Columns</h2>
          <ExecutableSnippet
            title="Add New Columns"
            initialCode={getExampleById('patch-add-column')!.code}
          />
          <p className="text-text-secondary mt-4">
            Columns that don't exist yet are appended at the end.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Expressions</h2>
          <ExecutableSnippet
            title="Expressions"
            initialCode={getExampleById('patch-expression')!.code}
          />
          <p className="text-text-secondary mt-4">
            Patch assignments can use expressions referencing existing columns.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Chaining Patches</h2>
          <ExecutableSnippet
            title="Chaining Patches"
            initialCode={getExampleById('patch-chained')!.code}
          />
          <p className="text-text-secondary mt-4">
            Chain patches when later columns depend on earlier ones.
          </p>
        </section>

        <p className="text-text-secondary">
          <strong>Patch updates</strong> the row shape — matched columns are replaced, new columns are added, and unmatched columns survive. <strong>Map replaces</strong> the row shape entirely. <strong>Extend adds</strong> columns but cannot replace existing ones. Use <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">patch</code> when you want to selectively update without losing anything.
        </p>

      </div>
    </Layout>
  );
}
