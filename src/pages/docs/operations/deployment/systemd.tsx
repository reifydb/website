import { Layout } from '../../layout.tsx';

export function SystemdPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Systemd
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Manage ReifyDB with systemd service files.
          </p>
        </div>
      </div>
    </Layout>
  );
}
