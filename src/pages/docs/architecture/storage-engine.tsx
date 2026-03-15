import { Layout } from '../layout.tsx';

export function ArchitectureStorageEnginePage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Storage Engine
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            How ReifyDB persists and retrieves data on disk.
          </p>
        </div>
      </div>
    </Layout>
  );
}
