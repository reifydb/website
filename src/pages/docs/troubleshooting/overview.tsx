import { Layout } from '../layout.tsx';

export function TroubleshootingOverviewPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Troubleshooting
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Diagnose and resolve common issues.
          </p>
        </div>
      </div>
    </Layout>
  );
}
