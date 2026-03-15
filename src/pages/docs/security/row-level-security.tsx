import { Layout } from '../layout.tsx';

export function RowLevelSecurityPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Row-Level Security
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Restrict data access at the row level.
          </p>
        </div>
      </div>
    </Layout>
  );
}
