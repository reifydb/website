import { Layout } from '../../layout.tsx';

export function HttpApiAuthPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            API Authentication
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Authenticate requests to the HTTP API.
          </p>
        </div>
      </div>
    </Layout>
  );
}
