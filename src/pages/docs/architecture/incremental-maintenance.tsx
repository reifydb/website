import { Layout } from '../layout.tsx';

export function IncrementalMaintenancePage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Incremental Maintenance
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            How materialized views are kept up to date incrementally.
          </p>
        </div>
      </div>
    </Layout>
  );
}
