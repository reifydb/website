import { Layout } from '../../layout.tsx';

export function PaginationPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Pagination
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Efficient pagination patterns for large result sets.
          </p>
        </div>
      </div>
    </Layout>
  );
}
