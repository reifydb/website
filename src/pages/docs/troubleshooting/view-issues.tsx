import { Layout } from '../layout.tsx';

export function ViewIssuesPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            View Issues
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Troubleshoot materialized view problems.
          </p>
        </div>
      </div>
    </Layout>
  );
}
