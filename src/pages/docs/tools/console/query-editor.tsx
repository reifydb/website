import { Layout } from '../../layout.tsx';

export function QueryEditorPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Query Editor
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Write and execute queries in the browser.
          </p>
        </div>
      </div>
    </Layout>
  );
}
