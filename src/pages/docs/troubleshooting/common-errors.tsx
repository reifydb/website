import { Layout } from '../layout.tsx';

export function CommonErrorsPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Common Errors
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Reference guide for common error messages.
          </p>
        </div>
      </div>
    </Layout>
  );
}
