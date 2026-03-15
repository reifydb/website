import { Layout } from '../../layout.tsx';

export function IntegrationTestingGuidePage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Integration Testing
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Test end-to-end flows with ReifyDB.
          </p>
        </div>
      </div>
    </Layout>
  );
}
