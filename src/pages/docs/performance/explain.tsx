import { Layout } from '../layout.tsx';

export function ExplainPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            EXPLAIN & Query Plans
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Analyze and understand query execution plans.
          </p>
        </div>
      </div>
    </Layout>
  );
}
