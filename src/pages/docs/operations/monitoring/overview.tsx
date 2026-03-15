import { Layout } from '../../layout.tsx';

export function MonitoringOverviewPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Monitoring
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Overview of monitoring and observability options.
          </p>
        </div>
      </div>
    </Layout>
  );
}
