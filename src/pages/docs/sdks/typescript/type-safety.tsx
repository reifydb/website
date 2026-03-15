import { Layout } from '../../layout.tsx';

export function TsTypeSafetyPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Type Safety
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Leverage TypeScript's type system with ReifyDB.
          </p>
        </div>
      </div>
    </Layout>
  );
}
