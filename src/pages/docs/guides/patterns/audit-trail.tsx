import { Layout } from '../../layout.tsx';

export function AuditTrailGuidePage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Audit Trail
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Track changes and maintain audit logs.
          </p>
        </div>
      </div>
    </Layout>
  );
}
