import { Layout } from '../../layout.tsx';

export function UnitTestingGuidePage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Unit Testing
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Write unit tests for your ReifyDB schemas and queries.
          </p>
        </div>
      </div>
    </Layout>
  );
}
