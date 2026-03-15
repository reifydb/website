import { Layout } from '../../layout.tsx';

export function HierarchicalDataPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Hierarchical Data
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Working with tree structures and hierarchical data in RQL.
          </p>
        </div>
      </div>
    </Layout>
  );
}
