import { Layout } from '../../layout.tsx';

export function PointInTimePage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Point-in-Time Recovery
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Restore your database to any point in time.
          </p>
        </div>
      </div>
    </Layout>
  );
}
