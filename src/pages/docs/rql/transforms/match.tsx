import { Layout } from '../../layout.tsx';
import { ExecutableSnippet } from '@/components/ui';
import { getExampleById } from '@/lib/examples';

export function MatchPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Match Transform
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Use <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">match</code> for
            conditional logic — the RQL equivalent of SQL's <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">CASE</code>.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Value Match</h2>
          <ExecutableSnippet
            title="Value Match"
            initialCode={getExampleById('match-value')!.code}
          />
          <p className="text-text-secondary mt-4">
            Match a column against specific values. Each arm maps a value to a result. The <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">else</code> arm catches everything else.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Searched Match</h2>
          <ExecutableSnippet
            title="Searched Match"
            initialCode={getExampleById('match-searched')!.code}
          />
          <p className="text-text-secondary mt-4">
            Use <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">when</code>/<code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">then</code> for condition-based matching. Each <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">when</code> is evaluated in order — the first match wins.
          </p>
        </section>

      </div>
    </Layout>
  );
}
