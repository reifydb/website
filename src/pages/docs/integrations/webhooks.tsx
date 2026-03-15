import { Layout } from '../layout.tsx';

export function WebhooksPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Webhooks
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Trigger external actions on data changes.
          </p>
        </div>
      </div>
    </Layout>
  );
}
