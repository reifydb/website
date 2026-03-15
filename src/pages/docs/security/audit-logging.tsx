import { Layout } from '../layout.tsx';

export function AuditLoggingPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Audit Logging
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Track and log all database access and modifications.
          </p>
        </div>
      </div>
    </Layout>
  );
}
