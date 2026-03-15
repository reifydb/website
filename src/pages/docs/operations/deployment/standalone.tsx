import { Layout } from '../../layout.tsx';

export function StandalonePage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Standalone Deployment
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Deploy ReifyDB as a standalone server.
          </p>
        </div>
      </div>
    </Layout>
  );
}
