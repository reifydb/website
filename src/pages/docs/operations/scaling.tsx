import { Layout } from '../layout.tsx';

export function ScalingPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Scaling
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Scale ReifyDB for growing workloads.
          </p>
        </div>
      </div>
    </Layout>
  );
}
