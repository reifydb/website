import { Layout } from '../../layout.tsx';

export function ConstraintsPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Constraints
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Define and enforce data integrity constraints on your tables.
          </p>
        </div>
      </div>
    </Layout>
  );
}
