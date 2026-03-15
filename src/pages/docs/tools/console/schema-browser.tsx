import { Layout } from '../../layout.tsx';

export function SchemaBrowserPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Schema Browser
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Browse and inspect your database schema visually.
          </p>
        </div>
      </div>
    </Layout>
  );
}
