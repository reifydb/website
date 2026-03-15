import { Layout } from '../../layout.tsx';

export function BackupOverviewPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Backup & Restore
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Overview of backup and restore strategies.
          </p>
        </div>
      </div>
    </Layout>
  );
}
