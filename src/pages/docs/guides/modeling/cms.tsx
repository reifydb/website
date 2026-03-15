import { Layout } from '../../layout.tsx';

export function CmsGuidePage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Content Management
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Build content management systems with ReifyDB.
          </p>
        </div>
      </div>
    </Layout>
  );
}
