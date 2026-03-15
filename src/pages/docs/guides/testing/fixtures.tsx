import { Layout } from '../../layout.tsx';

export function FixturesGuidePage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Test Fixtures & Seeding
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Set up test data and seed databases for testing.
          </p>
        </div>
      </div>
    </Layout>
  );
}
