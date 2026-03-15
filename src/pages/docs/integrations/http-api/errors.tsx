import { Layout } from '../../layout.tsx';

export function HttpApiErrorsPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Error Codes
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            HTTP API error codes and troubleshooting.
          </p>
        </div>
      </div>
    </Layout>
  );
}
