import { Layout } from '../layout.tsx';

export function SlowQueriesPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Slow Queries
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Identify and fix slow-running queries.
          </p>
        </div>
      </div>
    </Layout>
  );
}
