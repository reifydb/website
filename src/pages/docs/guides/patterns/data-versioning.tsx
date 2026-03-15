import { Layout } from '../../layout.tsx';

export function DataVersioningGuidePage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Data Versioning
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Track and manage versions of your data over time.
          </p>
        </div>
      </div>
    </Layout>
  );
}
