import { Layout } from '../../layout.tsx';

export function FieldAccessPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Field Access
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Accessing and referencing fields in RQL expressions.
          </p>
        </div>
      </div>
    </Layout>
  );
}
