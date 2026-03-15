import { Layout } from '../../layout.tsx';

export function DynamicQueriesPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Dynamic Queries
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Building dynamic and parameterized queries at runtime.
          </p>
        </div>
      </div>
    </Layout>
  );
}
