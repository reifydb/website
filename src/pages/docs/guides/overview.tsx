import { Layout } from '../layout.tsx';

export function GuidesOverviewPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Guides
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Practical guides for building real applications with ReifyDB.
          </p>
        </div>
      </div>
    </Layout>
  );
}
