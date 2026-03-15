import { Layout } from '../layout.tsx';

export function RealTimeSubscriptionsPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Real-Time Subscriptions
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            How ReifyDB pushes live updates to your application.
          </p>
        </div>
      </div>
    </Layout>
  );
}
