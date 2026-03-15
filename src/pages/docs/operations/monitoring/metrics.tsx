import { Layout } from '../../layout.tsx';

export function MetricsPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Metrics
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Collect and export database metrics.
          </p>
        </div>
      </div>
    </Layout>
  );
}
