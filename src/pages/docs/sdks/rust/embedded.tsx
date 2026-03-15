import { Layout } from '../../layout.tsx';

export function RustEmbeddedPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Embedded Mode
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Run ReifyDB embedded directly in your Rust application.
          </p>
        </div>
      </div>
    </Layout>
  );
}
