import { Layout } from '../../layout.tsx';

export function CqrsGuidePage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            CQRS
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Implement Command Query Responsibility Segregation.
          </p>
        </div>
      </div>
    </Layout>
  );
}
