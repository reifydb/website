import { Layout } from '../layout.tsx';

export function ArchitectureOverviewPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Architecture Overview
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            High-level overview of ReifyDB's internal architecture.
          </p>
        </div>
      </div>
    </Layout>
  );
}
