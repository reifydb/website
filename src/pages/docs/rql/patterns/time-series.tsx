import { Layout } from '../../layout.tsx';

export function TimeSeriesPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Time-Series Queries
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Querying and analyzing time-series data in ReifyDB.
          </p>
        </div>
      </div>
    </Layout>
  );
}
