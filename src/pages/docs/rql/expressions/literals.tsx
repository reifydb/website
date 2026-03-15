import { Layout } from '../../layout.tsx';

export function LiteralsPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Literals
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Literal values and constants in RQL expressions.
          </p>
        </div>
      </div>
    </Layout>
  );
}
