import { Layout } from '../layout.tsx';
import { DocStub } from '../components';

const experimental: { name: string; status: string }[] = [
  { name: 'Events, handlers, and dispatch', status: 'Implemented in the engine, API still settling.' },
  { name: 'User-defined functions and WASM extensions', status: 'Implemented, interface not yet stable.' },
  { name: 'Sources, sinks, and bindings (HTTP, gRPC, WS)', status: 'In development.' },
  { name: 'Raft replication and consensus', status: 'In development.' },
  { name: 'Wallet-based authentication', status: 'Experimental.' },
  { name: 'Deterministic simulation client', status: 'Experimental, used for engine testing.' },
];

export function RoadmapPage() {
  return (
    <Layout>
      <DocStub
        kicker="Resources"
        title="Roadmap & Experimental"
        description="ReifyDB is pre-1.0 and in active development. These docs describe what works today; everything below exists in the codebase but is not yet stable enough to document."
        sections={[
          {
            heading: 'Experimental features',
            body: (
              <div className="border-2 border-border-default overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-bg-tertiary">
                    <tr>
                      <th className="text-left p-2 sm:p-3 font-bold">Feature</th>
                      <th className="text-left p-2 sm:p-3 font-bold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {experimental.map((item) => (
                      <tr key={item.name} className="border-t-2 border-border-default">
                        <td className="p-2 sm:p-3">{item.name}</td>
                        <td className="p-2 sm:p-3 text-text-secondary">{item.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ),
          },
          {
            heading: 'How features graduate',
            body: (
              <p>
                A feature gets documented pages when it can be exercised end to end in a
                released build. Until then it lives here, so the docs never describe behavior
                you cannot run.
              </p>
            ),
          },
        ]}
      />
    </Layout>
  );
}
