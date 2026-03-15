import { Layout } from '../../layout.tsx';

export function TsMutationsPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Mutations
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Insert, update, and delete data from TypeScript.
          </p>
        </div>
      </div>
    </Layout>
  );
}
