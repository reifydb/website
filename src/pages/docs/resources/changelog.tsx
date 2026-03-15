import { Layout } from '../layout.tsx';

export function ChangelogPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Changelog
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            History of changes and releases.
          </p>
        </div>
      </div>
    </Layout>
  );
}
