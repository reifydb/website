import { Layout } from '../layout.tsx';

export function MaterializedViewsPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Materialized Views
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Pre-computed query results that stay automatically up to date.
          </p>
        </div>
      </div>
    </Layout>
  );
}
