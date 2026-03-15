import { Layout } from '../../layout.tsx';

export function HealthChecksPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Health Checks
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Set up health checks for your ReifyDB deployment.
          </p>
        </div>
      </div>
    </Layout>
  );
}
