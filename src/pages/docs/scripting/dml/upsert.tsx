import { Layout } from '../../layout.tsx';

export function UpsertPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Upsert
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Insert or update rows in a single atomic operation.
          </p>
        </div>
      </div>
    </Layout>
  );
}
