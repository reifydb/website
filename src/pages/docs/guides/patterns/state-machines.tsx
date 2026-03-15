import { Layout } from '../../layout.tsx';

export function StateMachinesGuidePage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            State Machines
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Model state machines and workflows in ReifyDB.
          </p>
        </div>
      </div>
    </Layout>
  );
}
