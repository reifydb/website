import { Layout } from '../layout.tsx';

export function BenchmarksPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Benchmarks
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Performance benchmarks and comparisons.
          </p>
        </div>
      </div>
    </Layout>
  );
}
