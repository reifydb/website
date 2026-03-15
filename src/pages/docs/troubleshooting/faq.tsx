import { Layout } from '../layout.tsx';

export function FaqDocsPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            FAQ
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Frequently asked questions about ReifyDB.
          </p>
        </div>
      </div>
    </Layout>
  );
}
