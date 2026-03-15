import { Layout } from '../layout.tsx';

export function LiveDashboardPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Live Dashboard
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Build a real-time dashboard with live-updating data.
          </p>
        </div>
      </div>
    </Layout>
  );
}
