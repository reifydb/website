import { Layout } from '../../layout.tsx';

export function SoftDeletesGuidePage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Soft Deletes
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Implement soft delete patterns for recoverable data.
          </p>
        </div>
      </div>
    </Layout>
  );
}
