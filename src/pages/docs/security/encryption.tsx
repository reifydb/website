import { Layout } from '../layout.tsx';

export function EncryptionPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Encryption
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Encrypt data at rest and in transit.
          </p>
        </div>
      </div>
    </Layout>
  );
}
