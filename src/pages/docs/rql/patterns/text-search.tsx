import { Layout } from '../../layout.tsx';

export function TextSearchPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Text Search
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Full-text search patterns and techniques in RQL.
          </p>
        </div>
      </div>
    </Layout>
  );
}
