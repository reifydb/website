import { Layout } from '../../layout.tsx';

export function PythonConnectionPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Connection
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Configure and manage Python client connections.
          </p>
        </div>
      </div>
    </Layout>
  );
}
