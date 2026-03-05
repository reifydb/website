import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';

export function MetaModuleOverviewPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">meta Module</h1>
          <p className="text-lg text-text-secondary leading-relaxed">Functions for inspecting value metadata and types.</p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Functions</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link to="/docs/functions/meta/type" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold font-mono mb-1">meta::type</h3>
              <p className="text-sm text-text-secondary">Get the type name of a value as a string.</p>
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Function Reference</h2>
          <div className="border-2 border-border-default overflow-x-auto"><table className="w-full">
            <thead className="bg-bg-tertiary"><tr><th className="text-left p-2 sm:p-3 font-bold">Function</th><th className="text-left p-2 sm:p-3 font-bold">Description</th></tr></thead>
            <tbody>
              <tr className="border-t-2 border-border-default"><td className="p-2 sm:p-3"><Link to="/docs/functions/meta/type" className="text-primary-color hover:underline font-mono">meta::type</Link></td><td className="p-2 sm:p-3">Get the type name of a value as a string</td></tr>
            </tbody>
          </table></div>
        </section>
      </div>
    </Layout>
  );
}
