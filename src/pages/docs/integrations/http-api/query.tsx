import { Layout } from '../../layout.tsx';

export function HttpApiQueryPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Query Endpoint
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Execute RQL queries via HTTP.
          </p>
        </div>
      </div>
    </Layout>
  );
}
