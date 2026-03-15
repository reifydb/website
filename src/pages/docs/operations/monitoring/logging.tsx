import { Layout } from '../../layout.tsx';

export function LoggingPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Logging
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Configure and manage database logging.
          </p>
        </div>
      </div>
    </Layout>
  );
}
