import { Layout } from '../layout.tsx';

export function StorageEnginesPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Storage Engines
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            The pluggable storage layer that powers ReifyDB.
          </p>
        </div>
      </div>
    </Layout>
  );
}
