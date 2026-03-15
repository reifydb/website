import { Layout } from '../../layout.tsx';

export function GoQuickStartPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Go Quick Start
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Get started with ReifyDB in Go.
          </p>
        </div>
      </div>
    </Layout>
  );
}
