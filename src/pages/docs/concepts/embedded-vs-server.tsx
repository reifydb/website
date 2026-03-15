import { Layout } from '../layout.tsx';

export function EmbeddedVsServerPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Embedded vs. Server Mode
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Choose the right deployment mode for your use case.
          </p>
        </div>
      </div>
    </Layout>
  );
}
