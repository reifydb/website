import { Layout } from '../../layout.tsx';

export function CliCommandsPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Command Reference
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Complete reference of all CLI commands.
          </p>
        </div>
      </div>
    </Layout>
  );
}
