import { Layout } from '../layout.tsx';

export function ComingFromRedisPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Coming from Redis
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            A guide for developers transitioning from Redis to ReifyDB.
          </p>
        </div>
      </div>
    </Layout>
  );
}
