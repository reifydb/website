import { Layout } from '../../layout.tsx';

export function IndexesPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Indexes
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Create and manage indexes for faster query performance.
          </p>
        </div>
      </div>
    </Layout>
  );
}
