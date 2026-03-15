import { Layout } from '../layout.tsx';

export function ConsistencyModelPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Consistency Model
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            ReifyDB's consistency guarantees and isolation levels.
          </p>
        </div>
      </div>
    </Layout>
  );
}
