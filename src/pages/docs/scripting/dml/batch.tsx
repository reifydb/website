import { Layout } from '../../layout.tsx';

export function BatchOperationsPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Batch Operations
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Perform bulk data operations efficiently.
          </p>
        </div>
      </div>
    </Layout>
  );
}
