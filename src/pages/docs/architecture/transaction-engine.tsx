import { Layout } from '../layout.tsx';

export function TransactionEnginePage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Transaction Engine
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            ACID transaction processing in ReifyDB.
          </p>
        </div>
      </div>
    </Layout>
  );
}
