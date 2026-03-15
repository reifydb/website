import { Layout } from '../layout.tsx';

export function FirstAppPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Build Your First App
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            A step-by-step tutorial to build your first application with ReifyDB.
          </p>
        </div>
      </div>
    </Layout>
  );
}
