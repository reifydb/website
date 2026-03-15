import { Layout } from '../../layout.tsx';

export function HttpApiOverviewPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            HTTP API
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            RESTful HTTP API for ReifyDB.
          </p>
        </div>
      </div>
    </Layout>
  );
}
