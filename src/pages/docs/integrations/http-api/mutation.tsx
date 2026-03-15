import { Layout } from '../../layout.tsx';

export function HttpApiMutationPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Mutation Endpoint
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Perform data mutations via HTTP.
          </p>
        </div>
      </div>
    </Layout>
  );
}
