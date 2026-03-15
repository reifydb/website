import { Layout } from '../../layout.tsx';

export function EventSourcingGuidePage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Event Sourcing
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Implement event sourcing patterns with ReifyDB.
          </p>
        </div>
      </div>
    </Layout>
  );
}
