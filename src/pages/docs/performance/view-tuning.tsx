import { Layout } from '../layout.tsx';

export function ViewTuningPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            View Tuning
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Optimize materialized view performance.
          </p>
        </div>
      </div>
    </Layout>
  );
}
