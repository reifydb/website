import { Layout } from '../../layout.tsx';

export function ConsoleOverviewPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Web Console
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            The ReifyDB web-based management console.
          </p>
        </div>
      </div>
    </Layout>
  );
}
