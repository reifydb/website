import { Layout } from '../../layout.tsx';

export function ReactIntegrationPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            React
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Integrate ReifyDB with React applications.
          </p>
        </div>
      </div>
    </Layout>
  );
}
