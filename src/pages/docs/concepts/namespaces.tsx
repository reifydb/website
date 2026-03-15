import { Layout } from '../layout.tsx';

export function ConceptsNamespacesPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Namespaces & Schemas
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Organizing your data with namespaces and schemas.
          </p>
        </div>
      </div>
    </Layout>
  );
}
