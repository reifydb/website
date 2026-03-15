import { Layout } from '../layout.tsx';

export function WireProtocolPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Wire Protocol
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            The network protocol used for client-server communication.
          </p>
        </div>
      </div>
    </Layout>
  );
}
