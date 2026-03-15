import { Layout } from '../../layout.tsx';

export function TsErrorHandlingPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Error Handling
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Handle errors gracefully in your TypeScript application.
          </p>
        </div>
      </div>
    </Layout>
  );
}
