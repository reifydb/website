import { Layout } from '../layout.tsx';

export function ToolsPlaygroundPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Online Playground
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Try ReifyDB directly in your browser.
          </p>
        </div>
      </div>
    </Layout>
  );
}
