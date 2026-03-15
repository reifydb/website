import { Layout } from '../../layout.tsx';

export function LiveQueriesGuidePage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Live Queries
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Set up live queries that automatically push updates.
          </p>
        </div>
      </div>
    </Layout>
  );
}
