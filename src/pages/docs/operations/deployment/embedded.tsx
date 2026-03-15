import { Layout } from '../../layout.tsx';

export function EmbeddedDeploymentPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Embedded Deployment
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Embed ReifyDB directly in your application.
          </p>
        </div>
      </div>
    </Layout>
  );
}
