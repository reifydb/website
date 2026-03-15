import { Layout } from '../../layout.tsx';

export function RelationshipsGuidePage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Relationships
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Model and query relationships between entities.
          </p>
        </div>
      </div>
    </Layout>
  );
}
