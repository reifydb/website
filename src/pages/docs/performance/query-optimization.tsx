import { Layout } from '../layout.tsx';

export function QueryOptimizationPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Query Optimization
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Write faster queries with optimization techniques.
          </p>
        </div>
      </div>
    </Layout>
  );
}
