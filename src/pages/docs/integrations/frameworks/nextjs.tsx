import { Layout } from '../../layout.tsx';

export function NextjsIntegrationPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Next.js
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Use ReifyDB with Next.js projects.
          </p>
        </div>
      </div>
    </Layout>
  );
}
