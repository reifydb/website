import { Layout } from '../layout.tsx';

export function IntegrationsOverviewPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Integrations
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Connect ReifyDB with your existing tools and services.
          </p>
        </div>
      </div>
    </Layout>
  );
}
