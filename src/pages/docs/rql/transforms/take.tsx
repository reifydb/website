import { Layout } from '../../layout.tsx';
import { ExecutableSnippet } from '@/components/ui';
import { getExampleById } from '@/lib/examples';

export function TakePage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Take Transform
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Use <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">take</code> to
            grab only the first N rows. Like SQL's <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">LIMIT</code>.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Basic Usage</h2>
          <ExecutableSnippet
            title="Basic Usage"
            initialCode={getExampleById('take-basic')!.code}
          />
          <p className="text-text-secondary mt-4">
            Grab a fixed number of rows.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Top-N Queries</h2>
          <ExecutableSnippet
            title="Top-N Queries"
            initialCode={getExampleById('take-with-sort')!.code}
          />
          <p className="text-text-secondary mt-4">
            Combine <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">sort</code> and <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">take</code> for top-N queries. Sort first, then take.
          </p>
        </section>

      </div>
    </Layout>
  );
}
