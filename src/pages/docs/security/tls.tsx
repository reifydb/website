import { Layout } from '../layout.tsx';

export function TlsPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            TLS & Network Security
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Secure network communication with TLS.
          </p>
        </div>
      </div>
    </Layout>
  );
}
