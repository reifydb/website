import { Layout } from '../layout.tsx';

export function DataModelPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Data Model
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            How ReifyDB structures and organizes your data.
          </p>
        </div>
      </div>
    </Layout>
  );
}
