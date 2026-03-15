import { Layout } from '../../layout.tsx';

export function RustClientPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Client Mode
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Connect to a ReifyDB server from Rust.
          </p>
        </div>
      </div>
    </Layout>
  );
}
