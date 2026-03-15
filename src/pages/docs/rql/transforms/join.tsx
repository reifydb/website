import { Layout } from '../../layout.tsx';
import { ExecutableSnippet } from '@/components/ui';
import { getExampleById } from '@/lib/examples';

export function JoinPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Join Transform
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Use <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">join</code> to
            combine rows from two tables based on matching columns.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Inner Join</h2>
          <ExecutableSnippet
            title="Inner Join"
            initialCode={getExampleById('join-inner')!.code}
          />
          <p className="text-text-secondary mt-4">
            An inner join keeps only rows that have matches in both tables. Alias the joined table with <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">as</code> and specify the join condition with <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">using</code>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Left Join</h2>
          <ExecutableSnippet
            title="Left Join"
            initialCode={getExampleById('join-left')!.code}
          />
          <p className="text-text-secondary mt-4">
            A left join keeps all rows from the left table. Non-matching rows get <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">none</code> for the right-side columns.
          </p>
        </section>

      </div>
    </Layout>
  );
}
