import { Layout } from '../../layout.tsx';
import { ExecutableSnippet } from '@/components/ui';
import { getExampleById } from '@/lib/examples';

export function AggregatePage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Aggregate Transform
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Use <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">aggregate</code> to
            collapse rows into summary values. Group with <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">by</code> to get per-group results.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Whole-Table Aggregation</h2>
          <ExecutableSnippet
            title="Whole-Table Aggregation"
            initialCode={getExampleById('aggregate-basic')!.code}
          />
          <p className="text-text-secondary mt-4">
            Without <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">by</code>, the entire table collapses to a single row.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Group By</h2>
          <ExecutableSnippet
            title="Group By"
            initialCode={getExampleById('aggregate-group-by')!.code}
          />
          <p className="text-text-secondary mt-4">
            Add <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">by {'{'} column {'}'}</code> to get one row per group.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Multiple Groups</h2>
          <ExecutableSnippet
            title="Multiple Groups"
            initialCode={getExampleById('aggregate-multi-group')!.code}
          />
          <p className="text-text-secondary mt-4">
            Group by multiple columns to get finer-grained breakdowns.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Multiple Aggregations</h2>
          <ExecutableSnippet
            title="Multiple Aggregations"
            initialCode={getExampleById('aggregate-multiple-fns')!.code}
          />
          <p className="text-text-secondary mt-4">
            Compute several aggregates in a single pass. Available aggregate functions include <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">math::sum</code>, <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">math::avg</code>, <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">math::min</code>, and <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">math::max</code>.
          </p>
        </section>

      </div>
    </Layout>
  );
}
