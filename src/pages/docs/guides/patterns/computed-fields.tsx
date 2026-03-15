import { Layout } from '../../layout.tsx';

export function ComputedFieldsGuidePage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Computed Fields
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Define fields that are automatically derived from other data.
          </p>
        </div>
      </div>
    </Layout>
  );
}
