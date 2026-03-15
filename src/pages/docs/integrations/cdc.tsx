import { Layout } from '../layout.tsx';

export function CdcPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Change Data Capture
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Stream database changes to external systems.
          </p>
        </div>
      </div>
    </Layout>
  );
}
