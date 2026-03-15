import { Layout } from '../layout.tsx';

export function TransactionConflictsPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Transaction Conflicts
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Resolve transaction conflicts and deadlocks.
          </p>
        </div>
      </div>
    </Layout>
  );
}
