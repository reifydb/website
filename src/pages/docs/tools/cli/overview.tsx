import { Layout } from '../../layout.tsx';

export function CliOverviewPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            CLI Overview
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            The ReifyDB command-line interface.
          </p>
        </div>
      </div>
    </Layout>
  );
}
