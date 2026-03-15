import { Layout } from '../../layout.tsx';

export function GoQueriesPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Queries
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Run RQL queries from Go.
          </p>
        </div>
      </div>
    </Layout>
  );
}
