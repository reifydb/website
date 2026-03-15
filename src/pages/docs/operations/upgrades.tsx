import { Layout } from '../layout.tsx';

export function UpgradesPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Upgrades
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Upgrade ReifyDB to new versions safely.
          </p>
        </div>
      </div>
    </Layout>
  );
}
