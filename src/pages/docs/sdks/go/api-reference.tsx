import { Layout } from '../../layout.tsx';

export function GoApiReferencePage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            API Reference
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Complete Go SDK API reference.
          </p>
        </div>
      </div>
    </Layout>
  );
}
