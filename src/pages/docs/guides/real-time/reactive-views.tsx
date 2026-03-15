import { Layout } from '../../layout.tsx';

export function ReactiveViewsGuidePage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Reactive Views
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Build reactive materialized views that stay in sync.
          </p>
        </div>
      </div>
    </Layout>
  );
}
