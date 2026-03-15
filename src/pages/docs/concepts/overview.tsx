import { Layout } from '../layout.tsx';

export function ConceptsOverviewPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Concepts
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Core concepts and mental models for understanding ReifyDB.
          </p>
        </div>
      </div>
    </Layout>
  );
}
