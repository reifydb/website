import { Layout } from '../../layout.tsx';

export function ConditionalsPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Conditionals
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Conditional expressions for branching logic in RQL queries.
          </p>
        </div>
      </div>
    </Layout>
  );
}
